import { randomBytes, createHash, timingSafeEqual } from 'node:crypto';
import { readFile, writeFile, mkdir, rename, cp, lstat, realpath, rm } from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { validateContent } from '../lib/editor-validation.mjs';

export const digest = data => createHash('sha256').update(data).digest('hex');
const MAX_BODY = 12 * 1024 * 1024;
const fail = (status, message) => Object.assign(new Error(message), { status });
const json = (res, status, data) => { res.writeHead(status, { 'Content-Type':'application/json; charset=utf-8', 'Cache-Control':'no-store', 'X-Content-Type-Options':'nosniff' }); res.end(JSON.stringify(data)); };

async function readJson(req) {
  if (!/^application\/json(?:;|$)/i.test(req.headers['content-type'] || '')) throw fail(415, 'Chỉ nhận dữ liệu JSON.');
  const chunks = []; let size = 0;
  for await (const chunk of req) { size += chunk.length; if (size > MAX_BODY) throw fail(413, 'Nội dung vượt quá 12 MB. Hãy dùng ảnh nhỏ hơn.'); chunks.push(chunk); }
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch { throw fail(400, 'JSON không hợp lệ.'); }
}

export function imageBytes(value) {
  const match = /^data:image\/(png|jpeg|webp);base64,([A-Za-z0-9+/]+={0,2})$/.exec(value);
  if (!match) throw fail(400, 'Định dạng ảnh không hợp lệ.');
  const bytes = Buffer.from(match[2], 'base64');
  if (!bytes.length || bytes.length > 2 * 1024 * 1024 || bytes.toString('base64') !== match[2]) throw fail(400, 'Ảnh phải nhỏ hơn hoặc bằng 2 MB và đúng mã base64.');
  const valid = match[1] === 'png' ? bytes.length > 24 && bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])) && bytes.toString('ascii',12,16) === 'IHDR' : match[1] === 'jpeg' ? bytes.length > 10 && bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255 && bytes.at(-2) === 255 && bytes.at(-1) === 217 : bytes.length > 20 && bytes.toString('ascii',0,4) === 'RIFF' && bytes.toString('ascii',8,12) === 'WEBP';
  if (!valid) throw fail(400, 'Nội dung tệp không khớp loại ảnh PNG/JPG/WebP.');
  return { bytes, extension: match[1] === 'jpeg' ? 'jpg' : match[1] };
}

export async function assertPlainPath(root, relative) {
  let current = root;
  for (const part of relative.split('/')) {
    current = path.join(current, part);
    try { if ((await lstat(current)).isSymbolicLink()) throw fail(400, 'Từ chối đường dẫn liên kết.'); } catch(error) { if (error.code !== 'ENOENT') throw error; }
  }
  return current;
}

async function command(root, args, log) {
  await new Promise((resolve,reject) => {
    const child = spawn(process.execPath,args,{ cwd:root,windowsHide:true,shell:false,stdio:['ignore','pipe','pipe'] });
    let output='';
    const collect = chunk => { output += chunk.toString(); if (output.length > 300000) output=output.slice(-300000); };
    child.stdout.on('data',collect); child.stderr.on('data',collect);
    const timer = setTimeout(() => { child.kill(); }, 10*60*1000);
    child.on('error',error => { clearTimeout(timer); reject(error); });
    child.on('close',code => { clearTimeout(timer); log.push(output); if(code === 0) resolve(); else reject(new Error('Tạo website thất bại. Chi tiết nằm trong bản sao lưu; nội dung và bản xem cũ đã được khôi phục.')); });
  });
}

export async function createEditorService({ projectRoot, schema, port=3177, build }) {
  const root = path.resolve(projectRoot);
  if (path.resolve(await realpath(root)).toLowerCase() !== root.toLowerCase()) throw new Error('Project root must be a plain directory.');
  for (const relative of ['lib/site-content.json','out','backups','public/uploads']) await assertPlainPath(root,relative);
  const contentFile = path.join(root,'lib/site-content.json');
  const origin = `http://127.0.0.1:${port}`;
  const token = randomBytes(32).toString('hex');
  let job = null;
  let servingRoot = null;
  const readCurrent = async () => { const raw=await readFile(contentFile); return { raw, revision:digest(raw), content:validateContent(JSON.parse(raw.toString()),schema) }; };
  const buildSite = build || (async log => { await command(root,['node_modules/next/dist/bin/next','build'],log); await command(root,['scripts/compress.mjs'],log); });

  async function run(content, before, task) {
    const log=[];
    let wroteSource=false;
    try {
      const backup = path.join(root,'backups',task.backup);
      await assertPlainPath(root,'backups');
      await mkdir(path.join(root,'backups'),{recursive:true});
      await mkdir(backup,{recursive:false});
      await writeFile(path.join(backup,'site-content.before.json'),before.raw,{flag:'wx'});
      await cp(path.join(root,'out'),path.join(backup,'out'),{recursive:true,dereference:false,errorOnExist:true,force:false});
      servingRoot = path.join(backup,'out');
      const next = structuredClone(content);
      await assertPlainPath(root,'public/uploads');
      for (const field of schema.fields.filter(f=>f.type==='image')) {
        const value=next.values[field.id];
        if (!value.startsWith('data:')) continue;
        const {bytes,extension}=imageBytes(value);
        const filename=digest(bytes)+'.'+extension;
        await mkdir(path.join(root,'public/uploads'),{recursive:true});
        const target=await assertPlainPath(root,'public/uploads/'+filename);
        try { await writeFile(target,bytes,{flag:'wx'}); } catch(error) { if(error.code!=='EEXIST') throw error; if(digest(await readFile(target))!==digest(bytes)) throw new Error('Ảnh trùng tên nhưng khác dữ liệu.'); }
        next.values[field.id]='/uploads/'+filename;
      }
      // Require referenced local images to exist before changing source.
      for (const field of schema.fields.filter(f=>f.type==='image')) if(next.values[field.id].startsWith('/')) {
        const target=await assertPlainPath(root,'public'+next.values[field.id]);
        if(!(await lstat(target)).isFile()) throw new Error('Không tìm thấy ảnh: '+field.label);
      }
      // Recheck optimistic lock after backup, before writing source.
      if ((await readCurrent()).revision !== before.revision) throw new Error('Nội dung đã được thay đổi ở nơi khác. Hãy tải bản đã lưu trước khi áp dụng.');
      const nextRaw=JSON.stringify(next,null,2)+'\n';
      const pending=path.join(root,'lib','.site-content-'+task.id+'.tmp');
      await writeFile(pending,nextRaw,{flag:'wx'}); await rename(pending,contentFile); wroteSource=true;
      await writeFile(path.join(backup,'site-content.after.json'),nextRaw,{flag:'wx'});
      await buildSite(log);
      // Keep hashed assets needed by already-open editor tabs until the next clean build.
      await cp(path.join(backup,'out/_next/static'),path.join(root,'out/_next/static'),{recursive:true,force:false,errorOnExist:false}).catch(error=>{ if(error.code!=='ENOENT') throw error; });
      const current=await readCurrent();
      Object.assign(task,{status:'complete',revision:current.revision,content:current.content,message:'Đã lưu vào mã nguồn và tạo lại bản xem trên máy này.'});
    } catch(error) {
      let rollbackError;
      try {
        if(wroteSource) {
          await writeFile(contentFile,before.raw);
          const out=await assertPlainPath(root,'out');
          if(path.dirname(out)!==root || path.basename(out)!=='out') throw new Error('Invalid rollback path');
          await rm(out,{recursive:true,force:true});
          await cp(path.join(root,'backups',task.backup,'out'),out,{recursive:true,dereference:false});
        }
      } catch(error) { rollbackError=error; }
      Object.assign(task,{status:'failed',message:rollbackError ? 'Khôi phục chưa hoàn tất. Giữ bản nháp và kiểm tra thư mục sao lưu.' : error.message});
      log.push(error.stack || error.message);
      if(rollbackError)log.push(rollbackError.stack);
    } finally {
      // Keep serving backup if rollback failed; never claim a failed build was applied.
      if(task.status==='complete' || (task.status==='failed' && (await readCurrent().catch(()=>null))?.revision===before.revision)) servingRoot=null;
      await writeFile(path.join(root,'backups',task.backup,'build.log'),log.join('\n')).catch(()=>{});
      const { content: _content, ...receipt }=task;
      void _content;
      await writeFile(path.join(root,'backups',task.backup,'result.json'),JSON.stringify(receipt,null,2)+'\n').catch(()=>{});
      task.finished=true;
    }
  }

  async function handle(req,res,pathname) {
    if(!pathname.startsWith('/__editor/'))return false;
    try {
      if(req.headers.host!==`127.0.0.1:${port}` || req.headers.origin && req.headers.origin!==origin || req.headers['sec-fetch-site']==='cross-site' || req.headers['x-pao-editor']!=='1') throw fail(403,'Công cụ chỉ nhận yêu cầu từ trang biên tập trên máy này.');
      if(pathname==='/__editor/session' && req.method==='GET') {
        if(job && !job.finished) throw fail(409,'Một bản đang được áp dụng. Đợi hoàn tất rồi kết nối lại.');
        const {revision,content}=await readCurrent(); json(res,200,{token,revision,content}); return true;
      }
      const received=String(req.headers['x-editor-token']||'');
      if(received.length!==token.length || !timingSafeEqual(Buffer.from(received),Buffer.from(token))) throw fail(403,'Phiên biên tập hết hiệu lực. Hãy kết nối lại.');
      if(pathname==='/__editor/job' && req.method==='GET') { json(res,200,job ? {...job,status:job.finished?job.status:'building'} : {status:'idle'}); return true; }
      if(pathname==='/__editor/apply' && req.method==='POST') {
        if(job && !job.finished) throw fail(409,'Một bản đang được áp dụng.');
        const data=await readJson(req);
        if(!data || Object.keys(data).some(k=>!['revision','content'].includes(k))) throw fail(400,'Yêu cầu không hợp lệ.');
        const before=await readCurrent();
        if(data.revision!==before.revision) throw fail(409,'Nội dung đã đổi trong phiên khác. Xuất bản nháp, tải bản đã lưu và nhập lại thay đổi cần giữ.');
        let content;
        try { content=validateContent(data.content,schema); for(const field of schema.fields.filter(f=>f.type==='image'))if(content.values[field.id].startsWith('data:'))imageBytes(content.values[field.id]); } catch(error) { throw fail(400,error.message); }
        if(JSON.stringify(content)===JSON.stringify(before.content)) throw fail(400,'Chưa có thay đổi để áp dụng.');
        const id=randomBytes(8).toString('hex');
        job={id,status:'building',finished:false,backup:new Date().toISOString().replace(/[:.]/g,'-')+'-editor-'+id,message:'Đang sao lưu và tạo lại website…'};
        json(res,202,{id,status:'building'});
        void run(content,before,job);
        return true;
      }
      throw fail(404,'Không có thao tác này.');
    } catch(error) { json(res,error.status||500,{error:error.status?error.message:'Không thể lưu nội dung. Kiểm tra quyền ghi trong thư mục website.'}); return true; }
  }
  return {handle,getServingRoot:()=>servingRoot,isBusy:()=>Boolean(job && !job.finished)};
}

import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { mkdtemp, mkdir, writeFile, readFile, readdir, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { createEditorService, imageBytes } from './editor-service.mjs';
import { validateContent, validateField } from '../lib/editor-validation.mjs';

const schema={version:1,fields:[
  {id:'title',label:'Tiêu đề',type:'text',maxLength:100},
  {id:'link',label:'Liên kết',type:'link',maxLength:1000},
  {id:'image',label:'Ảnh',type:'image',maxLength:3000000},
]};
const original={version:1,values:{title:'PAO',link:'#trang-chu',image:'/images/test.png'}};
const png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+j6mUAAAAASUVORK5CYII=','base64');
const dataUrl='data:image/png;base64,'+png.toString('base64');

test('content schema rejects missing/unknown fields and invalid payloads',()=>{
  assert.deepEqual(validateContent(original,schema),original);
  for(const invalid of [null,[],{...original,version:2},{...original,extra:true},{version:1,values:{title:'PAO',link:'#x',evil:'x'}},{version:1,values:{...original.values,title:123}}])assert.throws(()=>validateContent(invalid,schema));
});
test('unsafe links, image paths and active image formats are rejected',()=>{
  for(const value of ['javascript:alert(1)','data:text/html,x','//evil.example','/\\evil.example','https://user:pass@example.com','mailto:a@x.com\nBcc:x@y.com','https://example.com\n'])assert.ok(validateField(value,schema.fields[1]),value);
  for(const value of ['/images/../a.png','/images//a.png','data:image/svg+xml;base64,PHN2Zz4=','/other/x.png','javascript:alert(1)'])assert.ok(validateField(value,schema.fields[2]),value);
  for(const value of ['#trai-nghiem','/privacy/','https://pao-os.com/','mailto:cs@pao-os.com','tel:+84925880000'])assert.equal(validateField(value,schema.fields[1]),'',value);
  assert.equal(validateField('<script>alert(1)</script>',schema.fields[0]),'','Markup stays plain text in React.');
});
test('bounded background values and valid file signatures',()=>{
  assert.ok(validateField('NaN',{type:'number',min:.05,max:1,maxLength:50}));
  assert.ok(validateField('2',{type:'number',min:.05,max:1,maxLength:50}));
  assert.ok(validateField('#fff',{type:'color',maxLength:50}));
  assert.ok(validateField('unknown',{type:'select',maxLength:50,options:[{value:'ghost'}]}));
  assert.deepEqual(imageBytes(dataUrl).bytes,png);
  assert.throws(()=>imageBytes('data:image/png;base64,'+Buffer.from('<html>not an image</html>').toString('base64')));
});

async function fixture(t,build) {
  const root=await mkdtemp(path.join(os.tmpdir(),'pao-editor-test-'));
  await mkdir(path.join(root,'lib'),{recursive:true});await mkdir(path.join(root,'public/images'),{recursive:true});await mkdir(path.join(root,'out/_next/static'),{recursive:true});
  await writeFile(path.join(root,'lib/site-content.json'),JSON.stringify(original,null,2)+'\n');await writeFile(path.join(root,'out/index.html'),'ORIGINAL HTML');await writeFile(path.join(root,'out/_next/static/old.js'),'old');await writeFile(path.join(root,'public/images/test.png'),png);
  let service;
  const server=http.createServer(async(req,res)=>{const handled=await service.handle(req,res,new URL(req.url,'http://localhost').pathname);if(!handled)res.writeHead(404).end();});
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const port=server.address().port;const origin=`http://127.0.0.1:${port}`;
  service=await createEditorService({projectRoot:root,schema,port,build:build?log=>build(root,log):async()=>{await writeFile(path.join(root,'out/index.html'),'NEW HTML');}});
  const headers={'x-pao-editor':'1',Origin:origin};
  const request=(route,options={})=>new Promise((resolve,reject)=>{const req=http.request(origin+'/__editor/'+route,{method:options.method||'GET',headers:{...headers,...options.headers}},res=>{let raw='';res.on('data',chunk=>raw+=chunk);res.on('end',()=>{try{resolve({status:res.statusCode,data:JSON.parse(raw)});}catch(error){reject(error);}});});req.on('error',reject);req.end(options.body);});
  const session=(await request('session')).data;
  const apply=(content,revision=session.revision)=>request('apply',{method:'POST',headers:{'Content-Type':'application/json','x-editor-token':session.token},body:JSON.stringify({content,revision})});
  const poll=async()=>{for(let i=0;i<250;i++){const result=await request('job',{headers:{'x-editor-token':session.token}});if(result.data.status!=='building')return result.data;await new Promise(resolve=>setTimeout(resolve,20));}throw new Error('Timed out');};
  t.after(async()=>{server.closeAllConnections();await new Promise(resolve=>server.close(resolve));const resolved=path.resolve(root);assert.equal(path.dirname(resolved).toLowerCase(),path.resolve(os.tmpdir()).toLowerCase());assert.ok(path.basename(resolved).startsWith('pao-editor-test-'));await rm(resolved,{recursive:true,force:true});});
  return {root,service,request,session,apply,poll};
}
test('loopback writer rejects wrong Host, Origin, session and content-type',async t=>{
  const f=await fixture(t);
  assert.equal((await f.request('session',{headers:{Host:'attacker.example'}})).status,403);
  assert.equal((await f.request('session',{headers:{Origin:'https://attacker.example'}})).status,403);
  assert.equal((await f.request('session',{headers:{'x-pao-editor':''}})).status,403);
  assert.equal((await f.request('job',{headers:{'x-editor-token':'wrong'}})).status,403);
  assert.equal((await f.request('apply',{method:'POST',headers:{'x-editor-token':f.session.token,'Content-Type':'text/plain'},body:'{}'})).status,415);
  assert.equal((await f.apply(original,'stale')).status,409);
  assert.equal((await f.apply({...original,values:{...original.values,link:'javascript:alert(1)'}})).status,400);
  assert.equal(await readFile(path.join(f.root,'out/index.html'),'utf8'),'ORIGINAL HTML');
});
test('apply saves content, copies a verified image, preserves backup and rejects stale writes',async t=>{
  const f=await fixture(t);
  const changed={version:1,values:{...original.values,title:'Nội dung mới',image:dataUrl}};
  assert.equal((await f.apply(changed)).status,202);
  const done=await f.poll();assert.equal(done.status,'complete',done.message);
  const saved=JSON.parse(await readFile(path.join(f.root,'lib/site-content.json'),'utf8'));
  assert.equal(saved.values.title,'Nội dung mới');assert.match(saved.values.image,/^\/uploads\/[a-f0-9]{64}\.png$/);
  assert.deepEqual(await readFile(path.join(f.root,'public',saved.values.image.slice(1))),png);
  const backup=path.join(f.root,'backups',done.backup);
  assert.equal(await readFile(path.join(backup,'out/index.html'),'utf8'),'ORIGINAL HTML');
  assert.deepEqual(JSON.parse(await readFile(path.join(backup,'site-content.before.json'),'utf8')),original);
  assert.equal(await readFile(path.join(f.root,'out/index.html'),'utf8'),'NEW HTML');
  assert.equal((await f.apply(changed)).status,409);
});
test('failed build restores source/output and keeps failure evidence',async t=>{
  const f=await fixture(t,async root=>{await writeFile(path.join(root,'out/index.html'),'BROKEN BUILD');throw new Error('Intentional test failure');});
  const before=await readFile(path.join(f.root,'lib/site-content.json'),'utf8');
  await f.apply({...original,values:{...original.values,title:'Should roll back'}});
  const result=await f.poll();assert.equal(result.status,'failed');
  assert.equal(await readFile(path.join(f.root,'lib/site-content.json'),'utf8'),before);
  assert.equal(await readFile(path.join(f.root,'out/index.html'),'utf8'),'ORIGINAL HTML');
  assert.ok((await readdir(path.join(f.root,'backups'))).includes(result.backup));
});
test('only one writer runs while a build is in progress',async t=>{
  let release;const gate=new Promise(resolve=>{release=resolve;});
  const f=await fixture(t,async()=>gate);
  await f.apply({...original,values:{...original.values,title:'First change'}});
  assert.equal((await f.apply({...original,values:{...original.values,title:'Second change'}})).status,409);
  release();assert.equal((await f.poll()).status,'complete');
});

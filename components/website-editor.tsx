'use client';

import { useCallback, useEffect, useMemo, useReducer, useRef, useState, type ChangeEvent } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Check, CheckCheck, ChevronDown, Download, Eye, ImagePlus, LoaderCircle, Monitor, MousePointer2, PanelLeftClose, PencilLine, Redo2, RotateCcw, Save, Search, Smartphone, Tablet, Undo2, Upload, X } from 'lucide-react';
import schemaData from '@/lib/editor-schema.json';
import initial from '@/lib/site-content.json';
import { validateContent, validateField } from '@/lib/editor-validation.mjs';
import type { ContentValues } from './site-content';

type Field = { id: string; group: string; label: string; type: string; maxLength: number; options?: {value:string;label:string}[]; min?:number; max?:number; step?:number };
type Content = {version:number;values:ContentValues};
type Session = {token:string;revision:string;content:Content};
type Draft = {version:number;baseRevision:string;values:ContentValues;savedAt:string};
type History = {past:ContentValues[];present:ContentValues;future:ContentValues[]};
type Action = {type:'change';id:string;value:string}|{type:'load';values:ContentValues}|{type:'replace';values:ContentValues}|{type:'undo'}|{type:'redo'};
const schema = schemaData as {version:number;fields:Field[]};
const groups = [...new Set(schema.fields.map(field => field.group))].sort();
const storageKey = 'pao.website.editor.draft.v1';
function reducer(state:History, action:Action):History {
  if (action.type==='load') return {past:[],present:action.values,future:[]};
  if (action.type==='undo') return state.past.length ? {past:state.past.slice(0,-1),present:state.past.at(-1)!,future:[state.present,...state.future].slice(0,60)} : state;
  if (action.type==='redo') return state.future.length ? {past:[...state.past,state.present].slice(-60),present:state.future[0],future:state.future.slice(1)} : state;
  const next=action.type==='replace'?action.values:{...state.present,[action.id]:action.value};
  if (action.type==='change' && state.present[action.id]===action.value) return state;
  return {past:[...state.past,state.present].slice(-60),present:next,future:[]};
}
function short(value:string) { return value.startsWith('data:image/')?'Ảnh mới được chọn':value.length>130?value.slice(0,130)+'…':value||'(trống)'; }
function download(content:Content) {
  const url=URL.createObjectURL(new Blob([JSON.stringify(content,null,2)+'\n'],{type:'application/json'}));
  const link=document.createElement('a');link.href=url;link.download='pao-noi-dung-'+new Date().toISOString().slice(0,19).replaceAll(':','-')+'.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function PreviewImage({src}:{src:string}) {
  // Uploaded images are local data URLs until applied; no image optimization service is used.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="Ảnh đang biên tập"/>;
}

export default function WebsiteEditor() {
  const [history,dispatch]=useReducer(reducer,{past:[],present:initial.values,future:[]});
  const values=history.present;
  const [saved,setSaved]=useState<ContentValues>(initial.values);
  const [session,setSession]=useState<Session|null>(null);
  const [hydrated,setHydrated]=useState(false);
  const [group,setGroup]=useState('01 · Trang đầu');
  const [selected,setSelected]=useState('trang-chu.copy.2');
  const [search,setSearch]=useState('');
  const [device,setDevice]=useState<1440|768|390>(1440);
  const [picking,setPicking]=useState(true);
  const [notice,setNotice]=useState('Đang kết nối công cụ lưu trên máy này…');
  const [storageStatus,setStorageStatus]=useState('');
  const [busy,setBusy]=useState(false);
  const [panel,setPanel]=useState(true);
  const [previewVersion,setPreviewVersion]=useState(0);
  const [frameSize,setFrameSize]=useState({width:1000,height:800});
  const [modal,setModal]=useState<'apply'|'reset'|null>(null);
  const [importCandidate,setImportCandidate]=useState<Content|null>(null);
  const [oldDraft,setOldDraft]=useState<Draft|null>(null);
  const iframe=useRef<HTMLIFrameElement>(null);
  const previewBox=useRef<HTMLDivElement>(null);
  const dialog=useRef<HTMLDialogElement>(null);
  const fileInput=useRef<HTMLInputElement>(null);
  const latest=useRef({values,picking});
  const field=schema.fields.find(f=>f.id===selected) || schema.fields[0];
  const changed=useMemo(()=>schema.fields.filter(f=>values[f.id]!==saved[f.id]),[values,saved]);
  const invalid=useMemo(()=>schema.fields.filter(f=>validateField(values[f.id],f)),[values]);
  const error=validateField(values[field.id],field);
  const visibleFields=useMemo(()=>schema.fields.filter(f=>search ? `${f.label} ${f.group} ${values[f.id].startsWith('data:')?'':values[f.id]}`.toLocaleLowerCase('vi').includes(search.toLocaleLowerCase('vi')) : f.group===group),[group,search,values]);

  const post=useCallback((data:unknown)=>iframe.current?.contentWindow?.postMessage(data,location.origin),[]);
  const sendPreview=useCallback(()=>{post({type:'pao-editor:content',content:{version:1,values:latest.current.values}});post({type:'pao-editor:pick-mode',enabled:latest.current.picking});},[post]);

  const connect=useCallback(async (restoreDraft:boolean) => {
    try {
      const response=await fetch('/__editor/session',{headers:{'x-pao-editor':'1'},cache:'no-store'});
      if(!response.ok)throw new Error('Chưa bật công cụ lưu. Mở terminal trong thư mục website và chạy npm run editor. Bạn vẫn có thể xem thử và xuất tệp nội dung.');
      const data=await response.json() as Session;
      const content=validateContent(data.content,schema);
      setSession(data);setSaved(content.values);dispatch({type:'load',values:content.values});
      setNotice('Đã kết nối · Lưu vào website trên máy này.');
      if(restoreDraft) {
        try {
          const raw=localStorage.getItem(storageKey);
          if(raw) {
            const draft=JSON.parse(raw) as Draft;
            const valid=validateContent({version:draft.version,values:draft.values},schema);
            if(draft.baseRevision===data.revision) {dispatch({type:'load',values:valid.values});setNotice('Đã mở lại bản nháp trong trình duyệt. Bấm Áp dụng để cập nhật website.');}
            else {setOldDraft(draft);setNotice('Có bản nháp từ phiên cũ. Có thể xuất bản nháp cũ để giữ lại hoặc mở lại sau khi kiểm tra.');}
          }
        } catch {setNotice('Không đọc được bản nháp cũ. Bản website đã lưu vẫn được giữ nguyên.');}
      }
    } catch(error) {
      setSession(null);setNotice((error as Error).message);
      if(restoreDraft)try {const raw=localStorage.getItem(storageKey);if(raw){const draft=JSON.parse(raw) as Draft;dispatch({type:'load',values:validateContent({version:1,values:draft.values},schema).values});}}catch{/* Leave initial content when offline draft is invalid. */}
    } finally {setHydrated(true);}
  },[]);

  // Bootstrap the external local-editor session and browser draft after hydration.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(()=>{void connect(true);},[connect]);
  useEffect(()=>{latest.current={values,picking};sendPreview();},[values,picking,sendPreview]);
  useEffect(()=>{
    const receive=(event:MessageEvent)=>{
      if(event.origin!==location.origin || event.source!==iframe.current?.contentWindow)return;
      if(event.data?.type==='pao-editor:ready')sendPreview();
      if(event.data?.type==='pao-editor:selected') {
        const match=schema.fields.find(f=>f.id===event.data.id);
        if(match){setGroup(match.group);setSearch('');setSelected(match.id);setPanel(true);}
      }
      if(event.data?.type==='pao-editor:link')setNotice('Đích đến: '+String(event.data.href)+'. Dùng “Mở website” để mở liên kết bên ngoài khung biên tập.');
    };
    window.addEventListener('message',receive);return()=>window.removeEventListener('message',receive);
  },[sendPreview]);
  useEffect(()=>{
    const box=previewBox.current;if(!box)return;
    const observer=new ResizeObserver(entries=>{const rect=entries[0].contentRect;setFrameSize({width:rect.width,height:rect.height});});observer.observe(box);return()=>observer.disconnect();
  },[]);
  const storeDraft=useCallback(()=>{
    try {localStorage.setItem(storageKey,JSON.stringify({version:1,baseRevision:session?.revision||'',values,savedAt:new Date().toISOString()}));setStorageStatus('Bản nháp đã lưu trong trình duyệt');}
    catch {setStorageStatus('Trình duyệt không lưu được bản nháp. Hãy xuất tệp JSON để giữ thay đổi.');}
  },[session,values]);
  useEffect(()=>{
    if(!hydrated || oldDraft)return;
    const timer=setTimeout(storeDraft,500);return()=>clearTimeout(timer);
  },[hydrated,storeDraft,oldDraft]);
  useEffect(()=>{
    const handler=(event:KeyboardEvent)=>{
      if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='s'){event.preventDefault();storeDraft();}
      if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='z' && !['INPUT','TEXTAREA'].includes((event.target as HTMLElement).tagName)){event.preventDefault();dispatch({type:event.shiftKey?'redo':'undo'});}
    };
    window.addEventListener('keydown',handler);return()=>window.removeEventListener('keydown',handler);
  },[storeDraft]);
  useEffect(()=>{const current=dialog.current;if(modal||importCandidate){if(!current?.open)current?.showModal();}else if(current?.open)current.close();},[modal,importCandidate]);

  function chooseField(f:Field) {setSelected(f.id);post({type:'pao-editor:focus',id:f.id});}
  function change(value:string) {dispatch({type:'change',id:field.id,value});}
  async function uploadImage(event:ChangeEvent<HTMLInputElement>) {
    const file=event.target.files?.[0];event.target.value='';if(!file)return;
    const id=field.id;
    if(!['image/png','image/jpeg','image/webp'].includes(file.type)||file.size>2*1024*1024){setNotice('Chọn ảnh PNG, JPG hoặc WebP tối đa 2 MB.');return;}
    try {
      const bitmap=await createImageBitmap(file);const pixels=bitmap.width*bitmap.height;bitmap.close();if(pixels>20000000)throw new Error('Ảnh tối đa 20 triệu điểm ảnh.');
      const value=await new Promise<string>((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(String(reader.result));reader.onerror=()=>reject(new Error('Không đọc được ảnh.'));reader.readAsDataURL(file);});
      dispatch({type:'change',id,value});setNotice('Đã chọn ảnh cho bản nháp. Bấm Áp dụng để lưu vào website.');
    }catch(error){setNotice('Không đọc được ảnh: '+(error as Error).message);}
  }
  async function importFile(event:ChangeEvent<HTMLInputElement>) {
    const file=event.target.files?.[0];event.target.value='';if(!file)return;
    if(file.size>12*1024*1024){setNotice('Tệp nội dung tối đa 12 MB.');return;}
    try {setImportCandidate(validateContent(JSON.parse(await file.text()),schema));}catch(error){setNotice('Không nhập được tệp: '+(error as Error).message);}
  }
  async function apply() {
    setModal(null);if(!session||busy)return;setBusy(true);setNotice('Đang sao lưu và tạo lại website. Bạn có thể tiếp tục xem bản hiện tại.');
    const submitted={version:1,values};
    try {
      const response=await fetch('/__editor/apply',{method:'POST',headers:{'Content-Type':'application/json','x-pao-editor':'1','x-editor-token':session.token},body:JSON.stringify({revision:session.revision,content:submitted})});
      const task=await response.json();if(!response.ok)throw new Error(task.error||'Không thể áp dụng.');
      let done=false;
      for(let attempt=0;attempt<660;attempt++) {
        await new Promise(resolve=>setTimeout(resolve,1000));
        const statusResponse=await fetch('/__editor/job',{headers:{'x-pao-editor':'1','x-editor-token':session.token},cache:'no-store'});
        const status=await statusResponse.json();
        if(!statusResponse.ok)throw new Error(status.error||'Mất kết nối trong lúc tạo lại website.');
        if(status.id!==task.id)throw new Error('Phiên áp dụng đã đổi. Kết nối lại để kiểm tra kết quả.');
        if(status.status==='failed')throw new Error(status.message);
        if(status.status==='complete') {
          const content=validateContent(status.content,schema);
          setSaved(content.values);dispatch({type:'load',values:content.values});setSession({...session,revision:status.revision,content});setPreviewVersion(v=>v+1);
          setNotice('Đã áp dụng trên máy này. Bản cũ đã lưu trong backups/'+status.backup+'.');done=true;break;
        }
      }
      if(!done)throw new Error('Tạo website đang kéo dài. Giữ bản nháp và kết nối lại để kiểm tra.');
    }catch(error){setNotice('Chưa áp dụng: '+(error as Error).message);}finally{setBusy(false);}
  }
  const scale=Math.min(1,Math.max(0.1,(frameSize.width-32)/device));
  const previewHeight=Math.max(500,(frameSize.height-32)/scale);
  const formId='editor-value';

  return <main id="noi-dung" className="website-editor">
    <header className="editor-header"><div className="editor-brand"><Link href="/" title="Về website PAO" prefetch={false}><ArrowLeft size={18}/></Link><span className="editor-brand-mark">PAO<span>STUDIO</span></span><div><h1>Biên tập website</h1><p><span className={`editor-dot ${session?'online':''}`}/>{session?'Trên máy này':'Chưa bật lưu vào website'}</p></div></div><div className="editor-header-actions"><span className="editor-change-count">{changed.length?`${changed.length} mục đã sửa`:'Đã đồng bộ'}</span><Link className="editor-button" href="/" target="_blank" rel="noopener" prefetch={false}>Mở website <ArrowUpRight size={15}/></Link><button className="editor-button" onClick={storeDraft} disabled={!hydrated||busy}><Save size={15}/><span>Lưu nháp</span></button><button className="editor-button editor-primary" onClick={()=>setModal('apply')} disabled={!session||!changed.length||!!invalid.length||busy}>{busy?<LoaderCircle size={16} className="editor-spin"/>:<CheckCheck size={17}/>}<span>{busy?'Đang áp dụng…':'Áp dụng'}</span></button></div></header>
    <div className="editor-notice" role="status"><span>{notice}</span>{!session&&!busy&&<button onClick={()=>void connect(false)}>Kết nối lại</button>}</div>
    {oldDraft&&<div className="editor-old-draft"><span>Bản nháp cũ chưa ghi đè bản hiện tại.</span><button onClick={()=>download({version:1,values:oldDraft.values})}>Xuất bản nháp cũ</button><button onClick={()=>{dispatch({type:'replace',values:oldDraft.values});setOldDraft(null);}}>Mở bản nháp cũ</button><button onClick={()=>setOldDraft(null)}>Dùng bản đã lưu</button></div>}
    <div className={`editor-workspace ${panel?'':'editor-panel-hidden'}`}>
      <aside className="editor-inspector" aria-label="Bảng biên tập" inert={busy}>
        <div className="editor-inspector-title"><h2><PencilLine size={17}/> Nội dung</h2><span>{schema.fields.length} mục</span></div>
        <label className="editor-group-label" htmlFor="editor-group">Khu vực website</label><div className="editor-select-wrap"><select id="editor-group" value={group} onChange={event=>{setGroup(event.target.value);setSearch('');const first=schema.fields.find(f=>f.group===event.target.value);if(first)chooseField(first);}}>{groups.map(g=><option key={g}>{g}</option>)}</select><ChevronDown size={15}/></div>
        <label className="editor-search"><Search size={16}/><span className="sr-only">Tìm nội dung</span><input aria-label="Tìm nội dung" placeholder="Tìm chữ, tiêu đề, email…" value={search} onChange={e=>setSearch(e.target.value)}/>{search&&<button aria-label="Xóa tìm kiếm" onClick={()=>setSearch('')}><X size={14}/></button>}</label>
        <div className="editor-field-list" aria-label="Các mục có thể chỉnh sửa">{visibleFields.length?visibleFields.map(f=><button key={f.id} className={`editor-field ${selected===f.id?'active':''}`} aria-pressed={selected===f.id} onClick={()=>chooseField(f)}><span>{f.type==='image'?<ImagePlus size={14}/>:f.type==='link'?<ArrowUpRight size={14}/>:<PencilLine size={13}/>}<strong>{f.label}</strong>{values[f.id]!==saved[f.id]&&<i aria-label="Đã sửa"/>}</span><small>{short(values[f.id])}</small></button>):<p className="editor-empty">Không tìm thấy nội dung phù hợp.</p>}</div>
        <div className="editor-field-form"><div className="editor-field-form-heading"><label htmlFor={formId}>{field.label}</label><button title="Trở về giá trị đã lưu của mục này" aria-label="Đặt lại mục đang chọn" disabled={values[field.id]===saved[field.id]} onClick={()=>change(saved[field.id])}><RotateCcw size={14}/></button></div>
          {field.type==='select'?<select id={formId} value={values[field.id]} onChange={e=>change(e.target.value)}>{field.options?.map(option=><option key={option.value} value={option.value}>{option.label}</option>)}</select>:field.type==='image'?<><div className="editor-image-preview"><PreviewImage src={values[field.id]}/></div><label className="editor-upload-button"><ImagePlus size={16}/> Chọn ảnh mới<input type="file" accept="image/png,image/jpeg,image/webp" onChange={uploadImage}/></label><label className="editor-sub-label" htmlFor={formId}>Hoặc đường dẫn ảnh</label><input id={formId} value={values[field.id].startsWith('data:')?'':values[field.id]} placeholder={values[field.id].startsWith('data:')?'Ảnh mới đã được chọn':'/images/… hoặc https://…'} onChange={e=>change(e.target.value)}/><p>PNG, JPG, WebP · tối đa 2 MB. Giữ ảnh trong suốt để logo và nhân vật hiển thị đẹp.</p></>:field.type==='color'?<div className="editor-color"><input aria-label="Chọn màu" type="color" value={/^#[0-9a-f]{6}$/i.test(values[field.id])?values[field.id]:'#008dff'} onChange={e=>change(e.target.value)}/><input id={formId} value={values[field.id]} onChange={e=>change(e.target.value)} maxLength={7}/></div>:field.type==='number'?<><input id={formId} type="number" min={field.min} max={field.max} step={field.step} value={values[field.id]} onChange={e=>change(e.target.value)}/><p>Từ {field.min} đến {field.max}. Giá trị mới hiển thị ngay trong khung bên cạnh.</p></>:<><textarea id={formId} rows={field.type==='textarea'?5:3} value={values[field.id]} maxLength={field.maxLength} onChange={e=>change(e.target.value)} aria-invalid={!!error} aria-describedby="editor-field-help"/><p id="editor-field-help">{field.type==='link'?'Đích đến: #muc, /duong-dan/, https://…, mailto:… hoặc tel:…':'Văn bản thuần. Giữ nội dung phù hợp với trạng thái sản phẩm đã xác nhận.'}<span>{values[field.id].length}/{field.maxLength}</span></p></>}
          {error&&<p className="editor-error" role="alert">{error}</p>}
        </div>
        <div className="editor-inspector-footer"><p><span className="editor-dot online"/>{storageStatus||'Bản nháp sẽ tự lưu trên trình duyệt'}</p><div><button className="editor-button" onClick={()=>download({version:1,values})}><Download size={14}/>Xuất JSON</button><button className="editor-button" onClick={()=>fileInput.current?.click()}><Upload size={14}/>Nhập JSON</button><input ref={fileInput} hidden type="file" accept="application/json,.json" onChange={importFile}/></div><button className="editor-reset" disabled={!changed.length} onClick={()=>setModal('reset')}>Bỏ các thay đổi trong bản nháp</button></div>
      </aside>
      <section className="editor-preview-area" aria-label="Xem trước website"><div className="editor-preview-toolbar"><div className="editor-preview-tools"><button className="editor-icon-button" aria-label={panel?'Ẩn bảng biên tập':'Hiện bảng biên tập'} onClick={()=>setPanel(!panel)}><PanelLeftClose size={17}/></button><span className="editor-tool-divider"/><button className="editor-icon-button" aria-label="Hoàn tác" disabled={!history.past.length||busy} onClick={()=>dispatch({type:'undo'})}><Undo2 size={17}/></button><button className="editor-icon-button" aria-label="Làm lại" disabled={!history.future.length||busy} onClick={()=>dispatch({type:'redo'})}><Redo2 size={17}/></button></div><div className="editor-device-picker" aria-label="Kích thước xem trước">{([{width:1440,label:'Máy tính',Icon:Monitor},{width:768,label:'Máy tính bảng',Icon:Tablet},{width:390,label:'Điện thoại',Icon:Smartphone}] as const).map(({width,label,Icon})=><button key={width} aria-label={label} aria-pressed={device===width} className={device===width?'active':''} onClick={()=>setDevice(width)}><Icon size={16}/><span>{width}</span></button>)}</div><button className={`editor-pick-button ${picking?'active':''}`} aria-pressed={picking} onClick={()=>setPicking(!picking)}>{picking?<MousePointer2 size={15}/>:<Eye size={15}/>}<span>{picking?'Chọn để sửa':'Tương tác thử'}</span></button></div>
        <div className="editor-preview-hint">{picking?'Bấm vào chữ, logo hoặc ảnh để chọn mục cần sửa.':'Thử menu, tab, FAQ và demo. Bấm “Tương tác thử” để trở lại chọn nội dung.'}<span>{device}px · {Math.round(scale*100)}%</span></div>
        <div ref={previewBox} className="editor-preview-canvas"><div className="editor-frame-shell" style={{width:device*scale,height:previewHeight*scale}}><iframe key={previewVersion} ref={iframe} title="Xem trước website PAO" src="/?__pao_preview=1" onLoad={sendPreview} style={{width:device,height:previewHeight,transform:`scale(${scale})`}}/></div></div>
        <div className="editor-bottom-note"><Check size={13}/><span>Bản nháp chỉ xuất hiện trong khung xem trước. “Áp dụng” cập nhật website trên máy này; xuất bản lên domain là bước riêng.</span></div>
      </section>
    </div>
    <dialog ref={dialog} className="editor-dialog" onCancel={()=>{setModal(null);setImportCandidate(null);}}><div className="editor-dialog-inner"><button className="editor-dialog-close" aria-label="Đóng hộp thoại" onClick={()=>{setModal(null);setImportCandidate(null);}}><X size={18}/></button><span className="editor-dialog-kicker">PAO STUDIO / NỘI DUNG</span><h2>{importCandidate?'Nhập bản nội dung này?':modal==='reset'?'Bỏ thay đổi trong bản nháp?':'Áp dụng vào website trên máy này?'}</h2><p>{importCandidate?'Nội dung tệp sẽ thay thế bản nháp. Bạn có thể hoàn tác trước khi áp dụng.':modal==='reset'?'Bản nháp sẽ trở về nội dung đã lưu gần nhất. Bạn vẫn có thể hoàn tác thao tác này.':`${changed.length} mục sẽ được lưu vào mã nguồn. Công cụ tự sao lưu bản cũ, tạo lại website và giữ bản nháp nếu có lỗi.`}</p>
      {modal==='apply'&&<div className="editor-review-list">{changed.map(f=><div key={f.id}><strong>{f.label}</strong><del>{short(saved[f.id])}</del><span>{short(values[f.id])}</span></div>)}</div>}
      <div className="editor-dialog-actions"><button className="editor-button" onClick={()=>{setModal(null);setImportCandidate(null);}}>Quay lại</button><button className="editor-button editor-primary" onClick={()=>{if(importCandidate){dispatch({type:'replace',values:importCandidate.values});setImportCandidate(null);setNotice('Đã nhập tệp vào bản nháp. Kiểm tra và bấm Áp dụng khi sẵn sàng.');}else if(modal==='reset'){dispatch({type:'replace',values:saved});setModal(null);}else void apply();}}>{importCandidate?'Nhập vào bản nháp':modal==='reset'?'Bỏ thay đổi':'Áp dụng ngay'}</button></div></div></dialog>
  </main>;
}

'use client';
import {useT} from './site-language';

import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { ArrowRight, Check, Compass, PenLine, Workflow, Megaphone, MessagesSquare, ChartNoAxesCombined } from 'lucide-react';
import { EditableLink, EditableText, useContentCollection } from './site-content';
import { demoScenarios as scenarios } from '@/lib/content';

const icons=[Compass,PenLine,Workflow,Megaphone,MessagesSquare,ChartNoAxesCombined];
export default function ProductUseCases() {
  const t=useT();
  const items=useContentCollection('demoScenarios',scenarios);
  const [selected,setSelected]=useState(0);
  const tabs=useRef<Array<HTMLButtonElement|null>>([]);
  const uid=useId();
  function move(event:KeyboardEvent<HTMLButtonElement>) {if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(event.key))return;event.preventDefault();const count=items.length;const forward=event.key==='ArrowRight'||event.key==='ArrowDown';const next=event.key==='Home'?0:event.key==='End'?count-1:(selected+(forward?1:count-1))%count;setSelected(next);tabs.current[next]?.focus();}
  return <div className="product-stories"><div className="product-story-tabs" role="tablist" aria-label={t("Ứng dụng PAO trong doanh nghiệp")}>{items.map((item,i)=>{const Icon=icons[i];return <button key={i} ref={el=>{tabs.current[i]=el;}} id={`${uid}-tab-${i}`} role="tab" aria-selected={selected===i} aria-controls={`${uid}-panel`} tabIndex={selected===i?0:-1} onClick={()=>setSelected(i)} onKeyDown={move}><Icon size={20}/><span><EditableText field={`demoScenarios.${i}.title`}/></span><ArrowRight size={15}/></button>;})}</div><div className="product-story-panel" role="tabpanel" id={`${uid}-panel`} aria-labelledby={`${uid}-tab-${selected}`} tabIndex={0}><div className="product-story-brief"><span>{t("TỪ MỤC TIÊU CỦA BẠN")}</span><h3>“<EditableText field={`demoScenarios.${selected}.prompt`}/>”</h3><p>{t("PAO giúp kết nối bối cảnh, nguồn tri thức và các vai trò cần thiết để hình thành hướng xử lý.")}</p></div><ol className="product-story-steps">{items[selected].steps.map((_,i)=><li key={i}><span>0{i+1}</span><div><EditableText field={`demoScenarios.${selected}.steps.${i}`}/></div><Check size={14}/></li>)}</ol><div className="product-story-result"><span>{t("ĐẦU RA ĐỂ BẠN XEM XÉT")}</span><h4><EditableText field={`demoScenarios.${selected}.result`}/></h4><p>{t("Rõ bước tiếp theo. Có người phụ trách. Bạn giữ quyền quyết định.")}</p><EditableLink field="contact.email.link">{t("Trao đổi nhu cầu của doanh nghiệp")}<ArrowRight size={15}/></EditableLink></div></div></div>;
}

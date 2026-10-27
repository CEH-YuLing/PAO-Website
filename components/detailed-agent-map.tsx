'use client';
import {useT} from './site-language';
import StructureBeam from './structure-beam';

import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { ChartNoAxesCombined, CalendarDays, FileText, Image as ImageIcon, Scissors, Upload, Megaphone, Users, Coins, Link2, UserRound, Minus, Plus, RotateCcw } from 'lucide-react';



const baseModules = [
  { name: 'DASHBOARD', role: 'Tổng quan', icon: ChartNoAxesCombined, tone: '#4ac9ed', children: ['Chỉ số KPI', 'Công việc', 'Thông báo'], targets: [[390,130],[500,108],[610,130]], description: 'Kết nối kế hoạch, công việc và chỉ số trong một góc nhìn chung để người điều hành xem xét.' },
  { name: 'PLANNER', role: 'Lập kế hoạch', icon: CalendarDays, tone: '#49cdec', agent: 0, children: ['Nghiên cứu', 'Chiến lược', 'Quy trình'], targets: [[850,190],[875,235],[895,280]] },
  { name: 'CONTENT', role: 'Nội dung', icon: FileText, tone: '#66b8e8', agent: 1, children: ['Bài viết', 'Kịch bản', 'Mạng xã hội'], targets: [[895,375],[905,420],[905,465]] },
  { name: 'DESIGN', role: 'Thiết kế', icon: ImageIcon, tone: '#69b7df', agent: 2, children: ['Ý tưởng', 'Banner', 'Hình ảnh'], targets: [[905,550],[905,595],[895,640]] },
  { name: 'EDITOR', role: 'Biên tập', icon: Scissors, tone: '#4fc5dc', children: ['Video', 'Tài sản', 'Tinh chỉnh'], targets: [[855,735],[855,780],[835,825]], description: 'Kết nối tài sản, yêu cầu biên tập và vòng xem xét để đội ngũ cùng theo dõi nội dung.' },
  { name: 'PUBLISHING', role: 'Xuất bản', icon: Upload, tone: '#63afdc', children: ['Facebook', 'TikTok', 'Website', 'Telegram'], targets: [[335,900],[445,920],[555,920],[665,900]], description: 'Kết nối lịch nội dung, điểm đến và bước xem xét. Hành động trên nền tảng phụ thuộc kết nối và quyền được cấu hình.' },
  { name: 'ADS', role: 'Quảng cáo', icon: Megaphone, tone: '#61b2db', agent: 5, children: ['Meta Ads', 'TikTok Ads', 'Google Ads'], targets: [[145,735],[145,780],[165,825]] },
  { name: 'CRM', role: 'Khách hàng', icon: Users, tone: '#63bddc', agent: 6, children: ['Hộp thư', 'Khách hàng', 'Chăm sóc'], targets: [[105,550],[95,595],[105,640]] },
  { name: 'FINANCE', role: 'Tài chính', icon: Coins, tone: '#51c8df', agent: 7, children: ['Ngân sách', 'Báo cáo', 'Hiệu quả'], targets: [[105,375],[95,420],[95,465]] },
  { name: 'INTEGRATIONS', role: 'Kết nối', icon: Link2, tone: '#6ab7df', children: ['Claude', 'Codex', 'OpenRouter', 'APIs'], targets: [[150,175],[130,220],[110,265],[110,310]], description: 'Lựa chọn điểm kết nối mô hình, dịch vụ và công cụ phù hợp với nhu cầu và phạm vi quyền của doanh nghiệp.' },
];
const coord = (value: number) => Number(value.toFixed(3));
const positions = baseModules.map((_, i) => { const angle = (i * 36 - 90) * Math.PI / 180; return { x: coord(500 + Math.cos(angle) * 245), y: coord(500 + Math.sin(angle) * 245), angle }; });

export default function DetailedAgentMap() {
  const t=useT();
  const host=useRef<HTMLDivElement>(null),svg=useRef<SVGSVGElement>(null);
  useEffect(()=>{
   const element=host.current,graphic=svg.current;if(!element||!graphic)return;
   const reduced=matchMedia('(prefers-reduced-motion:reduce)');
   const update=()=>{const r=element.getBoundingClientRect(),running=!document.hidden&&!reduced.matches&&r.bottom>0&&r.top<innerHeight;if(running)graphic.unpauseAnimations();else graphic.pauseAnimations();graphic.dataset.beams=running?'running':'paused';};
   const observer=new IntersectionObserver(update,{threshold:.02});observer.observe(element);const frame=requestAnimationFrame(update);
   window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);document.addEventListener('visibilitychange',update);reduced.addEventListener('change',update);
   return()=>{observer.disconnect();cancelAnimationFrame(frame);window.removeEventListener('scroll',update);window.removeEventListener('resize',update);document.removeEventListener('visibilitychange',update);reduced.removeEventListener('change',update);};
  },[]);
  const modules=baseModules.map(module=>({...module,role:t(module.role),children:module.children.map(t),description:'description' in module?t(module.description??''):undefined}));
  const [selected, setSelected] = useState<number|null>(null);
  const [feature, setFeature] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const targets = selected === null ? [] : modules[selected].targets;
  const viewTop = Math.min(150, ...targets.map(([,y]) => y - 40));
  const viewBottom = Math.max(850, ...targets.map(([,y]) => y + 40));
  const uid = useId().replace(/:/g, '');


  function selectModule(index:number){setSelected(value=>value===index?null:index);setFeature(null);}
  function keySelect(event: KeyboardEvent<SVGGElement>, index: number, featureName?: string) {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); if(featureName){setSelected(index);setFeature(featureName);}else selectModule(index); }
  }
  return <div ref={host} className="structure-widget">
    <div className="structure-toolbar"><span><i />PAO STRUCTURE <small>{t("10 CỤM CHỨC NĂNG")}</small></span><div><button aria-label={t("Thu nhỏ sơ đồ đội ngũ")} onClick={() => setZoom(z => Math.max(1, z - 0.25))} disabled={zoom === 1}><Minus size={13} /></button><output aria-label={t("Mức phóng to sơ đồ đội ngũ")}>{Math.round(zoom * 100)}%</output><button aria-label={t("Phóng to sơ đồ đội ngũ")} onClick={() => setZoom(z => Math.min(1.75, z + 0.25))} disabled={zoom === 1.75}><Plus size={13} /></button><button aria-label={t("Đặt lại sơ đồ đội ngũ")} onClick={() => {setZoom(1);setSelected(null);setFeature(null);}}><RotateCcw size={12} /></button></div></div>
    <div className="structure-viewport" tabIndex={0} role="region" aria-label={t("Sơ đồ cấu trúc PAO. Vừa màn hình ở mức 100 phần trăm; có thể cuộn ngang khi phóng to.")}><div className="structure-canvas" style={{ width: `${zoom * 100}%` }}>
      <svg ref={svg} viewBox={`0 ${viewTop} 1000 ${viewBottom-viewTop}`} role="group" aria-label={t("Mười cụm chức năng xoay quanh người dùng và PAO")} className="structure-svg">
        <defs><radialGradient id={`${uid}-back`}><stop stopColor="#0b2a45" stopOpacity=".35" /><stop offset="1" stopColor="#030b1e" stopOpacity="0" /></radialGradient><radialGradient id={`${uid}-core`}><stop stopColor="#0b243b" /><stop offset="1" stopColor="#081a30" /></radialGradient><filter id={`${uid}-glow`} x="-70%" y="-70%" width="240%" height="240%"><feGaussianBlur stdDeviation="3" /></filter></defs>
        <g aria-hidden="true"><circle cx="500" cy="500" r="435" fill={`url(#${uid}-back)`} />{[145,170,200,245,292,320,350].map((r,i)=><circle key={r} cx="500" cy="500" r={r} fill="none" stroke={i % 2 ? '#176998' : '#197a9d'} strokeOpacity={i===3 ? '.4':'.2'} strokeWidth={i===3 ? '1.3':'.7'} strokeDasharray={i % 2 ? '2 5':undefined} />)}
          {Array.from({length:100},(_,i)=>{const a=i*Math.PI/50;const r=i%5===0?330:325;return <line key={i} x1={coord(500+Math.cos(a)*320)} y1={coord(500+Math.sin(a)*320)} x2={coord(500+Math.cos(a)*r)} y2={coord(500+Math.sin(a)*r)} stroke="#3dbbdf" strokeOpacity=".25" strokeWidth="1" />;})}
          <path d="M95 500H905M500 95V905" stroke="#1b729b" strokeOpacity=".12" strokeDasharray="2 8" />
          {positions.map((p,i)=>{const next=positions[(i+1)%positions.length],ax=Math.cos(p.angle),ay=Math.sin(p.angle),outerAngle=Math.atan2(next.y-p.y,next.x-p.x),coreStart={x:coord(500+ax*129),y:coord(500+ay*129)},coreEnd={x:coord(p.x-ax*59),y:coord(p.y-ay*59)},ringStart={x:coord(p.x+Math.cos(outerAngle)*59),y:coord(p.y+Math.sin(outerAngle)*59)},ringEnd={x:coord(next.x-Math.cos(outerAngle)*59),y:coord(next.y-Math.sin(outerAngle)*59)};return <g key={i}><StructureBeam from={ringStart} to={ringEnd} color="#49cded" width={1.2} opacity={.3} duration={4.8+i%3*.4} phase={i*.47}/><StructureBeam from={coreStart} to={coreEnd} color={modules[i].tone} width={selected===i?2:1.6} opacity={selected===i?.75:.45} duration={2.9+i%4*.35} phase={i*.43} active={selected===i}/><circle cx={coord(500+ax*124)} cy={coord(500+ay*124)} r={selected===i?5:3} fill={modules[i].tone}/></g>;})}
        </g>
        {modules.map((module,i)=>{
          const p=positions[i]; const Icon=module.icon; const active=selected===i;
          return <g key={module.name} className={`structure-module ${active?'is-selected':''}`} style={{'--module-tone':module.tone} as CSSProperties}>
            <g id={`${uid}-branches-${i}`} aria-hidden={!active}>{active&&module.children.map((label,j)=>{const [x,y]=module.targets[j];const w=module.name==='PUBLISHING'?99:module.name==='DASHBOARD'?100:140;const direction=x<500?-1:1;const anchorX=module.name==='DASHBOARD'||module.name==='PUBLISHING'?x:x-direction*w/2;const anchorY=module.name==='DASHBOARD'?y+16:module.name==='PUBLISHING'?y-16:y;const startX=coord(p.x+Math.cos(Math.atan2(y-p.y,x-p.x))*55);const startY=coord(p.y+Math.sin(Math.atan2(y-p.y,x-p.x))*55);const midX=coord((startX+anchorX)/2);return <g key={label} className="structure-satellite" role="button" tabIndex={0} aria-label={`${t("Xem")} ${label} — ${module.name}`} aria-pressed={selected===i&&feature===label} onClick={()=>{setSelected(i);setFeature(label);}} onKeyDown={event=>keySelect(event,i,label)}><StructureBeam from={{x:startX,y:startY}} to={{x:anchorX,y:anchorY}} d={`M${startX} ${startY} L${midX} ${startY} L${anchorX} ${anchorY}`} color={module.tone} width={1.3} opacity={.5} duration={2.8+j*.35} phase={j*.6} active={feature===label}/><circle cx={startX} cy={startY} r="3.5" fill="#bcf6ff" /><rect x={x-w/2} y={y-16} width={w} height="32" rx="16" fill="#06162c" stroke={module.tone} strokeOpacity={active?'.9':'.6'} /><circle cx={x-w/2+15} cy={y} r="2.5" fill={module.tone} /><text x={x+4} y={y+4.5} textAnchor="middle" fill="#c5dce9" fontSize="12.5">{label}</text></g>;})}</g>
            <g role="button" tabIndex={0} aria-label={`${t("Khám phá")} ${module.name} — ${module.role}`} aria-pressed={active} aria-expanded={active} aria-controls={`${uid}-branches-${i}`} onClick={()=>selectModule(i)} onKeyDown={event=>keySelect(event,i)} className="structure-node">
              <title>{`${module.name} · ${module.role}`}</title><circle cx={p.x} cy={p.y} r="57" fill="none" stroke={module.tone} strokeWidth={active?'5':'3'} opacity={active?'.7':'.4'} filter={`url(#${uid}-glow)`} />
              <circle cx={p.x} cy={p.y} r="57" fill={`url(#${uid}-core)`} stroke={module.tone} strokeWidth={active?'2.2':'1.4'} /><circle cx={p.x} cy={p.y} r="52" fill="none" stroke={module.tone} strokeOpacity=".45" strokeWidth=".7" /><circle cx={p.x} cy={p.y} r="61" fill="none" stroke={module.tone} strokeOpacity={active?'.7':'.22'} strokeWidth="1" strokeDasharray="85 30 15 40" />
              <Icon x={p.x-13} y={p.y-28} width={26} height={26} stroke={module.tone} strokeWidth={1.8} aria-hidden="true" /><text x={p.x} y={p.y+20} textAnchor="middle" fill="#e2f5ff" fontSize={module.name==='INTEGRATIONS'?'11':'14'} fontWeight="800" letterSpacing=".3">{module.name}</text>
              {[0,90,180,270].map(a=><circle key={a} cx={coord(p.x+Math.cos(a*Math.PI/180)*57)} cy={coord(p.y+Math.sin(a*Math.PI/180)*57)} r="3" fill={module.tone} />)}
            </g>
          </g>;
        })}
        <g className="structure-core" aria-hidden="true"><circle cx="500" cy="500" r="129" fill="none" stroke="#1685e6" strokeWidth="9" opacity=".14" /><circle cx="500" cy="500" r="122" fill="none" stroke="#31cdff" strokeWidth="1.5" /><circle cx="500" cy="500" r="113" fill="none" stroke="#1685e6" strokeWidth="5" strokeDasharray="100 25 35 20" /><circle cx="500" cy="500" r="105" fill={`url(#${uid}-core)`} stroke="#29ccff" strokeWidth="1.3" /><circle cx="500" cy="500" r="94" fill="none" stroke="#1375ba" strokeWidth=".8" /><UserRound x="479" y="438" width="42" height="42" stroke="#67eaff" strokeWidth="1.6" /><image href="/brand/pao-primary-v2-200.webp" x="451" y="492" width="98" height="42" preserveAspectRatio="xMidYMid meet" /><text x="500" y="557" textAnchor="middle" fill="#bce7fb" fontSize="10" fontWeight="700" letterSpacing="1.8">{t("BẠN ĐỊNH HƯỚNG")}</text></g>
      </svg>
    </div></div>
    <p className="structure-hint">{t("Cấu trúc giải pháp PAO · Chọn từng cụm để tìm hiểu")}<span>{t(" · Phóng to để đọc rõ, kéo ngang khi đã phóng to")}</span></p>
    <div className="structure-mobile-selector" aria-label={t("Chọn cụm chức năng")}>{modules.map((module,i)=><button key={module.name} aria-pressed={selected===i} aria-expanded={selected===i} onClick={()=>selectModule(i)}>{module.name}</button>)}</div>
  </div>;
}

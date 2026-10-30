import { BookOpen, Bot, Cloud, Database, FileText, FolderKanban, GitBranch, Layers3, Monitor, Network, ShieldCheck, Workflow } from 'lucide-react';
import type { EditorialSlug } from '@/lib/editorial-pages';
import type { Locale } from '@/lib/locale';
import { AboutOriginGraphic } from './about-visuals';

// Symbolic editorial illustrations only; these are not product interface screenshots.
export default function EditorialVisual({slug,locale}:{slug:EditorialSlug;locale:Locale}) {
  if(slug==='doi-ngu') return <AboutOriginGraphic locale={locale}/>;
  const id=`editorial-${slug}`;
  const icons=slug==='tinh-nang'?[Bot,Workflow,Database,ShieldCheck,FolderKanban,Network]:slug==='blog'?[BookOpen,FileText,GitBranch,Layers3]:[Cloud,Monitor];
  return <div className={`editorial-visual editorial-visual-${slug}`} aria-hidden="true">
    <svg viewBox="0 0 600 460" fill="none" focusable="false">
      <defs><radialGradient id={`${id}-halo`}><stop stopColor="#1262a8" stopOpacity=".4"/><stop offset="1" stopColor="#07182c" stopOpacity="0"/></radialGradient><linearGradient id={`${id}-panel`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#123c64"/><stop offset="1" stopColor="#081a30"/></linearGradient><linearGradient id={`${id}-line`}><stop stopColor="#277ab2"/><stop offset=".5" stopColor="#83e4f1"/><stop offset="1" stopColor="#277ab2"/></linearGradient></defs>
      <ellipse cx="300" cy="230" rx="290" ry="220" fill={`url(#${id}-halo)`}/>
      <g stroke="#246395" opacity=".4">{[95,145,195].map(r=><circle key={r} cx="300" cy="230" r={r} strokeDasharray={r===195?'2 10':undefined}/>)}<path d="M45 230H555M300 25V435" strokeDasharray="3 9"/></g>
      <g stroke="#2c7eac" opacity=".25">{[120,180,240,300,360].map(y=><path key={y} d={`M65 ${y}H535`}/>)}{[100,180,260,340,420,500].map(x=><path key={x} d={`M${x} 65V395`}/>)}</g>
      {slug==='download'?<>
        <path d="M197 215H403M197 245H403" stroke={`url(#${id}-line)`} strokeWidth="2" strokeDasharray="5 7"/>
        {[145,455].map((x,i)=>{const Icon=icons[i];return <g key={x} transform={`translate(${x} 230)`}><rect x="-88" y="-101" width="176" height="202" rx="22" fill={`url(#${id}-panel)`} stroke="#3e8ebb"/><Icon x={-35} y={-60} width="70" height="70" stroke="#8bdff2" strokeWidth="1.2"/><path d="M-58 39H58M-58 55H36M-58 71H48" stroke="#3d6d91" strokeWidth="2"/><circle cx="-57" cy="-80" r="3" fill="#63d9ef"/><text y="-118" textAnchor="middle" fill="#9cc5df" fontSize="12" letterSpacing="2">{i?'DESKTOP / PC':'CLOUD / VPS'}</text></g>})}
        <rect x="230" y="183" width="140" height="94" rx="17" fill="#0a2745" stroke="#429bc3"/><image href="/brand/pao-primary-v2-200.webp" x="246" y="203" width="108" height="46" preserveAspectRatio="xMidYMid meet"/>
      </>:<>
        {icons.map((Icon,i)=>{const angle=(i/icons.length)*Math.PI*2-Math.PI/2;const x=300+Math.cos(angle)*182,y=230+Math.sin(angle)*174;return <g key={i}><path d={`M300 230L${x} ${y}`} stroke={`url(#${id}-line)`} opacity=".7"/><circle cx={(300+x)/2} cy={(230+y)/2} r="3" fill="#8ee7f4"/><g transform={`translate(${x} ${y})`}><rect x="-36" y="-35" width="72" height="70" rx="16" fill={`url(#${id}-panel)`} stroke="#3d8cb9"/><Icon x="-16" y="-16" width="32" height="32" stroke="#8ad8f2" strokeWidth="1.3"/></g></g>})}
        <circle cx="300" cy="230" r="91" fill="#08223d" stroke="#348bc2"/><circle cx="300" cy="230" r="79" stroke="#2f648e" strokeDasharray="60 12 8 12"/>
        {slug==='blog'?<><BookOpen x="270" y="188" width="60" height="60" stroke="#9be6f3" strokeWidth="1"/><text x="300" y="275" textAnchor="middle" fill="#a8cbe3" fontSize="11" letterSpacing="2">PAO INSIGHTS</text></>:<><image href="/brand/pao-primary-v2-200.webp" x="244" y="197" width="112" height="47" preserveAspectRatio="xMidYMid meet"/><text x="300" y="267" textAnchor="middle" fill="#9dd5ee" fontSize="11" letterSpacing="2">PAO OS</text></>}
      </>}
      <path d="M80 423H520" stroke="#255075"/><g fill="#69c8ea">{[80,190,300,410,520].map(x=><circle key={x} cx={x} cy="423" r="2.5"/>)}</g>
    </svg>
  </div>;
}

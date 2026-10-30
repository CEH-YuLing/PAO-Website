import { BarChart3, Bot, FileText, Layers3, Link2, Megaphone, Network, PenTool, Users, Workflow } from 'lucide-react';
import type { Locale } from '@/lib/locale';

const copy = {
  vi: { agents: 'AI Agents', content: 'Nội dung', crm: 'Khách hàng', workflow: 'Quy trình', ads: 'Quảng cáo', people: 'Con người', data: 'Dữ liệu', ai: 'AI Agent', graphic: 'Minh hoạ kết nối công việc, dữ liệu và AI trong PAO OS', diagram: 'Định hướng tổ chức AI Agent', roles: ['Lập kế hoạch', 'Nội dung', 'Thiết kế', 'Quảng cáo', 'Khách hàng', 'Quy trình', 'Phân tích', 'Tích hợp'], control: 'CON NGƯỜI GIỮ QUYỀN QUYẾT ĐỊNH', origin: 'PHÁT TRIỂN TẠI VIỆT NAM' },
  en: { agents: 'AI Agents', content: 'Content', crm: 'Customers', workflow: 'Workflow', ads: 'Ads', people: 'People', data: 'Data', ai: 'AI Agents', graphic: 'Illustration of connected work, data and AI in PAO OS', diagram: 'AI Agent organization concept', roles: ['Planning', 'Content', 'Design', 'Advertising', 'Customers', 'Workflows', 'Analytics', 'Integrations'], control: 'PEOPLE KEEP DECISION-MAKING AUTHORITY', origin: 'DEVELOPED IN VIETNAM' },
  zh: { agents: 'AI Agents', content: '内容', crm: '客户', workflow: '流程', ads: '广告', people: '人员', data: '数据', ai: 'AI 智能体', graphic: 'PAO OS 连接工作、数据与 AI 的示意图', diagram: 'AI Agent 组织方式示意', roles: ['规划', '内容', '设计', '广告', '客户', '流程', '分析', '集成'], control: '人保留决策权', origin: '在越南开发' },
};

export function AboutHeroGraphic({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const node = (x: number, y: number, label: string, Icon: typeof Users, wide = false) => <g transform={`translate(${x} ${y})`} key={label}>
    <rect x={wide ? -84 : -66} y="-33" width={wide ? 168 : 132} height="66" rx="13" fill="url(#about-node-fill)" stroke="#328cda" strokeOpacity=".85" />
    <path d={`M${wide ? -68 : -50} -32H${wide ? 68 : 50}`} stroke="#6ee5ff" strokeOpacity=".7" />
    <rect x={wide ? -65 : -49} y="-18" width="36" height="36" rx="10" fill="#123f72" stroke="#2b90ca" strokeOpacity=".6" />
    <Icon x={wide ? -58 : -42} y="-11" width="22" height="22" stroke="#91eeff" strokeWidth="1.5" />
    <text x={wide ? -17 : -1} y="5" fill="#d7edff" fontSize="12" fontWeight="550">{label}</text>
  </g>;
  return <div className="about-hero-graphic" role="img" aria-label={c.graphic}>
    <svg viewBox="0 0 640 510" fill="none" focusable="false">
      <defs>
        <radialGradient id="about-space"><stop stopColor="#06468a" stopOpacity=".6" /><stop offset="1" stopColor="#02112a" stopOpacity="0" /></radialGradient>
        <linearGradient id="about-node-fill" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#133c70" /><stop offset="1" stopColor="#071a36" /></linearGradient>
        <linearGradient id="about-platform" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#0e4f8a" /><stop offset="1" stopColor="#03162d" /></linearGradient>
        <linearGradient id="about-light"><stop stopColor="#136aff" stopOpacity=".15" /><stop offset=".5" stopColor="#56e6ff" /><stop offset="1" stopColor="#1676ff" stopOpacity=".2" /></linearGradient>
        <filter id="about-soft-glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="4" /></filter>
      </defs>
      <ellipse cx="335" cy="270" rx="300" ry="245" fill="url(#about-space)" />
      <g stroke="#197dd8" strokeOpacity=".23"><circle cx="335" cy="262" r="193" /><circle cx="335" cy="262" r="159" /><circle cx="335" cy="262" r="126" /><circle cx="335" cy="262" r="224" strokeDasharray="2 11" /><path d="M335 38V461M110 262H560" strokeDasharray="3 8" /></g>
      <g stroke="#1b8ce1" strokeOpacity=".25">{[65,135,205,275,345,415,485,555,625].map(x => <path key={x} d={`M335 345L${x} 498`} />)}{[393,425,464,497].map(y => <ellipse key={y} cx="335" cy={y} rx={(y-340)*2.4} ry={(y-340)*.25} />)}</g>
      <ellipse cx="335" cy="405" rx="276" ry="59" stroke="url(#about-light)" strokeWidth="2" />
      <ellipse cx="335" cy="405" rx="225" ry="44" stroke="#2a92e6" strokeOpacity=".6" />
      <g stroke="#4ddcff" strokeWidth="1.5"><path d="M335 104V175M160 166C195 166 225 190 249 214M512 166C470 166 446 194 423 215M104 276H205M566 276H466" /><path d="M335 104V175M160 166C195 166 225 190 249 214M512 166C470 166 446 194 423 215M104 276H205M566 276H466" strokeWidth="6" opacity=".35" filter="url(#about-soft-glow)" /></g>
      <path d="M180 320V355C180 399 490 399 490 355V320" fill="url(#about-platform)" stroke="#1e82bd" />
      <ellipse cx="335" cy="320" rx="155" ry="36" fill="#072f58" stroke="#31c3f4" strokeWidth="2" />
      <ellipse cx="335" cy="320" rx="145" ry="29" stroke="#2188d9" strokeOpacity=".8" />
      <ellipse cx="335" cy="315" rx="125" ry="23" fill="#0c69c2" opacity=".27" filter="url(#about-soft-glow)" />
      <image href="/brand/pao-primary-v2-200.webp" x="203" y="206" width="264" height="111" preserveAspectRatio="xMidYMid meet" />
      <text x="335" y="375" textAnchor="middle" fill="#9beaff" fontSize="18" letterSpacing="3" fontWeight="600">PAO OS</text>
      <text x="335" y="398" textAnchor="middle" fill="#65a9d6" fontSize="7" letterSpacing="2.4">BUSINESS OPERATING SYSTEM</text>
      {node(335,70,c.agents,Bot,true)}{node(151,151,c.content,FileText)}{node(516,151,c.workflow,Workflow)}{node(95,272,c.crm,Users)}{node(570,272,c.ads,BarChart3)}
      <g fill="#6deaff">{[[335,122],[205,191],[464,191],[174,276],[503,276],[145,405],[527,409],[237,95],[430,84],[79,369],[571,356]].map(([x,y]) => <g key={`${x}-${y}`}><circle cx={x} cy={y} r="7" opacity=".55" filter="url(#about-soft-glow)" /><circle cx={x} cy={y} r="2.5" /></g>)}</g>
      {[c.people,c.data,c.ai].map((label,i)=><g key={label} transform={`translate(${210+i*125} 460)`}><rect x="-55" y="-16" width="110" height="32" rx="16" fill="#071c37" stroke="#1f729d" /><circle cx="-36" r="3" fill="#47dcf2" /><text x="4" y="4" fill="#a3cfe5" fontSize="10" textAnchor="middle">{label}</text></g>)}
    </svg>
  </div>;
}

export function AboutAgentDiagram({ locale }: { locale: Locale }) {
  const c=copy[locale];
  const roles=['Planner','Content','Design','Ads','CRM','Workflow','Analytics','Integrations'];
  const icons=[Layers3,FileText,PenTool,Megaphone,Users,Workflow,BarChart3,Link2];
  return <div className="about-agent-architecture" role="img" aria-label={c.diagram}>
    <svg className="about-agent-lines" viewBox="0 0 1000 390" preserveAspectRatio="none" fill="none" aria-hidden="true"><defs><linearGradient id="about-agent-beam"><stop stopColor="#1253ab" /><stop offset=".5" stopColor="#59dcff" /><stop offset="1" stopColor="#1253ab" /></linearGradient></defs><g stroke="url(#about-agent-beam)" strokeWidth="1.5">{[50,145,240,335].map((y,i)=><g key={y}><path d={`M220 ${y}H270C340 ${y} 335 ${155+i*22} 410 ${155+i*22}`} /><path d={`M780 ${y}H730C660 ${y} 665 ${155+i*22} 590 ${155+i*22}`} /></g>)}</g><g fill="#7deaff">{[50,145,240,335].map(y=><g key={y}><circle cx="270" cy={y} r="3" /><circle cx="730" cy={y} r="3" /></g>)}</g></svg>
    <div className="about-agent-core" aria-hidden="true"><div><Network size={28} strokeWidth={1} /><svg viewBox="0 0 240 105" focusable="false"><image href="/brand/pao-primary-v2-200.webp" width="240" height="100" preserveAspectRatio="xMidYMid meet" /></svg><strong>PAO OS</strong></div><span>{c.control}</span></div>
    {roles.map((role,i)=>{const Icon=icons[i];return <div className={`about-agent-role about-agent-role-${i}`} key={role} aria-hidden="true"><span><Icon size={25} strokeWidth={1.3} /></span><div><strong>{role} Agent</strong><small>{c.roles[i]}</small></div></div>})}
    <span className="about-agent-caption">{c.diagram}</span>
  </div>;
}

export function AboutOriginGraphic({locale}:{locale:Locale}) {
  return <div className="about-origin-graphic" aria-hidden="true"><svg viewBox="0 0 540 370" fill="none" focusable="false"><defs><radialGradient id="about-ivn-halo"><stop stopColor="#1556a3" stopOpacity=".6" /><stop offset="1" stopColor="#071428" stopOpacity="0" /></radialGradient></defs><ellipse cx="270" cy="190" rx="258" ry="175" fill="url(#about-ivn-halo)" /><g stroke="#2364a1" strokeOpacity=".5">{[90,140,190,240,290,340,390,440].map(x=><path key={x} d={`M${x} 55V315`} />)}{[75,125,175,225,275,315].map(y=><path key={y} d={`M60 ${y}H480`} />)}<circle cx="270" cy="180" r="126" /><circle cx="270" cy="180" r="95" strokeDasharray="3 8" /></g><g stroke="#36b6e4" strokeWidth="1.5"><path d="M92 111 185 153M450 95 353 151M96 268 184 210M452 267 355 211" /></g>{[[92,111],[450,95],[96,268],[452,267]].map(([x,y])=><g key={x+y}><circle cx={x} cy={y} r="15" fill="#0b2743" stroke="#359bd2" /><circle cx={x} cy={y} r="4" fill="#65ddf7" /></g>)}<rect x="158" y="128" width="224" height="111" rx="18" fill="#09213b" stroke="#418ec9" /><text x="270" y="176" textAnchor="middle" fontSize="33" fontWeight="650" fill="#d7ebff" letterSpacing="3">IVN</text><text x="270" y="210" textAnchor="middle" fontSize="15" fill="#7bbfdf" letterSpacing="5">NETWORK</text><text x="270" y="334" fill="#69aed0" textAnchor="middle" fontSize="9" letterSpacing="2">{copy[locale].origin}</text></svg></div>;
}

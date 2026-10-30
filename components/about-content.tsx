import { ArrowRight, Database, Layers3, Network, ShieldCheck, Users, Workflow } from 'lucide-react';
import { aboutCopy } from '@/lib/about-page';
import { localizedPath, type Locale } from '@/lib/locale';
import { AboutHeroGraphic, AboutOriginGraphic } from './about-visuals';

function Emphasis({ text }: { text: string }) {
  return <>{text.split(/(\*\*.*?\*\*)/g).map((part,i)=>part.startsWith('**')&&part.endsWith('**')?<strong key={i}>{part.slice(2,-2)}</strong>:part)}</>;
}

export default function AboutContent({ locale }: { locale: Locale }) {
  const c=aboutCopy[locale];
  const ui={vi:{navigation:'Trong trang này',explore:'Tìm hiểu thêm'},en:{navigation:'On this page',explore:'Explore further'},zh:{navigation:'本页内容',explore:'进一步了解'}}[locale];
  const problemIcons=[Layers3,Network,Workflow];
  const businessIcons=[Users,Network,Database,ShieldCheck,Layers3];
  const principleIcons=[Network,ShieldCheck,Workflow];
  const flowIcons=[Network,Database,Workflow,Layers3,ShieldCheck];
  const flowLabels={vi:['nghiên cứu thông tin','phân tích dữ liệu','chuẩn bị nội dung','tổng hợp kết quả','chuyển đến người phụ trách phê duyệt'],en:['researching information','analyzing data','preparing content','bringing results together','sending them to the responsible person for approval'],zh:['信息研究','数据分析','内容准备','结果汇总','提交给负责人审批']}[locale];
  const url=`https://pao-os.com${localizedPath('/gioi-thieu/',locale)}`;
  const jsonLd={'@context':'https://schema.org','@type':'AboutPage','@id':`${url}#page`,url,name:c.seoTitle,description:c.description,inLanguage:{vi:'vi',en:'en',zh:'zh-CN'}[locale],about:{'@id':'https://pao-os.com/#brand'},isPartOf:{'@id':'https://pao-os.com/#website'}};
  return <article className="about-page about-rich-page about-design-v3 about-copy-20261029">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd).replace(/</g,'\\u003c')}} />
    <header className="editorial-hero about-v3-hero">
      <div className="editorial-hero-copy"><span className="editorial-kicker"><i />BUSINESS OPERATING SYSTEM</span><h1>{c.title}</h1><p className="about-v3-subtitle"><strong>{c.subtitle}</strong></p>{c.intro.slice(0,2).map(text=><p className="about-v3-intro" key={text}><Emphasis text={text} /></p>)}</div>
      <AboutHeroGraphic locale={locale} />
    </header>
    <div className="about-v3-intro-followup">{c.intro.slice(2).map(text=><p key={text}><Emphasis text={text} /></p>)}</div>
    <nav className="about-toc" aria-label={ui.navigation}>{c.sections.map((section,i)=><a key={section.id} href={`#${section.id}`}><span>{String(i+1).padStart(2,'0')}</span>{section.title}<ArrowRight size={13} /></a>)}</nav>
    {c.sections.map((section,i)=><section key={section.id} id={section.id} className={`about-v3-section about-v3-type-${section.variant}`}>
      <header className="about-v3-section-heading"><span className="editorial-section-index">{String(i+1).padStart(2,'0')} / {section.variant==='origin'?'IVN NETWORK':'PAO OS'}</span><h2>{section.title}</h2><h3>{section.subtitle}</h3></header>
      {section.variant==='story'?<>
        <div className="about-v3-problems">{section.paragraphs.slice(0,3).map((text,j)=>{const Icon=problemIcons[j];return <div key={text}><span className="about-v3-icon"><Icon size={25} strokeWidth={1.5} aria-hidden="true" /></span><p><Emphasis text={text} /></p></div>})}</div>
        <p className="about-story-question">{section.paragraphs[3]}</p><p className="about-v3-quote"><Emphasis text={section.paragraphs[4]} /></p>{section.paragraphs.slice(5).map(text=><p className="about-v3-section-after" key={text}>{text}</p>)}
      </>:section.variant==='coordination'?<>
        <div className="about-v3-chief-intro"><div>{section.paragraphs.slice(0,2).map(text=><p key={text}><Emphasis text={text} /></p>)}</div><div>{section.paragraphs.slice(2,4).map(text=><p key={text}>{text}</p>)}</div></div>
        <div className="about-copy-coordination" aria-hidden="true"><div className="about-copy-core"><svg viewBox="0 0 240 105" focusable="false"><image href="/brand/pao-primary-v2-200.webp" width="240" height="100" preserveAspectRatio="xMidYMid meet" /></svg><strong>PAO AI</strong></div><ol className="about-copy-workflow">{flowLabels.map((label,j)=>{const Icon=flowIcons[j];return <li key={label}><span className="about-v3-icon"><Icon size={25} strokeWidth={1.3} /></span><small>{String(j+1).padStart(2,'0')}</small><span>{label}</span></li>})}</ol></div>
        <p className="about-v3-section-after">{section.paragraphs[4]}</p><div className="about-v3-control"><ShieldCheck size={31} strokeWidth={1.3} aria-hidden="true" /><div><p><Emphasis text={section.paragraphs[5]} /></p><p>{section.paragraphs[6]}</p></div></div>
      </>:section.variant==='business'?<>
        <div className="about-v3-section-lead">{section.paragraphs.map(text=><p key={text}>{text}</p>)}</div>
        <ul className="about-v3-applications">{section.items?.map((text,j)=>{const Icon=businessIcons[j];return <li key={text}><span className="about-v3-icon"><Icon size={25} strokeWidth={1.4} aria-hidden="true" /></span><p><Emphasis text={text} /></p></li>})}</ul>
        {section.after?.map(text=><p className="about-rich-note" key={text}>{text}</p>)}
      </>:section.variant==='principles'?<div className="about-rich-cards">{[[0,3],[3,5],[5,7]].map(([start,end],j)=>{const Icon=principleIcons[j];return <div key={start}><span className="about-v3-icon"><Icon size={27} strokeWidth={1.3} aria-hidden="true" /></span>{section.paragraphs.slice(start,end).map(text=><p key={text}>{text}</p>)}</div>})}</div>
      :section.variant==='origin'?<div className="about-v3-origin-grid"><div>{section.paragraphs.map(text=><p key={text}><Emphasis text={text} /></p>)}</div><AboutOriginGraphic locale={locale} /></div>
      :<div className="about-vision-copy"><div className="about-v3-chief-intro">{section.paragraphs.slice(0,2).map(text=><p key={text}>{text}</p>)}</div><p>{section.paragraphs[2]}</p><p className="about-v3-quote"><Emphasis text={section.paragraphs[3]} /></p><p>{section.paragraphs[4]}</p></div>}
    </section>)}
    <section className="editorial-closing about-v3-closing"><div><h2>{c.closing.title}</h2><p>{c.closing.paragraph}</p></div><nav className="editorial-actions" aria-label={ui.explore}><a className="button button-primary" href={localizedPath('/solutions/',locale)}>{c.closing.solutions}<ArrowRight size={17} /></a><a className="editorial-text-link" href={localizedPath('/contact/',locale)}>{c.closing.contact}<ArrowRight size={17} /></a></nav></section>
  </article>;
}

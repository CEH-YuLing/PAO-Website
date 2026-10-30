import { ArrowRight, BookOpen, Bot, Cloud, Code2, Database, FileText, FolderKanban, Globe2, Handshake, Layers3, Megaphone, Monitor, Network, ShieldCheck, Users, Workflow } from 'lucide-react';
import { getEditorialPage, type EditorialBlock, type EditorialSection, type EditorialSlug } from '@/lib/editorial-pages';
import { localizedPath, type Locale } from '@/lib/locale';
import EditorialVisual from './editorial-visuals';

function Emphasis({text}:{text:string}) {return <>{text.split(/(\*\*.*?\*\*)/g).map((part,i)=>part.startsWith('**')&&part.endsWith('**')?<strong key={i}>{part.slice(2,-2)}</strong>:part)}</>;}
function Block({block,locale}:{block:EditorialBlock;locale:Locale}) {
  if(block.kind==='heading')return <h3 id={block.id}><Emphasis text={block.text??''}/></h3>;
  if(block.kind==='list'){const List=block.ordered?'ol':'ul';return <List className={block.ordered?'editorial-numbered-list':undefined}>{block.items?.map((item,i)=><li key={i}><Emphasis text={item}/></li>)}</List>;}
  if(block.kind==='table')return <div className="editorial-table-scroll" role="region" aria-label={{vi:'Bảng so sánh phương án triển khai',en:'Deployment comparison table',zh:'部署方案比较表'}[locale]} tabIndex={0}><table><thead><tr>{block.header?.map(cell=><th scope="col" key={cell}>{cell}</th>)}</tr></thead><tbody>{block.rows?.map((row,i)=><tr key={i}>{row.map((cell,j)=>j===0?<th scope="row" key={j}>{cell}</th>:<td key={j}>{cell}</td>)}</tr>)}</tbody></table></div>;
  if(block.kind==='actions')return <div className="editorial-actions">{block.actions?.map((action,i)=><a key={action.href} className={i===0?'button button-primary':'editorial-text-link'} href={localizedPath(action.href,locale)}>{action.label}<ArrowRight size={17} aria-hidden="true"/></a>)}</div>;
  const strongOnly=!!block.text?.match(/^\*\*[^*]+\*\*$/);
  return <p className={block.tone==='status'?'editorial-status':strongOnly?'editorial-emphasis':undefined}><Emphasis text={block.text??''}/></p>;
}
function Blocks({blocks,locale}:{blocks:EditorialBlock[];locale:Locale}) {return <>{blocks.map((block,i)=><Block block={block} locale={locale} key={block.id??i}/>)}</>;}
function headingGroups(blocks:EditorialBlock[]){const groups:EditorialBlock[][]=[];const lead:EditorialBlock[]=[];for(const block of blocks){if(block.kind==='heading')groups.push([block]);else if(groups.length)groups[groups.length-1].push(block);else lead.push(block);}return {lead,groups};}
function Topic({blocks,index,locale}:{blocks:EditorialBlock[];index:number;locale:Locale}) {
  const listAt=blocks.findIndex(b=>b.kind==='list');
  const labelAt=listAt>0&&blocks[listAt-1].kind==='paragraph'&&/^\*\*[^*]+\*\*$/.test(blocks[listAt-1].text??'')?listAt-1:listAt;
  return <div className="editorial-subsection" key={blocks[0].id}><span className="editorial-subsection-index" aria-hidden="true">{String(index+1).padStart(2,'0')}</span><Block block={blocks[0]} locale={locale}/>
    <div className="editorial-topic-body"><div><Blocks blocks={blocks.slice(1,labelAt)} locale={locale}/></div><div className="editorial-topic-list"><Blocks blocks={blocks.slice(labelAt,listAt+1)} locale={locale}/></div></div>
    <div className="editorial-topic-after"><Blocks blocks={blocks.slice(listAt+1)} locale={locale}/></div>
  </div>;
}
const featureIcons=[Bot,Network,FolderKanban,FileText,Megaphone,Users,Database,Workflow,Layers3,ShieldCheck];
function Section({section,index,slug,locale,last}:{section:EditorialSection;index:number;slug:EditorialSlug;locale:Locale;last:boolean}) {
  const {lead,groups}=headingGroups(section.blocks);
  const Icon=slug==='tinh-nang'?(featureIcons[index]??Network):slug==='doi-ngu'?([Globe2,Workflow,Code2,ShieldCheck,Handshake][index]):slug==='blog'?BookOpen:([Cloud,Layers3,Monitor,Workflow,FileText,Handshake][index]);
  const grouped=groups.length>1;
  const listAt=section.blocks.findIndex(b=>b.kind==='list');
  const splitAt=listAt>0&&section.blocks[listAt-1].kind==='paragraph'&&/^\*\*[^*]+\*\*$/.test(section.blocks[listAt-1].text??'')?listAt-1:listAt;
  return <section id={section.id} className={`editorial-section editorial-section-${index+1}${last?' editorial-section-closing':''}${grouped?' editorial-section-grouped':''}`}>
    <header className="editorial-document-heading"><span className="editorial-document-icon"><Icon size={22} strokeWidth={1.3} aria-hidden="true"/></span><div><span className="editorial-section-index">{String(index+1).padStart(2,'0')} / PAO OS</span><h2>{section.title}</h2></div></header>
    {slug==='tinh-nang'&&index<10?<div className="editorial-feature-body"><div className="editorial-feature-intro"><Blocks blocks={section.blocks.slice(0,splitAt<0?section.blocks.length:splitAt)} locale={locale}/></div><div className="editorial-feature-detail"><Blocks blocks={section.blocks.slice(splitAt<0?section.blocks.length:splitAt)} locale={locale}/></div></div>:<>
      {!!lead.length&&<div className="editorial-section-lead"><Blocks blocks={lead} locale={locale}/></div>}
      <div className={grouped?`editorial-subsections editorial-subsections-${groups.length}`:'editorial-section-body'}>{groups.map((group,i)=>slug==='blog'&&index===0?<Topic key={group[0].id} blocks={group} index={i} locale={locale}/>:<div className="editorial-subsection" key={group[0].id}><span className="editorial-subsection-index" aria-hidden="true">{String(i+1).padStart(2,'0')}</span><Blocks blocks={group} locale={locale}/></div>)}</div>
    </>}
  </section>;
}

export default function EditorialContent({slug,locale}:{slug:EditorialSlug;locale:Locale}) {
  const c=getEditorialPage(slug,locale)!;
  const ui={vi:{navigation:'Nội dung trên trang',features:'TÍNH NĂNG',team:'ĐỘI NGŨ',blog:'PAO INSIGHTS',download:'DOWNLOAD'},en:{navigation:'On this page',features:'FEATURES',team:'TEAM',blog:'PAO INSIGHTS',download:'DOWNLOAD'},zh:{navigation:'本页内容',features:'功能',team:'开发团队',blog:'PAO INSIGHTS',download:'下载'}}[locale];
  const label=slug==='tinh-nang'?ui.features:slug==='doi-ngu'?ui.team:slug==='blog'?ui.blog:ui.download;
  const url=`https://pao-os.com${localizedPath(`/${slug}/`,locale)}`;
  const jsonLd={'@context':'https://schema.org','@type':slug==='doi-ngu'?'AboutPage':slug==='blog'?'CollectionPage':'WebPage','@id':`${url}#page`,url,name:c.seoTitle,description:c.description,inLanguage:{vi:'vi',en:'en',zh:'zh-CN'}[locale],about:{'@id':'https://pao-os.com/#brand'},isPartOf:{'@id':'https://pao-os.com/#website'}};
  const toc=slug==='tinh-nang'?c.sections.slice(0,10):slug==='blog'?c.sections[0].blocks.filter(b=>b.kind==='heading').map(b=>({id:b.id!,title:b.text!})):c.sections.slice(0,-1);
  return <article className={`editorial-document-page editorial-page-${slug}`}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd).replace(/</g,'\\u003c')}}/>
    <header className="editorial-document-hero"><div><span className="editorial-kicker"><i/>PAO OS / {label}</span><h1>{c.title}</h1><p className="editorial-document-subtitle"><strong>{c.subtitle}</strong></p><Blocks blocks={c.intro.slice(0,2)} locale={locale}/></div><EditorialVisual slug={slug} locale={locale}/></header>
    {c.intro.length>2&&<div className="editorial-intro-remainder"><Blocks blocks={c.intro.slice(2)} locale={locale}/></div>}
    <nav className="editorial-document-toc" aria-label={ui.navigation}>{toc.map((section,i)=><a key={section.id} href={`#${section.id}`}><small aria-hidden="true">{String(i+1).padStart(2,'0')}</small><span>{section.title}</span><ArrowRight size={15} aria-hidden="true"/></a>)}</nav>
    {c.sections.map((section,i)=><Section key={section.id} section={section} index={i} slug={slug} locale={locale} last={i===c.sections.length-1}/>)}
  </article>;
}

import ContactSlogan from '@/components/contact-slogan';
import HeroTypewriter from '@/components/hero-typewriter';
import TeamContext from '@/components/team-context';
import FaqGuidance from '@/components/faq-guidance';
import SiteFooter from '@/components/site-footer';
import {LocaleLink} from '@/components/site-language';
import { EditableText, EditableImage, EditableSource, EditableLink } from '@/components/site-content';
import HeroBackground from '@/components/hero-background';
import TextMarqueeBand from '@/components/sample-logo-band';
import LowerStarfield from '@/components/lower-starfield';
import ProductUseCases from '@/components/product-use-cases';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, CircleCheck, Layers3, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import { AgentTeam, KnowledgeGraph, Navbar, Reveal } from '@/components/experience';
import { capabilities, faqs } from '@/lib/content';
import { FeatureIcon } from '@/components/icons';

function SectionHeading({ eyebrow, title, accent, text }: { eyebrow: string; title: string; accent?: string; text?: string }) {
  return <div className="section-heading"><span className="eyebrow"><span /><EditableText field={eyebrow} /></span><h2><EditableText field={title} />{accent && <><br /><span className="text-gradient"><EditableText field={accent} /></span></>}</h2>{text && <p><EditableText field={text} /></p>}</div>;
}

export default function Home() {
  return <div className="home-surface"><LowerStarfield /><Navbar /><main id="noi-dung">
    <section className="hero section-anchor" id="trang-chu" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" /><HeroBackground />
      <div className="hero-inner shell">
        <div className="hero-copy">
          <div className="hero-kicker"><span className="status-dot" /><EditableText field="trang-chu.copy.1" /></div>
          <HeroTypewriter />
          <p className="hero-description"><EditableText field="trang-chu.copy.6" /><br className="desktop-break" /><EditableText field="trang-chu.copy.7" /></p>
          <p className="hero-english"><EditableText field="trang-chu.copy.8" /></p>
          <div className="button-row"><EditableLink className="button button-primary" field="links.hero.primary"><EditableText field="trang-chu.copy.9" /><ArrowUpRight size={18} /></EditableLink><EditableLink className="button button-ghost" field="links.hero.secondary"><EditableText field="trang-chu.copy.10" /><ArrowRight size={17} /></EditableLink></div>
          <div className="hero-trust"><span><ShieldCheck size={15} /><EditableText field="trang-chu.copy.11" /></span><span><Layers3 size={15} /><EditableText field="trang-chu.copy.12" /></span><span><CircleCheck size={15} /><EditableText field="trang-chu.copy.13" /></span></div>
        </div>
        <div className="hero-visual">
          <div className="hero-visual-glow" aria-hidden="true" />
          <div className="hologram-frame"><picture><EditableSource field="images.hero" original="/images/pao-hologram.webp" type="image/avif" media="(min-width: 0px)" sizes="(max-width: 420px) 64vw, (max-width: 699px) 284px, (max-width: 1000px) 36vw, 395px" fallback="/images/pao-hologram-v2-384.avif 384w, /images/pao-hologram-v2-512.avif 512w, /images/pao-hologram-v2-768.avif 768w, /images/pao-hologram-v2-1000.avif 1000w"/><EditableSource field="images.hero" original="/images/pao-hologram.webp" fallback="/images/pao-hologram-v2-384.webp 384w, /images/pao-hologram-v2-512.webp 512w, /images/pao-hologram-v2-768.webp 768w" sizes="(max-width: 420px) 64vw, 284px" media="(max-width: 699px)" /><EditableImage original="/images/pao-hologram.webp" defaultSrc="/images/pao-hologram-v2-768.webp" defaultSrcSet="/images/pao-hologram-v2-384.webp 384w, /images/pao-hologram-v2-512.webp 512w, /images/pao-hologram-v2-768.webp 768w, /images/pao-hologram-v2-1000.webp 1000w" field="images.hero" altField="images.hero.alt" alt="PAO" width={1024} height={1536} loading="eager" fetchPriority="high" sizes="(max-width: 699px) 64vw, (max-width: 1000px) 36vw, 395px" className="hologram" /></picture></div>
          <div className="orbit orbit-one" aria-hidden="true" /><div className="orbit orbit-two" aria-hidden="true" />
          <div className="visual-label visual-label-top"><span className="tiny-square" /><EditableText field="trang-chu.copy.14" /><span className="label-line" /></div>
          <div className="hero-float hero-float-left"><span className="float-icon"><Sparkles size={17} /></span><div><strong><EditableText field="trang-chu.copy.15" /></strong><span><EditableText field="trang-chu.copy.16" /></span></div></div>
          <div className="hero-float hero-float-right"><span className="float-icon"><Layers3 size={17} /></span><div><strong><EditableText field="trang-chu.copy.17" /></strong><span><EditableText field="trang-chu.copy.18" /></span></div></div>
          <div className="hero-visual-caption"><span className="status-dot" /><EditableText field="trang-chu.copy.19" /><span className="caption-divider" /><EditableText field="trang-chu.copy.20" /></div>
        </div>
      </div>
      <div className="hero-bottom shell"><a href="#gioi-thieu"><span className="scroll-indicator"><ArrowDown size={14} /></span><EditableText field="trang-chu.copy.21" /></a><span><EditableText field="trang-chu.copy.22" /><strong><EditableText field="trang-chu.copy.23" /></strong><ArrowUpRight size={13} /></span></div>
    </section>

    <TextMarqueeBand />

    <section id="gioi-thieu" className="section section-anchor"><span id="san-pham" className="anchor-alias" aria-hidden="true" /><div className="shell"><div className="landing-value"><SectionHeading eyebrow="gioi-thieu.heading.1" title="gioi-thieu.heading.2" accent="gioi-thieu.heading.3" text="gioi-thieu.heading.4" /></div><div className="value-principles">{[['sparkles',0],['layout',1],['network',2],['shield',3]].map(([icon,index])=><article className="value-principle" key={index}><FeatureIcon name={String(icon)} size={23}/><h3><EditableText field={`gioi-thieu.items.0.${index}.1`}/></h3><p><EditableText field={`gioi-thieu.items.0.${index}.2`}/></p></article>)}</div></div></section>

    <section id="kha-nang" className="section section-anchor landing-capabilities"><div className="shell"><SectionHeading eyebrow="kha-nang.heading.1" title="kha-nang.heading.2" accent="kha-nang.heading.3" text="kha-nang.copy.1"/><div className="landing-capability-grid">{[0,1,3,4,5,7].map(i=><a key={i} className="landing-capability" href="#trai-nghiem"><span className="icon-box"><FeatureIcon name={capabilities[i].icon}/></span><span><EditableText field={`capabilities.${i}.subtitle`}/></span><h3><EditableText field={`capabilities.${i}.title`}/></h3><p><EditableText field={`capabilities.${i}.text`}/></p><ArrowUpRight size={17}/></a>)}</div><div className="landing-capability-footer"><p><EditableText field="kha-nang.copy.6"/></p><EditableLink className="text-link" field="contact.email.link"><EditableText field="nav.cta"/><ArrowRight size={15}/></EditableLink></div></div></section>

    <section id="quy-trinh" className="section section-anchor landing-workflow"><div className="shell"><SectionHeading eyebrow="quy-trinh.heading.1" title="quy-trinh.heading.2" accent="quy-trinh.heading.3"/><div className="landing-workflow-steps">{[0,2,4].map((i,order)=><article key={i}><span>0{order+1}</span><h3><EditableText field={`quy-trinh.items.1.${i}.1`}/></h3><p><EditableText field={`quy-trinh.items.1.${i}.2`}/></p></article>)}</div><p className="section-note"><EditableText field="quy-trinh.copy.2"/></p></div></section>

    <section id="doi-ngu" className="section section-anchor agents-section landing-team"><div className="shell agents-layout"><div><SectionHeading eyebrow="doi-ngu.heading.1" title="doi-ngu.heading.2" accent="doi-ngu.heading.3" text="doi-ngu.heading.4"/><div className="inline-points"><span><Check size={16}/><EditableText field="doi-ngu.copy.1"/></span><span><Check size={16}/><EditableText field="doi-ngu.copy.2"/></span><span><Check size={16}/><EditableText field="doi-ngu.copy.3"/></span></div><TeamContext/></div><AgentTeam/></div></section>

    <section id="tri-thuc" className="section section-anchor landing-context"><div className="shell"><SectionHeading eyebrow="tri-thuc.heading.1" title="tri-thuc.heading.2" accent="tri-thuc.heading.3" text="tri-thuc.heading.4"/><KnowledgeGraph/><div id="bao-mat" className="landing-context-points section-anchor">{[0,1,2,3].map(i=><article key={i} className="landing-context-point"><ShieldCheck size={21}/><h3><EditableText field={`bao-mat.items.2.${i}.0`}/></h3><p><EditableText field={`bao-mat.items.2.${i}.1`}/></p></article>)}</div><div className="landing-context-footer"><p><EditableText field="bao-mat.heading.4"/></p><LocaleLink className="text-link" href="/privacy/"><EditableText field="bao-mat.copy.3"/><ArrowUpRight size={15}/></LocaleLink></div></div></section>

    <section id="trai-nghiem" className="section section-anchor landing-use-cases"><div className="shell"><SectionHeading eyebrow="trai-nghiem.heading.1" title="trai-nghiem.heading.2" accent="trai-nghiem.heading.3" text="trai-nghiem.copy.1"/><ProductUseCases/></div></section>

    <section id="cau-hoi" className="section section-anchor faq-section"><div className="shell faq-layout">
      <Reveal><SectionHeading eyebrow="cau-hoi.heading.1" title="cau-hoi.heading.2" accent="cau-hoi.heading.3" text="cau-hoi.heading.4" /><FaqGuidance/><EditableLink className="text-link" field="contact.email.link"><EditableText field="cau-hoi.copy.1" /><ArrowUpRight size={16} /></EditableLink></Reveal>
      <div className="faq-list">{faqs.map(([question], i) => <details key={question} className="faq-item" name="pao-faq"><summary><span className="faq-number"><EditableText field="cau-hoi.copy.2" />{i + 1}</span><h3><EditableText field={`faqs.${i}.0`} /></h3><span className="faq-plus" aria-hidden="true"><EditableText field="cau-hoi.copy.3" /></span></summary><p><EditableText field={`faqs.${i}.1`} /></p></details>)}</div>
    </div></section>

    <section id="lien-he" className="section section-anchor contact-section"><div className="shell"><Reveal><div className="contact-card"><div className="contact-grid" aria-hidden="true" /><span className="eyebrow"><span /><EditableText field="lien-he.copy.1" /></span><h2><EditableText field="lien-he.copy.2" /><br /><span className="text-gradient"><EditableText field="lien-he.copy.3" /></span></h2><p><EditableText field="lien-he.copy.4" /></p><div className="button-row"><a className="button button-primary" href="tel:+84925880088"><EditableText field="lien-he.copy.5" /><Phone size={18} /></a><a className="button button-ghost" href="#trai-nghiem"><EditableText field="lien-he.copy.6" /><ArrowRight size={17} /></a></div><ContactSlogan/></div></Reveal></div></section>
  </main><SiteFooter/></div>;
}

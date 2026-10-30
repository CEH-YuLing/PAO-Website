import { ArrowRight, ChartNoAxesCombined, Check, Database, Megaphone, Network, Users, Workflow } from 'lucide-react';
import { solutionsCopy } from '@/lib/solutions-page';
import { localizedPath, type Locale } from '@/lib/locale';
import { SolutionSketch, SolutionsOverviewGraphic } from './solutions-visuals';

function Emphasis({ text }: { text: string }) {
  return <>{text.split(/(\*\*.*?\*\*)/g).map((part, i) => part.startsWith('**') && part.endsWith('**')
    ? <strong key={i}>{part.slice(2, -2)}</strong> : part)}</>;
}

export default function SolutionsContent({ locale }: { locale: Locale }) {
  const c = solutionsCopy[locale];
  const ui = {vi:{navigation:'Chọn nhóm giải pháp',explore:'Tìm hiểu thêm'},en:{navigation:'Choose a solution area',explore:'Explore further'},zh:{navigation:'选择解决方案方向',explore:'进一步了解'}}[locale];
  const icons = [ChartNoAxesCombined, Megaphone, Users, Workflow, Database, Network];
  const url = `https://pao-os.com${localizedPath('/giai-phap/', locale)}`;
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'CollectionPage', '@id': `${url}#page`, url,
    name: c.seoTitle, description: c.description, inLanguage: { vi: 'vi', en: 'en', zh: 'zh-CN' }[locale],
    about: { '@id': 'https://pao-os.com/#brand' }, isPartOf: { '@id': 'https://pao-os.com/#website' },
    mainEntity: { '@type': 'ItemList', itemListElement: c.sections.map((section, i) => ({ '@type': 'ListItem', position: i + 1, name: section.title, url: `${url}#${section.id}` })) },
  };
  return <article className="solutions-page solutions-design-v2">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
    <header className="editorial-hero solutions-hero">
      <div className="editorial-hero-copy">
        <span className="editorial-kicker"><i />PAO OS / {locale === 'vi' ? 'GIẢI PHÁP' : locale === 'en' ? 'SOLUTIONS' : '解决方案'}</span>
        <h1>{c.title}</h1>
        <p className="solutions-subtitle"><strong>{c.subtitle}</strong></p>
        {c.intro.slice(0,2).map(text => <p key={text}><Emphasis text={text} /></p>)}
      </div>
      <SolutionsOverviewGraphic />
    </header>
    <div className="solutions-intro-followup">{c.intro.slice(2).map(text=><p key={text}><Emphasis text={text}/></p>)}</div>
    <nav className="solutions-toc" aria-label={ui.navigation}>
      {c.sections.map((section, i) => {
        const Icon = icons[i];
        return <a key={section.id} href={`#${section.id}`}><Icon size={22} strokeWidth={1.3} aria-hidden="true" /><small>{String(i+1).padStart(2,'0')}</small><span>{section.title}</span><ArrowRight size={15} /></a>;
      })}
    </nav>
    {c.sections.map((section, i) => {
      const Icon = icons[i];
      const List = section.ordered ? 'ol' : 'ul';
      return <section key={section.id} id={section.id} className="solution-section solution-panel">
        <span className="solution-panel-number" aria-hidden="true">{String(i+1).padStart(2,'0')}</span>
        <header className="solution-section-heading">
          <span className="editorial-section-index"><Icon size={19} aria-hidden="true" />{String(i + 1).padStart(2, '0')} / PAO OS</span>
          <h2>{section.title}</h2>
          <h3>{section.subtitle}</h3>
        </header>
        <div className="solution-detail-grid">
          <div className="solution-story">{section.paragraphs.slice(0, -1).map(text => <p key={text}><Emphasis text={text} /></p>)}<SolutionSketch index={i}/></div>
          <div className="solution-focus">
            <p className="solution-focus-title"><Emphasis text={section.paragraphs[section.paragraphs.length - 1]} /></p>
            <List className={`solution-focus-list${section.ordered ? ' solution-workflow' : ''}`}>
              {section.items.map((text, index) => <li key={text}>{section.ordered ? <span className="solution-step-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span> : <Check size={16} strokeWidth={1.5} aria-hidden="true" />}<span><Emphasis text={text} /></span></li>)}
            </List>
          </div>
        </div>
        <div className="solution-results">{section.after.map((text, index) => <p key={text} className={index === section.after.length - 1 ? 'solution-value' : 'solution-condition'}><Emphasis text={text} /></p>)}</div>
      </section>;
    })}
    <section id="cach-trien-khai" className="solution-deployment">
      <div className="solution-section-heading"><span className="editorial-section-index">PAO OS / {locale === 'vi' ? 'CÁCH TIẾP CẬN' : locale === 'en' ? 'OUR APPROACH' : '实施方式'}</span><h2>{c.deployment.title}</h2><h3>{c.deployment.subtitle}</h3></div>
      <div className="solution-deployment-intro">{c.deployment.paragraphs.map(text => <p key={text}><Emphasis text={text} /></p>)}</div>
      <ol className="solution-deployment-steps">{c.deployment.steps.map((step, i) => <li key={step.title}><span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span><h4>{step.title}</h4><p>{step.paragraph}</p>{i < c.deployment.steps.length - 1 && <ArrowRight className="solution-next-step" size={18} aria-hidden="true" />}</li>)}</ol>
      {c.deployment.after.map(text => <p key={text} className="solution-condition">{text}</p>)}
    </section>
    <section className="editorial-closing solutions-closing">
      <div className="solutions-closing-copy"><h2>{c.closing.title}</h2><p className="solutions-subtitle"><strong>{c.closing.subtitle}</strong></p>
      {c.closing.paragraphs.map(text => <p key={text}>{text}</p>)}
      </div><nav className="editorial-actions" aria-label={ui.explore}>
        <a className="button button-primary" href={localizedPath('/contact/', locale)}>{c.closing.contact}<ArrowRight size={17} /></a>
        <a className="editorial-text-link" href={localizedPath('/tinh-nang/', locale)}>{c.closing.features}<ArrowRight size={17} /></a>
      </nav>
    </section>
  </article>;
}

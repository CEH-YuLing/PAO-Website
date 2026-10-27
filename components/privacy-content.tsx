import type { ReactNode } from 'react';
import LanguageSwitcher, { LocaleLink } from './site-language';
import type { Locale } from '@/lib/locale';
import policy from '@/lib/privacy-policy.json';

type PolicySection = { title: string; paragraphs: string[]; items?: string[]; after?: string[] };
type Policy = { title: string; lead: string[]; sections: PolicySection[]; closing: string };
const labels = {
  vi: { back: '← Về PAO OS', updated: 'Cập nhật', contents: 'Nội dung chính sách', top: 'Về đầu chính sách', tag: 'QUYỀN RIÊNG TƯ & DỮ LIỆU' },
  en: { back: '← Back to PAO OS', updated: 'Updated', contents: 'Policy contents', top: 'Back to policy overview', tag: 'PRIVACY & DATA' },
  zh: { back: '← 返回 PAO OS', updated: '更新日期', contents: '政策目录', top: '返回政策概览', tag: '隐私与数据' }
};

function inline(text: string): ReactNode {
  return text.split(/(\*\*.*?\*\*|cs@pao-os\.com|0925880088)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{inline(part.slice(2, -2))}</strong>;
    if (part === 'cs@pao-os.com') return <a key={i} href="mailto:cs@pao-os.com">{part}</a>;
    if (part === '0925880088') return <a key={i} href={`tel:+84${part.replaceAll('.', '').slice(1)}`}>{part}</a>;
    return part;
  });
}

export default function PrivacyContent({ locale }: { locale: Locale }) {
  const c: Policy = policy[locale];
  const l = labels[locale];
  return <main className="legal-page privacy-policy shell" id="noi-dung">
    <div className="legal-nav"><LocaleLink className="text-link" href="/">{l.back}</LocaleLink><LanguageSwitcher /></div>
    <header className="privacy-heading" id="policy-overview"><span className="eyebrow"><span />PAO OS · {l.tag}</span><h1>{c.title}</h1><div className="privacy-updated"><span className="status-dot" />{l.updated}: <time dateTime="2026-10-27">27/10/2026</time></div>{c.lead.map(p => <p className="legal-lead" key={p}>{p}</p>)}</header>
    <div className="privacy-layout"><nav className="privacy-toc" aria-label={l.contents}><h2>{l.contents}</h2><ol>{c.sections.map((s, i) => <li key={s.title}><a href={`#policy-${i + 1}`}><span>{String(i + 1).padStart(2, '0')}</span>{s.title}</a></li>)}</ol></nav>
      <article className="privacy-body">{c.sections.map((s, i) => <section className="privacy-section" id={`policy-${i + 1}`} key={s.title} aria-labelledby={`policy-title-${i + 1}`}><h2 id={`policy-title-${i + 1}`}><span>{String(i + 1).padStart(2, '0')}</span>{s.title}</h2>{s.paragraphs.map((p, j) => <p key={j}>{inline(p)}</p>)}{s.items && <ul>{s.items.map(p => <li key={p}>{inline(p)}</li>)}</ul>}{s.after?.map((p, j) => <p key={`after-${j}`}>{inline(p)}</p>)}</section>)}<div className="privacy-closing"><p>{c.closing}</p><a className="text-link" href="#policy-overview">{l.top} ↑</a></div></article>
    </div>
  </main>;
}

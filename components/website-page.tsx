import type { Metadata } from 'next';
import SiteHeader from './site-header';
import SiteFooter from './site-footer';
import { getSiteMetadata } from './site-shell';
import { localizedPath, type Locale } from '@/lib/locale';
import { pageShellCopy, websitePagePath, type WebsitePage } from '@/lib/website-pages';
import { aboutCopy } from '@/lib/about-page';
import AboutContent from './about-content';
import SolutionsContent from './solutions-content';
import { solutionsCopy } from '@/lib/solutions-page';
import WebsitePageDesign from './website-page-design';
import EditorialContent from './editorial-content';
import { getEditorialPage, type EditorialSlug } from '@/lib/editorial-pages';

export function getWebsitePageMetadata(page: WebsitePage, locale: Locale): Metadata {
  const editorial = page.slug === 'gioi-thieu' ? aboutCopy[locale] : page.slug === 'giai-phap' ? solutionsCopy[locale] : getEditorialPage(page.slug, locale);
  const title = editorial?.seoTitle ?? `${page[locale]} — PAO OS`;
  const description = editorial?.description ?? `${page[locale]} | PAO OS — Business Operating System.`;
  const path = `/${page.slug}/`;
  const base = getSiteMetadata(locale);
  return {
    title, description,
    alternates: { canonical: websitePagePath(page, locale), languages: { vi: path, en: localizedPath(path, 'en'), 'zh-CN': localizedPath(path, 'zh'), 'x-default': path } },
    openGraph: { ...base.openGraph, title, description, url: `https://pao-os.com${websitePagePath(page, locale)}` },
    twitter: { ...base.twitter, title, description },
    robots: { index: !!editorial, follow: true },
  };
}

export default function WebsitePageContent({ page, locale }: { page: WebsitePage; locale: Locale }) {
  const c = pageShellCopy[locale];
  return <div className="website-page-surface"><SiteHeader /><main id="noi-dung" className="website-page-main shell">
    <nav className="website-page-breadcrumb" aria-label={c.breadcrumb}><a href={localizedPath('/', locale)}>{c.home}</a><span aria-hidden="true">/</span><span aria-current="page">{page[locale]}</span></nav>
    {page.slug === 'gioi-thieu' ? <AboutContent locale={locale}/> : page.slug === 'giai-phap' ? <SolutionsContent locale={locale}/> : getEditorialPage(page.slug, locale) ? <EditorialContent slug={page.slug as EditorialSlug} locale={locale}/> : <WebsitePageDesign page={page} locale={locale}/>}
  </main><SiteFooter /></div>;
}

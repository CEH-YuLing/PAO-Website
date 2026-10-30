import { notFound } from 'next/navigation';
import WebsitePageContent, { getWebsitePageMetadata } from '@/components/website-page';
import { getWebsitePage, websiteAliases, websitePages } from '@/lib/website-pages';
export const dynamicParams = false;
export function generateStaticParams() { return [...websitePages.map(page => page.slug), ...Object.keys(websiteAliases)].map(sitePage => ({ sitePage })); }
type Params = { params: Promise<{ locale: string; sitePage: string }> };
export async function generateMetadata({ params }: Params) {
  const { locale, sitePage } = await params;
  const page = getWebsitePage(sitePage);
  if (!page || (locale !== 'en' && locale !== 'zh')) notFound();
  return getWebsitePageMetadata(page, locale);
}
export default async function Page({ params }: Params) {
  const { locale, sitePage } = await params;
  const page = getWebsitePage(sitePage);
  if (!page || (locale !== 'en' && locale !== 'zh')) notFound();
  return <WebsitePageContent page={page} locale={locale} />;
}

import { notFound } from 'next/navigation';
import HomeContent from '@/components/home-content';
import SiteStructuredData from '@/components/site-structured-data';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== 'en' && locale !== 'zh') notFound();
  return <><SiteStructuredData locale={locale}/><HomeContent/></>;
}

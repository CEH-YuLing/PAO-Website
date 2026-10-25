import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import SiteCursor from './site-cursor';
import { SiteContentProvider } from './site-content';
import { getSiteValues } from '@/lib/site-locales';
import { htmlLanguage, localizedPath, type Locale } from '@/lib/locale';
import { translateUi } from '@/lib/ui-text';

export function getSiteMetadata(locale:Locale):Metadata {
  const values=getSiteValues(locale);const path=localizedPath('/',locale);
  return {metadataBase:new URL('https://pao-os.com'),title:values['seo.title'],description:values['seo.description'],applicationName:'PAO OS',alternates:{canonical:path,languages:{vi:'/',en:'/en/','zh-CN':'/zh/','x-default':'/'}},icons:{icon:[{url:'/brand/favicon.png',type:'image/png'}],apple:'/brand/apple-touch-icon.png'},openGraph:{type:'website',locale:locale==='vi'?'vi_VN':locale==='en'?'en_US':'zh_CN',url:`https://pao-os.com${path}`,siteName:'PAO OS',title:values['seo.title'],description:values['seo.description'],images:[{url:'/images/og-pao.png',width:1200,height:630,alt:'PAO OS — Your AI Chief of Staff · IVN Network'}]},twitter:{card:'summary_large_image',title:values['seo.title'],description:values['seo.description'],images:['/images/og-pao.png']},robots:{index:true,follow:true}};
}
export default function SiteShell({children,locale}:{children:ReactNode;locale:Locale}) {return <html lang={htmlLanguage(locale)}><body><a className="skip-link" href="#noi-dung">{translateUi(locale,'Bỏ qua điều hướng')}</a><SiteContentProvider initialValues={getSiteValues(locale)} locale={locale}>{children}</SiteContentProvider><SiteCursor/></body></html>;}

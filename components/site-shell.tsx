import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import SiteCursor from './site-cursor';
import FontPreloads from './font-preloads';
import { SiteContentProvider } from './site-content';
import { getSiteValues } from '@/lib/site-locales';
import { htmlLanguage, localizedPath, type Locale } from '@/lib/locale';
import { translateUi } from '@/lib/ui-text';

export function getSiteMetadata(locale:Locale):Metadata {
  const values=getSiteValues(locale);const path=localizedPath('/',locale);
  const imageAlt={vi:'PAO OS — AI đồng hành cùng doanh nghiệp · Phát triển bởi IVN Network',en:'PAO OS — AI for your business · Developed by IVN Network',zh:'PAO OS — 企业 AI 助手 · IVN Network 开发'}[locale];
  const shareImage={url:'/images/pao-social-ai-companion-20261026.png',width:1732,height:908,type:'image/png',alt:imageAlt};
  return {metadataBase:new URL('https://pao-os.com'),title:values['seo.title'],description:values['seo.description'],applicationName:'PAO OS',alternates:{canonical:path,languages:{vi:'/',en:'/en/','zh-CN':'/zh/','x-default':'/'}},icons:{icon:[{url:'/brand/favicon.png',type:'image/png'}],apple:'/brand/apple-touch-icon.png'},openGraph:{type:'website',locale:locale==='vi'?'vi_VN':locale==='en'?'en_US':'zh_CN',url:`https://pao-os.com${path}`,siteName:'PAO OS',title:values['seo.title'],description:values['seo.description'],images:[shareImage]},twitter:{card:'summary_large_image',title:values['seo.title'],description:values['seo.description'],images:[{url:shareImage.url,alt:shareImage.alt}]},robots:{index:true,follow:true}};
}
export default function SiteShell({children,locale}:{children:ReactNode;locale:Locale}) {return <html lang={htmlLanguage(locale)}><body><FontPreloads/><a className="skip-link" href="#noi-dung">{translateUi(locale,'Bỏ qua điều hướng')}</a><SiteContentProvider initialValues={getSiteValues(locale)} locale={locale}>{children}</SiteContentProvider><SiteCursor/></body></html>;}

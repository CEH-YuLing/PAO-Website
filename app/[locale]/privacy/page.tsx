import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import PrivacyContent from '@/components/privacy-content';
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const {locale}=await params;return {title:locale==='zh'?'隐私与数据保护政策 — PAO OS':'Privacy & Data Protection Policy — PAO OS',alternates:{canonical:`/${locale}/privacy/`,languages:{vi:'/privacy/',en:'/en/privacy/','zh-CN':'/zh/privacy/'}}};}
export default async function Page({params}:{params:Promise<{locale:string}>}){const {locale}=await params;if(locale!=='en'&&locale!=='zh')notFound();return <PrivacyContent locale={locale}/>;}

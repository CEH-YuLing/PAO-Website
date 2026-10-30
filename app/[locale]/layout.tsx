import type { ReactNode } from 'react';
import type { Viewport } from 'next';
import { notFound } from 'next/navigation';
import '../manrope.css';
import '../globals.css';
import '../site-pages.css';
import SiteShell, { getSiteMetadata } from '@/components/site-shell';
export const dynamicParams=false;
export function generateStaticParams() {return [{locale:'en'},{locale:'zh'}];}
export const viewport:Viewport={themeColor:'#030B1E',width:'device-width',initialScale:1};
export async function generateMetadata({params}:{params:Promise<{locale:string}>}) {const {locale}=await params;if(locale!=='en'&&locale!=='zh')notFound();return getSiteMetadata(locale);}
export default async function RootLayout({children,params}:{children:ReactNode;params:Promise<{locale:string}>}) {const {locale}=await params;if(locale!=='en'&&locale!=='zh')notFound();return <SiteShell locale={locale}>{children}</SiteShell>;}

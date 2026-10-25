import type { ReactNode } from 'react';
import type { Viewport } from 'next';
import '@fontsource-variable/manrope';
import '../globals.css';
import SiteShell, { getSiteMetadata } from '@/components/site-shell';
export const metadata=getSiteMetadata('vi');
export const viewport:Viewport={themeColor:'#030B1E',width:'device-width',initialScale:1};
export default function RootLayout({children}:{children:ReactNode}) {return <SiteShell locale="vi">{children}</SiteShell>;}

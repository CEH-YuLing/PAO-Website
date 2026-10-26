'use client';

import { useEffect, useRef, useState, useSyncExternalStore, type AnchorHTMLAttributes } from 'react';
import { Languages, ChevronDown, Check } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useSiteLocale } from './site-content';
import { languages, localizedPath } from '@/lib/locale';
import { translateUi } from '@/lib/ui-text';

function subscribeHash(callback:()=>void) {window.addEventListener('hashchange',callback);return()=>window.removeEventListener('hashchange',callback);}
function hashSnapshot() {return window.location.hash;}
function serverHash() {return '';}
export function useT() {const locale=useSiteLocale();return (text:string)=>translateUi(locale,text);}
export function LocaleLink({href='/',...props}:AnchorHTMLAttributes<HTMLAnchorElement>) {const locale=useSiteLocale();return <a {...props} href={href.startsWith('/')?localizedPath(href,locale):href}/>;}
export default function LanguageSwitcher() {
  const locale=useSiteLocale();const pathname=usePathname();const hash=useSyncExternalStore(subscribeHash,hashSnapshot,serverHash);const [open,setOpen]=useState(false);const ref=useRef<HTMLDivElement>(null);const t=useT();
  useEffect(()=>{const close=(event:PointerEvent)=>{if(!ref.current?.contains(event.target as Node))setOpen(false);};const escape=(event:KeyboardEvent)=>{if(event.key==='Escape')setOpen(false);};document.addEventListener('pointerdown',close);document.addEventListener('keydown',escape);return()=>{document.removeEventListener('pointerdown',close);document.removeEventListener('keydown',escape);};},[]);
  return <div className="site-language" ref={ref}><button aria-label={`${t('Chọn ngôn ngữ')}: ${languages.find(item=>item.code===locale)?.short}`} aria-expanded={open} onClick={()=>setOpen(!open)}><Languages size={15}/><span>{languages.find(item=>item.code===locale)?.short}</span><ChevronDown size={10}/></button>{open&&<nav className="site-language-menu" aria-label={t('Ngôn ngữ website')}>{languages.map(item=><a key={item.code} href={`${localizedPath(pathname,item.code)}${hash}`} hrefLang={item.code==='zh'?'zh-CN':item.code} lang={item.code==='zh'?'zh-CN':item.code} aria-current={item.code===locale?'true':undefined}><span>{item.label}</span>{item.code===locale&&<Check size={13}/>}</a>)}</nav>}</div>;
}

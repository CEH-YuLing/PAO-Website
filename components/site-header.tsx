'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import LanguageSwitcher, { useT } from './site-language';
import { EditableImage, useSiteLocale } from './site-content';
import { localizedPath } from '@/lib/locale';
import { getWebsitePage, pageShellCopy, websitePages, websitePagePath } from '@/lib/website-pages';

export default function SiteHeader() {
  const locale = useSiteLocale();
  const t = useT();
  const pathname = usePathname();
  const currentPath = pathname.replace(/^\/(en|zh)(?=\/|$)/, '').replace(/\/$/, '');
  const current = `/${getWebsitePage(currentPath.slice(1))?.slug ?? ''}`;
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const contact = websitePages[6];
  const homePath = localizedPath('/', locale);
  const isHome = currentPath === '';
  const homeLabel = pageShellCopy[locale].home;
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') { setOpen(false); toggleRef.current?.focus(); } };
    const outside = (event: PointerEvent) => { if (!headerRef.current?.contains(event.target as Node)) setOpen(false); };
    const wide = () => { if (window.innerWidth >= 1000) setOpen(false); };
    document.addEventListener('keydown', escape);
    document.addEventListener('pointerdown', outside);
    window.addEventListener('resize', wide);
    return () => { document.removeEventListener('keydown', escape); document.removeEventListener('pointerdown', outside); window.removeEventListener('resize', wide); };
  }, [open]);
  return <header ref={headerRef} data-beasties-container="" className="site-header site-header-pages">
    <div className="nav-inner shell">
      <a className="brand-link" href={localizedPath('/', locale)} aria-label={t('PAO OS — Business Operating System — về đầu trang')} onClick={() => setOpen(false)}><EditableImage field="images.primary" width={89} height={37} alt="PAO" loading="eager" /><span className="brand-divider" /><span className="brand-descriptor">BUSINESS<br />OPERATING SYSTEM</span></a>
      <nav className="desktop-nav" aria-label={pageShellCopy[locale].navigation}><a href={homePath} aria-current={isHome ? 'page' : undefined}>{homeLabel}</a>{websitePages.slice(0, 6).map(page => <a key={page.slug} href={websitePagePath(page, locale)} aria-current={current === `/${page.slug}` ? 'page' : undefined}>{page[locale]}</a>)}</nav>
      <div className="nav-actions"><LanguageSwitcher /><a className="nav-contact" href={websitePagePath(contact, locale)} aria-current={current === '/lien-he' ? 'page' : undefined}>{contact[locale]}<ArrowUpRight size={15} /></a><button ref={toggleRef} className="menu-toggle" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? t('Đóng menu') : t('Mở menu')} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div>
    </div>
    <nav id="mobile-nav" className={`mobile-nav ${open ? 'is-open' : ''}`} aria-label={t('Điều hướng trên điện thoại')} inert={!open}><a href={homePath} aria-current={isHome ? 'page' : undefined} onClick={() => setOpen(false)}>{homeLabel}<ArrowRight size={16} /></a>{websitePages.map(page => <a key={page.slug} href={websitePagePath(page, locale)} aria-current={current === `/${page.slug}` ? 'page' : undefined} onClick={() => setOpen(false)}>{page[locale]}<ArrowRight size={16} /></a>)}</nav>
  </header>;
}

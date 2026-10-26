'use client';

import { useEffect } from 'react';
import { localSectionId, scrollToSection } from '@/lib/section-navigation.mjs';

export default function SectionNavigation() {
  useEffect(() => {
    const navigate = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!(link instanceof HTMLAnchorElement) || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
      const id = localSectionId(link.href, window.location.href);
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      event.preventDefault();
      scrollToSection(target, event.detail === 0);
    };
    document.addEventListener('click', navigate);
    return () => document.removeEventListener('click', navigate);
  }, []);
  return null;
}

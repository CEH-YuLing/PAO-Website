'use client';

import { createContext, useContext, useEffect, useMemo, useState, type AnchorHTMLAttributes, type ImgHTMLAttributes, type ReactNode } from 'react';
import type { Locale } from '@/lib/locale';
import initial from '@/lib/site-content.json';
import schema from '@/lib/editor-schema.json';
import { validateContent } from '@/lib/editor-validation.mjs';

export type ContentValues = Record<string, string>;
const ContentContext = createContext<{ values: ContentValues; preview: boolean; locale: Locale }>({ values: initial.values, preview: false, locale: 'vi' });

export function SiteContentProvider({ children, initialValues = initial.values, locale = 'vi' }: { children: ReactNode; initialValues?: ContentValues; locale?: Locale }) {
  const [state, setState] = useState({ values: initialValues as ContentValues, preview: false });
  useEffect(() => {
    if (window.parent === window || !new URLSearchParams(location.search).has('__pao_preview')) return;
    let picking = true;
    document.documentElement.dataset.editorPicking = 'true';
    const receive = (event: MessageEvent) => {
      if (event.origin !== location.origin || event.source !== window.parent) return;
      if (event.data?.type === 'pao-editor:content') {
        try { const result = validateContent(event.data.content, schema); setState({ values: result.values, preview: true }); } catch { /* Ignore malformed preview messages. */ }
      }
      if (event.data?.type === 'pao-editor:pick-mode') {
        picking = event.data.enabled === true;
        document.documentElement.dataset.editorPicking = String(picking);
      }
      if (event.data?.type === 'pao-editor:focus' && typeof event.data.id === 'string') {
        const field = schema.fields.find(f => f.id === event.data.id);
        if (!field) return;
        const target = [...document.querySelectorAll('[data-edit-field]')].find(el => el.getAttribute('data-edit-field') === field.id);
        document.querySelector('[data-edit-selected]')?.removeAttribute('data-edit-selected');
        target?.setAttribute('data-edit-selected', 'true');
        target?.scrollIntoView({ block: 'center', behavior: 'instant' });
      }
    };
    const select = (event: MouseEvent) => {
      if (!picking) return;
      const el = (event.target as Element).closest('[data-edit-field]');
      // Block navigation/submission in select mode; switch to interaction mode to test links.
      if (el || (event.target as Element).closest('a,button,summary,input')) { event.preventDefault(); event.stopPropagation(); }
      if (el) window.parent.postMessage({ type: 'pao-editor:selected', id: el.getAttribute('data-edit-field') }, location.origin);
    };
    const preventSubmit = (event: Event) => { if (picking) { event.preventDefault(); event.stopPropagation(); } };
    const keepFrame = (event: MouseEvent) => {
      if (picking) return;
      const link = (event.target as Element).closest('a');
      const href = link?.getAttribute('href');
      if (href && !href.startsWith('#')) { event.preventDefault(); window.parent.postMessage({ type: 'pao-editor:link', href }, location.origin); }
    };
    window.addEventListener('message', receive);
    document.addEventListener('click', select, true);
    document.addEventListener('click', keepFrame, true);
    document.addEventListener('submit', preventSubmit, true);
    window.parent.postMessage({ type: 'pao-editor:ready' }, location.origin);
    return () => {
      delete document.documentElement.dataset.editorPicking;
      window.removeEventListener('message', receive);
      document.removeEventListener('click', select, true);
      document.removeEventListener('click', keepFrame, true);
      document.removeEventListener('submit', preventSubmit, true);
    };
  }, []);
  return <ContentContext.Provider value={{...state,locale}}>{children}</ContentContext.Provider>;
}

export function useContentValue(field: string) { return useContext(ContentContext).values[field] ?? ''; }
export function EditableText({ field }: { field: string }) {
  const { values, preview } = useContext(ContentContext);
  return preview ? <span className="editor-copy" data-edit-field={field}>{values[field]}</span> : <>{values[field]}</>;
}
export function EditableImage({ field, altField, alt, ...props }: Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & { field: string; altField?: string }) {
  const { values, preview } = useContext(ContentContext);
  // Native img is intentional: uploaded data URLs and static export paths need no image server.
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...props} src={values[field]} alt={altField ? values[altField] : alt} data-edit-field={preview ? field : undefined} />;
}
export function EditableSource({ field, original, fallback, media }: { field: string; original: string; fallback: string; media: string }) {
  const value = useContentValue(field);
  return <source media={media} srcSet={value === original ? fallback : value} />;
}
export function EditableLink({ field, children, ...props }: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { field: string }) {
  const { values, preview } = useContext(ContentContext);
  return <a {...props} href={values[field]} data-edit-field={preview ? field : undefined}>{children}</a>;
}

export function useContentCollection<T extends object>(prefix: string, collection: readonly T[]): T[] {
  const { values } = useContext(ContentContext);
  return useMemo(() => collection.map((item, i) => Object.fromEntries(Object.entries(item).map(([key, value]) => [key, Array.isArray(value) ? value.map((entry, j) => values[`${prefix}.${i}.${key}.${j}`] ?? entry) : values[`${prefix}.${i}.${key}`] ?? value])) as T), [prefix, collection, values]);
}

export function useSiteLocale() {return useContext(ContentContext).locale;}

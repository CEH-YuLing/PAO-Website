import vi from './editorial-pages.vi.json';
import en from './editorial-pages.en.json';
import zh from './editorial-pages.zh.json';
import type { Locale } from './locale';

export type EditorialSlug = 'tinh-nang' | 'doi-ngu' | 'blog' | 'download';
export type EditorialBlock = {
  kind: string; text?: string; level?: number; id?: string; ordered?: boolean;
  items?: string[]; header?: string[]; rows?: string[][];
  actions?: Array<{label:string;href:string}>; tone?: string;
};
export type EditorialSection = {id:string;title:string;blocks:EditorialBlock[]};
export type EditorialPage = {seoTitle:string;description:string;title:string;subtitle:string;intro:EditorialBlock[];sections:EditorialSection[]};
const copy: Record<Locale,Record<EditorialSlug,EditorialPage>> = {vi,en,zh};
export function getEditorialPage(slug:string,locale:Locale):EditorialPage|null {
  return Object.hasOwn(copy[locale],slug) ? copy[locale][slug as EditorialSlug] : null;
}

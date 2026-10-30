import type { Locale } from './locale';
import vi from './about-page.vi.json';
import en from './about-page.en.json';
import zh from './about-page.zh.json';

export type AboutSection = {
  id: string; title: string; subtitle: string; paragraphs: string[];
  variant: string; items?: string[]; after?: string[];
};
export type AboutCopy = {
  seoTitle: string; description: string; title: string; subtitle: string; intro: string[];
  sections: AboutSection[];
  closing: { title: string; paragraph: string; solutions: string; contact: string };
};

export const aboutCopy: Record<Locale, AboutCopy> = { vi, en, zh };

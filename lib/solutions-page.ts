import type { Locale } from './locale';
import vi from './solutions-page.vi.json';
import en from './solutions-page.en.json';
import zh from './solutions-page.zh.json';

export type SolutionSection = {
  id: string; title: string; subtitle: string; paragraphs: string[];
  items: string[]; ordered: boolean; after: string[];
};
export type SolutionsCopy = {
  seoTitle: string; description: string; title: string; subtitle: string; intro: string[];
  sections: SolutionSection[];
  deployment: { title: string; subtitle: string; paragraphs: string[]; steps: { title: string; paragraph: string }[]; after: string[] };
  closing: { title: string; subtitle: string; paragraphs: string[]; contact: string; features: string };
};
export const solutionsCopy: Record<Locale, SolutionsCopy> = { vi, en, zh };

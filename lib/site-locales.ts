import base from './site-content.json';
import en from './content-en.json';
import zh from './content-zh.json';
import type { Locale } from './locale';
export function getSiteValues(locale:Locale):Record<string,string> {return {...base.values,...(locale==='en'?en:locale==='zh'?zh:{})};}

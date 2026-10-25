export type Locale = 'vi' | 'en' | 'zh';
export const languages: Array<{code:Locale;label:string;short:string}> = [{code:'en',label:'English',short:'EN'},{code:'vi',label:'Tiếng Việt',short:'VI'},{code:'zh',label:'中文',short:'中文'}];
export function localizedPath(path: string, locale: Locale) { const clean=path.replace(/^\/(en|zh)(?=\/|$)/,'')||'/'; return locale==='vi'?clean:`/${locale}${clean.startsWith('/')?clean:`/${clean}`}`; }
export function htmlLanguage(locale: Locale) { return locale==='zh'?'zh-CN':locale; }

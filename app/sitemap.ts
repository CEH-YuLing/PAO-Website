import type {MetadataRoute} from 'next';
export const dynamic='force-static';
export default function sitemap():MetadataRoute.Sitemap {return ['','en/','zh/'].flatMap(prefix=>['','gioi-thieu/','giai-phap/','tinh-nang/','doi-ngu/','blog/','download/','privacy/'].map(page=>({url:`https://pao-os.com/${prefix}${page}`,changeFrequency:'monthly' as const,priority:page==='privacy/'?.3:page?.8:1,alternates:{languages:{vi:`https://pao-os.com/${page}`,en:`https://pao-os.com/en/${page}`,'zh-CN':`https://pao-os.com/zh/${page}`}}})));}

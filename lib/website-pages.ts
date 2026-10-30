import { localizedPath, type Locale } from './locale';

// The owner will supply the content for each page. Keep these pages out of
// search indexes until the corresponding content is ready to publish.
export const websitePages = [
  { slug: 'gioi-thieu', vi: 'Giới thiệu', en: 'About', zh: '关于 PAO', icon: 'about' },
  { slug: 'giai-phap', vi: 'Giải pháp', en: 'Solutions', zh: '解决方案', icon: 'solutions' },
  { slug: 'tinh-nang', vi: 'Tính năng', en: 'Features', zh: '功能', icon: 'features' },
  { slug: 'doi-ngu', vi: 'Đội ngũ', en: 'Team', zh: '开发团队', icon: 'team' },
  { slug: 'blog', vi: 'Blog', en: 'Blog', zh: '博客', icon: 'blog' },
  { slug: 'download', vi: 'Download', en: 'Download', zh: '下载', icon: 'download' },
  { slug: 'lien-he', vi: 'Liên hệ', en: 'Contact', zh: '联系我们', icon: 'contact' },
] as const;

export type WebsitePage = typeof websitePages[number];
export type WebsiteSlug = WebsitePage['slug'];
// Owner-supplied English URLs reuse the existing pages and their canonicals.
export const websiteAliases = { solutions: 'giai-phap', contact: 'lien-he' } as const;
export const websitePagePath = (page: WebsitePage, locale: Locale) => localizedPath(`/${page.slug}/`, locale);
export const getWebsitePage = (slug: string) => {
  const canonicalSlug = Object.hasOwn(websiteAliases, slug) ? websiteAliases[slug as keyof typeof websiteAliases] : slug;
  return websitePages.find(page => page.slug === canonicalSlug);
};

export function homepageSection(id: string, locale: Locale, pathname: string) {
  const isHome = pathname.replace(/^\/(en|zh)(?=\/|$)/, '').replace(/\/$/, '') === '';
  return isHome ? `#${id}` : `${localizedPath('/', locale)}#${id}`;
}

export const pageShellCopy = {
  vi: { home: 'Trang chủ', navigation: 'Điều hướng chính', breadcrumb: 'Vị trí trang', pending: 'Nội dung đang được cập nhật.', back: 'Về trang chủ' },
  en: { home: 'Home', navigation: 'Main navigation', breadcrumb: 'Breadcrumb', pending: 'Content is being updated.', back: 'Back to home' },
  zh: { home: '首页', navigation: '主导航', breadcrumb: '页面位置', pending: '内容正在更新。', back: '返回首页' },
};

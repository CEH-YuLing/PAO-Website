import { ArrowRight, ArrowUpRight, BookOpen, Code2, Layers3, Mail, MapPin, MonitorDown, Phone, ShieldCheck, Users, Workflow } from 'lucide-react';
import type { Locale } from '@/lib/locale';
import { localizedPath } from '@/lib/locale';
import type { WebsitePage } from '@/lib/website-pages';
import PageIllustration from './page-illustration';

const copy = {
  vi: {
    'giai-phap': ['Từ nhu cầu của doanh nghiệp, đến cách phối hợp cùng AI.', 'Giải pháp cho từng cách làm việc', 'Thông tin về các giải pháp và phạm vi ứng dụng sẽ được cập nhật tại đây.'],
    'tinh-nang': ['Hiểu PAO qua những công việc cần làm mỗi ngày.', 'Một góc nhìn rõ ràng về PAO', 'Các tính năng, cách sử dụng và điều kiện triển khai sẽ được giới thiệu chi tiết tại đây.'],
    'doi-ngu': ['Những con người cùng xây dựng PAO OS.', 'Đội ngũ phát triển PAO', 'Thông tin về đội ngũ phát triển sẽ được cập nhật tại đây.'],
    blog: ['Chia sẻ về AI và cách đưa công nghệ vào công việc.', 'Góc đọc từ PAO', 'Các bài viết sẽ được xuất bản tại đây.'],
    download: ['Bắt đầu hành trình làm việc cùng PAO.', 'Nhận bản cài PAO OS', 'Bản cài chưa được công bố trên website. Liên hệ PAO để tìm hiểu thông tin triển khai.'],
    'lien-he': ['Kết nối với chúng tôi để trao đổi về nhu cầu của bạn.', 'Cùng tìm hiểu hướng đi phù hợp', 'Trao đổi trực tiếp với PAO OS qua các kênh bên dưới.'],
    status: 'Đang cập nhật nội dung', contact: 'Liên hệ PAO', learn: 'Tìm hiểu PAO OS', location: 'Địa chỉ', viewMap: 'Xem trên Google Maps', explore: 'Khám phá thêm', categories: ['Lập kế hoạch', 'Phối hợp công việc', 'Dữ liệu & ngữ cảnh'], team: ['Con người', 'Công nghệ', 'Cùng phát triển'], blogTopics: ['Góc nhìn', 'Kiến thức', 'Cách làm việc'], downloadLabel: 'Thông tin phát hành', downloadNote: 'Đường dẫn tải và hướng dẫn cài đặt sẽ xuất hiện khi có bản phát hành chính thức.',
  },
  en: {
    'giai-phap': ['From business needs to working together with AI.', 'Solutions for the way you work', 'Solution details and their scope of use will be published here.'],
    'tinh-nang': ['Understand PAO through the work you do every day.', 'A clearer view of PAO', 'Features, usage guidance and deployment requirements will be introduced here.'],
    'doi-ngu': ['The people building PAO OS together.', 'The PAO development team', 'Information about our development team will be published here.'],
    blog: ['Perspectives on AI and bringing technology into work.', 'Reading from PAO', 'Articles will be published here.'],
    download: ['Begin your journey of working with PAO.', 'Get PAO OS', 'An installer has not been released on this website. Contact PAO to learn about deployment.'],
    'lien-he': ['Connect with us to discuss what your business needs.', 'Find the right direction together', 'Get in touch with PAO OS through the channels below.'],
    status: 'Content updates to follow', contact: 'Contact PAO', learn: 'About PAO OS', location: 'Address', viewMap: 'View on Google Maps', explore: 'Explore further', categories: ['Planning', 'Work coordination', 'Data & context'], team: ['People', 'Technology', 'Building together'], blogTopics: ['Perspectives', 'Knowledge', 'Ways of working'], downloadLabel: 'Release information', downloadNote: 'Download links and installation guidance will appear when an official release is available.',
  },
  zh: {
    'giai-phap': ['从企业需求出发，探索与 AI 协作的方式。', '适合不同工作方式的解决方案', '解决方案及其适用范围将在此更新。'],
    'tinh-nang': ['从日常工作了解 PAO。', '更清晰地了解 PAO', '功能、使用方法和部署条件将在此详细介绍。'],
    'doi-ngu': ['共同构建 PAO OS 的人们。', 'PAO 开发团队', '开发团队的信息将在此更新。'],
    blog: ['分享 AI 观点与技术在工作中的应用。', 'PAO 阅读空间', '文章将在此发布。'],
    download: ['开启与 PAO 协作的旅程。', '获取 PAO OS', '本网站尚未发布安装程序。请联系 PAO 了解部署信息。'],
    'lien-he': ['联系我们，交流您的企业需求。', '一起寻找合适的方向', '通过以下渠道直接联系 PAO OS。'],
    status: '内容即将更新', contact: '联系 PAO', learn: '了解 PAO OS', location: '地址', viewMap: '在 Google Maps 查看', explore: '继续探索', categories: ['规划', '工作协调', '数据与背景'], team: ['团队', '技术', '共同发展'], blogTopics: ['观点', '知识', '工作方式'], downloadLabel: '版本发布信息', downloadNote: '正式版本发布后，此处将提供下载链接及安装指南。',
  },
};

export default function WebsitePageDesign({ page, locale }: { page: WebsitePage; locale: Locale }) {
  if (page.slug === 'gioi-thieu') return null;
  const c = copy[locale];
  const [lead, title, description] = c[page.slug];
  const isContact = page.slug === 'lien-he';
  const icons = { 'giai-phap': Layers3, 'tinh-nang': Workflow, 'doi-ngu': Users, blog: BookOpen, download: MonitorDown, 'lien-he': Mail };
  const Icon = icons[page.slug];
  return <article className={`designed-page designed-page-${page.slug}`}>
    <header className="editorial-hero"><div className="editorial-hero-copy"><span className="editorial-kicker"><i/>PAO OS / {page[locale]}</span><h1>{page[locale]}</h1><p className="editorial-lead">{lead}</p><a className="editorial-text-link" href={isContact?'mailto:cs@pao-os.com':localizedPath('/gioi-thieu/',locale)}>{isContact?'cs@pao-os.com':c.learn}<ArrowUpRight size={18}/></a></div><PageIllustration kind={page.slug} locale={locale}/></header>
    {isContact ? <section className="page-contact-grid" aria-label={title}>
      <a href="mailto:cs@pao-os.com"><Mail size={24}/><span>Email</span><strong>cs@pao-os.com</strong><ArrowUpRight className="contact-card-arrow" size={18}/></a>
      <a href="tel:+84925880088"><Phone size={24}/><span>Hotline</span><strong>0925880088</strong><ArrowUpRight className="contact-card-arrow" size={18}/></a>
      <a href="https://maps.app.goo.gl/q3hCtzTtqY1sJNev7" target="_blank" rel="noopener noreferrer"><MapPin size={24}/><span>{c.location}</span><strong>No 06 Viet Thang, Viet Hung, Quang Ninh City</strong><small>{c.viewMap}<ArrowUpRight size={14}/></small></a>
    </section> : <section className="page-content-preview">
      <div className="page-preview-copy"><span className="editorial-section-index"><Icon size={17}/>PAO OS</span><h2>{title}</h2><p>{description}</p><span className="page-editorial-status"><i/>{c.status}</span></div>
      {page.slug==='download' ? <div className="page-release"><MonitorDown size={36} strokeWidth={1.2}/><span>{c.downloadLabel}</span><strong>PAO OS</strong><p>{c.downloadNote}</p><a className="editorial-text-link" href={localizedPath('/lien-he/',locale)}>{c.contact}<ArrowRight size={16}/></a></div>
      : page.slug==='doi-ngu' ? <div className="page-pillars">{c.team.map((text,i)=>{const ItemIcon=[Users,Code2,ShieldCheck][i];return <div key={text}><ItemIcon size={24}/><span>{text}</span></div>})}</div>
      : page.slug==='blog' ? <div className="page-reading-art" aria-hidden="true">{c.blogTopics.map((text,i)=><div key={text}><BookOpen size={22}/><span>{String(i+1).padStart(2,'0')}</span><strong>{text}</strong><i/><i/></div>)}</div>
      : <div className="page-capability-art" aria-hidden="true">{c.categories.map((text,i)=>{const ItemIcon=[Layers3,Workflow,ShieldCheck][i];return <div key={text}><ItemIcon size={21}/><span>{text}</span><i/></div>})}<span className="page-capability-core">PAO OS</span></div>}
    </section>}
    <nav className="page-next-links" aria-label={c.explore}><a href={localizedPath('/gioi-thieu/',locale)}><span>{c.learn}</span><ArrowRight size={19}/></a><a href={localizedPath(isContact?'/giai-phap/':'/lien-he/',locale)}><span>{isContact?{vi:'Giải pháp PAO',en:'PAO solutions',zh:'PAO 解决方案'}[locale]:c.contact}</span><ArrowRight size={19}/></a></nav>
  </article>;
}

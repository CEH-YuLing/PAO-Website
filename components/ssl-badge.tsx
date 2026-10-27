import type { Locale } from '@/lib/locale';

export default function SslBadge({ locale }: { locale: Locale }) {
  const label = {
    vi: 'pao-os.com sử dụng kết nối HTTPS được mã hóa',
    en: 'pao-os.com uses an encrypted HTTPS connection',
    zh: 'pao-os.com 使用加密的 HTTPS 连接',
  }[locale];
  return <span className="pao-ssl-badge" role="img" aria-label={label} title={label}>
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2 3.5 5.5v6c0 5 3.5 8.4 8.5 10.5 5-2.1 8.5-5.5 8.5-10.5v-6L12 2Z"/>
      <rect x="8" y="10" width="8" height="6" rx="1.3"/>
      <path d="M9.5 10V8a2.5 2.5 0 0 1 5 0v2"/>
    </svg>
    <strong>SSL</strong><span>SECURED</span>
  </span>;
}

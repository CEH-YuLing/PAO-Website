'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import type { Locale } from '@/lib/locale';

const copy = {
  vi: { label: 'Nhận thông tin mới nhất từ PAO OS', placeholder: 'Email của bạn', button: 'Đăng ký nhận tin', pending: 'Tính năng nhận tin sẽ sớm được mở. Email của bạn chưa được gửi.' },
  en: { label: 'Get the latest updates from PAO OS', placeholder: 'Your email', button: 'Subscribe', pending: 'Newsletter subscriptions will open soon. Your email has not been sent.' },
  zh: { label: '获取 PAO OS 最新资讯', placeholder: '您的邮箱', button: '订阅', pending: '订阅功能即将开放。您的邮箱尚未发送。' },
};

export default function NewsletterSignup({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const [showNotice, setShowNotice] = useState(false);
  return <form className="pao-newsletter" aria-label={c.label} onSubmit={event => {
    event.preventDefault();
    // UI only: do not send, persist or report a successful subscription.
    setShowNotice(true);
  }}>
    <label htmlFor="footer-newsletter-email">{c.label}</label>
    <div className="pao-newsletter-field">
      <input id="footer-newsletter-email" name="email" type="email" inputMode="email" autoComplete="email" required maxLength={254} placeholder={c.placeholder} aria-describedby="footer-newsletter-status" onChange={() => setShowNotice(false)}/>
      <button type="submit" aria-label={c.button} title={c.button}><ArrowRight size={15} aria-hidden="true"/></button>
    </div>
    <p id="footer-newsletter-status" className="pao-newsletter-status" role="status">{showNotice ? c.pending : ''}</p>
  </form>;
}

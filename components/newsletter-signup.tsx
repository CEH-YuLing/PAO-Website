'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import type { Locale } from '@/lib/locale';

const copy = {
  vi: { label: 'Nhận tin từ PAO', hint: 'Cập nhật sản phẩm và thông tin mới từ PAO OS.', placeholder: 'Địa chỉ email của bạn', button: 'Đăng ký', pending: 'Tính năng nhận tin sẽ sớm được mở. Email của bạn chưa được gửi.' },
  en: { label: 'Stay updated with PAO', hint: 'Product updates and the latest from PAO OS.', placeholder: 'Your email address', button: 'Subscribe', pending: 'Newsletter subscriptions will open soon. Your email has not been sent.' },
  zh: { label: '订阅 PAO 资讯', hint: '获取 PAO OS 产品更新与最新动态。', placeholder: '您的电子邮箱', button: '订阅', pending: '订阅功能即将开放。您的邮箱尚未发送。' },
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
    <p id="footer-newsletter-hint">{c.hint}</p>
    <div className="pao-newsletter-field">
      <input id="footer-newsletter-email" name="email" type="email" inputMode="email" autoComplete="email" required maxLength={254} placeholder={c.placeholder} aria-describedby="footer-newsletter-hint" onChange={() => setShowNotice(false)}/>
      <button type="submit"><span>{c.button}</span><ArrowRight size={15} aria-hidden="true"/></button>
    </div>
    <p className="pao-newsletter-status" role="status">{showNotice ? c.pending : ''}</p>
  </form>;
}

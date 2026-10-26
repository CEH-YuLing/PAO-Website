'use client';

import { useSiteLocale } from './site-content';

const copy = {
  vi: ['BẠN KIẾN TẠO TẦM NHÌN.', 'PAO ĐỒNG HÀNH HIỆN THỰC HÓA.'],
  en: ['YOU SHAPE THE VISION.', 'PAO HELPS BRING IT TO LIFE.'],
  zh: ['您构筑愿景。', 'PAO 携手将其变为现实。']
};

export default function ContactSlogan() {
  const [vision, action] = copy[useSiteLocale()];
  return <div className="contact-slogan"><span>{vision}</span><strong>{action}</strong></div>;
}

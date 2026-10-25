import Link from 'next/link';
export default function NotFound() {
  return <main id="noi-dung" className="legal-page shell"><span className="eyebrow">PAO OS / 404</span><h1>Trang này chưa có ở đây.</h1><p>Hãy quay về PAO để tiếp tục khám phá.</p><Link className="button button-primary" href="/">Về trang chủ →</Link></main>;
}

import type { Metadata } from 'next';
import WebsiteEditor from '@/components/website-editor';
import './editor.css';

export const metadata: Metadata = {
  title: 'Biên tập website — PAO OS',
  description: 'Công cụ chỉnh sửa website PAO trên máy của bạn.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/editor/' },
};
export default function EditorPage() { return <WebsiteEditor />; }

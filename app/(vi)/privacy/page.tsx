import type {Metadata} from 'next';
import PrivacyContent from '@/components/privacy-content';
export const metadata:Metadata={title:'Chính sách quyền riêng tư & Bảo vệ dữ liệu — PAO OS',alternates:{canonical:'/privacy/',languages:{vi:'/privacy/',en:'/en/privacy/','zh-CN':'/zh/privacy/'}}};
export default function Page(){return <PrivacyContent locale="vi"/>;}

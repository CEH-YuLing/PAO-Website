'use client';

import {Compass,Workflow,ShieldCheck} from 'lucide-react';
import {useSiteLocale} from './site-content';
const copy={
vi:[['Bắt đầu với PAO','Tìm hiểu nền tảng, lựa chọn mô hình AI và cách phối hợp cùng đội ngũ.'],['Đưa vào công việc','Khám phá lập kế hoạch, nội dung và điều phối theo ngữ cảnh doanh nghiệp.'],['Dữ liệu & quyền kiểm soát','Tìm hiểu phạm vi dữ liệu, quyền truy cập và những bước cần bạn xem xét.']],
en:[['Getting started with PAO','Understand the platform, AI model choices and collaboration with your team.'],['Bringing PAO into your work','Explore planning, content and coordination within your business context.'],['Data & control','Understand data scope, access permissions and the steps that need your review.']],
zh:[['开始了解 PAO','了解平台、AI 模型选择，以及与团队协作的方式。'],['融入日常工作','探索企业背景下的规划、内容与工作协调。'],['数据与控制权','了解数据范围、访问权限及需要您审核的步骤。']]
};
const icons=[Compass,Workflow,ShieldCheck];
export default function FaqGuidance(){const items=copy[useSiteLocale()];return <div className="faq-guidance">{items.map(([title,text],i)=>{const Icon=icons[i];return <div key={i}><Icon size={19} aria-hidden="true"/><div><h3>{title}</h3><p>{text}</p></div></div>;})}</div>;}

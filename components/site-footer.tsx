'use client';

import {ArrowUp,ArrowUpRight,MapPin,Phone,Globe} from 'lucide-react';
import {EditableImage,EditableLink,EditableText,useSiteLocale} from './site-content';
import LanguageSwitcher,{LocaleLink} from './site-language';

const copy={
vi:{kicker:'MỘT NỀN TẢNG. KẾT NỐI CÔNG VIỆC.',platform:'Khám phá PAO',solutions:'Ứng dụng',resources:'Thông tin',contact:'Kết nối với chúng tôi',about:'Về PAO',capabilities:'Giải pháp cho SME',workflow:'Cách hoạt động',team:'Đội ngũ AI',cases:'Tình huống ứng dụng',planning:'Lập kế hoạch & điều phối',content:'Marketing & nội dung',knowledge:'Tri thức doanh nghiệp',control:'Phê duyệt & quyền kiểm soát',faq:'Câu hỏi thường gặp',privacy:'Chính sách quyền riêng tư',talk:'Trao đổi nhu cầu',ivn:'Tìm hiểu IVN Media',top:'Về đầu trang',built:'PHÁT TRIỂN BỞI',office:'VĂN PHÒNG',tagline:'Your AI Chief of Staff.',rights:'Bảo lưu mọi quyền.'},
en:{kicker:'ONE PLATFORM. CONNECTED WORK.',platform:'Explore PAO',solutions:'Applications',resources:'Information',contact:'Connect with us',about:'About PAO',capabilities:'Solutions for SMEs',workflow:'How it works',team:'AI team',cases:'Use cases',planning:'Planning & coordination',content:'Marketing & content',knowledge:'Business knowledge',control:'Approvals & control',faq:'Frequently asked questions',privacy:'Privacy policy',talk:'Discuss your needs',ivn:'Discover IVN Media',top:'Back to top',built:'DEVELOPED BY',office:'OFFICE',tagline:'Your AI Chief of Staff.',rights:'All rights reserved.'},
zh:{kicker:'一个平台。关联全部工作。',platform:'探索 PAO',solutions:'应用场景',resources:'信息',contact:'联系我们',about:'关于 PAO',capabilities:'中小企业解决方案',workflow:'工作方式',team:'AI 团队',cases:'应用场景',planning:'规划与协调',content:'营销与内容',knowledge:'企业知识',control:'审批与控制',faq:'常见问题',privacy:'隐私政策',talk:'沟通您的需求',ivn:'了解 IVN Media',top:'返回顶部',built:'开发团队',office:'办公地址',tagline:'Your AI Chief of Staff.',rights:'保留所有权利。'}
};

// An original wire landscape, inspired by the layered footer in IVN Media's site.
const landscape=Array.from({length:30},(_,row)=>Array.from({length:71},(_,i)=>{
 const x=i*24;const y=220+row*10-Math.sin(i*.12+row*.065)*46-Math.cos(i*.29-row*.1)*24-Math.sin(i*.05)*65;
 return `${i?'L':'M'}${x.toFixed(1)},${y.toFixed(1)}`;
}).join(' '));
const meridians=Array.from({length:71},(_,i)=>Array.from({length:30},(_,row)=>{
 const x=i*24;const y=220+row*10-Math.sin(i*.12+row*.065)*46-Math.cos(i*.29-row*.1)*24-Math.sin(i*.05)*65;
 return `${row?'L':'M'}${x.toFixed(1)},${y.toFixed(1)}`;
}).join(' '));

export default function SiteFooter(){
 const c=copy[useSiteLocale()];
 const platform=[[c.about,'#gioi-thieu'],[c.capabilities,'#kha-nang'],[c.workflow,'#quy-trinh'],[c.team,'#doi-ngu']];
 const solutions=[[c.planning,'#quy-trinh'],[c.content,'#trai-nghiem'],[c.knowledge,'#tri-thuc'],[c.control,'#bao-mat']];
 return <footer className="pao-footer" id="chan-trang"><div className="pao-footer-glow" aria-hidden="true"/><svg className="pao-footer-landscape" viewBox="0 0 1680 560" preserveAspectRatio="none" aria-hidden="true"><g fill="none" stroke="currentColor" strokeWidth=".65">{landscape.map((d,i)=><path key={`h${i}`} d={d}/>)}{meridians.map((d,i)=><path key={`v${i}`} d={d}/>)}</g></svg><div className="shell pao-footer-content"><div className="pao-footer-intro"><span className="pao-footer-kicker"><i/>PAO OS <b>/</b> {c.kicker}</span><a href="#trang-chu" className="pao-footer-top" aria-label={c.top}><span>{c.top}</span><ArrowUp size={16}/></a></div><div className="pao-footer-grid"><nav aria-label={c.platform}><h3>{c.platform}</h3>{platform.map(([label,href])=><a key={href} href={href}>{label}<ArrowUpRight size={13}/></a>)}</nav><nav aria-label={c.solutions}><h3>{c.solutions}</h3>{solutions.map(([label,href])=><a key={href} href={href}>{label}<ArrowUpRight size={13}/></a>)}</nav><nav aria-label={c.resources}><h3>{c.resources}</h3><a href="#cau-hoi">{c.faq}<ArrowUpRight size={13}/></a><LocaleLink href="/privacy/">{c.privacy}<ArrowUpRight size={13}/></LocaleLink><a href="#lien-he">{c.talk}<ArrowUpRight size={13}/></a><a href="https://ivnmedia.com/" target="_blank" rel="noopener noreferrer">{c.ivn}<ArrowUpRight size={13}/></a></nav><div className="pao-footer-contact"><h3>{c.contact}</h3><EditableLink field="contact.email.link" className="pao-footer-email"><EditableText field="contact.email"/><ArrowUpRight size={19}/></EditableLink><EditableLink field="contact.phone.link"><Phone size={14}/><EditableText field="contact.phone"/></EditableLink><div className="pao-footer-address"><MapPin size={16}/><div><p><EditableText field="footer.copy.11"/> <EditableText field="footer.copy.12"/></p></div></div></div></div><div className="pao-footer-identity"><div className="pao-footer-signature"><a href="#trang-chu" aria-label="PAO OS"><EditableImage field="images.primary" alt="PAO" width={150} height={64}/></a><div><strong>{c.tagline}</strong><p><EditableText field="footer.copy.16"/></p></div></div><div className="pao-footer-company"><strong><EditableText field="footer.copy.9"/></strong><span><EditableText field="footer.copy.10"/></span></div><a className="pao-footer-developer" href="https://ivnmedia.com/" target="_blank" rel="noopener noreferrer"><small>{c.built}</small><span>IVN <b>NETWORK</b><ArrowUpRight size={16}/></span></a></div></div><div className="pao-footer-legal"><div className="shell"><p><EditableText field="footer.copy.15"/> <span>{c.rights}</span></p><div className="pao-footer-legal-tools"><span><Globe size={12}/> PAO OS</span><LanguageSwitcher/></div></div></div></footer>;
}

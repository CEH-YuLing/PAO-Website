'use client';
import translations from '@/lib/guide-translations.json';
import {useSiteLocale} from './site-content';
import {useT} from './site-language';

import { useState } from 'react';

const guides:Record<string,{focus:string[];text:string[]}>={
  DASHBOARD:{focus:['Một góc nhìn chung','Theo dõi ưu tiên','Nhìn rõ kết quả'],text:['Kết nối những thông tin cần thiết để người điều hành nắm được bối cảnh công việc.','Tập trung vào việc quan trọng, các mốc kế hoạch và kết quả đang cần xem xét.','Đọc thông tin gắn với nguồn và phạm vi doanh nghiệp.']},
  PLANNER:{focus:['Mục tiêu rõ ràng','Công việc có thứ tự','Kế hoạch để xem xét'],text:['Làm rõ mục tiêu, khách hàng và nguồn lực trước khi xây dựng kế hoạch.','Chia mục tiêu thành các bước, quan hệ phụ thuộc và người phụ trách.','Chuẩn bị kế hoạch để đội ngũ rà soát và thống nhất bước tiếp theo.']},
  CONTENT:{focus:['Thông điệp nhất quán','Ngữ cảnh thương hiệu','Nội dung có mục đích'],text:['Phát triển nội dung từ brief và định hướng được doanh nghiệp lựa chọn.','Giữ mạch thông tin về thương hiệu, sản phẩm và đối tượng sử dụng.','Gắn từng nội dung với mục tiêu truyền thông và bước xem xét.']},
  DESIGN:{focus:['Hướng sáng tạo','Tài sản thương hiệu','Phối hợp nội dung'],text:['Làm rõ ý tưởng và định hướng hình ảnh trước khi triển khai.','Tổ chức tài liệu tham chiếu và các tài sản đã được lựa chọn.','Kết nối brief, nội dung và hướng sáng tạo trong cùng một bối cảnh.']},
  EDITOR:{focus:['Tổ chức tài sản','Vòng xem xét','Theo dõi phiên bản'],text:['Kết nối tài liệu, hình ảnh và video với công việc đang thực hiện.','Làm rõ yêu cầu chỉnh sửa và người phụ trách từng bước.','Giữ mạch các lần cập nhật để đội ngũ xem xét kết quả.']},
  PUBLISHING:{focus:['Lịch nội dung','Điểm đến rõ ràng','Quyền được kiểm soát'],text:['Chuẩn bị lịch và phối hợp các đầu việc trước khi phân phối nội dung.','Xác định kênh, thương hiệu và tài khoản phù hợp với từng nội dung.','Các hành động trên nền tảng cần kết nối, quyền và cấu hình phù hợp.']},
  ADS:{focus:['Mục tiêu chiến dịch','Bối cảnh khách hàng','Đọc hiệu quả'],text:['Kết nối mục tiêu, đối tượng, thông điệp và ngân sách ở bước lập kế hoạch.','Chuẩn bị brief và hướng nội dung phù hợp với nhóm khách hàng cần tiếp cận.','Tổng hợp thông tin từ nguồn đã chọn để hỗ trợ xem xét hiệu quả.']},
  CRM:{focus:['Thông tin có ngữ cảnh','Mạch chăm sóc','Phối hợp đội ngũ'],text:['Gắn thông tin khách hàng với sản phẩm, thương hiệu và công việc liên quan.','Làm rõ việc cần tiếp nối trong các hoạt động chăm sóc khách hàng.','Kết nối người phụ trách, nguồn tham chiếu và các bước xem xét.']},
  FINANCE:{focus:['Chỉ số cần theo dõi','Nguồn dữ liệu rõ ràng','Báo cáo để trao đổi'],text:['Tập trung các chỉ số cần thiết cho bài toán quản trị của doanh nghiệp.','Đối chiếu thông tin với nguồn và kỳ báo cáo được lựa chọn.','Hỗ trợ tổng hợp thông tin để người phụ trách xem xét; không thay thế nghiệp vụ chuyên môn.']},
  INTEGRATIONS:{focus:['Kết nối theo nhu cầu','Chọn mô hình AI','Phạm vi quyền'],text:['Lựa chọn nền tảng và công cụ theo nhu cầu vận hành cụ thể.','Cấu hình mô hình phù hợp với công việc, ngân sách và yêu cầu dữ liệu.','Quyền sử dụng và nguồn thông tin được xác định theo doanh nghiệp.']},
};
export default function StructureGuidePanel({name,feature}:{name:string;feature:string|null}) {
  const t=useT();
  const [selected,setSelected]=useState(0);const locale=useSiteLocale();const guide=locale==='vi'?guides[name]:(translations as Record<string,Record<'en'|'zh',{focus:string[];text:string[]}>>)[name][locale];
  return <div className="structure-guide"><div className="structure-guide-heading"><span>{feature||t("CÁCH PAO KẾT NỐI CÔNG VIỆC")}</span><a href="#trai-nghiem">{t("Khám phá ứng dụng →")}</a></div><div className="structure-guide-tabs" aria-label={`${t("Khám phá")} ${name}`}>{guide.focus.map((label,i)=><button key={label} aria-pressed={selected===i} onClick={()=>setSelected(i)}>{label}</button>)}</div><p aria-live="polite">{guide.text[selected]}</p></div>;
}

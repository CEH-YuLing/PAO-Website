'use client';
import {useSiteLocale} from './site-content';
const copy={
vi:{title:'Từ yêu cầu đến việc cần làm.',text:'PAO giữ mạch trao đổi chung, kết nối tri thức và các vai trò phù hợp để bạn theo dõi công việc trong cùng một bối cảnh.',steps:[['Làm rõ mục tiêu','Xác định điều cần đạt, nguồn tham chiếu và những ràng buộc của doanh nghiệp.'],['Phối hợp vai trò','Chia phần việc cho các nhóm chuyên biệt, giữ kết nối giữa kế hoạch và người phụ trách.'],['Xem xét kết quả','Tập hợp đầu ra để bạn kiểm tra, phản hồi và quyết định bước tiếp theo.']]},
en:{title:'From a request to the work ahead.',text:'PAO keeps a shared thread, connecting knowledge and relevant roles so you can follow the work within one business context.',steps:[['Clarify the goal','Identify the desired outcome, references and business constraints.'],['Coordinate the roles','Divide work across specialist roles and connect plans with responsibilities.'],['Review the results','Bring outputs together for you to check, give feedback and decide the next step.']]},
zh:{title:'从需求到具体工作。',text:'PAO 保持统一的交流脉络，关联知识与合适的角色，让您在同一企业背景中跟进工作。',steps:[['明确目标','确定预期成果、参考资料与企业约束条件。'],['协调角色','将工作分配给专业角色，关联计划与负责人。'],['审核结果','汇集成果，供您检查、反馈并决定下一步。']]}
};
export default function TeamContext(){const c=copy[useSiteLocale()];return <div className="team-context"><h3>{c.title}</h3><p>{c.text}</p></div>;}

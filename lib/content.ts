export const navItems = [
  ['Về PAO', '#gioi-thieu'],
  ['Giải pháp', '#kha-nang'],
  ['Cách hoạt động', '#quy-trinh'],
  ['Đội ngũ AI', '#doi-ngu'],
  ['Ứng dụng', '#trai-nghiem'],
] as const;
export const agents = [
  { name: 'Planner', role: 'Lập kế hoạch', text: 'Chia mục tiêu thành các bước, xác định ưu tiên và quan hệ phụ thuộc để bạn xem xét.', icon: 'compass', x: 50, y: 10 },
  { name: 'Content', role: 'Nội dung', text: 'Phác thảo thông điệp và nội dung từ brief, nguồn tri thức và định hướng thương hiệu.', icon: 'pen', x: 79, y: 22 },
  { name: 'Creative', role: 'Sáng tạo', text: 'Đề xuất ý tưởng hình ảnh và hướng sáng tạo. Các luồng media nâng cao đang phát triển.', icon: 'sparkles', x: 91, y: 50 },
  { name: 'Developer', role: 'Phát triển', text: 'Vai trò minh họa cho hỗ trợ công việc kỹ thuật; không cấp quyền thực thi mã từ website.', icon: 'code', x: 79, y: 78 },
  { name: 'Marketing', role: 'Tiếp thị', text: 'Kết nối mục tiêu, đối tượng và thông điệp thành bản nháp kế hoạch marketing để duyệt.', icon: 'megaphone', x: 50, y: 90 },
  { name: 'Ads', role: 'Quảng cáo', text: 'Định hướng hỗ trợ quảng cáo. Kích hoạt nền tảng, quyền tài khoản và chi tiêu là các bước riêng.', icon: 'target', x: 21, y: 78 },
  { name: 'CRM', role: 'Khách hàng', text: 'Vai trò minh họa cho vận hành khách hàng. Luồng CRM thực tế cần xác minh theo từng tích hợp.', icon: 'users', x: 9, y: 50 },
  { name: 'Finance', role: 'Tài chính', text: 'Vai trò định hướng cho tổng hợp số liệu và hỗ trợ báo cáo; không thay thế nghiệp vụ kế toán.', icon: 'chart', x: 21, y: 22 },
] as const;

export const capabilities = [
  { title: 'Một trợ lý. Nhiều việc hơn.', subtitle: 'PAO AI', text: 'Trao đổi, chọn nguồn tri thức và tiếp nối công việc trong ngữ cảnh doanh nghiệp.', icon: 'sparkles', status: 'Đã kiểm thử local', className: 'cap-assistant' },
  { title: 'Nhìn rõ bức tranh chung', subtitle: 'Business workspace', text: 'Kết nối hồ sơ, kế hoạch, công việc và kết quả trong cùng một không gian.', icon: 'layout', status: 'Đã kiểm thử local', className: 'cap-dashboard' },
  { title: 'Đúng vai trò, đúng công việc', subtitle: 'AI Agents', text: 'Tổ chức năng lực và phân công AI theo từng nhiệm vụ, có bước xem xét.', icon: 'network', status: 'Phạm vi đã kiểm thử', className: 'cap-agents' },
  { title: 'Từ ý tưởng đến kế hoạch', subtitle: 'Marketing & Ads', text: 'Hỗ trợ lập kế hoạch và nội dung. Meta Ads, Google Ads, TikTok Ads cần tích hợp và nghiệm thu riêng.', icon: 'megaphone', status: 'Preview', className: 'cap-marketing' },
  { title: 'Hiểu khách hàng hơn', subtitle: 'CRM & Customer Operations', text: 'Định hướng kết nối ngữ cảnh khách hàng với công việc chăm sóc và vận hành.', icon: 'users', status: 'Định hướng phát triển', className: 'cap-crm' },
  { title: 'Công việc có nhịp, có duyệt', subtitle: 'Workflow Automation', text: 'Lập kế hoạch, thực hiện công việc phụ thuộc, xem xét kết quả và theo dõi lịch sử.', icon: 'workflow', status: 'Phạm vi đã kiểm thử', className: 'cap-workflow' },
  { title: 'Biến dữ liệu thành góc nhìn', subtitle: 'Analytics & Reporting', text: 'Hỗ trợ đọc và tổng hợp báo cáo từ nguồn đã chọn, với giới hạn dữ liệu rõ ràng.', icon: 'chart', status: 'Phạm vi đã kiểm thử', className: 'cap-analytics' },
  { title: 'Tri thức có ngữ cảnh', subtitle: 'Knowledge & Memory', text: 'Tổ chức nguồn, hồ sơ và phiên bản theo doanh nghiệp; chủ động chọn ngữ cảnh cho AI.', icon: 'brain', status: 'Đã kiểm thử local', className: 'cap-knowledge' },
] as const;

export const demoScenarios = [
  { title: 'Lên kế hoạch marketing', prompt: 'PAO, giúp tôi lên kế hoạch marketing cho sản phẩm mới.', steps: ['Đọc yêu cầu', 'Phác thảo kế hoạch', 'Chờ bạn xem xét'], answer: 'Tôi đề xuất bắt đầu với một kế hoạch 3 bước:\n\n01  Làm rõ mục tiêu và khách hàng ưu tiên.\n02  Xây thông điệp, ý tưởng nội dung và lịch triển khai.\n03  Chọn chỉ số theo dõi, phân công và duyệt trước khi thực hiện.\n\nTrong PAO thực tế, bạn cần bổ sung brief, nguồn dữ liệu và ngân sách để có kế hoạch phù hợp.', result: 'Bản nháp kế hoạch', icon: 'compass' },
  { title: 'Sắp xếp công việc hôm nay', prompt: 'PAO, giúp tôi sắp xếp công việc hôm nay.', steps: ['Xác định ưu tiên', 'Sắp xếp công việc', 'Chờ bạn xem xét'], answer: 'Đây là một cách sắp xếp ngày làm việc mẫu:\n\n01  Buổi sáng: xem việc ưu tiên và kết quả đang chờ duyệt.\n02  Giữa ngày: tập trung xử lý một nhiệm vụ quan trọng.\n03  Cuối ngày: rà soát kết quả, ghi nhận vướng mắc và chuẩn bị ngày mai.\n\nĐây là kịch bản minh họa; tôi chưa đọc lịch hoặc công việc thật của bạn.', result: 'Lịch công việc mẫu', icon: 'workflow' },
  { title: 'Xem AI phối hợp', prompt: 'PAO, các AI Agent phối hợp với nhau như thế nào?', steps: ['Planner lên khung', 'Content soạn nháp', 'Bạn xem xét kết quả'], answer: 'Ví dụ với một brief truyền thông:\n\nPlanner chia mục tiêu thành đầu việc và thứ tự thực hiện. Content tạo bản nháp từ brief được chọn. Creative đề xuất hướng hình ảnh. PAO tập hợp kết quả để bạn xem xét.\n\nNhững vai trò này đang được minh họa. Thực thi thực tế phụ thuộc năng lực đã cấu hình và quyền được cấp trong PAO.', result: 'Quy trình phối hợp mẫu', icon: 'network' },
  {"title": "Triển khai & giám sát quảng cáo tự động", "prompt": "Triển khai chiến dịch và theo dõi hiệu quả theo mục tiêu, ngân sách đã duyệt.", "steps": ["Chọn tài khoản đã kết nối, xác định mục tiêu và hạn mức", "Phê duyệt nội dung và quyền triển khai theo cấu hình", "Giám sát chỉ số, cảnh báo bất thường và xem xét điều chỉnh"], "result": "Chiến dịch có giám sát, hạn mức và điểm phê duyệt rõ ràng", "answer": "", "icon": "ads"},
  {"title": "Omni-channel đa kênh cùng agent", "prompt": "Kết nối các kênh tương tác để agent và đội ngũ hỗ trợ khách hàng trong cùng một mạch.", "steps": ["Lựa chọn kênh, nguồn thông tin và quyền truy cập phù hợp", "Kết nối hội thoại với bối cảnh khách hàng và công việc liên quan", "Agent phối hợp với người phụ trách để tiếp nối và theo dõi yêu cầu"], "result": "Một mạch chăm sóc đa kênh, có ngữ cảnh và người phụ trách", "answer": "", "icon": "network"},
  {"title": "Phân công sales qua Sales pipeline", "prompt": "Chia khách hàng và công việc cho đội ngũ sales theo từng giai đoạn bán hàng.", "steps": ["Xác định các giai đoạn và tiêu chí chuyển bước trong Sales pipeline", "Gán người phụ trách, việc cần làm và mốc theo dõi cho từng cơ hội", "Theo dõi tiến trình, việc cần tiếp nối và những cơ hội đang chờ xử lý"], "result": "Sales pipeline rõ giai đoạn, rõ trách nhiệm và bước tiếp theo", "answer": "", "icon": "pipeline"},
] as const;

export const graphNodes = [
  { id: 'projects', title: 'Dự án', x: 160, y: 105, detail: 'Mục tiêu và phạm vi giúp đặt từng đầu việc vào đúng bối cảnh.' },
  { id: 'tasks', title: 'Công việc', x: 400, y: 65, detail: 'Đầu việc, thứ tự phụ thuộc và kết quả cần xem xét.' },
  { id: 'agents', title: 'AI Agents', x: 640, y: 105, detail: 'Năng lực được lựa chọn để hỗ trợ từng nhiệm vụ.' },
  { id: 'knowledge', title: 'Tri thức', x: 115, y: 240, detail: 'Tài liệu và nguồn tham chiếu được chọn rõ ràng cho công việc.' },
  { id: 'customers', title: 'Khách hàng', x: 685, y: 240, detail: 'Ngữ cảnh khách hàng là một hướng kết nối được minh họa, không phải dữ liệu CRM thật.' },
  { id: 'marketing', title: 'Marketing', x: 160, y: 375, detail: 'Kế hoạch, thông điệp và nội dung gắn với mục tiêu.' },
  { id: 'operations', title: 'Vận hành', x: 400, y: 415, detail: 'Những bước thực hiện và điểm kiểm soát trong công việc.' },
  { id: 'reports', title: 'Báo cáo', x: 640, y: 375, detail: 'Kết quả tổng hợp và nguồn dữ liệu đi kèm để xem xét.' },
] as const;

export const faqs = [
  ['PAO OS là gì?', 'PAO OS là hệ thống điều hành doanh nghiệp tích hợp AI, hướng tới kết nối trợ lý, tri thức, kế hoạch, công việc và báo cáo trong một không gian có ngữ cảnh doanh nghiệp. Sản phẩm đang được phát triển và nghiệm thu theo từng phạm vi.'],
  ['PAO phù hợp với ai?', 'PAO hướng tới doanh nghiệp vừa và nhỏ, startup, founder, CEO, chủ doanh nghiệp và đội ngũ marketing muốn tổ chức công việc và phối hợp AI rõ ràng hơn.'],
  ['PAO có phải chỉ là một chatbot?', 'Hội thoại là một điểm bắt đầu. Định hướng PAO còn bao gồm tri thức, lập kế hoạch, phân công, duyệt kết quả và theo dõi công việc. Không phải mọi nhóm khả năng đều đã được nghiệm thu đầy đủ.'],
  ['PAO có thể làm việc với nhiều mô hình AI không?', 'PAO có cơ chế lựa chọn kết nối và mô hình theo phạm vi đã hỗ trợ. Khả năng thực tế phụ thuộc cấu hình, nhà cung cấp, quyền và điều kiện sử dụng. Website này không kết nối mô hình AI thật.'],
  ['PAO hỗ trợ marketing như thế nào?', 'PAO hướng tới hỗ trợ brief, kế hoạch, nội dung và đọc báo cáo. Kết nối nền tảng quảng cáo, đăng nội dung hoặc chi tiêu cần quyền và nghiệm thu riêng; các thẻ trên website không xác nhận những hành động đó đang hoạt động.'],
  ['PAO có thay thế nhân viên không?', 'PAO được định hướng làm công cụ hỗ trợ và điều phối. Con người vẫn xác định mục tiêu, cung cấp ngữ cảnh, xem xét chất lượng và quyết định những hành động quan trọng.'],
  ['Dữ liệu doanh nghiệp được bảo vệ thế nào?', 'Thiết kế PAO phân tách ngữ cảnh và quyền theo doanh nghiệp, có kiểm soát truy cập và bước duyệt trong các luồng đã hỗ trợ. Phạm vi dữ liệu gửi tới AI phụ thuộc nguồn và nhà cung cấp được chọn. Không coi nghiệm thu local là chứng nhận bảo mật production.'],
  ['Làm thế nào để tìm hiểu hoặc trải nghiệm PAO?', 'Bạn có thể dùng demo mô phỏng ngay trên trang hoặc liên hệ IVN Media qua cs@pao-os.com và hotline 0925880088 để trao đổi về sản phẩm. Website chưa cung cấp đăng ký tài khoản hoặc cam kết lịch mở bán.'],
] as const;

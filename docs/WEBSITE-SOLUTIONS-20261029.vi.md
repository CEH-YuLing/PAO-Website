# Trang Giải pháp — nội dung ngày 29/10/2026

- Nguồn: `attachments/9c3c8782-51a5-4d99-98c6-0acc04a02033/Văn bản đã dán.txt` và hướng dẫn trực tiếp của chủ website.
- Trang canonical `/giai-phap/`, `/en/giai-phap/`, `/zh/giai-phap/`. Alias `/solutions/` dùng chung nội dung và canonical tương ứng, không tạo landing page trùng lặp.
- Giữ đủ sáu nhóm: quản trị & điều hành; AI Marketing; CRM & bán hàng; tự động hóa vận hành; tích hợp hệ thống; Multi-Agent. Mỗi nhóm có anchor riêng, có thể phát triển thành landing page sau khi có nội dung riêng. Chưa tạo trang SEO rỗng.
- Từ khóa đặt trong đúng ngữ cảnh nội dung: AI quản trị doanh nghiệp; AI Marketing Automation; AI CRM/chăm sóc khách hàng; AI Workflow Automation; tích hợp ERP; Multi-Agent/AI Workforce. Không thêm đoạn nhồi từ khóa hoặc meta keywords.
- Giữ tất cả lưu ý về phiên bản, cấu hình, tích hợp/API và quyền truy cập. Nội dung tập trung vào bài toán và giá trị ứng dụng, không suy diễn chức năng đã sẵn sàng.
- Trang Tính năng chưa có nội dung chi tiết. Khi bổ sung cần phân biệt cụ thể đã sẵn sàng, đang phát triển hoặc theo lộ trình dựa trên dữ kiện được xác nhận. Không thêm các nhãn trạng thái khi chưa có thông tin.
- Trình bày phần vận hành bằng danh sách có thứ tự sáu bước; phần tiếp cận triển khai có bốn bước. CTA liên hệ tới `/contact/`, khám phá tính năng tới `/tinh-nang/`, có tiền tố ngôn ngữ tương ứng.
- SEO title/description, Open Graph, Twitter, hreflang và CollectionPage/ItemList JSON-LD đồng bộ ba ngôn ngữ. Trang Giải pháp đã có nội dung chính thức nên cho phép index và thêm ba canonical vào sitemap (tổng 12 URL). Các trang chưa có nội dung giữ noindex.
- Bố cục HTML/SVG tĩnh, không thêm thư viện hoặc animation. Không sửa footer, trang chủ, form/backend, bảo mật hoặc phụ thuộc.
- Bằng chứng và preimage tại `.runtime/solutions-copy-*`. Kiểm tra nội dung tiếng Việt so với tệp gốc, cấu trúc ba ngôn ngữ, metadata, liên kết và giao diện trước khi sao lưu/đồng bộ nguồn.
- Chỉ cập nhật local, chưa commit/push/deploy.

## Thiết kế lại trang Giải pháp

- Bản đối chiếu mới nhất: `attachments/7d6b026a-91a1-42f3-a4a4-911ff0e2d755/Văn bản đã dán.txt`; nội dung trùng hoàn toàn bản đã nhập. Giữ nguyên cả 106 khối nội dung, không dùng skill biên tập, không thay dữ liệu ba ngôn ngữ.
- Hero dùng minh hoạ PAO kết nối sáu nhóm; điều hướng sáu ô lấy nguyên tiêu đề từng nhóm. Sáu phần có minh hoạ HTML/SVG riêng: quản trị, marketing, CRM, quy trình, tích hợp và Multi-Agent.
- Giữ nguyên văn bản và điều kiện API/quyền/phạm vi; các minh hoạ là sơ đồ trang trí, không chứa số liệu kinh doanh, lời chứng thực hoặc giả làm ảnh chụp sản phẩm thật.
- Phần triển khai bốn bước được cân đối thành tuyến triển khai; CTA và canonical/schema/SEO giữ nguyên.
- CSS mới chỉ áp dụng `.solutions-design-v2`. Không thay Giới thiệu, trang chủ, header/footer, backend, phụ thuộc hoặc cấu hình triển khai.
- Bằng chứng và preimage lưu tại `.runtime/solutions-layout-*`; xác minh nội dung nguyên văn, ba ngôn ngữ và bố cục PC/điện thoại trước khi đồng bộ nguồn có sao lưu. Chưa push.

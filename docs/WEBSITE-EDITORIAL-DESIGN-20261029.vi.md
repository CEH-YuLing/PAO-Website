# Trang Giới thiệu — bản nội dung hiện hành ngày 29/10/2026

## Nguồn và phạm vi

- Thay toàn bộ nội dung bằng tệp chủ website gửi mới nhất: `attachments/635d2682-48c6-426b-bc01-7c3b14030e48/Văn bản đã dán.txt`.
- SEO Title: “Giới thiệu PAO OS | Hệ điều hành AI cho doanh nghiệp”. Meta Description giữ nguyên bản cung cấp; đồng bộ title/description, Open Graph, Twitter và AboutPage JSON-LD ba ngôn ngữ.
- Một H1, phụ đề, năm đoạn dẫn; sáu phần: Vì sao xây dựng PAO OS; từ trợ lý đến điều phối công việc; dành cho doanh nghiệp; triết lý; IVN Network; tầm nhìn. Phần kết có hai CTA.
- Giữ đủ sáu phụ đề H3, năm định hướng SME, các ý in đậm, trạng thái “đã được giới thiệu ra thị trường” và cách diễn đạt đang phát triển/theo định hướng. Không biến mục tiêu thành khả năng đã kiểm chứng.
- Thay nội dung ứng dụng cũ bằng đúng nội dung doanh nghiệp/SME và tầm nhìn mới, không nối thêm các bản trước.
- Bản Anh và Trung giản thể dịch đầy đủ cùng cấu trúc và dữ kiện. Theo chỉ dẫn mới của chủ website: không dùng skill biên tập; đối chiếu nguyên văn tệp gốc. Không tự thêm số liệu, lời chứng thực hoặc nhân sự.

## Thiết kế được giữ lại

- Giữ nền navy/cyan, minh hoạ PAO trung tâm, minh hoạ các bước công việc lấy trực tiếp từ nội dung mới và minh hoạ IVN Network đã làm theo ảnh tham khảo.
- Nội dung câu chuyện mới được trình bày thành ba khối vấn đề; SME thành năm thẻ; triết lý chia ba nhóm nội dung. Không thêm tiêu đề tóm tắt/diễn giải ngoài nội dung gốc. Tên các mục điều hướng lấy nguyên tiêu đề được cung cấp.
- Các phần còn lại giữ nguyên nội dung gốc theo thứ tự. Không thêm thư viện, ảnh, canvas hoặc animation.
- Không sửa trang Giải pháp, trang chủ, header/footer, form/backend, phụ thuộc hoặc cấu hình bảo mật.

## Điều hướng và SEO

- CTA “Khám phá giải pháp PAO OS” tới `/solutions/`; “Liên hệ đội ngũ PAO” tới `/contact/`, có tiền tố ngôn ngữ tương ứng. Đây là hai URL được chủ website chỉ định, dùng chung trang hiện có và canonical.
- Điều hướng trong trang tới sáu nhóm mới; bổ sung `#tam-nhin-pao` và giữ các anchor còn phù hợp.
- `llms.txt` cập nhật mô tả Giới thiệu. Sitemap vẫn có 12 canonical của các trang đã có nội dung; các trang còn chờ nội dung giữ noindex.

## Sao lưu và xác minh

- Preimage và bằng chứng lần này nằm tại `.runtime/about-copy-*` trong checkout xem thử.
- Đối chiếu đầy đủ văn bản tiếng Việt với tệp gốc; kiểm tra bản Anh/Trung, metadata/schema, liên kết, typecheck/lint/build và bố cục desktop/mobile.
- Đồng bộ nguồn sau khi kiểm tra hash và tạo sao lưu mới. Chỉ thực hiện local, chưa commit/push/deploy.

# Bốn trang nội dung PAO — 30/10/2026

## Phạm vi

Triển khai nội dung chủ website cung cấp cho Tính năng, Đội ngũ phát triển, PAO Insights và Download, tiếp nối thiết kế Giới thiệu/Giải pháp. Chỉ website marketing; không đổi backend PAO, kết nối dịch vụ, môi trường, header/footer hoặc trang chủ.

## Nội dung

- VI giữ nguyên tiêu đề SEO, mô tả, H1, phụ đề, đoạn văn, danh sách, bảng, CTA và các giới hạn/trạng thái trong bốn tệp gốc. Không áp dụng skill viết lại. Nguồn và SHA256 lưu ở `.runtime/remaining-pages-20261029T143818Z/sources.json`.
- EN/ZH dịch đủ cùng cấu trúc; mỗi ngôn ngữ có 154 khối Tính năng, 65 khối Đội ngũ, 105 khối Insights, 119 khối Download.
- Đội ngũ giới thiệu IVN Network theo nguồn, không tạo hồ sơ cá nhân.
- Insights trình bày chuyên mục và chủ đề, không dựng bài viết đã xuất bản/author/date hay schema Article.
- Download phân biệt Cloud/VPS đang phát triển với Desktop nằm trên lộ trình, chưa có bộ cài chính thức. CTA liên hệ/cập nhật có đích thật; không tạo nút tải giả, thông số phần cứng hay hệ điều hành chưa xác nhận.

## Thiết kế và SEO

- Minh hoạ SVG tĩnh riêng cho nhóm tính năng, IVN, kiến thức và Cloud/Desktop. Tái dùng logo chính thức, không thêm dependency/animation loop.
- Mục lục dẫn tới phần tương ứng; thẻ nội dung, cột mô tả/danh sách, bảng so sánh cuộn trong khung trên màn hình hẹp. CSS chỉ dưới lớp editorial-document-page và lớp minh hoạ liên quan.
- SEO title/description/OG/Twitter theo từng bản; canonical/hreflang theo đường dẫn đang dùng. Schema AboutPage cho đội ngũ, CollectionPage cho Insights, WebPage cho Tính năng/Download; liên kết đúng nhận diện PAO/IVN hiện có.
- Sitemap tăng từ 12 lên 24 URL cho 8 trang × 3 ngôn ngữ. Giữ trang liên hệ đang chờ nội dung ở noindex, không đưa alias/editor vào sitemap. Bổ sung liên kết llms.txt.

## Kiểm tra và giới hạn

- Typecheck, ESLint và production static build: đạt.
- Đối chiếu nội dung VI độc lập từ dòng văn bản gốc và từ dữ liệu cấu trúc; kiểm tra đủ các khối EN/ZH, SEO/schema, ID/CTA và 1.149 liên kết nội bộ.
- 33 HTML công khai, 24 URL sitemap; GET localhost từng trang 200.
- Kiểm tra trực tiếp responsive trong trình duyệt chưa hoàn thành: công cụ trả về “Local browser use is disabled in Work settings” khi tiếp tục ngày 30/10. Không coi kiểm tra tĩnh là bằng chứng visual/browser. Cần anh xem local hoặc bật lại trình duyệt để kiểm tra hiển thị.
- Chưa commit/push/deploy. Không dùng kết quả build local làm bằng chứng website công khai đã cập nhật.

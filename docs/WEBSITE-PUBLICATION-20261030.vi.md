# Phát hành các trang PAO OS — 30/10/2026

Chủ website cho phép push bản cập nhật hiện tại lên GitHub và yêu cầu thêm nút Trang chủ.

## Bản cập nhật

- Trang chủ giữ nội dung và hiệu ứng hiện có; menu chung thêm Trang chủ / Home / 首页, trỏ về đúng bản ngôn ngữ. Menu desktop có 7 liên kết chính và nút Liên hệ riêng, menu điện thoại có đủ 8 trang.
- Các trang Giới thiệu, Giải pháp, Tính năng, Đội ngũ phát triển, PAO Insights/Blog và Download có nội dung chủ website cung cấp, cùng bản dịch Anh/Trung và minh hoạ SVG tĩnh. Liên hệ vẫn là trang chờ nội dung chính thức.
- Giữ nguyên nội dung tiếng Việt. Không dùng skill biên tập, không dựng hồ sơ thành viên, bài viết đã xuất bản hoặc tệp cài đặt chưa được cung cấp.
- Footer giữ giao diện đã duyệt, cập nhật liên kết tới các trang mới. Canonical/hreflang/SEO/schema/sitemap/llms đồng bộ các trang đã có nội dung. Các tài liệu checkpoint trước đây ghi “chưa push” là trạng thái lịch sử; văn bản này ghi nhận lần phát hành được chủ website cho phép.
- Bản Hostinger là website đã build sẵn, không cần chạy Next.js/SWC trên host. Không đưa công cụ biên tập local, node_modules, .env, bản sao lưu hoặc bằng chứng runtime lên nhánh phát hành.
- Sửa đóng gói để không yêu cầu LICENSE không tồn tại trong nguồn; không tạo hay thay đổi giấy phép. Giữ các thông báo bên thứ ba đang có trong static output.

## Kiểm tra trước khi push

- Typecheck, ESLint, diff check và build:hostinger đạt.
- Nội dung Giới thiệu/Giải pháp và bốn trang còn lại được đối chiếu nguồn; 33 HTML công khai, 24 URL sitemap và 1.209 liên kết nội bộ hợp lệ.
- Nút Trang chủ và trạng thái trang hiện tại được kiểm tra trong HTML của 30 trang có menu chung, ở cả 3 ngôn ngữ.
- GET localhost đủ 33 trang trả về 200; công cụ biên tập bị loại khỏi bản phát hành. Manifest SHA256 và verify-build.mjs kiểm tra gói static trước khi push.
- Giới hạn: chưa kiểm tra hiển thị trực tiếp của bốn trang mới/nút Trang chủ trong trình duyệt vì công cụ trình duyệt local bị tắt trong cài đặt Work. Không coi kiểm tra HTML là nghiệm thu visual/responsive.

Push hai nhánh main (mã nguồn) và hostinger-static (gói build). Push không đồng nghĩa Hostinger đã triển khai xong; kiểm tra trạng thái website công khai riêng sau đó. Bằng chứng phát hành và SHA hai nhánh lưu trong `.runtime/publish-pages-*`, không công khai kèm mã nguồn.

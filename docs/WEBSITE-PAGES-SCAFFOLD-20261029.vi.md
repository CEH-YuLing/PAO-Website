# Khung 7 trang PAO OS

Theo yêu cầu ngày 29/10/2026: tạo trang trước, chủ website gửi nội dung từng trang sau. Chưa push GitHub.

| Trang | Đường dẫn |
| --- | --- |
| Giới thiệu | `/gioi-thieu/` |
| Giải pháp | `/giai-phap/` |
| Tính năng | `/tinh-nang/` |
| Đội ngũ | `/doi-ngu/` |
| Blog | `/blog/` |
| Download | `/download/` |
| Liên hệ | `/lien-he/` |

- Giữ trang chủ và nội dung chủ website đã biên tập. Header dùng sáu liên kết và Liên hệ ở nút bên phải; menu điện thoại hiển thị đủ bảy trang.
- Giữ thiết kế footer, ô nhận email, icon mạng xã hội, thông tin công ty, địa chỉ, DMCA và SSL. Chỉ cập nhật đích liên kết phù hợp với các trang mới.
- Đội ngũ là đội ngũ phát triển PAO, không phải AI Agent. Chưa điền tên, ảnh, chức danh hoặc tiểu sử.
- Blog chưa có bài. Download chưa có tệp phát hành, nút tải hay cam kết hệ điều hành hỗ trợ. Không tạo bài viết, số liệu hoặc hồ sơ thành viên giả.
- Các trang có khung giao diện và thông báo nội dung đang được cập nhật. Nội dung sẽ được thay theo dữ kiện chủ website cung cấp.
- Ba ngôn ngữ dùng cùng đường dẫn gốc; bản English có tiền tố `/en/`, bản tiếng Trung có `/zh/`. Bộ chọn ngôn ngữ giữ đúng trang tương ứng.
- Mỗi trang có title, canonical, alternate languages và Open Graph riêng. Trong giai đoạn chưa có nội dung, các trang mới đặt `noindex, follow` và chưa đưa vào sitemap/llms. Khi hoàn thiện nội dung, cần mở index và cập nhật danh mục URL cho từng trang.
- Trang mới render tĩnh; không thêm thư viện, API, tài khoản công khai hoặc backend. Form nhận tin tiếp tục chỉ là giao diện như đã xác nhận trước đó.

Danh mục trang và nhãn menu: `lib/website-pages.ts`. Khung trang: `components/website-page.tsx`. Header chung: `components/site-header.tsx`. CSS riêng: `app/site-pages.css`. Khi chủ website gửi nội dung, có thể tách bố cục từng trang khỏi khung chung mà giữ nguyên URL và điều hướng.

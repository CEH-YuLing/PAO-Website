# Header bảo mật trên Hostinger

Ngày chuẩn bị: 28/10/2026.

PAO xuất website tĩnh bằng Next.js `output: 'export'`. Cấu hình `headers()` trong
Next.js không áp dụng cho gói này. `public/.htaccess` được xuất vào `out/.htaccess`,
đóng gói thành `dist/.htaccess` và kiểm tra cùng manifest SHA-256.

## Chính sách

- `Strict-Transport-Security: max-age=31536000`: trình duyệt ghi nhớ HTTPS trong
  một năm sau khi nhận header qua HTTPS. Không bật `includeSubDomains` hoặc
  `preload`; không áp chính sách lên các tên miền con chưa được kiểm tra.
- `X-Frame-Options: SAMEORIGIN`: chỉ cho phép nhúng trang trong khung cùng origin.
- `X-Content-Type-Options: nosniff`: trình duyệt phải tôn trọng loại MIME do máy
  chủ công bố. Kiểm tra CSS, JavaScript và ảnh sau khi triển khai.
- `Referrer-Policy: strict-origin-when-cross-origin`: giới hạn thông tin đường dẫn
  được gửi cho website khác.

Khối chỉ đặt header. Không thay luật chuyển hướng HTTP sang HTTPS, routing,
cache hoặc CSP `upgrade-insecure-requests` hiện có của Hostinger.
Không dùng thẻ meta để giả lập các header này.

## Triển khai và kiểm tra

1. Chạy `npm run build:hostinger` trên source, đóng gói release và chạy build
   kiểm tra integrity trên nhánh `hostinger-static` trước khi publish.
2. Sau khi Hostinger triển khai, kiểm tra response thực của `/`, `/en/`, `/zh/`,
   `/privacy/`, một tệp CSS, một tệp JavaScript và một đường dẫn 404.
   Kiểm tra cả status và Content-Type; HTTP phải tiếp tục chuyển sang HTTPS.
3. Không coi việc có `.htaccess` trong Git là bằng chứng header đang hoạt động.
   CDN có thể còn cache hoặc Hostinger có thể tạo `.htaccess` riêng.
4. Nếu header chưa xuất hiện, mở File Manager của đúng website và kiểm tra
   `.htaccess` trong document root đang phục vụ, thường là `public_html` hoặc
   `hbuilds/current/public_html`. Sao lưu tệp trước, rồi **ghép khối Header** vào
   tệp hiện có. Không ghi đè routing do Hostinger quản lý. Xóa cache CDN cho
   website nếu cần, sau đó kiểm tra response lại.

Chỉ báo hoàn thành online khi response HTTPS công khai trả đủ bốn header.

## Nguồn

- https://www.hostinger.com/support/1583307-how-to-create-an-htaccess-file-at-hostinger/
- https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/
- https://httpd.apache.org/docs/2.4/mod/mod_headers.html
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Strict-Transport-Security

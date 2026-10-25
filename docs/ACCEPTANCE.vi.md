# Nghiệm thu bản local website PAO OS — 24/10/2026

Trạng thái: bản giới thiệu local có thể xem và xuất tĩnh. Chưa xuất bản lên pao-os.com, chưa xác minh DNS/HTTPS hoặc hosting.

## Kết quả đã xác minh

- Next.js 16.4.3 static export thành công: /, /privacy/, /robots.txt, /sitemap.xml, 404.
- Lint không lỗi/cảnh báo; TypeScript strict pass sau build cuối.
- Đủ 11 section trong main và footer, tương ứng 12 phần của brief.
- Nhân vật chibi hologram dựa trên ảnh tham chiếu mới nhất; không dùng bản người thật đã tạo trước đó.
- Hai file logo PNG gốc và bản sao giữ nguyên SHA-256; chỉ tạo bản web tối ưu riêng.
- HTTP 200 cho các route/asset kiểm tra; URL không tồn tại trả 404.
- Preview hỗ trợ Brotli/gzip; curl xác nhận Content-Encoding: br.
- npm audit --omit=dev: 0 phát hiện ở thời điểm kiểm tra. Không phải chứng nhận bảo mật toàn hệ thống.

## Lighthouse trên static preview local

| Chế độ | Performance | Accessibility | Best Practices | SEO | LCP | CLS |
|---|---:|---:|---:|---:|---|---|
| Mobile mô phỏng | 91 | 100 | 100 | 100 | 3.2s | 0.002 |
| Desktop | 99 | 100 | 100 | 100 | 0.8s | 0.002 |

Báo cáo cuối: evidence/lighthouse-mobile.html, lighthouse-desktop.html và JSON tương ứng.
Đo bằng Lighthouse/Edge headless trên loopback, có nén tĩnh; không phải đo trên điện thoại thật hoặc domain production. Chưa có cam kết điểm không đổi giữa các máy/lượt đo.
Báo cáo đầu (mobile 71, desktop 96) được giữ ở lighthouse-initial-*.
Tối ưu: logo WebP đúng kích thước, Hero mobile riêng và fetch priority, Motion mini tải khi cần, static Brotli/gzip.

## Trình duyệt và tương tác

Kiểm tra bằng trình duyệt in-app và Playwright API của CUA:
- 8 vai trò agent cập nhật mô tả.
- Showcase 3 tab; bàn phím ArrowRight/Home đã kiểm tra.
- Ba kịch bản chat có kết quả đúng; dừng/chạy lại, thông báo câu ngoài kịch bản.
- Chuỗi HTML nhập vào chỉ hiển thị văn bản, không tạo thẻ ảnh hoặc chạy mã.
- Graph chọn 8 nhóm; zoom/reset/bật kéo và kéo con trỏ thực sự làm đổi tọa độ.
- FAQ mở bằng chuột và Enter; duy trì chỉ một mục mở.
- Menu mobile mở/đóng, Escape trả focus, chọn link đóng menu và đến đúng vị trí.
- Reduced motion: animation Hero = none; demo bỏ gõ từng ký tự.
- 360/390/768/1024/1440/2560px: scrollWidth không vượt clientWidth; không tràn ngang.
- Đường dẫn email/tel đúng thông tin chủ sản phẩm cung cấp; không gửi email hoặc gọi điện.
- Trang privacy mở được; không có ảnh tải lỗi trong lượt rà soát cuối.
- Console quan sát: 0 error/warning. Cửa sổ ghi network quan sát 21 request, 0 request HTTP ra origin ngoài.
- JSON quan sát và kiểm tra lại: evidence/browser-results.json.

Lịch sử được giữ: một quan sát demo ban đầu đọc kết quả trước lúc React cập nhật. Kiểm tra lại bằng chờ đúng nội dung mẫu mới đã qua cả 3 kịch bản; không xóa quan sát ban đầu.
Một build tối ưu đầu tiên lỗi do TypeScript quét cả file .tsx trong thư mục snapshot backups. Đã thêm backups vào exclude, không sửa hoặc bỏ kiểm tra mã ứng dụng; lint/build/typecheck cuối đã qua.

## Giới hạn

- Chưa có screenshot PAO thật được chọn để public: Product Showcase là minh họa có nhãn rõ ràng.
- Chưa kiểm tra trên thiết bị cảm ứng thật. In-app browser không hỗ trợ Input.dispatchTouchEvent; không gọi thao tác con trỏ là nghiệm thu cảm ứng thực tế.
- Screenshot toàn trang dài không được trình duyệt hỗ trợ ở lượt chụp này; đã lưu ảnh Hero và từng section chính.
- Chưa triển khai DNS/HTTPS/public hosting, analytics, form, auth, thanh toán hoặc bất kỳ API PAO/LLM nào.
- Nội dung pháp lý và các claim sản phẩm cần được chủ sản phẩm rà soát lại trước khi public.
- Không thay đổi source/runtime/.env/database hoặc backup của PAO-ACOS.

## Ảnh để xem

- evidence/desktop-hero.jpg
- evidence/mobile-390-hero.jpg
- evidence/viewport-360-hero.jpg
- evidence/viewport-768-hero.jpg
- evidence/viewport-2560-hero.jpg
- evidence/desktop-agents.jpg
- evidence/desktop-showcase.jpg
- evidence/desktop-demo.jpg
- evidence/desktop-graph.jpg
- evidence/mobile-390-demo.jpg
- evidence/mobile-390-graph.jpg

README.vi.md có hướng dẫn chạy, build và đưa nội dung out lên hosting tĩnh.

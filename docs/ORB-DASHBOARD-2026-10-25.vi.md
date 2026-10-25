# Dashboard quả cầu PAO — 25/10/2026

Đã thay giao diện Giới thiệu tại #gioi-thieu bằng dashboard ba cột theo ảnh người dùng và phần reticle SVG được cung cấp. Link tham chiếu bố cục: https://darwinaiassistant.com/. Không nhập JavaScript, tài sản hoặc dịch vụ từ website tham chiếu; Canvas2D, UI và tương tác được viết riêng cho PAO.

- Quả cầu hạt cyan/trắng/tím nhạt xoay 3D, vòng ngắm SVG, tick và marker theo khung tham khảo. Giới hạn480px, canvas cạnh tối đa800, DPR tối đa1.3,24fps;2800 hạt desktop hoặc1200 khi pointer coarse.
- Bảng trái: giờ Việt Nam thực, lượt khám phá tăng từ thao tác của người dùng, agent đang chọn, chế độ mô phỏng, thời gian xem thực. Không hiển thị token, chi phí hoặc model giả như dữ liệu backend thật. Signal chỉ là hiệu ứng hiển thị.
- Ba thẻ Planner / Content / Marketing dùng nội dung Agent hiện có; chọn thẻ hiện mô tả, nút giới thiệu hiển thị mô tả phối hợp. Ba câu hỏi dùng câu trả lời mẫu cố định, không gọi mô hình.
- Năm đồng hồ dùng Intl.DateTimeFormat với IANA Asia/Ho_Chi_Minh, Europe/London, America/New_York, Asia/Tokyo và Australia/Sydney; cập nhật mỗi giây sau khi client tải.
- Quả cầu dừng khi ra khỏi viewport hoặc tab ẩn; cleanup observers/timer/RAF. Có nút tạm dừng và reduced motion hiển thị tĩnh, dừng cả marker/signal.
- Bốn trường gioi-thieu.heading.1–4 cập nhật có chủ đích và vẫn dùng EditableText. So sánh với backup chỉ thấy4 trường này đổi; các nội dung khác giữ nguyên.12 trường benefit cũ giữ trong dữ liệu để bảo toàn nội dung, không còn xuất hiện trên dashboard mới. Không đổi schema editor.

## Kiểm tra

- Lint đạt sau khi sửa nhãn // thành chuỗi JSX hợp lệ; không tắt quy tắc lint.
- Build cuối đạt TypeScript và static export7 trang,38 tài sản nén.
-7 kiểm thử editor đạt,0 lỗi.
- Browser: câu hỏi có phản hồi mẫu đúng; chọn Agent, giới thiệu đội ngũ, tạm dừng/tiếp tục và offscreen pause/resume hoạt động. Reduced motion có state static và animation none.
- Desktop1440: quả cầu480px,5 đồng hồ có giờ thực; không tràn ngang. Mobile390 và320 không tràn ngang; chọn Marketing trên390 hiển thị đúng mô tả. Bản cuối dùng chữ telemetry7px trên mobile. Console không có error/warn trong kiểm tra.
- Viewport và media emulation đã trả về mặc định. Không đo lại Lighthouse hoặc kiểm tra thiết bị vật lý.
- Bằng chứng: evidence/orb-dashboard-browser.json, orb-dashboard-desktop.jpg, orb-dashboard-mobile.jpg.

## Phạm vi và khôi phục

Chỉ thay website độc lập F:/PAO OS Source/pao-website, không PAO-ACOS/backend/DB/.env, không public deployment. Không AI API, voice service, micro hoặc đọc dữ liệu doanh nghiệp. UI ghi rõ mô phỏng. Backup trước thay đổi: backups/20261025T035133Z-before-orb-dashboard, gồm page.tsx, globals.css, site-content.json và current-status.json. Các ZIP cũ chưa chứa dashboard này.
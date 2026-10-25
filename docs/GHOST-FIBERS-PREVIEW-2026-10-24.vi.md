# Ghost Fibers — bản thử local 24/10/2026

Trạng thái: đã hiển thị và kiểm tra tương tác; performance_pending. Đây là bản thử để chủ sản phẩm xem, chưa đạt mục tiêu hiệu năng ≥90.

Nguồn được người dùng chọn: https://reactbits.dev/backgrounds/ghost-fibers
Registry chính thức: https://reactbits.dev/r/GhostFibers-TS-TW.json
Tác giả: David Haz / React Bits. License giữ tại docs/REACT-BITS-LICENSE.md và public/third-party-notices/react-bits.txt.
SHA-256 source upstream đã lấy: B4FC350DC4CC6117F1B061AAC75AC3A869AC528E832003E1F23D46E073B948E8.
Không thêm npm dependency, Three.js hoặc API bên ngoài.

## Phạm vi thay đổi

- Chỉ Hero: các dải sợi Ghost Fibers màu Electric Blue/Cyan, bên dưới chữ/nút/nhân vật.
- Desktop: 2 lớp, 30 sợi, density0.4, DPR0.85, tối đa20fps, bloom3mức.
- Mobile: 1 lớp, 12 sợi, density0.25, DPR0.55, tối đa12fps, bỏ bloom và hạt bụi.
- Trì hoãn tải module trang trí1.4s sau mount; tự dừng khi ngoài viewport hoặc tab ẩn.
- Reduced motion tháo canvas. Nếu WebGL2 không khởi tạo được thì giữ nền tĩnh; nhánh thiếu WebGL chưa được kiểm thử bằng thiết bị riêng.
- Không đổi logo, nhân vật, nội dung, backend hoặc kết nối PAO.

## Kiểm tra

Lint, static build và TypeScript: pass.
In-app browser: WebGL running, canvas desktop1211x643; cấu hình mobile DPR0.55; CTA hoạt động, cuộn ra ngoài thì paused, quay lại thì running, reduced motion tháo canvas, menu mobile hoạt động.
Mobile390: scrollWidth375=clientWidth375, không tràn ngang. Console cuối:0error/warning.
Một thao tác menu timeout trong lúc chạy đồng thời Lighthouse; kiểm tra lại sau khi lượt đo kết thúc đã qua, giữ ghi chú trong JSON.

## Hiệu năng đo thực tế

| Bản | Mobile Performance | Desktop Performance | Accessibility / Best Practices / SEO |
|---|---:|---:|---|
| Trước Ghost Fibers | 91 | 99 | 100 / 100 / 100 |
| Ghost Fibers lần đầu | 61 | 66 | 100 / 100 / 100 |
| Ghost Fibers đã giảm tải | 71 | 69 | 100 / 100 / 100 |

Công cụ Lighthouse/Edge headless hiện dùng --disable-gpu; WebGL có thể phải dùng đường render phần mềm. Đây là giới hạn của phép đo, không dùng nó để bỏ qua việc điểm hiện tại chưa đạt mục tiêu. Chưa đo trên điện thoại thật.
Các lượt UI và đo hiệu năng có thời điểm chạy đồng thời; kết quả không phải benchmark môi trường chuyên dụng không tải nền.
Không coi bản thử này là nghiệm thu hiệu năng hoặc production.

Báo cáo mới: evidence/ghost-fibers-mobile.html và ghost-fibers-desktop.html; JSON cùng tên.
Lượt Ghost Fibers đầu giữ ở evidence/ghost-fibers-v1-*.
Báo cáo lighthouse-mobile/desktop gốc và local-acceptance.json giữ cho phiên bản trước Ghost Fibers, không được gọi là điểm của bản mới.
Aggregate mới: evidence/current-status.json.

## Bản sao và ảnh

Bản trước thay đổi: backups/20261024T131252Z-before-ghost-fibers.
Ảnh mới: evidence/ghost-fibers-desktop.jpg và ghost-fibers-mobile.jpg.
Kiểm tra trình duyệt: evidence/ghost-fibers-browser.json.
Các ZIP delivery tạo trước đó vẫn là bản trước Ghost Fibers, không tự ghi đè để giữ khả năng đối chiếu.

## Nội dung website

Website hiện chưa có trình biên tập nội dung trực tiếp. Người dùng mới hỏi khả năng; chưa yêu cầu triển khai CMS hoặc quy trình lưu/xuất bản. Không thêm backend, tài khoản, localStorage editor hoặc editor công khai trong lượt này.

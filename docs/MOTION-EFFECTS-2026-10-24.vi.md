# Hiệu ứng website PAO — 24/10/2026

Phạm vi: website độc lập F:/PAO OS Source/pao-website, xem cục bộ tại http://127.0.0.1:3177/. Không thay đổi PAO-ACOS hoặc các bản backup PAO. Không xuất bản công khai.

## Hiệu ứng đã cài

- Glow Cursor: mã TypeScript chính thức React Bits, màu cyan/xanh, giữ con trỏ hệ thống và không chặn click. Chỉ tải sau chuyển động chuột/bút trên thiết bị có hover và pointer fine. Tắt ở editor, iframe xem trước, thiết bị cảm ứng và reduced motion. Giới hạn 30fps, DPR0.75, kích thước render tối đa1440, dừng sau khi trail mờ hoặc tab ẩn; xử lý lỗi WebGL và giải phóng tài nguyên.
- Logo Loop: đặt ngay sau Hero, trước phần Giới thiệu. Giữ đúng10 logo, đường dẫn và màu hover của demo chính thức: React, Next.js, TypeScript, Tailwind CSS, Vercel, GitHub, Docker, Prisma, Supabase, Stripe. Dùng react-icons@5.7.0. Logo cao48px, gap56px, speed100, dừng khi hover/focus; hỗ trợ kéo và nút tạm dừng. Đây là dải logo công nghệ mẫu, không phải công bố quan hệ đối tác.
- Nền sao phía dưới: người dùng xác nhận chưa có Pro và chọn hiệu ứng miễn phí tương tự. components/lower-starfield.tsx là Canvas2D tự viết, mô phỏng chiều sâu, nhấp nháy và vệt sao nhẹ; không phải Glitter Warp Pro, không sử dụng mã/shader/tài sản Pro. Nền bắt đầu đúng dưới mép Logo Loop khi cuộn và tiếp tục đến footer. Không chặn thao tác hoặc che nội dung.250 sao/24fps desktop,110 sao/16fps cảm ứng hoặc iframe preview; DPR tối đa0.85/0.7, cạnh render tối đa1280. Reduced motion hiển thị tĩnh; dừng khi tab ẩn hoặc chưa đến vùng nền.

## Nguồn và giấy phép

- https://reactbits.dev/animations/glow-cursor
- https://reactbits.dev/r/GlowCursor-TS-TW.json
- GlowCursor upstream SHA256: 936DFB2A56611D0F94DC9B3AD199D24DBAF72AB481A6F0ACDFE5FEC20CF2AB4D
- https://reactbits.dev/animations/logo-loop
- https://reactbits.dev/r/LogoLoop-TS-TW.json
- https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/demo/Animations/LogoLoopDemo.jsx
- LogoLoop upstream SHA256: 331C2740119C0F70FCD726A9A1ADE53BF3E8BD3E07AA717AF8EEC0C270040C17
- React Bits: MIT + Commons Clause, giữ thông báo tại docs/REACT-BITS-LICENSE.md và public/third-party-notices/react-bits.txt. React Icons: public/third-party-notices/react-icons.txt; các icon Simple Icons thuộc bộ có giấy phép CC0.
- Link tham chiếu hình ảnh ban đầu: https://pro.reactbits.dev/docs/components/glitter-warp. Không cài gói Pro hoặc nhập license key.

Điều chỉnh vendor: chuyển cập nhật ref cấu hình sang effect, đổi tên helper shader tránh nhận nhầm React Hook, giới hạn render/FPS và thêm cleanup/visibility/idle. Giữ nguồn gốc và thông báo giấy phép.

## Xác minh thực tế

- npm.cmd run lint: đạt, không warning.
- npm.cmd run build: đạt, TypeScript và static export7 trang; tạo38 tài sản văn bản nén.
- Trình duyệt: Glow Cursor xuất hiện và tự dừng khi idle; click CTA, FAQ vẫn hoạt động. Logo chạy, tạm dừng/tiếp tục được; đúng10 mục và URL. Reduced motion dừng logo và tắt cursor.
- Editor/iframe: cursor không xuất hiện; chọn nội dung trong preview vẫn hoạt động, không tạo thay đổi nội dung.
- Nền sao: chạy dưới mép logo, clip108px khớp mép logo108px tại vị trí kiểm tra; pointer-events:none; đến footer clip0px. Reduced motion có state static.
- Giả lập cảm ứng390px:110 sao, state running, không cursor, không tràn ngang.320px không tràn ngang. Trả lại viewport mặc định và reset emulation sau kiểm tra.
- Console không có warning/error mới trong khoảng kiểm tra. Biên bản: evidence/motion-effects-browser.json. Ảnh: starfield-desktop.jpg, starfield-footer.jpg, starfield-mobile.jpg và glow-cursor-active.jpg.
- Nội dung chủ website được giữ nguyên: lib/site-content.json SHA256 7D59F1FE50BEF223FF1DC0F5C7A62F9D9F8334BF4F21F21D140DA4B30934537A.

Giới hạn: chưa đo lại Lighthouse cho build này, chưa kiểm tra điện thoại vật lý hoặc hosting công khai. Điểm71/69 của bản Ghost Fibers cũ không áp dụng cho các thay đổi mới. Kiểm thử editor7 bài trước đó là bằng chứng lịch sử, không chạy lại trong lượt hiệu ứng này.

## Sao lưu trước thay đổi

- backups/20261024T151417Z-before-glow-cursor
- backups/20261024T152215Z-before-logo-loop
- backups/20261024T154237Z-before-lower-starfield

Các ZIP bàn giao cũ vẫn giữ nguyên, chưa chứa các hiệu ứng mới. Build hiện tại nằm ở out/.
# PAO OS — Official Website

Website giới thiệu độc lập của PAO OS, phát triển cho IVN Media. Giao diện tiếng Việt, nhận diện Navy/Cyan, nhân vật chibi hologram dựa trên ảnh mẫu do chủ sản phẩm cung cấp.

## Phạm vi

- Đủ 12 section của brief, desktop/mobile, menu responsive.
- Demo chat theo 3 kịch bản có sẵn; dừng/chạy lại; không gọi AI.
- Sơ đồ AI Agents có chọn vai trò, graph tri thức có chọn/zoom/pan/reset.
- Product Showcase hiện là minh họa frontend có nhãn, chưa có screenshot sản phẩm được phép công khai.
- FAQ, email/điện thoại thật do chủ sản phẩm cung cấp, trang mô tả website và dữ liệu.
- Static export, SEO metadata, Open Graph, sitemap, robots, favicon; font được phục vụ local.

Không sử dụng backend PAO, database, auth, LLM API, thanh toán hoặc dữ liệu doanh nghiệp thật.

## Yêu cầu và lệnh

Node.js 24 LTS và npm. Phiên bản đã dùng: Node 24.13.0 / npm 11.6.2.

```powershell
Set-Location -LiteralPath 'F:\PAO OS Source\pao-website'
npm.cmd ci
npm.cmd run dev
```

Dev: http://127.0.0.1:3177. Để xem bản export, dừng dev trước rồi:

```powershell
npm.cmd run lint
npm.cmd run build
npm.cmd run typecheck
npm.cmd run preview
```

Preview chỉ bind 127.0.0.1; không public hoặc sửa DNS. Không dùng mở trực tiếp index.html bằng file://.

## Xuất bản lên hosting tĩnh

1. Chạy npm ci và npm run build.
2. Upload toàn bộ NỘI DUNG thư mục out/ vào document root của hosting; không upload node_modules, source hoặc evidence.
3. Cấu hình phục vụ index.html cho thư mục, 404.html cho URL không tồn tại.
4. Kích hoạt HTTPS và kiểm tra domain/canonical trước khi công bố. Chưa thực hiện bước này.
5. Bổ sung các response header phù hợp tại hosting (X-Content-Type-Options, Referrer-Policy, CSP sau khi xác minh các inline payload Next.js). Không bật API PAO.
6. Kiểm tra lại homepage, /privacy/, /robots.txt, /sitemap.xml và link ảnh OG từ domain thực.

Tên miền cấu hình: https://pao-os.com theo thông tin chủ sản phẩm cung cấp; chưa xác minh DNS/HTTPS hoặc quyền hosting.

## Chỉnh nội dung

- lib/content.ts: tính năng, vai trò agent, demo, graph, FAQ.
- app/page.tsx: cấu trúc 12 phần, liên hệ.
- app/globals.css: design system, responsive, animation và reduced motion.
- components/experience.tsx: tương tác trình duyệt.
- app/layout.tsx: metadata, font và icon.
- public/brand/: bản sao nguyên vẹn logo, favicon/touch icon fit toàn bộ logo.
- public/images/: nhân vật và ảnh Open Graph.

Không thay screenshot thực bằng ảnh giao diện tự tạo rồi mô tả là sản phẩm thật. Các nhãn local/Preview cần đối chiếu roadmap lại trước khi xuất bản.

## Kiểm tra

Kết quả thực tế được ghi tại docs/ACCEPTANCE.vi.md và evidence/. Lighthouse là kết quả trên preview local với cấu hình công cụ, không phải kết quả production hoặc đo trên điện thoại thật.

```powershell
npm.cmd run audit:runtime
npm.cmd run audit:lighthouse
```

Lighthouse script dùng Edge trên Windows; thay CHROME_PATH nếu cần. Kiểm thử tương tác thực hiện qua trình duyệt và Playwright API của CUA. Checklist tái kiểm tra: docs/BROWSER-CHECKLIST.vi.md.

## Các đầu vào còn cần

- Screenshot PAO đã chọn, làm sạch dữ liệu nhạy cảm và được phép công khai.
- Nội dung liên hệ/địa chỉ cần chủ sản phẩm xác nhận lần cuối trước khi public.
- Hosting/DNS/HTTPS khi được yêu cầu xuất bản.
- Nội dung pháp lý thương mại và chính sách sản phẩm nếu bổ sung thu thập dữ liệu, đăng ký hoặc bán hàng.

Đây là project độc lập. Không chỉnh source, runtime, .env, database hoặc các bản backup của PAO-ACOS.

Bản build hiện tạo sẵn .br/.gz cho các tài sản văn bản. Hosting cần hỗ trợ phục vụ file nén hoặc bật nén tương đương. Preview local đã bật cơ chế này.

Cập nhật24/10 — đã thử Ghost Fibers ở Hero. Xem docs/GHOST-FIBERS-PREVIEW-2026-10-24.vi.md và evidence/current-status.json. Điểm91/99 của bản trước không áp dụng cho background mới; bản thử hiện chưa đạt mục tiêu hiệu năng. Các ZIP delivery cũ được giữ nguyên phiên bản. Chế độ editor đã được bổ sung như mô tả dưới đây.

## Chế độ biên tập riêng (24/10/2026)

Mở http://127.0.0.1:3177/editor/ khi công cụ cục bộ đang chạy bằng `npm.cmd run editor`. Có 257 mục nội dung, đổi logo/ảnh, chỉnh Ghost Fibers, xem trước máy tính/tablet/điện thoại, bản nháp, hoàn tác, nhập/xuất JSON và Áp dụng có sao lưu + build. Hướng dẫn: [docs/EDITOR-GUIDE.vi.md](docs/EDITOR-GUIDE.vi.md).

Áp dụng cập nhật mã nguồn và bản static trên máy này. Không tự xuất bản lên domain. Nội dung đã được chủ website sửa sau khi mở editor phải được giữ nguyên; các ZIP bàn giao cũ chưa chứa chế độ này và các thay đổi header mới.

Header mới: logo chính 115px desktop / 98px mobile, chữ viết hoa và hover cyan/gạch sáng. Build đã qua; kiểm tra ở 1440px, 390px và 320px không thấy tràn ngang. Bằng chứng: `evidence/header-browser.json`, `evidence/header-detail.jpg`. Nội dung JSON chủ website đã lưu được giữ nguyên khi thay CSS.


## Hiệu ứng mới (24/10/2026)

Đã thêm React Bits Glow Cursor, Logo Loop với đúng10 logo mẫu và nền sao Canvas miễn phí từ dưới thanh logo đến footer. Nền sao tự viết theo lựa chọn của chủ website, không dùng Glitter Warp Pro. Có reduced motion, giảm tải cảm ứng và tạm dừng logo. Xem docs/MOTION-EFFECTS-2026-10-24.vi.md, evidence/motion-effects-browser.json và evidence/starfield-desktop.jpg. Lint/build và kiểm tra trình duyệt đã đạt; chưa đo lại Lighthouse hoặc kiểm tra điện thoại vật lý. Các ZIP cũ chưa bao gồm cập nhật này.

Cập nhật25/10/2026: đã thay dải10 logo mẫu bằng dòng chữ chạy12 cụm về năng lực PAO, viết hoa, giãn chữ và chạy sang trái. Nút tạm dừng/tiếp tục và reduced motion được giữ qua engine loop hiện có. Build/lint đạt; trình duyệt xác minh chuyển động, điều khiển, không tràn ngang ở732px và mép nền sao tiếp tục khớp đáy thanh chữ. Bằng chứng: evidence/text-marquee-browser.json và evidence/text-marquee.jpg. Chưa đo lại hiệu năng. Nội dung lib/site-content.json giữ nguyên. Bản cũ: backups/20261025T033358Z-before-text-marquee.

Thu gọn25/10/2026: header60px + border1px, thanh chữ54px + border1px. Mobile tương ứng56px/48px + border; logo98px desktop/88px mobile; chữ trượt13–16px. Build đạt; kiểm tra1440/1050/390/320 không tràn ngang, menu đóng/mở và thanh chữ tiếp tục hoạt động. Bằng chứng evidence/compact-bars-browser.json và compact-bars-desktop.jpg. CSS cũ giữ tại backups/20261025T034124Z-before-compact-bars. Giữ nguyên12 cụm chữ và nội dung JSON; chưa đo lại hiệu năng.

Dashboard Giới thiệu25/10/2026: quả cầu hạt Canvas2D và vòng ngắm SVG theo ảnh/khung HTML tham khảo của chủ website; bảng thông tin, Planner/Content/Marketing, câu hỏi mô phỏng và5 đồng hồ. Chỉ4 trường tiêu đề Giới thiệu thay đổi; dữ liệu khác giữ nguyên. Build/lint/7 kiểm thử editor đạt; desktop/mobile320/390, pause/resume và reduced motion đã kiểm tra. Chi tiết docs/ORB-DASHBOARD-2026-10-25.vi.md; ảnh evidence/orb-dashboard-desktop.jpg. Không voice/AI/backend hoặc public deployment; hiệu năng hiện chưa đo lại.

Sơ đồ chi tiết25/10/2026: phần Đội ngũ có10 cụm/32 nhánh SVG theo ảnh PAO STRUCTURE, vòng sáng, đường nối, chọn cụm, mô tả, zoom/reset và cuộn nội bộ trên mobile. JSON và nội dung bên trái giữ nguyên. Build/lint và browser desktop/mobile320/390 đạt. Chi tiết docs/DETAILED-STRUCTURE-2026-10-25.vi.md; ảnh evidence/detailed-structure-desktop.jpg. Chỉ là sơ đồ minh họa, không bật API/provider.

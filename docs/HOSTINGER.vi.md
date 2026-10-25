# Kết nối PAO Website với Hostinger Business

Đối chiếu tài liệu Hostinger ngày 25/10/2026. Repository: https://github.com/CEH-YuLing/PAO-Website (private). Website này dùng Next.js static export; kết quả build là HTML/CSS/JS trong `out/`, không cần backend PAO hoặc cơ sở dữ liệu.

## Cập nhật: Hostinger báo lỗi GLIBC / SWC

Với môi trường Hostinger không tải được SWC của Next.js 16.4.3, dùng nhánh **hostinger-static** đã biên dịch sẵn. Cấu hình ưu tiên:

| Trường | Giá trị |
| --- | --- |
| Branch | `hostinger-static` |
| Framework | `Other` / frontend tĩnh |
| Root directory | `.` |
| Node.js | `24.x` |
| Build script | `build` (`npm run build`) |
| Output directory | `dist` |
| Environment / entry / start | Không cần |

Nhánh này không có Next.js, SWC hoặc thư viện npm phụ thuộc. Lệnh build chỉ kiểm tra toàn vẹn SHA-256 của các tệp đã biên dịch. Chọn Settings and redeploy, đổi nhánh/framework/build/output như bảng rồi Redeploy; nếu hPanel có tùy chọn xóa build cache thì dùng nó cho lần chuyển nhánh này. Không dùng `next start`.

Mã nguồn vẫn ở nhánh `main`. Khi cập nhật: build `main` bằng `npm run build:hostinger`, chạy `node scripts/package-hostinger-static.mjs <thư-mục-trống>` rồi commit nội dung gói sinh ra lên `hostinger-static`. Chỉ push `main` sẽ chưa cập nhật nhánh đã biên dịch; phải xuất và đẩy bản static mới.

Không xóa lockfile để xử lý lỗi glibc. Repository không chứa `node_modules` hoặc tệp config tạm; lỗi native thư viện phụ thuộc môi trường hệ điều hành build. Tham khảo xác nhận của Hostinger: https://www.hostinger.com/support/how-to-fix-next-js-16-turbopack-build-errors-on-hostinger/

Phần dưới là cách build trực tiếp từ `main`, chỉ áp dụng khi môi trường Hostinger hỗ trợ toolchain này.

## Thao tác trong hPanel

1. Vào **Trang web → Tạo trang web → Web App / Ứng dụng web Node.js** (hoặc nút **Bắt đầu** trên thẻ Web App).
2. Chọn **Import Git Repository / Nhập kho Git → GitHub**.
3. Đăng nhập tài khoản `CEH-YuLing`; cấp quyền cho Hostinger với riêng repository `PAO-Website`. Repository private vẫn dùng được qua kết nối tài khoản; không cần chuyển public hoặc gửi token trong chat.
4. Chọn repository `CEH-YuLing/PAO-Website`, nhánh **main**.
5. Kiểm tra các cài đặt dưới đây trước khi bấm Deploy. Đây là cấu hình đề xuất cho bản xuất tĩnh của dự án; cần kiểm tra màn hình và log thực tế của hPanel.

| Trường | Giá trị |
| --- | --- |
| Loại ứng dụng | Frontend / static frontend |
| Framework | Next.js (frontend); nếu hPanel nhận thành server Next.js, chọn Other ở chế độ frontend để cấu hình xuất tĩnh |
| Nhánh | `main` |
| Root directory / thư mục mã nguồn | Gốc repository (`.` hoặc để trống) |
| Node.js | `24.x` |
| Package manager | `npm` |
| Install command (nếu có) | `npm ci` |
| Build script | `build:hostinger` → `npm run build:hostinger` |
| Output directory | `out` |
| Entry file / Start command | Không cần cho static frontend |
| Environment variables | Không cần cho website hiện tại |

Hostinger dùng danh sách script từ `package.json` ở mục Build command. Chọn **build:hostinger**, không dùng `dev`, `preview` hoặc `editor`. Không chọn `.next` cho bản static export này. Nếu hPanel bắt buộc entry file/start command hoặc tự đặt `next start`, đang chọn loại server thay vì frontend; kiểm tra lại loại ứng dụng trước khi Deploy.

6. Bấm **Deploy**, đợi build hoàn tất và kiểm tra URL tạm do Hostinger cung cấp.
7. Kiểm tra `/`, `/en/`, `/zh/`, `/privacy/`, `/en/privacy/`, `/zh/privacy/`, `/robots.txt`, `/sitemap.xml`, logo, ảnh, menu mobile, chuyển ngôn ngữ và liên hệ. URL không tồn tại phải trả 404. `/editor/` không được xuất bản.
8. Sau khi bản tạm hoạt động đúng, kết nối tên miền `pao-os.com`, xác nhận DNS và HTTPS trong hPanel. Các thẻ canonical/sitemap hiện đã dùng tên miền này. Bước tên miền và xuất bản chưa được thực hiện khi chuẩn bị repository.

## Cập nhật về sau

Sửa trên mã nguồn → kiểm tra lint/build → commit và push vào `main` → Hostinger build lại nếu đã bật auto-deployment. Có thể tắt auto-deployment và bấm Redeploy thủ công trong hPanel. Bản nháp trong công cụ editor cục bộ chưa phải cập nhật GitHub: phải **Áp dụng** rồi đưa thay đổi nguồn lên GitHub.

`npm run build` vẫn phục vụ kiểm tra/editor trên máy cá nhân. `npm run build:hostinger` thêm bước loại route editor khỏi `out/`. Không đưa `out`, `node_modules`, `.next`, bản sao lưu, bản nháp và `.env` lên GitHub. Hostinger sẽ cài thư viện và tự build mã nguồn.

## Cách khác nếu dùng hosting PHP/HTML

Mục **Advanced → Git** dành cho PHP/HTML không phải bộ build Next.js. Không chọn nhánh mã nguồn này vào `public_html` rồi kỳ vọng website chạy ngay. Nếu dùng cách này, phải triển khai nội dung đã build từ `out/` qua một quy trình riêng. Với gói Business hiện có, ưu tiên Web App GitHub như trên.

## Nguồn chính thức

- https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/
- https://www.hostinger.com/tutorials/how-to-deploy-from-github/
- https://www.hostinger.com/support/1583302-how-to-deploy-a-git-repository-in-hostinger/
- https://nextjs.org/docs/app/guides/static-exports

Build local không xác nhận build trên Hostinger. Sau khi kết nối, xem log và kiểm tra URL thực tế trước khi coi triển khai hoàn tất.

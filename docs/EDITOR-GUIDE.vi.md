# Biên tập website PAO trên máy này

Mở **http://127.0.0.1:3177/editor/**. Đây là công cụ soạn nội dung cho dự án `F:\PAO OS Source\pao-website`, độc lập với ứng dụng PAO.

## Cách sử dụng

1. Chọn khu vực ở bảng bên trái hoặc bấm vào chữ, logo, ảnh trong khung xem trước.
2. Sửa nội dung ở ô bên dưới danh sách. Khung bên cạnh cập nhật ngay. Dùng tìm kiếm để tìm một đoạn chữ ở bất kỳ khu vực nào.
3. Chọn **Máy tính / Máy tính bảng / Điện thoại** để kiểm tra bố cục. Chuyển **Chọn để sửa** sang **Tương tác thử** để dùng menu, tab, FAQ và demo trong khung.
4. **Lưu nháp** (Ctrl/Cmd+S) lưu trong trình duyệt hiện tại. Bản nháp cũng tự lưu sau khi bạn ngừng nhập khoảng nửa giây. Chưa cập nhật trang chính ở bước này.
5. Bấm **Áp dụng**, xem danh sách thay đổi rồi chọn **Áp dụng ngay**. Công cụ sao lưu bản cũ, lưu nội dung vào mã nguồn, chạy build và cập nhật website trên máy này. Đợi thông báo hoàn tất trước khi đóng công cụ.
6. Bấm **Mở website** để kiểm tra bản đã áp dụng. Việc đưa bản này lên `pao-os.com` là thao tác xuất bản riêng.

## Những phần có thể sửa

- 257 mục gồm chữ giới thiệu, tiêu đề, mô tả, menu, thẻ khả năng, vai trò agent, các kịch bản demo, sơ đồ tri thức, quy trình, FAQ, liên hệ và chân trang.
- Logo chính, logo phụ, ảnh nhân vật và mô tả ảnh. Dùng PNG/JPG/WebP tối đa 2 MB mỗi ảnh. PNG/WebP trong suốt phù hợp với logo, nhân vật. Đường dẫn ảnh ngoài cần bắt đầu bằng `https://`; ảnh ngoài được trình duyệt tải từ nơi bạn chỉ định.
- Nhãn nút và đích đến của các nút hero, email và hotline. Email/hotline hiển thị và liên kết là hai mục riêng; kiểm tra cả hai khi đổi thông tin.
- Ghost Fibers: bật/tắt, tốc độ, độ đậm và ba màu. Chế độ giảm chuyển động của thiết bị vẫn được tôn trọng. Thay đổi này không xác nhận vấn đề hiệu năng Ghost Fibers đã được xử lý.
- Tiêu đề trình duyệt và mô tả tìm kiếm. Giá trị metadata được tạo lại khi Áp dụng; khung xem trước chủ yếu phản ánh nội dung trang.

Đây là công cụ sửa nội dung theo bố cục có sẵn. Thêm/xóa khu vực, đổi vị trí bố cục, thay thành phần tương tác hoặc mã shader vẫn cần sửa mã nguồn. Nhãn cố định của phần minh họa giao diện và hướng dẫn thao tác không phải tất cả đều nằm trong danh sách biên tập.

## Bản nháp, tệp nội dung và sao lưu

- **Hoàn tác / Làm lại** lưu tối đa 60 bước trong phiên biên tập hiện tại. Mũi tên đặt lại bên cạnh ô sửa chỉ đưa mục đang chọn về giá trị đã lưu.
- **Bỏ các thay đổi trong bản nháp** có hộp xác nhận; trở về bản đã áp dụng gần nhất và vẫn có thể hoàn tác trong phiên.
- **Xuất JSON** tải một tệp chứa nội dung và ảnh mới chưa áp dụng. **Nhập JSON** kiểm tra cấu trúc, sau đó hỏi trước khi thay bản nháp. Nhập tệp chưa tự áp dụng vào website.
- Bản nháp nằm trong localStorage của trình duyệt, không phải sao lưu ngoài máy. Nếu trình duyệt hết chỗ hoặc chặn lưu, công cụ sẽ báo và bạn có thể xuất JSON.
- Khi bản website đã đổi ở phiên khác, bản nháp cũ không tự ghi đè. Có thể xuất bản nháp cũ để giữ lại, hoặc mở để xem xét trước khi áp dụng. Khi bấm Áp dụng, công cụ kiểm tra phiên bản một lần nữa.
- Mỗi lần áp dụng tạo `backups/<UTC>-editor-<id>/`, gồm nội dung trước/sau, bản static trước đó, log build và kết quả. Ảnh đã áp dụng nằm trong `public/uploads/` theo mã hash; ảnh gốc trong thư mục brand/images được giữ lại.
- Nếu build thất bại, công cụ khôi phục nội dung và bản static trước đó; bản nháp và bằng chứng lỗi được giữ lại. Nếu tiến trình bị cưỡng bức tắt hoặc máy mất điện giữa chừng, kiểm tra thư mục sao lưu trước khi chạy lại. Không sửa/xóa bản sao lưu để che lỗi.

## Mở công cụ sau khi khởi động lại máy

Trong PowerShell:

```powershell
Set-Location -LiteralPath 'F:\PAO OS Source\pao-website'
npm.cmd run editor
```

Sau đó mở **http://127.0.0.1:3177/editor/**. Chỉ chạy một server trên cổng 3177. Nếu đang chạy `npm run preview` hoặc `npm run dev`, dừng server đó trước khi dùng `npm run editor`.

`npm run preview` chỉ phục vụ bản static và không bật lưu nội dung. `npm run editor` bật thêm công cụ ghi cục bộ: chỉ lắng nghe `127.0.0.1`, kiểm tra Host/Origin, mã phiên và cấu trúc nội dung; không cung cấp dịch vụ quản trị từ xa. Bản `out/` vẫn là website static; chép `out/` lên hosting không mang theo công cụ ghi này. Trang `/editor/` được gắn noindex và chặn trong robots; đây không phải cơ chế đăng nhập quản trị công khai.

## Kiểm tra ngày 24/10/2026

- Lint, TypeScript và static build đã qua. Bảy kiểm thử Node đã qua: định dạng, đường dẫn/liên kết, chữ ký ảnh, Host/Origin/phiên, lưu + sao lưu, khôi phục khi build lỗi, và chặn hai lượt ghi đồng thời.
- Trình duyệt đã kiểm tra sửa chữ trực tiếp, chọn chữ trong trang, hoàn tác/làm lại, lưu nháp và mở lại, nhập ảnh WebP, chặn liên kết javascript, chuyển khung điện thoại, menu/Escape, tắt/khôi phục Ghost Fibers, hộp xem lại/hủy và xuất JSON. Bảng biên tập tại 390px không tràn ngang.
- Một lần Áp dụng thực tế từ phiên khác hoàn tất: `backups/2026-10-24T14-49-59-164Z-editor-011b671a2dd6ec90/`. Hash nội dung sau lưu và mã nguồn khớp `7d59f1fe50bef223ff1dc0f5c7a62f9d9f8334bf4f21f21d140da4b30934537a`; log xác nhận Next build + nén static hoàn tất. Nội dung chủ website vừa sửa được giữ nguyên; không khôi phục bản test cũ đè lên nội dung đó.
- JSON import đã kiểm tra bộ xác thực bằng Node; chưa thao tác hộp chọn tệp JSON trong trình duyệt. Có một lỗi MutationObserver không kèm vị trí nguồn lúc kết nối tab kiểm tra; không xuất hiện lại sau tải lại, và mã ứng dụng không dùng MutationObserver. Không coi đây là bằng chứng console tuyệt đối không lỗi.
- Chưa kiểm tra thiết bị điện thoại vật lý, chưa triển khai public, chưa đo lại Lighthouse cho bản editor. Các điểm Ghost Fibers trước đây là phép đo của bản cũ, không phải điểm của bản hiện tại.

Nội dung do chủ website biên tập là nội dung giới thiệu; các con số/khẳng định mới không tự trở thành bằng chứng nghiệm thu phần mềm PAO.

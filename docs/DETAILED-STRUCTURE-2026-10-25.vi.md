# Sơ đồ cấu trúc chi tiết PAO — 25/10/2026

Thay phần sơ đồ đội ngũ ở #doi-ngu theo ảnh PAO STRUCTURE người dùng cung cấp. SVG được viết riêng, không dùng ảnh raster thay cho sơ đồ, không gọi dịch vụ ngoài. Trung tâm giữ logo PAO và người dùng;10 cụm vòng sáng: Dashboard, Planner, Content, Design, Editor, Publishing, Ads, CRM, Finance và Integrations.32 nhánh con, đường nối tâm/giữa cụm, điểm sáng, vòng quỹ đạo, thước chia và các lớp vòng trung tâm.

Giữ nguyên nội dung bên trái và toàn bộ lib/site-content.json. Các mô tả Planner/Content/Design/Ads/CRM/Finance tiếp tục dùng EditableText của Agent hiện có. Dashboard/Editor/Publishing/Integrations có mô tả minh họa riêng; không coi sơ đồ là bằng chứng tích hợp hoặc quyền gọi công cụ. Không thay quả cầu ở phần Giới thiệu.

Cụm SVG có role button, tabIndex, aria-label/pressed và Enter/Space. Chọn cụm cập nhật mô tả bên dưới. Zoom100–175%, reset và cuộn nội bộ; mobile giữ vector tối thiểu660px để đọc chi tiết và có10 nút chọn nhanh. Vùng cuộn được giới hạn trong widget, không tràn trang. Không thêm animation liên tục; reduced motion tắt transition.

Kiểm tra: lint đạt; build TypeScript/static export7 trang đạt. Browser1440 có10 nút/32 nhánh, canvas787px bằng vùng hiển thị, không tràn ngang. Đã thao tác từng nút; xác minh nội dung Integrations, chọn Planner, Content bằng Enter, phóng to125% và reset.390px chọn Finance bằng nút nhanh;390/320 không tràn trang và có vùng pan nội bộ. Viewport trả về mặc định. Biên bản và ảnh trong evidence/detailed-structure-browser.json, detailed-structure-desktop.jpg, detailed-structure-mobile.jpg. Chưa đo lại Lighthouse hay thiết bị vật lý. Không chạy lại7 test editor vì không đổi dữ liệu/schema/writer.

Backup: backups/20261025T042353Z-before-detailed-structure. Nội dung JSON SHA256 trước và sau:1383D93A8C5409630E52356D8C0B2B2983BD6BBF2EF055C74A982CFC3DF47881. Chỉ sửa website độc lập F:/PAO OS Source/pao-website; không sửa PAO-ACOS/backend/DB/.env, không deploy công khai hoặc bật provider.
## Sửa mobile bị cắt25/10/2026

Bỏ minWidth660px ở structure-canvas. Mặc định100% tự vừa vùng hiển thị, các nhánh nằm trọn trong SVG. Chỉ có cuộn ngang khi người dùng zoom lớn hơn100%; reset trả về vừa màn hình. Kiểm tra320/390/440: không tràn trang, không tràn nội bộ, tất cả32 nhánh nằm trong vùng hiển thị. Zoom125% vẫn pan được. Build cuối đạt. Ảnh evidence/mobile-map-fit-390.jpg và biên bản mobile-map-fit-browser.json. Backup backups/20261025T042900Z-before-mobile-map-fit. Đây là cập nhật thay thế cơ chế min-width660px trong mô tả trước; nội dung JSON không đổi.

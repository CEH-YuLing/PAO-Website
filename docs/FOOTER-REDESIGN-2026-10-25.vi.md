# Thiết kế lại footer PAO

Ngày 25/10/2026. Tham khảo bố cục footer IVN Media tại https://ivnmedia.com/ và ảnh chủ sở hữu cung cấp. Phần nền lưới được dựng mới bằng SVG; không sao chép ảnh nền hoặc nội dung dịch vụ của IVN Media.

Footer mới có bốn nhóm: Khám phá PAO, Ứng dụng, Thông tin, Kết nối. Thông tin liên hệ, tên công ty, địa chỉ, hotline và copyright dùng lại nội dung chủ sở hữu đã lưu. Các nhóm liên kết đưa về các mục đang có của PAO; trang thông tin dữ liệu giữ đường dẫn theo ngôn ngữ. Thêm liên kết IVN Media, nút về đầu trang, hàng nhận diện PAO và IVN Network, nút chọn ngôn ngữ và hiệu ứng hover/focus. Không thêm trang pháp lý chưa tồn tại, kênh mạng xã hội chưa xác nhận hoặc biểu mẫu gửi giả.

Giữ ba ngôn ngữ Việt/Anh/Trung giản thể. Source: components/site-footer.tsx; CSS được scope bằng pao-footer trong app/globals.css. Các trường liên hệ vẫn dùng SiteContentProvider để tiếp tục biên tập.

Kiểm tra: build tĩnh/TypeScript và lint thành công. Trình duyệt 1440px hiển thị bốn cột và không tràn ngang; 320px có hai cột và không tràn ngang. Mọi anchor trong footer đều có đích thật. Đổi ngôn ngữ English→中文 tại footer hoạt động; liên kết dữ liệu thành /zh/privacy/. 中文 tại 320px không tràn ngang. Chưa kiểm thử trên thiết bị vật lý.

Không triển khai công khai, không đổi backend hoặc dữ liệu doanh nghiệp.

## 10 ghi chú biên tập tiếp theo

Đã áp dụng và kiểm tra computed style: hàng đầu footer 60px; dòng công ty tiếng Anh 11px; tagline và tên công ty 16px; bốn tiêu đề viết hoa. Nút chính tại liên hệ đổi thành Gọi 0925 88 00 88, href tel:+84925880088; không thực hiện cuộc gọi kiểm thử. Những kênh liên hệ khác giữ nguyên. Bổ sung ba nhóm nội dung FAQ bằng ba ngôn ngữ để cân đối với danh sách câu hỏi. Build/TypeScript/lint đạt, desktop và 320px không tràn ngang.

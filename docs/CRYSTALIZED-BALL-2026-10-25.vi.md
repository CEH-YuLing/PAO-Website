# Crystalized Ball trên website PAO

Ngày 25/10/2026. Theo yêu cầu của chủ sở hữu, thay bộ não bằng thành phần React Bits Crystalized Ball, cấu hình color="#5b68f2", preset="plasma", size=0.7, intro=false. Giữ lựa chọn nhóm tri thức, bảng thông tin, zoom, đặt lại, chế độ di chuyển và tạm dừng. Các nhãn giao diện theo ba ngôn ngữ hiện có.

Nguồn chính thức: https://reactbits.dev/animations/crystalized-ball?color=5b68f2 và https://github.com/DavidHDev/react-bits/tree/main/src/ts-default/Animations/CrystalizedBall. Giấy phép MIT + Commons Clause được giữ trong docs/REACT-BITS-LICENSE.md. Thêm dependency OGL 1.0.11 cố định trong package-lock. Source thành phần chỉ đổi đường dẫn CSS và thêm ghi nguồn, không viết lại shader bằng hiệu ứng gần giống.

Thành phần gốc xử lý ResizeObserver, IntersectionObserver, tạm dừng và prefers-reduced-motion. Bản PAO giữ mạng nút và nội dung tri thức của riêng PAO. Tệp não giải phẫu và renderer đã chuyển vào bản sao lưu; không còn trong thư mục public đang xuất bản. Không thay đổi backend, dữ liệu doanh nghiệp hoặc triển khai công khai.

Sửa riêng đoạn giới thiệu: selector .landing-value .section-heading>p, max-width 730px và margin-inline auto để đoạn mô tả cùng trục với tiêu đề. Nội dung được giữ nguyên.

Kiểm tra: build tĩnh và TypeScript thành công; lint không cảnh báo. Trình duyệt xác nhận canvas OGL, color #5b68f2, không còn canvas não; chọn nhóm cập nhật nội dung; zoom 100→120 và reset; tạm dừng/tiếp tục. Viewport 390px không tràn ngang. Desktop 1440px: tâm tiêu đề và đoạn mô tả cùng ở x=712.5px, đoạn mô tả rộng 730px. Chưa đo lại Lighthouse hoặc thiết bị vật lý.

# Tám ghi chú giao diện tiếp theo

Ngày 25/10/2026. Chỉ website F:/PAO OS Source/pao-website.

1. Descriptor header 9px. Với menu di động dưới 1000px, descriptor được căn chính giữa header; không chồng lên logo hoặc bộ điều khiển ở 320px.
2. Bổ sung nội dung mô tả vai trò và ba bước phối hợp ở khu vực đội ngũ, đồng bộ ba ngôn ngữ. Bỏ padding-top 150px cũ để hai cột cân đối: kiểm tra 1280px cho thấy nội dung khoảng 831px, sơ đồ 806px.
3. Sơ đồ bắt đầu với mọi nhánh thu gọn. Bấm module mở các nhánh của module đó; bấm lại thu gọn; chỉ một module mở. FINANCE hiện đúng Ngân sách/Báo cáo/Hiệu quả. Enter mở PLANNER đúng ba nhánh. Nút đặt lại thu gọn tất cả. Giữ aria-expanded và điều khiển bàn phím; không phục hồi vùng mô tả từng module đã được yêu cầu xóa.
4. Bỏ liên kết Tình huống ứng dụng trong cột Khám phá PAO của footer.
5. Bỏ nút Trao đổi nhu cầu trong cột liên hệ footer; giữ liên kết trong cột thông tin theo đúng đích đánh dấu của chủ sở hữu.
6. Footer giảm padding, cân khoảng cách cột và hàng sau khi bỏ hai mục.
7. Giảm tên công ty xuống 11px ở desktop/tablet, nhỏ hơn ở điện thoại hẹp, giữ một dòng. 732px đo được chiều cao 17.59px, bằng line-height 17.6px, không xuống dòng. Nội dung pháp nhân không thay đổi.
8. Thu gọn hàng nhận diện với padding dọc 20px, khoảng cách hàng 25px; điện thoại 18px.

Build tĩnh/TypeScript và lint đạt. Trình duyệt xác nhận tương tác, font, căn giữa 320/732px, không tràn ngang và các mục đã xóa. Không sửa backend, không gọi số điện thoại, không triển khai công khai.

## Bốn ghi chú cân đối điện thoại tiếp theo

Bộ chọn 10 cụm chức năng chuyển thành grid 5 cột, đúng hai dòng 5–5. Bộ chọn 8 nhóm tri thức thành grid 4 cột, đúng hai dòng 4–4. Căn giữa hai dòng tên công ty trên bố cục xếp chồng của điện thoại. Bỏ nhãn Văn phòng/Office trên cả ba ngôn ngữ, giữ nguyên địa chỉ và biểu tượng vị trí.

Đã đo DOM ở 320, 390, 509 và 699px: hai bộ chọn luôn có đúng hai dòng bằng nhau, không cắt chữ và không tràn ngang. Bấm FINANCE và chọn Khách hàng vẫn hoạt động. Build/TypeScript/lint thành công.

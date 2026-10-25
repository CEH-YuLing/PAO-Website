# Website PAO ba ngôn ngữ và đối chiếu hồ sơ startup

Ngày 25/10/2026. Phạm vi: website giới thiệu sản phẩm độc lập tại F:/PAO OS Source/pao-website. Không thay đổi backend PAO-ACOS, cơ sở dữ liệu, kết nối nền tảng hoặc triển khai công khai.

## Nội dung và bố cục

Thay khu vực dashboard bằng mạch giới thiệu: PAO là gì, giải pháp cho SME, cách hoạt động, sơ đồ đội ngũ AI, tri thức và quyền kiểm soát, tình huống ứng dụng, FAQ và liên hệ. Tham khảo cách kể chuyện tại https://zoeyos.com/; giữ nhận diện, logo và nhân vật PAO. Các dashboard và hội thoại giả lập đã được chuyển vào bản sao lưu, không còn trong cây giao diện hoạt động.

Ba ngôn ngữ dùng đường dẫn tĩnh: / (Tiếng Việt), /en/ (English), /zh/ (中文 giản thể). Dịch nội dung, menu, ticker, sơ đồ, phần hướng dẫn chức năng, tình huống, FAQ, liên hệ và trang thông tin dữ liệu. Mỗi trang có lang, canonical và hreflang; sitemap gồm sáu trang công khai. Chuyển ngôn ngữ giữ đường dẫn và hash mục đang xem. Trình biên tập cục bộ giữ tiếng Việt; các bản dịch lưu riêng trong lib/content-en.json và lib/content-zh.json.

## Hồ sơ tham khảo

Đọc nội dung PAO_OS_Startup_Application_Dossier_EN.docx, phiên bản 1.0 ngày 25/10/2026, bằng trích xuất XML để đối chiếu thông tin. Không sửa tài liệu hoặc sao chép tài liệu vào thư mục public.

Áp dụng định vị AI-native Business Operating System for SMEs, lập kế hoạch, điều phối nhiệm vụ, phê duyệt và báo cáo. Giữ trạng thái “đang được phát triển” trong phần giới thiệu; sơ đồ và tình huống giải thích cấu trúc sản phẩm, không khẳng định mọi kết nối đã vận hành thực tế. Thông tin IVN Media, IVN Network, email, hotline và địa chỉ dựa trên dữ kiện chủ sở hữu đã cung cấp.

Hồ sơ là bản nháp có các ô chờ xác minh, chưa phải đơn đã nộp. Chưa có tên/tiểu sử đội ngũ, giai đoạn sản phẩm xác nhận, khách hàng, doanh thu, vốn hoặc quyền sở hữu IP được điền hoàn chỉnh. Không đưa các ô chờ hoặc tự tạo số liệu lên website. Các đề xuất VPS riêng, desktop và voice trong hồ sơ chưa được coi là tính năng đã phát hành hoặc quyết định thay đổi kiến trúc backend. Không sử dụng logo chương trình startup như một chứng nhận tham gia.

## Xác minh

Build tĩnh và TypeScript thành công; lint không cảnh báo; 7 kiểm thử biên tập thành công. Kiểm tra trình duyệt: English, 中文 và Tiếng Việt; menu đổi ngôn ngữ; giữ hash; tab tình huống; chọn module sơ đồ; liên kết trang dữ liệu. Bản English không tràn ngang ở 390/320px; sơ đồ ở 100% vừa khung. Trang dữ liệu 中文 không tràn ngang ở 320px. Đây là kiểm tra viewport trình duyệt, chưa phải thiết bị vật lý. Không có lỗi trình duyệt mới trong các lượt kiểm tra; nhật ký trước 04:53 UTC là lịch sử lỗi hydration đã sửa trước đó.

Cache dev cũ tham chiếu route trước khi chuyển layout gây lỗi TypeScript ở lần build đầu. Đã cách ly vào backups/20261025-languages-123357/old-dev-cache; sửa kiểu description tùy chọn, sau đó build thành công. Không che lỗi bằng suppressHydrationWarning.

## Còn lại trước khi gửi hồ sơ

Website hiện chạy loopback, chưa triển khai pao-os.com. Chưa xác minh DNS/hosting/email delivery, video sản phẩm thật hoặc thông tin đội ngũ và traction. Chưa kiểm tra lại điều kiện từng chương trình hỗ trợ; tài liệu nêu các chương trình mục tiêu, không chứng minh đủ điều kiện hoặc đã được chấp thuận. Cần đối chiếu những mục này trước khi nộp đơn. Điểm Lighthouse cũ không đại diện cho phiên bản hiện tại.

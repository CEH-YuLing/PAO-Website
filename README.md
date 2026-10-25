# PAO OS — Official Website

Website giới thiệu PAO OS của IVN Media / IVN Network, với giao diện Tiếng Việt, English và 简体中文. Next.js, React, TypeScript; font và hình ảnh phục vụ từ dự án. Tên miền dự kiến: https://pao-os.com.

## Chạy cục bộ

Yêu cầu Node.js 24.x và npm.

```sh
npm ci
npm run dev
```

Trang phát triển: http://127.0.0.1:3177.

```sh
npm run lint
npm run build
npm run editor
```

Công cụ biên tập riêng: http://127.0.0.1:3177/editor/. Chỉ dùng trên máy cá nhân. Bản nháp trình duyệt phải được Áp dụng vào mã nguồn trước khi commit/push.

## Triển khai trên Hostinger Business

**Khi Hostinger báo lỗi GLIBC/SWC: kết nối nhánh hostinger-static, framework Other (frontend), build script build, output dist.** Nhánh main giữ mã nguồn; nhánh hostinger-static chứa bản đã build sẵn và không chạy trình biên dịch Next.js trên Hostinger.


Xem **[hướng dẫn kết nối GitHub với Hostinger](docs/HOSTINGER.vi.md)**.

- GitHub repository: `CEH-YuLing/PAO-Website`, nhánh `main`.
- Web App dạng frontend, Node.js `24.x`.
- Build script: `build:hostinger`.
- Output directory: `out`.
- Không cần biến môi trường, database hoặc PAO backend.

```sh
npm ci
npm run build:hostinger
```

Kết quả xuất tĩnh trong `out/`, không bao gồm route editor. Không chạy `next start` với `output: 'export'`. Thư mục build, thư viện đã cài, bản sao lưu và dữ liệu kiểm tra không được lưu vào repository.

## Nội dung và tương tác

- Trang chủ: `components/home-content.tsx`, CSS: `app/globals.css`.
- Nội dung chỉnh sửa được: `lib/site-content.json`; bản dịch: `lib/content-en.json`, `lib/content-zh.json`.
- Chính sách quyền riêng tư: `lib/privacy-policy.json`.
- Logo, mascot và tài nguyên: `public/`.
- Sơ đồ đội ngũ, tinh cầu tri thức và các tình huống ứng dụng là tương tác frontend; website không thực thi quảng cáo, gọi AI hoặc thao tác tài khoản doanh nghiệp.

## Bản quyền

Giữ giấy phép Apache-2.0 hiện có của repository. Thành phần bên thứ ba có giấy phép riêng; xem [React Bits](docs/REACT-BITS-LICENSE.md) và các thông báo trong `public/third-party-notices/`. Logo, tên thương hiệu và tài sản hình ảnh không mặc nhiên được cấp quyền sử dụng nhãn hiệu bởi giấy phép mã nguồn.

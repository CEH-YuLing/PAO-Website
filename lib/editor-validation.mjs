// Shared by the static editor and the loopback-only writer. No HTML is evaluated.
export function validateField(value, field) {
  if (typeof value !== 'string') return 'Nội dung phải là chuỗi văn bản.';
  if (value.length > field.maxLength) return `Tối đa ${field.maxLength.toLocaleString('vi-VN')} ký tự.`;
  if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value)) return 'Có ký tự điều khiển không hợp lệ.';
  if (field.type === 'link') {
    if (/[\s\\]/.test(value)) return 'Liên kết không được có khoảng trắng hoặc dấu gạch chéo ngược.';
    if (/^#[A-Za-z][\w-]*$/.test(value) || /^\/(?!\/)[\w/?.#%=&+-]*$/.test(value)) return '';
    if (/^mailto:[^<>\s@]+@[^<>\s@]+\.[^<>\s@]+$/.test(value) || /^tel:\+?[0-9().-]{6,30}$/.test(value)) return '';
    try { const url = new URL(value); if (url.protocol === 'https:' && !url.username && !url.password) return ''; } catch { /* Invalid URL. */ }
    return 'Dùng #muc, /duong-dan/, https://…, mailto:… hoặc tel:…';
  }
  if (field.type === 'image') {
    if (/^\/(?:images|brand|uploads)\/[A-Za-z0-9_./-]+\.(?:png|webp|jpe?g)$/i.test(value) && !value.includes('..') && !value.includes('//')) return '';
    if (/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/]+={0,2}$/.test(value)) return '';
    try { const url = new URL(value); if (url.protocol === 'https:' && !url.username && !url.password && !/[\s\\]/.test(value)) return ''; } catch { /* Invalid URL. */ }
    return 'Chọn ảnh PNG/JPG/WebP, đường dẫn /images/… hoặc URL https://…';
  }
  if (field.type === 'color' && !/^#[0-9a-f]{6}$/i.test(value)) return 'Màu cần có dạng #008DFF.';
  if (field.type === 'number' && (!value.trim() || !Number.isFinite(Number(value)) || Number(value) < field.min || Number(value) > field.max)) return `Nhập số từ ${field.min} đến ${field.max}.`;
  if (field.type === 'select' && !field.options?.some(option => option.value === value)) return 'Lựa chọn không hợp lệ.';
  return '';
}

export function validateContent(input, schema) {
  if (!input || typeof input !== 'object' || Array.isArray(input) || input.version !== 1 || Object.keys(input).some(k => !['version','values'].includes(k))) throw new Error('Tệp nội dung không đúng định dạng phiên bản 1.');
  const values = input.values;
  if (!values || typeof values !== 'object' || Array.isArray(values) || Object.keys(values).length !== schema.fields.length) throw new Error('Danh sách nội dung không khớp với website hiện tại.');
  /** @type {Record<string, string>} */
  const result = {};
  for (const field of schema.fields) {
    if (!Object.hasOwn(values, field.id)) throw new Error(`Thiếu mục: ${field.label}`);
    const error = validateField(values[field.id], field);
    if (error) throw new Error(`${field.label}: ${error}`);
    result[field.id] = values[field.id];
  }
  return { version: 1, values: result };
}

// gửi yêu cầu GET đến một URL bằng cách sử dụng thư viện Axios.

import axios from 'axios';

// Định nghĩa hàm fetcher nhận vào một tham số url kiểu chuỗi (string). Hàm này sử dụng axios.get() để gửi yêu cầu GET đến url và trả về một Promise. Khi Promise được giải quyết (resolved), phản hồi từ server (response) được truy cập thông qua tham số res, và chỉ trả về dữ liệu (data) trong phản hồi (res.data).
const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default fetcher; 
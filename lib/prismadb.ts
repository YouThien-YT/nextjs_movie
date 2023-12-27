
// tạo và xuất một phiên bản của PrismaClient, để tương tác với cơ sở dữ liệu.
import { PrismaClient } from '@prisma/client'

// tạo một biến client và gán giá trị của nó là global.prismadb nếu nó đã tồn tại, hoặc là một phiên bản mới của PrismaClient nếu global.prismadb chưa được định nghĩa. Điều này giúp đảm bảo rằng chỉ có một phiên bản duy nhất của PrismaClient được tạo ra và sử dụng trong toàn bộ ứng dụng.
const client = global.prismadb || new PrismaClient()

// lưu trữ phiên bản của PrismaClient trong biến toàn cục để tránh việc tạo một phiên bản mới mỗi khi module này được import
if (process.env.NODE_ENV !== 'production') global.prismadb = client

export default client
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import prismadb from "@/lib/prismadb";
import { compare } from "bcrypt";

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";

export default NextAuth ({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      // authorize: Đây là một hàm xác thực (authorize) được gọi khi người dùng cố gắng đăng nhập bằng nhà cung cấp Credentials. Hàm này nhận một đối tượng credentials chứa thông tin đăng nhập từ người dùng.
      async authorize(credentials) {
        // Trong phần xác thực, chúng ta kiểm tra xem thông tin đăng nhập (credentials.email và credentials.password) đã được cung cấp hay chưa. Nếu không, chúng ta ném ra một lỗi 'Email and password required'.
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        // Sau đó, chúng ta sử dụng prismadb.user.findUnique() để tìm người dùng trong cơ sở dữ liệu dựa trên địa chỉ email. Nếu không tìm thấy người dùng hoặc không tồn tại mật khẩu đã được băm (user.hashedPassword), chúng ta ném ra một lỗi 'Email does not exist'.
        const user = await prismadb.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.hashedPassword) {
          throw new Error("Email does not exist");
        }

        // Tiếp theo, chúng ta sử dụng compare() để so sánh mật khẩu được cung cấp với mật khẩu đã được băm từ cơ sở dữ liệu. Nếu mật khẩu không chính xác, chúng ta ném ra một lỗi 'Incorrect password'.
        const isCorrectPassword = await compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Incorrect password");
        }
        // Nếu thông tin đăng nhập hợp lệ, chúng ta trả về đối tượng người dùng tương ứng.
        return user;
      },
    }),
  ],

  pages: {
    signIn: "/auth",
  },
  // Đây là một cờ để bật chế độ gỡ lỗi trong quá trình phát triển. Nó kiểm tra xem biến môi trường NODE_ENV có giá trị là "development" hay không. Nếu có, debug được đặt thành true, ngược lại thì false. Khi debug được bật, thông tin gỡ lỗi sẽ được hiển thị để giúp phát triển và sửa lỗi.
  debug: process.env.NODE_ENV === "development",
  adapter: PrismaAdapter(prismadb),
  // Đây là cấu hình cho phiên đăng nhập. Trong trường hợp này, đoạn mã đang chỉ định rằng chiến lược sử dụng cho phiên đăng nhập là "jwt". Có thể có nhiều chiến lược khác nhau cho phiên đăng nhập, nhưng trong trường hợp này, sử dụng chiến lược JWT (JSON Web Token).
  session: {
    strategy: "jwt",
  },
  // Đây là cấu hình cho JWT (JSON Web Token). JWT sử dụng một khóa bí mật (secret) để ký và xác thực token. Trong đoạn mã này, khóa bí mật được lấy từ biến môi trường NEXTAUTH_JWT_SECRET.
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  // Đây là khóa bí mật (secret) được sử dụng bởi NextAuth. Nó được lấy từ biến môi trường NEXTAUTH_SECRECT. Khóa bí mật này có thể được sử dụng để bảo vệ và ký token, hoặc cho các mục đích bảo mật khác liên quan đến NextAuth.
  secret: process.env.NEXTAUTH_SECRET,
});


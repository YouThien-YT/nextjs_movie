import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import prismadb from "@/lib/prismadb";

// Đây là hàm xử lý chính của API. Nó nhận vào một đối tượng req (NextApiRequest) đại diện cho yêu cầu API và một đối tượng res (NextApiResponse) đại diện cho phản hồi API.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Đây là một điều kiện kiểm tra nếu yêu cầu không phải là phương thức POST, API sẽ trả về mã trạng thái 405 (phương thức không được phép) và kết thúc phản hồi.
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    //Đây là việc trích xuất các thông tin đăng ký từ req.body, bao gồm email, name, và password.
    const { email, name, password } = req.body;

    // Đây là việc kiểm tra xem đã có người dùng nào sử dụng địa chỉ email đã được đăng ký hay chưa. Nếu người dùng đã tồn tại, API sẽ trả về mã trạng thái 422 (Unprocessable Entity) và một đối tượng JSON chứa thông báo lỗi.
    const existingUser = await prismadb.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return res.status(422).json({ error: "Email taken" });
    }

    // Đây là quá trình băm mật khẩu được cung cấp bằng cách sử dụng bcrypt. Mật khẩu được băm với mức độ an toàn là 12.
    const hashedPassword = await bcrypt.hash(password, 12);

    // Đây là quá trình tạo người dùng mới trong cơ sở dữ liệu. Một đối tượng người dùng mới được tạo với các thông tin như email, name, hashedPassword, image, và emailVerified.
    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    // Nếu quá trình tạo người dùng thành công, API sẽ trả về mã trạng thái 200 (OK) và một đối tượng JSON chứa thông tin người dùng.
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}

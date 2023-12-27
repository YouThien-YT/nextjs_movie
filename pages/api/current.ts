// xác thực người dùng và trả về thông tin người dùng hiện tại dưới dạng JSON.

import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    // Kiểm tra xem yêu cầu có phương thức GET hay không. Nếu không, trả về mã trạng thái 405 (Method Not Allowed) và kết thúc phản hồi.
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    // Gọi hàm serverAuth với đối tượng yêu cầu req để xác thực người dùng và lấy thông tin người dùng hiện tại. Kết quả trả về là một đối tượng chứa thông tin người dùng hiện tại.
    const { currentUser } = await serverAuth(req, res);

    // Trả về mã trạng thái 200 (OK) và gửi thông tin người dùng hiện tại dưới dạng JSON trong phản hồi.
    return res.status(200).json(currentUser);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

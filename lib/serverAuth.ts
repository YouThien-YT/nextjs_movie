// xác thực người dùng và lấy thông tin người dùng hiện tại từ cơ sở dữ liệu trong một API route của Next.js.

import { getServerSession } from "next-auth";
import authOptions from "@/pages/api/auth/[...nextauth]";

import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import { getSession } from "next-auth/react";

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  // Hàm getSession được sử dụng để lấy thông tin phiên đăng nhập (session) từ yêu cầu (request). getSession là một hàm hỗ trợ bởi thư viện next-auth để xác thực người dùng và lấy thông tin phiên đăng nhập. req là đối tượng NextApiRequest đại diện cho yêu cầu API route hiện tại.
  const session = await getSession({req});

  //   Kiểm tra xem phiên đăng nhập có tồn tại và có chứa thông tin người dùng (bao gồm email) hay không. Nếu không, một lỗi được ném ra với thông báo "Not signed in".
  if (!session?.user?.email) {
    throw new Error("Not signed inn");
  }

  //   Sử dụng một hàm findUnique từ một ORM (object-relational mapping) hoặc thư viện truy vấn cơ sở dữ liệu (trong đoạn mã này là prismadb) để tìm người dùng hiện tại trong cơ sở dữ liệu. Câu truy vấn được thực hiện dựa trên email của người dùng từ phiên đăng nhập.
  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  //   Kiểm tra xem người dùng hiện tại có tồn tại trong cơ sở dữ liệu hay không. Nếu không, một lỗi được ném ra với thông báo "Not signed in".
  if (!currentUser) {
    throw new Error("Not signed in");
  }

  //   Trả về đối tượng chứa thông tin người dùng hiện tại từ cơ sở dữ liệu.
  return { currentUser };
};

export default serverAuth;

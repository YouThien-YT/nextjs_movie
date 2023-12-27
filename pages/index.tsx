import React from "react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

import useFavorites from "@/Hook/useFavorites";
import useMovieList from "@/Hook/useMovieList";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import InfoModal from "@/components/InfoModal";
import useInfoModal from "@/Hook/useInfoModal";

// Định nghĩa một hàm getServerSideProps nhận vào đối tượng context kiểu NextPageContext.
// Hàm này sẽ được gọi trên phía máy chủ và thực hiện các logic liên quan đến dữ liệu trước khi trang được render.
// Trong trường hợp này, hàm được sử dụng để kiểm tra xem người dùng đã đăng nhập hay chưa.
export async function getServerSideProps(context: NextPageContext) {
  // Sử dụng hàm getSession để lấy thông tin phiên đăng nhập từ đối tượng context. getSession là một hàm được cung cấp bởi thư viện next-auth để xác thực và quản lý phiên đăng nhập.
  const session = await getSession(context);

  // Kiểm tra xem session có tồn tại hay không. Nếu không, trả về một đối tượng redirect để chuyển hướng người dùng đến trang "/auth" (trang đăng nhập) với các thuộc tính permanent được đặt là false để chỉ định chuyển hướng tạm thời.
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const Home = () => {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const {isOpen, closeModal} = useInfoModal()

  return (
    <>
    <InfoModal visible= {isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className=" py-5 ">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My List" data={favorites} />
      </div>
    </>
  );
};

export default Home;

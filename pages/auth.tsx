"use client";
import Input from "@/components/input";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Auth = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState("login");

  const handleToggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  // login
  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/profiles",
      });

    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  // sign in
  const register = useCallback(async () => {
    try {
      //  Đây là một yêu cầu POST gửi đến endpoint /api/register bằng cách sử dụng thư viện axios. Đối số thứ hai là một đối tượng chứa các thông tin đăng ký như email, name, và password.
      await axios.post("/api/register", {
        email,
        name,
        password,
      });

      login();
      // Đây là khối catch để xử lý lỗi trong quá trình gọi API đăng ký. Nếu có lỗi xảy ra, nó sẽ được ghi vào console để gỡ lỗi và xử lý tương ứng.
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login]);

  return (
    <div className=" relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover ">
      <div className=" bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="logo" className="h-12" />
        </nav>
        <div className=" flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full ">
            <h2 className=" text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "sign in" : "Register"}
            </h2>
            <div className=" flex flex-col gap-4 ">
              {variant === "register" && (
                <Input
                  id="name"
                  onChange={(e: any) => setName(e.target.value)}
                  value={name}
                  lable="User Name"
                  type="name"
                />
              )}
              <Input
                id="email"
                onChange={(e: any) => setEmail(e.target.value)}
                value={email}
                lable="Email"
                type="email"
              />
              <Input
                id="password"
                onChange={(e: any) => setPassword(e.target.value)}
                value={password}
                lable="Password"
                type="password"
              />
            </div>
            <button
              onClick={variant === "login" ? login : register}
              className=" bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition "
            >
              {variant === "login" ? "Login" : "sign up"}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div
                onClick={() => signIn("google", { callbackUrl: "/profiles" })}
                className=" 
                  w-10 h-10
                  bg-white 
                  rounded-full 
                  flex 
                  items-center 
                  justify-center 
                  cursor-pointer 
                  hover:opacity-80 
                  transition
                "
              >
                <FcGoogle size={30} />
              </div>
              <div
                onClick={() => signIn("github", { callbackUrl: "/profiles" })}  
                className=" 
                  w-10 h-10
                  bg-white 
                  rounded-full 
                  flex 
                  items-center 
                  justify-center 
                  cursor-pointer 
                  hover:opacity-80 
                  transition
                "
              >
                <FaGithub size={30} />
              </div>
            </div>
            <p className=" text-neutral-500 mt-5 text-center">
              {variant === "login"
                ? "First time using Netflix ?"
                : "Alredy have an account ?"}
            </p>
            <p
              onClick={handleToggleVariant}
              className=" text-white ml-1 hover:underline cursor-pointer text-center"
            >
              {variant === "login" ? "Create and account !" : "login !"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

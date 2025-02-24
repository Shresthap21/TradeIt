import axiosPrivate from "@/axios/axiosPrivate";
import { axiosPublic } from "@/axios/axiosPublic";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Signin = ({
  handleInputChange,
  signInDetail,
  handleLogin,
  handleSignupClick,
  signInErr,
}) => {
  const [pageState, setPageState] = useState(0);

  async function handleResetPassword() {
    try {
      const res = await axiosPublic.post("/forgot-password", {
        emailID: signInDetail.emailID,
      });
      console.log(res);
      toast.success(res.data.msg);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      {pageState === 0 ? (
        <>
          <p className="text-center text-xl font-semibold">Welcome Back!</p>
          <div className="relative flex items-center border border-gray-300 rounded-lg focus-within:ring-1 focus-within:ring-blue-200">
            <img
              src="https://img.icons8.com/?size=100&id=86840&format=png&color=d1d5db"
              alt="Email Icon"
              className="w-6 h-6 absolute right-1"
            />
            <input
              onChange={handleInputChange}
              type="email"
              name="emailID"
              id="emailID"
              value={signInDetail.emailID}
              placeholder="Email"
              className="pr-10 w-full px-2 py-2 focus:outline-none rounded-lg"
            />
          </div>
          <div className="relative flex items-center border border-gray-300 rounded-lg focus-within:ring-1 focus-within:ring-blue-200">
            <img
              src="https://img.icons8.com/?size=100&id=PU4roiu8ELp5&format=png&color=d1d5db"
              alt="Email Icon"
              className="w-6 h-6 absolute right-1"
            />
            <input
              onChange={handleInputChange}
              type="password"
              name="password"
              value={signInDetail.password}
              id="password"
              placeholder="Password"
              className="pr-10 w-full px-2 py-2 focus:outline-none rounded-lg"
            />
          </div>
          <span className="text-xs  text-red-600">{signInErr}</span>
          <div className="flex text-sm text-nowrap items-center gap-x-5 ">
            <hr className="w-full" />
            <p>OR</p>
            <hr className="w-full" />
          </div>
          <p
            onClick={() => setPageState(1)}
            className="text-sm text-center text-blue-600 underline cursor-pointer"
          >
            Forgot Password
          </p>
          <div className="space-y-3">
            <button
              onClick={handleLogin}
              className="bg-blue-200 px-4 py-2 rounded-lg w-full font-medium"
            >
              Log in
            </button>
            <p className="text-[12px] text-center">
              Don't have an account?{" "}
              <a
                href="#"
                onClick={handleSignupClick}
                className="text-blue-600 underline"
              >
                Create account
              </a>
            </p>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-center text-xl font-semibold">
            Forgot your password
          </h1>
          <p className="text-gray-500 text-sm text-center">
            We'll email you a link to rest your password.
          </p>
          <div className="relative flex items-center border border-gray-300 rounded-lg focus-within:ring-1 focus-within:ring-blue-200">
            <img
              src="https://img.icons8.com/?size=100&id=86840&format=png&color=d1d5db"
              alt="Email Icon"
              className="w-6 h-6 absolute right-1"
            />
            <input
              onChange={handleInputChange}
              type="email"
              name="emailID"
              id="emailID"
              value={signInDetail.emailID}
              placeholder="Email"
              className="pr-10 w-full px-2 py-2 focus:outline-none rounded-lg"
            />
          </div>
          <button
            onClick={handleResetPassword}
            className="bg-blue-200 px-4 py-2 rounded-lg w-full font-medium"
          >
            Reset Password
          </button>
        </>
      )}
    </>
  );
};

export default Signin;

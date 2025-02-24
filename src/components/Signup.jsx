import React from "react";
import { RxCheck, RxCross2 } from "react-icons/rx";

const Signup = ({
  handleInputChange,
  signUpDetail,
  handleSignUp,
  handleBackToLogin,
  signUpErr
}) => {
  return (
    <>
      <p className="text-center text-xl font-semibold">Create Account</p>

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
          value={signUpDetail.emailIDDetail}
          id="emailID"
          placeholder="Email"
          className="px-2 pr-10 py-2 w-full focus:outline-none rounded-lg bg-transparent"
        />
      </div>

      <div
        className={`relative flex items-center border
    rounded-lg focus-within:ring-1 focus-within:ring-blue-200`}
      >
        <img
          src="https://img.icons8.com/?size=100&id=PU4roiu8ELp5&format=png&color=d1d5db"
          alt="Password Icon"
          className="w-6 h-6 absolute right-1"
        />
        <input
          onChange={handleInputChange}
          type="password"
          name="password"
          value={signUpDetail.passwordetail}
          id="password"
          placeholder="Password"
          className="pr-10 w-full px-2 py-2 focus:outline-none rounded-lg bg-transparent"
        />
      </div>

      <div className="relative flex items-center border border-gray-300 rounded-lg focus-within:ring-1 focus-within:ring-blue-200">
        <img
          src="https://img.icons8.com/?size=100&id=82747&format=png&color=d1d5db"
          alt="Email Icon"
          className="w-6 h-6 absolute right-1"
        />
        <input
          onChange={handleInputChange}
          type="text"
          name="invitation_code"
          value={signUpDetail.invitation_code}
          id="invitation_code"
          placeholder="Invitation Code"
          className="pr-10 w-full px-2 py-2 focus:outline-none rounded-lg bg-transparent"
        />
      </div>
      {signUpErr.password.length > 0 && (
        <div className="bg-slate-100 p-2 rounded-md">
          {signUpErr.password.map((item,idx) => (
            <>
              <div
              key={idx}
                className={`flex gap-x-2 text-[10px] transition-all duration-300 ${
                  item.status ? "text-green-400" : "text-red-400"
                }`}
              >
                {item.status ? (
                  <RxCheck className="text-sm min-w-4" />
                ) : (
                  <RxCross2 className="text-sm min-w-4" />
                )}
                {item.msg}
              </div>
            </>
          ))}
        </div>
      )}
      <span className="text-xs  text-red-600">{signUpErr.msg}</span>

      <div className="space-y-3">
        <button
          onClick={handleSignUp}
          className="bg-blue-200 px-4 py-2 rounded-lg w-full font-medium"
        >
          Sign Up
        </button>
        <p className="text-[12px] text-center">
          Already have an account?{" "}
          <a
            href="#"
            onClick={handleBackToLogin}
            className="text-blue-600 underline"
          >
            Login
          </a>
        </p>
      </div>
    </>
  );
};

export default Signup;

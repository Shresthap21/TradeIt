import { axiosPublic } from "@/axios/axiosPublic";
import React, { useState } from "react";
import { RxCheck, RxCross2 } from "react-icons/rx";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "password") {
      setErrors((prev) => [
        checkLength(value),
        checkDigit(value),
        checkUppercase(value),
        checkLowercase(value),
        checkSymbol(value),
      ]);
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  function checkLength(password) {
    const lengthRegex = /^.{8,}$/;
    return {
      status: lengthRegex.test(password),
      msg: "Password must be at least 8 characters long",
    };
  }

  function checkDigit(password) {
    const digitRegex = /.*\d.*/;
    return {
      status: digitRegex.test(password),
      msg: "Password must contain at least one digit",
    };
  }

  function checkUppercase(password) {
    const uppercaseRegex = /.*[A-Z].*/;
    return {
      status: uppercaseRegex.test(password),
      msg: "Password must contain at least one uppercase letter",
    };
  }

  function checkLowercase(password) {
    const lowercaseRegex = /.*[a-z].*/;
    return {
      status: lowercaseRegex.test(password),
      msg: "Password must contain at least one lowercase letter",
    };
  }
  function checkSymbol(password) {
    const symbolRegex = /.*[!@#$%^&*(),.?":{}|<>].*/;
    return {
      status: symbolRegex.test(password),
      msg: "Password must contain at least two special symbols (e.g., !, @, #, $)",
    };
  }

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
    } else if (errors.every((e) => e.status)) {
      try {
        const res = await axiosPublic.post(`/reset-password`, {
          password,
          token,
        });
        if (res.status === 200) {
          if (res.data.code === 0) {
            toast.success(res.data.msg);
          } else {
            toast.error(res.data.msg);
          }
          navigate("/");
        }
      } catch (error) {
        console.error(error);
        toast.error("Password reset failed!");
      }
    } else {
      toast.error("Invalid Password");
    }
  };

  return (
    <div className="flex-1 flex-col h-screen  flex justify-center items-center">
      <div className="border border-gray-300 p-5 rounded-lg w-96">
        <h1 className="text-center text-xl font-semibold mb-5">
          Reset Password
        </h1>
        <div
          className={`relative flex items-center border
                    rounded-lg focus-within:ring-1 focus-within:ring-blue-200 mb-4`}
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
            id="password"
            placeholder="Password"
            className="pr-10 w-full px-2 py-2 focus:outline-none rounded-lg bg-transparent"
          />
        </div>
        <div
          className={`relative flex items-center border
                    rounded-lg focus-within:ring-1 focus-within:ring-blue-200 mb-4`}
        >
          <img
            src="https://img.icons8.com/?size=100&id=PU4roiu8ELp5&format=png&color=d1d5db"
            alt="Password Icon"
            className="w-6 h-6 absolute right-1"
          />
          <input
            onChange={handleInputChange}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm Password"
            className="pr-10 w-full px-2 py-2 focus:outline-none rounded-lg bg-transparent"
          />
        </div>
        {errors.length > 0 && (
          <div className="bg-slate-100 p-2 rounded-md">
            {errors.map((item, idx) => (
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
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;

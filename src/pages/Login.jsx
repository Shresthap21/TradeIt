import React, { useEffect, useState } from "react";
import { axiosPublic } from "../axios/axiosPublic";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { RxCheck, RxCross2 } from "react-icons/rx";
import { setLoggedin, addUser } from "../store/features/common/userSlice";
import axiosPrivate from "../axios/axiosPrivate";
import toast from "react-hot-toast";
import Signup from "@/components/Signup";
import Signin from "@/components/Signin";

export const Login = ({ setShowModal, showModal }) => {
  const [signUp, setSignUp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signInErr, setSignInErr] = useState("");
  const [signUpErr, setSignUpErr] = useState({
    password: [],
  });

  const [signUpDetail, setSignUpDetail] = useState({
    emailID: "",
    password: "",
    invitation_code: "",
  });
  const [loading, setLoading] = useState(false);

  const loader = (
    <div className="w-[1.5rem] h-[1.5rem] mx-auto rounded-full border-2 border-transparent border-r-white border-t-white animate-spin"></div>
  );
  const [signInDetail, setSignInDetail] = useState({
    emailID: "",
    password: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    if (signUp) {
      if (name === "password") {
        setSignUpErr((prev) => ({
          ...prev,
          password: [
            checkLength(value),
            checkDigit(value),
            checkUppercase(value),
            checkLowercase(value),
            checkSymbol(value),
          ],
        }));
      }
      setSignUpDetail((prev) => ({ ...prev, [name]: value }));
    } else {
      setSignInDetail((prev) => ({ ...prev, [name]: value }));
    }
  }
  function handleSignupClick() {
    setSignUp(true);
  }
  function handleBackToLogin() {
    setSignUp(false);
  }
  function checkFields(data) {
    return Object.values(data).every((item) => item.length > 0);
  }

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

  async function handleSignUp() {
    if (checkFields(signUpDetail)) {
      try {
        const res = await axiosPublic.post("/signup", signUpDetail);
        if (res.status === 200) {
          toast.success(res.data.msg);
          setSignUp(false);
        }
      } catch (error) {
        if (error.status === 401) {
          setSignUpErr((prev) => ({
            ...prev,
            msg: error.response.data.msg,
          }));
        }
        console.error("ERR::POST::SIGNUP", error);
      }
    } else {
      toast("Fields are empty!", {
        icon: "⚠️",
      });
    }
  }
  async function handleLogin() {
    if (checkFields(signInDetail)) {
      try {
        setLoading(true);
        const promise = axiosPublic.post("/login", signInDetail);
        const res = await promise;
        toast.promise(promise, {
          loading: "Logging in",
          success: "Logged in Successfully",
          error: false,
        });
        if (res.status == 200) {
          localStorage.setItem("access", res.data.token);
          localStorage.setItem("refresh", res.data.refresh_token);

          dispatch(setLoggedin(true));
          const userRes = await axiosPrivate.get("/me");
          dispatch(addUser(userRes.data));
          navigate("/dashboard");

        }
      } catch (error) {
        console.log("ERR:", error);
        if (error.status === 401) {
          setSignInErr(error.response.data.msg);
        }
        // toast.error(error.response.data.Description);
      } finally {
        setLoading(false);
      }
    } else {
      toast("Email and password required!", {
        icon: "⚠️",
      });
    }
  }
  useEffect(() => {

  }, [signInDetail, signUpDetail]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10"
      onClick={() => setShowModal(false)}
    >
      <div
        className="flex items-center bg-white p-8 rounded-3xl shadow-lg w-[30rem] h-fit overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="m-4 w-full space-y-6">
          {signUp ? (
          <Signup handleInputChange={handleInputChange} signUpDetail={signUpDetail} handleSignUp={handleSignUp} handleBackToLogin={handleBackToLogin} signUpErr={signUpErr} />
          ) : (
        <Signin handleInputChange={handleInputChange} signInDetail={signInDetail} handleLogin={handleLogin} handleSignupClick={handleSignupClick} signInErr={signInErr}/>
          )}
        </div>
      </div>
    </div>
  );
};

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addUser,
  setIsSessionLoaded,
  setLoggedin,
} from "../store/features/common/userSlice";
import axiosPrivate from "../axios/axiosPrivate";

const useUserUtility = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hasCheckedSession, setHasCheckedSession] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axiosPrivate.get("/me");
        dispatch(setLoggedin(true));
        dispatch(addUser(res.data));
      } catch (error) {
        if (error.response?.status === 401) {
          const pathname = window.location.pathname;
          if (pathname.includes("/reset-password")) {
            return;
          }
          console.log("HERE")
          dispatch(setLoggedin(false));
          dispatch(addUser(null));
          // Navigate to root route
          navigate("/", { replace: true });
        }
      } finally {
        // Always set session as loaded
        dispatch(setIsSessionLoaded(true));
        setHasCheckedSession(true);
      }
    };

  

    // Only fetch if session hasn't been checked yet
    if (!hasCheckedSession) {
      fetchUserDetails();
    }
  }, [dispatch, navigate, hasCheckedSession]);

  return null;
};



export default useUserUtility;
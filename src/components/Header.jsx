import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Popup from "./Popup";
import { LuLogOut, LuSettings, LuUserCircle2 } from "react-icons/lu";
import { FaArrowTrendUp } from "react-icons/fa6";
import { HiOutlineChartBar } from "react-icons/hi";
import { FaChartLine } from "react-icons/fa6";

import { GiHeartPlus } from "react-icons/gi";
import { MdOutlineArticle } from "react-icons/md";
import { useDashboardContext } from "@/lib/context/DashboardContext";
import PasswordChangeModal from "./PasswordChangeModal";
import axiosPrivate from "@/axios/axiosPrivate";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addUser, setIsSessionLoaded, setLoggedin } from "@/store/features/common/userSlice";
import { GrIndicator } from "react-icons/gr";
import { Login } from "@/pages/Login";

const Header = () => {
  const { pathname } = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
  });
  const navigate = useNavigate();
  const {
    setPageState,
    pageState,
    setShowRiskModal,
    setSelectedOpportunity,
    setSelectedOpportunityId,
  } = useDashboardContext();
  const dispatch = useDispatch();

  const isLoggedin = useSelector((state) => state.user.isLoggedin);
  function logout() {
    dispatch(setLoggedin(false));
    dispatch(setIsSessionLoaded(false));
    dispatch(addUser({}));

    localStorage.clear("access");
    localStorage.clear("refresh");
    navigate("/");
  }
  const popupItem = [
    {
      icon: <LuSettings size={20} />,
      label: "Change Password",
      func: () => setShowModal(true),
    },
    {
      icon: <LuLogOut size={20} />,
      label: "Logout",
      func: logout,
    },
  ];
  function reset() {
    setSelectedOpportunity({});
    setSelectedOpportunityId("");
    setPageState(0);
  }

  useEffect(() => {
 reset();
  }, [pathname]);

  const getActiveClass = (path) =>
    pathname.includes(path) ? "border-black" : "border-transparent";

  async function handleEdit() {
    try {
      const res = await axiosPrivate.post(
        "/update_user_password",
        formData
      );
      console.log(res);
      if (res.status === 200 && res.data.code === 0) {
        toast.success("Password Changed Successfully");
        setShowModal(false);
      }
    } catch (error) {
      toast.error(error.response.data.msg)
      console.error("ERR: ", error);
    }
  }
  function handleClick() {
    setShowLoginModal(true);
  }
  return (
    <div className="flex  gap-x-10 items-center shadow-md p-3 w-full">
      <PasswordChangeModal
        show={showModal}
        onSave={handleEdit}
        onClose={() => setShowModal(false)}
        formData={formData}
        setFormData={setFormData}
      />
      {pageState === 1 && (
        <div className="">
          <button
            onClick={() => setShowRiskModal(true)}
            className="border rounded-sm p-2 bg-orange-400 text-black font-semibold"
          >
            Plan Your Trade
          </button>
        </div>
      )}
    { setIsSessionLoaded &&  isLoggedin ?<div className="flex items-center ml-auto ">
        <div className="flex gap-x-4">
          <Link
            to="/breakout-strategy"
            className={`flex items-center gap-x-1 border-b-2 px-3 p-1 cursor-pointer hover:bg-gray-100 ${getActiveClass(
              "/breakout-strategy"
            )}`}
          >
            <FaArrowTrendUp size={18} />
            <p>Breakout Strategy</p>
          </Link>
          <Link
          onClick={reset}
            to="/dashboard"
            className={`flex items-center gap-x-1 border-b-2 px-3 p-1 cursor-pointer hover:bg-gray-100 ${getActiveClass(
              "/dashboard"
            )}`}
          >
            <FaChartLine size={18} />
            <p>SMC Strategy</p>
          </Link>
          <Link
            to="/performance"
            className={`flex items-center gap-x-1 border-b-2 px-3 p-1 cursor-pointer hover:bg-gray-100 ${getActiveClass(
              "/performance"
            )}`}
          >
            <HiOutlineChartBar size={18} />
            <p>Performance</p>
          </Link>
          <Link
            to="/breadth-indicators"
            className={`flex items-center gap-x-1 border-b-2 px-3 p-1 cursor-pointer hover:bg-gray-100 ${getActiveClass(
              "/breadth-indicators"
            )}`}
          >
            <GrIndicator size={18} />
            <p>S&P 500 Indicators</p>
          </Link>
          <Link
            to="/blogs"
            className={`flex items-center gap-x-1 border-b-2 px-3 p-1 cursor-pointer hover:bg-gray-100 ${getActiveClass(
              "/blogs"
            )}`}
          >
            <MdOutlineArticle size={18} />
            <p>Blogs</p>
          </Link>
        </div>
        <Popup width="18rem" data={popupItem}>
          <div>
            <LuUserCircle2 size={30} />
          </div>
        </Popup>
      </div> :
        <div className="flex justify-end w-full items-center gap-x-4">
        <Link
          to="/blogs"
          className={`flex items-center gap-x-1  text-lg px-3 p-1 cursor-pointer`}
        >
          <MdOutlineArticle size={23} />
          <p>Blogs</p>
        </Link>
        <LuUserCircle2 size={30}
          onClick={handleClick}
        />
      </div>}

      {showLoginModal && <Login setShowModal={setShowLoginModal} showModal={showLoginModal} />}

    </div>
  );
};

export default Header;

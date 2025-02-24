import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useLocation } from "react-router-dom";

export const Layout = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <div className="flex h-screen overflow-y-hidden">
      {pathname === "/dashboard" && <Sidebar />}
      <div className="overflow-y-scroll bg-[#f8fafc] w-full flex flex-col">
        <Header />
        <div className="flex h-full  mt-5 mx-5 pb-20 parent-bound">
          {children}

        </div>
      </div>
    </div>
  );
};

import React from "react";
import { LuSettings } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Popup = ({ data = [], children, width="10rem" }) => {
  return (
    <Popover>
      <PopoverTrigger onClick={e=>e.stopPropagation()}>{children}</PopoverTrigger>
      <PopoverContent className={`p-0 w-[${width}] mr-4`}>
        <div className="flex flex-col divide-y">
          {data.map((item, index) => (
            <div
              key={index}
              onClick={item.func}
              className="flex text-sm items-center gap-x-2 py-2 px-2 hover:bg-gray-100 cursor-pointer"
            >
              {item.icon}
              <p>{item.label}</p>
            </div>
          ))}
          {/* <div className="flex text-sm items-center gap-x-2 py-3 px-2 hover:bg-gray-100 cursor-pointer">
            <LuLogOut size={20} />
            <p>Log out</p>
          </div> */}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Popup;

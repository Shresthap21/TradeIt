import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip } from "antd";
import { BsQuestionCircleFill } from "react-icons/bs";
import { RxCheck, RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";

export default function PasswordChangeModal({
  show,
  onClose,
  formData,
  setFormData,
  onSave,
}) {
  const [errors, setErrors] = useState([]);
  const [currentPassError, setcurrentPassError] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "new_password") {
      setErrors((prev) => [
        checkLength(value),
        checkDigit(value),
        checkUppercase(value),
        checkLowercase(value),
        checkSymbol(value),
      ]);
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
  function handleSubmit(){
    if(errors.every(e=>e.status)){
      onSave()
    }else{
      toast.error("Invalid Password")
    }
  }
  useEffect(() => {
  console.log("err",errors)
  }, [errors])
  
  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Name Field */}
          <div>
            <label
              htmlFor="current_password"
              className="block text-sm font-medium"
            >
              Old Password
            </label>
            <input
              type="password"
              id="current_password"
              name="current_password"
              value={formData.current_password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
            {/* {errors.opportunity_name && (
              <p className="text-xs text-red-500 mt-1">
                {errors.opportunity_name}
              </p>
            )} */}
          </div>
          <div>
            <label htmlFor="new_password" className="block text-sm font-medium">
              New Password
            </label>
            <input
              type="password"
              id="new_password"
              name="new_password"
              value={formData.new_password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
            {/* {errors.opportunity_name && (
              <p className="text-xs text-red-500 mt-1">
                {errors.opportunity_name}
              </p>
            )} */}
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
        </div>
        <DialogFooter className="sm:justify-end">
          <button
            type="button"
            className="bg-slate-800 text-white p-1 rounded-sm px-3"
            onClick={handleSubmit}
          >
            Save
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

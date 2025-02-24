import axiosPrivate from "@/axios/axiosPrivate";
import { useDashboardContext } from "@/lib/context/DashboardContext";
import { Tooltip } from "antd";

import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { BsQuestionCircleFill } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { Oval } from "react-loader-spinner";
import { toast } from "react-toastify";

export default function CalculateRiskModal({ data }) {
  const [errors, setErrors] = useState({});
  const {
    selectedOpportunity,
    showRiskModal,
    setShowRiskModal,
    retrieveSelectedOpportunityData,
  } = useDashboardContext();
  const initialState = {
    stop_loss: 0,
    current_price: 0,
    target_level: 0,
    max_loss: 0,
    max_market_val: 0,
  };
  const [formData, setFormData] = useState(initialState);
  const [rewardData, setRewardData] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value),
    }));
  };
  function onClose() {
    // setFormData(initialState);
    setShowRiskModal(false);
    // setRewardData([]);
  }
  const validateForm = () => {
    const newErrors = {};

    const fieldsToValidate = [
      "current_price",
      "stop_loss",
      "target_level",
      "max_loss",
      "max_market_val",
    ];

    fieldsToValidate.forEach((field) => {
      if (formData[field] < 0) {
        newErrors[field] = `${field
          .replace("_", " ")
          .replace("_", " ")
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")} cannot be less than 0.`;
      }
    });

    // Additional specific validations can be added here
    return newErrors;
  };

  const handleSave = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSave();
  };

  async function onSave() {
    try {
      setLoading(true);
      const res = await axiosPrivate.post("/calculate_risk_reward", formData);
      console.log(res);
      if (res.status === 200) {
        toast.success(res?.data?.msg);
        setRewardData(Object.entries(res?.data?.output_dict));
      }
    } catch (error) {
      console.error("err", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      setFormData((prev) => ({
        ...prev,
        ...data,
      }));
    }
  }, [data]);
  if (!showRiskModal) {
    return null;
  }

  return (
    <Draggable handle=".draggable-handle" bounds=".parent-bound">
      <div className="w-[16rem] max-w-sm  bg-white border border-gray-300 rounded-md z-50 absolute select-none shadow-lg right-0">
        <div className="draggable-handle cursor-grab bg-neutral-100 px-4 py-2 rounded-t-md flex justify-between items-center">
          <span className="text-sm font-semibold">Plan Your Trade</span>
          <RxCross2
            className="cursor-pointer min-w-5 min-h-5"
            onClick={onClose}
          />
        </div>

        <div className="divide-y">
          <div className="p-4 space-y-4">
            <div className="flex gap-x-4">
              <div>
                <label
                  htmlFor="current_price"
                  className="block text-xs font-medium"
                >
                  Current Price $
                </label>
                <input
                  type="number"
                  id="current_price"
                  name="current_price"
                  value={formData.current_price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-1 text-xs border rounded"
                />
                {errors.current_price && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.current_price}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="stop_loss"
                  className="block text-xs font-medium"
                >
                  Stop Loss $
                </label>
                <input
                  type="number"
                  id="stop_loss"
                  name="stop_loss"
                  value={formData.stop_loss}
                  onChange={handleInputChange}
                  className="w-full px-3 py-1 text-xs border rounded"
                />
                {errors.stop_loss && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.stop_loss}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-x-4">
              <div>
                <label
                  htmlFor="target_level"
                  className="block text-xs font-medium"
                >
                  Target Price $
                </label>
                <input
                  type="number"
                  id="target_level"
                  name="target_level"
                  value={formData.target_level}
                  onChange={handleInputChange}
                  className="w-full px-3 py-1 text-xs border rounded"
                />
                {errors.target_level && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.target_level}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="max_loss"
                  className="text-xs font-medium flex items-center gap-x-1"
                >
                  Max Loss $
                  <Tooltip title="The maximum acceptable loss if price hits stop loss.">
                    <BsQuestionCircleFill />
                  </Tooltip>
                </label>
                <input
                  type="number"
                  id="max_loss"
                  name="max_loss"
                  value={formData.max_loss}
                  onChange={handleInputChange}
                  className="w-full px-3 py-1 text-xs border rounded"
                />
                {errors.max_loss && (
                  <p className="text-xs text-red-500 mt-1">{errors.max_loss}</p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="max_market_val"
                className="flex items-center gap-x-1 text-xs font-medium"
              >
                Max Amonut $
                <Tooltip title="The maximum amount you are willing to spend on this trade.">
                  <BsQuestionCircleFill />
                </Tooltip>
              </label>
              <input
                type="number"
                id="max_market_val"
                name="max_market_val"
                value={formData.max_market_val}
                onChange={handleInputChange}
                className="w-full px-3 py-1 text-xs border rounded"
              />
              {errors.max_market_val && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.max_market_val}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="px-4 py-1 ring-2 ring-orange-500 text-sm bg-orange-50 text-orange-500 rounded font-semibold"
                onClick={handleSave}
              >
                Calculate
              </button>
            </div>
          </div>

          {rewardData.length > 0 && loading ? (
            <div className="flex justify-center py-4">
              <Oval
                visible={true}
                height="25"
                width="25"
                color="#f97316  "
                strokeWidth={4}
                secondaryColor="#"
              />
            </div>
          ) : (
            <div className="">
              <ul className="p-4 divide-y divide-neutral-300 ">
                {console.log(rewardData)}
                {rewardData?.map((e) => (
                  <li className="text-xs flex justify-between p-1">
                    {e[0]}
                    <span className="font-medium">{e[1]}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Draggable>
  );
}

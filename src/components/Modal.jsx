import React, { useState } from "react";
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

export default function Modal({
  show,
  onClose,
  formData,
  setFormData,
  onSave,
}) {
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Reset error for the field being updated
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.opportunity_name.trim()) {
      newErrors.opportunity_name = "Name cannot be empty.";
    }
    if (formData.stop_loss < 0) {
      newErrors.stop_loss = "Stop Loss cannot be less than 0.";
    }
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

  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Name Field */}
          <div>
            <label
              htmlFor="opportunity_name"
              className="block text-sm font-medium"
            >
              Name
            </label>
            <input
              type="text"
              id="opportunity_name"
              name="opportunity_name"
              value={formData.opportunity_name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.opportunity_name && (
              <p className="text-xs text-red-500 mt-1">
                {errors.opportunity_name}
              </p>
            )}
          </div>

          {/* Stop Loss Field */}
          <div>
            <label htmlFor="stop_loss" className="block text-sm font-medium">
              Stop Loss (Number)
            </label>
            <input
              type="number"
              id="stop_loss"
              name="stop_loss"
              value={formData.stop_loss}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.stop_loss && (
              <p className="text-xs text-red-500 mt-1">{errors.stop_loss}</p>
            )}
          </div>

          {/* Notify User Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="notify_user"
              name="notify_user"
              checked={formData.notify_user}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, notify_user: checked }))
              }
            />
            <label
              htmlFor="notify_user"
              className="text-sm font-medium leading-none flex gap-x-1"
            >
              Send Notifications <Tooltip title=" If set to False, we will not send you notifications, but you can still follow the events triggered for this trade in the Past Activity section of the page.">
                <BsQuestionCircleFill/>
              </Tooltip>
            </label>
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <button
              type="button"
              className="bg-red-500 text-white p-1 rounded-sm px-3"
              onClick={onClose}
            >
              Discard
            </button>
          </DialogClose>

          <button
            type="button"
            className="bg-slate-800 text-white p-1 rounded-sm px-3"
            onClick={handleSave}
          >
            Save
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

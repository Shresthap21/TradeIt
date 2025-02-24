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

export default function FeedbackModal({
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
      [name] : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject cannot be empty.";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message cannot be empty.";
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
          <DialogTitle>Feedback Form</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Name Field */}
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.subject && (
              <p className="text-xs text-red-500 mt-1">
                {errors.subject}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium"
            >
              Message
            </label>
            <textarea
              type="text"
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.message && (
              <p className="text-xs text-red-500 mt-1">
                {errors.message}
              </p>
            )}
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
            Send
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

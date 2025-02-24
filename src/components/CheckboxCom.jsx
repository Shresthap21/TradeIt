"use client";

import { Checkbox } from "@/components/ui/checkbox";

export default function CheckboxCom({ name, selected, setSelected }) {
  const handleInput = (value) => {
    setSelected((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={name}
        checked={selected[name]}
        onCheckedChange={(checked) => handleInput(checked)}
      />
      <label
        htmlFor={name}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Use Advanced Entry
      </label>
    </div>
  );
}

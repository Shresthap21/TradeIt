import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SwitchBtn({ title, selected, setSelected }) {

  const handleSwitchChange = () => {
    setSelected((prevState) => !prevState);
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="toggle-switch"
        checked={selected}
        onCheckedChange={handleSwitchChange}
      />
      <Label style={{fontSize:'12px'}} htmlFor="toggle-switch">{title}</Label>
    </div>
  );
}

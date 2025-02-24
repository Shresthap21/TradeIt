import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Selector({
  note = "withoutid",
  data = [],
  selected,
  setSelected,
  placeholder,
  name,
  width = "180px",
}) {
  function handleChange(e) {
    setSelected({ target: { name, value: e } });
  }
  return (
    <Select  value={selected} onValueChange={handleChange}>
      <SelectTrigger
        className={`w-[${width}] focus:ring-0 focus:ring-offset-0`}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="">
        {note == "withid" ? (
          <SelectGroup>
            {data.map((e,index) => (
              <SelectItem className="cursor-pointe text-center " key={index} value={e.id}>
               <span className="text-center">
               {e.value}
                </span> 
              </SelectItem>
            ))}
          </SelectGroup>
        ) : (
          <SelectGroup>
            {data.map((e) => {
              return (
                <SelectItem className="cursor-pointer text-center" key={e} value={e}>
                  {e}
                </SelectItem>
              );
            })}
          </SelectGroup>
        )}
      </SelectContent>
    </Select>
  );
}

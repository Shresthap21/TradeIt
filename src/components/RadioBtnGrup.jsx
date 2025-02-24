import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function RadioBtnGrup({ width, selected, setSelected, name }) {
  const handleChange = (value) => {
    setSelected({
      target: {
        name: name,
        value: value,
      },
    });
  };

  return (
    <div className={`flex w-fit  justify-between my-3 border rounded-md`}>
      <div onClick={()=>handleChange("15m")} className={`flex items-center space-x-2 w-12 cursor-pointer justify-center ${selected==="15m"?" bg-gray-200 p-2 rounded-md font-semibold":""}`}>
        15m
      </div>
      <div onClick={()=>handleChange("1h")} className={`flex items-center space-x-2 w-12 cursor-pointer justify-center ${selected==="1h"?" bg-gray-200 p-2 rounded-md font-semibold":""}`}>1h</div>
      <div onClick={()=>handleChange("1d")} className={`flex items-center space-x-2 w-12 cursor-pointer justify-center ${selected==="1d"?" bg-gray-200 p-2 rounded-md font-semibold":""}`}>1d</div>
    </div>
  );
}

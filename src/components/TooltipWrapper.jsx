import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function TooltipWrapper({children,hoverMsg="", content}) {
  console.log(hoverMsg)
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild className="cursor-pointer">
          {children}
        </TooltipTrigger>
       {hoverMsg ? <TooltipContent>
          <div className="text-xs max-w-[20rem]">{hoverMsg}</div>
        </TooltipContent>:
        <TooltipContent >
          {content}
      </TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
}

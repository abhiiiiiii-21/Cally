import React from "react";
import { ArrowRight, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const InteractiveHoverButton = React.forwardRef(({ text, className, ...props }, ref) => {
  return (
    <button ref={ref}
      className={cn(
        "group relative w-43 cursor-pointer overflow-hidden rounded-full border bg-background py-2 text-center font-semibold font-urbanist ",
        className
      )}
      {...props}>
      <span
        className="inline-block translate-x-1 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
        {text}
      </span>
      <div
        className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-1 text-primary-foreground opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
        <span>{text}</span>
        <ChevronRightIcon height={20} width={20} className="font-semibold"/>
      </div>
      <div
        className="absolute left-[20%] top-[40%] h-1.5 w-1.5 scale-[1] rounded-lg bg-primary transition-all duration-300 group-hover:left-[0%] group-hover:top-[0%] group-hover:h-full group-hover:w-full group-hover:scale-[1.8] group-hover:bg-primary"></div>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };

import React from "react";
import { cn } from "@/lib/utils";

export default function AnimatedGradientText({ children, className }) {
  return (
    <span
      className={cn(
        "group relative mx-auto flex max-w-fit flex-row items-center justify-center  px-4 py-1.5 text-4xl font-bold [--bg-size:300%]  ",
        className
      )}
    >
      
      {/* <div
        className={`absolute inset-0 block h-full w-full animate-gradient bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:var(--bg-size)_100%] p-[1px] ![mask-composite:subtract] [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]`}
      />  */}
      {children}
    </span>
  );
}

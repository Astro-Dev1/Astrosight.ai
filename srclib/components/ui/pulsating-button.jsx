import React from "react";
import { cnp } from "../../lib/utils"; // Ensure correct import path for the cn utility

export function PulsatingButton({
  className,
  children,
  pulseColor = "#0096ff",
  duration = "1.5s",
  ...props
}) {
  return (
    <button
      className={cnp(
        "relative text-center cursor-pointer flex justify-center items-center rounded-lg text-white dark:text-black bg-blue-500 dark:bg-blue-500 px-4 py-2",
        className
      )}
      style={{
        "--pulse-color": pulseColor,
        "--duration": duration,
      }}
      {...props}
    >
      <div className="relative z-10">{children}</div>
      <div className="absolute top-1/2 left-1/2 size-full rounded-lg bg-inherit animate-pulse -translate-x-1/2 -translate-y-1/2" />
    </button>
  );
}

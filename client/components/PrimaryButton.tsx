"use client";

import * as React from "react";

export type PrimaryButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  fullWidth?: boolean;
};

export function PrimaryButton({
  className = "",
  fullWidth,
  children,
  ...props
}: PrimaryButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full border border-amber-300/20 " +
    "bg-amber-300/15 px-5 py-2.5 text-sm font-medium tracking-wide text-amber-100 " +
    "shadow-[0_0_0_1px_rgba(250,250,249,0.02)] " +
    "transition-colors transition-shadow duration-300 " +
    "hover:bg-amber-300/25 hover:shadow-[0_0_30px_rgba(245,224,166,0.25)] " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/60 focus-visible:ring-offset-0 " +
    "disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:shadow-none";

  const width = fullWidth ? " w-full" : " w-auto";

  return (
    <button className={base + width + " " + className} {...props}>
      {children}
    </button>
  );
}


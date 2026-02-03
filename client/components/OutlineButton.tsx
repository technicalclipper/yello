"use client";

import * as React from "react";

export type OutlineButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    fullWidth?: boolean;
  };

export function OutlineButton({
  className = "",
  fullWidth,
  children,
  ...props
}: OutlineButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full border border-amber-200/40 " +
    "bg-transparent px-4 py-2 text-sm font-medium tracking-wide text-amber-100 " +
    "shadow-[0_0_0_1px_rgba(250,250,249,0.06)] " +
    "transition-colors transition-shadow duration-300 " +
    "hover:bg-amber-100/5 hover:shadow-[0_0_26px_rgba(245,224,166,0.18)] " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/60 focus-visible:ring-offset-0 " +
    "disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:shadow-none";

  const width = fullWidth ? " w-full" : " w-auto";

  return (
    <button className={base + width + " " + className} {...props}>
      {children}
    </button>
  );
}


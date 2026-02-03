"use client";

import * as React from "react";

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: keyof JSX.IntrinsicElements;
};

export function Card({
  as: Component = "div",
  className = "",
  children,
  ...props
}: CardProps) {
  const base =
    "rounded-3xl border border-zinc-800/80 bg-zinc-900/70 " +
    "shadow-[0_20px_60px_rgba(0,0,0,0.7)] backdrop-blur-xl " +
    "px-6 py-5 sm:px-8 sm:py-7";

  return (
    <Component className={base + " " + className} {...props}>
      {children}
    </Component>
  );
}


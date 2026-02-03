"use client";

import * as React from "react";

export function Loader() {
  return (
    <div className="relative flex h-20 w-20 items-center justify-center">
      <div className="h-14 w-14 rounded-full border border-amber-200/10 bg-amber-100/5 blur-[1px]" />
      <div className="absolute h-12 w-12 rounded-full border border-amber-300/40" />
      <div className="absolute h-16 w-16 rounded-full border border-amber-200/20 opacity-60 animate-ping" />
      <div className="absolute h-2 w-2 rounded-full bg-amber-200 shadow-[0_0_20px_rgba(250,224,167,0.9)]" />
    </div>
  );
}


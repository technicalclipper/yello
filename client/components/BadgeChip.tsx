"use client";

import * as React from "react";

export type BadgeChipProps = {
  label: string;
  className?: string;
};

export function BadgeChip({ label, className = "" }: BadgeChipProps) {
  const base =
    "inline-flex items-center gap-2 rounded-full border border-emerald-300/20 " +
    "bg-emerald-300/5 px-3 py-1 text-xs font-medium tracking-wide text-emerald-100/90 " +
    "shadow-[0_0_0_1px_rgba(16,185,129,0.12)] backdrop-blur-sm";

  return (
    <div className={base + " " + className}>
      <span className="flex h-1.5 w-1.5 items-center justify-center">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
      </span>
      <span className="text-[0.7rem] uppercase tracking-[0.18em]">
        {label}
      </span>
    </div>
  );
}


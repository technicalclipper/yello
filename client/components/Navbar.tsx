"use client";

import * as React from "react";
import Link from "next/link";
import { OutlineButton } from "./OutlineButton";

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-zinc-900/80 bg-black/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/landing"
          className="flex items-center gap-2 text-sm font-semibold tracking-[0.22em] text-zinc-100"
        >
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-300/15 text-[0.7rem] text-amber-200 shadow-[0_0_18px_rgba(245,224,166,0.4)]">
            ●
          </span>
          <span className="uppercase">Yello!</span>
        </Link>

        <OutlineButton className="text-xs uppercase tracking-[0.22em] text-zinc-100/90 hover:text-amber-100">
          Connect Wallet
        </OutlineButton>
      </div>
    </header>
  );
}


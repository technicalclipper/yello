"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { OutlineButton } from "./OutlineButton";

export type NavbarProps = {
  sessionTime?: string;
  balance?: number;
};

export function Navbar({ sessionTime, balance }: NavbarProps) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/landing";
  const isCallPage = pathname === "/call";

  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-zinc-900/80 bg-black/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/landing"
          className="flex items-center gap-3 text-lg font-semibold tracking-[0.22em] text-zinc-100"
        >
          <Image
            src="/logo_crop.png"
            alt="Yello Logo"
            width={80}
            height={80}
            className="h-20 w-20 object-contain"
          />
          <span >time well spent</span>
        </Link>

        {isCallPage && sessionTime && balance !== undefined && (
          <div className="flex items-center gap-6 ml-auto">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs uppercase tracking-[0.22em] text-emerald-200/80 font-medium">
                Live Session
              </span>
              <span className="text-xs text-zinc-500 ml-2">{sessionTime}</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-zinc-800 bg-black/50 px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-300" />
              <p className="text-xs uppercase tracking-[0.22em] text-zinc-300">
                Balance
              </p>
              <p className="text-xs font-medium text-amber-100">
                {balance.toFixed(4)} ETH
              </p>
            </div>
          </div>
        )}

        {isLandingPage && (
          <OutlineButton className="text-xs uppercase tracking-[0.22em] text-zinc-100/90 hover:text-amber-100">
            Connect Wallet
          </OutlineButton>
        )}
      </div>
    </header>
  );
}


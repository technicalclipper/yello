"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { User } from "lucide-react";
import gsap from "gsap";

import { OutlineButton } from "./OutlineButton";
import { Sheet, SheetContent, SheetTrigger } from "./sheet";
import  ProfileBadgePanel  from "@/components/ProfileBadgePanel";
import { useWallet } from "@/hooks/useWallet";

export type NavbarProps = {
  sessionTime?: string;
  balance?: number;
};

export function Navbar({ sessionTime, balance }: NavbarProps) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/landing";
  const isCallPage = pathname === "/call";
  const { address, isConnected, connectWallet, disconnectWallet, isWrongNetwork } = useWallet();

  const avatarRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (!avatarRef.current) return;

    const el = avatarRef.current;

    const onEnter = () =>
      gsap.to(el, {
        scale: 1.08,
        duration: 0.25,
        ease: "power2.out",
      });

    const onLeave = () =>
      gsap.to(el, {
        scale: 1,
        duration: 0.25,
        ease: "power2.out",
      });

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

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
          <span>time well spent</span>
        </Link>

        {isLandingPage && (
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <button
                  ref={avatarRef}
                  className="cursor-target relative w-10 h-10 rounded-full bg-gradient-to-br from-amber-300/30 to-amber-200/20 border border-amber-300/40 flex items-center justify-center"
                >
                  <User className="w-5 h-5 text-amber-200" />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border border-black" />
                </button>
              </SheetTrigger>

              <SheetContent className="p-0">
                <ProfileBadgePanel />
              </SheetContent>
            </Sheet>

            {isConnected ? (
              <div className="flex items-center gap-3">
                {isWrongNetwork && (
                  <span className="text-xs text-rose-400">Wrong Network</span>
                )}
                <span className="text-xs text-zinc-400 font-mono">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </span>
                <OutlineButton
                  onClick={disconnectWallet}
                  className="cursor-target text-xs uppercase tracking-[0.22em] text-zinc-100/90 hover:text-amber-100"
                >
                  Disconnect
                </OutlineButton>
              </div>
            ) : (
              <OutlineButton
                onClick={connectWallet}
                className="cursor-target text-xs uppercase tracking-[0.22em] text-zinc-100/90 hover:text-amber-100"
              >
                Connect Wallet
              </OutlineButton>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

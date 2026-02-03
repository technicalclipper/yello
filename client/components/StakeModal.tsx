"use client";

import * as React from "react";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { Card } from "./Card";
import { PrimaryButton } from "./PrimaryButton";

type StakeModalProps = {
  open: boolean;
  onClose: () => void;
};

export function StakeModal({ open, onClose }: StakeModalProps) {
  const router = useRouter();
  const backdropRef = React.useRef<HTMLDivElement | null>(null);
  const cardRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!open) return;
    const backdrop = backdropRef.current;
    const card = cardRef.current;
    if (!backdrop || !card) return;

    gsap.fromTo(
      backdrop,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: "power2.out" }
    );

    gsap.fromTo(
      card,
      { opacity: 0, y: 20, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.05,
      }
    );
  }, [open]);

  if (!open) return null;

  const enterSession = () => {
    onClose();
    router.push("/match");
  };

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        ref={cardRef}
        className="w-full max-w-md px-4 sm:px-0"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-200/70">
              Session Commitment
            </p>
            <h2 className="text-xl font-semibold text-zinc-50">
              Anchor your time with intent.
            </h2>
            <p className="text-sm text-zinc-400">
              Choose an amount that feels meaningful, not stressful. Your time
              should serve the conversation, not the other way around.
            </p>
          </div>

          <div className="space-y-3">
            <label className="block text-sm text-zinc-300">
              Amount to commit
              <div className="mt-2 flex items-center gap-2 rounded-2xl border border-zinc-700 bg-black/40 px-3 py-2.5">
                <input
                  type="text"
                  placeholder="0.05"
                  className="flex-1 bg-transparent text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none"
                />
                <span className="rounded-full border border-zinc-600 px-2 py-0.5 text-[0.65rem] uppercase tracking-[0.18em] text-zinc-300">
                  ETH
                </span>
              </div>
            </label>
            <p className="text-xs text-zinc-500">
              Unused time is returned automatically. You keep ownership of your
              attention.
            </p>
          </div>

          <div className="flex items-center justify-between gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-medium text-zinc-500 transition-colors hover:text-zinc-300"
            >
              Not now
            </button>
            <PrimaryButton onClick={enterSession}>Enter Session</PrimaryButton>
          </div>
        </Card>
      </div>
    </div>
  );
}


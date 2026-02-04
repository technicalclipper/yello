"use client";

import { Award, TrendingUp, Zap } from "lucide-react";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export function ProfileBadgePanel() {
  const badgeListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!badgeListRef.current) return;

    gsap.fromTo(
      badgeListRef.current.children,
      { y: 12, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.4,
        ease: "power2.out",
        delay: 0.15,
      }
    );
  }, []);

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-zinc-900 to-black text-zinc-100">
      {/* Header */}
      <div className="px-6 py-6 border-b border-zinc-800">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-300 to-amber-200 flex items-center justify-center">
            <span className="text-sm font-bold text-amber-900">Y</span>
          </div>
          <div>
            <p className="text-sm font-semibold">User Name</p>
            <p className="text-xs text-zinc-500">Member since Jan 2026</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 py-6 border-b border-zinc-800">
        <p className="text-xs uppercase tracking-widest text-zinc-500 mb-4">
          Stats
        </p>
        <div className="grid grid-cols-2 gap-4">
          {[
            ["Sessions", "12"],
            ["Total Time", "4h 28m"],
            ["Earned", "0.024 ETH"],
            ["Rating", "4.8 ⭐"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-lg bg-zinc-800/40 p-3"
            >
              <p className="text-xs text-zinc-400">{label}</p>
              <p className="text-2xl font-bold text-amber-100 mt-1">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <p className="text-xs uppercase tracking-widest text-zinc-500 mb-4">
          Badges Earned
        </p>

        <div ref={badgeListRef} className="space-y-3">
          <Badge
            icon={<Award className="w-5 h-5" />}
            title="First Connection"
            desc="Completed your first session"
          />
          <Badge
            icon={<TrendingUp className="w-5 h-5" />}
            title="Rising Star"
            desc="Completed 10+ sessions"
          />
          <Badge
            icon={<Zap className="w-5 h-5" />}
            title="Streak Master"
            desc="7-day consecutive sessions"
            locked
          />
          
        </div>
      </div>
    </div>
  );
}

function Badge({
  icon,
  title,
  desc,
  locked,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  locked?: boolean;
}) {
  return (
    <div
      className={`rounded-lg p-4 flex gap-3 border ${
        locked
          ? "bg-zinc-800/30 border-zinc-700/30 opacity-50"
          : "bg-gradient-to-r from-amber-500/10 to-amber-400/5 border-amber-400/30"
      }`}
    >
      <div className="text-amber-300 mt-1">{icon}</div>
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs text-zinc-400 mt-1">{desc}</p>
      </div>
    </div>
  );
}

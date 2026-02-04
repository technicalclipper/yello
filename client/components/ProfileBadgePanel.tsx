"use client";

import Stepper, { Step } from "./Stepper";
import {
  Award,
  TrendingUp,
  Zap,
  Crown,
  Clock,
  Hash,
  Star,
} from "lucide-react";

/* ---------------- Badge Levels ---------------- */

const BADGE_LEVELS = [
  {
    title: "First Connection",
    desc: "Complete your first session",
    icon: <Award className="w-5 h-5" />,
  },
  {
    title: "Regular",
    desc: "Complete 5 sessions",
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    title: "Rising Star",
    desc: "Complete 10 sessions",
    icon: <Zap className="w-5 h-5" />,
  },
  {
    title: "Master Listener",
    desc: "Complete 25 sessions",
    icon: <Crown className="w-5 h-5" />,
  },
];

/* ---------------- Component ---------------- */

export default function ProfileBadgePanel() {
  // Example: user has reached level 2 (0-based)
  const currentLevel = 1;

  return (
    <div className="h-full overflow-y-auto bg-black text-zinc-100">

      {/* Header */}
      <div className="px-6 py-6 border-b border-zinc-800 sticky top-0 bg-black">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-300 to-amber-200 flex items-center justify-center">
            <span className="text-lg font-bold text-amber-900">Y</span>
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
          Overview
        </p>

        <div className="grid grid-cols-3 gap-3">
          <Stat icon={<Clock />} label="Avg Time" value="22m" />
          <Stat icon={<Hash />} label="Sessions" value="12" />
          <Stat icon={<Star />} label="Rating" value="4.8" />
        </div>
      </div>

      {/* Stepper */}
      <div className="px-6 py-6">
        <p className="text-xs uppercase tracking-widest text-zinc-500 mb-4">
          Badge Progress
        </p>

        <Stepper
  initialStep={currentLevel}
  backButtonText="Back"
  nextButtonText="Unlock Next"
  className="
    !text-amber-400

    /* Step numbers / icons */
    [&_svg]:!text-amber-400
    [&_[data-step-active='true']]:!text-amber-400
    [&_[data-step-completed='true']]:!text-amber-400

    /* Step labels */
    [&_[data-step-label]]:!text-amber-400

    /* Connector lines */
    [&_[data-step-line]]:!bg-amber-400/40

    /* Buttons — TEXT ONLY */
    [&_button]:!bg-transparent
    [&_button]:!text-amber-400
    [&_button:hover]:!text-amber-300
    [&_button]:!border-none
    [&_button]:cursor-target

    /* Disabled buttons */
    [&_button:disabled]:!text-zinc-500
  "
>

          {BADGE_LEVELS.map((level, index) => {
            const attained = index <= currentLevel;

            return (
              <Step key={level.title}>
                <div className="rounded-xl border border-amber-400/30 bg-zinc-900 p-4">
                  <div className="flex items-center gap-3 mb-2 text-amber-400">
                    {level.icon}
                    <p className="text-sm font-semibold">
                      {level.title}
                    </p>
                  </div>

                  <p
                    className={`text-xs ${
                      attained
                        ? "text-red-400"
                        : "text-zinc-500"
                    }`}
                  >
                    {level.desc}
                  </p>
                </div>
              </Step>
            );
          })}
        </Stepper>
      </div>
    </div>
  );
}

/* ---------------- Small Stat Card ---------------- */

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-zinc-900 p-3 text-center border border-zinc-800">
      <div className="flex justify-center text-amber-400 mb-1">
        {icon}
      </div>
      <p className="text-xs text-zinc-400">{label}</p>
      <p className="text-lg font-bold text-amber-200 mt-1">
        {value}
      </p>
    </div>
  );
}

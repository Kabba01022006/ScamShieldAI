import React from 'react';
import { BADGES, useSafetyStore } from '../store/useSafetyStore';
import { Lock, CheckCircle2 } from 'lucide-react';

/**
 * BadgeList Component
 * Displays all cyber defense badges.
 * Unlocked badges are highlighted with active colors.
 * Locked badges are muted/greyed out with a lock icon and hint on how to unlock.
 */
export const BadgeList = ({ unlockedBadgeIds }) => {
  // Use selector to subscribe only to unlocked badges if not passed via props
  const storeBadges = useSafetyStore((state) => state.badges);
  const unlocked = new Set(unlockedBadgeIds || storeBadges);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
          Defense Achievements ({unlocked.size} / {BADGES.length} Unlocked)
        </h3>
        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Earn badges by taking quizzes, scanning messages, and reporting fraud
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {BADGES.map((badge) => {
          const isUnlocked = unlocked.has(badge.id);

          return (
            <div
              key={badge.id}
              title={`Criteria: ${badge.requirement}`}
              className={`group relative p-3.5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                isUnlocked
                  ? 'bg-gradient-to-br from-white to-emerald-50/50 dark:from-slate-900 dark:to-emerald-950/20 border-emerald-300 dark:border-emerald-600/40 shadow-sm shadow-emerald-500/10'
                  : 'bg-slate-50/70 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-80'
              }`}
            >
              {/* Top row: Icon + Status Pill */}
              <div className="flex items-start justify-between gap-2">
                <span className="text-2xl select-none" role="img" aria-label={badge.name}>
                  {badge.icon}
                </span>

                {isUnlocked ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    <span>Unlocked</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    <Lock className="w-3 h-3" />
                    <span>Locked</span>
                  </span>
                )}
              </div>

              {/* Badge Name & Description */}
              <div className="mt-2.5 space-y-1">
                <h4
                  className={`text-sm font-extrabold tracking-tight ${
                    isUnlocked
                      ? 'text-slate-900 dark:text-white'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {badge.name}
                </h4>
                <p className="text-[11px] leading-snug text-slate-500 dark:text-slate-400">
                  {badge.description}
                </p>
              </div>

              {/* Tooltip hint on hover */}
              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[10px] font-mono text-slate-400 dark:text-slate-500">
                <span>🎯 {badge.requirement}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

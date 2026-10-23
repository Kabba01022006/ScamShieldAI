import React from 'react';

/**
 * Circular SVG Progress Ring for Cyber Safety Score
 * Levels:
 * - < 40: Red / Rose (Vulnerable / High Risk)
 * - 40 - 70: Amber / Yellow (Moderate / Alert Citizen)
 * - > 70: Emerald / Green (Secure / Cyber Guardian)
 *
 * Props:
 * - score: number (0-100)
 * - size: 'sm' (for Navbar) | 'md' | 'lg' (for Safety Page)
 * - showLabel: boolean (optional subtitle)
 */
export const SafetyScoreRing = ({ score = 20, size = 'md', showLabel = false, className = '' }) => {
  // Clamp score
  const safeScore = Math.max(0, Math.min(100, Math.round(score)));

  // Color configuration based on score level
  const getColor = () => {
    if (safeScore < 40) {
      return {
        stroke: '#f43f5e', // rose-500
        text: 'text-rose-600 dark:text-rose-400',
        bg: 'bg-rose-50 dark:bg-rose-950/40',
        border: 'border-rose-200 dark:border-rose-800',
        label: 'Beginner'
      };
    }
    if (safeScore <= 70) {
      return {
        stroke: '#f59e0b', // amber-500
        text: 'text-amber-600 dark:text-amber-400',
        bg: 'bg-amber-50 dark:bg-amber-950/40',
        border: 'border-amber-200 dark:border-amber-800',
        label: 'Alert Citizen'
      };
    }
    return {
      stroke: '#10b981', // emerald-500
      text: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
      border: 'border-emerald-200 dark:border-emerald-800',
      label: 'Cyber Guardian'
    };
  };

  const color = getColor();

  // Dimensions based on size prop
  const config = {
    sm: {
      dimension: 34,
      strokeWidth: 3.5,
      radius: 13,
      fontSize: 'text-[10px] font-bold font-mono',
      showSubtext: false
    },
    md: {
      dimension: 72,
      strokeWidth: 5.5,
      radius: 28,
      fontSize: 'text-lg font-extrabold font-mono',
      showSubtext: false
    },
    lg: {
      dimension: 140,
      strokeWidth: 9,
      radius: 56,
      fontSize: 'text-4xl font-black font-mono tracking-tight',
      showSubtext: true
    }
  }[size] || {
    dimension: 72,
    strokeWidth: 5.5,
    radius: 28,
    fontSize: 'text-lg font-extrabold font-mono',
    showSubtext: false
  };

  const circumference = 2 * Math.PI * config.radius;
  const strokeDashoffset = circumference - (safeScore / 100) * circumference;

  return (
    <div className={`relative inline-flex flex-col items-center justify-center ${className}`}>
      <div
        className="relative flex items-center justify-center"
        style={{ width: config.dimension, height: config.dimension }}
      >
        <svg
          className="w-full h-full -rotate-90 transform"
          viewBox={`0 0 ${config.dimension} ${config.dimension}`}
        >
          {/* Background circle track */}
          <circle
            cx={config.dimension / 2}
            cy={config.dimension / 2}
            r={config.radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth={config.strokeWidth}
            className="text-slate-200 dark:text-slate-700/60"
          />
          {/* Animated active score progress circle */}
          <circle
            cx={config.dimension / 2}
            cy={config.dimension / 2}
            r={config.radius}
            fill="transparent"
            stroke={color.stroke}
            strokeWidth={config.strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Center score readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center select-none pointer-events-none">
          <span className={`${config.fontSize} ${color.text} leading-none`}>
            {safeScore}
          </span>
          {config.showSubtext && (
            <span className="text-[11px] font-semibold text-slate-400 mt-1 uppercase tracking-wider font-mono">
              / 100
            </span>
          )}
        </div>
      </div>

      {showLabel && (
        <span
          className={`mt-2 px-2.5 py-0.5 rounded-full text-xs font-bold border ${color.bg} ${color.border} ${color.text}`}
        >
          {color.label}
        </span>
      )}
    </div>
  );
};

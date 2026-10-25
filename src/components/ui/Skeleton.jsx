import React from 'react';

/**
 * Reusable Skeleton loader for async loading states.
 * Supports:
 * - 'card': Mimics ScamCard structure with headers, content box, lines, and footer
 * - 'line' / 'text-line': Single or multiple animated shimmer text bars
 * - 'input': Shimmer placeholder for form inputs
 */
export const Skeleton = ({ variant = 'card', count = 1, className = '' }) => {
  const items = Array.from({ length: count }, (_, i) => i);

  if (variant === 'card') {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {items.map((i) => (
          <div
            key={i}
            className="animate-pulse bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm"
            aria-hidden="true"
          >
            {/* Top row: tags and date */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-6 w-20 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                <div className="h-6 w-24 bg-slate-200 dark:bg-slate-800 rounded-full" />
              </div>
              <div className="h-4 w-16 bg-slate-200 dark:bg-slate-800 rounded" />
            </div>

            {/* Title */}
            <div className="h-5 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-md" />

            {/* Contact Point Box */}
            <div className="h-10 w-full bg-slate-100 dark:bg-slate-950 rounded-xl" />

            {/* Description lines */}
            <div className="space-y-2">
              <div className="h-3.5 w-full bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-3.5 w-5/6 bg-slate-200 dark:bg-slate-800 rounded" />
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Text-line variant (default or 'text-line' / 'line')
  return (
    <div className={`space-y-2.5 animate-pulse ${className}`} aria-hidden="true">
      {items.map((i) => (
        <div
          key={i}
          className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md"
          style={{ width: i === items.length - 1 && items.length > 1 ? '70%' : '100%' }}
        />
      ))}
    </div>
  );
};

export default Skeleton;

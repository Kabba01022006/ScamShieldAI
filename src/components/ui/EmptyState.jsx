import React from 'react';
import { SearchX } from 'lucide-react';

/**
 * Reusable EmptyState component.
 * Displays when queries or lists return zero results.
 *
 * @param {Object} props
 * @param {React.ReactNode} [props.icon] - Custom icon component
 * @param {string} [props.title] - Heading text
 * @param {string|React.ReactNode} [props.description] - Descriptive text or node
 * @param {React.ReactNode} [props.action] - Optional action button or link
 * @param {string} [props.badgeText] - Optional status tag above the title
 * @param {string} [props.className] - Extra wrapper classes
 */
export const EmptyState = ({
  icon,
  title = 'No Records Found',
  description = 'No matching entries were found matching your current query.',
  action,
  badgeText,
  className = '',
}) => {
  return (
    <div
      className={`max-w-xl mx-auto p-8 sm:p-10 bg-slate-50/80 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-3xl text-center space-y-4 shadow-sm ${className}`}
    >
      {/* Icon */}
      <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center border border-slate-300 dark:border-slate-700">
        {icon || <SearchX className="w-7 h-7" />}
      </div>

      {/* Optional Badge */}
      {badgeText && (
        <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
          {badgeText}
        </span>
      )}

      {/* Text */}
      <div className="space-y-1.5">
        <h3 className="text-lg font-black text-slate-900 dark:text-white">
          {title}
        </h3>
        {typeof description === 'string' ? (
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-md mx-auto">
            {description}
          </p>
        ) : (
          description
        )}
      </div>

      {/* Action CTA */}
      {action && <div className="pt-2 flex justify-center">{action}</div>}
    </div>
  );
};

export default EmptyState;

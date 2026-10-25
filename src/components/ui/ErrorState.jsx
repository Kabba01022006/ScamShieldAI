import React from 'react';
import { AlertTriangle, RefreshCw, WifiOff } from 'lucide-react';

/**
 * Reusable ErrorState component.
 * Displays error feedback and provides a prominent Retry button.
 *
 * @param {Object} props
 * @param {string|Error} props.error - Error object or string message
 * @param {Function} props.onRetry - Callback to re-run the failed action
 * @param {string} [props.title] - Optional headline
 * @param {boolean} [props.isRetrying] - Optional loading spinner on retry button
 * @param {string} [props.className] - Optional extra wrapper classes
 */
export const ErrorState = ({
  error,
  onRetry,
  title = 'Registry Request Failed',
  isRetrying = false,
  className = '',
}) => {
  const errorMessage =
    typeof error === 'string'
      ? error
      : error?.message || 'An unexpected error occurred while communicating with the service.';

  const isNetworkIssue =
    errorMessage.toLowerCase().includes('network') ||
    errorMessage.toLowerCase().includes('connect') ||
    errorMessage.toLowerCase().includes('reach');

  return (
    <div
      role="alert"
      className={`max-w-xl mx-auto p-6 sm:p-8 bg-rose-50/80 dark:bg-rose-950/20 border-2 border-rose-200 dark:border-rose-900/60 rounded-3xl text-center space-y-4 shadow-sm animate-in fade-in ${className}`}
    >
      {/* Icon */}
      <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center border border-rose-300 dark:border-rose-500/30 shadow-inner">
        {isNetworkIssue ? <WifiOff className="w-7 h-7" /> : <AlertTriangle className="w-7 h-7" />}
      </div>

      {/* Content */}
      <div className="space-y-1.5">
        <h3 className="text-lg font-black text-rose-950 dark:text-rose-200">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-rose-800 dark:text-rose-300 font-medium leading-relaxed max-w-md mx-auto">
          {errorMessage}
        </p>
      </div>

      {/* Action: Retry */}
      {onRetry && (
        <div className="pt-2 flex justify-center">
          <button
            type="button"
            onClick={onRetry}
            disabled={isRetrying}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-bold text-xs sm:text-sm shadow-md shadow-rose-600/20 transition-all disabled:opacity-50 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
          >
            <RefreshCw className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`} />
            <span>{isRetrying ? 'Retrying...' : 'Retry Connection'}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ErrorState;

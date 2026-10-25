import React from 'react';

/**
 * TextArea - Clean Multiline Text Input Component
 */
export const TextArea = ({
  name,
  id,
  value,
  onChange,
  onBlur,
  rows = 4,
  placeholder,
  disabled = false,
  hasError = false,
  className = '',
  ...rest
}) => {
  return (
    <textarea
      name={name}
      id={id || name}
      rows={rows}
      value={value ?? ''}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border ${
        hasError
          ? 'border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
          : 'border-slate-300 dark:border-slate-800 focus:border-teal-500 dark:focus:border-teal-400 focus:ring-1 focus:ring-teal-500/20'
      } rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-colors leading-relaxed font-medium disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...rest}
    />
  );
};

export default TextArea;

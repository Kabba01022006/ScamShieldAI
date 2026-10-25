import React from 'react';

/**
 * TextInput - Reusable Clean Input Field
 */
export const TextInput = ({
  type = 'text',
  name,
  id,
  value,
  onChange,
  onBlur,
  placeholder,
  disabled = false,
  hasError = false,
  icon: Icon = null,
  className = '',
  ...rest
}) => {
  return (
    <div className="relative">
      {/* Agar icon pass kiya hai to left side me dikhao */}
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          <Icon className="w-4 h-4" />
        </div>
      )}

      {/* Main HTML input */}
      <input
        type={type}
        name={name}
        id={id || name}
        value={value ?? ''}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full ${Icon ? 'pl-9.5' : 'px-3.5'} py-2.5 bg-slate-50 dark:bg-slate-950 border ${
          hasError
            ? 'border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
            : 'border-slate-300 dark:border-slate-800 focus:border-teal-500 dark:focus:border-teal-400 focus:ring-1 focus:ring-teal-500/20'
        } rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        {...rest}
      />
    </div>
  );
};

export default TextInput;

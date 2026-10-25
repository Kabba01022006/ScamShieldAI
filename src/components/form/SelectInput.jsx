import React from 'react';

/**
 * SelectInput - Clean Dropdown Component
 */
export const SelectInput = ({
  name,
  id,
  value,
  onChange,
  onBlur,
  options = [],
  children,
  disabled = false,
  hasError = false,
  placeholder,
  className = '',
  ...rest
}) => {
  return (
    <div className="relative">
      <select
        name={name}
        id={id || name}
        value={value ?? ''}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        className={`w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border ${
          hasError
            ? 'border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
            : 'border-slate-300 dark:border-slate-800 focus:border-teal-500 dark:focus:border-teal-400 focus:ring-1 focus:ring-teal-500/20'
        } rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {children
          ? children
          : options.map((opt) => {
              const val = typeof opt === 'object' && opt !== null ? opt.value : opt;
              const lbl = typeof opt === 'object' && opt !== null ? opt.label : opt;
              return (
                <option key={val} value={val}>
                  {lbl}
                </option>
              );
            })}
      </select>
    </div>
  );
};

export default SelectInput;

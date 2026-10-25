import React, { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';

/**
 * Password ki strength calculate karne ka simple helper function
 * Length ke basis par 1 (Weak), 2 (Medium), ya 3 (Strong) return karta hai.
 */
function getPasswordStrength(password = '') {
  if (!password) return { score: 0, label: '', color: 'bg-slate-200' };

  if (password.length < 6) {
    return { score: 1, label: 'Weak', color: 'bg-rose-500', text: 'text-rose-500' };
  }
  if (password.length < 8) {
    return { score: 2, label: 'Medium', color: 'bg-amber-500', text: 'text-amber-500' };
  }
  return { score: 3, label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-500' };
}

/**
 * PasswordInput - Password field with eye toggle & strength meter
 */
export const PasswordInput = ({
  name,
  id,
  value,
  onChange,
  onBlur,
  placeholder = '••••••••',
  disabled = false,
  hasError = false,
  showStrengthMeter = false,
  className = '',
  ...rest
}) => {
  // Eye icon se password show/hide karne ke liye state
  const [showPassword, setShowPassword] = useState(false);
  const strength = showStrengthMeter ? getPasswordStrength(value) : null;

  return (
    <div className="space-y-1.5">
      <div className="relative">
        {/* Left side Lock icon */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          <Lock className="w-4 h-4" />
        </div>

        {/* Input field */}
        <input
          type={showPassword ? 'text' : 'password'}
          name={name}
          id={id || name}
          value={value ?? ''}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full pl-9.5 pr-10 py-2.5 bg-slate-50 dark:bg-slate-950 border ${
            hasError
              ? 'border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
              : 'border-slate-300 dark:border-slate-800 focus:border-teal-500 dark:focus:border-teal-400 focus:ring-1 focus:ring-teal-500/20'
          } rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
          {...rest}
        />

        {/* Eye button jo password show/hide toggle karta hai */}
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          title={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>

      {/* Optional Password Strength Indicator Bars */}
      {showStrengthMeter && value && (
        <div className="pt-1 space-y-1">
          <div className="flex items-center gap-1.5 h-1.5">
            {[1, 2, 3].map((level) => (
              <div
                key={level}
                className={`h-full flex-1 rounded-full transition-all duration-300 ${
                  strength.score >= level ? strength.color : 'bg-slate-200 dark:bg-slate-800'
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between text-[10px] font-semibold">
            <span className="text-slate-400">Strength:</span>
            <span className={strength.text}>{strength.label}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordInput;

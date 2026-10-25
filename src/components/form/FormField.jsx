import React from 'react';
import { AlertCircle } from 'lucide-react';

/**
 * FormField - Har input ka clean wrapper component
 * 
 * Label upar rehta hai, input box seedha label ke neeche aata hai,
 * aur agar koi hint ya error ho to wo input ke theek neeche render hota hai.
 * Isse sabhi side-by-side inputs ekdum barabar (horizontal line me) align rehte hain.
 */
export const FormField = ({
  label,
  required = false,
  hint,
  error,
  children,
  className = '',
}) => {
  return (
    <div className={`space-y-1.5 flex flex-col justify-start ${className}`}>
      {/* 1. Label heading */}
      {label && (
        <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
          {label}
          {required && <span className="text-rose-500 ml-1 font-bold">*</span>}
        </label>
      )}

      {/* 2. The actual input element (Label ke theek neeche, perfect alignment ke liye) */}
      {children}

      {/* 3. Error ya Hint message (Input ke neeche aayega taaki input box upar-neeche na ho) */}
      {error ? (
        <p className="text-xs text-rose-500 flex items-center gap-1 font-medium">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      ) : hint ? (
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          {hint}
        </p>
      ) : null}
    </div>
  );
};

export default FormField;

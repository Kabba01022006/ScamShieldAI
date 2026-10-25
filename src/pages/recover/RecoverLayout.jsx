import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { ShieldAlert, RotateCcw, AlertTriangle, PhoneCall } from 'lucide-react';
import { useSafetyStore } from '../../store/useSafetyStore';

// Emergency recovery workflow aligned with Indian Cyber Crime Coordination Centre (I4C) SOP
export const RecoverLayout = () => {
  const recovery = useSafetyStore((state) => state.recovery || { completedSteps: [] });
  const resetRecovery = useSafetyStore((state) => state.resetRecovery);

  const completedCount = recovery.completedSteps ? recovery.completedSteps.length : 0;
  const progressPercent = Math.round((completedCount / 6) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="p-6 bg-rose-500/10 border-2 border-rose-500/30 dark:border-rose-500/40 rounded-3xl space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600 text-white text-xs font-bold uppercase tracking-wider">
              <ShieldAlert className="w-3.5 h-3.5 animate-pulse" />
              <span>Incident Response Protocol</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
              I've Been Scammed: Emergency Recovery Mode
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
              Act quickly during the critical "Golden Hour" to freeze fund transfers, secure accounts, and prepare an official cybercrime complaint.
            </p>
          </div>

          {/* Quick 1930 Helpline Button */}
          <a
            href="tel:1930"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm shadow-md transition-all active:scale-[0.98] shrink-0"
          >
            <PhoneCall className="w-4 h-4 animate-bounce" />
            <span>Call 1930 Helpline</span>
          </a>
        </div>

        {/* Progress Bar & Reset Action */}
        <div className="pt-2 border-t border-rose-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex-1 space-y-1">
            <div className="flex justify-between font-bold">
              <span className="text-slate-700 dark:text-slate-300">
                Golden Hour Action Plan: {completedCount} of 6 Completed
              </span>
              <span className="font-mono text-rose-600 dark:text-rose-400">
                {progressPercent}%
              </span>
            </div>
            <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-rose-600 dark:bg-rose-500 transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {completedCount > 0 && (
            <button
              type="button"
              onClick={resetRecovery}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors shrink-0"
              title="Reset checklist and elapsed timer"
            >
              <RotateCcw className="w-3 h-3" /> Reset Progress
            </button>
          )}
        </div>
      </div>

      {/* Step Navigation Tabs */}
      <nav aria-label="Recovery Steps" className="flex border-b border-slate-200 dark:border-slate-800">
        <NavLink
          to="/recover"
          end
          className={({ isActive }) =>
            `flex items-center gap-2 px-5 py-3 border-b-2 font-bold text-sm transition-all ${
              isActive
                ? 'border-rose-600 text-rose-600 dark:text-rose-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`
          }
        >
          <div className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-mono font-bold">
            1
          </div>
          <span>Step 1: Immediate Actions (Golden Hour)</span>
        </NavLink>

        <NavLink
          to="/recover/complaint"
          className={({ isActive }) =>
            `flex items-center gap-2 px-5 py-3 border-b-2 font-bold text-sm transition-all ${
              isActive
                ? 'border-rose-600 text-rose-600 dark:text-rose-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`
          }
        >
          <div className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-mono font-bold">
            2
          </div>
          <span>Step 2: Complaint Draft Generator</span>
        </NavLink>
      </nav>

      {/* Nested Route Content */}
      <main>
        <Outlet />
      </main>

      {/* Official Legal Disclaimer */}
      <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-start gap-3 leading-relaxed">
        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <p>
          <strong>Official Reporting Notice:</strong> This interactive recovery assistant and drafting tool is designed for educational guidance and rapid self-help. It does not directly connect to law enforcement databases or file official police FIRs. You must formally lodge your complaint via <strong>cybercrime.gov.in</strong> or by calling <strong>1930</strong>.
        </p>
      </div>

    </div>
  );
};

export default RecoverLayout;

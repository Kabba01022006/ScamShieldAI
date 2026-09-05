import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Home, PlusCircle, Search } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-10 text-center space-y-6 shadow-xl">
        
        {/* Visual Graphic */}
        <div className="relative w-24 h-24 mx-auto">
          <div className="absolute inset-0 rounded-full bg-rose-500/10 animate-ping"></div>
          <div className="relative w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-950 border-2 border-rose-300 dark:border-rose-500/40 flex items-center justify-center text-rose-600 dark:text-rose-400 shadow-md">
            <ShieldAlert className="w-12 h-12" />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-2">
          <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-rose-600 dark:from-teal-400 dark:to-rose-400 font-mono">
            404
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Security Check: Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            The link you followed doesn't exist or may have been moved. Don't worry, your connection remains secure.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 pt-2">
          <Link
            to="/"
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-teal-600/20 active:scale-[0.98]"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home Page</span>
          </Link>

          <Link
            to="/report"
            className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:text-teal-300 font-bold text-sm flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-800 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Report a Scam</span>
          </Link>

          <Link
            to="/search"
            className="text-xs text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors pt-1 flex items-center justify-center gap-1 font-bold"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search Threat Database</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

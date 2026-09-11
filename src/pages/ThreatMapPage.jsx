import React from 'react';
import { ThreatMap } from '../components/ThreatMap';
import { Flame, Radio, PhoneCall } from 'lucide-react';

export const ThreatMapPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">

      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
          INDIA CYBER CRIME RADAR
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold mt-3">
          India Scam Threat & Hotspot Radar
        </h1>

        <p className="text-sm text-slate-600 dark:text-slate-300 mt-3">
          Track common scam hotspots across India.
        </p>
      </div>

      <ThreatMap />

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border space-y-2">
          <div className="flex items-center gap-2 text-rose-600 font-bold text-sm">
            <Flame className="w-4 h-4" />
            High Risk Areas
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Areas with many reported scam cases are marked as high risk.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border space-y-2">
          <div className="flex items-center gap-2 text-amber-600 font-bold text-sm">
            <Radio className="w-4 h-4" />
            Common Scams
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Different areas have different types of scams.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border space-y-2">
          <div className="flex items-center gap-2 text-teal-600 font-bold text-sm">
            <PhoneCall className="w-4 h-4" />
            Report a Scam
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            If you lose money in a scam, call <strong>1930</strong> quickly.
          </p>
        </div>

      </div>
    </div>
  );
};

import React from 'react';
import { ThreatMap } from '../components/ThreatMap';
import { Compass, ShieldAlert, Radio, Flame, Crosshair, PhoneCall } from 'lucide-react';

export const ThreatMapPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Header */}
      <div className="space-y-3 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          <span>INDIA CYBER CRIME RADAR</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          India Scam Threat & Hotspot Radar
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Interactive geospatial surveillance mapping active cybercrime epicenters across India, including Jamtara OTP networks, Delhi NCR Digital Arrest rings, and Mewat QR fraud syndicates.
        </p>
      </div>

      {/* Embedded Threat Map */}
      <ThreatMap />

      {/* Threat Radar Intelligence Advisory */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        
        <div className="bg-white dark:bg-slate-900/70 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm">
            <Flame className="w-4 h-4" />
            <span>High-Density Hotspot Telemetry</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Regions are categorized as Critical Risk Zones when community reports cross 400 verified incidents within a 30-day window, indicating active cyber syndicates.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900/70 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
            <Radio className="w-4 h-4" />
            <span>Digital Arrest & Mule Accounts</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Coordinated rings use fake police stations and mule bank accounts to rapidly siphon funds before victims realize that genuine law enforcement never issues arrest warrants over video calls.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900/70 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
          <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold text-sm">
            <PhoneCall className="w-4 h-4" />
            <span>Immediate Response Protocol (1930)</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            If you or someone you know has transferred funds to a cyber scammer, dial <strong>1930</strong> immediately to freeze beneficiary bank accounts via the Indian Cybercrime Coordination Centre (I4C).
          </p>
        </div>

      </div>

    </div>
  );
};

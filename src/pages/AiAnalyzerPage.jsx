import React from 'react';
import { Sparkles, ShieldAlert, Cpu, Lock, CheckCircle2 } from 'lucide-react';
import { AiScamAnalyzer } from '../components/AiScamAnalyzer';

export const AiAnalyzerPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Title section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-semibold">
          <Cpu className="w-3.5 h-3.5" />
          <span>Zero-Knowledge Neural Classifier</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Instant AI Scam & Phishing Scanner
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Fraudsters use engineered urgency, emotional manipulation, and fraudulent redirects. Paste suspicious SMS messages, email bodies, or chat texts to inspect threat vectors in real time.
        </p>
      </div>

      {/* Main Analyzer Component */}
      <AiScamAnalyzer />

      {/* How the AI Engine Detects Scams */}
      <div className="bg-slate-800/40 border border-slate-700/80 rounded-3xl p-8 space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-teal-400" />
          How The Scam Detection Engine Works
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
          <div className="space-y-2 p-4 bg-slate-900/60 rounded-xl border border-slate-800">
            <h4 className="font-bold text-teal-300 text-sm">1. Urgency & Coercion Markers</h4>
            <p className="text-slate-400 leading-relaxed">
              Scams force panic by claiming your package is returned in 12 hours, your bank account is suspended, or a warrant is issued. Our engine flags synthetic deadlines.
            </p>
          </div>

          <div className="space-y-2 p-4 bg-slate-900/60 rounded-xl border border-slate-800">
            <h4 className="font-bold text-cyan-300 text-sm">2. Non-Standard Payment Channels</h4>
            <p className="text-slate-400 leading-relaxed">
              Legitimate entities never demand gift cards, Bitcoin ATMs, or Zelle transfers to "unlock" an account or refund funds. The engine flags irregular monetary requests.
            </p>
          </div>

          <div className="space-y-2 p-4 bg-slate-900/60 rounded-xl border border-slate-800">
            <h4 className="font-bold text-indigo-300 text-sm">3. Domain Discrepancies</h4>
            <p className="text-slate-400 leading-relaxed">
              Phishing messages imitate brands like USPS, Netflix, or Chase but point to obscure domains like `.xyz`, `.top`, or unverified subdomains.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

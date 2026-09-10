import React, { useState } from 'react';
import { Sparkles, ShieldCheck, FileWarning, RefreshCw, ArrowRight, Cpu } from 'lucide-react';

// ─── SAMPLE DATA (outside component to avoid re-creation on every render) ───
const SAMPLES = [
  { title: "CBI Arrest",     text: "CBI Notice: Arrest warrant #CBI-9821 issued. Join Skype video call for Digital Arrest immediately." },
  { title: "Electricity",    text: "Your power will be cut tonight at 9:30 PM. Pay ₹10 via Discom APK to avoid disconnection." },
  { title: "OLX Army QR",   text: "Army officer wants to buy your vehicle. Scan UPI QR and enter UPI PIN to receive ₹15,000." },
  { title: "Telegram Task",  text: "Earn ₹3000 daily! Like YouTube videos, get ₹150 bonus. Message @Global_Task_Coordinator on Telegram." },
];

// ─── KEYWORD RULES ────────────────────────────────────────────────────────────
const RULES = [
  { words: ['urgent','immediately','tonight','arrest','warrant'],     label: 'Urgency Tactics',         detail: 'Panic triggers',             pts: 25 },
  { words: ['upi pin','upi','crypto','gift card','recharge'],         label: 'Payment Demands',          detail: 'Non-refundable payment',     pts: 25 },
  { words: ['cbi','police','army','discom','digital arrest'],         label: 'Authority Impersonation',  detail: 'Impersonates officials',     pts: 25 },
  { words: ['otp','pin','aadhaar','pan','qr code'],                   label: 'Credential Extraction',    detail: 'Probes for credentials',     pts: 20 },
];

// ─── COLOR MAP ────────────────────────────────────────────────────────────────
const COLOR = {
  rose:    { wrap: 'bg-rose-50 border-rose-200',    text: 'text-rose-800'    },
  amber:   { wrap: 'bg-amber-50 border-amber-200',  text: 'text-amber-800'   },
  emerald: { wrap: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-800' },
};

// ─── PURE ANALYSIS FUNCTION (no side effects) ─────────────────────────────────
function runAnalysis(text) {
  const lower = text.toLowerCase();
  let score = 15;
  const tactics = [], indicators = [];

  // Check each rule
  RULES.forEach(({ words, label, detail, pts }) => {
    const found = words.filter(w => lower.includes(w));
    if (found.length) {
      score += pts;
      tactics.push(label);
      indicators.push(`${detail} (${found.join(', ')})`);
    }
  });

  // Check for malicious links / APK
  if (/\.apk|telegram|anydesk|\.xyz|\.top/i.test(lower)) {
    score += 20;
    tactics.push('Malicious Link / APK');
    indicators.push('Suspicious file or remote-access link detected');
  }

  const finalScore = Math.min(98, score);
  const isHigh = finalScore >= 75;
  const isMid  = finalScore >= 45;

  return {
    score:   finalScore,
    color:   isHigh ? 'rose' : isMid ? 'amber' : 'emerald',
    verdict: isHigh ? 'CRITICAL FRAUD DETECTED' : isMid ? 'SUSPICIOUS / ELEVATED RISK' : 'Low Risk',
    advice:  isHigh ? 'Do NOT reply or transfer funds. Call 1930 immediately.'
                    : isMid ? 'Verify independently before acting.'
                    : 'Looks safe, but always stay alert.',
    tactics,
    indicators,
  };
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export const AiScamAnalyzer = ({ onExportToReport }) => {

  // State variables
  const [inputText,   setInputText]   = useState('');   // text in the textarea
  const [isAnalyzing, setIsAnalyzing] = useState(false);// spinner flag
  const [result,      setResult]      = useState(null); // analysis output

  // Kick off a 600ms fake "loading" then set result
  const analyze = (text) => {
    if (!text.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setResult(runAnalysis(text));
      setIsAnalyzing(false);
    }, 600);
  };

  // Clear everything
  const reset = () => { setInputText(''); setResult(null); };

  // ── JSX RETURNED ────────────────────────────────────────────────────────────
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-sm">

      {/* 1. HEADER */}
      <div className="border-b pb-4 space-y-1">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-md w-fit">
          <Cpu className="w-3.5 h-3.5 text-emerald-600" />
          Heuristic Threat Engine
        </div>
        <h3 className="text-2xl font-black text-slate-900">AI Scam Analyzer</h3>
        <p className="text-xs text-slate-500">
          Paste any suspicious SMS, WhatsApp, or email to detect fraud patterns.
        </p>
      </div>

      {/* 2. SAMPLE PRESET BUTTONS */}
      <div className="space-y-2">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Try a sample:</p>
        <div className="flex flex-wrap gap-2">
          {SAMPLES.map((s, i) => (
            <button
              key={i}
              onClick={() => { setInputText(s.text); analyze(s.text); }}
              className="px-3 py-1.5 text-xs font-bold border border-slate-200 rounded-xl bg-white hover:bg-slate-50 hover:border-slate-900 transition-all"
            >
              {s.title}
            </button>
          ))}
        </div>
      </div>

      {/* 3. TEXTAREA + ACTION ROW */}
      <div className="space-y-3">
        <textarea
          rows={4}
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder="Paste suspicious message here..."
          className="w-full border-2 border-slate-200 focus:border-slate-900 rounded-2xl p-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none bg-slate-50 font-medium"
        />
        <div className="flex justify-between items-center">
          <span className="text-[11px] text-slate-400">{inputText.length} characters</span>
          <div className="flex gap-2">
            {inputText && (
              <button onClick={reset} className="text-xs text-slate-400 hover:text-slate-700 px-3 py-2">
                Clear
              </button>
            )}
            <button
              onClick={() => analyze(inputText)}
              disabled={isAnalyzing || !inputText.trim()}
              className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-bold flex items-center gap-2 disabled:opacity-40 hover:bg-black transition-all"
            >
              {isAnalyzing
                ? <><RefreshCw className="w-4 h-4 animate-spin" /> Scanning...</>
                : <><Sparkles className="w-4 h-4" /> Analyze</>
              }
            </button>
          </div>
        </div>
      </div>

      {/* 4. RESULTS PANEL (only shown when result exists) */}
      {result && (
        <div className="border-t pt-6 space-y-4 animate-in fade-in duration-300">

          {/* Score card */}
          <div className={`${COLOR[result.color].wrap} border p-5 rounded-2xl flex items-center justify-between gap-4`}>
            <div className="flex items-center gap-4">
              {/* Score box */}
              <div className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center font-black border-2 bg-white ${COLOR[result.color].text}`}>
                <span className="text-2xl">{result.score}%</span>
                <span className="text-[9px] uppercase tracking-wide">Risk</span>
              </div>
              {/* Verdict text */}
              <div>
                <p className={`text-lg font-black ${COLOR[result.color].text}`}>{result.verdict}</p>
                <p className="text-xs text-slate-600 mt-1 max-w-sm">{result.advice}</p>
              </div>
            </div>
            {/* Report button (only for suspicious/critical) */}
            {result.score >= 45 && (
              <button
                onClick={onExportToReport}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center gap-1.5 hover:bg-black transition-all shrink-0"
              >
                Report <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Breakdown: tactics + markers */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
              <p className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <FileWarning className="w-3.5 h-3.5 text-amber-500" /> Tactics Detected:
              </p>
              {result.tactics.length
                ? result.tactics.map((t, i) => (
                    <span key={i} className="inline-block px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[11px] font-bold mr-1">
                      • {t}
                    </span>
                  ))
                : <p className="text-xs text-slate-400">None detected</p>
              }
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
              <p className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Linguistic Markers:
              </p>
              {result.indicators.length
                ? result.indicators.map((ind, i) => (
                    <p key={i} className="text-xs text-slate-600 flex gap-1.5">
                      <span className="text-emerald-500">✔</span>{ind}
                    </p>
                  ))
                : <p className="text-xs text-slate-400">No markers found</p>
              }
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
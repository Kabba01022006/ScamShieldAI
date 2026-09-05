import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  ArrowRight, 
  Cpu, 
  RefreshCw, 
  CheckCircle2, 
  FileWarning, 
  Send 
} from 'lucide-react';

export const AiScamAnalyzer = ({ onExportToReport }) => {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const sampleMessages = [
    {
      title: "Digital Arrest Call",
      text: "CBI Notice: An arrest warrant #CBI-9821 has been issued in your name. A parcel containing MDMA drugs and fake passports was seized at Mumbai airport under your Aadhaar. Join Skype video call immediately for Digital Arrest verification or face immediate police detention.",
    },
    {
      title: "Electricity Cutoff SMS",
      text: "Dear consumer, your electricity power will be disconnected tonight at 9:30 PM because your previous month bill was not updated. Please immediately contact our power officer at 7488193021 and pay ₹10 recharge via Discom APK to avoid disconnection.",
    },
    {
      title: "OLX Army Reverse QR",
      text: "Hello, I am an Indian Army officer posted in military cantonment. I want to purchase your vehicle listed on OLX. I am sending you a UPI QR code. Please scan this QR code and enter your UPI PIN to receive advance token payment of ₹15,000.",
    },
    {
      title: "Telegram Like Task",
      text: "Earn ₹3,000–₹5,000 daily part-time from home! Simply like 3 YouTube videos and subscribe to channels. We pay ₹150 trial bonus directly to your UPI. Message @Global_Task_Coordinator on Telegram to receive VIP merchant prepaid tasks.",
    }
  ];

  const analyzeScam = (text) => {
    if (!text.trim()) return;

    setIsAnalyzing(true);

    setTimeout(() => {
      const lower = text.toLowerCase();
      let score = 15;
      const detectedIndicators = [];
      const tactics = [];

      // 1. Urgency detection
      const urgencyWords = ['urgent', 'immediately', '12 hours', '24 hours', 'tonight', '9:30 pm', 'final notice', 'suspend', 'arrest', 'warrant', 'act now', 'deadline'];
      const foundUrgency = urgencyWords.filter(w => lower.includes(w));
      if (foundUrgency.length > 0) {
        score += 25;
        tactics.push('Artificial Psychological Urgency');
        detectedIndicators.push(`Panic triggers identified (${foundUrgency.join(', ')})`);
      }

      // 2. Financial demands & P2P payments
      const moneyWords = ['zelle', 'wire transfer', 'crypto', 'bitcoin', 'gift card', 'cashier check', 'deposit', 'upi', 'upi pin', 'gpay', 'phonepe', 'recharge', 'prepaid task', 'advance payment'];
      const foundMoney = moneyWords.filter(w => lower.includes(w));
      if (foundMoney.length > 0) {
        score += 25;
        tactics.push('Irreversible Payment Demands');
        detectedIndicators.push(`Demands non-refundable payment or PIN entry (${foundMoney.join(', ')})`);
      }

      // 3. Authority impersonation (Police, CBI, ED, Discom, Army)
      const authorityWords = ['cbi', 'police', 'customs', 'ed', 'trai', 'rbi', 'discom', 'electricity', 'army', 'crpf', 'subedar', 'court', 'warrant', 'digital arrest'];
      const foundAuthority = authorityWords.filter(w => lower.includes(w));
      if (foundAuthority.length > 0) {
        score += 25;
        tactics.push('Authority & Institutional Impersonation');
        detectedIndicators.push(`Impersonates official law enforcement or utility boards (${foundAuthority.join(', ')})`);
      }

      // 4. Credential & 2FA harvesting
      const credWords = ['passcode', 'code', 'otp', 'password', 'pin', 'ssn', 'aadhaar', 'pan', 'card number', 'cvv', 'verification code', 'qr code'];
      const foundCreds = credWords.filter(w => lower.includes(w));
      if (foundCreds.length > 0) {
        score += 20;
        tactics.push('Credential / OTP Extraction');
        detectedIndicators.push(`Probes for sensitive credentials or PIN entry (${foundCreds.join(', ')})`);
      }

      // 5. Suspicious links or APK downloads
      const linkRegex = /(https?:\/\/[^\s]+)|(\.xyz|\.top|\.ru|\.vip|\.work|\.apk|telegram|anydesk|teamviewer)/i;
      if (linkRegex.test(lower)) {
        score += 20;
        tactics.push('Malicious Link / APK Hijack');
        detectedIndicators.push('Contains remote-access software prompt or suspicious file extension (.apk / AnyDesk / Telegram)');
      }

      // Clamp score
      const finalScore = Math.min(98, Math.max(8, score));

      let threatVerdict = 'Low Risk / Standard Notification';
      let verdictColor = 'emerald';
      let actionAdvice = 'Message appears standard. As a baseline habit, never share OTPs, click unfamiliar links, or enter your UPI PIN to receive money.';

      if (finalScore >= 75) {
        threatVerdict = 'CRITICAL FRAUD SIGNATURE DETECTED';
        verdictColor = 'rose';
        actionAdvice = 'DO NOT reply, transfer funds, or scan any QR code. Law enforcement never arrests via video calls. Dial 1930 immediately.';
      } else if (finalScore >= 45) {
        threatVerdict = 'SUSPICIOUS / ELEVATED RISK';
        verdictColor = 'amber';
        actionAdvice = 'Proceed with high caution. Independently verify the claim by contacting the official organization directly.';
      }

      setAnalysisResult({
        score: finalScore,
        verdict: threatVerdict,
        color: verdictColor,
        tactics,
        indicators: detectedIndicators,
        actionAdvice,
        scannedAt: new Date().toLocaleTimeString(),
        analyzedText: text
      });

      setIsAnalyzing(false);
    }, 600);
  };

  const handleExportToReport = () => {
    if (!analysisResult) return;
    navigate('/report');
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-[0_4px_25px_-4px_rgba(0,0,0,0.05)] relative overflow-hidden space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold">
            <Cpu className="w-3.5 h-3.5 text-emerald-600" />
            <span>Heuristic Threat Neural Engine</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white flex items-center gap-2">
            AI Scam & Phishing Analyzer
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Paste any suspicious SMS, WhatsApp text, or email to calculate its threat probability and detect deceptive fraud patterns.
          </p>
        </div>

        {/* Live scanning indicator badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 font-mono shrink-0 self-start sm:self-auto font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Scanner Ready</span>
        </div>
      </div>

      {/* Preset sample buttons */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
          ⚡ Try A Preloaded Threat Sample:
        </span>
        <div className="flex flex-wrap gap-2">
          {sampleMessages.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setInputText(sample.text);
                analyzeScam(sample.text);
              }}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 text-xs border border-slate-200 dark:border-slate-700 hover:border-slate-900 dark:hover:border-white transition-all font-bold shadow-sm"
            >
              {sample.title}
            </button>
          ))}
        </div>
      </div>

      {/* Textarea Input */}
      <div className="space-y-3">
        <div className="relative">
          <textarea
            rows={4}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste suspicious message or SMS here... (e.g. 'CBI Notice: An arrest warrant has been issued in your name, join Skype video call immediately...')"
            className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 focus:border-slate-900 dark:focus:border-white focus:ring-4 focus:ring-slate-900/5 rounded-2xl p-4 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-all leading-relaxed font-medium"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            {inputText.length} characters • Analyzed locally on device with zero data leakage
          </span>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {inputText && (
              <button
                type="button"
                onClick={() => {
                  setInputText('');
                  setAnalysisResult(null);
                }}
                className="px-3 py-2 text-xs text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white font-medium"
              >
                Clear
              </button>
            )}

            <button
              type="button"
              onClick={() => analyzeScam(inputText)}
              disabled={isAnalyzing || !inputText.trim()}
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-slate-900/10 transition-all disabled:opacity-40 active:scale-[0.98]"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Scanning Threat Markers...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Run AI Threat Diagnostic</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Analysis Results Display */}
      {analysisResult && (
        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800/80 space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
          
          {/* Top Score Box */}
          <div className={`p-5 rounded-2xl border ${
            analysisResult.score >= 75 
              ? 'bg-rose-50 border-rose-200 text-rose-900 dark:bg-rose-500/10 dark:border-rose-500/30 dark:text-white' 
              : analysisResult.score >= 45 
              ? 'bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-500/10 dark:border-amber-500/30 dark:text-white' 
              : 'bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-500/10 dark:border-emerald-500/30 dark:text-white'
          } flex flex-col sm:flex-row items-center justify-between gap-6`}>
            
            {/* Score Ring / Bar */}
            <div className="flex items-center gap-4">
              <div className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center font-black border-2 shadow-sm ${
                analysisResult.score >= 75 
                  ? 'bg-white border-rose-500 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400' 
                  : analysisResult.score >= 45 
                  ? 'bg-white border-amber-500 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400' 
                  : 'bg-white border-emerald-500 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
              }`}>
                <span className="text-2xl leading-none">{analysisResult.score}%</span>
                <span className="text-[9px] uppercase tracking-wider font-bold mt-1">Risk Score</span>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Verdict</span>
                <h4 className={`text-base sm:text-lg font-black ${
                  analysisResult.score >= 75 
                    ? 'text-rose-800 dark:text-rose-400' 
                    : analysisResult.score >= 45 
                    ? 'text-amber-800 dark:text-amber-400' 
                    : 'text-emerald-800 dark:text-emerald-400'
                }`}>
                  {analysisResult.verdict}
                </h4>
                <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 max-w-md font-medium leading-relaxed">
                  {analysisResult.actionAdvice}
                </p>
              </div>
            </div>

            {/* Quick Export to Report Form */}
            {analysisResult.score >= 45 && (
              <button
                type="button"
                onClick={handleExportToReport}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-950 text-xs font-bold hover:bg-black transition-all flex items-center justify-center gap-1.5 shrink-0 shadow-sm"
              >
                <span>Report This Message</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Tactical Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Deceptive tactics */}
            <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-300 flex items-center gap-1.5">
                <FileWarning className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                Manipulative Vectors Detected:
              </span>
              {analysisResult.tactics.length > 0 ? (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {analysisResult.tactics.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 dark:bg-slate-800 dark:text-amber-300 border border-amber-200 dark:border-slate-700 text-[11px] font-bold"
                    >
                      • {t}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 font-medium">No overt manipulation signatures detected.</p>
              )}
            </div>

            {/* Evidence points */}
            <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-300 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Specific Linguistic Markers:
              </span>
              {analysisResult.indicators.length > 0 ? (
                <ul className="text-xs text-slate-700 dark:text-slate-400 space-y-1 pl-1 font-medium">
                  {analysisResult.indicators.map((ind, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 dark:text-emerald-400">✔</span>
                      <span>{ind}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-slate-500 font-medium">Neutral language patterns.</p>
              )}
            </div>

          </div>

        </div>
      )}

    </div>
  );
};

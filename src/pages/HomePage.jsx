import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldAlert, 
  Search, 
  PlusCircle, 
  Database, 
  ShieldCheck, 
  AlertTriangle, 
  Users, 
  ArrowRight, 
  Lock, 
  Eye, 
  CheckCircle2, 
  Cpu, 
  Radio, 
  BarChart3, 
  Flame, 
  MapPin, 
  Compass 
} from 'lucide-react';
import { useScams } from '../context/ScamContext';
import { ScamCard } from '../components/ScamCard';
import { AiScamAnalyzer } from '../components/AiScamAnalyzer';
import { ThreatMap } from '../components/ThreatMap';

export const HomePage = () => {
  const [quickQuery, setQuickQuery] = useState('');
  const navigate = useNavigate();
  const { scams } = useScams();

  const handleQuickSearch = (e) => {
    e.preventDefault();
    if (quickQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(quickQuery.trim())}`);
    } else {
      navigate('/search');
    }
  };

  // Recent 3 reports
  const recentReports = scams.slice(0, 3);

  // Stats
  const totalReports = scams.length;
  const totalAffected = scams.reduce((acc, curr) => acc + (curr.meTooCount || 1), 0);

  return (
    <div className="space-y-20 pb-20 relative bg-white dark:bg-[#090d16] transition-colors">
      
      {/* Background Matrix / Grid lines (Very subtle neutral) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 pb-8 overflow-hidden">
        {/* Subtle warm & emerald ambient glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] bg-gradient-to-tr from-emerald-500/10 via-amber-500/5 to-rose-500/5 blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-5xl mx-auto px-4 text-center relative z-10 space-y-6">
          
          {/* Animated floating status badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold shadow-sm animate-float-slow">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Real-Time Citizen Fraud Defense Network</span>
            <span className="text-[10px] font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-700 dark:text-slate-300 ml-1 font-bold">INDIA v2.4</span>
          </div>

          {/* High-Contrast Bold Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-slate-950 dark:text-white leading-[1.08]">
            Neutralize Scams Before <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-950 via-slate-800 to-emerald-600 dark:from-white dark:via-slate-200 dark:to-emerald-400">
              They Steal Your Savings
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
            ScamShieldAI is an open threat intelligence platform where citizens cross-verify phone numbers, WhatsApp groups, fake UPI QR codes, and digital arrest calls before falling victim.
          </p>

          {/* Quick Search Bar */}
          <div className="pt-2 max-w-2xl mx-auto">
            <form 
              onSubmit={handleQuickSearch} 
              className="relative flex flex-col sm:flex-row items-center gap-2 bg-white dark:bg-slate-900 p-2.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 focus-within:border-slate-950 dark:focus-within:border-white focus-within:ring-4 focus-within:ring-slate-900/5 transition-all shadow-xl"
            >
              <div className="relative flex-1 w-full flex items-center pl-3">
                <Search className="w-5 h-5 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={quickQuery}
                  onChange={(e) => setQuickQuery(e.target.value)}
                  placeholder="Check phone (+91...), website, UPI ID, or scam message..."
                  className="w-full bg-transparent px-3 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none font-medium"
                  aria-label="Search suspicious identifier"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-slate-900/10 active:scale-[0.98] shrink-0"
              >
                <span>Verify Threat</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Suggested quick searches */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-bold text-slate-700 dark:text-slate-400">Trending Queries:</span>
              {[
                { label: 'Digital Arrest Skype', q: 'digital arrest' },
                { label: 'Jamtara Electricity SMS', q: 'electricity' },
                { label: 'OLX Army Officer QR', q: 'army' },
                { label: 'WhatsApp Stock Trading', q: 'stock' },
                { label: 'Telegram Task Job', q: 'telegram' },
              ].map((item) => (
                <button
                  key={item.q}
                  onClick={() => navigate(`/search?q=${encodeURIComponent(item.q)}`)}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors shadow-sm font-semibold"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Action Link Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Link
              to="/analyze"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-sm border border-slate-200 dark:border-slate-700 shadow-sm transition-all"
            >
              <Cpu className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Launch AI Scam Scanner
            </Link>

            <a
              href="#threat-map"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-200 font-bold text-sm border border-slate-200 dark:border-slate-700 shadow-sm transition-all"
            >
              <MapPin className="w-4 h-4 text-rose-600" />
              Inspect India Threat Radar
            </a>

            <Link
              to="/database"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-950 hover:bg-black font-bold text-sm shadow-md shadow-slate-900/10 transition-all"
            >
              <Database className="w-4 h-4" />
              Threat Database ({totalReports})
            </Link>
          </div>

        </div>
      </section>

      {/* Trust & Live Threat Metrics Dashboard */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-[0_4px_25px_-4px_rgba(0,0,0,0.05)] relative overflow-hidden">
          <div className="text-center space-y-1 p-2">
            <p className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white font-mono">
              {totalReports}+
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Active Incident Signatures</p>
          </div>
          <div className="text-center space-y-1 p-2">
            <p className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white font-mono">
              {totalAffected}+
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Citizens Warned & Shielded</p>
          </div>
          <div className="text-center space-y-1 p-2">
            <p className="text-3xl sm:text-4xl font-black text-rose-600 dark:text-rose-400 font-mono">
              ₹14 Cr+
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Est. Fraud Losses Averted</p>
          </div>
          <div className="text-center space-y-1 p-2">
            <p className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
              99.8%
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Threat Signature Accuracy</p>
          </div>
        </div>
      </section>

      {/* FEATURE: Interactive Threat Map Component */}
      <section id="threat-map" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <ThreatMap />
      </section>

      {/* Feature Section: Embedded AI Scam Scanner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold">
            <Cpu className="w-3.5 h-3.5 text-emerald-600" />
            <span>Interactive Security Diagnostic</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
            Test Suspicious Messages with AI
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto font-medium">
            Received an unfamiliar text, WhatsApp message, or email? Paste it into our heuristic diagnostic scanner below to detect psychological pressure and payment traps.
          </p>
        </div>

        <AiScamAnalyzer />
      </section>

      {/* Threat Radar & Category Distribution Visualizer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-[0_4px_25px_-4px_rgba(0,0,0,0.05)] space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider mb-1">
                <Radio className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                Live Incident Vector Radar
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
                Active Attack Vectors Breakdown
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md font-medium">
              Current breakdown of fraudulent tactics logged across our Indian defense nodes over the past 30 days.
            </p>
          </div>

          {/* Graphical Bars for Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left: Progress distribution */}
            <div className="space-y-4">
              {[
                { name: 'Digital Arrest & Fake Police Calls', type: 'Phone Call', color: 'from-rose-600 to-rose-400', pct: 36 },
                { name: 'Electricity Bill Cutoff & Bank OTP Smishing', type: 'SMS', color: 'from-amber-600 to-amber-400', pct: 27 },
                { name: 'WhatsApp Stock Trading & Pre-IPO Schemes', type: 'Website', color: 'from-emerald-600 to-teal-400', pct: 21 },
                { name: 'Telegram YouTube Task & Job Scams', type: 'Social', color: 'from-purple-600 to-indigo-400', pct: 16 },
              ].map((item) => (
                <div key={item.name} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-900 dark:text-slate-200">{item.name}</span>
                    <span className="font-mono text-slate-950 dark:text-slate-100 font-extrabold">{item.pct}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${item.color} transition-all duration-1000`}
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Security Key Takeaways Box */}
            <div className="bg-slate-50 dark:bg-slate-950/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-bold text-amber-800 dark:text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
                  <Flame className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  Critical Pattern Shift Identified:
                </span>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  Coordinated syndicates are rapidly pivoting towards <strong>video-based Digital Arrest threats</strong> and <strong>reverse UPI QR code deception</strong>. Scammers weaponize false legal panic and counterfeit police backdrops to force immediate transfers.
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">Want to inspect specific categories?</span>
                <Link
                  to="/database"
                  className="text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 font-extrabold flex items-center gap-1 transition-colors"
                >
                  Filter Database <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* How It Works (3 Steps) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
            How The Defense Network Operates
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            A 3-stage collective shield turning individual fraud encounters into public security immunity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Step 1 */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 relative space-y-4 hover:border-slate-900 dark:hover:border-white shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-lg shadow-sm group-hover:scale-105 transition-transform">
              1
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-700 dark:text-slate-300" />
              Query Identifier
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              Before transferring money or sharing credentials, enter the unfamiliar phone number, payment UPI ID, or link into our public threat repository.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 relative space-y-4 hover:border-rose-500 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-xl bg-rose-600 text-white flex items-center justify-center font-black text-lg shadow-sm group-hover:scale-105 transition-transform">
              2
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              Log Incident
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              Targeted by a deceptive scammer? File an incident report with screenshots and red-flag patterns to instantly alert other citizens.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 relative space-y-4 hover:border-emerald-500 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-lg shadow-sm group-hover:scale-105 transition-transform">
              3
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Protect Citizens
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              Community members verify attacks by confirming "This happened to me too", escalating warnings to public carrier feeds and cyber police.
            </p>
          </div>

        </div>
      </section>

      {/* Recent Threat Feed Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider mb-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              Intelligence Stream
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
              Recently Logged Threat Incidents
            </h2>
          </div>

          <Link
            to="/database"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-slate-900 hover:text-emerald-600 dark:text-white dark:hover:text-emerald-400 transition-colors"
          >
            <span>View All {scams.length} Verified Reports</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentReports.map((scam) => (
            <ScamCard key={scam.id} scam={scam} />
          ))}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold">
              <ShieldAlert className="w-3 h-3" />
              Active Sentinel Duty
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Were you targeted by a fraud operation today?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-medium">
              Every report submitted adds a permanent warning marker to the public database. Take 60 seconds to protect hundreds of families.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              to="/report"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-black text-xs sm:text-sm text-center shadow-lg transition-all active:scale-[0.98]"
            >
              Log Threat Report
            </Link>
            <Link
              to="/database"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-white font-bold text-xs sm:text-sm text-center border border-slate-700 transition-colors"
            >
              Search Threat Directory
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

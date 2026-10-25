import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  ShieldAlert, 
  ShieldCheck, 
  ArrowRight, 
  AlertTriangle,
  Award,
  Cpu,
  PlusCircle
} from 'lucide-react';
import { useScams } from '../context/ScamContext';
import { ScamCard } from '../components/ScamCard';

export const HomePage = () => {
  const [quickQuery, setQuickQuery] = useState('');
  const navigate = useNavigate();
  const { scams } = useScams();

  const handleQuickSearch = (e) => {
    e.preventDefault();
    const query = quickQuery.trim();
    navigate(query ? `/search?q=${encodeURIComponent(query)}` : '/search');
  };

  // Show only the 3 most recent reports on the homepage
  const recentReports = scams.slice(0, 3);

  // Real stats, calculated directly from the scam data (nothing hardcoded)
  const totalReports = scams.length;
  const totalConfirmations = scams.reduce((sum, scam) => sum + (scam.meTooCount || 1), 0);

  return (
    <div className="pb-20">

      {/* ---------- Hero Section ---------- */}
      <section className="pt-16 pb-10 text-center px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Community Cyber Defense Network for India</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-950 dark:text-white leading-tight">
            Check Before You Get Scammed
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            ScamShieldAI is a community platform where people report scams they've
            faced and check if a website, email, or number is already known to be
            a scam — before trusting it.
          </p>

          {/* Quick search bar */}
          <form
            onSubmit={handleQuickSearch}
            className="max-w-xl mx-auto flex flex-col sm:flex-row gap-2 bg-white dark:bg-slate-900 p-2 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-md"
          >
            <div className="flex-1 flex items-center px-3">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                value={quickQuery}
                onChange={(e) => setQuickQuery(e.target.value)}
                placeholder="Enter a website, email, or phone number..."
                className="w-full bg-transparent px-3 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
                aria-label="Search suspicious identifier"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-black dark:bg-white dark:text-slate-950 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors"
            >
              Check Now <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Primary actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/check"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-black dark:bg-white dark:text-slate-950 text-white font-bold text-sm shadow-md transition-all active:scale-[0.98]"
            >
              <Search className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
              Check Before You Pay
            </Link>
            <Link
              to="/recover"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md transition-all active:scale-[0.98]"
            >
              <ShieldAlert className="w-4 h-4 animate-pulse" />
              I've Been Scammed
            </Link>
            <Link
              to="/safety"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-sm border border-slate-200 dark:border-slate-700 transition-colors"
            >
              <Award className="w-4 h-4 text-amber-500" />
              Safety Score Drill
            </Link>
            <Link
              to="/report"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-sm border border-slate-200 dark:border-slate-700 transition-colors"
            >
              <PlusCircle className="w-4 h-4 text-slate-500" />
              Report Threat
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Real Stats (computed from scams array, nothing hardcoded) ---------- */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-2 gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="text-center">
            <p className="text-3xl font-black text-slate-950 dark:text-white">{totalReports}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wide">
              Scams Reported
            </p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-black text-slate-950 dark:text-white">{totalConfirmations}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wide">
              Community Confirmations
            </p>
          </div>
        </div>
      </section>

      {/* ---------- How It Works ---------- */}
      <section className="max-w-5xl mx-auto px-4 pt-16">
        <h2 className="text-2xl font-black text-center text-slate-950 dark:text-white mb-8">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <Search className="w-6 h-6 text-slate-700 dark:text-slate-300" />
            <h3 className="font-bold text-slate-900 dark:text-white">1. Search</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Check a website, email, or number before you trust it.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <ShieldAlert className="w-6 h-6 text-rose-600" />
            <h3 className="font-bold text-slate-900 dark:text-white">2. Report</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Been targeted? Submit the details so others can be warned.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <h3 className="font-bold text-slate-900 dark:text-white">3. Stay Protected</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              The community grows safer with every report shared.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Citizen Cyber Defense Toolkit ---------- */}
      <section className="max-w-6xl mx-auto px-4 pt-16 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
            Citizen Cyber Defense Toolkit
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Dedicated practical tools built to safeguard Indian digital payments and support victims during cybercrime incidents.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: Check Before You Pay */}
          <Link
            to="/check"
            className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Check Before You Pay
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Query UPI VPAs, phone numbers, or account names before transferring money. Includes async retry handling.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <span>Verify Identifier</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Emergency Recovery */}
          <Link
            to="/recover"
            className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-rose-500/50 hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
                <ShieldAlert className="w-6 h-6 animate-pulse" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                I've Been Scammed
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Golden Hour checklist, 1930 helpline dialer, and automated cybercrime complaint drafter.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-bold text-rose-600 dark:text-rose-400">
              <span>Launch Recovery</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Safety Score & Drill */}
          <Link
            to="/safety"
            className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                Safety Score & Drill
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Interactive cyber reality drill with category-level accuracy, weak-spot recommendations, and 4-card dashboard.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400">
              <span>Take Reality Drill</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 4: Heuristic Scanner */}
          <Link
            to="/analyze"
            className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500/50 hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                Heuristic Scanner
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Scan suspicious SMS, Telegram, and WhatsApp messages using our regex-calibrated rule-based fraud detector.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-bold text-teal-600 dark:text-teal-400">
              <span>Scan Suspicious Text</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

        </div>
      </section>

      {/* ---------- Recent Reports ---------- */}
      <section className="max-w-6xl mx-auto px-4 pt-16 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <h2 className="text-2xl font-black text-slate-950 dark:text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
            Recently Reported Scams
          </h2>
          <Link to="/database" className="text-sm font-bold text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentReports.map((scam) => (
            <ScamCard key={scam.id} scam={scam} />
          ))}
        </div>
      </section>

      {/* ---------- Call To Action ---------- */}
      <section className="max-w-6xl mx-auto px-4 pt-16">
        <div className="bg-slate-950 text-white rounded-3xl p-10 text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-black">Were you targeted by a scam?</h3>
          <p className="text-slate-300 text-sm max-w-lg mx-auto">
            Every report you submit helps warn others in the community.
          </p>
          <Link
            to="/report"
            className="inline-block px-6 py-3 rounded-xl bg-white text-slate-950 font-black text-sm hover:bg-slate-100 transition-colors"
          >
            Report a Scam
          </Link>
        </div>
      </section>

    </div>
  );
};

export default HomePage;

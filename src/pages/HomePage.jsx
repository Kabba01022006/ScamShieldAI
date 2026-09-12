import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShieldAlert, ShieldCheck, ArrowRight, Database, AlertTriangle } from 'lucide-react';
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
              to="/report"
              className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-black dark:bg-white dark:text-slate-950 text-white font-bold text-sm transition-colors"
            >
              Report a Scam
            </Link>
            <Link
              to="/database"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-sm border border-slate-200 dark:border-slate-700 transition-colors"
            >
              <Database className="w-4 h-4" />
              Search Database ({totalReports})
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

       
      
      

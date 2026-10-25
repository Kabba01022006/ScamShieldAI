import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  ShieldAlert, 
  Search, 
  Share2, 
  AlertTriangle, 
  ArrowRight, 
  Clock, 
  Trash2, 
  Sliders, 
  Info 
} from 'lucide-react';
import { lookupIdentifier, getForceNetworkError, setForceNetworkError, subscribeForceNetworkError } from '../services/api';
import { useAsync } from '../hooks/useAsync';
import { useSafetyStore } from '../store/useSafetyStore';
import { Skeleton } from '../components/ui/Skeleton';
import { ErrorState } from '../components/ui/ErrorState';
import { ScamCard } from '../components/ScamCard';
import { FormField } from '../components/form/FormField';

export const CheckPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const [inputError, setInputError] = useState('');
  const [simulateError, setSimulateError] = useState(getForceNetworkError());

  // Zustand persistent store hooks
  const recentChecks = useSafetyStore((state) => state.recentChecks || []);
  const addRecentCheck = useSafetyStore((state) => state.addRecentCheck);
  const clearRecentChecks = useSafetyStore((state) => state.clearRecentChecks);

  // Sync network error toggle with module listener
  useEffect(() => {
    return subscribeForceNetworkError((val) => {
      setSimulateError(val);
    });
  }, []);

  const handleToggleSimulateError = (e) => {
    const checked = e.target.checked;
    setForceNetworkError(checked);
    setSimulateError(checked);
  };

  // Async request state machine
  const { status, data: results, error, run, retry, isLoading } = useAsync(lookupIdentifier);

  // Execute search with validation
  const executeLookup = (searchTerm) => {
    const trimmed = (searchTerm || '').trim();
    if (!trimmed) {
      setInputError('Please enter a phone number, UPI ID, website, or name');
      return;
    }
    if (trimmed.length < 4) {
      setInputError('Search query must be at least 4 characters');
      return;
    }

    setInputError('');
    setSearchParams({ q: trimmed });
    addRecentCheck(trimmed);

    run(trimmed).catch(() => {
      // Error is tracked automatically by useAsync status
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    executeLookup(query);
  };

  // Run automatically if initial query present in URL
  useEffect(() => {
    if (initialQuery.trim().length >= 4) {
      executeLookup(initialQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Compute summary metadata when results are present
  const matchCount = results ? results.length : 0;
  const uniqueTypes = results
    ? Array.from(new Set(results.map((r) => r.scamType).filter(Boolean)))
    : [];

  const highestThreat = results?.some((r) => r.threatLevel?.toLowerCase() === 'critical')
    ? 'Critical'
    : results?.some((r) => r.threatLevel?.toLowerCase() === 'high')
    ? 'High'
    : 'Medium';

  // Build WhatsApp share warning URL
  const buildShareUrl = () => {
    if (!results || results.length === 0) return '#';
    const firstMatch = results[0];
    const text = `🚨 CYBER FRAUD ADVISORY (via ScamShield AI): The identifier "${query}" is reported in the National Threat Registry for ${firstMatch.scamType} fraud ("${firstMatch.title}"). Threat severity: ${highestThreat}. DO NOT transfer funds or share UPI PINs! Check details here: https://scamshield.gov.in/scam/${firstMatch.id}`;
    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-bold shadow-xs">
          <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>Real-Time Payment Security Verification</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
          Check Before You Pay
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
          Verify any UPI VPA, phone number, bank account holder name, or website before authorizing money transfers on PhonePe, Google Pay, or Paytm.
        </p>
      </div>

      {/* Demo Mode Network Simulation Switch */}
      <div className="max-w-3xl mx-auto p-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
          <Sliders className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          <span>
            <strong>Viva / Demo Controller:</strong> Simulate server failure to test async error recovery & retry states.
          </span>
        </div>
        <label className="inline-flex items-center gap-2 cursor-pointer font-bold select-none text-slate-800 dark:text-slate-200">
          <input
            type="checkbox"
            checked={simulateError}
            onChange={handleToggleSimulateError}
            className="w-4 h-4 text-rose-600 rounded border-slate-300 dark:border-slate-700 focus:ring-rose-500"
          />
          <span className={simulateError ? 'text-rose-600 dark:text-rose-400' : 'text-slate-600 dark:text-slate-400'}>
            Simulate Network Failure (100%)
          </span>
        </label>
      </div>

      {/* Main Search Input Form */}
      <div className="max-w-3xl mx-auto space-y-4">
        <form onSubmit={handleSubmit} noValidate className="space-y-2">
          <FormField
            label="Enter Target UPI ID, Phone Number, Name, or Website"
            name="checkQuery"
            required
            error={inputError}
          >
            <div className="relative flex items-center shadow-lg rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 focus-within:border-slate-900 dark:focus-within:border-white transition-all">
              <div className="pl-4 text-slate-400 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-slate-400" />
              </div>
              <input
                type="text"
                name="checkQuery"
                id="checkQuery"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (inputError) setInputError('');
                }}
                placeholder="e.g. 98214-50192, paytm-refund@axis, usps-redelivery.com, CBI"
                className="w-full bg-transparent px-4 py-3.5 text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none font-medium"
                aria-label="Payment identifier query"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="m-1.5 px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold text-sm flex items-center gap-2 transition-all shadow-md active:scale-[0.98] disabled:opacity-50 shrink-0"
              >
                <span>{isLoading ? 'Checking...' : 'Check Registry'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </FormField>
        </form>

        {/* Recent Checks Chips (Zustand Persisted Store) */}
        {recentChecks.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1 mr-1">
                <Clock className="w-3.5 h-3.5" /> Recent Checks:
              </span>
              {recentChecks.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setQuery(item);
                    executeLookup(item);
                  }}
                  className="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-mono text-[11px] font-bold transition-colors border border-slate-200 dark:border-slate-700"
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={clearRecentChecks}
              className="text-[11px] text-slate-400 hover:text-rose-500 transition-colors flex items-center gap-1 font-semibold ml-auto"
              title="Clear recent check history"
            >
              <Trash2 className="w-3 h-3" /> Clear History
            </button>
          </div>
        )}
      </div>

      {/* Render all 4 async states */}
      <div className="pt-4">
        {/* State 1: Loading */}
        {status === 'loading' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono font-bold">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />
                <span>Searching the registry across verified Indian threat signatures...</span>
              </div>
            </div>
            <Skeleton variant="card" count={3} />
          </div>
        )}

        {/* State 2: Error with Retry */}
        {status === 'error' && (
          <ErrorState
            error={error}
            onRetry={retry}
            title="Registry Communication Failure"
            className="my-4"
          />
        )}

        {/* State 3: Success with matches found */}
        {status === 'success' && matchCount > 0 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Warning summary banner */}
            <div className="p-6 bg-rose-50 dark:bg-rose-950/30 border-2 border-rose-200 dark:border-rose-900/60 rounded-3xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 border border-rose-300 dark:border-rose-500/30 shadow-inner">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-rose-950 dark:text-rose-200 flex items-center gap-2">
                    <span>FRAUD DETECTED: {matchCount} {matchCount === 1 ? 'Report' : 'Reports'} Found in National Registry</span>
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs">
                    <span className="font-bold text-slate-600 dark:text-slate-400">
                      Highest Severity:
                    </span>
                    <span className="px-2 py-0.5 rounded-md font-bold bg-rose-600 text-white font-mono uppercase text-[10px]">
                      {highestThreat} Threat
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="font-bold text-slate-600 dark:text-slate-400">
                      Attack Vector(s):
                    </span>
                    <span className="text-rose-800 dark:text-rose-300 font-bold font-mono">
                      {uniqueTypes.join(', ')}
                    </span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Share Warning Button */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                <a
                  href={buildShareUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-md shadow-emerald-600/20"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Warning on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Results Grid linking to ScamDetail */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((scam) => (
                <ScamCard key={scam.id} scam={scam} />
              ))}
            </div>
          </div>
        )}

        {/* State 4: Success with NO matches (NEUTRAL COLOR, NOT GREEN) */}
        {status === 'success' && matchCount === 0 && (
          <div className="max-w-2xl mx-auto bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-3xl p-8 sm:p-10 text-center space-y-6 shadow-sm animate-in fade-in duration-300">
            <div className="w-14 h-14 rounded-2xl bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center mx-auto border border-slate-300 dark:border-slate-700">
              <Info className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                No Reports Found for "{query}"
              </h3>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                This does NOT guarantee it is safe. Verify independently before paying.
              </p>
            </div>

            {/* Neutral Warning Guidelines */}
            <div className="bg-white dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs text-left space-y-2 text-slate-600 dark:text-slate-400">
              <div className="font-bold text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>Crucial Rules Before Any UPI Transfer:</span>
              </div>
              <ul className="list-disc list-inside space-y-1.5 pl-1 leading-relaxed">
                <li>Entering your 4 or 6-digit UPI PIN is <strong>ONLY for sending money</strong>, never for receiving money or winning prizes.</li>
                <li>Scammers continuously create fresh UPI handles and disposable burner SIM cards.</li>
                <li>If an unknown buyer or seller demands payment in advance, decline and use trusted escrow platforms.</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                to="/report"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 text-xs font-bold transition-colors"
              >
                Log a Threat Report
              </Link>
              <Link
                to="/database"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors"
              >
                Browse All Known Scams
              </Link>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};

export default CheckPage;

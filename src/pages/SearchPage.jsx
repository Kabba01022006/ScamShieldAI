import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  AlertTriangle, 
  ShieldCheck, 
  ShieldAlert, 
  PlusCircle, 
  X, 
  Info, 
  ArrowRight, 
  CheckCircle2, 
  Radio 
} from 'lucide-react';
import { useScams } from '../context/ScamContext';
import { ScamCard } from '../components/ScamCard';

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [hasSearched, setHasSearched] = useState(false);
  const { scams } = useScams();
  const navigate = useNavigate();

  useEffect(() => {
    const q = searchParams.get('q') || '';
    setQuery(q);
    if (q.trim()) {
      setHasSearched(true);
    }
  }, [searchParams]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearchParams({ q: query.trim() });
    setHasSearched(true);
  };

  const handleClear = () => {
    setQuery('');
    setSearchParams({});
    setHasSearched(false);
  };

  // Perform search across scam fields
  const results = query.trim()
    ? scams.filter((scam) => {
        const q = query.toLowerCase().trim();
        return (
          scam.identifier?.toLowerCase().includes(q) ||
          scam.secondaryIdentifier?.toLowerCase().includes(q) ||
          scam.title?.toLowerCase().includes(q) ||
          scam.description?.toLowerCase().includes(q) ||
          scam.summary?.toLowerCase().includes(q) ||
          scam.scamType?.toLowerCase().includes(q)
        );
      })
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold">
          <Search className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
          <span>Real-Time Threat Verification</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
          Check If It's Known To Be A Scam
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
          Search suspicious phone numbers, URLs, UPI IDs, or message phrases against community-verified scam records.
        </p>
      </div>

      {/* Search Bar Input */}
      <div className="max-w-3xl mx-auto">
        <form 
          onSubmit={handleSearchSubmit}
          className="relative flex items-center bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-700 p-2 shadow-xl focus-within:border-slate-950 dark:focus-within:border-white focus-within:ring-4 focus-within:ring-slate-900/5 transition-all"
        >
          <div className="pl-3 text-slate-400 flex items-center">
            <Search className="w-5 h-5 text-slate-400" />
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type phone (+91...), website link, UPI ID, or keywords..."
            className="w-full bg-transparent px-4 py-3 text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none font-medium"
            aria-label="Search scams"
          />

          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg mr-1 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            type="submit"
            className="px-7 py-3 rounded-xl bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold text-sm flex items-center gap-2 transition-all shadow-md shadow-slate-900/10 active:scale-[0.98] shrink-0"
          >
            <span>Search</span>
          </button>
        </form>

        {/* Quick Sample Queries */}
        <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-slate-500 dark:text-slate-400 justify-center">
          <span className="font-bold text-slate-700 dark:text-slate-400">Quick Test Searches:</span>
          {['digital arrest', 'electricity', 'army', 'telegram', 'stock', 'loan'].map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setQuery(tag);
                setSearchParams({ q: tag });
              }}
              className="px-3 py-1 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors shadow-sm font-semibold"
            >
              "{tag}"
            </button>
          ))}
        </div>
      </div>

      {/* Results Area */}
      <div>
        {hasSearched ? (
          <div>
            {results.length > 0 ? (
              <div className="space-y-6">
                
                {/* Search Match Banner */}
                <div className="p-5 bg-rose-50 border border-rose-200 dark:bg-rose-500/10 dark:border-rose-500/30 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400 flex items-center justify-center shrink-0 border border-rose-300 dark:border-rose-500/30">
                      <ShieldAlert className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-extrabold text-rose-900 dark:text-rose-300 flex items-center gap-2">
                        <span>⚠ Reported Threat: {results.length} Matching {results.length === 1 ? 'Record' : 'Records'} Found</span>
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                        Query: <span className="font-mono text-slate-900 dark:text-white font-bold">"{query}"</span> matched community reports below. Exercise extreme caution.
                      </p>
                    </div>
                  </div>

                  <Link
                    to="/report"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-950 text-xs font-bold hover:bg-black transition-colors shrink-0 shadow-sm"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    Add Additional Report
                  </Link>
                </div>

                {/* Result Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.map((scam) => (
                    <ScamCard key={scam.id} scam={scam} />
                  ))}
                </div>

              </div>
            ) : (
              /* No Match Empty State */
              <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-[0_4px_25px_-4px_rgba(0,0,0,0.05)]">
                
                <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/30 dark:text-amber-400 flex items-center justify-center mx-auto shadow-inner">
                  <AlertTriangle className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white">
                    No Reports Found for "{query}"
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed font-medium">
                    While there is no current record matching this exact query in our database, <strong className="text-amber-700 dark:text-amber-300 font-bold">please stay cautious</strong>.
                  </p>
                </div>

                {/* Important Advisory */}
                <div className="bg-slate-50 dark:bg-slate-950/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs text-left text-slate-700 dark:text-slate-300 space-y-2.5">
                  <div className="flex items-center gap-2 text-amber-800 dark:text-amber-400 font-bold">
                    <Info className="w-4 h-4" />
                    <span>Why you should still be vigilant:</span>
                  </div>
                  <ul className="space-y-1.5 pl-4 list-disc text-slate-600 dark:text-slate-400 font-medium">
                    <li>Fraudsters frequently acquire new burner SIM cards and generate fresh lookalike URLs daily.</li>
                    <li>Brand new scams might not have been indexed by the community yet.</li>
                    <li>Legitimate institutions will NEVER demand immediate funds transfer or UPI PINs to verify accounts.</li>
                  </ul>
                </div>

                {/* Actions */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    to="/report"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Report This Suspicious Contact</span>
                  </Link>

                  <Link
                    to="/database"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold transition-colors"
                  >
                    Browse All Incidents
                  </Link>
                </div>

              </div>
            )}
          </div>
        ) : (
          /* Initial Guidance State */
          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
            
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm hover:border-slate-900 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center font-bold">
                <Radio className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-950 dark:text-white text-sm">Caller ID Spoofing</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Scammers display real bank helpline numbers or fake police control rooms. Cross-verify the incoming number here.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm hover:border-slate-900 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center font-bold">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-950 dark:text-white text-sm">Deceptive Phishing URLs</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Paste suspicious links to see if lookalike portals or APK files have been identified by community sentinels.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm hover:border-slate-900 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-950 dark:text-white text-sm">UPI & QR Fraud</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Check whether a UPI ID or payment handle is linked to recurring marketplace and task scam operations.
              </p>
            </div>

          </div>
        )}
      </div>

    </div>
  );
};

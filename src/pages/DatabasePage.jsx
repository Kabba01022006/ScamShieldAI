import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Database, 
  Search, 
  Filter, 
  ArrowUpDown, 
  PlusCircle, 
  AlertCircle, 
  X, 
  Globe, 
  Mail, 
  Phone, 
  MessageSquare, 
  Share2, 
  AlertTriangle 
} from 'lucide-react';
import { useScams } from '../context/ScamContext';
import { ScamCard } from '../components/ScamCard';

export const DatabasePage = () => {
  const { scams } = useScams();
  const [selectedType, setSelectedType] = useState('All');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const scamTypes = [
    'All',
    'Website',
    'Email',
    'Phone Call',
    'SMS',
    'Social Media',
    'Other'
  ];

  // Filter & sort logic
  const filteredScams = useMemo(() => {
    let list = [...scams];

    if (selectedType !== 'All') {
      list = list.filter((item) => item.scamType === selectedType);
    }

    if (searchKeyword.trim()) {
      const q = searchKeyword.toLowerCase().trim();
      list = list.filter((item) =>
        item.title?.toLowerCase().includes(q) ||
        item.identifier?.toLowerCase().includes(q) ||
        item.secondaryIdentifier?.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.summary?.toLowerCase().includes(q)
      );
    }

    list.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.incidentDate || 0) - new Date(a.incidentDate || 0);
      } else if (sortBy === 'oldest') {
        return new Date(a.incidentDate || 0) - new Date(b.incidentDate || 0);
      } else if (sortBy === 'most_reported') {
        return (b.meTooCount || 0) - (a.meTooCount || 0);
      }
      return 0;
    });

    return list;
  }, [scams, selectedType, searchKeyword, sortBy]);

  const clearFilters = () => {
    setSelectedType('All');
    setSearchKeyword('');
    setSortBy('newest');
  };

  const isFiltered = selectedType !== 'All' || searchKeyword.trim().length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold mb-2">
            <Database className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
            <span>Verified Scam Repository</span>
          </div>
          <h1 className="text-3xl font-black text-slate-950 dark:text-white tracking-tight">
            Community Scam Database
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 font-medium">
            Browse, filter, and inspect verified scam incident dossiers filed by community members.
          </p>
        </div>

        <Link
          to="/report"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold text-sm shadow-md shadow-slate-900/10 active:scale-[0.98] transition-all shrink-0 self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4 stroke-[2.5]" />
          <span>Report New Scam</span>
        </Link>
      </div>

      {/* Control Bar: Type Pills, Search In Page, Sort */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-[0_4px_25px_-4px_rgba(0,0,0,0.05)] space-y-4">
        
        {/* Search & Sort Row */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search within page */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Filter by keyword, website, phone, or title..."
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-9 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-slate-900 dark:focus:border-white font-medium"
            />
            {searchKeyword && (
              <button
                onClick={() => setSearchKeyword('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1 shrink-0">
              <ArrowUpDown className="w-3.5 h-3.5" />
              Sort:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-auto px-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white font-bold focus:outline-none focus:border-slate-900 dark:focus:border-white"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="most_reported">Most Affected (Confirmations)</option>
            </select>
          </div>
        </div>

        {/* Category Type Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs">
          <span className="text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1 shrink-0 mr-1">
            <Filter className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
            Filter Type:
          </span>
          {scamTypes.map((type) => {
            const active = selectedType === type;
            return (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
                  active
                    ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 shadow-sm'
                    : 'bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 shadow-sm'
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>

      </div>

      {/* Results Header Info */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1 font-medium">
        <div className="flex items-center gap-2">
          <span>
            Showing <strong className="text-slate-900 dark:text-white">{filteredScams.length}</strong> of{' '}
            <strong className="text-slate-700 dark:text-slate-300">{scams.length}</strong> reports
          </span>
          {isFiltered && (
            <span className="bg-teal-50 text-teal-800 dark:bg-teal-500/10 dark:text-teal-400 px-2 py-0.5 rounded-md border border-teal-200 dark:border-teal-500/20 font-bold">
              Filtered
            </span>
          )}
        </div>

        {isFiltered && (
          <button
            onClick={clearFilters}
            className="text-teal-700 hover:text-teal-900 dark:text-teal-400 dark:hover:text-teal-300 font-bold hover:underline flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" />
            Reset all filters
          </button>
        )}
      </div>

      {/* Grid of Scam Cards */}
      {filteredScams.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScams.map((scam) => (
            <ScamCard key={scam.id} scam={scam} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center max-w-lg mx-auto space-y-4 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center mx-auto border border-slate-200 dark:border-slate-700">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Reports Match Your Filter</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
            We couldn't find any reports matching category "{selectedType}" or keyword "{searchKeyword}". Try resetting your filters or report this incident yourself.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={clearFilters}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white text-xs font-bold border border-slate-200 dark:border-slate-700 transition-colors"
            >
              Clear Filters
            </button>
            <Link
              to="/report"
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-teal-600 text-white font-bold text-xs hover:bg-teal-500 transition-colors shadow-sm"
            >
              Report This Scam
            </Link>
          </div>
        </div>
      )}

    </div>
  );
};

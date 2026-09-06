import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ShieldAlert, 
  Calendar, 
  User, 
  Check, 
  Copy, 
  Share2, 
  ThumbsUp, 
  AlertTriangle, 
  ShieldCheck, 
  Info, 
  Globe, 
  Mail, 
  Phone, 
  MessageSquare, 
  FileText, 
  Lock, 
  ExternalLink 
} from 'lucide-react';
import { useScams } from '../context/ScamContext';

export const ScamDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getScamById, incrementMeToo, hasVotedFor } = useScams();
  const [copied, setCopied] = useState(false);
  const [meTooMessage, setMeTooMessage] = useState(null);

  const scam = getScamById(id);

  if (!scam) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 dark:bg-rose-500/10 dark:border-rose-500/30 dark:text-rose-400 flex items-center justify-center mx-auto shadow-inner">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Threat Report Not Found</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            The record identifier <code className="text-teal-700 dark:text-teal-400 font-mono font-bold">"{id}"</code> could not be indexed from our intelligence repository.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/database"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm transition-colors shadow-md"
          >
            Browse Threat Database
          </Link>
          <Link
            to="/"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 text-sm font-bold border border-slate-200 dark:border-slate-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const isVoted = hasVotedFor(scam.id);

  const handleCopyIdentifier = () => {
    navigator.clipboard.writeText(scam.identifier);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMeTooClick = () => {
    incrementMeToo(scam.id);
    if (!isVoted) {
      setMeTooMessage('Thank you! Your confirmation warns the community about this active tactic.');
    } else {
      setMeTooMessage('Confirmation vote removed.');
    }
    setTimeout(() => setMeTooMessage(null), 4000);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Website': return <Globe className="w-4 h-4" />;
      case 'Email': return <Mail className="w-4 h-4" />;
      case 'Phone Call': return <Phone className="w-4 h-4" />;
      case 'SMS': return <MessageSquare className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Navigation & Breadcrumbs */}
      <div className="flex items-center justify-between">
        <Link
          to="/database"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-teal-700 dark:text-slate-400 dark:hover:text-teal-400 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Database</span>
        </Link>

        <span className="text-xs text-slate-500 font-mono font-bold">
          REF: #{scam.id.toUpperCase()}
        </span>
      </div>

      {/* Main Detail Card */}
      <div className="bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-8">
        
        {/* Header Badges & Meta */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-teal-300 border border-slate-200 dark:border-slate-700">
              {getTypeIcon(scam.scamType)}
              {scam.scamType} Attack
            </span>

            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold border ${
              scam.threatLevel === 'Critical' 
                ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/15 dark:text-rose-400 dark:border-rose-500/30' 
                : 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-500/15 dark:text-amber-400 dark:border-amber-500/30'
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
              Threat Level: {scam.threatLevel || 'High'}
            </span>

            <div className="ml-auto flex items-center gap-2 text-xs text-slate-500 font-medium">
              <Calendar className="w-3.5 h-3.5" />
              <span>Incident Reported: {scam.incidentDate}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            {scam.title}
          </h1>

          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
            <User className="w-3.5 h-3.5 text-slate-500" />
            <span>Contributed by: <strong className="text-slate-900 dark:text-slate-200">{scam.reportedBy || 'Verified Citizen Sentinel'}</strong></span>
          </div>
        </div>

        {/* Reported Identifier Highlight Box */}
        <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-4 sm:p-5 border-2 border-slate-200 dark:border-slate-800 space-y-3 shadow-inner">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block mb-1">
                Reported Malicious Identifier / Contact Point:
              </span>
              <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-mono text-base sm:text-lg font-extrabold">
                <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
                <span className="break-all">{scam.identifier}</span>
              </div>
              {scam.secondaryIdentifier && (
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">
                  Claimed affiliation / alternate handle: <span className="text-slate-900 dark:text-slate-200 font-bold">{scam.secondaryIdentifier}</span>
                </p>
              )}
            </div>

            <button
              onClick={handleCopyIdentifier}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-700 transition-all self-start sm:self-center shrink-0 shadow-sm"
              title="Copy identifier"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Identifier</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* "This Happened To Me Too" Interactive Action Bar */}
        <div className="bg-slate-50 dark:bg-slate-950/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-sm">
            <div className="w-11 h-11 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-950 flex items-center justify-center font-black text-lg shadow-sm shrink-0">
              {scam.meTooCount || 1}
            </div>
            <div>
              <p className="font-black text-slate-950 dark:text-white text-sm">
                Community Confirmation Count
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                {scam.meTooCount || 1} citizens have verified being targeted by this exact scheme.
              </p>
            </div>
          </div>

          <button
            onClick={handleMeTooClick}
            className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98] ${
              isVoted
                ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                : 'bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 shadow-slate-900/10'
            }`}
          >
            <ThumbsUp className={`w-4 h-4 ${isVoted ? 'fill-current' : ''}`} />
            <span>{isVoted ? 'Confirmed by You' : 'This Happened to Me Too!'}</span>
          </button>
        </div>

        {/* Action feedback toast */}
        {meTooMessage && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 dark:bg-emerald-500/15 dark:border-emerald-500/30 rounded-xl text-emerald-900 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{meTooMessage}</span>
          </div>
        )}

        {/* Full Story Description */}
        <div className="space-y-3">
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            Incident Breakdown & Attack Methodology
          </h2>
          <div className="bg-slate-50 dark:bg-slate-950/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-sm text-slate-800 dark:text-slate-200 leading-relaxed space-y-3 whitespace-pre-line font-medium">
            <p>{scam.description}</p>
          </div>
        </div>

        {/* Red Flags Observed */}
        {scam.redFlags && scam.redFlags.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              Red Flags Identified in This Incident
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {scam.redFlags.map((flag, idx) => (
                <div 
                  key={idx} 
                  className="bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 p-3.5 rounded-xl flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 font-medium"
                >
                  <span className="w-2 h-2 rounded-full bg-rose-500 mt-1 shrink-0" />
                  <span>{flag}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Safety & Prevention Advice */}
        {scam.preventionTip && (
          <div className="bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 p-5 rounded-2xl space-y-2">
            <h3 className="text-sm font-bold text-teal-900 dark:text-teal-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              Recommended Defensive Countermeasure
            </h3>
            <p className="text-xs text-teal-800 dark:text-slate-300 leading-relaxed font-medium">
              {scam.preventionTip}
            </p>
          </div>
        )}

        {/* Footer actions */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/database"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-200 dark:border-slate-700 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to All Threat Reports
          </Link>

          <Link
            to="/report"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 text-xs font-bold transition-colors shadow-sm"
          >
            Report Another Incident
          </Link>
        </div>

      </div>
    </div>
  );
};

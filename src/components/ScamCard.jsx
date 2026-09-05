import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe, 
  Mail, 
  Phone, 
  MessageSquare, 
  Share2, 
  AlertTriangle, 
  Calendar, 
  ChevronRight, 
  ShieldAlert, 
  Users 
} from 'lucide-react';

export const ScamCard = ({ scam }) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'Website':
        return <Globe className="w-3.5 h-3.5" />;
      case 'Email':
        return <Mail className="w-3.5 h-3.5" />;
      case 'Phone Call':
        return <Phone className="w-3.5 h-3.5" />;
      case 'SMS':
        return <MessageSquare className="w-3.5 h-3.5" />;
      case 'Social Media':
        return <Share2 className="w-3.5 h-3.5" />;
      default:
        return <AlertTriangle className="w-3.5 h-3.5" />;
    }
  };

  const getThreatBadge = (level) => {
    switch (level?.toLowerCase()) {
      case 'critical':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-500/15 dark:text-rose-400 dark:border-rose-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
            Critical Threat
          </span>
        );
      case 'high':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-500/15 dark:text-amber-400 dark:border-amber-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            High Risk
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-yellow-50 text-yellow-800 border border-yellow-200 dark:bg-yellow-500/15 dark:text-yellow-400 dark:border-yellow-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
            Medium Risk
          </span>
        );
    }
  };

  return (
    <article className="group relative bg-white dark:bg-slate-900/90 hover:bg-white dark:hover:bg-slate-850 border border-slate-200/90 dark:border-slate-800 hover:border-slate-900 dark:hover:border-slate-400 rounded-2xl p-5 transition-all duration-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-xl flex flex-col justify-between">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
              {getTypeIcon(scam.scamType)}
              {scam.scamType}
            </span>
            {getThreatBadge(scam.threatLevel)}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-500 font-mono">
            <Calendar className="w-3 h-3 text-slate-400" />
            <span>{scam.incidentDate}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-1 mb-2">
          {scam.title}
        </h3>

        {/* Reported Identifier Box */}
        <div className="bg-slate-50 dark:bg-slate-950 rounded-xl px-3.5 py-2.5 border border-slate-200 dark:border-slate-800 mb-3 flex items-center justify-between text-xs font-mono group-hover:border-slate-300 dark:group-hover:border-slate-700 transition-colors">
          <div className="truncate text-amber-800 dark:text-amber-300 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span className="truncate font-semibold">{scam.identifier}</span>
          </div>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-sans ml-2 shrink-0 font-medium">
            Contact Point
          </span>
        </div>

        {/* Summary Snippet */}
        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-4">
          {scam.summary || scam.description}
        </p>
      </div>

      {/* Bottom Footer Details */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between mt-auto">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400" title="Community confirmations">
          <Users className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>
            <strong className="text-slate-900 dark:text-slate-100 font-mono">{scam.meTooCount || 1}</strong> confirmed
          </span>
        </div>

        <Link
          to={`/scam/${scam.id}`}
          className="inline-flex items-center gap-1 text-xs font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:translate-x-1 transition-all"
        >
          <span>Inspect Dossier</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
};

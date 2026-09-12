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
  Users,
} from 'lucide-react';

// Moved OUTSIDE the component: these lookup tables don't depend on props,
// so they don't need to be rebuilt every time a card re-renders.

const TYPE_ICONS = {
  Website: <Globe className="w-3.5 h-3.5" />,
  Email: <Mail className="w-3.5 h-3.5" />,
  'Phone Call': <Phone className="w-3.5 h-3.5" />,
  SMS: <MessageSquare className="w-3.5 h-3.5" />,
  'Social Media': <Share2 className="w-3.5 h-3.5" />,
};
const DEFAULT_ICON = <AlertTriangle className="w-3.5 h-3.5" />;

const THREAT_BADGES = {
  critical: { label: 'Critical Threat', className: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/15 dark:text-rose-400 dark:border-rose-500/30', dot: 'bg-rose-500 animate-ping' },
  high: { label: 'High Risk', className: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-500/15 dark:text-amber-400 dark:border-amber-500/30', dot: 'bg-amber-500' },
  medium: { label: 'Medium Risk', className: 'bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-500/15 dark:text-yellow-400 dark:border-yellow-500/30', dot: 'bg-yellow-500' },
};

function ThreatBadge({ level }) {
  const badge = THREAT_BADGES[level?.toLowerCase()] || THREAT_BADGES.medium;
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${badge.className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`}></span>
      {badge.label}
    </span>
  );
}

export const ScamCard = ({ scam }) => {
  return (
    <article className="group relative bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 hover:border-slate-900 dark:hover:border-slate-400 rounded-2xl p-5 transition-all duration-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-xl flex flex-col justify-between">
      <div>
        {/* Top row: scam type badge, threat level badge, date */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
              {TYPE_ICONS[scam.scamType] || DEFAULT_ICON}
              {scam.scamType}
            </span>
            <ThreatBadge level={scam.threatLevel} />
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

        {/* Reported identifier (the website/email/number being warned about) */}
        <div className="bg-slate-50 dark:bg-slate-950 rounded-xl px-3.5 py-2.5 border border-slate-200 dark:border-slate-800 mb-3 flex items-center justify-between text-xs font-mono">
          <div className="truncate text-amber-800 dark:text-amber-300 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span className="truncate font-semibold">{scam.identifier}</span>
          </div>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider ml-2 shrink-0 font-medium">
            Contact Point
          </span>
        </div>

        {/* Short summary */}
        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-4">
          {scam.summary || scam.description}
        </p>
      </div>

      {/* Footer: confirmation count + link to full details */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between mt-auto">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <Users className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>
            <strong className="text-slate-900 dark:text-slate-100 font-mono">{scam.meTooCount || 1}</strong> confirmed
          </span>
        </div>

        <Link
          to={`/scam/${scam.id}`}
          className="inline-flex items-center gap-1 text-xs font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:translate-x-1 transition-all"
        >
          <span>View Details</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
};

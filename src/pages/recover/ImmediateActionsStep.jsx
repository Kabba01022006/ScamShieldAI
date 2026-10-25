import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  PhoneCall, 
  Building2, 
  CreditCard, 
  Camera, 
  Globe, 
  KeyRound, 
  CheckCircle2, 
  ArrowRight,
  AlertOctagon
} from 'lucide-react';
import { useSafetyStore } from '../../store/useSafetyStore';

const CHECKLIST_STEPS = [
  {
    id: 'call-1930',
    title: 'Call 1930 (National Cyber Crime Helpline)',
    icon: PhoneCall,
    urgent: true,
    actionText: 'Dial 1930 immediately',
    actionHref: 'tel:1930',
    reason:
      'Within the initial 2 hours ("Golden Hour"), law enforcement and the Citizen Financial Cyber Fraud Reporting System (CFCFRMS) can freeze the recipient scammer mule accounts before funds are withdrawn at ATMs or laundered through crypto.',
  },
  {
    id: 'inform-bank',
    title: 'Inform Your Bank & Request a Fraud Transaction Hold',
    icon: Building2,
    urgent: true,
    actionText: null,
    reason:
      'Call your bank\'s 24/7 emergency debit/credit card fraud hotline. Provide your Account Number and 12-digit UTR/reference number. Request an immediate hold on the disputed transaction.',
  },
  {
    id: 'freeze-upi-cards',
    title: 'Temporarily Block Compromised UPI Apps & Payment Cards',
    icon: CreditCard,
    urgent: false,
    actionText: null,
    reason:
      'Prevent secondary or recurring auto-debits. Open your banking or UPI app (PhonePe, GPay, Paytm) and temporarily lock cards, revoke active device permissions, and disable UPI international or contactless usage.',
  },
  {
    id: 'preserve-evidence',
    title: 'Preserve Screenshots, Call Logs, and Transaction UTRs',
    icon: Camera,
    urgent: false,
    actionText: null,
    reason:
      'Do NOT delete chats, SMS alerts, or call history. Take complete timestamps and full-screen captures showing phone numbers, UPI VPAs, payment receipts, and URLs for police investigation evidence.',
  },
  {
    id: 'file-cybercrime-portal',
    title: 'Register a Formal Complaint at cybercrime.gov.in',
    icon: Globe,
    urgent: false,
    actionText: 'Visit cybercrime.gov.in',
    actionHref: 'https://cybercrime.gov.in',
    reason:
      'File an official incident report under the "Report Financial Fraud" section to obtain an official acknowledgment number required by banks for dispute settlement and potential chargebacks.',
  },
  {
    id: 'change-passwords',
    title: 'Change NetBanking & UPI Passwords from a Clean Device',
    icon: KeyRound,
    urgent: false,
    actionText: null,
    reason:
      'If malware (APK file), phishing portals, or remote tools (AnyDesk, TeamViewer) were involved, change your primary passwords and MPINs immediately from an uncompromised family phone or computer.',
  },
];

export const ImmediateActionsStep = () => {
  const recovery = useSafetyStore((state) => state.recovery || { startedAt: null, completedSteps: [] });
  const startRecovery = useSafetyStore((state) => state.startRecovery);
  const toggleRecoveryStep = useSafetyStore((state) => state.toggleRecoveryStep);

  // Mark recovery as initiated upon viewing
  useEffect(() => {
    startRecovery();
  }, [startRecovery]);

  const completedSteps = recovery.completedSteps || [];

  return (
    <div className="space-y-6 pt-6">
      
      {/* Golden Hour Advisory Banner (Static guidance without timer) */}
      <div className="p-4 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/20">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 font-mono">
              The "Golden Hour" Protocol
            </p>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              Act Quickly to Freeze Transferred Funds
            </p>
          </div>
        </div>

        <div className="text-left sm:text-right text-xs text-slate-600 dark:text-slate-300 font-medium max-w-sm">
          Bank transaction holds and 1930 portal complaints have the highest success rate when initiated within the first 2 hours of fraud.
        </div>
      </div>

      {/* Checklist Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
            6 Critical Immediate Action Steps
          </h2>
          <span className="text-xs font-mono font-bold text-slate-500">
            {completedSteps.length} of {CHECKLIST_STEPS.length} Done
          </span>
        </div>

        {CHECKLIST_STEPS.map((step, index) => {
          const isDone = completedSteps.includes(step.id);
          const Icon = step.icon;

          return (
            <div
              key={step.id}
              onClick={() => toggleRecoveryStep(step.id)}
              className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer select-none ${
                isDone
                  ? 'bg-emerald-50/80 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/60 shadow-sm'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 shadow-sm'
              }`}
            >
              <div className="flex items-start gap-4">
                
                {/* Custom Checkbox */}
                <button
                  type="button"
                  tabIndex={-1}
                  aria-label={`Mark step ${index + 1} as completed`}
                  className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all mt-0.5 shrink-0 ${
                    isDone
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
                  }`}
                >
                  {isDone && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
                </button>

                {/* Content */}
                <div className="flex-1 space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-400">
                        0{index + 1}.
                      </span>
                      <h3
                        className={`text-sm sm:text-base font-extrabold ${
                          isDone
                            ? 'line-through text-slate-500 dark:text-slate-400'
                            : 'text-slate-950 dark:text-white'
                        }`}
                      >
                        {step.title}
                      </h3>
                    </div>

                    {step.urgent && !isDone && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30">
                        High Urgency
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    {step.reason}
                  </p>

                  {step.actionText && (
                    <div className="pt-1.5" onClick={(e) => e.stopPropagation()}>
                      <a
                        href={step.actionHref}
                        target={step.actionHref.startsWith('http') ? '_blank' : '_self'}
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-xs transition-colors"
                      >
                        <Icon className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                        <span>{step.actionText}</span>
                      </a>
                    </div>
                  )}
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Completion & Next Step CTA */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div>
          <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
            Next: Generate Official Complaint Draft
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Step 2 compiles transaction IDs, suspect details, and timelines into a formatted document ready to paste.
          </p>
        </div>

        <Link
          to="/recover/complaint"
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] shrink-0"
        >
          <span>Proceed to Step 2: Complaint Draft</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
};

export default ImmediateActionsStep;

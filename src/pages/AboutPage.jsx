import React, { useState } from 'react';
import { 
  ShieldCheck, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Mail, 
  Send, 
  Heart, 
  Sparkles, 
  CheckCircle2, 
  Users, 
  Lock, 
  AlertTriangle, 
  Flame, 
  CreditCard, 
  KeyRound, 
  ExternalLink, 
  PhoneCall, 
  CheckSquare, 
  Square 
} from 'lucide-react';

export const AboutPage = () => {
  const [openFaq, setOpenFaq] = useState(0);
  const [emergencyTab, setEmergencyTab] = useState('bank');
  const [completedSteps, setCompletedSteps] = useState({});

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [contactSent, setContactSent] = useState(false);

  const toggleStep = (stepId) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  const emergencyProtocols = {
    bank: {
      title: "Shared Credit/Debit Card or Banking Credentials",
      steps: [
        { id: "b1", text: "Contact your bank or card issuer's emergency fraud line immediately (use the phone number on the back of your card)." },
        { id: "b2", text: "Request an immediate card cancellation and dispute any unauthorized or pending transactions." },
        { id: "b3", text: "Change your online banking username, password, and security PIN from a safe device." },
        { id: "b4", text: "Enable transaction SMS push notifications for any charge over $0.01." }
      ]
    },
    money: {
      title: "Sent Funds via Zelle, Wire, or Cryptocurrency",
      steps: [
        { id: "m1", text: "Notify the payment app / bank instantly to report transaction as fraudulent (Zelle / Wire recall window is short)." },
        { id: "m2", text: "Document all chat logs, transaction IDs, recipient handles, and time stamps." },
        { id: "m3", text: "File an official complaint with the Federal Trade Commission (FTC) at reportfraud.ftc.gov." },
        { id: "m4", text: "Beware of 'Recovery Scammers' in DMs claiming they can hack back your stolen funds for a fee. They are secondary scams." }
      ]
    },
    identity: {
      title: "Disclosed Social Security Number (SSN) or ID",
      steps: [
        { id: "i1", text: "Place a free fraud alert and credit freeze on your profile with Experian, Equifax, and TransUnion." },
        { id: "i2", text: "Report identity theft at IdentityTheft.gov to obtain an official recovery plan." },
        { id: "i3", text: "Create an online account with the Social Security Administration (ssa.gov) to prevent unauthorized claim filings." },
        { id: "i4", text: "Review your free credit report at annualcreditreport.com for newly opened accounts." }
      ]
    },
    software: {
      title: "Clicked Phishing Link or Installed Remote Tool (AnyDesk/TeamViewer)",
      steps: [
        { id: "s1", text: "Disconnect the computer or mobile phone immediately from Wi-Fi and mobile data." },
        { id: "s2", text: "Uninstall any remote desktop software (AnyDesk, TeamViewer, QuickAssist) downloaded at the caller's request." },
        { id: "s3", text: "Run a deep scan using reputable anti-malware software." },
        { id: "s4", text: "From a different clean device, reset all primary email, banking, and password manager master keys." }
      ]
    }
  };

  const faqs = [
    {
      q: "Is ScamShieldAI completely free to use?",
      a: "Yes! ScamShieldAI is 100% free and open for public protection. Anyone can search the threat database, use the AI scam analyzer, and submit verified incident reports without subscription barriers."
    },
    {
      q: "How are community scam reports validated?",
      a: "Reports are processed through heuristic threat categorization and verified through crowd confirmation ('This Happened to Me Too'). Identifiers with repeat reports are automatically flagged with elevated threat risk markers."
    },
    {
      q: "How is personal privacy preserved on ScamShieldAI?",
      a: "We maintain a strict privacy-first architecture. Contributors are never required to expose their real identities, and submissions are checked to prevent accidental disclosure of sensitive credentials. Only the attacker's coordinates and deceptive tactics are published."
    },
    {
      q: "What should I do immediately after falling for a scam?",
      a: "Review our interactive Emergency Response Protocol above: 1) Call your bank immediately. 2) Freeze your credit bureau files. 3) File an official complaint with national cyber authorities. 4) Report the fraudster's details here to shield others."
    },
    {
      q: "Can organizations integrate with ScamShieldAI threat intelligence?",
      a: "Yes, our community database supports structured querying to help anti-abuse analysts and security tools identify active smishing numbers and phishing infrastructure."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setContactSent(true);
    setTimeout(() => {
      setContactForm({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero & Mission Statement */}
      <section className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-800 dark:text-teal-400 text-xs font-bold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Global Cyber Defense Mission</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          Neutralizing Fraud Through <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-cyan-600 to-sky-600 dark:from-teal-400 dark:via-cyan-300 dark:to-sky-400">
            Collective Threat Intelligence
          </span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
          Fraud rings profit off asymmetrical information — catching people off-guard before warnings spread. ScamShieldAI eliminates that gap by turning every encounter into community-wide immunity.
        </p>
      </section>

      {/* Interactive Emergency Scam Response Checklist Feature */}
      <section id="emergency" className="bg-white dark:bg-slate-900/90 border-2 border-rose-300 dark:border-rose-500/30 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 dark:bg-rose-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300 border border-rose-200 dark:border-rose-500/40 text-xs font-extrabold font-mono">
            <Flame className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
            <span>EMERGENCY PROTOCOL</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            What To Do Immediately If You Were Scammed
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
            Select what happened to unlock your customized crisis mitigation action checklist:
          </p>
        </div>

        {/* Situation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'bank', label: 'Bank / Card Compromised', icon: CreditCard },
            { id: 'money', label: 'Sent Money / Wire', icon: PhoneCall },
            { id: 'identity', label: 'SSN / Identity Leaked', icon: Lock },
            { id: 'software', label: 'Installed Remote App / Link', icon: AlertTriangle },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = emergencyTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setEmergencyTab(tab.id)}
                className={`p-3.5 rounded-2xl text-left text-xs font-bold flex flex-col justify-between gap-2 border transition-all ${
                  active
                    ? 'bg-rose-50 border-rose-300 text-rose-800 shadow-sm dark:bg-rose-500/15 dark:border-rose-500 dark:text-rose-300'
                    : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-rose-600 dark:text-rose-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Protocol Checklist */}
        <div className="bg-slate-50 dark:bg-slate-950/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              Priority Actions: {emergencyProtocols[emergencyTab].title}
            </h3>
            <span className="text-[11px] text-slate-500 font-mono">
              Click checkboxes as you complete each step
            </span>
          </div>

          <div className="space-y-2.5">
            {emergencyProtocols[emergencyTab].steps.map((step, idx) => {
              const done = !!completedSteps[step.id];
              return (
                <div
                  key={step.id}
                  onClick={() => toggleStep(step.id)}
                  className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                    done
                      ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-500/10 dark:border-emerald-500/30 text-slate-400 line-through'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 shadow-sm'
                  }`}
                >
                  <button type="button" className="mt-0.5 text-teal-600 shrink-0">
                    {done ? <CheckSquare className="w-4 h-4 text-emerald-600" /> : <Square className="w-4 h-4 text-slate-400" />}
                  </button>
                  <div className="text-xs sm:text-sm leading-relaxed font-medium">
                    <strong className="text-slate-500 mr-2 font-mono">STEP {idx + 1}:</strong>
                    <span>{step.text}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900/70 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-400 flex items-center justify-center border border-teal-200 dark:border-teal-500/20">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Distributed Sentinel Network</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            When one person spots an impersonated bank SMS or extortion call, immediate indexing protects thousands of subsequent targets.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900/70 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-400 flex items-center justify-center border border-cyan-200 dark:border-cyan-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Instant Cross-Verification</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            Sub-second querying across known telephone numbers, domains, and crypto addresses empowers citizens to verify before transacting.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900/70 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400 flex items-center justify-center border border-indigo-200 dark:border-indigo-500/20">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Zero-Knowledge Defense</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            We preserve privacy by strictly isolating personal identity from submitted threat intelligence vectors.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="space-y-6 pt-4">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-teal-700 dark:text-teal-400 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            Knowledge Base
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Understand how our platform protects privacy and verifies threats.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-colors shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none hover:bg-slate-50 dark:hover:bg-slate-800/60"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {faq.q}
                  </span>
                  <div className="p-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-teal-700 dark:text-teal-400 shrink-0 ml-3">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 font-medium">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Mail className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            Contact Cyber Threat Intelligence Team
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Reach out for research inquiries, threat intelligence data exchange, or platform feedback.
          </p>
        </div>

        {contactSent ? (
          <div className="p-6 bg-emerald-50 border border-emerald-200 dark:bg-emerald-500/10 dark:border-emerald-500/30 rounded-2xl text-center space-y-2 animate-in fade-in">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h3 className="text-base font-bold text-emerald-800 dark:text-emerald-300">Message Dispatched!</h3>
            <p className="text-xs text-emerald-700 dark:text-slate-300 font-medium">
              Our intelligence team has received your inquiry and will respond within 24 business hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-300">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  placeholder="e.g. Jordan Smith"
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-teal-500 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-300">
                  Corporate / Personal Email <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  placeholder="jordan@security.org"
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-teal-500 font-medium"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-300">
                Inquiry Topic
              </label>
              <input
                type="text"
                value={contactForm.subject}
                onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                placeholder="Threat intelligence integration, feature request, or security review"
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-teal-500 font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-300">
                Message Content <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                placeholder="Provide details regarding your communication..."
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-teal-500 leading-relaxed font-medium"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <a
                href="mailto:intelligence@scamshield.ai"
                className="text-xs text-teal-700 dark:text-teal-400 hover:underline font-mono font-bold"
              >
                Direct dispatch: intelligence@scamshield.ai
              </a>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-teal-600/20 active:scale-[0.98]"
              >
                <Send className="w-4 h-4" />
                <span>Transmit Message</span>
              </button>
            </div>
          </form>
        )}
      </section>

    </div>
  );
};

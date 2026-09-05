import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Radio, 
  Flame, 
  AlertTriangle, 
  ArrowRight, 
  Crosshair, 
  ShieldCheck,
  PhoneCall,
  ExternalLink
} from 'lucide-react';

// Indian Cybercrime Epicenters & Fraud Corridors
const HOTSPOTS = [
  {
    id: 'in-del',
    city: 'Delhi NCR',
    state: 'Delhi • Gurugram • Noida',
    coords: { x: 215, y: 175 },
    severity: 'Critical',
    incidents: 642,
    topScam: 'Digital Arrest & Fake Police Video Calls',
    avgLoss: '₹4,80,000',
    vector: 'Digital Arrest',
    description: 'Fraudsters impersonate CBI, Mumbai Police, or Customs officers in fake police uniforms on Skype/WhatsApp video calls, accusing victims of illegal parcels and demanding transfers to "RBI verification accounts".',
    safetyRule: 'Law enforcement agencies never arrest citizens or demand funds over WhatsApp or Skype video calls.',
    query: 'digital arrest'
  },
  {
    id: 'in-ldh',
    city: 'Ludhiana',
    state: 'Punjab',
    coords: { x: 180, y: 130 },
    severity: 'Critical',
    incidents: 538,
    topScam: 'Fake Canada / UK Visa & Work Permit Job Fraud',
    avgLoss: '₹3,80,000',
    vector: 'Visa & Job Fraud',
    description: 'Unregistered immigration agents and WhatsApp rings promise guaranteed Canada/UK work permits and LMIA approvals, collecting ₹3–5 Lakhs in fake "embassy processing fees" and "biometric deposits" into personal savings accounts.',
    safetyRule: 'Embassies and VFS Global never issue visas over WhatsApp or ask for payments into personal savings accounts.',
    query: 'visa'
  },
  {
    id: 'in-mum',
    city: 'Mumbai & Pune',
    state: 'Maharashtra',
    coords: { x: 155, y: 325 },
    severity: 'Critical',
    incidents: 590,
    topScam: 'WhatsApp Stock Trading & Fake Institutional IPOs',
    avgLoss: '₹8,50,000',
    vector: 'Investment Fraud',
    description: 'Victims are added to WhatsApp groups with fake SEBI certificates promising 400% returns and guaranteed pre-IPO shares on manipulated trading apps, blocking withdrawals once funds are deposited.',
    safetyRule: 'Never buy shares via WhatsApp groups. Verify all brokers directly on the official SEBI directory (sebi.gov.in).',
    query: 'stock'
  },
  {
    id: 'in-blr',
    city: 'Bengaluru',
    state: 'Karnataka',
    coords: { x: 200, y: 415 },
    severity: 'High',
    incidents: 475,
    topScam: 'YouTube Like & Telegram Work-from-Home Tasks',
    avgLoss: '₹1,20,000',
    vector: 'Task Job Scam',
    description: 'Starts with small ₹150 payouts for liking YouTube videos or rating hotels, then lures victims onto Telegram for "prepaid high-yield merchant tasks" where large sums are stolen.',
    safetyRule: 'No legitimate corporate company pays thousands of rupees for liking videos or asks for prepaid work deposits.',
    query: 'telegram'
  },
  {
    id: 'in-hyd',
    city: 'Hyderabad',
    state: 'Telangana',
    coords: { x: 225, y: 345 },
    severity: 'High',
    incidents: 398,
    topScam: 'Instant Loan App Blackmail & Contact Extortion',
    avgLoss: '₹65,000',
    vector: 'Loan App Extortion',
    description: 'Illegal micro-lending apps steal smartphone contacts and photo galleries. Extortionists morph private photos and threaten to send them to family unless repeated ransoms are paid.',
    safetyRule: 'Never install instant loan APKs from social media. Only borrow from RBI-registered NBFC banks.',
    query: 'loan'
  },
  {
    id: 'in-kol',
    city: 'Kolkata',
    state: 'West Bengal',
    coords: { x: 345, y: 265 },
    severity: 'High',
    incidents: 340,
    topScam: 'Fake Microsoft / Windows Virus Pop-Up Alert',
    avgLoss: '₹32,000',
    vector: 'Tech Support Spoof',
    description: 'Full-screen browser pop-ups with blaring sirens claim a Trojan virus locked the computer. Victims call fake toll-free numbers and pay thousands for bogus anti-virus software.',
    safetyRule: 'Microsoft, Apple, and Google never show phone numbers on screen asking you to call for computer support.',
    query: 'microsoft'
  },
  {
    id: 'in-ahm',
    city: 'Ahmedabad & Surat',
    state: 'Gujarat',
    coords: { x: 140, y: 245 },
    severity: 'Medium',
    incidents: 275,
    topScam: 'Fake Income Tax & GST Refund SMS Phishing',
    avgLoss: '₹75,000',
    vector: 'Tax Phishing',
    description: 'SMS messages claim an approved income tax or GST refund of ₹24,850 requires urgent bank verification, linking to counterfeit portals that harvest NetBanking passwords and OTPs.',
    safetyRule: 'Tax departments credit refunds directly into your pre-validated bank account without SMS link logins.',
    query: 'tax'
  }
];

export const ThreatMap = () => {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState('in-del');
  const [filterSeverity, setFilterSeverity] = useState('all');

  const visibleHotspots = filterSeverity === 'critical'
    ? HOTSPOTS.filter(h => h.severity === 'Critical')
    : HOTSPOTS;

  const current = HOTSPOTS.find(h => h.id === activeId) || HOTSPOTS[0];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl space-y-6 transition-colors">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30 text-xs font-bold mb-1">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span>INDIA CYBER THREAT RADAR</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            National Scam Hotspot Map
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Geospatial tracking of active scam corridors across India, including Delhi Digital Arrest, Ludhiana Visa fraud, and Jamtara OTP networks.
          </p>
        </div>

        {/* National Helpline Badge */}
        <div className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-950/40 px-4 py-2.5 rounded-2xl border border-emerald-200 dark:border-emerald-500/30 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-emerald-600/15 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
            <PhoneCall className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-emerald-800 dark:text-emerald-300 tracking-wider">Cyber Helpline</div>
            <div className="text-base font-black text-emerald-900 dark:text-emerald-400 font-mono">
              Dial 1930
            </div>
          </div>
        </div>
      </div>

      {/* Quick Select & Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* City Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs flex-1">
          <span className="text-slate-400 font-bold shrink-0 text-[11px] uppercase mr-1">Select Hub:</span>
          {HOTSPOTS.map((spot) => {
            const isSelected = activeId === spot.id;
            return (
              <button
                key={spot.id}
                onClick={() => setActiveId(spot.id)}
                className={`px-3 py-1.5 rounded-xl font-bold shrink-0 transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 shadow-md ring-2 ring-slate-950 dark:ring-white'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${spot.severity === 'Critical' ? 'bg-rose-500' : 'bg-amber-400'}`} />
                <span>{spot.city}</span>
              </button>
            );
          })}
        </div>

        {/* Severity Filter Toggle */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl text-xs shrink-0">
          <button
            onClick={() => setFilterSeverity('all')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
              filterSeverity === 'all'
                ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            All Hubs ({HOTSPOTS.length})
          </button>
          <button
            onClick={() => setFilterSeverity('critical')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
              filterSeverity === 'critical'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-rose-600'
            }`}
          >
            <Flame className="w-3 h-3 text-rose-500" />
            Critical Only
          </button>
        </div>
      </div>

      {/* Main Grid: Simplified India Map + Threat Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Simplified India SVG Map Canvas */}
        <div className="lg:col-span-7 bg-slate-950 rounded-2xl border-2 border-slate-800 p-4 relative overflow-hidden shadow-inner flex flex-col justify-between min-h-[420px]">
          
          {/* Map Top Status Bar */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-2 mb-2 font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-teal-300 font-bold">INDIA SURVEILLANCE RADAR</span>
            </div>
            <span className="text-slate-400">Click any hotspot pin</span>
          </div>

          {/* Clean India SVG Graphic */}
          <div className="relative w-full aspect-[4/3] flex items-center justify-center">
            <svg
              viewBox="0 0 460 510"
              className="w-full h-full max-h-[380px] object-contain select-none"
            >
              {/* Subtle background radar circles */}
              <circle cx="230" cy="270" r="190" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 6" />
              <circle cx="230" cy="270" r="120" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 6" />
              <circle cx="230" cy="270" r="50" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 6" />

              {/* Clean Stylized Outline of India */}
              <path
                d="M 230,45 
                   L 205,80 
                   L 170,120 
                   L 155,160 
                   L 115,200 
                   L 90,235 
                   L 115,260 
                   L 135,255 
                   L 145,290 
                   L 155,340 
                   L 175,400 
                   L 195,445 
                   L 210,480 
                   L 225,450 
                   L 245,400 
                   L 270,350 
                   L 310,290 
                   L 345,265 
                   L 360,240 
                   L 345,210 
                   L 365,190 
                   L 405,175 
                   L 435,170 
                   L 440,200 
                   L 415,215 
                   L 375,220 
                   L 340,200 
                   L 290,165 
                   L 265,120 
                   L 255,75 Z"
                fill="#1e293b"
                stroke="#334155"
                strokeWidth="2"
                strokeLinejoin="round"
                className="transition-colors"
              />

              {/* Watermark */}
              <text
                x="230"
                y="275"
                textAnchor="middle"
                fill="#334155"
                fontSize="24"
                fontWeight="900"
                fontFamily="sans-serif"
                letterSpacing="6"
                className="select-none pointer-events-none opacity-40"
              >
                INDIA
              </text>

              {/* Interactive City Hotspot Pins */}
              {visibleHotspots.map((spot) => {
                const isSelected = activeId === spot.id;
                const isCritical = spot.severity === 'Critical';
                const pinColor = isCritical ? '#f43f5e' : '#f59e0b';

                return (
                  <g
                    key={spot.id}
                    className="cursor-pointer group"
                    onClick={() => setActiveId(spot.id)}
                  >
                    {/* Pulsing ring for active or critical hubs */}
                    {(isSelected || isCritical) && (
                      <circle
                        cx={spot.coords.x}
                        cy={spot.coords.y}
                        r={isSelected ? 16 : 10}
                        fill={pinColor}
                        opacity={isSelected ? 0.4 : 0.2}
                        className="animate-ping"
                      />
                    )}

                    {/* Outer Target Circle */}
                    <circle
                      cx={spot.coords.x}
                      cy={spot.coords.y}
                      r={isSelected ? 12 : 7}
                      fill={isSelected ? pinColor : '#0f172a'}
                      stroke={pinColor}
                      strokeWidth={isSelected ? 2.5 : 1.5}
                      className="transition-all duration-200 group-hover:scale-125"
                    />

                    {/* Center Dot */}
                    <circle
                      cx={spot.coords.x}
                      cy={spot.coords.y}
                      r={isSelected ? 4 : 2.5}
                      fill="#ffffff"
                    />

                    {/* City Name Label */}
                    <text
                      x={spot.coords.x}
                      y={spot.coords.y - 12}
                      textAnchor="middle"
                      fill={isSelected ? '#2dd4bf' : '#e2e8f0'}
                      fontSize={isSelected ? '12' : '9.5'}
                      fontWeight={isSelected ? 'bold' : '600'}
                      fontFamily="sans-serif"
                      className="select-none pointer-events-none transition-all drop-shadow"
                    >
                      {spot.city}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Map Footer status */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <Crosshair className="w-3.5 h-3.5 text-teal-400" />
              Selected: <strong className="text-white">{current.city} ({current.state})</strong>
            </span>
            <span className="font-mono text-teal-400 font-bold">
              {visibleHotspots.length} Hubs Monitored
            </span>
          </div>

        </div>

        {/* Selected Hub Threat Details Panel */}
        <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-950/80 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-sm transition-colors">
          
          {/* Header & Badges */}
          <div className="flex items-start justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-black uppercase font-mono border ${
                  current.severity === 'Critical'
                    ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/15 dark:text-rose-400 dark:border-rose-500/30'
                    : 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-500/15 dark:text-amber-400 dark:border-amber-500/30'
                }`}>
                  {current.severity} Risk
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  {current.state}
                </span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {current.city}
              </h3>
            </div>

            <div className="text-right shrink-0">
              <span className="text-2xl font-black text-slate-950 dark:text-white font-mono block">
                {current.incidents}
              </span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                Reported Cases
              </span>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
              <span className="text-slate-500 text-[10px] uppercase tracking-wider block font-semibold">Primary Vector:</span>
              <span className="text-slate-900 dark:text-white font-bold text-xs flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
                {current.vector}
              </span>
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
              <span className="text-slate-500 text-[10px] uppercase tracking-wider block font-semibold">Avg Victim Loss:</span>
              <span className="text-rose-600 dark:text-rose-400 font-bold text-xs font-mono">
                {current.avgLoss}
              </span>
            </div>
          </div>

          {/* Primary Threat Summary */}
          <div className="space-y-1.5 bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-[10px] uppercase tracking-wider text-amber-800 dark:text-amber-400 font-bold flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              Highest Volume Threat:
            </span>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              {current.topScam}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 pt-1 leading-relaxed">
              {current.description}
            </p>
          </div>

          {/* Citizen Safety Rule */}
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-500/30 text-xs space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Crucial Safety Rule:</span>
            </div>
            <p className="text-emerald-900 dark:text-emerald-200 text-[11px] leading-relaxed font-medium">
              {current.safetyRule}
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={() => navigate(`/search?q=${encodeURIComponent(current.query)}`)}
            className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-slate-900/10 active:scale-[0.98]"
          >
            <span>Search {current.city} Related Reports</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>

      </div>

      {/* Advisory Banner */}
      <div className="bg-slate-50 dark:bg-slate-950/70 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-slate-950 dark:text-white font-bold font-mono">NATIONAL PORTAL:</span>
          <span>Report immediate financial fraud within golden hours to freeze beneficiary mule accounts.</span>
        </div>

        <a
          href="https://cybercrime.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 font-bold flex items-center gap-1 shrink-0 transition-colors"
        >
          <span>cybercrime.gov.in</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

    </div>
  );
};

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  ShieldAlert, 
  Radio, 
  Flame, 
  AlertTriangle, 
  Compass, 
  ArrowRight, 
  Crosshair, 
  ShieldCheck,
  PhoneCall,
  Zap,
  Info
} from 'lucide-react';

export const ThreatMap = () => {
  const navigate = useNavigate();
  const [activeRegion, setActiveRegion] = useState('in-del');
  const [filterType, setFilterType] = useState('all');

  // Indian Cyber Crime Hotspots & Threat Syndicates
  const hotspots = [
    {
      id: 'in-del',
      city: 'Delhi NCR',
      state: 'Delhi • Gurugram • Noida',
      coords: { x: 215, y: 170 },
      severity: 'Critical',
      incidents: 642,
      topScam: 'Digital Arrest & Fake CBI / ED Video Call',
      primaryTarget: 'Retired Citizens, Homemakers & IT Staff',
      avgLoss: '₹4,80,000',
      description: 'Fraudsters impersonate CBI, Mumbai Police, or Customs officers wearing fake uniforms over Skype/WhatsApp video calls. They falsely claim a parcel with contraband or MDMA was seized in the victim\'s name, forcing victims into 48-hour "digital custody" and coercing them to transfer savings into "RBI safe custody accounts".',
      safetyRule: 'Law enforcement agencies (CBI, ED, Police, Courts) NEVER conduct arrests, trials, or account verification over WhatsApp or Skype video calls.',
      vector: 'Digital Arrest',
      category: 'digital_arrest',
      searchQuery: 'digital arrest'
    },
    {
      id: 'in-jam',
      city: 'Jamtara & Deoghar',
      state: 'Jharkhand',
      coords: { x: 335, y: 240 },
      severity: 'Critical',
      incidents: 785,
      topScam: 'Electricity Disconnection SMS & Bank KYC APK',
      primaryTarget: 'Homeowners, Elders & Small Shopkeepers',
      avgLoss: '₹45,000',
      description: 'High-volume SMS smishing campaign alleging power will be disconnected at 9:30 PM due to unpaid electric bills. Victims who call the 10-digit number are instructed to install screen-sharing software (AnyDesk, TeamViewer) or a malicious "Discom Bill Pay" APK to make a ₹10 test payment, draining their accounts.',
      safetyRule: 'Power utility boards (Bescom, Tata Power, BSES, etc.) never send disconnection threats from private 10-digit mobile numbers. Never install APK files sent via SMS.',
      vector: 'OTP & KYC Phishing',
      category: 'otp_kyc',
      searchQuery: 'electricity'
    },
    {
      id: 'in-mew',
      city: 'Mewat & Bharatpur',
      state: 'Rajasthan / Haryana Border',
      coords: { x: 195, y: 195 },
      severity: 'Critical',
      incidents: 512,
      topScam: 'OLX Fake Army Officer & Reverse QR Code Fraud',
      primaryTarget: 'Online Buyers & Second-Hand Sellers',
      avgLoss: '₹28,000',
      description: 'Scammers advertise bikes, cars, or furniture on OLX under forged Army/CRPF officer IDs claiming urgent military transfer. When buyers enquire, the scammer sends a UPI QR code claiming "Scan this QR code to receive advance payment". Scanning the code and entering a UPI PIN debits money from the victim.',
      safetyRule: 'GOLDEN UPI RULE: Entering your UPI PIN is strictly for SENDING money. You never need to enter a UPI PIN or scan a QR code to RECEIVE payment.',
      vector: 'QR Code & OLX Fraud',
      category: 'qr_olx',
      searchQuery: 'army'
    },
    {
      id: 'in-mum',
      city: 'Mumbai & Pune',
      state: 'Maharashtra',
      coords: { x: 160, y: 325 },
      severity: 'Critical',
      incidents: 590,
      topScam: 'WhatsApp Stock Trading & Fake Institutional IPO App',
      primaryTarget: 'Stock Traders, Salaried Executives & HNWIs',
      avgLoss: '₹8,50,000',
      description: 'Victims are added to WhatsApp groups claiming to be run by prominent FII investment analysts. They are lured with 400% returns and guaranteed pre-IPO allotments via counterfeit trading apps, transferring funds to mule accounts. Once deposited, withdrawals are blocked unless massive "tax clearance fees" are paid.',
      safetyRule: 'Never trade or purchase pre-IPO shares via WhatsApp groups. Always verify that investment brokers are registered with SEBI on sebi.gov.in.',
      vector: 'Investment & IPO Fraud',
      category: 'investment',
      searchQuery: 'stock'
    },
    {
      id: 'in-blr',
      city: 'Bengaluru',
      state: 'Karnataka',
      coords: { x: 215, y: 440 },
      severity: 'High',
      incidents: 475,
      topScam: 'YouTube Like / Review & Telegram Task Job Scam',
      primaryTarget: 'IT Professionals, College Students & Job Seekers',
      avgLoss: '₹1,20,000',
      description: 'Begins with WhatsApp/SMS offering part-time work earning ₹2,000–₹5,000 daily by simply liking YouTube videos, rating Google hotels, or subscribing to channels. After small initial payouts (₹150), victims are directed to Telegram for "prepaid high-yield merchant tasks" where large sums are stolen.',
      safetyRule: 'No legitimate corporate company pays thousands of rupees for clicking likes on YouTube, and genuine employers never ask workers to pay prepaid deposit fees.',
      vector: 'Task & WFH Job Fraud',
      category: 'task_wfh',
      searchQuery: 'telegram'
    },
    {
      id: 'in-hyd',
      city: 'Hyderabad',
      state: 'Telangana',
      coords: { x: 245, y: 365 },
      severity: 'High',
      incidents: 398,
      topScam: 'Instant Loan App Blackmail & Contact Extortion',
      primaryTarget: 'Students, Gig Workers & Immediate Borrowers',
      avgLoss: '₹65,000',
      description: 'Predatory lending apps offer 7-day micro-loans of ₹3,000–₹10,000 without documentation, requiring full gallery and contacts permissions. Even after full repayment, extortionists edit and morph private photographs, threatening to circulate them to all relatives and workplace contacts unless further extortion is paid.',
      safetyRule: 'Never install instant loan APKs from social media links. Ensure any loan provider is an RBI-approved Non-Banking Financial Company (NBFC).',
      vector: 'Loan App Extortion',
      category: 'loan_app',
      searchQuery: 'loan'
    },
    {
      id: 'in-kol',
      city: 'Kolkata & Salt Lake',
      state: 'West Bengal',
      coords: { x: 355, y: 270 },
      severity: 'High',
      incidents: 340,
      topScam: 'Fake Microsoft / Windows Virus Pop-Up Alert',
      primaryTarget: 'Desktop Users, Senior Citizens & Work-from-Home Staff',
      avgLoss: '₹32,000',
      description: 'Counterfeit browser pop-ups display flashing warning screens with alarm sirens stating: "Windows Defender: Spyware Trojan Detected! System Locked! Call 1800-XXX immediately". Calling the number connects to fake support agents who charge exorbitant fees for bogus anti-virus packages.',
      safetyRule: 'Microsoft, Apple, and Google never display toll-free phone numbers on error screens asking you to call for technical or virus support.',
      vector: 'Tech Support Spoof',
      category: 'tech_support',
      searchQuery: 'microsoft'
    },
    {
      id: 'in-ahm',
      city: 'Ahmedabad & Surat',
      state: 'Gujarat',
      coords: { x: 140, y: 245 },
      severity: 'Medium',
      incidents: 275,
      topScam: 'Fake GST / Income Tax Refund Clearance SMS',
      primaryTarget: 'Traders, Small Business Owners & Accountants',
      avgLoss: '₹75,000',
      description: 'Phishing SMS alerts claiming an overdue GST or Income Tax refund of ₹24,850 has been approved and requires bank verification within 24 hours. The phishing link copies the official tax portal to harvest NetBanking passwords and OTPs.',
      safetyRule: 'Tax departments disburse refunds automatically via PFMS into pre-validated bank accounts. They never demand NetBanking credentials via SMS links.',
      vector: 'Tax & GST Phishing',
      category: 'otp_kyc',
      searchQuery: 'tax'
    }
  ];

  // Filter logic
  const filteredHotspots = hotspots.filter(h => {
    if (filterType === 'critical') return h.severity === 'Critical';
    if (filterType === 'digital_arrest') return h.category === 'digital_arrest';
    if (filterType === 'otp_kyc') return h.category === 'otp_kyc';
    if (filterType === 'investment') return h.category === 'investment';
    if (filterType === 'task_wfh') return h.category === 'task_wfh';
    return true;
  });

  const selectedRegion = hotspots.find(h => h.id === activeRegion) || hotspots[0];

  return (
    <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl space-y-6 relative overflow-hidden transition-colors">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-teal-500/5 dark:bg-teal-500/10 blur-3xl pointer-events-none rounded-full" />

      {/* Top Header & Context */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span>INDIA CYBER THREAT RADAR</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span>India Scam Threat & Hotspot Radar</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Real-time geospatial monitoring of major Indian cyber fraud corridors: Digital Arrest, Jamtara OTP smishing, Mewat QR scams, and fake trading rings.
          </p>
        </div>

        {/* National Cyber Helpline Quick Badge */}
        <div className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded-2xl border border-emerald-200 dark:border-emerald-500/30 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-emerald-600/15 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="text-[10px] uppercase font-bold text-emerald-800 dark:text-emerald-300 tracking-wider">National Cyber Helpline</div>
            <div className="text-base font-black text-emerald-900 dark:text-emerald-400 font-mono flex items-center gap-1.5">
              <span>Dial 1930</span>
              <span className="text-[10px] text-slate-500 font-sans font-normal">(cybercrime.gov.in)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Simplified Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-500 font-bold mr-1 flex items-center gap-1">
          <Crosshair className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" /> Filter:
        </span>
        <button
          onClick={() => setFilterType('all')}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
            filterType === 'all'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-slate-800 shadow-sm'
          }`}
        >
          All India Hubs ({hotspots.length})
        </button>
        <button
          onClick={() => setFilterType('critical')}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1 ${
            filterType === 'critical'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'bg-rose-50 text-rose-700 dark:bg-slate-950 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30'
          }`}
        >
          <Flame className="w-3.5 h-3.5" /> Critical Zones
        </button>
        <button
          onClick={() => setFilterType('digital_arrest')}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
            filterType === 'digital_arrest'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-slate-800 shadow-sm'
          }`}
        >
          Digital Arrest
        </button>
        <button
          onClick={() => setFilterType('otp_kyc')}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
            filterType === 'otp_kyc'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-slate-800 shadow-sm'
          }`}
        >
          Electricity / OTP Phishing
        </button>
        <button
          onClick={() => setFilterType('investment')}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
            filterType === 'investment'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-slate-800 shadow-sm'
          }`}
        >
          Stock & IPO Schemes
        </button>
        <button
          onClick={() => setFilterType('task_wfh')}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
            filterType === 'task_wfh'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-slate-800 shadow-sm'
          }`}
        >
          Work-from-Home Tasks
        </button>
      </div>

      {/* Quick Select City Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        <span className="text-slate-500 font-bold shrink-0 text-[11px] uppercase tracking-wider">Quick Select:</span>
        {hotspots.map((spot) => {
          const isSelected = activeRegion === spot.id;
          return (
            <button
              key={spot.id}
              onClick={() => setActiveRegion(spot.id)}
              className={`px-3 py-1.5 rounded-xl font-bold shrink-0 transition-all flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 shadow-md ring-2 ring-slate-950 dark:ring-white'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-sm'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${spot.severity === 'Critical' ? 'bg-rose-500' : 'bg-amber-400'}`} />
              <span>{spot.city}</span>
            </button>
          );
        })}
      </div>

      {/* Main Grid: Interactive India SVG Visualizer + Selected Hub Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Interactive India Radar Map (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950 rounded-2xl border-2 border-slate-800 p-4 relative overflow-hidden shadow-inner flex flex-col justify-between min-h-[440px]">
          
          {/* Top radar HUD telemetry bar */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800/80 pb-2 mb-2 font-mono">
            <div className="flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-teal-400 animate-spin" style={{ animationDuration: '14s' }} />
              <span className="text-teal-300 font-bold">INDIA SURVEILLANCE RADAR: ACTIVE</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-rose-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" /> Critical
              </span>
              <span className="flex items-center gap-1 text-amber-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-amber-400" /> High Risk
              </span>
            </div>
          </div>

          {/* India SVG Canvas Container */}
          <div className="relative w-full aspect-[1/1] sm:aspect-[4/3] flex items-center justify-center py-2">
            
            {/* Background Radar Rotating Beam */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[300px] sm:w-[380px] h-[300px] sm:h-[380px] rounded-full border border-teal-500/10 flex items-center justify-center relative">
                <div className="w-[200px] h-[200px] rounded-full border border-teal-500/15" />
                <div className="w-[100px] h-[100px] rounded-full border border-teal-500/20" />
                <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(20,184,166,0.15)_30deg,transparent_45deg)] animate-radar-sweep" />
              </div>
            </div>

            {/* India Geography Silhouette & Grid */}
            <svg
              viewBox="0 0 500 550"
              className="w-full h-full object-contain filter drop-shadow"
              style={{ maxHeight: '420px' }}
            >
              {/* Background Cyber Coordinate Grid */}
              <defs>
                <pattern id="india-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1e293b" strokeWidth="0.5" opacity="0.5" />
                </pattern>
              </defs>
              <rect width="500" height="550" fill="url(#india-grid)" />

              {/* Tropic of Cancer & Central Meridian Axis */}
              <line x1="0" y1="260" x2="500" y2="260" stroke="#0f766e" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.35" />
              <line x1="250" y1="0" x2="250" y2="550" stroke="#0f766e" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.35" />

              {/* Recognizable Stylized India Geographical Silhouette */}
              <path
                d="M 245,45 L 220,95 L 205,125 L 170,165 L 155,200 L 125,230 L 95,245 L 110,275 L 135,270 L 140,295 L 155,335 L 170,390 L 195,450 L 210,500 L 225,525 L 245,495 L 265,440 L 285,385 L 325,325 L 355,285 L 375,275 L 370,250 L 360,210 L 375,195 L 420,180 L 450,175 L 460,205 L 430,225 L 385,225 L 360,230 L 320,200 L 275,160 L 260,120 L 270,75 Z"
                fill="#1e293b"
                stroke="#334155"
                strokeWidth="1.7"
                opacity="0.85"
                className="transition-colors"
              />

              {/* India Label watermark */}
              <text
                x="250"
                y="295"
                textAnchor="middle"
                fill="#334155"
                fontSize="22"
                fontWeight="900"
                fontFamily="sans-serif"
                letterSpacing="6"
                className="select-none pointer-events-none opacity-40"
              >
                INDIA
              </text>

              {/* Hotspot Radar Pins */}
              {filteredHotspots.map((spot) => {
                const isSelected = activeRegion === spot.id;
                const isCritical = spot.severity === 'Critical';
                const fillColor = isCritical ? '#f43f5e' : '#f59e0b';

                return (
                  <g
                    key={spot.id}
                    className="cursor-pointer group"
                    onClick={() => setActiveRegion(spot.id)}
                  >
                    {/* Animated outer pulsating ring */}
                    <circle
                      cx={spot.coords.x}
                      cy={spot.coords.y}
                      r={isSelected ? 18 : 12}
                      fill={fillColor}
                      opacity={isSelected ? 0.35 : 0.2}
                      className="animate-ping"
                      style={{ animationDuration: isCritical ? '2s' : '3.5s' }}
                    />

                    {/* Outer radar target ring */}
                    <circle
                      cx={spot.coords.x}
                      cy={spot.coords.y}
                      r={isSelected ? 14 : 9}
                      fill={isSelected ? fillColor : 'none'}
                      stroke={fillColor}
                      strokeWidth={isSelected ? 2.5 : 1.5}
                      opacity={isSelected ? 0.9 : 0.75}
                      className="transition-all duration-200 group-hover:stroke-teal-400"
                    />

                    {/* Core pin dot */}
                    <circle
                      cx={spot.coords.x}
                      cy={spot.coords.y}
                      r={isSelected ? 5 : 3.5}
                      fill={isSelected ? '#ffffff' : fillColor}
                      className="transition-all duration-200"
                    />

                    {/* City label text */}
                    <text
                      x={spot.coords.x}
                      y={spot.coords.y - 12}
                      textAnchor="middle"
                      fill={isSelected ? '#2dd4bf' : '#e2e8f0'}
                      fontSize={isSelected ? "11" : "9"}
                      fontWeight={isSelected ? "bold" : "600"}
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

          {/* Bottom helper tip */}
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <Crosshair className="w-3.5 h-3.5 text-teal-400" />
              Click any pin or city badge above to inspect regional scam intelligence.
            </span>
            <span className="font-mono text-teal-300 font-bold hidden sm:inline">
              {filteredHotspots.length} Indian Hubs Active
            </span>
          </div>

        </div>

        {/* Right Column: Selected Region Threat Dossier (5 cols) */}
        <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-950/80 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-sm dark:shadow-xl transition-colors">
          
          {/* Header */}
          <div className="flex items-start justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold uppercase font-mono border ${
                  selectedRegion.severity === 'Critical'
                    ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/15 dark:text-rose-400 dark:border-rose-500/30'
                    : 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-500/15 dark:text-amber-400 dark:border-amber-500/30'
                }`}>
                  {selectedRegion.severity} Severity
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  {selectedRegion.state}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {selectedRegion.city}
              </h3>
            </div>

            <div className="text-right shrink-0">
              <span className="text-2xl font-black text-slate-950 dark:text-white font-mono block">
                {selectedRegion.incidents}
              </span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                Reported Attacks
              </span>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
              <span className="text-slate-500 text-[10px] uppercase tracking-wider block font-medium">Primary Threat Vector:</span>
              <span className="text-slate-900 dark:text-white font-bold text-xs flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
                {selectedRegion.vector}
              </span>
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
              <span className="text-slate-500 text-[10px] uppercase tracking-wider block font-medium">Avg Victim Loss:</span>
              <span className="text-rose-600 dark:text-rose-400 font-bold text-xs font-mono">
                {selectedRegion.avgLoss} / case
              </span>
            </div>
          </div>

          {/* Top Scam Title & Description */}
          <div className="space-y-1 bg-white dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-[10px] uppercase tracking-wider text-amber-800 dark:text-amber-400 font-bold flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              Highest Volume Threat:
            </span>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              {selectedRegion.topScam}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 pt-1 leading-relaxed">
              {selectedRegion.description}
            </p>
          </div>

          {/* Target Group */}
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 px-1 font-medium">
            <span>Primary Demographics:</span>
            <span className="text-slate-900 dark:text-slate-200 font-bold">{selectedRegion.primaryTarget}</span>
          </div>

          {/* Critical Citizen Safety Rule Box */}
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-500/30 text-xs space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Crucial Safety Rule:</span>
            </div>
            <p className="text-emerald-900 dark:text-emerald-200/90 text-[11px] leading-relaxed font-medium">
              {selectedRegion.safetyRule}
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={() => navigate(`/search?q=${encodeURIComponent(selectedRegion.searchQuery)}`)}
            className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-slate-900/10 active:scale-[0.98]"
          >
            <span>Search Related {selectedRegion.city} Scam Reports</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>

      </div>

      {/* Live Indian Cyber Threat Ping Stream */}
      <div className="bg-slate-50 dark:bg-slate-950/70 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-slate-950 dark:text-slate-200 font-bold font-mono">LIVE INTELLIGENCE PING:</span>
          <span className="font-medium text-slate-700 dark:text-slate-300">CBI & I4C release urgent public advisory against "Digital Arrest" Skype fraud rings.</span>
        </div>

        <button
          onClick={() => navigate('/database')}
          className="text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 font-extrabold flex items-center gap-1 shrink-0 transition-colors"
        >
          <span>Explore All Reports</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};

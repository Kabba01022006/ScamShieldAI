import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, PhoneCall, ExternalLink } from 'lucide-react';
import cityData from '../data/cityData';

export const ThreatMap = () => {
  const navigate = useNavigate();
  const [selected,setSelected] = useState(0);
  const city = cityData[selected];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xl space-y-5">

      <div className="flex justify-between border-b pb-5">
        <div>
          <p className="text-xs font-bold text-rose-600">● INDIA CYBER THREAT RADAR</p>
          <h2 className="text-2xl font-bold">National Scam Hotspot Map</h2>
          <p className="text-sm text-slate-500">Geospatial tracking of scam hotspots across India.</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-2xl">
          <PhoneCall className="w-4 h-4 text-emerald-600"/>
          <b className="text-emerald-700">Dial 1930</b>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {cityData.map((x,i) => (
          <button key={x.name} onClick={()=>setSelected(i)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold ${selected===i?'bg-slate-950 text-white':'bg-slate-100 dark:bg-slate-800'}`}>
            ● {x.name}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="bg-slate-950 rounded-2xl p-4">
          <div className="flex justify-between text-xs text-slate-400">
            <b className="text-teal-300">● INDIA RADAR</b>
            <span>Click hotspot</span>
          </div>

          <svg viewBox="0 0 460 510" className="w-full">
            <image href="/india.svg" x="0" y="0" width="460" height="510" opacity="0.25"/>

            {cityData.map((x,i) => (
              <g key={x.name} onClick={()=>setSelected(i)} className="cursor-pointer">
                <circle cx={x.x} cy={x.y} r="20" fill="transparent"/>
                <circle cx={x.x} cy={x.y} r={selected===i?12:7}
                  fill={selected===i?(x.risk==='Critical'?'#f43f5e':'#f59e0b'):'none'}
                  stroke={x.risk==='Critical'?'#f43f5e':'#f59e0b'} strokeWidth="2"/>
                <text x={x.x} y={x.y-14} textAnchor="middle" fill="white" fontSize="9">{x.name}</text>
              </g>
            ))}
          </svg>

          <div className="flex justify-between text-xs text-slate-400">
            <span>Selected: <b className="text-white">{city.name}</b></span>
            <b className="text-teal-400">{cityData.length} Hubs</b>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-5 space-y-4">
          <div className="flex justify-between">
            <div>
              <span className="px-2 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700">{city.risk} Risk</span>
              <p className="text-xs text-slate-500 mt-2">{city.state}</p>
              <h3 className="text-2xl font-bold">{city.name}</h3>
            </div>
            <div className="text-right">
              <b className="text-2xl">{city.cases}</b>
              <p className="text-[10px] text-slate-500">REPORTED CASES</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-white dark:bg-slate-900 p-3 rounded-xl">
              <p className="text-slate-500">Main Scam Method</p><b>{city.method}</b>
            </div>
            <div className="bg-white dark:bg-slate-900 p-3 rounded-xl">
              <p className="text-slate-500">Average Loss</p><b className="text-rose-600">{city.loss}</b>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl">
            <p className="text-xs font-bold text-amber-700">⚠ Highest Volume Threat</p>
            <b>{city.threat}</b><p className="text-xs text-slate-500 mt-2">{city.description}</p>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-950 p-3 rounded-xl text-xs">
          <b className="text-emerald-700 dark:text-emerald-400">✓ Crucial Safety Rule</b>
          <p className="text-slate-700 dark:text-slate-300">{city.safety}</p>
          </div>

          <button onClick={()=>navigate('/search?q='+encodeURIComponent(city.search))}
            className="w-full py-3 rounded-xl bg-slate-900 text-white font-bold text-sm flex justify-center gap-2">
            Search {city.name} Related Reports <ArrowRight className="w-4 h-4"/>
          </button>
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl text-xs flex justify-between">
        <span>● <b>NATIONAL PORTAL:</b> Report immediate financial fraud to freeze accounts.</span>
        <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer"
          className="font-bold flex items-center gap-1">
          cybercrime.gov.in <ExternalLink className="w-3 h-3"/>
        </a>
      </div>
    </div>
  );
};
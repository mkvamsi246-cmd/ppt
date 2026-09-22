import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { SectionWrapper, SectionHeader } from '../shared/UIComponents';
import { ROAD_ZONES } from '../../data/content';

export default function GreenCorridor() {
  const [ambulanceProgress, setAmbulanceProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAmbulanceProgress(prev => (prev >= 100 ? 0 : prev + 25));
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const corridorSteps = [
    { step: '01', title: 'GPS / RFID Beacon', desc: 'Ambulance GPS transponder transmits location to Traffic Command.', icon: '📡', color: '#0284c7', bg: '#e0f2fe' },
    { step: '02', title: 'Route Optimization', desc: 'AI calculates shortest congestion-free corridor to Govt Hospital.', icon: '🗺️', color: '#d97706', bg: '#fef3c7' },
    { step: '03', title: 'Signal Preemption', desc: 'Downstream traffic lights automatically flip to GREEN in advance.', icon: '🟢', color: '#059669', bg: '#d1fae5' },
    { step: '04', title: '11-Min Arrival', desc: 'Zero-delay emergency trauma care with continuous green wave.', icon: '🏥', color: '#7c3aed', bg: '#ede9fe' },
  ];

  return (
    <SectionWrapper id="corridor">
      <div className="max-w-7xl mx-auto px-6 w-full flex-1 flex flex-col justify-between py-2">
        <SectionHeader
          number="07 / EMERGENCY MEDICAL TRANSIT"
          title="Green Corridor Traffic Signal Preemption"
          subtitle="Automated Green Wave preemption clears arterial roads for emergency ambulances, cutting hospital transit time down to 11 minutes."
          color="#059669"
        />

        {/* ── 4-Stage Workflow Chain ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-2">
          {corridorSteps.map((item) => (
            <div
              key={item.step}
              className="glass rounded-2xl p-3.5 border border-slate-200 bg-white/95 shadow-sm flex items-center gap-3"
            >
              <div
                className="w-10 h-10 rounded-xl font-mono text-sm font-bold flex items-center justify-center flex-shrink-0"
                style={{ background: item.bg, color: item.color, border: `1px solid ${item.color}40` }}
              >
                {item.step}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-slate-900 text-sm truncate flex items-center gap-1.5">
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                </div>
                <div className="text-xs text-slate-600 truncate leading-snug">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Main 2-Column Dashboard ── */}
        <div className="grid lg:grid-cols-12 gap-5 items-stretch my-2">
          {/* Left Column: Animated Green Wave Corridor Schematic */}
          <div className="lg:col-span-7 glass rounded-2xl p-4 border border-slate-200 bg-white/95 shadow-md flex flex-col justify-between space-y-3">
            <div>
              <div className="flex justify-between items-center mb-2.5 pb-2 border-b border-slate-100">
                <span className="text-emerald-900 font-bold text-sm flex items-center gap-2">
                  <span>🟢</span>
                  <span>LIVE GREEN CORRIDOR TRANSIT (NH-216)</span>
                </span>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold">
                  CORRIDOR: CLEARED
                </span>
              </div>

              {/* Animated SVG Corridor Map */}
              <div className="h-[150px] w-full rounded-xl overflow-hidden bg-slate-50 border border-slate-200 relative flex items-center mb-3">
                <svg width="100%" height="100%" viewBox="0 0 420 140">
                  {/* Roadway */}
                  <line x1="0" y1="70" x2="420" y2="70" stroke="#10b981" strokeWidth="12" strokeLinecap="round" strokeDasharray="8 6" />
                  <line x1="0" y1="70" x2="160" y2="70" stroke="#fca5a5" strokeWidth="12" strokeLinecap="round" />
                  <line x1="160" y1="0" x2="160" y2="140" stroke="#cbd5e1" strokeWidth="6" strokeLinecap="round" />
                  <line x1="280" y1="0" x2="280" y2="140" stroke="#cbd5e1" strokeWidth="6" strokeLinecap="round" />

                  {/* Moving Ambulance */}
                  <motion.g
                    animate={{ x: [20, 160, 280, 360] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <circle cx="0" cy="70" r="14" fill="#059669" />
                    <text x="-7" y="75" fontSize="14">🚑</text>
                  </motion.g>

                  {/* Junction 1 */}
                  <circle cx="160" cy="70" r="9" fill="#059669" stroke="#ffffff" strokeWidth="2" />
                  <text x="160" y="98" fill="#047857" fontSize="9" textAnchor="middle" fontFamily="monospace" fontWeight="bold">Jct 1: GREEN</text>

                  {/* Junction 2 */}
                  <circle cx="280" cy="70" r="9" fill="#059669" stroke="#ffffff" strokeWidth="2" />
                  <text x="280" y="98" fill="#047857" fontSize="9" textAnchor="middle" fontFamily="monospace" fontWeight="bold">Jct 2: GREEN</text>

                  {/* Hospital */}
                  <rect x="360" y="42" width="48" height="48" rx="6" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
                  <text x="384" y="68" fontSize="16" textAnchor="middle">🏥</text>
                  <text x="384" y="102" fill="#0369a1" fontSize="9" textAnchor="middle" fontFamily="monospace" fontWeight="bold">Govt Hosp</text>
                </svg>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono font-semibold">
                  <span className="text-slate-600">Transit Progress: {ambulanceProgress}%</span>
                  <span className="text-emerald-800 font-bold">ETA: 11 Mins</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
                    style={{ width: `${ambulanceProgress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-900 flex justify-between items-center shadow-xs">
              <span className="font-bold">✓ Signal Preemption: 3 Junctions Cleared</span>
              <span className="font-bold text-emerald-700">Zero Cross-Traffic Delay</span>
            </div>
          </div>

          {/* Right Column: Road Load & Comparative Impact */}
          <div className="lg:col-span-5 glass rounded-2xl p-4 border border-slate-200 bg-white/95 shadow-md flex flex-col justify-between space-y-3">
            <div>
              <div className="flex justify-between items-center mb-2.5 pb-2 border-b border-slate-100">
                <span className="text-slate-900 font-bold text-sm">
                  ARTERIAL CORRIDOR LOAD
                </span>
                <span className="text-xs font-mono font-bold text-slate-500">LIVE SENSORS</span>
              </div>

              <div className="space-y-2 mb-3">
                {ROAD_ZONES.map((zone) => (
                  <div key={zone.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-slate-800 font-bold">{zone.label}</span>
                      <span className="font-mono font-bold" style={{ color: zone.color }}>
                        {zone.load}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                      <div className="h-full" style={{ width: `${zone.load}%`, background: zone.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact Comparison Box */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs font-mono shadow-xs">
              <div className="flex justify-between text-rose-700 font-semibold">
                <span>❌ 2015 Pushkaralu Transit:</span>
                <span className="font-bold">45 - 90 Mins</span>
              </div>
              <div className="flex justify-between text-emerald-800 font-bold">
                <span>⚡ 2027 Green Corridor:</span>
                <span>11 Mins Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Telemetry Strip ── */}
        <div className="p-2.5 rounded-xl glass border border-slate-200 flex flex-wrap items-center justify-between text-xs font-mono text-slate-700 bg-white/90 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold">Emergency Ambulance Telemetry Active</span>
          </div>
          <div className="text-sky-800 font-medium">
            Coordinated with: Traffic Police, 108 EMS & District Hospital
          </div>
          <div className="text-emerald-800 font-black">
            Hospital Reachability: 100%
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

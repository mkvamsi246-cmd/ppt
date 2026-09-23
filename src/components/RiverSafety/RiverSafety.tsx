import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { SectionWrapper, SectionHeader } from '../shared/UIComponents';

export default function RiverSafety() {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      num: '01',
      title: 'AI Drone Thermal Spotting',
      time: '< 15s',
      desc: 'High-altitude autonomous thermal drone identifies struggling swimmer via infrared body heat signature.',
      icon: '🚁',
      color: '#e11d48',
      bg: '#ffe4e6',
    },
    {
      num: '02',
      title: 'Auto-Inflating Lifebuoy Drop',
      time: '< 30s',
      desc: 'Drone descends to 8m altitude and drops an aerodynamic self-inflating flotation ring to sustain the person.',
      icon: '🛟',
      color: '#d97706',
      bg: '#fef3c7',
    },
    {
      num: '03',
      title: 'Speedboat Rapid Intercept',
      time: '< 90s',
      desc: 'NDRF jet-powered rescue speedboat receives live drone GPS coordinates and reaches the swimmer for extraction.',
      icon: '🚤',
      color: '#0284c7',
      bg: '#e0f2fe',
    },
    {
      num: '04',
      title: 'Landing Point & Ambulance Handover',
      time: '< 3 mins',
      desc: 'Swimmer transferred to medical landing deck; Green Corridor triggered for zero-delay hospital transit.',
      icon: '🚑',
      color: '#059669',
      bg: '#d1fae5',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStage(prev => (prev + 1) % stages.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [stages.length]);

  return (
    <SectionWrapper id="river">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 w-full flex-1 flex flex-col justify-start sm:justify-between gap-3 py-1 sm:py-2">
        <SectionHeader
          number="08 / RIVER SAFETY & WATER RESCUE"
          title="AI Drone & Speedboat Rapid Intercept"
          subtitle="A 4-tier river emergency response combining thermal AI drone scouting, automated flotation drop, and rapid boat recovery in under 90 seconds."
          color="#0284c7"
        />

        {/* 4-Stage Response Chain */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 my-1 sm:my-2">
          {stages.map((st, i) => (
            <div
              key={st.num}
              onClick={() => setActiveStage(i)}
              className={`p-2.5 sm:p-3.5 rounded-2xl glass transition-all cursor-pointer ${
                activeStage === i
                  ? 'border-sky-500 bg-sky-50/95 shadow-md -translate-y-0.5 ring-2 ring-sky-400/20'
                  : 'border-slate-200 bg-white/90 hover:border-sky-300'
              }`}
            >
              <div className="flex justify-between items-center mb-1.5 sm:mb-2">
                <span
                  className="px-2 py-0.5 rounded text-xs font-mono font-bold"
                  style={{ background: st.bg, color: st.color, border: `1px solid ${st.color}40` }}
                >
                  STAGE {st.num}
                </span>
                <span className="text-lg sm:text-xl">{st.icon}</span>
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-0.5 sm:mb-1">{st.title}</h4>
              <div className="text-[11px] sm:text-xs font-mono font-bold text-emerald-800 mb-0.5 sm:mb-1">Target: {st.time}</div>
              <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed line-clamp-2">{st.desc}</p>
            </div>
          ))}
        </div>

        {/* Interactive Godavari River Live Scenario */}
        <div className="grid md:grid-cols-12 gap-3 sm:gap-5 items-center my-1 sm:my-2">
          {/* River Canvas SVG */}
          <div className="md:col-span-8 rounded-2xl relative overflow-hidden bg-gradient-to-b from-sky-50 to-sky-100 border border-sky-200 h-[160px] sm:h-[210px] shadow-inner">
            <svg width="100%" height="100%" viewBox="0 0 500 200">
              <defs>
                <linearGradient id="riverFlowLight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#e0f2fe" />
                  <stop offset="50%" stopColor="#bae6fd" />
                  <stop offset="100%" stopColor="#7dd3fc" />
                </linearGradient>
              </defs>

              <rect width="500" height="200" fill="url(#riverFlowLight)" />

              {/* Water waves */}
              {[0, 1, 2].map(w => (
                <motion.path
                  key={w}
                  d={`M 0 ${110 + w * 25} Q 125 ${105 + w * 25} 250 ${110 + w * 25} T 500 ${110 + w * 25}`}
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                  strokeOpacity="0.6"
                  fill="none"
                  animate={{
                    d: [
                      `M 0 ${110 + w * 25} Q 125 ${105 + w * 25} 250 ${110 + w * 25} T 500 ${110 + w * 25}`,
                      `M 0 ${115 + w * 25} Q 125 ${118 + w * 25} 250 ${112 + w * 25} T 500 ${115 + w * 25}`,
                      `M 0 ${110 + w * 25} Q 125 ${105 + w * 25} 250 ${110 + w * 25} T 500 ${110 + w * 25}`,
                    ],
                  }}
                  transition={{ duration: 3 + w, repeat: Infinity, ease: 'easeInOut' }}
                />
              ))}

              {/* Ghat stairs */}
              <rect x="0" y="40" width="90" height="160" fill="#cbd5e1" stroke="#94a3b8" />
              <line x1="20" y1="40" x2="20" y2="200" stroke="#94a3b8" strokeWidth="1.5" />
              <line x1="40" y1="40" x2="40" y2="200" stroke="#94a3b8" strokeWidth="1.5" />
              <line x1="60" y1="40" x2="60" y2="200" stroke="#94a3b8" strokeWidth="1.5" />
              <line x1="80" y1="40" x2="80" y2="200" stroke="#94a3b8" strokeWidth="1.5" />
              <text x="45" y="70" fontSize="10" fill="#1e293b" textAnchor="middle" fontWeight="bold">GHAT STEPS</text>

              {/* Swimmer in distress */}
              <g transform="translate(240, 120)">
                <motion.circle
                  r="16"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2.5"
                  animate={{ r: [14, 24, 14], opacity: [0.9, 0.1, 0.9] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <circle r="8" fill="#ef4444" />
                <text y="4" fontSize="9" fill="white" textAnchor="middle" fontWeight="bold">!</text>
                <rect x="-58" y="-32" width="116" height="18" rx="4" fill="#ffffff" stroke="#ef4444" strokeWidth="1.5" />
                <text y="-20" fontSize="9" fill="#b91c1c" textAnchor="middle" fontWeight="bold">DISTRESS DETECTED</text>
              </g>

              {/* Drone Hovering */}
              <motion.g
                animate={{ x: [210, 240, 210], y: [45, 55, 45] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <text x="0" y="0" fontSize="24" textAnchor="middle">🚁</text>
                <line x1="0" y1="5" x2="0" y2="60" stroke="#0284c7" strokeWidth="2" strokeDasharray="4 3" />
                <rect x="-42" y="-24" width="84" height="16" rx="4" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" />
                <text x="0" y="-13" fontSize="8.5" fill="#0369a1" textAnchor="middle" fontWeight="bold">AI DRONE (8m)</text>
              </motion.g>

              {/* Rescue boat approaching */}
              <motion.g
                animate={{ x: [420, 290, 420] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                y="130"
              >
                <rect x="0" y="105" width="58" height="24" rx="6" fill="#ffffff" stroke="#059669" strokeWidth="2" />
                <text x="29" y="121" fontSize="13" textAnchor="middle">🚤</text>
                <text x="29" y="137" fontSize="8" fill="#047857" textAnchor="middle" fontWeight="bold">RESCUE-02</text>
              </motion.g>
            </svg>
          </div>

          {/* Quick Metrics & Human Oversight Callout */}
          <div className="md:col-span-4 space-y-3">
            <div className="glass p-4 rounded-2xl border border-slate-200 bg-white/95 shadow-sm space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-700 font-bold">Response Speed</span>
                <span className="text-emerald-800 font-black text-sm">&lt; 90 Seconds</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                <div className="h-full bg-emerald-500 w-[92%]" />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs shadow-sm space-y-1">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                <span>⚠️</span>
                <span>HUMAN OVERSIGHT AT CORE</span>
              </div>
              <p className="text-amber-900 text-xs leading-relaxed font-medium">
                Drones provide initial flotation and spot locations; trained NDRF & SDRF divers perform physical extraction.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-200 text-center text-xs font-mono">
          <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-xs text-slate-700">
            <strong>12 River AI Drones</strong> Active
          </div>
          <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-xs text-slate-700">
            Jet Rescue Boats: <strong>8 Units on Standby</strong>
          </div>
          <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-xs text-emerald-800 font-bold">
            Zero Drowning Casualty Target
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

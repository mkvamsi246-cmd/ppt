import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper, SectionHeader } from '../shared/UIComponents';

export default function AdaptiveTraffic() {
  const [activeJunction, setActiveJunction] = useState(0);
  const [dynamicGreen, setDynamicGreen] = useState(55);
  const [atcsActive, setAtcsActive] = useState(true);

  const junctions = [
    {
      name: 'Godavari Bridge Junction #04',
      queueLength: '18 Vehicles / lane',
      density: 'HIGH SURGE (88%)',
      densityColor: '#dc2626',
      densityBg: '#fee2e2',
      baseGreen: '30s',
      adaptiveGreen: '55s (+25s ATCS)',
      flowRate: '142 veh/min',
      iotSensors: 'ESP32 Node #12 · 4 Inductive Loops · 2 CCTV Counters',
      status: 'ADAPTING SIGNAL',
    },
    {
      name: 'Kotilingala Approach Junction',
      queueLength: '12 Vehicles / lane',
      density: 'MODERATE (62%)',
      densityColor: '#d97706',
      densityBg: '#fef3c7',
      baseGreen: '30s',
      adaptiveGreen: '42s (+12s ATCS)',
      flowRate: '98 veh/min',
      iotSensors: 'ESP32 Node #08 · 2 Inductive Loops · 2 CCTV Counters',
      status: 'FLOW BALANCED',
    },
    {
      name: 'Saraswathi Ghat Transit Cross',
      queueLength: '4 Vehicles / lane',
      density: 'LOW FLOW (24%)',
      densityColor: '#059669',
      densityBg: '#d1fae5',
      baseGreen: '30s',
      adaptiveGreen: '20s (-10s ATCS)',
      flowRate: '35 veh/min',
      iotSensors: 'ESP32 Node #03 · 2 Inductive Loops · 1 CCTV Counter',
      status: 'OPTIMAL CLEAR',
    },
    {
      name: 'Pushkar Ghat Ring Corridor',
      queueLength: '8 Vehicles / lane',
      density: 'STEADY (44%)',
      densityColor: '#0284c7',
      densityBg: '#e0f2fe',
      baseGreen: '30s',
      adaptiveGreen: '35s (+5s ATCS)',
      flowRate: '68 veh/min',
      iotSensors: 'ESP32 Node #15 · 4 Inductive Loops · 2 CCTV Counters',
      status: 'NORMAL INFLOW',
    },
  ];

  const currentJunc = junctions[activeJunction];

  useEffect(() => {
    if (!atcsActive) return;
    const t = setInterval(() => {
      setDynamicGreen(prev => (prev === 55 ? 65 : 55));
    }, 2500);
    return () => clearInterval(t);
  }, [atcsActive]);

  const iotPillars = [
    { step: '01', title: 'Roadside IoT Loops', desc: 'Inductive electromagnetic sensors measure vehicle queues.', icon: '⚡', color: '#0284c7', bg: '#e0f2fe' },
    { step: '02', title: 'ESP32 Edge Nodes', desc: 'Embedded microcontrollers process count at microsecond latency.', icon: '🧠', color: '#d97706', bg: '#fef3c7' },
    { step: '03', title: 'ATCS Dynamic Timing', desc: 'AI dynamically allocates +25s green time to high-surge arms.', icon: '🚦', color: '#059669', bg: '#d1fae5' },
    { step: '04', title: '-42% Idle Congestion', desc: 'Eliminates gridlock and saves 18+ mins arterial delay.', icon: '⏱️', color: '#7c3aed', bg: '#ede9fe' },
  ];

  return (
    <SectionWrapper id="adaptive">
      <div className="max-w-7xl mx-auto px-6 w-full flex-1 flex flex-col justify-between py-2">
        <SectionHeader
          number="05 / IOT ADAPTIVE TRAFFIC SYSTEM"
          title="IoT-Enabled Adaptive Traffic Control (ATCS)"
          subtitle="Roadside inductive loop sensors, ESP32 edge nodes, and AI vision dynamically adapt traffic light timings to eliminate festival gridlocks."
          color="#0284c7"
        />

        {/* ── 4-Stage IoT Pipeline ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-2">
          {iotPillars.map((item) => (
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

        {/* ── Live Animated ATCS Intersection Canvas ── */}
        <div className="rounded-2xl relative overflow-hidden bg-gradient-to-b from-slate-100 to-slate-50 border border-slate-200 h-[190px] shadow-inner my-2">
          <svg width="100%" height="100%" viewBox="0 0 640 190">
            <defs>
              <linearGradient id="roadBg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f1f5f9" />
                <stop offset="100%" stopColor="#e2e8f0" />
              </linearGradient>
            </defs>

            <rect width="640" height="190" fill="url(#roadBg)" />

            {/* Road surface - horizontal */}
            <rect x="0" y="75" width="640" height="40" fill="#475569" rx="2" />
            {/* Road surface - vertical */}
            <rect x="295" y="0" width="50" height="190" fill="#475569" />
            {/* Intersection box */}
            <rect x="295" y="75" width="50" height="40" fill="#64748b" />

            {/* Lane markings - horizontal */}
            {[80, 160, 240, 400, 480, 560].map((x, i) => (
              <rect key={`hm-${i}`} x={x} y="93" width="30" height="4" fill="#fbbf24" opacity="0.7" rx="2" />
            ))}
            {/* Lane markings - vertical */}
            {[25, 55, 130, 160].map((y, i) => (
              <rect key={`vm-${i}`} x="313" y={y} width="4" height="20" fill="#fbbf24" opacity="0.7" rx="2" />
            ))}

            {/* Traffic lights (N/S/E/W) */}
            {/* West side light (controls east-bound traffic) */}
            <g transform="translate(270, 80)">
              <rect x="-10" y="-10" width="20" height="36" rx="4" fill="#1e293b" />
              <motion.circle cx="0" cy="0" r="6"
                fill="#ef4444"
                animate={{ opacity: [1, 1, 0, 0, 1] }}
                transition={{ duration: 4, repeat: Infinity, times: [0, 0.4, 0.41, 0.95, 1] }}
              />
              <motion.circle cx="0" cy="16" r="6"
                fill="#22c55e"
                animate={{ opacity: [0, 0, 1, 1, 0] }}
                transition={{ duration: 4, repeat: Infinity, times: [0, 0.4, 0.41, 0.95, 1] }}
              />
              <rect x="-28" y="-14" width="46" height="12" rx="3" fill="white" stroke="#64748b" strokeWidth="1" />
              <text x="-5" y="-5" fontSize="6.5" fill="#0369a1" fontWeight="bold">WEST</text>
            </g>

            {/* East side light */}
            <g transform="translate(370, 88)">
              <rect x="-10" y="-10" width="20" height="36" rx="4" fill="#1e293b" />
              <motion.circle cx="0" cy="0" r="6"
                fill="#ef4444"
                animate={{ opacity: [0, 0, 1, 1, 0] }}
                transition={{ duration: 4, repeat: Infinity, times: [0, 0.4, 0.41, 0.95, 1] }}
              />
              <motion.circle cx="0" cy="16" r="6"
                fill="#22c55e"
                animate={{ opacity: [1, 1, 0, 0, 1] }}
                transition={{ duration: 4, repeat: Infinity, times: [0, 0.4, 0.41, 0.95, 1] }}
              />
              <rect x="-18" y="-14" width="46" height="12" rx="3" fill="white" stroke="#64748b" strokeWidth="1" />
              <text x="-5" y="-5" fontSize="6.5" fill="#0369a1" fontWeight="bold">EAST</text>
            </g>

            {/* North signal */}
            <g transform="translate(302, 60)">
              <rect x="-10" y="-10" width="20" height="36" rx="4" fill="#1e293b" />
              <motion.circle cx="0" cy="0" r="6"
                fill="#ef4444"
                animate={{ opacity: [1, 1, 0, 0, 1] }}
                transition={{ duration: 4, repeat: Infinity, delay: 2, times: [0, 0.4, 0.41, 0.95, 1] }}
              />
              <motion.circle cx="0" cy="16" r="6"
                fill="#22c55e"
                animate={{ opacity: [0, 0, 1, 1, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 2, times: [0, 0.4, 0.41, 0.95, 1] }}
              />
            </g>

            {/* Vehicle queues - west arm (shrinking when green) */}
            <motion.g
              animate={{ x: [0, -18, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              {[40, 80, 130, 180, 225].map((x, i) => (
                <g key={`wv-${i}`} transform={`translate(${x}, 82)`}>
                  <rect x="0" y="0" width="22" height="12" rx="2" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
                  <text x="11" y="9" fontSize="9" textAnchor="middle">🚗</text>
                </g>
              ))}
            </motion.g>

            {/* Vehicle queues - east arm (heavy surge side — shrinking in AI phase) */}
            <motion.g
              animate={{ x: [0, 28, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            >
              {[360, 400, 445, 490, 535, 580].map((x, i) => (
                <g key={`ev-${i}`} transform={`translate(${x}, 82)`}>
                  <rect x="0" y="0" width="22" height="12" rx="2" fill="#fde68a" stroke="#d97706" strokeWidth="1" />
                  <text x="11" y="9" fontSize="9" textAnchor="middle">🚗</text>
                </g>
              ))}
            </motion.g>

            {/* IoT inductive loop sensor pulses */}
            {[240, 400].map((x, i) => (
              <motion.ellipse key={`loop-${i}`} cx={x} cy="95" rx="18" ry="8"
                fill="none" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="4 3"
                animate={{ opacity: [0.3, 1, 0.3], rx: [16, 22, 16] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.6 }}
              />
            ))}

            {/* ESP32 Edge Node */}
            <g transform="translate(320, 10)">
              <rect x="-38" y="-8" width="76" height="16" rx="4" fill="white" stroke="#0284c7" strokeWidth="1.5" />
              <text x="0" y="5" fontSize="7" fill="#0369a1" textAnchor="middle" fontWeight="bold">📟 ESP32 NODE #12</text>
              <motion.line x1="0" y1="8" x2="0" y2="65"
                stroke="#0284c7" strokeWidth="1.5" strokeDasharray="3 3"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
            </g>

            {/* ATCS Override label on active junction */}
            <rect x="290" y="122" width="60" height="16" rx="4" fill="#059669" />
            <motion.text x="320" y="133" fontSize="7" fill="white" textAnchor="middle" fontWeight="bold"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}>
              ⚡ ATCS ACTIVE
            </motion.text>

            {/* Timer badge — adaptive green counter */}
            <motion.g animate={{ opacity: [1, 0.6, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <rect x="200" y="52" width="72" height="16" rx="4" fill="#065f46" />
              <text x="236" y="63" fontSize="7.5" fill="#6ee7b7" textAnchor="middle" fontWeight="bold">GREEN: +25s AI</text>
            </motion.g>

            {/* LIVE badge */}
            <rect x="8" y="8" width="44" height="14" rx="3" fill="#dc2626" />
            <motion.text x="30" y="19" fontSize="8" fill="white" textAnchor="middle" fontWeight="bold"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}>
              ● LIVE
            </motion.text>

            {/* Road label */}
            <rect x="58" y="8" width="106" height="14" rx="3" fill="white" stroke="#64748b" strokeWidth="1" />
            <text x="111" y="19" fontSize="7" fill="#334155" textAnchor="middle" fontWeight="bold">GODAVARI BRIDGE JCT #04</text>
          </svg>
        </div>

        {/* ── Main 2-Column Dashboard ── */}
        <div className="grid lg:grid-cols-12 gap-5 items-stretch my-2">
          {/* Left Column: 4 IoT Junction Selector */}
          <div className="lg:col-span-6 glass rounded-2xl p-4 border border-slate-200 bg-white/95 shadow-md flex flex-col justify-between space-y-3">
            <div>
              <div className="flex justify-between items-center mb-2.5 pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-slate-900 font-bold text-sm tracking-wide">
                    SELECT IOT ARTERIAL JUNCTION
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                  28 SENSORS ONLINE
                </span>
              </div>

              <div className="space-y-2">
                {junctions.map((junc, i) => (
                  <div
                    key={junc.name}
                    onClick={() => setActiveJunction(i)}
                    className={`p-3 rounded-xl glass border transition-all cursor-pointer ${
                      activeJunction === i
                        ? 'border-sky-500 bg-sky-50/90 shadow-md ring-2 ring-sky-400/20'
                        : 'border-slate-200 bg-white/70 hover:border-sky-300'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-slate-900 font-bold text-sm">{junc.name}</span>
                      <span
                        className="px-2 py-0.5 rounded text-xs font-mono font-bold uppercase"
                        style={{ background: junc.densityBg, color: junc.densityColor, border: `1px solid ${junc.densityColor}30` }}
                      >
                        {junc.status}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs font-medium text-slate-600">
                      <span>Queue: <strong className="text-slate-800">{junc.queueLength}</strong></span>
                      <span className="font-bold" style={{ color: junc.densityColor }}>{junc.density}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 flex justify-between items-center shadow-xs">
              <span className="text-amber-800 font-bold">⚡ Adaptive Cycle Timing: Active</span>
              <span className="text-emerald-700 font-bold">Latency: &lt; 50ms (Edge)</span>
            </div>
          </div>

          {/* Right Column: Live ATCS Dynamic Timing Telemetry */}
          <div className="lg:col-span-6 glass rounded-2xl p-4 border border-slate-200 bg-white/95 shadow-md flex flex-col justify-between space-y-3">
            <div>
              <div className="flex justify-between items-center mb-2.5 pb-2 border-b border-slate-100">
                <span className="text-slate-900 font-bold text-sm">
                  ATCS DYNAMIC GREEN-LIGHT CONTROLLER
                </span>
                <button
                  onClick={() => setAtcsActive(prev => !prev)}
                  className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 cursor-pointer shadow-xs"
                >
                  {atcsActive ? '✓ ATCS AI ACTIVE' : 'FIXED TIMER'}
                </button>
              </div>

              {/* Dynamic Timing Card */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 mb-3 space-y-2">
                <div className="text-xs font-mono font-bold text-sky-800 uppercase">SELECTED NODE TELEMETRY</div>
                <div className="text-slate-900 font-black text-base">{currentJunc.name}</div>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono pt-1">
                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
                    <span className="text-slate-500 font-medium block mb-0.5">Base Fixed Timer</span>
                    <strong className="text-slate-800 text-base font-black">30 Seconds</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 shadow-xs">
                    <span className="text-emerald-800 font-medium block mb-0.5">IoT Adaptive Green</span>
                    <strong className="text-emerald-700 text-base font-black">{dynamicGreen}s (+25s AI)</strong>
                  </div>
                </div>
              </div>

              {/* Hardware & Microcontroller Telemetry */}
              <div className="p-3 rounded-xl bg-sky-50/70 border border-sky-200 text-xs text-slate-700 space-y-1">
                <div className="text-sky-900 font-bold flex items-center gap-1.5">
                  <span>📟</span>
                  <span>HARDWARE & SENSOR INTERFACING:</span>
                </div>
                <p className="font-mono text-slate-800 text-xs font-semibold">{currentJunc.iotSensors}</p>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Detects approach density in real time, expanding green phase to prevent vehicle queue spillovers into adjoining ghats.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs flex justify-between items-center shadow-xs">
              <span className="text-emerald-900 font-bold">✓ Average Wait Time Savings:</span>
              <span className="text-emerald-800 font-black text-sm font-mono">-42% Arterial Delay</span>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-200 text-center text-xs font-mono">
          <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-xs text-slate-700">
            <strong>28 IoT Smart Nodes</strong> Operational
          </div>
          <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-xs text-slate-700">
            Microcontroller: <strong>ESP32 Edge Mesh</strong>
          </div>
          <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-xs text-emerald-800 font-bold">
            Zero Bridge Deadlocks Target
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

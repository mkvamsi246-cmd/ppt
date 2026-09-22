import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { SectionWrapper, SectionHeader } from '../shared/UIComponents';
import { ROAD_ZONES } from '../../data/content';

export default function TrafficManagement() {
  const [signalGreenTime, setSignalGreenTime] = useState(45);
  const [adaptiveMode, setAdaptiveMode] = useState(true);

  useEffect(() => {
    if (!adaptiveMode) return;
    const interval = setInterval(() => {
      setSignalGreenTime(prev => (prev === 45 ? 65 : 45));
    }, 3000);
    return () => clearInterval(interval);
  }, [adaptiveMode]);

  const trafficWorkflow = [
    { step: '01', title: 'IoT Edge Sensors', desc: 'Inductive loops & ESP32 cameras count vehicles in real time', icon: '📡' },
    { step: '02', title: 'Adaptive ATCS Engine', desc: 'Dynamically extends green light (+20s) during rush surges', icon: '🚦' },
    { step: '03', title: 'Ambulance Preemption', desc: 'GPS transponders trigger instant uninterrupted green wave', icon: '🚑' },
    { step: '04', title: '11-Min Hospital ETA', desc: 'Cuts transit time by 75% with zero festival gridlocks', icon: '🏥' },
  ];

  return (
    <SectionWrapper id="traffic">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 w-full flex flex-col justify-between h-full py-1">
        <SectionHeader
          number="05 / IOT ADAPTIVE TRAFFIC & GREEN CORRIDOR"
          title="IoT-Enabled Adaptive Traffic Control System (ATCS)"
          subtitle="Roadside IoT sensors and AI vision dynamically adapt traffic light timings to clear congestion, while automating Green Wave preemption for ambulances."
          color="#ffd600"
        />

        {/* ── 4-Stage Workflow Chain ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2.5">
          {trafficWorkflow.map((item) => (
            <div
              key={item.step}
              className="glass rounded-xl p-2 border border-amber-500/20 flex items-center gap-2"
            >
              <div className="w-6 h-6 rounded-lg bg-amber-500/20 border border-amber-400/40 text-amber-300 font-mono text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                {item.step}
              </div>
              <div className="truncate">
                <div className="font-bold text-white text-[11px] truncate flex items-center gap-1">
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                </div>
                <div className="text-[9px] text-slate-400 truncate">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Main 2-Column Dashboard ── */}
        <div className="grid lg:grid-cols-12 gap-3 items-stretch my-auto">
          {/* Left Column: IoT Adaptive Junction Telemetry */}
          <div className="lg:col-span-6 glass rounded-2xl p-3 border border-amber-500/30 flex flex-col justify-between bg-gradient-to-b from-amber-950/20 to-slate-950/80">
            <div>
              <div className="flex justify-between items-center mb-2 pb-1.5 border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  <span className="text-amber-300 font-mono text-[11px] font-bold">
                    IOT ADAPTIVE SIGNAL TIMING (ATCS)
                  </span>
                </div>
                <button
                  onClick={() => setAdaptiveMode(prev => !prev)}
                  className="text-[9px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 cursor-pointer"
                >
                  {adaptiveMode ? '✓ ATCS AUTOMATIC' : 'MANUAL OVERRIDE'}
                </button>
              </div>

              {/* IoT Junction Telemetry */}
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="p-2 rounded-xl bg-slate-900/80 border border-white/5">
                  <div className="text-[9px] font-mono text-slate-400">JUNCTION NODE #04</div>
                  <div className="text-white font-bold text-xs">Godavari Bridge Junction</div>
                  <div className="text-emerald-400 text-[10px] font-mono">
                    Adaptive Green: <strong className="text-white text-xs">{signalGreenTime}s</strong> (Dynamic)
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-slate-900/80 border border-amber-500/20">
                  <div className="text-[9px] font-mono text-slate-400">IOT SENSOR DENSITY</div>
                  <div className="text-amber-300 font-bold text-xs">142 Vehicles / min</div>
                  <div className="text-emerald-300 text-[9px] font-mono">Wait Time Reduced: -42%</div>
                </div>
              </div>

              {/* Road Corridors */}
              <div className="space-y-1.5">
                {ROAD_ZONES.slice(0, 3).map((zone) => (
                  <div key={zone.id} className="p-1.5 rounded-lg bg-slate-900/60 border border-white/5">
                    <div className="flex justify-between items-center text-[10px] mb-0.5">
                      <span className="text-slate-200 font-bold">{zone.label}</span>
                      <span className="font-mono font-bold" style={{ color: zone.color }}>
                        {zone.load}% LOAD ({zone.status})
                      </span>
                    </div>
                    <div className="w-full h-1 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full" style={{ width: `${zone.load}%`, background: zone.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-300 flex items-center justify-between mt-2">
              <span>📡 IoT Hardware: ESP32 + Inductive Loops</span>
              <span className="font-bold">Zero Cloud Latency</span>
            </div>
          </div>

          {/* Right Column: Emergency Green Wave Preemption */}
          <div className="lg:col-span-6 glass rounded-2xl p-3 border border-emerald-500/30 flex flex-col justify-between bg-gradient-to-b from-emerald-950/20 to-slate-950/80">
            <div>
              <div className="flex justify-between items-center mb-2 pb-1.5 border-b border-white/10">
                <span className="text-emerald-300 font-mono text-[11px] font-bold flex items-center gap-1.5">
                  <span>🟢</span>
                  <span>GREEN CORRIDOR AUTOMATION SCHEMATIC</span>
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                  SIGNAL PREEMPTION: ACTIVE
                </span>
              </div>

              {/* Animated SVG Green Wave Road */}
              <div className="h-[120px] w-full rounded-xl overflow-hidden bg-[#030914] border border-cyan-500/20 relative flex items-center mb-2">
                <svg width="100%" height="100%" viewBox="0 0 380 120">
                  {/* Road */}
                  <line x1="0" y1="60" x2="380" y2="60" stroke="#00e676" strokeWidth="8" strokeLinecap="round" strokeDasharray="6 4" />
                  <line x1="0" y1="60" x2="160" y2="60" stroke="#ff2d4a50" strokeWidth="8" strokeLinecap="round" />
                  <line x1="160" y1="0" x2="160" y2="120" stroke="#ffd60040" strokeWidth="5" strokeLinecap="round" />

                  {/* Ambulance moving */}
                  <motion.g
                    animate={{ x: [20, 150, 300] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <circle cx="0" cy="60" r="11" fill="#00e676" />
                    <text x="-5" y="64" fontSize="11">🚑</text>
                  </motion.g>

                  {/* Smart Traffic Junction */}
                  <circle cx="160" cy="60" r="7" fill="#00e676" stroke="#ffffff" strokeWidth="1.5" />
                  <text x="175" y="64" fill="#00e676" fontSize="9" fontFamily="monospace" fontWeight="bold">Jct 4: GREEN WAVE</text>

                  {/* Govt Hospital */}
                  <rect x="315" y="42" width="36" height="36" rx="4" fill="#00d4ff20" stroke="#00d4ff" strokeWidth="1.5" />
                  <text x="333" y="63" fontSize="12" textAnchor="middle">🏥</text>
                  <text x="333" y="88" fill="#00d4ff" fontSize="7" textAnchor="middle" fontFamily="monospace">Govt Hosp</text>
                </svg>
              </div>

              {/* Preemption Stats */}
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                <div className="p-2 rounded-xl bg-slate-900/80 border border-white/5">
                  <span className="text-slate-400 block">Ambulance ETA</span>
                  <strong className="text-emerald-400 text-xs">11 Mins</strong> (was 45m+)
                </div>
                <div className="p-2 rounded-xl bg-slate-900/80 border border-white/5">
                  <span className="text-slate-400 block">Preempted Signals</span>
                  <strong className="text-cyan-300 text-xs">3 Junctions Cleared</strong>
                </div>
              </div>
            </div>

            <div className="p-2 rounded-xl bg-slate-900/90 border border-white/10 text-[10px] font-mono text-slate-300 flex justify-between items-center mt-2">
              <span className="text-amber-300">⚡ IoT Priority: Active</span>
              <span className="text-emerald-400 font-bold">Zero Traffic Delays</span>
            </div>
          </div>
        </div>

        {/* ── Bottom Telemetry Strip ── */}
        <div className="p-2 rounded-xl glass border border-white/10 flex flex-wrap items-center justify-between text-[10px] font-mono text-slate-300 mt-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>28 IoT Smart Junctions Monitored</span>
          </div>
          <div className="text-cyan-300">
            Perimeter Parking Lots: A (82%), B (41%), C (18%)
          </div>
          <div className="text-emerald-400 font-bold">
            Average Gridlock Reduction: 68%
          </div>
        </div>
      </div>
      <div className="bg-grid absolute inset-0 pointer-events-none opacity-20" />
    </SectionWrapper>
  );
}

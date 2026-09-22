import { useState, useEffect } from 'react';
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

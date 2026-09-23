import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { SectionWrapper, SectionHeader } from '../shared/UIComponents';
import { MISSING_PERSON_CASES } from '../../data/content';

export default function MissingPersons() {
  const [selectedCase, setSelectedCase] = useState(MISSING_PERSON_CASES[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(100);
  const [reunitedNotice, setReunitedNotice] = useState<string | null>(null);

  const startScanSimulation = (item: typeof MISSING_PERSON_CASES[0]) => {
    setSelectedCase(item);
    setIsScanning(true);
    setScanProgress(0);
    setReunitedNotice(null);
  };

  useEffect(() => {
    if (!isScanning) return;
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setReunitedNotice(`✓ MATCH CONFIRMED: ${selectedCase.name} located at ${selectedCase.lastSeen} with ${selectedCase.confidence}% confidence! Nearest patrol dispatched.`);
          return 100;
        }
        return prev + 25;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [isScanning, selectedCase]);

  const reidWorkflow = [
    { step: '1. REPORT', title: 'Photo / Wristband', desc: 'BLE smart wristband boundary trigger or photo upload.', icon: '📱', color: '#0284c7', bg: '#e0f2fe' },
    { step: '2. AI SCAN', title: '520 CCTV Re-ID', desc: 'Cosine similarity matching across camera feeds in seconds.', icon: '👁️', color: '#d97706', bg: '#fef3c7' },
    { step: '3. DISPATCH', title: 'Officer GPS Ping', desc: 'Encrypted push sent to the closest on-duty patrol officer.', icon: '📍', color: '#7c3aed', bg: '#ede9fe' },
    { step: '4. REUNITE', title: '< 7 Mins Return', desc: 'Pilgrim safely returned and recorded in audit log.', icon: '🤝', color: '#059669', bg: '#d1fae5' },
  ];

  return (
    <SectionWrapper id="missing">
      <div className="max-w-7xl mx-auto px-6 w-full flex-1 flex flex-col justify-between py-2">
        <SectionHeader
          number="09 / AI MISSING PERSON & CHILD REUNIFICATION"
          title="AI Facial Re-ID & Smart Wristband Tracking"
          subtitle="How deep learning facial feature extraction and BLE wristbands reunite lost pilgrims in minutes."
          color="#0284c7"
        />

        {/* ── 4-Stage Workflow Chain ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-2">
          {reidWorkflow.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl p-3.5 border border-slate-200 bg-white/95 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-xs font-mono font-bold px-2.5 py-1 rounded-md"
                    style={{ background: item.bg, color: item.color, border: `1px solid ${item.color}40` }}
                  >
                    {item.step}
                  </span>
                  <span className="text-xl">{item.icon}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Live Animated Facial Re-ID Canvas ── */}
        <div className="rounded-2xl relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800 border border-slate-700 h-[180px] shadow-inner my-2">
          <svg width="100%" height="100%" viewBox="0 0 640 180">
            <defs>
              <radialGradient id="facePulse" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="blePulse" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Dark ghat background */}
            <rect width="640" height="180" fill="#0f172a" />
            {/* Ground grid */}
            {Array.from({ length: 10 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 18} x2="640" y2={i * 18} stroke="#1e293b" strokeWidth="1" />
            ))}
            {Array.from({ length: 18 }).map((_, i) => (
              <line key={`v${i}`} x1={i * 36} y1="0" x2={i * 36} y2="180" stroke="#1e293b" strokeWidth="1" />
            ))}

            {/* Pilgrim crowd dots */}
            {[
              [80,90],[110,110],[130,75],[160,95],[190,115],[220,80],
              [350,90],[380,110],[410,75],[440,100],[470,85],[500,115],
            ].map(([x,y], i) => (
              <g key={`pilgrim-${i}`}>
                <circle cx={x} cy={y} r="8" fill="#334155" stroke="#475569" strokeWidth="1" />
                <text x={x} y={y + 4} fontSize="9" textAnchor="middle">👤</text>
              </g>
            ))}

            {/* CCTV cameras top */}
            {[60, 200, 340, 480, 580].map((x, i) => (
              <g key={`cctv-${i}`} transform={`translate(${x}, 12)`}>
                <rect x="-12" y="-8" width="24" height="14" rx="3" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                <text x="0" y="4" fontSize="10" textAnchor="middle">📷</text>
                {/* Scan cone from camera */}
                <motion.polygon
                  points={`0,6 -30,80 30,80`}
                  fill="#0ea5e9"
                  animate={{ opacity: [0.05, 0.18, 0.05] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                />
              </g>
            ))}

            {/* AI Scan sweep line */}
            <motion.line
              y1="20" y2="160"
              stroke="#0ea5e9" strokeWidth="2" strokeOpacity="0.6" strokeDasharray="6 4"
              animate={{ x1: [40, 580, 40], x2: [40, 580, 40] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            />
            <motion.rect
              y="20" width="4" height="140"
              fill="#0ea5e9" opacity="0.25"
              animate={{ x: [40, 580, 40] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            />

            {/* MATCH bounding box — appears on target pilgrim */}
            <motion.rect
              x="102" y="65" width="26" height="34" rx="3"
              fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="4 2"
              animate={{ opacity: [0, 0, 1, 1, 0], scaleX: [0.7, 0.7, 1, 1, 0.7], scaleY: [0.7, 0.7, 1, 1, 0.7] }}
              style={{ transformOrigin: '115px 82px' }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeOut', times: [0, 0.35, 0.45, 0.75, 1] }}
            />
            {/* Match label */}
            <motion.g
              animate={{ opacity: [0, 0, 1, 1, 0] }}
              transition={{ duration: 5, repeat: Infinity, times: [0, 0.44, 0.48, 0.75, 1] }}
            >
              <rect x="85" y="48" width="68" height="14" rx="3" fill="#15803d" />
              <text x="119" y="59" fontSize="7" fill="white" textAnchor="middle" fontWeight="bold">✓ MATCH 98.4%</text>
            </motion.g>

            {/* BLE Wristband signal */}
            <motion.circle cx="440" cy="100" r="18"
              fill="url(#blePulse)"
              animate={{ r: [14, 34, 14], opacity: [0.9, 0.1, 0.9] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <circle cx="440" cy="100" r="8" fill="#7c3aed" />
            <text x="440" y="104" fontSize="8" fill="white" textAnchor="middle">📡</text>
            <rect x="398" y="62" width="84" height="12" rx="3" fill="#4c1d95" />
            <text x="440" y="72" fontSize="6.5" fill="#c4b5fd" textAnchor="middle" fontWeight="bold">BLE ID: WB-4721-K</text>

            {/* Officer moving toward match */}
            <motion.g animate={{ x: [320, 100, 320] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
              <circle cy="145" r="10" fill="#1e40af" stroke="#3b82f6" strokeWidth="2" />
              <text y="149" fontSize="11" textAnchor="middle">👮</text>
              <rect x="-28" y="128" width="56" height="12" rx="3" fill="#1e40af" />
              <text y="137" fontSize="6.5" fill="#bfdbfe" textAnchor="middle" fontWeight="bold">ALPHA-7 DISPATCH</text>
            </motion.g>

            {/* LIVE badge */}
            <rect x="8" y="8" width="40" height="13" rx="3" fill="#dc2626" />
            <motion.text x="28" y="18" fontSize="7.5" fill="white" textAnchor="middle" fontWeight="bold"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}>
              ● LIVE
            </motion.text>

            {/* Re-ID label */}
            <rect x="54" y="8" width="100" height="13" rx="3" fill="#0c4a6e" />
            <text x="104" y="18" fontSize="7" fill="#38bdf8" textAnchor="middle" fontWeight="bold">AI FACIAL RE-ID ACTIVE</text>

            {/* Confidence counter */}
            <motion.g animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 2.5, repeat: Infinity }}>
              <rect x="530" y="8" width="98" height="13" rx="3" fill="#14532d" />
              <text x="579" y="18" fontSize="7" fill="#86efac" textAnchor="middle" fontWeight="bold">520 CCTVs SCANNING</text>
            </motion.g>
          </svg>
        </div>

        {/* ── Interactive Command & Re-ID Simulation Panel ── */}
        <div className="grid lg:grid-cols-12 gap-5 items-stretch my-2">
          {/* Left Column: Active Cases */}
          <div className="lg:col-span-5 space-y-2.5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-wider text-slate-900 uppercase flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-600 animate-pulse" />
                Select Missing Person Case
              </span>
              <span className="text-xs text-slate-500 font-mono font-semibold">Live Demo Cases</span>
            </div>

            <div className="space-y-2">
              {MISSING_PERSON_CASES.map((item) => {
                const isSelected = selectedCase.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => startScanSimulation(item)}
                    className={`glass rounded-xl p-3 cursor-pointer transition-all border ${
                      isSelected
                        ? 'border-sky-500 shadow-md bg-sky-50/90 ring-2 ring-sky-400/20'
                        : 'border-slate-200 bg-white/80 hover:border-sky-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl p-2 rounded-xl bg-white border border-slate-200 shadow-xs">
                          {item.avatar}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                            {item.name}
                            <span className="text-xs text-slate-500 font-normal">({item.age}y)</span>
                          </div>
                          <div className="text-xs text-sky-800 font-bold">{item.category}</div>
                          <div className="text-xs text-slate-600 font-medium">
                            📍 {item.lastSeen}
                          </div>
                        </div>
                      </div>
                      <span
                        className="text-xs font-mono px-2.5 py-0.5 rounded-full font-bold uppercase"
                        style={{
                          background: item.status.includes('ACTIVE') ? '#fee2e2' : '#fef3c7',
                          color: item.status.includes('ACTIVE') ? '#b91c1c' : '#b45309',
                          border: `1px solid ${item.status.includes('ACTIVE') ? '#fca5a5' : '#fde68a'}`,
                        }}
                      >
                        {item.status.split(' ')[0]}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              id="trigger-missing-scan-btn"
              onClick={() => startScanSimulation(selectedCase)}
              disabled={isScanning}
              className="w-full py-3 px-4 rounded-xl font-bold text-xs md:text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md bg-sky-600 hover:bg-sky-500 text-white"
            >
              {isScanning ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Scanning 520 CCTVs...
                </>
              ) : (
                <>
                  <span>🔍</span> Run Live AI Re-ID Match Simulation
                </>
              )}
            </button>
          </div>

          {/* Right Column: AI Target Identified Viewport */}
          <div className="lg:col-span-7">
            <div className="glass rounded-2xl p-4 border border-slate-200 flex flex-col justify-between relative overflow-hidden bg-white/95 shadow-md h-full space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <div className="text-xs font-mono text-sky-900 font-bold tracking-wider uppercase">
                    AI VISION FEED · LIVE MATCH TELEMETRY
                  </div>
                  <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    {selectedCase.cctvMatch}
                  </div>
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold">
                  CONFIDENCE: {selectedCase.confidence}%
                </span>
              </div>

              {/* Target Identification Box */}
              <div className="relative rounded-xl overflow-hidden bg-slate-50 border border-slate-200 p-4 flex flex-col items-center justify-center">
                {isScanning && (
                  <div className="absolute inset-0 bg-sky-900/85 backdrop-blur-xs z-20 flex flex-col items-center justify-center p-4 text-center">
                    <div className="text-3xl mb-2 animate-bounce">🎯</div>
                    <div className="text-white font-mono font-bold text-xs md:text-sm tracking-wider mb-2">
                      MATCHING FACIAL VECTORS ACROSS 520 CCTVS...
                    </div>
                    <div className="w-56 bg-white/20 rounded-full h-2.5 overflow-hidden border border-white/40">
                      <div
                        className="h-full bg-emerald-400 transition-all duration-150"
                        style={{ width: `${scanProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="w-full flex items-center gap-4 bg-white border border-sky-200 rounded-xl p-3.5 shadow-sm">
                  <div className="text-4xl p-2.5 rounded-2xl bg-sky-50 border-2 border-dashed border-sky-400 flex-shrink-0">
                    {selectedCase.avatar}
                  </div>
                  <div className="flex-1 space-y-1 text-left text-xs md:text-sm">
                    <div className="font-mono text-sky-900 font-bold uppercase flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      TARGET ACQUIRED: {selectedCase.name}
                    </div>
                    <div className="text-slate-700">
                      <strong>Telemetry:</strong> <span className="font-mono">{selectedCase.wristbandId}</span>
                    </div>
                    <div className="text-slate-700">
                      <strong>Location:</strong> {selectedCase.lastSeen}
                    </div>
                    <div className="text-amber-900 font-mono font-bold text-xs">
                      <strong>Dispatch Assigned:</strong> {selectedCase.officer}
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {reunitedNotice && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-3 px-3 py-1.5 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-semibold text-center z-10 w-full"
                    >
                      {reunitedNotice}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 4 Pillars Mini Banner */}
              <div className="pt-2 border-t border-slate-100 grid grid-cols-4 gap-2 text-center text-xs font-mono">
                <div className="p-2 rounded-xl bg-sky-50 text-sky-900 font-bold border border-sky-100">1. Photo Upload</div>
                <div className="p-2 rounded-xl bg-amber-50 text-amber-900 font-bold border border-amber-100">2. CCTV Re-ID</div>
                <div className="p-2 rounded-xl bg-purple-50 text-purple-900 font-bold border border-purple-100">3. Officer Ping</div>
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-900 font-bold border border-emerald-100">4. &lt; 7m Reunited</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

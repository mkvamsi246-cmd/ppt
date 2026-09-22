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

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { SectionWrapper, SectionHeader } from '../shared/UIComponents';
import { SMART_PARKING_LOTS, ANPR_DEMO_VEHICLES } from '../../data/content';

export default function SmartParking() {
  const [selectedLot, setSelectedLot] = useState(SMART_PARKING_LOTS[2]); // Saraswathi Ghat Lot C
  const [selectedVehicle, setSelectedVehicle] = useState(ANPR_DEMO_VEHICLES[0]);
  const [isScanningPlate, setIsScanningPlate] = useState(false);
  const [scanProgress, setScanProgress] = useState(100);
  const [allocationNotice, setAllocationNotice] = useState<string | null>(null);

  const startANPRScan = (veh: typeof ANPR_DEMO_VEHICLES[0]) => {
    setSelectedVehicle(veh);
    setIsScanningPlate(true);
    setScanProgress(0);
    setAllocationNotice(null);
  };

  useEffect(() => {
    if (!isScanningPlate) return;
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanningPlate(false);
          setAllocationNotice(`✓ ANPR VERIFIED: ${selectedVehicle.plate} detected at ${selectedVehicle.entryGate}. Allocated ${selectedVehicle.assignedSlot}. Boom Barrier Raised!`);
          return 100;
        }
        return prev + 25;
      });
    }, 140);
    return () => clearInterval(interval);
  }, [isScanningPlate, selectedVehicle]);

  const parkingWorkflow = [
    { step: '01', title: 'App Live Monitoring', desc: 'Pilgrims check live vacant slots near their destination Ghat on the mobile app.', icon: '📱', color: '#0284c7', bg: '#e0f2fe' },
    { step: '02', title: 'ANPR Plate Scan', desc: 'Onsite entrance camera detects vehicle number plate in < 1.2s with 99%+ accuracy.', icon: '📷', color: '#d97706', bg: '#fef3c7' },
    { step: '03', title: 'Auto Slot Assignment', desc: 'Edge system reserves the optimal vacant bay and sends turn-by-turn map to driver.', icon: '🅿️', color: '#059669', bg: '#d1fae5' },
    { step: '04', title: 'Barrier & App Guidance', desc: 'IoT boom barrier lifts automatically; app saves vehicle GPS for easy post-darshan return.', icon: '⚡', color: '#7c3aed', bg: '#ede9fe' },
  ];

  return (
    <SectionWrapper id="parking">
      <div className="max-w-7xl mx-auto px-6 w-full flex-1 flex flex-col justify-between py-2">
        <SectionHeader
          number="06 / SMART PARKING & ANPR SYSTEM"
          title="AI Number Plate Detection & App Slot Guidance"
          subtitle="Onsite high-speed ANPR cameras scan vehicle plates and auto-assign dedicated parking slots, synchronized with live pilgrim mobile app navigation."
          color="#0284c7"
        />

        {/* ── 4-Stage Workflow Architecture ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-2">
          {parkingWorkflow.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl p-4 border border-slate-200 bg-white/95 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-xs font-mono font-bold px-2.5 py-1 rounded-md"
                    style={{ background: item.bg, color: item.color, border: `1px solid ${item.color}40` }}
                  >
                    PHASE {item.step}
                  </span>
                  <span className="text-xl">{item.icon}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Interactive 2-Column Command Workspace ── */}
        <div className="grid lg:grid-cols-12 gap-5 my-2 items-stretch">
          {/* Left Column: Ghat Parking Lots & Mobile App Live Sync */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-wider text-slate-800 uppercase flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                Select Ghat Smart Parking Lot (App Live Feed)
              </span>
              <span className="text-xs font-mono font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                4 LOTS · 1,150 TOTAL SPACES
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {SMART_PARKING_LOTS.map((lot) => {
                const isSelected = selectedLot.id === lot.id;
                const percent = Math.round((lot.occupiedSlots / lot.totalSlots) * 100);
                return (
                  <div
                    key={lot.id}
                    onClick={() => setSelectedLot(lot)}
                    className={`glass rounded-xl p-3 cursor-pointer transition-all border ${
                      isSelected
                        ? 'border-sky-500 bg-sky-50/90 shadow-md ring-2 ring-sky-400/30'
                        : 'border-slate-200 bg-white/80 hover:border-sky-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-slate-900 text-xs truncate max-w-[170px]">{lot.name}</span>
                      <span
                        className="text-[11px] font-mono font-bold px-2 py-0.5 rounded"
                        style={{ background: lot.bg, color: lot.color, border: `1px solid ${lot.color}30` }}
                      >
                        {lot.availableSlots} FREE
                      </span>
                    </div>

                    <div className="text-xs text-slate-500 mb-2 flex items-center justify-between">
                      <span>{lot.distanceToGhat}</span>
                      <span className="font-mono font-bold text-slate-700">{percent}% FULL</span>
                    </div>

                    {/* Capacity Progress Bar */}
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${percent}%`,
                          background: percent > 80 ? '#dc2626' : percent > 50 ? '#d97706' : '#059669',
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pilgrim App Real-Time Status Card */}
            <div className="glass rounded-xl p-3.5 border border-sky-200 bg-sky-50/70 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <div className="text-2xl p-2 bg-white rounded-xl border border-sky-200 shadow-xs">📱</div>
                <div>
                  <div className="text-xs font-bold text-sky-900">Pilgrim Mobile App Parking Sync</div>
                  <div className="text-xs text-slate-600">
                    Live navigation auto-routes pilgrims to <strong>{selectedLot.name}</strong> ({selectedLot.availableSlots} open bays).
                  </div>
                </div>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full border border-emerald-300">
                ACTIVE
              </span>
            </div>
          </div>

          {/* Right Column: Onsite ANPR Detection & Gate Barrier Simulator */}
          <div className="lg:col-span-6">
            <div className="glass rounded-2xl p-4 border border-slate-200 bg-white/95 shadow-md flex flex-col justify-between h-full space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📷</span>
                  <div>
                    <div className="text-xs font-mono font-bold text-sky-800 uppercase">ONSITE ENTRANCE ANPR SCANNER</div>
                    <div className="text-sm font-bold text-slate-900">{selectedVehicle.entryGate}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold">
                    ANPR ACCURACY: {selectedVehicle.anprConfidence}%
                  </span>
                </div>
              </div>

              {/* Number Plate Recognition Display Box */}
              <div className="relative rounded-xl overflow-hidden bg-slate-50 border border-slate-200 p-4 flex flex-col items-center justify-center">
                {isScanningPlate && (
                  <div className="absolute inset-0 bg-sky-900/85 backdrop-blur-xs z-20 flex flex-col items-center justify-center p-4 text-center">
                    <div className="text-3xl mb-2 animate-bounce">🔍</div>
                    <div className="text-white font-mono font-bold text-sm tracking-wider mb-2">
                      OPTICAL SCANNING VEHICLE NUMBER PLATE...
                    </div>
                    <div className="w-56 bg-white/20 rounded-full h-2.5 overflow-hidden border border-white/40">
                      <div
                        className="h-full bg-emerald-400 transition-all duration-150"
                        style={{ width: `${scanProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="w-full flex flex-col sm:flex-row items-center gap-4 bg-white border border-sky-200 rounded-xl p-3.5 shadow-sm">
                  {/* Digital Number Plate Emblem */}
                  <div className="flex flex-col items-center justify-center px-4 py-2 bg-yellow-300 border-2 border-slate-900 rounded-lg shadow-sm">
                    <span className="text-[10px] font-black text-slate-800 tracking-widest uppercase">IND</span>
                    <span className="text-base font-black font-mono text-slate-950 tracking-wider">
                      {selectedVehicle.plate}
                    </span>
                  </div>

                  <div className="flex-1 space-y-1 text-left">
                    <div className="text-xs font-bold text-slate-900 flex items-center justify-between">
                      <span>{selectedVehicle.vehicleType} · {selectedVehicle.driver}</span>
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-mono font-bold text-xs border border-emerald-300">
                        {selectedVehicle.barrierStatus}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600">
                      <strong>Target Lot:</strong> {selectedVehicle.targetLot}
                    </div>
                    <div className="text-xs text-sky-800 font-bold font-mono">
                      <strong>Assigned Parking Bay:</strong> {selectedVehicle.assignedSlot}
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {allocationNotice && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-3 px-3 py-1.5 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-semibold text-center z-10 w-full"
                    >
                      {allocationNotice}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Demo Vehicle Selector Buttons */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-700">Simulate Vehicle Approaching Entry Gate:</div>
                <div className="grid grid-cols-3 gap-2">
                  {ANPR_DEMO_VEHICLES.map((veh) => {
                    const isCurrent = selectedVehicle.plate === veh.plate;
                    return (
                      <button
                        key={veh.plate}
                        onClick={() => startANPRScan(veh)}
                        disabled={isScanningPlate}
                        className={`p-2 rounded-xl text-left cursor-pointer transition-all border ${
                          isCurrent
                            ? 'border-sky-500 bg-sky-50 shadow-xs font-bold text-sky-900'
                            : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <div className="text-xs font-mono font-black truncate">{veh.plate}</div>
                        <div className="text-[11px] text-slate-500 truncate">{veh.vehicleType}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-slate-200 text-center">
          <div className="glass p-2 rounded-xl bg-white border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-500 block">ANPR Plate Detection Speed</span>
            <span className="text-sm font-bold font-mono text-emerald-700">&lt; 1.2 Seconds</span>
          </div>
          <div className="glass p-2 rounded-xl bg-white border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-500 block">Number Plate OCR Accuracy</span>
            <span className="text-sm font-bold font-mono text-sky-700">99.4% Multi-Angle</span>
          </div>
          <div className="glass p-2 rounded-xl bg-white border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-500 block">Ghat Congestion Relief</span>
            <span className="text-sm font-bold font-mono text-emerald-700">-65% Illegal Parking</span>
          </div>
          <div className="glass p-2 rounded-xl bg-white border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-500 block">Pilgrim App Navigation Sync</span>
            <span className="text-sm font-bold font-mono text-purple-700">100% Real-Time IoT</span>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

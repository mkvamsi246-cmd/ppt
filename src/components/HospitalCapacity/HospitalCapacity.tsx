import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper, SectionHeader } from '../shared/UIComponents';
import { HOSPITALS_CAPACITY_DATA } from '../../data/content';

export default function HospitalCapacity() {
  const [selectedHospital, setSelectedHospital] = useState(HOSPITALS_CAPACITY_DATA[0]);
  const [isReserving, setIsReserving] = useState(false);
  const [reservedBedId, setReservedBedId] = useState<number | null>(null);
  const [reservationNotice, setReservationNotice] = useState<string | null>(null);
  const [etaTimer, setEtaTimer] = useState(412); // seconds (6m 52s)

  // Simulation countdown for incoming ambulance
  useEffect(() => {
    const timer = setInterval(() => {
      setEtaTimer(prev => (prev > 10 ? prev - 1 : 412));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  const handlePreReserve = (bedIndex: number) => {
    setIsReserving(true);
    setReservationNotice(null);

    setTimeout(() => {
      setReservedBedId(bedIndex);
      setIsReserving(false);
      setReservationNotice(
        `✓ BED ICU-${String(bedIndex + 1).padStart(2, '0')} PRE-RESERVED for Inbound Ambulance AP-108-04 at ${selectedHospital.name}! Trauma Team Lead alerted.`
      );
    }, 600);
  };

  const hospitalWorkflow = [
    { step: '01', title: '5G Vitals Streaming', desc: 'Ambulance streams ECG, SpO2 & BP directly to central triage.', icon: '📡', color: '#0284c7', bg: '#e0f2fe' },
    { step: '02', title: 'Live Bed Telemetry', desc: 'Real-time query of ICU, trauma bays & ventilators across 4 hubs.', icon: '🏥', color: '#d97706', bg: '#fef3c7' },
    { step: '03', title: '1-Tap Bed Pre-Lock', desc: 'Locks specific ICU bay & prepares surgical team ahead of ETA.', icon: '⚡', color: '#7c3aed', bg: '#ede9fe' },
    { step: '04', title: 'Zero Intake Delay', desc: 'Direct transfer to bay upon ambulance arrival via Green Corridor.', icon: '🟢', color: '#059669', bg: '#d1fae5' },
  ];

  // Generate 12 visual ICU beds for selected hospital
  const totalBedsGrid = 12;
  const availableCount = Math.min(selectedHospital.icuAvailable, totalBedsGrid);

  return (
    <SectionWrapper id="hospital">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 w-full flex-1 flex flex-col justify-start sm:justify-between gap-3 py-1 sm:py-2">
        <SectionHeader
          number="08 / LIVE HOSPITAL CAPACITY & TRIAGE"
          title="Real-Time ICU, Trauma Bed & Oxygen Telemetry"
          subtitle="IoT-connected emergency medical network coordinating live bed vacancies, blood bank units, and oxygen supplies with Green Corridor ambulances."
          color="#0284c7"
        />

        {/* ── 4-Stage Workflow Bar ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 my-1 sm:my-2">
          {hospitalWorkflow.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl p-2.5 sm:p-3.5 border border-slate-200 bg-white/95 shadow-sm flex items-center gap-2.5 sm:gap-3"
            >
              <div
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl font-mono text-xs sm:text-sm font-bold flex items-center justify-center flex-shrink-0"
                style={{ background: item.bg, color: item.color, border: `1px solid ${item.color}40` }}
              >
                {item.step}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-slate-900 text-xs sm:text-sm truncate flex items-center gap-1.5">
                  <span>{item.icon}</span>
                  <span className="truncate">{item.title}</span>
                </div>
                <div className="text-[11px] sm:text-xs text-slate-600 truncate leading-snug">{item.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Main Interactive Split Dashboard ── */}
        <div className="grid lg:grid-cols-12 gap-3 sm:gap-4 items-stretch my-1 sm:my-2">
          {/* Left Column: Hospital Selector Cards */}
          <div className="lg:col-span-5 flex flex-col gap-2.5">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold font-mono uppercase tracking-wider text-slate-700">
                Connected Hospital Network (4 Facilities)
              </span>
              <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                ● LIVE SYNC
              </span>
            </div>

            <div className="space-y-2">
              {HOSPITALS_CAPACITY_DATA.map((hosp) => {
                const isSelected = selectedHospital.id === hosp.id;
                const occPercent = Math.round((hosp.occupiedBeds / hosp.totalBeds) * 100);

                return (
                  <div
                    key={hosp.id}
                    onClick={() => {
                      setSelectedHospital(hosp);
                      setReservedBedId(null);
                      setReservationNotice(null);
                    }}
                    className={`p-3 rounded-2xl glass transition-all cursor-pointer border ${
                      isSelected
                        ? 'border-sky-500 bg-sky-50/95 shadow-md -translate-y-0.5 ring-2 ring-sky-400/20'
                        : 'border-slate-200 bg-white/90 hover:border-sky-300'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{hosp.icon}</span>
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                            {hosp.name}
                          </h4>
                          <span className="text-[10px] text-slate-500 font-medium">
                            {hosp.type}
                          </span>
                        </div>
                      </div>
                      <span
                        className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md whitespace-nowrap"
                        style={{ background: hosp.statusBg, color: hosp.statusColor }}
                      >
                        {hosp.status}
                      </span>
                    </div>

                    {/* Progress Bar & Quick Stats */}
                    <div className="mt-2 pt-2 border-t border-slate-100 grid grid-cols-4 gap-1 text-center font-mono">
                      <div className="bg-slate-50 p-1 rounded-lg border border-slate-200">
                        <div className="text-[9px] text-slate-500">AVAIL BEDS</div>
                        <div className="text-xs font-bold text-emerald-800">{hosp.availableBeds}</div>
                      </div>
                      <div className="bg-slate-50 p-1 rounded-lg border border-slate-200">
                        <div className="text-[9px] text-slate-500">ICU BAYS</div>
                        <div className="text-xs font-bold text-sky-800">{hosp.icuAvailable} / {hosp.icuTotal}</div>
                      </div>
                      <div className="bg-slate-50 p-1 rounded-lg border border-slate-200">
                        <div className="text-[9px] text-slate-500">TRAUMA</div>
                        <div className="text-xs font-bold text-amber-800">{hosp.traumaBaysAvailable} Free</div>
                      </div>
                      <div className="bg-slate-50 p-1 rounded-lg border border-slate-200">
                        <div className="text-[9px] text-slate-500">AMB ETA</div>
                        <div className="text-xs font-bold text-indigo-800">{hosp.etaMinutes}m</div>
                      </div>
                    </div>

                    {/* Occupancy Indicator Bar */}
                    <div className="mt-2 flex items-center gap-2">
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${occPercent}%`,
                            background: occPercent > 85 ? '#dc2626' : occPercent > 70 ? '#d97706' : '#059669',
                          }}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-slate-600 font-bold whitespace-nowrap">
                        {occPercent}% Full
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Live ICU Ward Grid & Inbound Patient Pre-Reservation HUD */}
          <div className="lg:col-span-7 glass rounded-2xl p-3 sm:p-4 border border-slate-200 bg-white/95 shadow-md flex flex-col justify-between space-y-3">
            <div>
              {/* Header Bar */}
              <div className="flex flex-wrap justify-between items-center gap-2 pb-2.5 border-b border-slate-100">
                <div>
                  <span className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
                    <span>🏥</span>
                    <span>{selectedHospital.name} — Live ICU Bay Map</span>
                  </span>
                  <div className="text-[11px] text-slate-500 font-medium">
                    Green Corridor Status: <strong className="text-emerald-800">{selectedHospital.greenCorridorSync}</strong> · {selectedHospital.coordinates}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono bg-sky-100 text-sky-900 border border-sky-300 px-2.5 py-1 rounded-full font-bold">
                    O2 SUPPLY: {selectedHospital.oxygenSupplyPercent}%
                  </span>
                </div>
              </div>

              {/* Inbound Ambulance Ticker */}
              <div className="my-2.5 p-2.5 rounded-xl bg-gradient-to-r from-emerald-50 via-sky-50 to-indigo-50 border border-sky-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.4 }}
                    className="text-2xl flex-shrink-0"
                  >
                    🚑
                  </motion.span>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                      <span>INBOUND AMBULANCE: AP-108-04</span>
                      <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-amber-200 text-amber-900 font-black">
                        CODE RED: HEAT STROKE
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-600 truncate">
                      Vitals: HR 118 BPM · SpO2 93% · BP 135/88 | Dispatch: Kotilingala Ghat
                    </div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-[10px] font-mono text-slate-500 font-bold">ESTIMATED ETA</div>
                  <div className="text-xs sm:text-sm font-mono font-black text-emerald-800">
                    {formatTimer(etaTimer)}
                  </div>
                </div>
              </div>

              {/* 12-Bed Interactive ICU Visualizer */}
              <div className="mb-2">
                <div className="flex items-center justify-between text-[11px] text-slate-600 mb-1.5 font-medium">
                  <span>Intensive Care Unit (ICU) Beds Overview:</span>
                  <div className="flex items-center gap-3 font-mono text-[10px]">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Free ({selectedHospital.icuAvailable})
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Reserved ({reservedBedId !== null ? 1 : 0})
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Occupied
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {Array.from({ length: totalBedsGrid }).map((_, idx) => {
                    const isReserved = reservedBedId === idx;
                    const isAvailable = !isReserved && idx < availableCount;

                    return (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: isAvailable ? 1.05 : 1 }}
                        onClick={() => {
                          if (isAvailable) handlePreReserve(idx);
                        }}
                        className={`p-2 rounded-xl border flex flex-col justify-between text-center transition-all cursor-pointer relative overflow-hidden ${
                          isReserved
                            ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-400/40 shadow-md'
                            : isAvailable
                            ? 'bg-emerald-50 border-emerald-300 hover:border-emerald-500 hover:bg-emerald-100 shadow-2xs'
                            : 'bg-slate-100 border-slate-300 opacity-60 cursor-not-allowed'
                        }`}
                      >
                        <div className="flex justify-between items-center text-[10px] font-mono font-bold mb-1">
                          <span className={isReserved ? 'text-amber-800' : isAvailable ? 'text-emerald-800' : 'text-slate-500'}>
                            ICU-{String(idx + 1).padStart(2, '0')}
                          </span>
                          <span>{isReserved ? '🔒' : isAvailable ? '🟢' : '🔴'}</span>
                        </div>

                        <div className="text-base my-0.5">
                          {isReserved ? '🚑' : isAvailable ? '🛏️' : '👤'}
                        </div>

                        <div className="text-[9px] font-mono font-bold truncate">
                          {isReserved ? (
                            <span className="text-amber-800 animate-pulse font-black">AMB-108-04</span>
                          ) : isAvailable ? (
                            <span className="text-emerald-800">FREE - TAP</span>
                          ) : (
                            <span className="text-slate-500">OCCUPIED</span>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Notification Banner when Reserved */}
              <AnimatePresence>
                {reservationNotice && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-medium flex items-center justify-between gap-2 shadow-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">🔔</span>
                      <span>{reservationNotice}</span>
                    </div>
                    <button
                      onClick={() => setReservationNotice(null)}
                      className="text-emerald-800 hover:text-emerald-950 font-bold text-xs cursor-pointer px-1"
                    >
                      ✕
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Hospital Resources & Telemetry Row */}
            <div className="pt-2 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] text-slate-500 font-bold">VENTILATORS</div>
                <div className="text-xs font-mono font-bold text-indigo-800">
                  {selectedHospital.ventilatorsAvailable} Active Ready
                </div>
              </div>

              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] text-slate-500 font-bold">BLOOD BANK RESERVES</div>
                <div className="text-[11px] font-mono font-bold text-rose-800 flex gap-1.5 flex-wrap">
                  {Object.entries(selectedHospital.bloodBankUnits).map(([group, units]) => (
                    <span key={group} className="bg-rose-100 px-1 rounded text-[10px]">
                      {group}:{units}u
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] text-slate-500 font-bold">TRAUMA LEAD</div>
                <div className="text-[11px] font-semibold text-slate-800 truncate" title={selectedHospital.contactChief}>
                  {selectedHospital.contactChief}
                </div>
              </div>

              <div className="p-2 rounded-xl bg-sky-50 border border-sky-200 flex flex-col justify-center items-center">
                <button
                  disabled={isReserving}
                  onClick={() => handlePreReserve(0)}
                  className="w-full py-1.5 px-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs cursor-pointer transition-all shadow-xs active:scale-95 disabled:opacity-50"
                >
                  {isReserving ? 'Pre-Locking...' : '⚡ 1-Tap Auto Lock'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

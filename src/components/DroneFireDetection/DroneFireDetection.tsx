import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper, SectionHeader } from '../shared/UIComponents';
import { DRONE_FIRE_FLEET_DATA } from '../../data/content';

export default function DroneFireDetection() {
  const [selectedDrone, setSelectedDrone] = useState(DRONE_FIRE_FLEET_DATA[0]);
  const [viewMode, setViewMode] = useState<'thermal' | 'optical'>('thermal');
  const [isDeploying, setIsDeploying] = useState(false);
  const [isContained, setIsContained] = useState(false);
  const [tempReading, setTempReading] = useState(428);
  const [containmentAlert, setContainmentAlert] = useState<string | null>(null);

  // Reset containment state when switching drones
  useEffect(() => {
    setIsContained(false);
    setIsDeploying(false);
    setContainmentAlert(null);
    setTempReading(selectedDrone.id === 'drone-01' ? 428 : selectedDrone.id === 'drone-02' ? 34 : 160);
  }, [selectedDrone]);

  const handleDeploySuppression = () => {
    setIsDeploying(true);
    setContainmentAlert(null);

    // Simulate aerosol mist dropping and temperature dropping
    setTimeout(() => {
      setTempReading(38);
      setIsContained(true);
      setIsDeploying(false);
      setContainmentAlert(
        `✓ TARGET CONTAINED: ${selectedDrone.callsign} successfully dropped AFFF aerosol fire suppressant! Temperature normalized to 38°C. Station 101 Fire Tenders notified.`
      );
    }, 1800);
  };

  const fireWorkflow = [
    { step: '01', title: 'Thermal Patrol', desc: '80m AGL FLIR thermal patrol over mega-kitchens and transit pandals.', icon: '🚁', color: '#ea580c', bg: '#ffedd5' },
    { step: '02', title: 'YOLOv9 Fire AI', desc: 'Real-time flame & smoke flow vectoring detects micro-hotspots in < 3s.', icon: '🧠', color: '#dc2626', bg: '#fee2e2' },
    { step: '03', title: 'Drone Retasking', desc: 'Nearest octocopter drone vector locks on target with GPS coordinates.', icon: '🎯', color: '#7c3aed', bg: '#ede9fe' },
    { step: '04', title: 'Aerosol Mist Drop', desc: 'Targeted release of fire-retardant mist canister; Fire tenders alerted.', icon: '💧', color: '#059669', bg: '#d1fae5' },
  ];

  return (
    <SectionWrapper id="dronefire">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 w-full flex-1 flex flex-col justify-start sm:justify-between gap-3 py-1 sm:py-2">
        <SectionHeader
          number="10 / AI FIRE & SMOKE DRONE FLEET"
          title="Autonomous Drone Scouting & Aerial Fire Suppression"
          subtitle="Thermal infrared (FLIR) and computer vision drone swarms monitor cooking pandals and ghats, deploying aerially released fire containment."
          color="#ea580c"
        />

        {/* ── 4-Stage Workflow Bar ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 my-1 sm:my-2">
          {fireWorkflow.map((item, i) => (
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
          {/* Left Column: Drone Fleet Selection & Telemetry */}
          <div className="lg:col-span-5 flex flex-col gap-2.5">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold font-mono uppercase tracking-wider text-slate-700">
                Drone Patrol Fleet (3 Active Sectors)
              </span>
              <span className="text-[11px] font-mono font-bold text-orange-800 bg-orange-100 px-2 py-0.5 rounded-full border border-orange-300">
                🔥 AIRBORNE SWARM
              </span>
            </div>

            <div className="space-y-2">
              {DRONE_FIRE_FLEET_DATA.map((drone) => {
                const isSelected = selectedDrone.id === drone.id;

                return (
                  <div
                    key={drone.id}
                    onClick={() => setSelectedDrone(drone)}
                    className={`p-3 rounded-2xl glass transition-all cursor-pointer border ${
                      isSelected
                        ? 'border-orange-500 bg-orange-50/95 shadow-md -translate-y-0.5 ring-2 ring-orange-400/20'
                        : 'border-slate-200 bg-white/90 hover:border-orange-300'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{drone.icon}</span>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                              {drone.callsign}
                            </h4>
                            <span className="text-[10px] font-mono bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded border border-slate-300">
                              {drone.altitude}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-600 font-medium">
                            {drone.sector}
                          </span>
                        </div>
                      </div>
                      <span
                        className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md whitespace-nowrap"
                        style={{ background: drone.statusBg, color: drone.statusColor }}
                      >
                        {drone.threatLevel}
                      </span>
                    </div>

                    {/* Sensor Specs & Telemetry */}
                    <div className="mt-2 pt-2 border-t border-slate-100 grid grid-cols-3 gap-1 text-center font-mono">
                      <div className="bg-slate-50 p-1 rounded-lg border border-slate-200">
                        <div className="text-[9px] text-slate-500">SPEED</div>
                        <div className="text-xs font-bold text-slate-800">{drone.speed}</div>
                      </div>
                      <div className="bg-slate-50 p-1 rounded-lg border border-slate-200">
                        <div className="text-[9px] text-slate-500">BATTERY</div>
                        <div className="text-xs font-bold text-emerald-800">{drone.battery}%</div>
                      </div>
                      <div className="bg-slate-50 p-1 rounded-lg border border-slate-200">
                        <div className="text-[9px] text-slate-500">TARGET TEMP</div>
                        <div className="text-xs font-bold text-rose-800">{drone.targetTemp}</div>
                      </div>
                    </div>

                    <div className="mt-1.5 text-[10px] text-slate-500 flex items-center justify-between font-mono">
                      <span className="truncate">Payload: {drone.payload}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: High-Tech Aerial Drone Viewport (Thermal FLIR HUD) */}
          <div className="lg:col-span-7 glass rounded-2xl p-3 sm:p-4 border border-slate-200 bg-white/95 shadow-md flex flex-col justify-between space-y-3">
            <div>
              {/* Header Bar with View Mode Toggle */}
              <div className="flex flex-wrap justify-between items-center gap-2 pb-2 border-b border-slate-100">
                <div>
                  <span className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
                    <span>🚁</span>
                    <span>{selectedDrone.callsign} — Live Aerial Video Feed</span>
                  </span>
                  <div className="text-[11px] text-slate-500 font-medium">
                    Sector: {selectedDrone.sector} · Altitude: {selectedDrone.altitude}
                  </div>
                </div>

                {/* Thermal vs Optical Toggle */}
                <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                  <button
                    onClick={() => setViewMode('thermal')}
                    className={`px-2.5 py-1 rounded-md text-xs font-bold font-mono transition-all cursor-pointer ${
                      viewMode === 'thermal'
                        ? 'bg-orange-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🔥 Thermal FLIR
                  </button>
                  <button
                    onClick={() => setViewMode('optical')}
                    className={`px-2.5 py-1 rounded-md text-xs font-bold font-mono transition-all cursor-pointer ${
                      viewMode === 'optical'
                        ? 'bg-sky-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    👁️ 4K Optical AI
                  </button>
                </div>
              </div>

              {/* Drone HUD Display Canvas */}
              <div className="relative rounded-xl overflow-hidden my-2.5 border border-slate-800 bg-slate-950 h-[190px] sm:h-[220px] shadow-inner flex items-center justify-center">
                {/* Background Simulation based on mode */}
                <svg width="100%" height="100%" viewBox="0 0 540 220" className="absolute inset-0">
                  <defs>
                    <radialGradient id="thermalHotspot" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                      <stop offset="20%" stopColor="#ff0044" stopOpacity="0.9" />
                      <stop offset="60%" stopColor="#ff8800" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#001133" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="mistCloud" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#bae6fd" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#bae6fd" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Ground representation */}
                  {viewMode === 'thermal' ? (
                    <rect width="540" height="220" fill="#030712" />
                  ) : (
                    <rect width="540" height="220" fill="#0f172a" />
                  )}

                  {/* Grid / Horizon lines */}
                  {Array.from({ length: 6 }).map((_, i) => (
                    <line key={i} x1="0" y1={i * 40} x2="540" y2={i * 40} stroke="#1e293b" strokeWidth="0.8" strokeDasharray="3 3" />
                  ))}
                  {Array.from({ length: 9 }).map((_, i) => (
                    <line key={i} x1={i * 60} y1="0" x2={i * 60} y2="220" stroke="#1e293b" strokeWidth="0.8" strokeDasharray="3 3" />
                  ))}

                  {/* Crowd / Structures Thermal Blobs */}
                  <g opacity="0.4">
                    <circle cx="120" cy="140" r="16" fill={viewMode === 'thermal' ? '#f59e0b' : '#334155'} />
                    <circle cx="180" cy="160" r="22" fill={viewMode === 'thermal' ? '#d97706' : '#334155'} />
                    <circle cx="410" cy="130" r="18" fill={viewMode === 'thermal' ? '#d97706' : '#334155'} />
                    <circle cx="360" cy="170" r="25" fill={viewMode === 'thermal' ? '#b45309' : '#334155'} />
                  </g>

                  {/* Central Hotspot / Fire Area */}
                  {!isContained ? (
                    <motion.g
                      animate={{ scale: [0.95, 1.08, 0.95] }}
                      transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                    >
                      <circle cx="270" cy="110" r="48" fill="url(#thermalHotspot)" />
                      {viewMode === 'optical' && (
                        <motion.text
                          x="270"
                          y="118"
                          fontSize="28"
                          textAnchor="middle"
                          animate={{ y: [118, 114, 118] }}
                          transition={{ repeat: Infinity, duration: 0.6 }}
                        >
                          🔥
                        </motion.text>
                      )}
                    </motion.g>
                  ) : (
                    <g>
                      <circle cx="270" cy="110" r="45" fill="url(#mistCloud)" />
                      <circle cx="270" cy="110" r="14" fill="#059669" opacity="0.8" />
                      <text x="270" y="115" fontSize="16" textAnchor="middle">💧</text>
                    </g>
                  )}

                  {/* Suppression Mist Deployment Animation */}
                  {isDeploying && (
                    <motion.g
                      initial={{ opacity: 0, scale: 0.2 }}
                      animate={{ opacity: [0, 1, 0.8], scale: [0.2, 1.4, 2.2] }}
                      transition={{ duration: 1.6 }}
                    >
                      <circle cx="270" cy="110" r="50" fill="url(#mistCloud)" />
                      <circle cx="270" cy="110" r="60" stroke="#00e5ff" strokeWidth="2" strokeDasharray="4 2" fill="none" />
                    </motion.g>
                  )}

                  {/* Drone HUD Reticle & Crosshairs */}
                  <circle cx="270" cy="110" r="32" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="4 4" fill="none" opacity="0.8" />
                  <circle cx="270" cy="110" r="8" stroke="#38bdf8" strokeWidth="1" fill="none" opacity="0.9" />
                  <line x1="230" y1="110" x2="250" y2="110" stroke="#38bdf8" strokeWidth="1.5" />
                  <line x1="290" y1="110" x2="310" y2="110" stroke="#38bdf8" strokeWidth="1.5" />
                  <line x1="270" y1="70" x2="270" y2="90" stroke="#38bdf8" strokeWidth="1.5" />
                  <line x1="270" y1="130" x2="270" y2="150" stroke="#38bdf8" strokeWidth="1.5" />

                  {/* Target Bounding Box */}
                  <rect
                    x="215"
                    y="60"
                    width="110"
                    height="100"
                    fill="none"
                    stroke={isContained ? '#10b981' : '#ef4444'}
                    strokeWidth="1.5"
                    strokeDasharray={isContained ? 'none' : '6 3'}
                  />
                </svg>

                {/* Top HUD Telemetry Overlay */}
                <div className="absolute top-2 left-3 right-3 flex justify-between items-center text-[10px] font-mono font-bold text-sky-400">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    <span className="text-white">LIVE REC: 00:14:38</span>
                    <span className="text-sky-300 hidden sm:inline">| FPS: 59.9</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sky-200">WIND: 12 km/h NW</span>
                    <span className="text-emerald-400">SAT LOCK: 18</span>
                  </div>
                </div>

                {/* Bottom HUD Target Telemetry */}
                <div className="absolute bottom-2 left-3 right-3 flex justify-between items-center text-[10px] font-mono">
                  <div className="bg-black/60 backdrop-blur-md px-2 py-1 rounded border border-slate-700 text-slate-200">
                    <span className="text-slate-400">HOTSPOT: </span>
                    <strong className={tempReading > 100 ? 'text-rose-400' : 'text-emerald-400'}>
                      {tempReading}°C
                    </strong>
                    <span className="mx-1 text-slate-500">|</span>
                    <span className="text-slate-400">AI MODEL: </span>
                    <span className="text-amber-400">YOLOv9-Fire 99.2%</span>
                  </div>
                  <div className="bg-black/60 backdrop-blur-md px-2 py-1 rounded border border-slate-700">
                    <span className="text-slate-300">STATUS: </span>
                    <strong className={isContained ? 'text-emerald-400' : 'text-rose-400 animate-pulse'}>
                      {isContained ? 'CONTAINED / NORMAL' : 'ACTIVE FLAME DETECTED'}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Notification Banner when Deployed */}
              <AnimatePresence>
                {containmentAlert && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-2.5 rounded-xl bg-orange-50 border border-orange-300 text-orange-950 text-xs font-medium flex items-center justify-between gap-2 shadow-xs mb-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">🧯</span>
                      <span>{containmentAlert}</span>
                    </div>
                    <button
                      onClick={() => setContainmentAlert(null)}
                      className="text-orange-900 hover:text-black font-bold text-xs cursor-pointer px-1"
                    >
                      ✕
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Actions Row */}
            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
              <div className="text-[11px] text-slate-600 font-medium flex items-center gap-2">
                <span>Autonomous Payload:</span>
                <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  {selectedDrone.payload}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  disabled={isDeploying || isContained}
                  onClick={handleDeploySuppression}
                  className={`py-1.5 px-4 rounded-xl font-bold text-xs cursor-pointer transition-all shadow-md active:scale-95 flex items-center gap-1.5 ${
                    isContained
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-default'
                      : isDeploying
                      ? 'bg-orange-400 text-white cursor-wait'
                      : 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white border border-orange-400 ring-2 ring-orange-400/20'
                  }`}
                >
                  <span>{isDeploying ? 'Deploying Retardant Mist...' : isContained ? '✓ Target Extinguished' : '🧯 Deploy Drone Fire Mist'}</span>
                </button>

                {isContained && (
                  <button
                    onClick={() => {
                      setIsContained(false);
                      setTempReading(428);
                      setContainmentAlert(null);
                    }}
                    className="py-1.5 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-300 cursor-pointer"
                  >
                    Reset Sim
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

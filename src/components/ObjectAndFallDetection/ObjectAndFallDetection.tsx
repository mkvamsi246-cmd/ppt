import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper, SectionHeader } from '../shared/UIComponents';
import { OBJECT_AND_FALL_DATA } from '../../data/content';

export default function ObjectAndFallDetection() {
  const [activeTab, setActiveTab] = useState<'object' | 'fall'>('object');
  const [isAlerting, setIsAlerting] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const handleSimulateAlert = () => {
    setIsAlerting(true);
    setActionNotice(null);

    setTimeout(() => {
      setIsAlerting(false);
      if (activeTab === 'object') {
        setActionNotice(
          '✓ SECURITY ALERT BROADCAST: 15-meter perimeter cordon triggered at Kotilingala Gate 3! BDDS Squad 02 and Sub-Inspector R. Anand en route (ETA: 1m 45s).'
        );
      } else {
        setActionNotice(
          '✓ MEDICAL DISPATCH CONFIRMED: Stretcher Squad 3 and Ghat Lifeguard dispatched to Saraswathi Steps #16. Nearest triage doctor prepped.'
        );
      }
    }, 800);
  };

  const currentData = activeTab === 'object' ? OBJECT_AND_FALL_DATA.abandonedObject : OBJECT_AND_FALL_DATA.fallDetection;

  const safetyWorkflow = [
    { step: '01', title: '520+ Edge CCTVs', desc: 'Onsite tensor inference models run at 30 FPS with < 18ms latency.', icon: '📹', color: '#0284c7', bg: '#e0f2fe' },
    { step: '02', title: 'Spatial Tracking', desc: 'Background subtraction tracks static luggage > 120s; pose tracks joint velocity.', icon: '🧠', color: '#d97706', bg: '#fef3c7' },
    { step: '03', title: 'Threshold Trigger', desc: 'Instant alarm triggered upon verified unattended object or sudden ground fall.', icon: '🚨', color: '#dc2626', bg: '#fee2e2' },
    { step: '04', title: 'Tactical Dispatch', desc: 'Direct GPS ping sent to Bomb Disposal or Stretcher Triage Squad.', icon: '⚡', color: '#059669', bg: '#d1fae5' },
  ];

  return (
    <SectionWrapper id="incidentai">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 w-full flex-1 flex flex-col justify-start sm:justify-between gap-3 py-1 sm:py-2">
        <SectionHeader
          number="12 / EDGE VIDEO ANALYTICS & INCIDENT SAFETY"
          title="Abandoned Object & Pilgrim Fall Detection AI"
          subtitle="Real-time computer vision models alert bomb squads to unattended luggage, and track human pose keypoints to detect slips and falls on wet ghat steps."
          color="#d97706"
        />

        {/* ── 4-Stage Workflow Bar ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 my-1 sm:my-2">
          {safetyWorkflow.map((item, i) => (
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

        {/* ── Feature Mode Switcher Tabs ── */}
        <div className="flex items-center justify-center gap-2 my-0.5">
          <button
            onClick={() => {
              setActiveTab('object');
              setActionNotice(null);
            }}
            className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer border ${
              activeTab === 'object'
                ? 'bg-amber-600 text-white border-amber-600 shadow-md ring-2 ring-amber-500/20'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            <span>🧳</span>
            <span>Abandoned / Unattended Object Detection</span>
            <span className="font-mono text-[10px] bg-black/20 px-1.5 py-0.5 rounded text-white font-normal">
              AOD AI
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab('fall');
              setActionNotice(null);
            }}
            className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer border ${
              activeTab === 'fall'
                ? 'bg-rose-600 text-white border-rose-600 shadow-md ring-2 ring-rose-500/20'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            <span>🚶‍♂️💥</span>
            <span>Ghat Steps Slip & Fall Detection</span>
            <span className="font-mono text-[10px] bg-black/20 px-1.5 py-0.5 rounded text-white font-normal">
              YOLO-Pose
            </span>
          </button>
        </div>

        {/* ── Main Interactive Split Dashboard ── */}
        <div className="grid lg:grid-cols-12 gap-3 sm:gap-4 items-stretch my-1 sm:my-2">
          {/* Left Column: Incident Telemetry & Response Protocol */}
          <div className="lg:col-span-5 flex flex-col justify-between glass rounded-2xl p-3 sm:p-4 border border-slate-200 bg-white/95 shadow-md space-y-3">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-mono font-bold text-slate-500">
                  {currentData.cameraFeed}
                </span>
                <span
                  className="text-[10px] font-mono font-black px-2 py-0.5 rounded"
                  style={{ background: currentData.bg, color: currentData.color }}
                >
                  {currentData.riskLevel}
                </span>
              </div>

              <div className="mt-2.5">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  {currentData.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  {activeTab === 'object'
                    ? 'AI spatio-temporal tracker detects an unattended dark bag abandoned on the pedestrian promenade without owner movement for >120s.'
                    : 'Human pose keypoint analyzer detects high-velocity vertical collapse (>2.8 m/s²) on slippery wet river steps with no recovery.'}
                </p>
              </div>

              {/* Key Incident Metrics Grid */}
              <div className="grid grid-cols-2 gap-2 mt-3 font-mono">
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[9px] text-slate-500 font-bold uppercase">
                    {activeTab === 'object' ? 'IDLE DURATION' : 'UNRESPONSIVE TIME'}
                  </div>
                  <div className="text-sm font-bold text-rose-800">
                    {activeTab === 'object'
                      ? `${OBJECT_AND_FALL_DATA.abandonedObject.idleDurationSeconds}s (Limit: 120s)`
                      : `${OBJECT_AND_FALL_DATA.fallDetection.unresponsiveTimeSeconds}s (Limit: 3s)`}
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[9px] text-slate-500 font-bold uppercase">
                    AI ACCURACY
                  </div>
                  <div className="text-sm font-bold text-emerald-800">
                    {currentData.aiConfidence}% Confidence
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 col-span-2">
                  <div className="text-[9px] text-slate-500 font-bold uppercase">
                    {activeTab === 'object' ? 'SEPARATION DISTANCE' : 'POSTURE DIAGNOSTIC'}
                  </div>
                  <div className="text-xs font-bold text-slate-800">
                    {activeTab === 'object'
                      ? `Owner Separated by ${OBJECT_AND_FALL_DATA.abandonedObject.ownerSeparationMeters} meters`
                      : OBJECT_AND_FALL_DATA.fallDetection.postureType}
                  </div>
                </div>
              </div>
            </div>

            {/* Protocol & Action Button */}
            <div className="pt-2 border-t border-slate-100">
              <div className="text-[11px] text-slate-600 mb-2">
                <strong>Target Response: </strong>
                <span className="text-slate-800">{currentData.assignedUnit}</span>
              </div>

              <button
                disabled={isAlerting}
                onClick={handleSimulateAlert}
                className={`w-full py-2 px-3 rounded-xl font-bold text-xs sm:text-sm cursor-pointer transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 ${
                  activeTab === 'object'
                    ? 'bg-amber-600 hover:bg-amber-700 text-white'
                    : 'bg-rose-600 hover:bg-rose-700 text-white'
                }`}
              >
                <span>{isAlerting ? 'Transmitting Geo-Alert...' : '🚨'}</span>
                <span>
                  {isAlerting
                    ? 'Transmitting Dispatch...'
                    : activeTab === 'object'
                    ? 'Trigger Bomb Squad (BDDS) Cordon'
                    : 'Dispatch Ghat Stretcher & Triage'}
                </span>
              </button>
            </div>
          </div>

          {/* Right Column: Animated Edge CCTV Viewport Canvas */}
          <div className="lg:col-span-7 glass rounded-2xl p-3 sm:p-4 border border-slate-200 bg-white/95 shadow-md flex flex-col justify-between space-y-3">
            <div>
              {/* CCTV Camera Header Bar */}
              <div className="flex flex-wrap justify-between items-center gap-2 pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                  <span className="font-mono text-xs font-bold text-slate-900">
                    {currentData.cameraFeed}
                  </span>
                  <span className="text-[10px] font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600 border border-slate-200">
                    EDGE TENSOR-RT 14ms
                  </span>
                </div>
                <div className="text-[10px] font-mono text-slate-500">
                  2027-07-24 09:14:22 IST · 1080p @ 30FPS
                </div>
              </div>

              {/* CCTV Video Canvas */}
              <div className="relative rounded-xl overflow-hidden my-2.5 border border-slate-800 bg-slate-950 h-[190px] sm:h-[220px] shadow-inner flex items-center justify-center">
                <svg width="100%" height="100%" viewBox="0 0 540 220" className="absolute inset-0">
                  <defs>
                    <radialGradient id="cordonPulse" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Dark surveillance background */}
                  <rect width="540" height="220" fill="#090d16" />

                  {activeTab === 'object' ? (
                    /* ── Scenario 1: Abandoned Object / Luggage ── */
                    <g>
                      {/* Promenade ground lines */}
                      {Array.from({ length: 7 }).map((_, i) => (
                        <line key={i} x1="0" y1={40 + i * 26} x2="540" y2={40 + i * 26} stroke="#1e293b" strokeWidth="1" />
                      ))}

                      {/* Moving pilgrims in background */}
                      <g opacity="0.5">
                        <circle cx="90" cy="80" r="10" fill="#64748b" />
                        <line x1="90" y1="90" x2="90" y2="130" stroke="#64748b" strokeWidth="3" />
                        <circle cx="440" cy="95" r="10" fill="#64748b" />
                        <line x1="440" y1="105" x2="440" y2="145" stroke="#64748b" strokeWidth="3" />
                      </g>

                      {/* Unattended Duffel Bag in Center */}
                      <motion.g
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        {/* Danger radius rings */}
                        <circle cx="270" cy="120" r="54" fill="url(#cordonPulse)" />
                        <circle cx="270" cy="120" r="54" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
                        <circle cx="270" cy="120" r="75" stroke="#f59e0b" strokeWidth="1" strokeDasharray="6 4" fill="none" opacity="0.6" />

                        {/* Duffel Bag Graphic */}
                        <rect x="254" y="110" width="32" height="20" rx="4" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
                        <rect x="262" y="105" width="16" height="5" rx="2" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
                        <text x="270" y="125" fontSize="11" textAnchor="middle" fill="#ffffff" fontWeight="bold">🎒</text>
                      </motion.g>

                      {/* Bounding Box & HUD Label */}
                      <rect x="235" y="80" width="70" height="70" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 2" />
                      <rect x="235" y="62" width="135" height="18" rx="2" fill="#ef4444" />
                      <text x="240" y="75" fill="#ffffff" fontSize="9" fontFamily="monospace" fontWeight="bold">
                        UNATTENDED: 145s [ALERT]
                      </text>

                      {/* Distance Line to Alleged Owner */}
                      <line x1="270" y1="120" x2="440" y2="95" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" />
                      <text x="355" y="102" fill="#f59e0b" fontSize="9" fontFamily="monospace">
                        d = 22.4m
                      </text>
                    </g>
                  ) : (
                    /* ── Scenario 2: River Steps Fall Detection ── */
                    <g>
                      {/* Ghat Steps Sloping Downward */}
                      {Array.from({ length: 8 }).map((_, i) => (
                        <path
                          key={i}
                          d={`M ${i * 45} ${50 + i * 22} L 540 ${50 + i * 22}`}
                          stroke="#334155"
                          strokeWidth="2"
                        />
                      ))}
                      {/* Water at bottom right */}
                      <rect x="360" y="170" width="180" height="50" fill="#0284c7" opacity="0.4" />
                      <text x="440" y="195" fill="#38bdf8" fontSize="10" fontFamily="monospace">Godavari Waterline</text>

                      {/* Fallen Pilgrim Pose Skeleton (Horizontal on steps) */}
                      <g>
                        {/* Pose keypoints: Head, Neck, Spine, Hips, Knees, Feet */}
                        <circle cx="230" cy="130" r="7" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" /> {/* Head */}
                        <circle cx="250" cy="136" r="4" fill="#38bdf8" /> {/* Shoulder */}
                        <circle cx="280" cy="140" r="4" fill="#38bdf8" /> {/* Spine */}
                        <circle cx="310" cy="142" r="4" fill="#38bdf8" /> {/* Hip */}
                        <circle cx="340" cy="146" r="4" fill="#f59e0b" /> {/* Knee */}
                        <circle cx="365" cy="148" r="4" fill="#f59e0b" /> {/* Ankle */}

                        {/* Skeleton connecting bones */}
                        <line x1="230" y1="130" x2="250" y2="136" stroke="#38bdf8" strokeWidth="2.5" />
                        <line x1="250" y1="136" x2="280" y2="140" stroke="#38bdf8" strokeWidth="2.5" />
                        <line x1="280" y1="140" x2="310" y2="142" stroke="#38bdf8" strokeWidth="2.5" />
                        <line x1="310" y1="142" x2="340" y2="146" stroke="#f59e0b" strokeWidth="2.5" />
                        <line x1="340" y1="146" x2="365" y2="148" stroke="#f59e0b" strokeWidth="2.5" />

                        {/* Bounding Box around Fallen Person */}
                        <rect x="215" y="115" width="165" height="45" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="5 3" />
                        <rect x="215" y="96" width="160" height="18" rx="2" fill="#ef4444" />
                        <text x="220" y="109" fill="#ffffff" fontSize="9" fontFamily="monospace" fontWeight="bold">
                          POSTURE: FALL PRONE (98.4%)
                        </text>
                      </g>

                      {/* Rapid Velocity Drop Indicator */}
                      <g transform="translate(140, 90)">
                        <rect x="0" y="0" width="65" height="35" rx="4" fill="#1e293b" opacity="0.8" />
                        <text x="5" y="14" fill="#94a3b8" fontSize="8" fontFamily="monospace">Δv_y DROP</text>
                        <text x="5" y="28" fill="#ef4444" fontSize="11" fontFamily="monospace" fontWeight="bold">3.4 m/s²</text>
                      </g>
                    </g>
                  )}
                </svg>

                {/* Bottom HUD Bar */}
                <div className="absolute bottom-2 left-3 right-3 flex justify-between items-center text-[10px] font-mono">
                  <div className="bg-black/60 backdrop-blur-md px-2 py-1 rounded border border-slate-700 text-slate-200">
                    <span className="text-slate-400">DETECTED: </span>
                    <strong className="text-amber-400">
                      {activeTab === 'object' ? 'Static Package (145s)' : 'Motionless Pilgrim (Step #16)'}
                    </strong>
                  </div>
                  <div className="bg-black/60 backdrop-blur-md px-2 py-1 rounded border border-slate-700">
                    <span className="text-slate-300">ACTION: </span>
                    <strong className="text-emerald-400">
                      {activeTab === 'object' ? 'CORDON 15M' : 'STRETCHER DISPATCH'}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Notification Banner when Alerted */}
              <AnimatePresence>
                {actionNotice && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-2.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs font-medium flex items-center justify-between gap-2 shadow-xs mb-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">🔔</span>
                      <span>{actionNotice}</span>
                    </div>
                    <button
                      onClick={() => setActionNotice(null)}
                      className="text-amber-900 hover:text-black font-bold text-xs cursor-pointer px-1"
                    >
                      ✕
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Technical Telemetry */}
            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px]">
              <div className="text-slate-600 font-medium">
                AI Pipeline: <span className="font-mono font-bold text-slate-900">{activeTab === 'object' ? 'YOLOv8 + Optical Persistence' : 'YOLOv8-Pose + Velocity Tracking'}</span>
              </div>
              <div className="font-mono text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                ● 14ms EDGE LATENCY
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

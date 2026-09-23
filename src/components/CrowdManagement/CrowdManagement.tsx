import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper, SectionHeader } from '../shared/UIComponents';

export default function CrowdManagement() {
  const [selectedGhat, setSelectedGhat] = useState<number>(0);
  const [officerAlertAck, setOfficerAlertAck] = useState<boolean>(false);

  const ghatFreenessData = [
    {
      name: 'Kotilingala Ghat',
      freePercent: 16,
      occupiedPercent: 84,
      status: 'HEAVY SURGE',
      statusColor: '#dc2626',
      statusBg: '#fee2e2',
      waitEstimate: '55m wait',
      action: 'AVOID / DIVERT',
      recommendation: 'Surge limit approached. VMS boards diverting arriving pilgrims.',
      routeAdvice: 'Divert to Saraswathi Ghat via North Promenade (600m)',
      icon: '🚨',
      cameraZone: 'CAM-KG-04 (Gate 4)',
      assignedOfficer: 'Officer K. Prasad (Delta-3, 45m away)',
    },
    {
      name: 'Pushkar Ghat',
      freePercent: 35,
      occupiedPercent: 65,
      status: 'MODERATE',
      statusColor: '#d97706',
      statusBg: '#fef3c7',
      waitEstimate: '20m wait',
      action: 'MONITORING',
      recommendation: 'Steady flow. Regulated entry active at Gate 2 and Gate 3.',
      routeAdvice: 'Normal transit corridor active',
      icon: '⚠️',
      cameraZone: 'CAM-PG-02 (Central)',
      assignedOfficer: 'Officer S. Ramesh (Patrol-2, 110m away)',
    },
    {
      name: 'Saraswathi Ghat',
      freePercent: 72,
      occupiedPercent: 28,
      status: 'FREE & OPEN',
      statusColor: '#059669',
      statusBg: '#d1fae5',
      waitEstimate: '< 5m wait',
      action: 'RECOMMENDED',
      recommendation: 'Optimal space and rapid holy dip flow. Full safety boat cover.',
      routeAdvice: 'Direct electric shuttle available from Parking B',
      icon: '✨',
      cameraZone: 'CAM-SG-01 (Main)',
      assignedOfficer: 'Officer M. Naidu (Patrol-5, 80m away)',
    },
    {
      name: 'Markandeya Ghat',
      freePercent: 62,
      occupiedPercent: 38,
      status: 'FREE & OPEN',
      statusColor: '#059669',
      statusBg: '#d1fae5',
      waitEstimate: '< 8m wait',
      action: 'RECOMMENDED',
      recommendation: 'Low density. Fast-track entry for families & senior citizens.',
      routeAdvice: 'Direct access from East Ring Road',
      icon: '✨',
      cameraZone: 'CAM-MG-03 (East)',
      assignedOfficer: 'Officer T. Anjan (Patrol-4, 95m away)',
    },
  ];

  const currentGhat = ghatFreenessData[selectedGhat];

  const crowdWorkflow = [
    { step: '01', title: 'AI Camera Vision', desc: '520+ CCTV streams at 30 FPS', icon: '📹', color: '#0284c7', bg: '#e0f2fe' },
    { step: '02', title: 'YOLOv8 Density Model', desc: 'Headcount & >3.5 pers/m² check', icon: '🧠', color: '#d97706', bg: '#fef3c7' },
    { step: '03', title: 'Surge Threshold Trigger', desc: 'Auto-alerts when density >75%', icon: '🚨', color: '#dc2626', bg: '#fee2e2' },
    { step: '04', title: 'Nearest Officer Geo-Push', desc: 'GPS tactical push in <420ms', icon: '📱', color: '#059669', bg: '#d1fae5' },
  ];

  return (
    <SectionWrapper id="crowd">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 w-full flex-1 flex flex-col justify-start sm:justify-between gap-3 py-1 sm:py-2">
        <SectionHeader
          number="04 / CROWD MANAGEMENT MODULE"
          title="AI Camera Crowd Monitoring & Zone Officer Dispatch"
          subtitle="Real-time AI camera detection balances ghat freeness and automatically dispatches alerts to the nearest on-duty officer."
          color="#0284c7"
        />

        {/* ── 4-Step Sequence Bar ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 my-1 sm:my-2">
          {crowdWorkflow.map((item) => (
            <div
              key={item.step}
              className="glass rounded-2xl p-2.5 sm:p-3.5 border border-slate-200 flex items-center gap-2.5 sm:gap-3 bg-white/95 shadow-sm"
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
            </div>
          ))}
        </div>

        {/* ── Live AI Surveillance Animated Canvas ── */}
        <div className="rounded-2xl relative overflow-hidden bg-gradient-to-b from-slate-50 to-sky-50 border border-slate-200 h-[160px] sm:h-[190px] shadow-inner my-1 sm:my-2">
          <svg width="100%" height="100%" viewBox="0 0 640 190">
            <defs>
              <linearGradient id="crowdBg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="100%" stopColor="#e0f2fe" />
              </linearGradient>
              <radialGradient id="surgePulse" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="safePulse" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </radialGradient>
            </defs>

            <rect width="640" height="190" fill="url(#crowdBg)" />

            {/* Godavari riverbank strip */}
            <rect x="0" y="155" width="640" height="35" fill="#bae6fd" opacity="0.6" />
            <motion.path
              d="M 0 158 Q 160 153 320 158 T 640 158"
              stroke="#38bdf8" strokeWidth="2" fill="none" strokeOpacity="0.7"
              animate={{ d: ['M 0 158 Q 160 153 320 158 T 640 158', 'M 0 162 Q 160 166 320 159 T 640 162', 'M 0 158 Q 160 153 320 158 T 640 158'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Ghat boundary lines */}
            {[120, 260, 400, 530].map((x, i) => (
              <g key={i}>
                <rect x={x - 50} y="80" width="100" height="75" rx="6"
                  fill={i === 0 ? '#fee2e2' : i === 1 ? '#fef3c7' : '#d1fae5'}
                  stroke={i === 0 ? '#ef4444' : i === 1 ? '#d97706' : '#059669'}
                  strokeWidth="1.5" opacity="0.55"
                />
                <text x={x} y="98" fontSize="7.5" fill={i === 0 ? '#991b1b' : i === 1 ? '#92400e' : '#065f46'}
                  textAnchor="middle" fontWeight="bold">
                  {['Kotilingala', 'Pushkar', 'Saraswathi', 'Markandeya'][i]}
                </text>
                <text x={x} y="110" fontSize="6.5" fill={i === 0 ? '#b91c1c' : i === 1 ? '#b45309' : '#047857'}
                  textAnchor="middle" fontWeight="bold">
                  GHAT
                </text>
              </g>
            ))}

            {/* Surge pulse ring on Kotilingala (critical) */}
            <motion.circle cx="120" cy="118" r="28"
              fill="url(#surgePulse)"
              animate={{ r: [22, 40, 22], opacity: [0.9, 0.1, 0.9] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
            <motion.circle cx="120" cy="118" r="14"
              fill="none" stroke="#ef4444" strokeWidth="2"
              animate={{ r: [12, 22, 12], opacity: [0.9, 0.2, 0.9] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: 0.3 }}
            />
            <circle cx="120" cy="118" r="7" fill="#ef4444" />
            <text x="120" y="122" fontSize="8" fill="white" textAnchor="middle" fontWeight="bold">!</text>
            <rect x="68" y="52" width="104" height="16" rx="4" fill="white" stroke="#ef4444" strokeWidth="1.5" />
            <text x="120" y="64" fontSize="8" fill="#b91c1c" textAnchor="middle" fontWeight="bold">SURGE DETECTED — 84%</text>

            {/* Steady pulse on Pushkar (moderate) */}
            <motion.circle cx="260" cy="118" r="14"
              fill="none" stroke="#d97706" strokeWidth="2"
              animate={{ r: [10, 18, 10], opacity: [0.8, 0.2, 0.8] }}
              transition={{ duration: 2.4, repeat: Infinity }}
            />
            <circle cx="260" cy="118" r="7" fill="#d97706" />
            <rect x="218" y="52" width="84" height="14" rx="4" fill="white" stroke="#d97706" strokeWidth="1.5" />
            <text x="260" y="63" fontSize="7.5" fill="#92400e" textAnchor="middle" fontWeight="bold">MODERATE — 65%</text>

            {/* Safe pulse on Saraswathi */}
            <motion.circle cx="400" cy="118" r="14"
              fill="url(#safePulse)"
              animate={{ r: [10, 20, 10], opacity: [0.8, 0.2, 0.8] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <circle cx="400" cy="118" r="7" fill="#059669" />
            <rect x="358" y="52" width="84" height="14" rx="4" fill="white" stroke="#059669" strokeWidth="1.5" />
            <text x="400" y="63" fontSize="7.5" fill="#065f46" textAnchor="middle" fontWeight="bold">FREE &amp; OPEN — 28%</text>

            {/* CCTV camera icons at top */}
            {[90, 150, 230, 290, 370, 430].map((x, i) => (
              <g key={`cam-${i}`} transform={`translate(${x}, 20)`}>
                <rect x="-14" y="-8" width="28" height="16" rx="3" fill="white" stroke="#94a3b8" strokeWidth="1" />
                <text x="0" y="5" fontSize="10" textAnchor="middle">📷</text>
                <motion.line
                  x1="0" y1="8" x2="0" y2="58"
                  stroke={i < 2 ? '#ef4444' : i < 4 ? '#d97706' : '#059669'}
                  strokeWidth="1.5" strokeDasharray="3 3"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.25 }}
                />
              </g>
            ))}

            {/* AI scan sweep line */}
            <motion.line
              y1="20" y2="155"
              stroke="#0284c7" strokeWidth="1.5" strokeOpacity="0.5" strokeDasharray="5 4"
              animate={{ x1: [40, 560, 40], x2: [40, 560, 40] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            />
            <motion.rect
              y="20" width="3" height="135"
              fill="#0284c7" opacity="0.3"
              animate={{ x: [40, 560, 40] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            />

            {/* Dispatched Officer icon moving toward Kotilingala */}
            <motion.g animate={{ x: [390, 170, 390] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}>
              <circle cy="130" r="10" fill="white" stroke="#0284c7" strokeWidth="2" />
              <text y="134" fontSize="11" textAnchor="middle">👮</text>
              <rect x="-30" y="112" width="60" height="13" rx="3" fill="#0284c7" />
              <text y="122" fontSize="7" fill="white" textAnchor="middle" fontWeight="bold">DELTA-3</text>
            </motion.g>

            {/* LIVE label */}
            <rect x="8" y="8" width="44" height="14" rx="3" fill="#ef4444" />
            <motion.text x="30" y="19" fontSize="8" fill="white" textAnchor="middle" fontWeight="bold"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}>
              ● LIVE
            </motion.text>

            {/* AI label */}
            <rect x="58" y="8" width="72" height="14" rx="3" fill="white" stroke="#0284c7" strokeWidth="1" />
            <text x="94" y="19" fontSize="7.5" fill="#0369a1" textAnchor="middle" fontWeight="bold">AI SCAN ACTIVE</text>
          </svg>
        </div>

        {/* ── Main 2-Column Dashboard ── */}
        <div className="grid lg:grid-cols-12 gap-3 sm:gap-5 items-stretch my-1 sm:my-2">
          {/* Left Column: AI Camera Surge & Nearest Officer Dispatch */}
          <div className="lg:col-span-6 glass rounded-2xl p-4 border border-slate-200 flex flex-col justify-between bg-white/95 shadow-md space-y-3">
            <div>
              <div className="flex justify-between items-center mb-2.5 pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse" />
                  <span className="text-rose-900 font-bold text-sm tracking-wide">
                    AI CAMERA SURGE ➔ OFFICER DISPATCH
                  </span>
                </div>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300 font-bold">
                  LATENCY: 420ms
                </span>
              </div>

              {/* Camera & Density details */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-mono font-bold text-slate-500">CAMERA NODE</div>
                  <div className="text-slate-900 font-bold text-sm">{currentGhat.cameraZone}</div>
                  <div className="text-amber-800 text-xs font-semibold">{currentGhat.name}</div>
                </div>
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200">
                  <div className="text-xs font-mono font-bold text-rose-800">LIVE OCCUPANCY</div>
                  <div className="text-rose-900 font-black text-lg">{currentGhat.occupiedPercent}% Used</div>
                  <div className="text-rose-700 text-xs font-mono font-bold">&gt;3.8 pers/m² (SURGE)</div>
                </div>
              </div>

              {/* Officer Proximity Box */}
              <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 mb-2 space-y-1">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-sky-900 font-bold">📍 NEAREST ON-DUTY OFFICER:</span>
                  <span className="text-emerald-800 font-black">45m AWAY</span>
                </div>
                <div className="text-slate-900 text-sm font-bold">{currentGhat.assignedOfficer}</div>
              </div>
            </div>

            {/* Tactical Push Notification Card */}
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-amber-900">
                <span>📲 OFFICER TACTICAL ALERT</span>
                <span className="text-slate-600 font-normal">Turnstile Regulation Required</span>
              </div>
              <button
                onClick={() => setOfficerAlertAck(prev => !prev)}
                className={`w-full py-2.5 rounded-xl text-xs md:text-sm font-mono font-bold transition-all cursor-pointer shadow-sm border ${
                  officerAlertAck
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                    : 'bg-amber-600 hover:bg-amber-500 text-white border-amber-600'
                }`}
              >
                {officerAlertAck ? '✓ OFFICER ACKNOWLEDGED (ON SCENE)' : 'TAP TO ACKNOWLEDGE ALERT'}
              </button>
            </div>
          </div>

          {/* Right Column: Live Ghat Freeness & Smart Diversion */}
          <div className="lg:col-span-6 glass rounded-2xl p-4 border border-slate-200 flex flex-col justify-between bg-white/95 shadow-md space-y-3">
            <div>
              <div className="flex justify-between items-center mb-2.5 pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-base">🌊</span>
                  <span className="text-emerald-900 font-bold text-sm">
                    GHAT FREENESS & SMART DIVERSION
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-600 font-medium">
                  TIME SAVED: <strong className="text-emerald-700 font-bold">38 MINS</strong>
                </span>
              </div>

              {/* 2x2 Ghat Freeness Grid */}
              <div className="grid grid-cols-2 gap-2.5 mb-3">
                {ghatFreenessData.map((g, idx) => (
                  <div
                    key={g.name}
                    onClick={() => {
                      setSelectedGhat(idx);
                      setOfficerAlertAck(false);
                    }}
                    className={`p-3 rounded-xl glass border transition-all cursor-pointer ${
                      selectedGhat === idx
                        ? 'border-emerald-500 bg-emerald-50/80 shadow-md ring-2 ring-emerald-400/20'
                        : 'border-slate-200 hover:border-emerald-300 bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-slate-900 font-bold text-xs truncate flex items-center gap-1.5">
                        <span>{g.icon}</span>
                        <span className="truncate">{g.name}</span>
                      </span>
                      <span
                        className="px-2 py-0.5 rounded text-[11px] font-mono font-bold"
                        style={{ background: g.statusBg, color: g.statusColor, border: `1px solid ${g.statusColor}30` }}
                      >
                        {g.action.split(' ')[0]}
                      </span>
                    </div>

                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden mb-1.5 flex border border-slate-200">
                      <div
                        className="h-full bg-emerald-500"
                        style={{ width: `${g.freePercent}%` }}
                      />
                      <div
                        className="h-full"
                        style={{ width: `${g.occupiedPercent}%`, background: g.statusColor }}
                      />
                    </div>

                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-emerald-800 font-bold">{g.freePercent}% Free</span>
                      <span className="text-slate-600 font-semibold">⏳ {g.waitEstimate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active AI Diversion Directive */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-emerald-900 font-bold text-xs flex items-center gap-1.5">
                  <span>📢</span>
                  <span>AI DIVERSION: {currentGhat.name.toUpperCase()}</span>
                </span>
                <button
                  onClick={() => {
                    setSelectedGhat(2);
                    setOfficerAlertAck(false);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 text-xs font-mono font-bold border border-emerald-300 cursor-pointer shadow-xs hover:bg-emerald-200"
                >
                  Select Free Ghat
                </button>
              </div>
              <div className="text-slate-700 text-xs leading-relaxed font-medium">
                {currentGhat.recommendation}
              </div>
              <div className="text-sky-800 text-xs font-mono font-bold truncate">
                ➔ Route: {currentGhat.routeAdvice}
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Telemetry Strip ── */}
        <div className="p-2.5 rounded-xl glass border border-slate-200 flex flex-wrap items-center justify-between text-xs font-mono text-slate-700 bg-white/90 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold">520 CCTV Feeds Synchronized</span>
          </div>
          <div className="text-amber-900 font-bold">
            LSTM Surge Forecast: 15-Minute Lead Time
          </div>
          <div className="text-emerald-800 font-black">
            AI Accuracy: 97.4% (YOLOv8 + CSRNet)
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

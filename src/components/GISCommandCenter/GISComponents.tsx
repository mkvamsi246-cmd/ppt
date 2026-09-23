import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { SectionWrapper, SectionHeader } from '../shared/UIComponents';
import {
  GIS_ROLES,
  ADMIN_PORTAL_FEATURES,
  OFFICER_PORTAL_FEATURES,
  PORTAL_WORKFLOW_STEPS,
  CITIZEN_APP_SCREENS,
} from '../../data/content';

export function GISCommandCenter() {
  const [activePortalTab, setActivePortalTab] = useState<'admin' | 'officer' | 'workflow'>('admin');
  const [activeRole, setActiveRole] = useState(0);
  const [officerStatus, setOfficerStatus] = useState<'En Route' | 'On Scene' | 'Reunited'>('On Scene');
  const [sosActive, setSosActive] = useState(false);
  const [adminActionStatus, setAdminActionStatus] = useState<string | null>(null);

  const alerts = [
    { type: 'CROWD SURGE', msg: 'Kotilingala Ghat surge: 84% capacity', time: '14:23', color: '#dc2626', bg: '#fee2e2' },
    { type: 'TRAFFIC OVERRIDE', msg: 'Green Corridor Active — NH-216', time: '14:21', color: '#059669', bg: '#d1fae5' },
    { type: 'RE-ID MATCH', msg: 'Missing Child Aarav Sharma located', time: '14:19', color: '#d97706', bg: '#fef3c7' },
    { type: 'RIVER PATROL', msg: 'Rescue Boat 02 on standby', time: '14:15', color: '#0284c7', bg: '#e0f2fe' },
  ];

  const triggerAdminAction = (action: string) => {
    setAdminActionStatus(`Executed: ${action}`);
    setTimeout(() => setAdminActionStatus(null), 3000);
  };

  return (
    <SectionWrapper id="gis">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 w-full flex-1 flex flex-col justify-start sm:justify-between gap-3 py-1 sm:py-2">
        <SectionHeader
          number="10 / OPERATIONAL PORTALS"
          title="Admin & Officer Command Portals"
          subtitle="Two synchronized interfaces: central Admin Command Portal for citywide governance, and Officer Field Portal for on-ground execution."
          color="#0284c7"
        />

        {/* ── Main Portal Switcher Tabs ── */}
        <div className="flex justify-center mb-2">
          <div className="glass p-1 sm:p-1.5 rounded-xl sm:rounded-2xl flex flex-wrap gap-1 sm:gap-2 border border-slate-200 bg-white/95 shadow-sm justify-center">
            <button
              id="tab-admin-portal"
              onClick={() => setActivePortalTab('admin')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl font-bold text-[11px] sm:text-xs md:text-sm tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                activePortalTab === 'admin'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🏛️</span>
              <span className="hidden xs:inline">ADMIN COMMAND</span>
              <span className="xs:hidden">ADMIN</span>
            </button>

            <button
              id="tab-officer-portal"
              onClick={() => setActivePortalTab('officer')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl font-bold text-[11px] sm:text-xs md:text-sm tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                activePortalTab === 'officer'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>📱</span>
              <span className="hidden xs:inline">OFFICER FIELD</span>
              <span className="xs:hidden">OFFICER</span>
            </button>

            <button
              id="tab-workflow"
              onClick={() => setActivePortalTab('workflow')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl font-bold text-[11px] sm:text-xs md:text-sm tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                activePortalTab === 'workflow'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🔄</span>
              <span className="hidden xs:inline">CLOSED-LOOP</span>
              <span className="xs:hidden">PIPELINE</span>
            </button>
          </div>
        </div>

        {/* ── TAB 1: ADMIN COMMAND PORTAL ── */}
        {activePortalTab === 'admin' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            {/* Agency Role Selector */}
            <div className="flex flex-wrap gap-2 justify-center items-center">
              <span className="text-xs text-slate-600 font-mono font-bold mr-1">COMMAND ROLE:</span>
              {GIS_ROLES.map((role, i) => (
                <button
                  key={role}
                  id={`gis-role-${i}`}
                  onClick={() => setActiveRole(i)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                    activeRole === i
                      ? 'bg-sky-100 text-sky-900 border border-sky-300 shadow-xs ring-1 ring-sky-300'
                      : 'glass text-slate-700 hover:text-slate-950 border border-slate-200 bg-white/80'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>

            {/* Central Admin Control Center Simulator */}
            <div className="glass rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white/95">
              <div className="grid grid-cols-12 gap-0 min-h-[220px]">
                {/* Left: GIS Map */}
                <div className="col-span-12 lg:col-span-6 p-4 border-b lg:border-b-0 lg:border-r border-slate-200">
                  <div className="flex justify-between items-center mb-2 text-xs font-mono">
                    <span className="text-sky-900 font-bold">RAJAHMUNDRY GIS OVERLAY</span>
                    <span className="text-slate-600 font-bold">520 CCTVs · 12 DRONES</span>
                  </div>

                  <div className="rounded-xl relative overflow-hidden bg-slate-50 border border-slate-200 h-[190px]">
                    <svg width="100%" height="100%" viewBox="0 0 320 200">
                      {/* River */}
                      <path d="M 0 110 Q 80 95 160 115 T 320 105" stroke="#bae6fd" strokeWidth="28" fill="none" />
                      <path d="M 0 110 Q 80 95 160 115 T 320 105" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
                      <text x="60" y="113" fontSize="9" fill="#0369a1" fontWeight="bold">GODAVARI RIVER</text>

                      {/* Green Corridor */}
                      <line x1="0" y1="55" x2="320" y2="55" stroke="#10b981" strokeWidth="4" strokeDasharray="6 4" />
                      <text x="10" y="48" fontSize="8" fill="#047857" fontWeight="bold">GREEN CORRIDOR (NH-216)</text>

                      {/* Ghats */}
                      {[
                        { name: 'Kotilingala', x: 60, y: 105, color: '#dc2626', surge: '84%' },
                        { name: 'Pushkar', x: 130, y: 110, color: '#d97706', surge: '65%' },
                        { name: 'Saraswathi', x: 200, y: 115, color: '#059669', surge: '28%' },
                        { name: 'Markandeya', x: 270, y: 108, color: '#059669', surge: '38%' },
                      ].map((g, i) => (
                        <g key={i}>
                          <circle cx={g.x} cy={g.y} r={10} fill={`${g.color}25`} stroke={g.color} strokeWidth="1.5" />
                          <text x={g.x} y={g.y - 13} fontSize="8" fill={g.color} textAnchor="middle" fontWeight="bold">
                            {g.name} ({g.surge})
                          </text>
                        </g>
                      ))}

                      {/* Ambulance */}
                      <motion.g
                        animate={{ x: [20, 280] }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                      >
                        <circle cx={0} cy={55} r={9} fill="#d1fae5" stroke="#059669" strokeWidth="1.5" />
                        <text x={0} y={59} fontSize="9" textAnchor="middle">🚑</text>
                      </motion.g>

                      {/* Govt Hosp */}
                      <rect x={280} y={38} width="30" height="26" rx="4" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
                      <text x={295} y={55} fontSize="10" textAnchor="middle" fill="#0369a1">🏥</text>
                    </svg>
                  </div>
                </div>

                {/* Right: Command Controls */}
                <div className="col-span-12 lg:col-span-6 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sky-900 font-mono text-xs font-bold">COMMAND ACTIONS</span>
                      <span className="text-xs font-mono text-emerald-800 font-bold">
                        LOGGED: {GIS_ROLES[activeRole]?.toUpperCase() || 'COMMANDER'}
                      </span>
                    </div>

                    <div className="space-y-2 mb-3">
                      <button
                        onClick={() => triggerAdminAction('Green Corridor Activated (NH-216 Preempted)')}
                        className="w-full text-left p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 hover:border-emerald-400 text-xs md:text-sm cursor-pointer flex items-center justify-between shadow-xs transition-all"
                      >
                        <span className="flex items-center gap-2">
                          <span>🟢</span>
                          <strong className="text-emerald-950">Preempt Green Corridor</strong>
                        </span>
                        <span className="text-xs font-mono bg-emerald-600 text-white font-bold px-2.5 py-1 rounded">EXECUTE</span>
                      </button>

                      <button
                        onClick={() => triggerAdminAction('Amber Alert broadcasted to 28 City VMS Screens')}
                        className="w-full text-left p-2.5 rounded-xl bg-amber-50 border border-amber-200 hover:border-amber-400 text-xs md:text-sm cursor-pointer flex items-center justify-between shadow-xs transition-all"
                      >
                        <span className="flex items-center gap-2">
                          <span>📢</span>
                          <strong className="text-amber-950">Broadcast Amber Alert</strong>
                        </span>
                        <span className="text-xs font-mono bg-amber-600 text-white font-bold px-2.5 py-1 rounded">BROADCAST</span>
                      </button>
                    </div>

                    {adminActionStatus && (
                      <div className="p-2 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-950 text-xs font-mono text-center mb-2 font-bold">
                        ✓ {adminActionStatus}
                      </div>
                    )}
                  </div>

                  {/* Real-time mini alert feed */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    {alerts.slice(0, 2).map((alert, i) => (
                      <div key={i} className="flex justify-between items-center text-xs font-mono p-1.5 rounded-lg bg-slate-50 border border-slate-100">
                        <span style={{ color: alert.color }} className="font-bold">{alert.type}</span>
                        <span className="text-slate-700 font-medium truncate max-w-[200px]">{alert.msg}</span>
                        <span className="text-slate-500 font-semibold">{alert.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Pills */}
            <div className="grid grid-cols-5 gap-3">
              {ADMIN_PORTAL_FEATURES.map((feat) => (
                <div key={feat.title} className="glass p-2.5 rounded-xl border border-slate-200 bg-white/95 shadow-xs text-center">
                  <div className="text-lg mb-0.5">{feat.icon}</div>
                  <div className="text-slate-900 font-bold text-xs leading-snug">{feat.title}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── TAB 2: OFFICER FIELD PORTAL ── */}
        {activePortalTab === 'officer' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-12 gap-5 items-center my-2"
          >
            {/* Left: Mobile Simulator */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[340px] rounded-3xl p-4 bg-white border-2 border-amber-300 shadow-lg space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100 text-xs font-mono">
                  <span className="text-amber-900 font-bold">OFFICER FIELD APP</span>
                  <span className="text-emerald-800 font-bold">● GPS ACTIVE</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                  <div className="flex justify-between text-xs font-mono text-rose-800 font-bold">
                    <span>🚨 MISSION: MP-8921</span>
                    <span className="text-amber-900">45m away</span>
                  </div>
                  <div className="flex items-center gap-3 text-left">
                    <span className="text-3xl">👦</span>
                    <div>
                      <div className="text-slate-900 font-bold text-sm">Aarav Sharma (7y)</div>
                      <div className="text-sky-800 text-xs font-mono font-bold">Re-ID Match: 98.6% Conf</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 pt-1">
                    {(['En Route', 'On Scene', 'Reunited'] as const).map(st => (
                      <button
                        key={st}
                        onClick={() => setOfficerStatus(st)}
                        className={`py-1.5 rounded-lg text-xs font-bold font-mono cursor-pointer transition-all ${
                          officerStatus === st
                            ? 'bg-amber-600 text-white shadow-xs'
                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setSosActive(prev => !prev)}
                  className={`w-full py-3 rounded-xl font-mono font-bold text-xs cursor-pointer transition-all border ${
                    sosActive
                      ? 'bg-red-600 text-white border-red-700 shadow-md'
                      : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                  }`}
                >
                  {sosActive ? '🚨 SOS TRANSMITTING LIVE GPS...' : '1-TAP EMERGENCY SOS BACKUP'}
                </button>
              </div>
            </div>

            {/* Right: Feature Grid */}
            <div className="lg:col-span-7 space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                {OFFICER_PORTAL_FEATURES.map((feat) => (
                  <div key={feat.title} className="glass p-3.5 rounded-2xl border border-slate-200 bg-white/95 shadow-xs">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{feat.icon}</span>
                      <h4 className="text-slate-900 font-bold text-sm">{feat.title}</h4>
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed">{feat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── TAB 3: WORKFLOW PIPELINE ── */}
        {activePortalTab === 'workflow' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="glass p-5 rounded-2xl border border-emerald-200 bg-white/95 shadow-sm my-2"
          >
            <div className="grid md:grid-cols-4 gap-4">
              {PORTAL_WORKFLOW_STEPS.map((s) => (
                <div key={s.step} className="glass p-4 rounded-xl border border-slate-200 bg-white shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-mono font-bold text-sm text-slate-400">{s.step}</span>
                      <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold" style={{ background: `${s.color}15`, color: s.color, border: `1px solid ${s.color}30` }}>
                        {s.badge}
                      </span>
                    </div>
                    <div className="font-bold text-slate-900 text-sm mb-1">{s.source}</div>
                    <p className="text-slate-600 text-xs leading-relaxed">{s.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </SectionWrapper>
  );
}

export function CitizenApp() {
  const [activeScreen, setActiveScreen] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveScreen(prev => (prev + 1) % CITIZEN_APP_SCREENS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const screen = CITIZEN_APP_SCREENS[activeScreen];

  return (
    <SectionWrapper id="citizen">
      <div className="max-w-6xl mx-auto px-2.5 sm:px-6 w-full flex-1 flex flex-col justify-start sm:justify-between gap-3 py-1 sm:py-2">
        <SectionHeader
          number="11 / CITIZEN MOBILE APPLICATION"
          title="Pilgrim Mobile Experience & Free Ghat Finder"
          subtitle="Real-time public intelligence in pilgrims' hands — live Ghat freeness meters, smart diversions, and emergency contacts."
          color="#0284c7"
        />
        <div className="grid md:grid-cols-12 gap-4 sm:gap-8 items-center my-1 sm:my-2">
          {/* Phone mockup */}
          <div className="md:col-span-5 flex justify-center">
            <div
              className="w-[270px] rounded-3xl overflow-hidden p-4 bg-white border-2 border-sky-300 shadow-xl space-y-2"
            >
              <div className="flex justify-between items-center mb-2 px-1 text-xs font-mono text-slate-400">
                <span>9:41</span>
                <span>5G ●●●</span>
              </div>
              <div className="text-center pb-2 border-b border-slate-100 mb-2">
                <div className="text-amber-700 font-black text-sm tracking-wider">PUSHKARALU</div>
                <div className="text-slate-500 text-xs">Smart Pilgrim App</div>
              </div>
              <div className="text-center rounded-2xl p-4 bg-sky-50 border border-sky-200 mb-2 min-h-[130px] flex flex-col justify-center items-center">
                <div className="text-4xl mb-1.5">{screen.icon}</div>
                <div className="text-sky-950 font-bold text-sm mb-1">{screen.label}</div>
                <div className="text-slate-700 text-xs leading-relaxed font-medium">{screen.desc}</div>
              </div>
            </div>
          </div>

          {/* Screen list */}
          <div className="md:col-span-7 grid grid-cols-2 gap-3">
            {CITIZEN_APP_SCREENS.map((s, i) => (
              <button
                key={s.label}
                onClick={() => setActiveScreen(i)}
                className={`glass rounded-2xl p-3.5 text-left cursor-pointer border transition-all ${
                  activeScreen === i ? 'border-sky-500 bg-sky-50 shadow-md ring-2 ring-sky-400/20' : 'border-slate-200 bg-white hover:border-sky-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{s.icon}</span>
                  <span className="text-slate-900 font-bold text-sm truncate">{s.label}</span>
                </div>
                <p className="text-slate-600 text-xs leading-snug line-clamp-2 font-medium">{s.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

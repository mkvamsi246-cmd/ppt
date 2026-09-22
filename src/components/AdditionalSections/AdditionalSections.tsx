import { motion } from 'framer-motion';
import { SectionWrapper, SectionHeader } from '../shared/UIComponents';
import { TECH_STACK, KPI_METRICS, ETHICS_PRINCIPLES } from '../../data/content';

/* ─── Technology Stack ─── */
export function TechnologyStack() {
  return (
    <SectionWrapper id="technology">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          number="15 / TECHNOLOGY STACK"
          title="Technology Ecosystem"
          subtitle="A curated stack of AI, IoT, GIS, backend and frontend technologies powering the platform."
          color="#7ecff7"
        />
        <div className="space-y-6">
          {TECH_STACK.map((group, gi) => (
            <motion.div
              key={group.group}
              initial={{ opacity: 0, x: gi % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: gi * 0.08 }}
              className="glass rounded-2xl p-5"
              style={{ border: `1px solid ${group.color}25` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="rounded-lg px-3 py-1 text-xs font-bold"
                  style={{ background: `${group.color}20`, border: `1px solid ${group.color}40`, color: group.color, letterSpacing: '0.1em' }}
                >
                  {group.group}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item, ii) => (
                  <motion.div
                    key={ii}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="glass rounded-xl px-4 py-2 cursor-default"
                    style={{
                      border: `1px solid ${group.color}20`,
                      color: '#f0f4ff',
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      transition: 'all 0.2s',
                    }}
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="bg-grid absolute inset-0 pointer-events-none opacity-20" />
    </SectionWrapper>
  );
}

/* ─── Problem Solver Comparison Matrix (Replaces Research Clutter) ─── */
export function ProblemSolverMatrix() {
  const comparisons = [
    {
      domain: 'Crowd Safety & Stampede Risk',
      icon: '👥',
      color: '#00d4ff',
      problem2015: 'Manual gate surveillance failed to notice surging densities at Pushkar Ghat entrance, leading to fatal bottleneck stampede.',
      solution2027: 'YOLOv8 + CSRNet AI density estimation predicts surges 15-20 mins ahead, automatically triggering barricade diversion.',
      metric: 'Zero Blindspots · 15m Early Alert',
    },
    {
      domain: 'Emergency & Ambulance Evacuation',
      icon: '🚑',
      color: '#ffd600',
      problem2015: 'Ambulances carrying critical heatstroke and trauma patients were trapped in 2+ hour traffic jams across Godavari Bridge.',
      solution2027: 'Multi-lane AI vehicle counting detects bottlenecks and auto-switches traffic signals to green ahead of incoming convoys.',
      metric: 'Hospital ETA: 11 Mins (was 45m+)',
    },
    {
      domain: 'River Safety & Drowning Response',
      icon: '🌊',
      color: '#ff2d4a',
      problem2015: 'Rescue boats took 15+ minutes to locate struggling swimmers in strong Godavari currents without aerial visibility.',
      solution2027: 'AI thermal & optical drones identify struggling swimmers in seconds and drop automated auto-inflating flotation pods.',
      metric: 'Rescue Intervention: < 90 Seconds',
    },
    {
      domain: 'Missing Children & Lost Elderly',
      icon: '🔍',
      color: '#c9a227',
      problem2015: 'Over 12,000 pilgrims separated from families; manual loudspeaker announcements overwhelmed police helpdesks for days.',
      solution2027: 'Facial Re-ID across 520 CCTVs + BLE smart wristbands instantly push coordinates to nearest 3 patrol officers.',
      metric: 'Reunification: < 7 Minutes',
    },
    {
      domain: 'Inter-Agency Coordination',
      icon: '🏛️',
      color: '#00e676',
      problem2015: 'Police, Municipal, NDRF, and Medical teams operated with fragmented radio frequencies and contradictory situational data.',
      solution2027: 'Unified GIS Command Center provides a single real-time operational map with automated cross-department task dispatch.',
      metric: '100% Unified Live Operational Picture',
    },
  ];

  return (
    <SectionWrapper id="comparison">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          number="16 / PROBLEM SOLVER MATRIX"
          title="How Smart Pushkaralu Solves 2015 Failures"
          subtitle="A direct comparison of previous disaster challenges versus the AI-enabled 2027 engineering solutions."
          color="#00e676"
        />

        <div className="space-y-5">
          {comparisons.map((c, i) => (
            <motion.div
              key={c.domain}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-3xl p-6 border border-white/10 overflow-hidden relative"
              style={{ borderLeft: `4px solid ${c.color}` }}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{c.icon}</span>
                  <h4 className="font-bold text-white text-base">{c.domain}</h4>
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  {c.metric}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4 text-xs leading-relaxed">
                {/* 2015 Failure */}
                <div className="p-4 rounded-2xl bg-red-950/30 border border-red-500/30 space-y-1">
                  <div className="text-red-400 font-bold uppercase font-mono text-[11px] flex items-center gap-1.5">
                    <span>❌</span> 2015 PREVIOUS TRAGEDY / MANUAL GAP
                  </div>
                  <p className="text-zinc-300">{c.problem2015}</p>
                </div>

                {/* 2027 AI Solution */}
                <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-1">
                  <div className="text-emerald-400 font-bold uppercase font-mono text-[11px] flex items-center gap-1.5">
                    <span>⚡</span> 2027 AI WORKING INTERVENTION
                  </div>
                  <p className="text-zinc-200">{c.solution2027}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="bg-grid absolute inset-0 pointer-events-none opacity-20" />
    </SectionWrapper>
  );
}

/* ─── KPI Section ─── */
export function KPISection() {
  return (
    <SectionWrapper id="kpi">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          number="17 / KPI"
          title="Performance Targets & Response Benchmarks"
          subtitle="Engineered for measurable real-world life-saving impact."
          color="#00e676"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {KPI_METRICS.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-5"
              style={{ border: `1px solid ${metric.color}25` }}
            >
              <div style={{ fontSize: '2rem', marginBottom: 10 }}>{metric.icon}</div>
              <div style={{ color: '#f0f4ff', fontWeight: 600, fontSize: '0.9rem', marginBottom: 8, lineHeight: 1.3 }}>
                {metric.label}
              </div>
              <div
                className="rounded-lg px-3 py-2 text-center"
                style={{ background: `${metric.color}10`, border: `1px solid ${metric.color}25` }}
              >
                <span style={{ color: metric.color, fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em' }}>
                  {metric.value}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="bg-grid absolute inset-0 pointer-events-none opacity-20" />
    </SectionWrapper>
  );
}

/* ─── Human In The Loop ─── */
export function HumanInLoop() {
  const flowItems = [
    { label: 'AI Detection', icon: '🧠', color: '#c9a227', sub: 'Surges & incidents detected automatically' },
    { label: 'AI Prediction', icon: '📊', color: '#f0d080', sub: '15-min risk levels estimated' },
    { label: 'AI Recommendation', icon: '💡', color: '#ffd600', sub: 'Optimal route & resource suggested' },
    { label: 'AUTHORIZED COMMANDER', icon: '👤', color: '#00d4ff', sub: 'Verifies on live map, approves action', highlight: true },
    { label: 'Action Executed', icon: '⚡', color: '#00e676', sub: 'Police & rescue teams respond immediately' },
  ];

  return (
    <SectionWrapper id="human">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          number="18 / HUMAN IN THE LOOP"
          title="Command Authority & Governance"
          subtitle="AI empowers decision-makers with early intelligence — final operational commands always remain with human officers."
          color="#ffd600"
        />

        <div className="glass-strong rounded-3xl p-8 mb-10 text-center relative overflow-hidden" style={{ borderColor: 'rgba(201,162,39,0.3)' }}>
          <div className="absolute inset-0 pointer-events-none opacity-10 bg-grid" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-display text-glow-gold" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)', color: '#f0d080', fontWeight: 700, lineHeight: 1.5, marginBottom: 12 }}>
              "AI does not replace trained personnel.<br />
              AI detects, predicts, prioritizes and recommends.<br />
              Authorized officials make and execute operational decisions."
            </p>
          </motion.div>
        </div>

        {/* Linear chain */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {flowItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`glass rounded-2xl p-4 flex flex-col items-center text-center relative ${item.highlight ? 'glass-strong' : ''}`}
              style={{
                border: item.highlight ? '2px solid #00d4ff' : `1px solid ${item.color}25`,
                boxShadow: item.highlight ? '0 0 20px rgba(0,212,255,0.3)' : 'none',
              }}
            >
              <div style={{ fontSize: '1.8rem', marginBottom: 8 }}>{item.icon}</div>
              <div style={{ color: item.highlight ? '#00d4ff' : '#f0f4ff', fontWeight: 700, fontSize: '0.8rem', marginBottom: 4, letterSpacing: '0.04em' }}>
                {item.label}
              </div>
              <div style={{ color: '#7ecff7', fontSize: '0.7rem', opacity: 0.8, lineHeight: 1.4 }}>
                {item.sub}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="bg-grid absolute inset-0 pointer-events-none opacity-20" />
    </SectionWrapper>
  );
}

/* ─── Safety & Protocols ─── */
export function SafetySection() {
  return (
    <SectionWrapper id="ethics">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          number="19 / ETHICS & GOVERNANCE"
          title="Privacy, Security & Operational Safety"
          subtitle="Adhering to strict data protection, role-based access, and safety protocols."
          color="#7ecff7"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-10">
          {ETHICS_PRINCIPLES.map((principle, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass rounded-2xl p-5"
              style={{ border: '1px solid rgba(126,207,247,0.15)' }}
            >
              <div style={{ fontSize: '1.8rem', marginBottom: 10 }}>{principle.icon}</div>
              <div style={{ color: '#f0f4ff', fontWeight: 600, fontSize: '0.9rem', marginBottom: 6 }}>
                {principle.label}
              </div>
              <div style={{ color: '#7ecff7', fontSize: '0.78rem', opacity: 0.85, lineHeight: 1.5 }}>
                {principle.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="bg-grid absolute inset-0 pointer-events-none opacity-20" />
    </SectionWrapper>
  );
}

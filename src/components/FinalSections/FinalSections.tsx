import { motion } from 'framer-motion';
import { SectionWrapper } from '../shared/UIComponents';
import { PUSHKARALU_ACRONYM, ETHICS_PRINCIPLES } from '../../data/content';

const STATS = [
  { value: '30M+', label: 'Pilgrims Protected', icon: '👥', color: '#0284c7' },
  { value: '520', label: 'CCTV Feeds Live', icon: '📷', color: '#d97706' },
  { value: '< 90s', label: 'River Rescue', icon: '🚤', color: '#059669' },
  { value: '99.4%', label: 'ANPR Accuracy', icon: '🅿️', color: '#7c3aed' },
  { value: '11 min', label: 'Green Corridor', icon: '🟢', color: '#dc2626' },
  { value: '< 7 min', label: 'Missing Reunited', icon: '🔍', color: '#0369a1' },
];

export function FinalSection() {
  return (
    <SectionWrapper id="final">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 w-full flex-1 flex flex-col justify-start sm:justify-between gap-3 h-full py-1 sm:py-2 text-center">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 rounded-full bg-sky-50 border border-sky-200 self-center"
        >
          <span className="w-2 h-2 rounded-full bg-sky-600 animate-pulse" />
          <span className="font-mono text-[10px] sm:text-[11px] tracking-widest text-sky-900 uppercase font-black">
            12 / GOVERNANCE &amp; PROJECT IMPACT
          </span>
        </motion.div>

        {/* ── UNITED PUSHKARALU letters ── */}
        <div className="flex flex-col items-center gap-2 my-1">
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-3" aria-label="PUSHKARALU">
            {PUSHKARALU_ACRONYM.map((item, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  x: (i % 2 === 0 ? -1 : 1) * (60 + i * 18),
                  y: i < 5 ? -60 : 60,
                  scale: 0.4,
                  rotate: (i % 2 === 0 ? -1 : 1) * 25,
                }}
                animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
                transition={{
                  duration: 0.75,
                  delay: 0.1 + i * 0.07,
                  type: 'spring',
                  stiffness: 180,
                  damping: 16,
                }}
                className="relative flex flex-col items-center"
              >
                <motion.div
                  className="px-2 sm:px-3.5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl font-display font-black text-2xl sm:text-4xl md:text-5xl bg-white shadow-lg border-2 flex items-center justify-center min-w-[36px] sm:min-w-[48px]"
                  style={{ color: item.color, borderColor: item.color }}
                  animate={{
                    boxShadow: [
                      `0 4px 20px ${item.color}22`,
                      `0 8px 32px ${item.color}55`,
                      `0 4px 20px ${item.color}22`,
                    ],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.15 }}
                >
                  {item.letter}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.07 }}
                  className="mt-1 text-[9px] sm:text-[10px] font-bold font-mono uppercase tracking-tight text-center leading-tight max-w-[56px]"
                  style={{ color: item.color }}
                >
                  {item.title.split(' ')[0]}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Unified rainbow underline */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="h-1 w-full max-w-2xl rounded-full"
            style={{
              background: 'linear-gradient(90deg, #0284c7, #d97706, #059669, #dc2626, #7c3aed, #0369a1)',
            }}
          />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="font-serif italic text-amber-800 text-sm sm:text-base font-bold"
          >
            "Ten Pillars. One Mission. 30 Million Lives Protected."
          </motion.p>
        </div>

        {/* ── Impact Stats ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-2.5 my-1">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.45 + i * 0.07, type: 'spring', stiffness: 200 }}
              className="glass rounded-xl p-2.5 border bg-white/95 shadow-sm text-center"
              style={{ borderColor: `${stat.color}33` }}
            >
              <div className="text-lg mb-0.5">{stat.icon}</div>
              <div className="font-black font-mono text-base sm:text-lg leading-tight" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-[10px] text-slate-600 font-medium leading-tight">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* ── Ethical AI Safeguards ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="glass rounded-2xl p-2.5 sm:p-3 border border-slate-200 bg-white/95 shadow-sm"
        >
          <div className="text-[10px] font-mono text-sky-900 font-bold tracking-wider mb-1.5 sm:mb-2 uppercase">
            Ethical AI &amp; Human-in-the-Loop Safeguards
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1.5 sm:gap-2">
            {ETHICS_PRINCIPLES.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.9 + i * 0.06 }}
                className="p-2 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center"
              >
                <span className="text-lg mb-0.5">{p.icon}</span>
                <span className="text-[10px] font-bold text-slate-800 text-center leading-snug">{p.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Final Emblem ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.1, type: 'spring', stiffness: 150 }}
          className="py-1"
        >
          <motion.div
            className="font-display font-black text-xl sm:text-3xl md:text-4xl text-slate-900 tracking-wider"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            PUSHKARALU <span className="text-sky-600">2027</span>
          </motion.div>
          <p className="text-slate-600 font-mono text-[10px] sm:text-xs tracking-widest mt-0.5 font-bold">
            RAJAHMUNDRY SMART PILGRIM SAFETY &amp; EMERGENCY COMMAND PLATFORM
          </p>
        </motion.div>

      </div>
    </SectionWrapper>
  );
}

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RiverCanvas from './RiverCanvas';
import { PUSHKARALU_ACRONYM } from '../../data/content';

interface HeroProps {
  onStart: () => void;
}

const letterVariant = {
  hidden: { opacity: 0, y: 25, scale: 0.85 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.05, ease: 'easeOut' as const },
  }),
};

/** A single radial burst particle */
function BurstParticle({
  angle,
  color,
  delay,
}: {
  angle: number;
  color: string;
  delay: number;
}) {
  const rad = (angle * Math.PI) / 180;
  const dist = 260 + Math.random() * 220;
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 rounded-full pointer-events-none"
      style={{
        width: 7 + Math.random() * 7,
        height: 7 + Math.random() * 7,
        background: color,
        boxShadow: `0 0 14px 5px ${color}99`,
        translateX: '-50%',
        translateY: '-50%',
      }}
      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      animate={{
        x: Math.cos(rad) * dist,
        y: Math.sin(rad) * dist,
        opacity: 0,
        scale: 0,
      }}
      transition={{ duration: 1.05, delay, ease: 'easeOut' }}
    />
  );
}

export default function Hero({ onStart }: HeroProps) {
  const [started, setStarted] = useState(false);
  const [activeLetterIdx, setActiveLetterIdx] = useState<number | null>(0);
  const [isAutoCycling, setIsAutoCycling] = useState(true);

  // Launch sequence states
  const [launchPhase, setLaunchPhase] = useState<'idle' | 'burst' | 'zoom' | 'warp' | 'done'>('idle');
  const launchFiredRef = useRef(false);

  const launching = launchPhase !== 'idle' && launchPhase !== 'done';

  // Pre-compute burst particles once
  const burstParticles = useRef(
    Array.from({ length: 56 }, (_, i) => ({
      id: i,
      angle: (i / 56) * 360 + (Math.random() - 0.5) * 6,
      color: PUSHKARALU_ACRONYM[i % PUSHKARALU_ACRONYM.length].color,
      delay: i * 0.012,
    }))
  );

  const triggerLaunch = () => {
    if (launchFiredRef.current) return;
    launchFiredRef.current = true;
    setIsAutoCycling(false);

    // Phase 1: burst + letters scatter
    setLaunchPhase('burst');
    // Phase 2: warp rings
    setTimeout(() => setLaunchPhase('zoom'), 500);
    // Phase 3: full-screen warp flash
    setTimeout(() => setLaunchPhase('warp'), 1100);
    // Done — call onStart and advance to next slide
    setTimeout(() => {
      setStarted(true);
      setLaunchPhase('done'); // collapses overlay so slide transition is clean
      onStart();
    }, 2300);
  };

  useEffect(() => {
    if (!isAutoCycling || launchFiredRef.current) return;
    const interval = setInterval(() => {
      setActiveLetterIdx((prev) => {
        const next = ((prev ?? 0) + 1) % PUSHKARALU_ACRONYM.length;
        return next;
      });
    }, 2400);
    return () => clearInterval(interval);
  }, [isAutoCycling]);

  const handleStart = () => {
    if (launchFiredRef.current) return;
    triggerLaunch();
  };

  const currentItem =
    activeLetterIdx !== null ? PUSHKARALU_ACRONYM[activeLetterIdx] : PUSHKARALU_ACRONYM[0];

  return (
    <section
      id="hero"
      className="section relative flex flex-col items-center justify-center overflow-hidden py-4 select-none bg-[#f8fafc] w-full"
      style={{ height: '100dvh' }}
    >
      {/* River canvas bg */}
      <RiverCanvas />
      <div className="bg-grid absolute inset-0 pointer-events-none opacity-25 z-10" />

      {/* ═══════════════ LAUNCH FX LAYER ═══════════════ */}
      <AnimatePresence>
        {launching && (
          <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden">
            {/* Burst particles */}
            {launchPhase === 'burst' &&
              burstParticles.current.map((p) => (
                <BurstParticle key={p.id} angle={p.angle} color={p.color} delay={p.delay} />
              ))}

            {/* Expanding ring waves */}
            {(launchPhase === 'zoom' || launchPhase === 'warp') &&
              [0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={`ring-${i}`}
                  className="absolute left-1/2 top-1/2 rounded-full border-[2.5px]"
                  style={{
                    borderColor: PUSHKARALU_ACRONYM[(i * 2) % PUSHKARALU_ACRONYM.length].color,
                    boxShadow: `0 0 28px 6px ${PUSHKARALU_ACRONYM[(i * 2) % PUSHKARALU_ACRONYM.length].color}55`,
                    translateX: '-50%',
                    translateY: '-50%',
                  }}
                  initial={{ width: 60, height: 60, opacity: 1 }}
                  animate={{ width: 2400, height: 2400, opacity: 0 }}
                  transition={{ duration: 1.3, delay: i * 0.16, ease: 'easeOut' }}
                />
              ))}

            {/* "Launching" word flash */}
            {launchPhase === 'burst' && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.1, times: [0, 0.2, 0.7, 1] }}
              >
                <div className="flex flex-col items-center gap-3">
                  <motion.p
                    className="font-mono text-[11px] tracking-[0.55em] text-sky-600 font-bold uppercase"
                    initial={{ y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.08 }}
                  >
                    Initiating Presentation
                  </motion.p>
                  <motion.div
                    className="flex gap-2"
                    initial={{ scale: 0.75, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.12, type: 'spring', stiffness: 280 }}
                  >
                    {PUSHKARALU_ACRONYM.map((item, i) => (
                      <motion.span
                        key={i}
                        className="font-display font-black text-4xl sm:text-5xl"
                        style={{ color: item.color, textShadow: `0 0 24px ${item.color}cc` }}
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 0.55, delay: i * 0.045, ease: 'easeInOut' }}
                      >
                        {item.letter}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Warp radial flash — zooms in then fades out */}
            {launchPhase === 'warp' && (
              <motion.div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(ellipse at center, #ffffff 0%, #bae6fd 28%, #0ea5e9 58%, #0c4a6e 100%)',
                }}
                initial={{ opacity: 0, scale: 0.25 }}
                animate={{ opacity: [0, 1, 1, 0], scale: [0.25, 1, 1, 1.05] }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], times: [0, 0.4, 0.7, 1] }}
              />
            )}
          </div>
        )}
      </AnimatePresence>

      {/* ═══════════════ MAIN CONTENT ═══════════════ */}
      <motion.div
        className="relative z-20 flex flex-col items-center justify-between text-center px-4 sm:px-6 max-w-6xl mx-auto w-full h-full max-h-full overflow-y-auto sm:overflow-hidden hide-scrollbar pb-16 sm:pb-0 py-2"
        animate={
          launchPhase === 'zoom'
            ? { scale: 1.1, opacity: 0.55 }
            : launchPhase === 'warp'
            ? { scale: 1.4, opacity: 0 }
            : {}
        }
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-200 shadow-xs"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-sky-600 animate-pulse" />
          <span className="font-mono text-xs md:text-sm tracking-widest text-sky-900 uppercase font-black">
            RAJAHMUNDRY SMART PUSHKARALU 2027
          </span>
        </motion.div>

        {/* PUSHKARALU letter tiles */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2.5 my-2" aria-label="PUSHKARALU">
          {PUSHKARALU_ACRONYM.map((item, i) => {
            const isSelected = activeLetterIdx === i;
            return (
              <motion.button
                key={i}
                custom={i}
                variants={letterVariant}
                initial="hidden"
                animate={
                  launching
                    ? {
                        scale: 0,
                        opacity: 0,
                        y: -35 - i * 6,
                        rotate: (i % 2 === 0 ? 1 : -1) * (18 + i * 6),
                        transition: { duration: 0.5, delay: i * 0.03, ease: 'easeIn' },
                      }
                    : 'visible'
                }
                whileHover={launching ? {} : { scale: 1.08, y: -2 }}
                whileTap={launching ? {} : { scale: 0.95 }}
                onClick={() => {
                  if (launching) return;
                  setIsAutoCycling(false);
                  setActiveLetterIdx(i);
                }}
                className={`relative px-3 sm:px-4 py-2 rounded-2xl transition-all cursor-pointer font-display font-black text-3xl sm:text-5xl md:text-6xl ${
                  isSelected
                    ? 'scale-105 shadow-lg bg-white border-2'
                    : 'bg-white/90 hover:bg-white border border-slate-200 shadow-xs'
                }`}
                style={{
                  color: isSelected ? item.color : '#1e293b',
                  borderColor: isSelected ? item.color : '#e2e8f0',
                }}
              >
                {item.letter}
                {isSelected && (
                  <motion.span
                    layoutId="active-letter-dot"
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                    style={{ background: item.color }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Acronym meaning card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={
            launching
              ? { opacity: 0, scale: 0.88, y: 18, transition: { duration: 0.38 } }
              : { opacity: 1, scale: 1 }
          }
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass rounded-2xl p-4 md:p-5 max-w-2xl w-full border border-slate-200 bg-white/95 shadow-md relative overflow-hidden"
        >
          {/* Cycle progress bar */}
          {isAutoCycling && !launching && (
            <motion.div
              className="absolute bottom-0 left-0 h-[3px] rounded-full"
              style={{ background: currentItem.color }}
              key={`bar-${activeLetterIdx}`}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.4, ease: 'linear' }}
            />
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-left">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`icon-${activeLetterIdx}`}
                  className="text-3xl p-3 rounded-2xl flex-shrink-0 flex items-center justify-center font-black shadow-xs"
                  style={{
                    background: `${currentItem.color}15`,
                    border: `2px solid ${currentItem.color}40`,
                    color: currentItem.color,
                    minWidth: 56,
                    minHeight: 56,
                  }}
                  initial={{ scale: 0.65, opacity: 0, rotateY: 90 }}
                  animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                  exit={{ scale: 0.65, opacity: 0, rotateY: -90 }}
                  transition={{ duration: 0.26, ease: 'easeOut' }}
                >
                  {currentItem.letter}
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`text-${activeLetterIdx}`}
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -14 }}
                  transition={{ duration: 0.24 }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="text-lg md:text-xl font-black font-display"
                      style={{ color: currentItem.color }}
                    >
                      {currentItem.title}
                    </span>
                    <span className="text-xl">{currentItem.icon}</span>
                  </div>
                  <p className="text-sm text-slate-700 mt-1 font-semibold leading-relaxed">
                    {currentItem.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              onClick={() => {
                if (launching) return;
                setIsAutoCycling((v) => !v);
              }}
              className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase transition-all whitespace-nowrap cursor-pointer flex-shrink-0 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 shadow-xs"
            >
              {isAutoCycling ? '⚡ Auto-Cycle' : '▶ Play'}
            </button>
          </div>
        </motion.div>

        {/* Subtitle & manifesto */}
        <div className="space-y-1.5 my-1">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="font-display text-lg sm:text-2xl font-black text-slate-900 leading-snug"
          >
            AI-Enabled Integrated Smart City, Pilgrim Safety &amp; Emergency Response System
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-amber-800 text-sm sm:text-base font-serif italic font-bold"
          >
            "From 2015 Tragedies to 2027 Intelligent Protection · Protecting 30 Million Pilgrims"
          </motion.p>
        </div>

        {/* CTA button / launch indicator */}
        <div className="py-2">
          <AnimatePresence mode="wait">
            {!started && !launching && (
              <motion.button
                id="start-experience-btn"
                key="start-btn"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1, transition: { delay: 0.9, duration: 0.5 } }}
                exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleStart}
                className="px-10 py-3.5 rounded-full font-bold text-sm md:text-base tracking-wider uppercase flex items-center gap-3 transition-all cursor-pointer shadow-lg bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/30"
              >
                <span>▶</span> START PRESENTATION EXPERIENCE
              </motion.button>
            )}
            {launching && launchPhase === 'burst' && (
              <motion.div
                key="launching-indicator"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 px-7 py-3 rounded-full bg-sky-600 text-white font-bold text-sm tracking-widest shadow-xl shadow-sky-500/40"
              >
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.75, repeat: Infinity, ease: 'linear' }}
                  className="text-lg"
                >
                  ⚡
                </motion.span>
                LAUNCHING PRESENTATION…
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}

import { useState, useEffect } from 'react';
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

export default function Hero({ onStart }: HeroProps) {
  const [started, setStarted] = useState(false);
  const [activeLetterIdx, setActiveLetterIdx] = useState<number | null>(0);
  const [isAutoCycling, setIsAutoCycling] = useState(true);

  useEffect(() => {
    if (!isAutoCycling) return;
    const interval = setInterval(() => {
      setActiveLetterIdx((prev) => ((prev ?? 0) + 1) % PUSHKARALU_ACRONYM.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [isAutoCycling]);

  const handleStart = () => {
    setStarted(true);
    onStart();
  };

  const currentItem = activeLetterIdx !== null ? PUSHKARALU_ACRONYM[activeLetterIdx] : PUSHKARALU_ACRONYM[0];

  return (
    <section
      id="hero"
      className="section relative flex flex-col items-center justify-center overflow-hidden py-4 select-none bg-[#f8fafc] w-full h-screen"
    >
      {/* Light Godavari river canvas */}
      <RiverCanvas />

      {/* Subtle light grid */}
      <div className="bg-grid absolute inset-0 pointer-events-none opacity-25 z-10" />

      {/* Main Content Container */}
      <div className="relative z-20 flex flex-col items-center justify-between text-center px-6 max-w-6xl mx-auto w-full h-full max-h-[92vh] py-2">
        {/* Project Subtitle */}
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

        {/* ── PUSHKARALU Big Title Reveal ── */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2.5 my-2" aria-label="PUSHKARALU">
          {PUSHKARALU_ACRONYM.map((item, i) => {
            const isSelected = activeLetterIdx === i;
            return (
              <motion.button
                key={i}
                custom={i}
                variants={letterVariant}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
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

        {/* ── Interactive Acronym Meaning Card ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass rounded-2xl p-4 md:p-5 max-w-2xl w-full border border-slate-200 bg-white/95 shadow-md relative overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-left">
              <div
                className="text-3xl p-3 rounded-2xl flex-shrink-0 flex items-center justify-center font-black shadow-xs"
                style={{
                  background: `${currentItem.color}15`,
                  border: `2px solid ${currentItem.color}40`,
                  color: currentItem.color,
                  minWidth: 56,
                  minHeight: 56,
                }}
              >
                {currentItem.letter}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg md:text-xl font-black text-slate-900 font-display" style={{ color: currentItem.color }}>
                    {currentItem.title}
                  </span>
                  <span className="text-xl">{currentItem.icon}</span>
                </div>
                <p className="text-sm text-slate-700 mt-1 font-semibold leading-relaxed">
                  {currentItem.desc}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsAutoCycling(!isAutoCycling)}
              className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase transition-all whitespace-nowrap cursor-pointer flex-shrink-0 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 shadow-xs"
            >
              {isAutoCycling ? '⚡ Auto-Cycle' : '▶ Play'}
            </button>
          </div>
        </motion.div>

        {/* ── Subtitle & Project Manifesto ── */}
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

        {/* ── Action Trigger Button ── */}
        <div className="py-2">
          <AnimatePresence>
            {!started && (
              <motion.button
                id="start-experience-btn"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1, transition: { delay: 0.9, duration: 0.5 } }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleStart}
                className="px-10 py-3.5 rounded-full font-bold text-sm md:text-base tracking-wider uppercase flex items-center gap-3 transition-all cursor-pointer shadow-lg bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/30"
              >
                <span>▶</span> START PRESENTATION EXPERIENCE
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

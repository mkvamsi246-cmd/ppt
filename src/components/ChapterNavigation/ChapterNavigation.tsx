import { motion } from 'framer-motion';
import { CHAPTERS } from '../../data/content';

interface ChapterNavigationProps {
  activeSection: string;
  onNavigate: (id: string) => void;
  onNext?: () => void;
  onPrev?: () => void;
  canNext?: boolean;
  canPrev?: boolean;
}

export default function ChapterNavigation({
  activeSection,
  onNavigate,
  onNext,
  onPrev,
  canNext,
  canPrev,
}: ChapterNavigationProps) {
  const activeIndex = CHAPTERS.findIndex(c => c.id === activeSection);
  const progress = CHAPTERS.length > 0 ? ((activeIndex + 1) / CHAPTERS.length) * 100 : 0;

  const isFirstSlide = activeIndex <= 0;
  const isLastSlide = activeIndex >= CHAPTERS.length - 1;

  const hasNext = canNext !== undefined ? canNext : !isLastSlide;
  const hasPrev = canPrev !== undefined ? canPrev : !isFirstSlide;

  const handlePrev = () => {
    if (onPrev) {
      onPrev();
    } else if (activeIndex > 0) {
      onNavigate(CHAPTERS[activeIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (onNext) {
      onNext();
    } else if (activeIndex < CHAPTERS.length - 1) {
      onNavigate(CHAPTERS[activeIndex + 1].id);
    }
  };

  return (
    <>
      {/* ── Unified Highlighted Bottom Slide Controller (Mobile & Desktop) ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed bottom-0 left-0 right-0 sm:bottom-4 sm:left-1/2 sm:-translate-x-1/2 sm:max-w-2xl sm:w-auto z-50 px-0 sm:px-4"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 8px)' }}
      >
        <div className="glass border-t-2 sm:border-2 border-sky-200 bg-white/98 backdrop-blur-xl px-3 sm:px-5 py-2 rounded-none sm:rounded-2xl flex items-center justify-between gap-2 sm:gap-4 shadow-[0_-8px_25px_-5px_rgba(2,132,199,0.15)] sm:shadow-xl sm:border-slate-200">
          {/* Previous Slide Button */}
          <button
            onClick={handlePrev}
            disabled={!hasPrev}
            className="h-10 px-3 sm:px-4 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 text-slate-800 font-bold text-xs cursor-pointer transition-all border border-slate-300 flex-shrink-0 active:scale-95 shadow-xs"
            title="Previous Slide"
          >
            <span className="text-sm font-black">◀</span>
            <span className="hidden xs:inline">PREV</span>
          </button>

          {/* Slide Indicator & Dots */}
          <div className="flex flex-col items-center justify-center flex-1 min-w-0 px-1 sm:px-4">
            <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
              <span className="font-mono text-[11px] sm:text-xs font-black text-sky-800 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                SLIDE {String(activeIndex + 1).padStart(2, '0')}&thinsp;/&thinsp;{String(CHAPTERS.length).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-slate-600 truncate max-w-[90px] xs:max-w-[150px] sm:max-w-xs">
                {CHAPTERS[activeIndex]?.label}
              </span>
            </div>

            <div className="flex items-center gap-1 sm:gap-1.5 justify-center overflow-hidden max-w-full">
              {CHAPTERS.map((ch, i) => {
                const isActive = ch.id === activeSection;
                const isPast = i < activeIndex;
                return (
                  <button
                    key={ch.id}
                    onClick={() => onNavigate(ch.id)}
                    style={{
                      width: isActive ? 18 : 6,
                      height: 5,
                      borderRadius: 2.5,
                      background: isActive ? '#0284c7' : isPast ? '#93c5fd' : '#cbd5e1',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      flexShrink: 0,
                      border: 'none',
                      padding: 0,
                    }}
                    title={ch.label}
                  />
                );
              })}
            </div>
          </div>

          {/* ── HIGHLIGHTED NEXT SLIDE BUTTON ── */}
          <motion.button
            onClick={handleNext}
            disabled={!hasNext}
            animate={
              hasNext
                ? {
                    scale: [1, 1.04, 1],
                    boxShadow: [
                      '0 4px 14px 0 rgba(2, 132, 199, 0.4)',
                      '0 6px 22px 2px rgba(2, 132, 199, 0.7)',
                      '0 4px 14px 0 rgba(2, 132, 199, 0.4)',
                    ],
                  }
                : {}
            }
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className={`h-10 px-3.5 xs:px-4 sm:px-5 rounded-xl font-black text-xs cursor-pointer transition-all flex items-center gap-1.5 flex-shrink-0 active:scale-95 border ${
              hasNext
                ? 'bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 text-white border-sky-400 ring-2 ring-sky-400/50 shadow-lg'
                : 'bg-slate-200 text-slate-400 border-slate-300 opacity-40 cursor-not-allowed ring-0'
            }`}
            title="Next Slide (SPACE / →)"
          >
            <span className="tracking-wide">NEXT</span>
            <span className="hidden sm:inline text-[10px] font-mono text-sky-200">(SPACE)</span>
            <span className="text-sm font-black">▶</span>
          </motion.button>
        </div>
      </motion.div>

      {/* ── Top Progress Bar ── */}
      <div className="fixed top-0 left-0 right-0 z-50" style={{ height: 3 }}>
        <motion.div
          style={{ height: '100%', background: 'linear-gradient(90deg, #0284c7, #2563eb, #d97706)', transformOrigin: 'left' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </>
  );
}


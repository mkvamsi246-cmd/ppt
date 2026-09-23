import { motion } from 'framer-motion';
import { CHAPTERS } from '../../data/content';

interface ChapterNavigationProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

export default function ChapterNavigation({ activeSection, onNavigate }: ChapterNavigationProps) {
  const activeIndex = CHAPTERS.findIndex(c => c.id === activeSection);
  const progress = CHAPTERS.length > 0 ? ((activeIndex + 1) / CHAPTERS.length) * 100 : 0;

  const goPrev = () => {
    if (activeIndex > 0) onNavigate(CHAPTERS[activeIndex - 1].id);
  };
  const goNext = () => {
    if (activeIndex < CHAPTERS.length - 1) onNavigate(CHAPTERS[activeIndex + 1].id);
  };

  return (
    <>

      {/* ── Mobile: Bottom Navigation Bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="fixed bottom-0 left-0 right-0 z-40 sm:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="glass border-t border-slate-200 bg-white/95 backdrop-blur-md px-4 py-2 flex items-center justify-between gap-2">
          {/* Prev button */}
          <button
            onClick={goPrev}
            disabled={activeIndex === 0}
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-30 flex items-center justify-center text-slate-700 font-bold text-sm cursor-pointer transition-all border border-slate-200"
          >
            ◀
          </button>

          {/* Dot indicators */}
          <div className="flex items-center gap-1.5 flex-1 justify-center overflow-hidden">
            {CHAPTERS.map((ch, i) => {
              const isActive = ch.id === activeSection;
              const isPast = i < activeIndex;
              return (
                <button
                  key={ch.id}
                  onClick={() => onNavigate(ch.id)}
                  style={{
                    width: isActive ? 20 : 6,
                    height: 6,
                    borderRadius: 3,
                    background: isActive ? '#0284c7' : isPast ? '#93c5fd' : '#e2e8f0',
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

          {/* Chapter label */}
          <div className="text-[10px] font-mono font-bold text-sky-700 whitespace-nowrap hidden xs:block">
            {CHAPTERS[activeIndex]?.label}
          </div>

          {/* Next button */}
          <button
            onClick={goNext}
            disabled={activeIndex === CHAPTERS.length - 1}
            className="w-9 h-9 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-30 flex items-center justify-center text-white font-bold text-sm cursor-pointer transition-all shadow-sm"
          >
            ▶
          </button>
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


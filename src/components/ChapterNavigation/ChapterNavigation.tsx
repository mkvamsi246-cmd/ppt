import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { CHAPTERS } from '../../data/content';

interface ChapterNavigationProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

export default function ChapterNavigation({ activeSection, onNavigate }: ChapterNavigationProps) {
  const [expanded, setExpanded] = useState(false);

  const activeIndex = CHAPTERS.findIndex(c => c.id === activeSection);
  const progress = CHAPTERS.length > 0 ? ((activeIndex + 1) / CHAPTERS.length) * 100 : 0;

  return (
    <>
      {/* Compact sidebar */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="fixed right-4 top-1/2 z-40 flex flex-col items-end gap-1.5"
        style={{ transform: 'translateY(-50%)' }}
      >
        {/* Progress line */}
        <div
          className="absolute right-1.5 top-0 bottom-0"
          style={{ width: 2, background: 'rgba(2,132,199,0.15)', zIndex: -1 }}
        >
          <motion.div
            style={{ width: '100%', background: 'rgba(2,132,199,0.6)', transformOrigin: 'top', borderRadius: 2 }}
            animate={{ height: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {CHAPTERS.map((ch, i) => {
          const isActive = ch.id === activeSection;
          const isPast   = i < activeIndex;
          return (
            <div key={ch.id} className="flex items-center gap-2 group" style={{ position: 'relative' }}>
              {/* Label (shown on hover / expanded) */}
              <AnimatePresence>
                {(expanded || isActive) && (
                  <motion.button
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    onClick={() => onNavigate(ch.id)}
                    className="rounded-lg px-2.5 py-1 text-right cursor-pointer bg-white/95 shadow-xs border"
                    style={{
                      borderColor: isActive ? '#0284c7' : '#e2e8f0',
                      color: isActive ? '#0284c7' : '#64748b',
                      fontSize: '0.65rem',
                      fontWeight: isActive ? 700 : 500,
                      letterSpacing: '0.05em',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {ch.number} {ch.label}
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Dot */}
              <button
                id={`nav-${ch.id}`}
                onClick={() => { onNavigate(ch.id); setExpanded(false); }}
                style={{
                  width: isActive ? 10 : 7,
                  height: isActive ? 10 : 7,
                  borderRadius: '50%',
                  background: isActive ? '#0284c7' : isPast ? '#93c5fd' : '#cbd5e1',
                  border: isActive ? '2px solid #0369a1' : 'none',
                  boxShadow: isActive ? '0 0 8px rgba(2,132,199,0.5)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  flexShrink: 0,
                }}
                title={`${ch.number} ${ch.label}`}
              />
            </div>
          );
        })}

        {/* Expand/collapse toggle */}
        <button
          id="nav-toggle-btn"
          onClick={() => setExpanded(e => !e)}
          className="rounded-lg px-2 py-1 mt-2 cursor-pointer bg-white/90 border border-slate-200 shadow-xs text-slate-700 hover:text-sky-600 font-bold"
          style={{
            fontSize: '0.65rem',
            letterSpacing: '0.05em',
          }}
        >
          {expanded ? '✕' : '≡'}
        </button>
      </motion.div>

      {/* Top progress bar */}
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

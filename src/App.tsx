import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Hero from './components/Hero/Hero';
import ProblemSection from './components/ProblemSection/ProblemSection';
import ArchitectureSection from './components/ArchitectureSection/ArchitectureSection';
import CrowdManagement from './components/CrowdManagement/CrowdManagement';
import AdaptiveTraffic from './components/TrafficManagement/AdaptiveTraffic';
import SmartParking from './components/SmartParking/SmartParking';
import GreenCorridor from './components/GreenCorridor/GreenCorridor';
import RiverSafety from './components/RiverSafety/RiverSafety';
import MissingPersons from './components/MissingPersons/MissingPersons';
import { GISCommandCenter, CitizenApp } from './components/GISCommandCenter/GISComponents';
import { FinalSection } from './components/FinalSections/FinalSections';
import ChapterNavigation from './components/ChapterNavigation/ChapterNavigation';
import { CHAPTERS } from './data/content';

const SECTION_IDS = CHAPTERS.map(c => c.id);

export default function App() {
  const [started, setStarted] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [autoTour, setAutoTour] = useState(false);

  const activeSectionId = SECTION_IDS[currentSlideIndex] || 'hero';

  const goToNextSlide = useCallback(() => {
    setCurrentSlideIndex(prev => {
      if (prev < SECTION_IDS.length - 1) {
        return prev + 1;
      }
      return prev;
    });
  }, []);

  const goToPrevSlide = useCallback(() => {
    setCurrentSlideIndex(prev => {
      if (prev > 0) {
        return prev - 1;
      }
      return prev;
    });
  }, []);

  const goToSlideById = useCallback((id: string) => {
    const idx = SECTION_IDS.indexOf(id);
    if (idx !== -1) {
      setCurrentSlideIndex(idx);
    }
  }, []);

  // Optional timed auto-presentation (advance every 10s if toggled)
  useEffect(() => {
    if (!started || !autoTour) return;
    const timer = setTimeout(() => {
      goToNextSlide();
    }, 10000);
    return () => clearTimeout(timer);
  }, [started, autoTour, currentSlideIndex, goToNextSlide]);

  const handleStart = useCallback(() => {
    setStarted(true);
    // Auto-advance to slide 2 (Problem section) after the warp animation clears
    setTimeout(() => {
      setCurrentSlideIndex(1);
    }, 400);
  }, []);

  const toggleAutoTour = useCallback(() => {
    setAutoTour(prev => !prev);
  }, []);

  // ── Keyboard Slide Navigation (Spacebar & Arrow Keys) ──
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        if (!started) {
          handleStart();
        } else if (e.shiftKey) {
          goToPrevSlide();
        } else {
          goToNextSlide();
        }
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        if (!started) {
          handleStart();
        } else {
          goToNextSlide();
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        if (started) {
          goToPrevSlide();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [started, handleStart, goToNextSlide, goToPrevSlide]);

  // Slide Component Resolver
  const renderSlideContent = () => {
    switch (activeSectionId) {
      case 'hero':
        return <Hero onStart={handleStart} />;
      case 'problem':
        return <ProblemSection />;
      case 'architecture':
        return <ArchitectureSection />;
      case 'crowd':
        return <CrowdManagement />;
      case 'adaptive':
        return <AdaptiveTraffic />;
      case 'parking':
        return <SmartParking />;
      case 'corridor':
        return <GreenCorridor />;
      case 'river':
        return <RiverSafety />;
      case 'missing':
        return <MissingPersons />;
      case 'gis':
        return <GISCommandCenter />;
      case 'citizen':
        return <CitizenApp />;
      case 'final':
        return <FinalSection />;
      default:
        return <Hero onStart={handleStart} />;
    }
  };

  return (
    <div
      className="h-screen w-screen overflow-hidden relative select-none bg-[#f8fafc] text-slate-900 flex flex-col justify-start sm:justify-center items-center"
      style={{ height: '100dvh' }}
    >
      {/* ── Auto-Tour Status Banner ── */}
      {started && autoTour && (
        <div
          className="fixed top-3 left-3 sm:left-6 z-50 px-3 py-1 rounded-full glass border border-emerald-300 text-emerald-800 text-[10px] sm:text-xs font-mono font-bold flex items-center gap-1.5 shadow-lg backdrop-blur-md animate-pulse max-w-[90vw]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
          <span className="hidden sm:inline">AUTO-SLIDES ACTIVE (10s)</span>
          <span className="sm:hidden">AUTO (10s)</span>
          <button
            onClick={toggleAutoTour}
            className="ml-1 px-1.5 py-0.5 rounded bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-[9px] cursor-pointer"
          >
            Pause
          </button>
        </div>
      )}


      {/* ── Slide Viewport (Animated Transitions + Mobile Smooth Scroll) ── */}
      <div className="w-full h-full flex flex-col justify-start sm:justify-center items-center relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSectionId}
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full flex flex-col justify-start sm:justify-center items-center overflow-y-auto sm:overflow-hidden min-h-0"
          >
            {renderSlideContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Persistent Slide Navigation ── */}
      {started && (
        <ChapterNavigation
          activeSection={activeSectionId}
          onNavigate={goToSlideById}
          onNext={goToNextSlide}
          onPrev={goToPrevSlide}
          canNext={currentSlideIndex < CHAPTERS.length - 1}
          canPrev={currentSlideIndex > 0}
        />
      )}
    </div>
  );
}

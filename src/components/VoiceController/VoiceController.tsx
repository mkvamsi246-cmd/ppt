import { motion } from 'framer-motion';
import type { VoiceState } from '../../hooks/useVoice';

interface VoiceControllerProps {
  voiceState: VoiceState;
  isSupported: boolean;
  isMuted: boolean;
  progress: number;
  currentSection?: string;
  autoScroll?: boolean;
  onPlay: () => void;
  onPause: () => void;
  onResume: () => void;
  onReplay: () => void;
  onToggleMute: () => void;
  onToggleAutoScroll?: () => void;
}

export default function VoiceController({
  voiceState,
  isSupported,
  isMuted,
  progress,
  currentSection: _currentSection,
  autoScroll = false,
  onPlay,
  onPause,
  onResume,
  onReplay,
  onToggleMute,
  onToggleAutoScroll,
}: VoiceControllerProps) {
  if (!isSupported) return null;

  const isPlaying = voiceState === 'playing';
  const isPaused  = voiceState === 'paused';

  const handlePlayPause = () => {
    if (isPlaying) onPause();
    else if (isPaused) onResume();
    else onPlay();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed top-3 left-2 sm:left-6 z-50 select-none"
    >
      <div
        className="glass rounded-full flex items-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-3.5 py-1.5 border border-slate-200 bg-white/95 shadow-md backdrop-blur-md"
      >
        {/* Voice indicator */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <motion.div
            animate={isPlaying ? { scale: [1, 1.3, 1] } : { scale: 1 }}
            transition={{ duration: 0.6, repeat: isPlaying ? Infinity : 0 }}
            className="rounded-full"
            style={{ width: 8, height: 8, background: isPlaying ? '#059669' : isPaused ? '#d97706' : '#94a3b8' }}
          />
          <span className="text-[11px] font-mono font-bold text-slate-800 tracking-wider hidden sm:inline">
            {isMuted ? 'MUTED' : isPlaying ? 'NARRATING' : isPaused ? 'PAUSED' : 'AI VOICE'}
          </span>
        </div>

        {/* Progress bar */}
        <div
          className="w-16 rounded-full overflow-hidden bg-slate-100 hidden sm:block border border-slate-200"
          style={{ height: 4 }}
        >
          <motion.div
            style={{ height: '100%', background: 'linear-gradient(90deg, #0284c7, #2563eb)', borderRadius: 4 }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {/* Replay */}
          <button
            id="voice-replay-btn"
            onClick={onReplay}
            title="Replay slide narration"
            className="p-1 rounded-lg text-slate-600 hover:text-sky-600 cursor-pointer text-xs font-bold transition-all"
          >
            ↺
          </button>

          {/* Play/Pause */}
          <button
            id="voice-playpause-btn"
            onClick={handlePlayPause}
            title={isPlaying ? 'Pause' : 'Play'}
            className="w-6 h-6 rounded-full bg-sky-600 hover:bg-sky-500 text-white cursor-pointer flex items-center justify-center text-[10px] shadow-xs font-bold transition-all"
          >
            {isPlaying ? '⏸' : '▶'}
          </button>

          {/* Mute */}
          <button
            id="voice-mute-btn"
            onClick={onToggleMute}
            title={isMuted ? 'Unmute' : 'Mute'}
            className="p-1 rounded-lg text-slate-600 hover:text-slate-900 cursor-pointer text-xs transition-all"
          >
            {isMuted ? '🔇' : '🔊'}
          </button>

          {/* Auto-Tour Toggle */}
          {onToggleAutoScroll && (
            <button
              id="voice-autoscroll-btn"
              onClick={onToggleAutoScroll}
              title={autoScroll ? 'Disable Auto-Tour' : 'Enable Auto-Tour'}
              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full cursor-pointer flex items-center gap-1 transition-all border ${
                autoScroll
                  ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
            >
              <span>{autoScroll ? '🟢' : '⚪'}</span>
              <span>AUTO</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

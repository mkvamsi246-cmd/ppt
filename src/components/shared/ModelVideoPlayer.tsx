import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface ModelVideoPlayerProps {
  title: string;
  defaultSrc: string;
  modelName: string;
  accuracy: string;
  fps: string;
  description: string;
  color: string;
  sampleVideoName: string;
}

export default function ModelVideoPlayer({
  title,
  defaultSrc,
  modelName,
  accuracy,
  fps,
  description,
  color = '#00d4ff',
  sampleVideoName,
}: ModelVideoPlayerProps) {
  const [videoSrc, setVideoSrc] = useState<string>(defaultSrc);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        setHasError(false);
      }).catch(() => {
        setHasError(true);
      });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      setHasError(false);
      setIsPlaying(true);
      setTimeout(() => {
        videoRef.current?.play();
      }, 200);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className="glass rounded-3xl overflow-hidden border transition-all relative"
      style={{ borderColor: `${color}40`, boxShadow: `0 8px 32px ${color}15` }}
    >
      {/* Header bar */}
      <div className="p-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 bg-white/5">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full animate-ping" style={{ background: color }} />
          <div>
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              {title}
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10" style={{ color }}>
                DEMO VIDEO
              </span>
            </h4>
            <p className="text-xs text-zinc-300 mt-0.5">{description}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            accept="video/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold glass border border-white/20 text-zinc-300 hover:text-white hover:border-white/40 transition-all flex items-center gap-1.5 cursor-pointer"
            title="Load your custom recorded MP4 video"
          >
            <span>📁</span> Load Video File
          </button>
        </div>
      </div>

      {/* Video Viewport */}
      <div className="relative aspect-video bg-black/80 flex items-center justify-center overflow-hidden">
        {/* HUD Grid */}
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none z-10" />

        <video
          ref={videoRef}
          src={videoSrc}
          loop
          muted={isMuted}
          playsInline
          onTimeUpdate={() => {
            if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
          }}
          onLoadedMetadata={() => {
            if (videoRef.current) setDuration(videoRef.current.duration);
            setHasError(false);
          }}
          onError={() => {
            setHasError(true);
            setIsPlaying(false);
          }}
          className="w-full h-full object-contain relative z-0"
        />

        {/* Fallback & Helper when video is not yet placed in public/videos */}
        {hasError && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center bg-black/80 backdrop-blur-sm">
            <div className="text-4xl mb-3">🎬</div>
            <h5 className="text-white font-bold text-base mb-1">Live Model Video Demo Player</h5>
            <p className="text-xs text-zinc-300 max-w-md mb-4">
              Place your demo video in <code className="text-cyan-300 px-1 py-0.5 rounded bg-white/10">public/videos/{sampleVideoName}</code> or click the button below to load your recorded video file directly.
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black cursor-pointer shadow-lg transition-transform hover:scale-105"
              style={{ background: color }}
            >
              Select &amp; Play Your {sampleVideoName}
            </button>
          </div>
        )}

        {/* Live Model Telemetry Overlay */}
        <div className="absolute top-3 left-3 z-20 flex flex-wrap gap-2 pointer-events-none font-mono text-[11px]">
          <span className="px-2 py-1 rounded-lg glass border border-white/10 text-white bg-black/40">
            Model: <strong style={{ color }}>{modelName}</strong>
          </span>
          <span className="px-2 py-1 rounded-lg glass border border-white/10 text-emerald-300 bg-black/40">
            Accuracy: <strong>{accuracy}</strong>
          </span>
          <span className="px-2 py-1 rounded-lg glass border border-white/10 text-amber-300 bg-black/40">
            Inference: <strong>{fps}</strong>
          </span>
        </div>

        {/* Live Watermark Overlay */}
        <div className="absolute top-3 right-3 z-20 font-mono text-[10px] text-cyan-400/80 bg-black/50 px-2 py-1 rounded border border-cyan-500/30 pointer-events-none">
          RAJAHMUNDRY SMART PUSHKARALU 2027 · AI ENGINE
        </div>

        {/* Play/Pause Center Button Overlay */}
        {!isPlaying && !hasError && (
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePlay}
            className="absolute z-20 w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-2xl cursor-pointer"
            style={{
              background: `linear-gradient(135deg, ${color}, #ffffff)`,
              color: '#050d1a',
              boxShadow: `0 0 30px ${color}80`,
            }}
          >
            ▶
          </motion.button>
        )}
      </div>

      {/* Video Control Bar */}
      <div className="p-3 bg-black/60 border-t border-white/10 flex items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            className="w-8 h-8 rounded-full flex items-center justify-center glass border border-white/20 text-white hover:border-cyan-400 cursor-pointer"
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.muted = !isMuted;
                setIsMuted(!isMuted);
              }
            }}
            className="text-zinc-400 hover:text-white cursor-pointer"
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
          <span className="text-zinc-400">
            {formatTime(currentTime)} / {formatTime(duration || 0)}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="flex-1 mx-2 h-1.5 bg-white/10 rounded-full overflow-hidden relative">
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%',
              background: color,
            }}
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-zinc-400 hidden sm:inline">LOOP ACTIVE</span>
          <button
            onClick={() => videoRef.current?.requestFullscreen()}
            className="text-zinc-400 hover:text-white cursor-pointer"
            title="Fullscreen"
          >
            ⛶
          </button>
        </div>
      </div>
    </div>
  );
}

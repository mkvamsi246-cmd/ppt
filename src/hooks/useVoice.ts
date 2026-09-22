import { useEffect, useRef, useCallback, useState } from 'react';
import { VOICE_SCRIPTS } from '../data/content';

export type VoiceState = 'idle' | 'playing' | 'paused';

interface UseVoiceReturn {
  voiceState: VoiceState;
  isSupported: boolean;
  isMuted: boolean;
  currentSection: string;
  play: (sectionId: string) => void;
  pause: () => void;
  resume: () => void;
  replay: () => void;
  mute: () => void;
  unmute: () => void;
  toggleMute: () => void;
  setSection: (sectionId: string) => void;
  progress: number; // 0-1
}

export function useVoice(onSectionEnd?: (sectionId: string) => void): UseVoiceReturn {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const onSectionEndRef = useRef(onSectionEnd);
  onSectionEndRef.current = onSectionEnd;

  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [isSupported] = useState(() => 'speechSynthesis' in window);
  const [isMuted, setIsMuted] = useState(false);
  const [currentSection, setCurrentSection] = useState('hero');
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<number>(0);
  const totalCharsRef = useRef<number>(0);
  const spokenCharsRef = useRef<number>(0);
  const isMutedRef = useRef(false);

  isMutedRef.current = isMuted;

  const stopCurrent = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setVoiceState('idle');
    setProgress(0);
    progressRef.current = 0;
  }, []);

  const play = useCallback((sectionId: string) => {
    if (!isSupported || isMutedRef.current) return;
    
    stopCurrent();
    setCurrentSection(sectionId);

    const script = VOICE_SCRIPTS[sectionId];
    if (!script) return;

    const utterance = new SpeechSynthesisUtterance(script);
    utteranceRef.current = utterance;
    
    totalCharsRef.current = script.length;
    spokenCharsRef.current = 0;

    // Try to find a good English male voice
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(v =>
      (v.name.includes('Google UK English Male') ||
       v.name.includes('Microsoft David') ||
       v.name.includes('David') ||
       v.name.includes('Male')) && v.lang.startsWith('en')
    ) || voices.find(v => v.lang.startsWith('en'));
    
    if (preferred) utterance.voice = preferred;

    utterance.rate = 0.9;
    utterance.pitch = 0.95;
    utterance.volume = 1;
    utterance.lang = 'en-US';

    utterance.onstart = () => setVoiceState('playing');
    utterance.onend = () => {
      setVoiceState('idle');
      setProgress(1);
      if (onSectionEndRef.current) {
        onSectionEndRef.current(sectionId);
      }
    };
    utterance.onerror = () => setVoiceState('idle');
    utterance.onboundary = (e) => {
      if (e.name === 'word') {
        spokenCharsRef.current = e.charIndex;
        const p = totalCharsRef.current > 0
          ? Math.min(e.charIndex / totalCharsRef.current, 1)
          : 0;
        setProgress(p);
        progressRef.current = p;
      }
    };

    window.speechSynthesis.speak(utterance);
    setVoiceState('playing');
  }, [isSupported, stopCurrent]);

  const pause = useCallback(() => {
    if ('speechSynthesis' in window && voiceState === 'playing') {
      window.speechSynthesis.pause();
      setVoiceState('paused');
    }
  }, [voiceState]);

  const resume = useCallback(() => {
    if ('speechSynthesis' in window && voiceState === 'paused') {
      window.speechSynthesis.resume();
      setVoiceState('playing');
    }
  }, [voiceState]);

  const replay = useCallback(() => {
    play(currentSection);
  }, [play, currentSection]);

  const mute = useCallback(() => {
    setIsMuted(true);
    stopCurrent();
  }, [stopCurrent]);

  const unmute = useCallback(() => {
    setIsMuted(false);
  }, []);

  const toggleMute = useCallback(() => {
    if (isMuted) unmute();
    else mute();
  }, [isMuted, mute, unmute]);

  const setSection = useCallback((sectionId: string) => {
    setCurrentSection(sectionId);
  }, []);

  // Load voices async (some browsers load them late)
  useEffect(() => {
    if (!isSupported) return;
    const handleVoicesChanged = () => {};
    window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
    return () => {
      window.speechSynthesis.cancel();
    };
  }, [isSupported]);

  return {
    voiceState,
    isSupported,
    isMuted,
    currentSection,
    play,
    pause,
    resume,
    replay,
    mute,
    unmute,
    toggleMute,
    setSection,
    progress,
  };
}

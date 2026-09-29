import React, { useState, useRef, useEffect } from 'react';
import { CompositeKeyVisual } from './fallbacks/CompositeKeyVisual';
import { PartialDependencyVisual } from './fallbacks/PartialDependencyVisual';
import { TwoNFVisual } from './fallbacks/TwoNFVisual';
import { TwoNFSimpleVisual } from './fallbacks/TwoNFSimpleVisual';
import { TwoNFExampleVisual } from './fallbacks/TwoNFExampleVisual';
import { Play, Pause, Bookmark } from 'lucide-react';

interface ReelMediaProps {
  conceptId: string;
  mediaFile: string;
  isActive: boolean;
  isDayMode?: boolean;
  onTogglePlay?: (isPlaying: boolean) => void;
  onDoubleTap?: () => void;
}

export const ReelMedia: React.FC<ReelMediaProps> = ({
  conceptId,
  mediaFile,
  isActive,
  isDayMode = false,
  onTogglePlay,
  onDoubleTap,
}) => {
  const [hasVideoError, setHasVideoError] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [showPlayIcon, setShowPlayIcon] = useState<boolean>(false);
  const [showDoubleTapBurst, setShowDoubleTapBurst] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [elapsedSecs, setElapsedSecs] = useState<number>(0);
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const lastTapTimeRef = useRef<number>(0);
  const playIconTimerRef = useRef<NodeJS.Timeout | null>(null);
  const doubleTapTimerRef = useRef<NodeJS.Timeout | null>(null);

  const TOTAL_DURATION = 15; // 15-second educational reel loop

  // Simulated or real video playback timeline progress ticker
  useEffect(() => {
    if (!isActive || !isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setElapsedSecs(0);
          return 0;
        }
        const next = prev + (100 / (TOTAL_DURATION * 10));
        setElapsedSecs(Math.min(TOTAL_DURATION, Math.floor((next / 100) * TOTAL_DURATION)));
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isActive, isPlaying]);

  // Reset video error state if mediaFile changes
  useEffect(() => {
    setHasVideoError(false);
    setProgress(0);
    setElapsedSecs(0);
  }, [mediaFile, conceptId]);

  // Handle active / inactive play state
  useEffect(() => {
    if (!videoRef.current || hasVideoError) return;

    if (isActive && isPlaying) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Auto-play was prevented or file not loadable
        });
      }
    } else {
      videoRef.current.pause();
    }
  }, [isActive, isPlaying, hasVideoError]);

  const handleTap = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;

    if (now - lastTapTimeRef.current < DOUBLE_TAP_DELAY) {
      // Double tap triggered
      if (doubleTapTimerRef.current) clearTimeout(doubleTapTimerRef.current);
      setShowDoubleTapBurst(true);
      onDoubleTap?.();
      doubleTapTimerRef.current = setTimeout(() => {
        setShowDoubleTapBurst(false);
      }, 900);
      lastTapTimeRef.current = 0;
      return;
    }

    lastTapTimeRef.current = now;

    // Single tap play/pause toggle
    if (videoRef.current && !hasVideoError) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
        onTogglePlay?.(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
        onTogglePlay?.(false);
      }
    } else {
      // Toggle simulated play state
      setIsPlaying((prev) => {
        const next = !prev;
        onTogglePlay?.(next);
        return next;
      });
    }

    // Flash play/pause indicator in the center
    setShowPlayIcon(true);
    if (playIconTimerRef.current) clearTimeout(playIconTimerRef.current);
    playIconTimerRef.current = setTimeout(() => {
      setShowPlayIcon(false);
    }, 650);
  };

  const renderFallback = () => {
    switch (conceptId) {
      case 'composite-key':
        return <CompositeKeyVisual isActive={isActive && isPlaying} isDayMode={isDayMode} />;
      case 'partial-dependency':
        return <PartialDependencyVisual isActive={isActive && isPlaying} isDayMode={isDayMode} />;
      case '2nf':
        return <TwoNFVisual isActive={isActive && isPlaying} isDayMode={isDayMode} />;
      case '2nf-simple':
        return <TwoNFSimpleVisual isActive={isActive && isPlaying} isDayMode={isDayMode} />;
      case '2nf-example':
        return <TwoNFExampleVisual isActive={isActive && isPlaying} isDayMode={isDayMode} />;
      default:
        return <CompositeKeyVisual isActive={isActive && isPlaying} isDayMode={isDayMode} />;
    }
  };

  const formatTimer = (s: number) => {
    const secs = s < 10 ? `0${s}` : `${s}`;
    return `00:${secs}`;
  };

  return (
    <div 
      className="relative w-full h-full overflow-hidden select-none cursor-pointer bg-[#0A100D] transition-colors duration-500"
      onClick={handleTap}
    >
      {/* 1. Real MP4 Video if available */}
      {!hasVideoError && (
        <video
          ref={videoRef}
          src={mediaFile}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          onError={() => setHasVideoError(true)}
        />
      )}

      {/* 2. AUTHENTIC VIDEO CANVAS FRAME (Reel Viewport & Stage) */}
      <div className="absolute inset-0 w-full h-full z-0 flex items-center justify-center">
        {/* Cinematic frame background & subtle grid */}
        <div className="w-full h-full relative overflow-hidden flex flex-col items-center justify-center">
          {renderFallback()}
        </div>
      </div>

      {/* 3. CINEMATIC VIDEO FRAME OVERLAYS (Viewfinder Corner Markers) */}
      <div className="absolute top-14 left-3 w-3 h-3 border-t-2 border-l-2 border-white/30 rounded-tl pointer-events-none z-20" />
      <div className="absolute top-14 right-3 w-3 h-3 border-t-2 border-r-2 border-white/30 rounded-tr pointer-events-none z-20" />
      <div className="absolute bottom-16 left-3 w-3 h-3 border-b-2 border-l-2 border-white/30 rounded-bl pointer-events-none z-20" />
      <div className="absolute bottom-16 right-3 w-3 h-3 border-b-2 border-r-2 border-white/30 rounded-br pointer-events-none z-20" />

      {/* 4. VIDEO HUD BAR (Recording badge, timestamp, audio waveform) */}
      <div className="absolute top-14 left-4 right-4 z-20 flex items-center justify-between pointer-events-none" dir="ltr">
        {/* Left: Live REC badge & elapsed timer */}
        <div className="flex items-center gap-1.5">
          <div className="px-2 py-0.5 rounded-full bg-black/45 backdrop-blur-md border border-white/10 text-[10px] font-mono font-bold text-white flex items-center gap-1.5 shadow-sm">
            <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-red-500 animate-pulse' : 'bg-white/40'}`} />
            <span>{isPlaying ? 'REC' : 'PAUSED'}</span>
          </div>

          <div className="px-2 py-0.5 rounded-full bg-black/45 backdrop-blur-md border border-white/10 text-[10px] font-mono font-semibold text-white/90 shadow-sm">
            {formatTimer(elapsedSecs)} / {formatTimer(TOTAL_DURATION)}
          </div>
        </div>

        {/* Right: Audio Waveform Equalizer & 1080p Badge */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5 px-2 py-1 rounded-full bg-black/45 backdrop-blur-md border border-white/10 shadow-sm">
            <div className={`w-0.5 bg-emerald-400 rounded-full transition-all duration-150 ${isPlaying ? 'h-2.5 animate-pulse' : 'h-1'}`} />
            <div className={`w-0.5 bg-emerald-400 rounded-full transition-all duration-150 ${isPlaying ? 'h-3.5' : 'h-1.5'}`} />
            <div className={`w-0.5 bg-emerald-400 rounded-full transition-all duration-150 ${isPlaying ? 'h-2' : 'h-1'}`} />
            <div className={`w-0.5 bg-emerald-400 rounded-full transition-all duration-150 ${isPlaying ? 'h-3' : 'h-1.5'}`} />
            <span className="text-[9px] font-mono font-bold text-white/80 ml-1">1080p</span>
          </div>
        </div>
      </div>

      {/* 5. PAUSE BADGE INDICATOR WHEN STOPPED */}
      {!isPlaying && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none bg-black/35 backdrop-blur-[2px] transition-all">
          <div className="w-16 h-16 rounded-full bg-black/70 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white shadow-2xl mb-2">
            <Play className="w-7 h-7 fill-white ml-0.5" />
          </div>
          <span className="text-xs font-semibold text-white/90 px-3 py-1 rounded-full bg-black/60 border border-white/15 backdrop-blur-md">
            موقّف مؤقتاً • اضغط للمتابعة
          </span>
        </div>
      )}

      {/* 6. CENTER TAP PLAY/PAUSE FLASH POP ANIMATION */}
      {showPlayIcon && (
        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none animate-in zoom-in-75 fade-in duration-150">
          <div className="w-18 h-18 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 flex items-center justify-center text-[#F1EDE5] shadow-2xl">
            {isPlaying ? (
              <Play className="w-8 h-8 fill-[#F1EDE5] ml-1" />
            ) : (
              <Pause className="w-8 h-8 fill-[#F1EDE5]" />
            )}
          </div>
        </div>
      )}

      {/* 7. DOUBLE-TAP BOOKMARK BURST EFFECT */}
      {showDoubleTapBurst && (
        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none animate-in zoom-in-50 fade-in duration-200">
          <div className="w-20 h-20 rounded-full bg-[#FACE15]/90 backdrop-blur-xl flex items-center justify-center text-[#0E100F] shadow-[0_0_35px_rgba(250,206,21,0.6)]">
            <Bookmark className="w-10 h-10 fill-[#0E100F] stroke-[#0E100F]" />
          </div>
        </div>
      )}

      {/* 8. TIKTOK / REELS VIDEO TIMELINE SCRUBBER BAR */}
      <div className="absolute bottom-0 inset-x-0 h-[3px] bg-white/20 z-40 pointer-events-none">
        <div
          className="h-full bg-white transition-all duration-100 ease-linear shadow-[0_0_8px_rgba(255,255,255,0.9)]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

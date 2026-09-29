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
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const lastTapTimeRef = useRef<number>(0);
  const playIconTimerRef = useRef<NodeJS.Timeout | null>(null);
  const doubleTapTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Only real media reports playback progress. The concept animation has no fake duration.
  useEffect(() => {
    setHasVideoError(false);
    setProgress(0);
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

  const showFallback = !mediaFile || hasVideoError;

  return (
    <div className="relative w-full h-full overflow-hidden select-none bg-[#0A100D]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#263c2e_0%,#0e1711_48%,#090e0b_100%)]" />

      {/* The same portrait viewport contains either the supplied video or its concept animation. */}
      <div
        className="absolute inset-x-3 top-[78px] bottom-[150px] overflow-hidden rounded-[24px] bg-[#101a14] cursor-pointer shadow-[0_24px_65px_rgba(0,0,0,0.48)]"
        onClick={handleTap}
      >
        {!showFallback && (
          <video
            ref={videoRef}
            src={mediaFile}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            onTimeUpdate={(event) => {
              const video = event.currentTarget;
              if (Number.isFinite(video.duration) && video.duration > 0) {
                setProgress((video.currentTime / video.duration) * 100);
              }
            }}
            onError={() => setHasVideoError(true)}
          />
        )}
        {showFallback && <div className="absolute inset-0">{renderFallback()}</div>}

        {!showFallback && (
          <div className="absolute bottom-0 inset-x-0 h-[2px] bg-white/25 pointer-events-none">
            <div className="h-full bg-[#F1EEE7]" style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>

      {/* Pause indicator stays inside the clip rather than covering the whole feed. */}
      {!isPlaying && (
        <div className="absolute inset-x-3 top-[78px] bottom-[150px] z-30 flex flex-col items-center justify-center pointer-events-none rounded-[24px] bg-black/35 backdrop-blur-[2px]">
          <div className="w-16 h-16 rounded-full bg-black/70 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white shadow-2xl mb-2">
            <Play className="w-7 h-7 fill-white ml-0.5" />
          </div>
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

    </div>
  );
};

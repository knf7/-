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
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const lastTapTimeRef = useRef<number>(0);
  const playIconTimerRef = useRef<NodeJS.Timeout | null>(null);
  const doubleTapTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset video error state if mediaFile changes
  useEffect(() => {
    setHasVideoError(false);
  }, [mediaFile]);

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
      setIsPlaying((prev) => !prev);
    }

    // Flash play/pause indicator in the center
    setShowPlayIcon(true);
    if (playIconTimerRef.current) clearTimeout(playIconTimerRef.current);
    playIconTimerRef.current = setTimeout(() => {
      setShowPlayIcon(false);
    }, 600);
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

  return (
    <div 
      className={`relative w-full h-full overflow-hidden select-none cursor-pointer transition-colors duration-500 ${
        isDayMode 
          ? 'bg-gradient-to-b from-[#EBF2EC] via-[#DFECE3] to-[#D5E4DA]' 
          : 'bg-[#0E100F]'
      }`}
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

      {/* 2. High-End Editorial Motion Graphics Fallback with Elevated Content Stage */}
      {hasVideoError && (
        <div className="absolute inset-0 w-full h-full z-0 flex items-center justify-center">
          {renderFallback()}
        </div>
      )}

      {/* 3. Center Reels Tap-to-Play/Pause Pop Animation */}
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

      {/* 4. Double-Tap Bookmark Floating Burst Effect */}
      {showDoubleTapBurst && (
        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none animate-in zoom-in-50 fade-in duration-200">
          <div className="w-20 h-20 rounded-full bg-[#FAF6EF]/90 backdrop-blur-xl flex items-center justify-center text-[#0E100F] shadow-[0_0_35px_rgba(250,246,239,0.5)]">
            <Bookmark className="w-10 h-10 fill-[#0E100F] stroke-[#0E100F]" />
          </div>
        </div>
      )}
    </div>
  );
};

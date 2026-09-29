import React, { useEffect, useRef, useState } from 'react';
import { Concept } from '../types';
import { ReelMedia } from './ReelMedia';
import { ReelActions } from './ReelActions';
import { Music, CheckCircle2, Heart } from 'lucide-react';

interface ReelProps {
  concept: Concept;
  isActive: boolean;
  isSaved: boolean;
  isDayMode?: boolean;
  onMarkSeen: (conceptId: string) => void;
  onToggleSave: (conceptId: string) => void;
  onOpenAsk: (concept: Concept) => void;
  onOpenSource: (concept: Concept) => void;
  onOpenMore: (concept: Concept) => void;
}

export const Reel: React.FC<ReelProps> = ({
  concept,
  isActive,
  isSaved,
  isDayMode = false,
  onMarkSeen,
  onToggleSave,
  onOpenAsk,
  onOpenSource,
  onOpenMore,
}) => {
  const seenTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [showHeartAnimation, setShowHeartAnimation] = useState<boolean>(false);

  // Active viewing 1.2s rule for seen tracking
  useEffect(() => {
    if (isActive && !concept.seen) {
      seenTimerRef.current = setTimeout(() => {
        onMarkSeen(concept.id);
      }, 1200);
    } else {
      if (seenTimerRef.current) {
        clearTimeout(seenTimerRef.current);
        seenTimerRef.current = null;
      }
    }

    return () => {
      if (seenTimerRef.current) {
        clearTimeout(seenTimerRef.current);
      }
    };
  }, [isActive, concept.id, concept.seen, onMarkSeen]);

  const handleDoubleTap = () => {
    onToggleSave(concept.id);
    setShowHeartAnimation(true);
    setTimeout(() => setShowHeartAnimation(false), 800);
  };

  return (
    <div className={`relative w-full h-full overflow-hidden select-none transition-colors duration-500 ${
      isDayMode ? 'bg-[#F2F6F3]' : 'bg-[#0E100F]'
    }`}>
      {/* 1. IMMERSIVE MEDIA (Interactive fallback stage or real video) */}
      <div className="absolute inset-0 w-full h-full z-0">
        <ReelMedia
          conceptId={concept.id}
          mediaFile={concept.mediaFile}
          isActive={isActive}
          isDayMode={isDayMode}
          onDoubleTap={handleDoubleTap}
        />
      </div>

      {/* Floating Center Heart Pop on Double Tap */}
      {showHeartAnimation && (
        <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none animate-in zoom-in-50 fade-in duration-300">
          <Heart className="w-24 h-24 fill-[#EF4444] text-[#EF4444] drop-shadow-[0_4px_24px_rgba(239,68,68,0.7)] animate-bounce" />
        </div>
      )}

      {/* 2. TOP GRADIENT SCRIM (For Status Bar & Tabs) */}
      <div className={`absolute top-0 inset-x-0 h-28 pointer-events-none z-10 transition-colors duration-500 ${
        isDayMode 
          ? 'bg-gradient-to-b from-[#F2F6F3]/85 via-[#F2F6F3]/30 to-transparent' 
          : 'bg-gradient-to-b from-black/75 via-black/30 to-transparent'
      }`} />

      {/* 3. BOTTOM GRADIENT SCRIM (Authentic TikTok / Reels Caption Scrim) */}
      <div className={`absolute bottom-0 inset-x-0 h-80 pointer-events-none z-10 transition-colors duration-500 ${
        isDayMode 
          ? 'bg-gradient-to-t from-[#E2EBE4]/95 via-[#E2EBE4]/60 to-transparent' 
          : 'bg-gradient-to-t from-black/90 via-black/50 to-transparent'
      }`} />

      {/* A quiet outline keeps the portrait clip distinct from the feed chrome. */}
      <div className="absolute inset-x-3 top-[78px] bottom-[150px] z-20 pointer-events-none rounded-[24px] border border-[#DDE8DB]/35 ring-1 ring-black/25 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]" />

      {/* 4. VERTICAL ACTION RAIL ON THE RIGHT (نفس أزرار الإنستا والتيكتوك) */}
      <div className="absolute bottom-[72px] right-3 z-30 flex flex-col items-center">
        <ReelActions
          courseCode="IS"
          isSaved={isSaved}
          isDayMode={isDayMode}
          onToggleSave={() => onToggleSave(concept.id)}
          onOpenAsk={() => onOpenAsk(concept)}
          onOpenSource={() => onOpenSource(concept)}
          onOpenMore={() => onOpenMore(concept)}
        />
      </div>

      {/* 5. TIKTOK / REELS NATIVE CAPTION OVERLAY (Overlaid directly at bottom) */}
      <div className="absolute bottom-[68px] right-16 left-4 z-20 pointer-events-auto pr-1" dir="rtl">
        {/* Creator / Course Handle + Follow Button */}
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          <div className="flex items-center gap-1.5">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px] font-mono border ${
              isDayMode 
                ? 'bg-[#183626] text-white border-white/80' 
                : 'bg-white text-black border-white/40'
            }`}>
              IS
            </div>

            <span className={`text-[14px] font-bold tracking-tight drop-shadow-sm ${
              isDayMode ? 'text-[#0E2116]' : 'text-white'
            }`}>
              قواعد البيانات · IS-321
            </span>

            <CheckCircle2 className={`w-3.5 h-3.5 ${
              isDayMode ? 'text-[#1E4D34]' : 'text-emerald-400'
            }`} />
          </div>

          {/* Follow Button like TikTok */}
          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-all active:scale-90 cursor-pointer border ${
              isFollowing
                ? isDayMode 
                  ? 'bg-transparent border-[#8EA696] text-[#2F523E]' 
                  : 'bg-transparent border-white/40 text-white/80'
                : isDayMode
                  ? 'bg-[#183626] border-transparent text-white shadow-xs'
                  : 'bg-white border-transparent text-black'
            }`}
          >
            {isFollowing ? 'تتابعها' : '+ متابعة'}
          </button>
        </div>

        {/* Reel Headline */}
        <h2 className={`text-[16px] sm:text-[18px] font-bold leading-snug mb-1 drop-shadow-md tracking-tight ${
          isDayMode ? 'text-[#0A1A10]' : 'text-white'
        }`}>
          {concept.title}
        </h2>

        {/* Reel Short Explanation / Caption with Expandable Toggle */}
        <div className="relative">
          <p className={`text-[12px] sm:text-[13px] leading-relaxed drop-shadow-sm font-normal max-w-md ${
            isExpanded ? '' : 'line-clamp-2'
          } ${isDayMode ? 'text-[#1A3323]' : 'text-white/90'}`}>
            {concept.shortExplanation}
          </p>
          {concept.shortExplanation && concept.shortExplanation.length > 70 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`text-[11px] font-bold mt-0.5 underline cursor-pointer ${
                isDayMode ? 'text-[#163623]' : 'text-white/80'
              }`}
            >
              {isExpanded ? 'عرض أقل' : '...عرض المزيد'}
            </button>
          )}
        </div>

        {/* TikTok / Reels Sound / Code Ticker Pill */}
        <div className="mt-2 flex items-center" dir="ltr">
          <div className={`inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[11px] font-mono backdrop-blur-xl border shadow-xs ${
            isDayMode 
              ? 'bg-white/80 border-white/95 text-[#142E1F]' 
              : 'bg-black/40 border-white/20 text-white'
          }`}>
            <Music className="w-3 h-3 text-emerald-500 animate-pulse" />
            <span className="truncate max-w-[190px] font-medium">
              {concept.example || 'Original Lecture Concept · IS-321'}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};

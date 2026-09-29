import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Concept } from '../types';
import { Reel } from './Reel';
import { StatusBar } from './StatusBar';
import { ChevronUp, ChevronDown, Sun, Moon, Sparkles } from 'lucide-react';

interface FeedProps {
  concepts: Concept[];
  activeReelIndex: number;
  setActiveReelIndex: (index: number) => void;
  savedConceptIds: string[];
  isDayMode?: boolean;
  onToggleDayMode?: () => void;
  onMarkSeen: (conceptId: string) => void;
  onToggleSave: (conceptId: string) => void;
  onOpenAsk: (concept: Concept) => void;
  onOpenSource: (concept: Concept) => void;
  onOpenMore: (concept: Concept) => void;
  onOpenCustomizeInterests?: () => void;
}

export const Feed: React.FC<FeedProps> = ({
  concepts,
  activeReelIndex,
  setActiveReelIndex,
  savedConceptIds,
  isDayMode = false,
  onToggleDayMode,
  onMarkSeen,
  onToggleSave,
  onOpenAsk,
  onOpenSource,
  onOpenMore,
  onOpenCustomizeInterests,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [feedMode, setFeedMode] = useState<'forYou' | 'following'>('forYou');
  const touchStartY = useRef<number | null>(null);

  const scrollToReel = useCallback((index: number) => {
    if (!containerRef.current) return;
    const items = containerRef.current.querySelectorAll('.reel-item');
    if (items[index]) {
      items[index].scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Ensure container is scrolled to activeReelIndex on mount or external tab switch
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToReel(activeReelIndex);
    }, 50);
    return () => clearTimeout(timer);
  }, [activeReelIndex, scrollToReel]);

  // Handle intersection observer to reliably detect which reel is in view
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll('.reel-item');
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
            const index = Number(entry.target.getAttribute('data-index'));
            if (!isNaN(index) && index !== activeReelIndex) {
              setActiveReelIndex(index);
            }
          }
        });
      },
      {
        root: container,
        threshold: 0.55,
      }
    );

    items.forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
    };
  }, [concepts, activeReelIndex, setActiveReelIndex]);

  // Keyboard navigation for desktop: ArrowDown, ArrowUp
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = Math.min(activeReelIndex + 1, concepts.length - 1);
        scrollToReel(next);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = Math.max(activeReelIndex - 1, 0);
        scrollToReel(prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeReelIndex, concepts.length, scrollToReel]);

  // Touch swipe fallback for mobile touch devices
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const diff = touchStartY.current - e.changedTouches[0].clientY;

    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        // Swiped up -> next reel
        const next = Math.min(activeReelIndex + 1, concepts.length - 1);
        scrollToReel(next);
      } else {
        // Swiped down -> previous reel
        const prev = Math.max(activeReelIndex - 1, 0);
        scrollToReel(prev);
      }
    }
    touchStartY.current = null;
  };

  return (
    <div 
      className={`relative w-full h-full overflow-hidden select-none transition-colors duration-500 ${
        isDayMode ? 'bg-[#F2F6F3]' : 'bg-[#0E100F]'
      }`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Subtle organic undulating olive waves in Day mode */}
      {isDayMode && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute -top-16 -left-16 w-80 h-80 rounded-full bg-[#527962]/20 blur-3xl animate-pulse" />
          <div className="absolute top-1/3 -right-20 w-96 h-96 rounded-full bg-[#3A5D48]/15 blur-3xl" />
          <div className="absolute bottom-20 -left-10 w-72 h-72 rounded-full bg-[#719580]/20 blur-3xl" />
          
          <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 400 800" preserveAspectRatio="none">
            <path d="M0,220 C120,290 270,160 400,240 L400,0 L0,0 Z" fill="url(#oliveWave1)" />
            <path d="M0,520 C150,440 260,570 400,500 L400,800 L0,800 Z" fill="url(#oliveWave2)" />
            <defs>
              <linearGradient id="oliveWave1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#4F745D" stopOpacity="0.4"/>
                <stop offset="100%" stopColor="#91B09E" stopOpacity="0.08"/>
              </linearGradient>
              <linearGradient id="oliveWave2" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#31513E" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#6E937D" stopOpacity="0.06"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}

      {/* 1. TOP STATUS BAR (Integrated into Mobile Viewport) */}
      <div className="absolute top-0 inset-x-0 z-40 pointer-events-none">
        <StatusBar isDayMode={isDayMode} />
      </div>

      {/* 2. AUTHENTIC TIKTOK / INSTAGRAM REELS TOP BAR - CLEAN & UNCLUTTERED */}
      <header className="absolute top-10 inset-x-0 z-40 px-4 pt-1 flex items-center justify-between pointer-events-none select-none">
        {/* Left button: Customize Interests or placeholder */}
        {onOpenCustomizeInterests ? (
          <button
            onClick={onOpenCustomizeInterests}
            className={`w-8 h-8 rounded-full flex items-center justify-center active:scale-90 transition-all cursor-pointer pointer-events-auto ${
              isDayMode 
                ? 'text-[#1B3E2A] hover:bg-black/5' 
                : 'text-white/85 hover:bg-white/10'
            }`}
            title="تخصيص المواد والاهتمامات"
            aria-label="تخصيص المواد"
          >
            <Sparkles className="w-4 h-4 text-emerald-500" />
          </button>
        ) : (
          <div className="w-8 h-8 pointer-events-none" />
        )}

        {/* Center: Pure Typographic Reels Switcher (متابعة | لك) - Just like TikTok */}
        <div className="pointer-events-auto flex items-center gap-4">
          <button
            onClick={() => setFeedMode('following')}
            className={`text-[16px] transition-all relative pb-1 cursor-pointer font-sans ${
              feedMode === 'following'
                ? (isDayMode ? 'font-bold text-[#0E2416]' : 'font-bold text-white')
                : (isDayMode ? 'font-medium text-[#648070] hover:text-[#183624]' : 'font-medium text-white/60 hover:text-white/85')
            }`}
          >
            متابعة
            {feedMode === 'following' && (
              <span className={`absolute bottom-0 inset-x-1 h-[2px] rounded-full ${
                isDayMode ? 'bg-[#143320]' : 'bg-white'
              }`} />
            )}
          </button>

          <span className={`text-xs opacity-30 select-none ${isDayMode ? 'text-[#143320]' : 'text-white'}`}>|</span>

          <button
            onClick={() => setFeedMode('forYou')}
            className={`text-[16px] transition-all relative pb-1 cursor-pointer font-sans ${
              feedMode === 'forYou'
                ? (isDayMode ? 'font-bold text-[#0E2416]' : 'font-bold text-white')
                : (isDayMode ? 'font-medium text-[#648070] hover:text-[#183624]' : 'font-medium text-white/60 hover:text-white/85')
            }`}
          >
            لك
            {feedMode === 'forYou' && (
              <span className={`absolute bottom-0 inset-x-1 h-[2px] rounded-full ${
                isDayMode ? 'bg-[#143320]' : 'bg-white'
              }`} />
            )}
          </button>
        </div>

        {/* Right: Single Minimal Day/Night Toggle Icon (Unobtrusive) */}
        <div className="pointer-events-auto">
          {onToggleDayMode && (
            <button
              onClick={onToggleDayMode}
              className={`w-8 h-8 rounded-full flex items-center justify-center active:scale-90 transition-all cursor-pointer ${
                isDayMode 
                  ? 'text-[#1B3E2A] hover:bg-black/5' 
                  : 'text-white/85 hover:bg-white/10'
              }`}
              title={isDayMode ? 'التبديل إلى الوضع الليلي' : 'التبديل إلى الوضع النهاري'}
              aria-label="تبديل الوضع"
            >
              {isDayMode ? (
                <Sun className="w-4 h-4 text-[#2E7448]" />
              ) : (
                <Moon className="w-4 h-4 text-[#F1EDE5]" />
              )}
            </button>
          )}
        </div>
      </header>

      {/* 3. DESKTOP HELPER CHEVRONS (Subtle, Floating on Left Edge) */}
      <div className="hidden md:flex flex-col gap-2 absolute left-4 top-1/2 -translate-y-1/2 z-30 opacity-40 hover:opacity-100 transition-opacity">
        <button
          onClick={() => scrollToReel(Math.max(activeReelIndex - 1, 0))}
          disabled={activeReelIndex === 0}
          className={`w-9 h-9 rounded-full backdrop-blur-md disabled:opacity-20 flex items-center justify-center transition-colors cursor-pointer ${
            isDayMode 
              ? 'bg-white/80 border border-white/90 text-[#14281D] hover:bg-white' 
              : 'bg-black/50 border border-white/15 text-[#F1EDE5] hover:bg-black/70'
          }`}
          aria-label="السابق"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
        <button
          onClick={() => scrollToReel(Math.min(activeReelIndex + 1, concepts.length - 1))}
          disabled={activeReelIndex === concepts.length - 1}
          className={`w-9 h-9 rounded-full backdrop-blur-md disabled:opacity-20 flex items-center justify-center transition-colors cursor-pointer ${
            isDayMode 
              ? 'bg-white/80 border border-white/90 text-[#14281D] hover:bg-white' 
              : 'bg-black/50 border border-white/15 text-[#F1EDE5] hover:bg-black/70'
          }`}
          aria-label="التالي"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* 4. MAIN REELS SCROLL CONTAINER */}
      <main 
        ref={containerRef}
        role="feed"
        aria-label="خلاصة مقاطع المفاهيم التعليمية"
        className="w-full h-full overflow-y-scroll reel-container no-scrollbar relative z-10"
      >
        {concepts.map((concept, index) => (
          <article 
            key={concept.id}
            data-index={index}
            className="w-full h-full reel-item relative"
            aria-label={`مفهوم: ${concept.title}`}
          >
            <Reel
              concept={concept}
              isActive={index === activeReelIndex}
              isSaved={savedConceptIds.includes(concept.id)}
              isDayMode={isDayMode}
              onMarkSeen={onMarkSeen}
              onToggleSave={onToggleSave}
              onOpenAsk={onOpenAsk}
              onOpenSource={onOpenSource}
              onOpenMore={onOpenMore}
            />
          </article>
        ))}
      </main>
    </div>
  );
};

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Concept } from '../types';
import { Reel } from './Reel';
import { StatusBar } from './StatusBar';

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
  const initialReelIndex = useRef(activeReelIndex);
  const [feedMode, setFeedMode] = useState<'forYou' | 'following'>('forYou');

  const scrollToReel = useCallback((index: number) => {
    if (!containerRef.current) return;
    const items = containerRef.current.querySelectorAll('.reel-item');
    if (items[index]) {
      items[index].scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Restore the requested reel when returning from another tab. Native scrolling
  // controls subsequent navigation; re-scrolling after intersection updates jumps clips.
  useEffect(() => {
    const timer = setTimeout(() => scrollToReel(initialReelIndex.current), 50);
    return () => clearTimeout(timer);
  }, [scrollToReel]);

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

  return (
    <div 
      className={`relative w-full h-full overflow-hidden select-none transition-colors duration-500 ${
        isDayMode ? 'bg-[#F2F6F3]' : 'bg-[#0E100F]'
      }`}
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
      <header className="absolute top-10 inset-x-0 z-40 px-6 pt-1 flex items-center justify-center pointer-events-none select-none">
        {/* Center: Pure Typographic Reels Switcher (متابعة | لك) - Exactly like TikTok */}
        <div className="pointer-events-auto flex items-center gap-4">
          <button
            onClick={() => setFeedMode('following')}
            className={`text-[16px] transition-all relative pb-1 cursor-pointer font-sans ${
              feedMode === 'following'
                ? 'font-bold text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]'
                : 'font-medium text-white/65 hover:text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]'
            }`}
          >
            متابعة
            {feedMode === 'following' && (
              <span className="absolute bottom-0 inset-x-1 h-[2px] rounded-full bg-white shadow-sm" />
            )}
          </button>

          <span className="text-xs opacity-40 select-none text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">|</span>

          <button
            onClick={() => setFeedMode('forYou')}
            className={`text-[16px] transition-all relative pb-1 cursor-pointer font-sans ${
              feedMode === 'forYou'
                ? 'font-bold text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]'
                : 'font-medium text-white/65 hover:text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]'
            }`}
          >
            لك
            {feedMode === 'forYou' && (
              <span className="absolute bottom-0 inset-x-1 h-[2px] rounded-full bg-white shadow-sm" />
            )}
          </button>
        </div>
      </header>

      {/* Native vertical scrolling and scroll snap move between reels. */}
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

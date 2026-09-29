import React, { useState } from 'react';
import { Heart, MessageCircle, Bookmark, Send, Music2 } from 'lucide-react';

interface ReelActionsProps {
  courseCode?: string;
  isSaved: boolean;
  isDayMode?: boolean;
  onToggleSave: () => void;
  onOpenAsk: () => void;
  onOpenSource: () => void;
  onOpenMore: () => void;
}

export const ReelActions: React.FC<ReelActionsProps> = ({
  courseCode = 'IS',
  isSaved,
  isDayMode = false,
  onToggleSave,
  onOpenAsk,
  onOpenSource,
  onOpenMore,
}) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(1420);
  const [animateHeart, setAnimateHeart] = useState<boolean>(false);

  const handleToggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLiked) {
      setIsLiked(false);
      setLikeCount((prev) => prev - 1);
    } else {
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
      setAnimateHeart(true);
      setTimeout(() => setAnimateHeart(false), 500);
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  const labelStyle = 'text-[11px] font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] font-mono tracking-tight select-none mt-1';

  return (
    <div className="flex flex-col items-center gap-4 z-30 pointer-events-auto select-none" dir="ltr">
      {/* 1. HEART / LIKE (Exact TikTok Heart Icon - White outline, no circular background) */}
      <button
        onClick={handleToggleLike}
        className="flex flex-col items-center group cursor-pointer focus:outline-none active:scale-80 transition-transform"
        aria-label="إعجاب"
      >
        <Heart
          className={`w-[32px] h-[32px] transition-all duration-300 drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] ${
            isLiked
              ? 'fill-[#FE2C55] text-[#FE2C55] stroke-[#FE2C55] scale-110 drop-shadow-[0_2px_12px_rgba(254,44,85,0.7)]'
              : 'text-white stroke-white stroke-[2.2] fill-transparent hover:scale-105'
          } ${animateHeart ? 'scale-125' : ''}`}
        />
        <span className={labelStyle}>
          {formatNumber(likeCount)}
        </span>
      </button>

      {/* 2. COMMENT / ASK AI (Exact TikTok Message Bubble - Frameless) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onOpenAsk();
        }}
        className="flex flex-col items-center group cursor-pointer focus:outline-none active:scale-80 transition-transform"
        aria-label="اسأل الذكاء الاصطناعي"
      >
        <MessageCircle className="w-[30px] h-[30px] stroke-[2.2] text-white stroke-white fill-transparent drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] hover:scale-105 transition-transform" />
        <span className={labelStyle}>
          اسأل
        </span>
      </button>

      {/* 3. BOOKMARK / SAVE (Exact TikTok Bookmark - Frameless, golden on save) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleSave();
        }}
        className="flex flex-col items-center group cursor-pointer focus:outline-none active:scale-80 transition-transform"
        aria-label="حفظ المفهوم"
      >
        <Bookmark
          className={`w-[30px] h-[30px] transition-all duration-300 drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] ${
            isSaved
              ? 'fill-[#FACE15] text-[#FACE15] stroke-[#FACE15] scale-110 drop-shadow-[0_2px_10px_rgba(250,206,21,0.6)]'
              : 'text-white stroke-white stroke-[2.2] fill-transparent hover:scale-105'
          }`}
        />
        <span className={labelStyle}>
          {isSaved ? 'محفوظ' : 'حفظ'}
        </span>
      </button>

      {/* 4. SHARE (Exact TikTok Share Arrow - Frameless) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onOpenSource();
        }}
        className="flex flex-col items-center group cursor-pointer focus:outline-none active:scale-80 transition-transform"
        aria-label="المصدر والمشاركة"
      >
        <Send className="w-[28px] h-[28px] stroke-[2.2] text-white stroke-white fill-transparent -rotate-45 translate-x-0.5 -translate-y-0.5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] hover:scale-105 transition-transform" />
        <span className={labelStyle}>
          المصدر
        </span>
      </button>

      {/* 5. TIKTOK / REELS SPINNING VINYL RECORD DISC */}
      <div 
        onClick={(e) => {
          e.stopPropagation();
          onOpenMore();
        }}
        className="relative mt-2 cursor-pointer group flex items-center justify-center active:scale-90 transition-transform"
        aria-label="الصوت الأصلي"
      >
        {/* Floating animated musical note */}
        <div className="absolute -top-3.5 -left-2 pointer-events-none opacity-90 animate-bounce">
          <Music2 className="w-3.5 h-3.5 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
        </div>

        {/* Vinyl Disc Outer Rim */}
        <div className="w-10 h-10 rounded-full border-2 border-white/60 p-1 flex items-center justify-center animate-[spin_4s_linear_infinite] shadow-xl bg-[#141816]">
          {/* Vinyl Grooves */}
          <div className="w-full h-full rounded-full border border-dashed border-white/40 flex items-center justify-center overflow-hidden bg-gradient-to-tr from-[#122A1E] to-[#2E6B45]">
            <span className="text-[8px] font-bold text-white font-mono">{courseCode || 'IS'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

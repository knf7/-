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

  // Button icon wrapper styling:
  // In Night Mode: authentic TikTok/Reels ghost icon with drop-shadow
  // In Day Mode: crisp frosted glass pill/circle with dark olive icon for maximum contrast
  const iconWrapperStyle = isDayMode
    ? 'w-11 h-11 rounded-full bg-white/75 backdrop-blur-md border border-white/90 text-[#112419] flex items-center justify-center shadow-[0_2px_10px_rgba(20,40,30,0.1)] active:scale-85 transition-all'
    : 'w-11 h-11 rounded-full bg-black/25 backdrop-blur-md border border-white/10 text-white flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.4)] active:scale-85 transition-all';

  const labelStyle = isDayMode
    ? 'text-[11px] font-bold text-[#14281D] font-mono tracking-tight select-none mt-0.5'
    : 'text-[11px] font-bold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] font-mono tracking-tight select-none mt-0.5';

  return (
    <div className="flex flex-col items-center gap-3.5 z-30 pointer-events-auto select-none" dir="ltr">
      {/* 1. HEART / LIKE (Exact Instagram / TikTok Heart Button) */}
      <button
        onClick={handleToggleLike}
        className="flex flex-col items-center group cursor-pointer focus:outline-none"
        aria-label="إعجاب"
      >
        <div className={`${iconWrapperStyle} ${animateHeart ? 'scale-125' : ''}`}>
          <Heart
            className={`w-[22px] h-[22px] transition-transform duration-300 ${
              isLiked
                ? 'fill-[#EF4444] text-[#EF4444] stroke-[#EF4444] scale-110 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]'
                : isDayMode
                  ? 'text-[#112419] stroke-[2.2]'
                  : 'text-white stroke-[2.2]'
            }`}
          />
        </div>
        <span className={labelStyle}>
          {formatNumber(likeCount)}
        </span>
      </button>

      {/* 2. COMMENT / ASK AI (Exact Instagram / TikTok Bubble Icon) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onOpenAsk();
        }}
        className="flex flex-col items-center group cursor-pointer focus:outline-none"
        aria-label="اسأل الذكاء الاصطناعي"
      >
        <div className={iconWrapperStyle}>
          <MessageCircle className={`w-[22px] h-[22px] stroke-[2.2] ${isDayMode ? 'text-[#112419]' : 'text-white'}`} />
        </div>
        <span className={labelStyle}>
          اسأل
        </span>
      </button>

      {/* 3. BOOKMARK / SAVE (Exact Instagram Reels Bookmark Icon) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleSave();
        }}
        className="flex flex-col items-center group cursor-pointer focus:outline-none"
        aria-label="حفظ المفهوم"
      >
        <div className={`${iconWrapperStyle} ${isSaved ? (isDayMode ? 'bg-[#183626] text-white' : 'bg-white text-black') : ''}`}>
          <Bookmark
            className={`w-[22px] h-[22px] transition-all duration-300 ${
              isSaved
                ? isDayMode
                  ? 'fill-white stroke-white scale-110'
                  : 'fill-black stroke-black scale-110'
                : isDayMode
                  ? 'text-[#112419] stroke-[2.2]'
                  : 'text-white stroke-[2.2]'
            }`}
          />
        </div>
        <span className={labelStyle}>
          {isSaved ? 'محفوظ' : 'حفظ'}
        </span>
      </button>

      {/* 4. SHARE (Exact Instagram Direct Paper Airplane Icon) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onOpenSource();
        }}
        className="flex flex-col items-center group cursor-pointer focus:outline-none"
        aria-label="المصدر والمشاركة"
      >
        <div className={iconWrapperStyle}>
          <Send className={`w-[21px] h-[21px] stroke-[2.2] -rotate-45 translate-x-0.5 -translate-y-0.5 ${isDayMode ? 'text-[#112419]' : 'text-white'}`} />
        </div>
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
        className="relative mt-1 cursor-pointer group flex items-center justify-center"
        aria-label="الصوت الأصلي"
      >
        {/* Floating animated musical note */}
        <div className="absolute -top-3 -left-2 pointer-events-none opacity-80 animate-bounce">
          <Music2 className={`w-3.5 h-3.5 ${isDayMode ? 'text-[#204933]' : 'text-emerald-400'}`} />
        </div>

        {/* Vinyl Disc Outer Rim */}
        <div className={`w-10 h-10 rounded-full border-2 p-1 flex items-center justify-center animate-[spin_4s_linear_infinite] shadow-lg ${
          isDayMode 
            ? 'bg-[#14261C] border-white/90 shadow-black/10' 
            : 'bg-[#181818] border-white/40 shadow-black/60'
        }`}>
          {/* Vinyl Grooves */}
          <div className="w-full h-full rounded-full border border-dashed border-white/30 flex items-center justify-center overflow-hidden bg-gradient-to-tr from-[#0D1C13] to-[#2E543C]">
            <span className="text-[8px] font-bold text-white font-mono">IS</span>
          </div>
        </div>
      </div>
    </div>
  );
};

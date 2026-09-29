import React, { useState } from 'react';
import { Flashcard } from '../types';
import { X, RotateCcw } from 'lucide-react';

interface FlashcardsProps {
  cards: Flashcard[];
  isDayMode?: boolean;
  onComplete: (ratings: Record<string, 'reviewed' | 'needsReinforcement'>) => void;
  onExit: () => void;
}

export const Flashcards: React.FC<FlashcardsProps> = ({ 
  cards, 
  isDayMode = false, 
  onComplete, 
  onExit 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [ratings, setRatings] = useState<Record<string, 'reviewed' | 'needsReinforcement'>>({});

  const currentCard = cards[currentIndex];

  if (!currentCard) {
    return (
      <div className={`min-h-[100dvh] pt-12 pb-20 px-5 flex flex-col justify-between max-w-[420px] mx-auto select-none transition-colors duration-500 ${
        isDayMode ? 'bg-[#F2F6F3] text-[#102318]' : 'bg-[#0E100F] text-[#F1EDE5]'
      }`}>
        <div className="flex items-center justify-between pb-4">
          <button onClick={onExit} className={`p-2 cursor-pointer ${isDayMode ? 'text-[#3E674F]' : 'text-[#8C928E]'}`}>
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="text-center my-auto">
          <p className={`text-base ${isDayMode ? 'text-[#204933]' : 'text-[#B6BBB7]'}`}>
            لا توجد بطاقات للمفاهيم التي رأيتها بعد.
          </p>
        </div>
      </div>
    );
  }

  const handleRate = (rating: 'reviewed' | 'needsReinforcement') => {
    const newRatings = { ...ratings, [currentCard.conceptId]: rating };
    setRatings(newRatings);
    setIsFlipped(false);

    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete(newRatings);
    }
  };

  return (
    <div className={`min-h-[100dvh] pt-10 pb-16 px-5 flex flex-col justify-between max-w-[420px] mx-auto select-none transition-colors duration-500 ${
      isDayMode ? 'bg-[#F2F6F3] text-[#102318]' : 'bg-[#0E100F] text-[#F1EDE5]'
    }`}>
      {/* Top minimal bar */}
      <div className="flex items-center justify-between pb-4">
        <button
          onClick={onExit}
          className={`w-10 h-10 rounded-full flex items-center justify-center active:scale-95 transition-all cursor-pointer ${
            isDayMode ? 'text-[#3E674F] hover:bg-black/5' : 'text-[#8C928E] hover:text-[#F1EDE5]'
          }`}
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        <div className={`text-xs font-mono font-medium ${isDayMode ? 'text-[#204933]' : 'text-[#58675F]'}`}>
          {currentIndex + 1} / {cards.length}
        </div>
      </div>

      {/* Flip Card Container */}
      <div className="my-auto py-4">
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className={`w-full min-h-[300px] sm:min-h-[340px] rounded-3xl border cursor-pointer p-7 flex flex-col justify-between transition-all duration-400 relative overflow-hidden active:scale-[0.99] ${
            isDayMode 
              ? 'bg-white border-[#D4E0D8] shadow-[0_12px_36px_rgba(20,40,30,0.08)]' 
              : 'bg-[#151917] border-[#262D29] shadow-2xl'
          }`}
          style={{
            perspective: '1000px',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Subtle slide badge */}
          <div className={`flex items-center justify-between text-xs font-mono ${
            isDayMode ? 'text-[#3E674F]' : 'text-[#58675F]'
          }`} dir="ltr">
            <span>{currentCard.sourceSlide}</span>
            <RotateCcw className="w-3.5 h-3.5" />
          </div>

          {/* Card Body */}
          <div className="my-auto text-center py-4">
            {!isFlipped ? (
              <div className="animate-in fade-in duration-300">
                <h3 className={`text-2xl sm:text-3xl font-bold mb-4 tracking-tight ${
                  isDayMode ? 'text-[#0E2116]' : 'text-[#F1EDE5]'
                }`}>
                  {currentCard.front}
                </h3>
                <p className={`text-xs ${isDayMode ? 'text-[#5A7A68]' : 'text-[#8C928E]'}`}>
                  اضغط تكشف الجواب
                </p>
              </div>
            ) : (
              <div className="animate-in fade-in duration-300">
                <p className={`text-lg sm:text-xl font-medium leading-relaxed whitespace-pre-line ${
                  isDayMode ? 'text-[#102418]' : 'text-[#F1EDE5]'
                }`}>
                  {currentCard.back}
                </p>
              </div>
            )}
          </div>

          {/* Bottom hint */}
          <div className={`text-center text-[11px] ${isDayMode ? 'text-[#4A6E58]' : 'text-[#58675F]'}`}>
            {isFlipped ? 'المفهوم مسجل من سلايداتك' : 'بطاقة استرجاع سريع'}
          </div>
        </div>
      </div>

      {/* Bottom Actions (Shown once flipped) */}
      <div className="min-h-[80px] flex items-center justify-center">
        {isFlipped ? (
          <div className="w-full grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* راجعها (Needs Reinforcement) */}
            <button
              onClick={() => handleRate('needsReinforcement')}
              className={`py-3.5 px-4 rounded-xl border font-semibold text-sm active:scale-[0.98] transition-all text-center cursor-pointer ${
                isDayMode 
                  ? 'bg-white border-[#E8C2BD] text-[#A63A32] hover:bg-[#FDF4F3]' 
                  : 'bg-[#1B201D] border-[#39423D] text-[#B88E88]'
              }`}
            >
              راجعها
            </button>

            {/* عرفتها (Reviewed / Mastered) */}
            <button
              onClick={() => handleRate('reviewed')}
              className={`py-3.5 px-4 rounded-xl font-bold text-sm active:scale-[0.98] transition-all text-center cursor-pointer shadow-md ${
                isDayMode 
                  ? 'bg-[#183626] text-white hover:bg-[#122A1E]' 
                  : 'bg-[#F1EDE5] text-[#0E100F] shadow-black/40'
              }`}
            >
              عرفتها
            </button>
          </div>
        ) : (
          <div className={`text-xs text-center ${isDayMode ? 'text-[#486353]' : 'text-[#8C928E]'}`}>
            اضغط على البطاقة لقلبها
          </div>
        )}
      </div>
    </div>
  );
};

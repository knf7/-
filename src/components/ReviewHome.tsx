import React from 'react';
import { Concept } from '../types';
import { ArrowLeft, Layers } from 'lucide-react';

interface ReviewHomeProps {
  seenConcepts: Concept[];
  isDayMode?: boolean;
  onStartQuiz: () => void;
  onStartFlashcards: () => void;
  onSelectConceptReel?: (conceptId: string) => void;
  onGoToFeed?: () => void;
}

export const ReviewHome: React.FC<ReviewHomeProps> = ({
  seenConcepts,
  isDayMode = false,
  onStartQuiz,
  onStartFlashcards,
  onSelectConceptReel,
  onGoToFeed,
}) => {
  const readyCount = seenConcepts.length;

  return (
    <div className={`min-h-[100dvh] pt-12 pb-28 px-5 flex flex-col justify-between max-w-[420px] mx-auto select-none transition-colors duration-500 ${
      isDayMode ? 'bg-[#F2F6F3] text-[#102318]' : 'bg-[#0E100F] text-[#F1EDE5]'
    }`}>
      <div>
        {/* Course Header Context */}
        <div className={`flex items-center justify-between pb-4 border-b mb-6 ${
          isDayMode ? 'border-[#D4E0D8]' : 'border-[#262D29]'
        }`}>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isDayMode ? 'bg-[#29543C]' : 'bg-[#58675F]'}`} />
            <span className={`text-xs font-mono ${isDayMode ? 'text-[#3E674F]' : 'text-[#8C928E]'}`} dir="ltr">IS-321</span>
            <span className={isDayMode ? 'text-[#AFC3B6]' : 'text-[#8C928E]'}>·</span>
            <span className={`text-xs font-medium ${isDayMode ? 'text-[#1B3E2A]' : 'text-[#B6BBB7]'}`}>قواعد البيانات</span>
          </div>
          <span className={`text-xs font-mono font-medium ${isDayMode ? 'text-[#204933]' : 'text-[#A9B9AF]'}`}>
            {readyCount} {readyCount === 1 ? 'مفهوم جاهز' : 'مفاهيم جاهزة'}
          </span>
        </div>

        {/* Page Title & Subtitle */}
        <h1 className={`text-2xl sm:text-3xl font-bold tracking-tight mb-2 leading-snug ${
          isDayMode ? 'text-[#0E2116]' : 'text-[#F1EDE5]'
        }`}>
          راجع اللي مر عليك
        </h1>
        <p className={`text-sm leading-relaxed mb-8 ${
          isDayMode ? 'text-[#486353]' : 'text-[#8C928E]'
        }`}>
          كل اللي هنا من أشياء شفتها فعلًا في الـFeed.
        </p>

        {/* Concepts list or empty state */}
        {readyCount === 0 ? (
          <div className="py-16 text-center flex flex-col items-center justify-center">
            <div className={`w-12 h-12 rounded-full border flex items-center justify-center mb-3 ${
              isDayMode ? 'bg-white border-[#D4E0D8] text-[#3E674F]' : 'bg-[#151917] border-[#262D29] text-[#58675F]'
            }`}>
              <Layers className="w-5 h-5" />
            </div>
            <p className={`text-sm font-medium mb-1 ${isDayMode ? 'text-[#163623]' : 'text-[#B6BBB7]'}`}>
              ما شفت مفاهيم بعد
            </p>
            <p className={`text-xs max-w-[240px] mb-5 ${isDayMode ? 'text-[#506D5E]' : 'text-[#8C928E]'}`}>
              ارجع للـFeed وسكرول على كم مفهوم، وبتظهر لك هنا تلقائياً.
            </p>
            {onGoToFeed && (
              <button
                onClick={onGoToFeed}
                className={`py-2.5 px-5 rounded-full text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95 ${
                  isDayMode 
                    ? 'bg-[#183626] text-white hover:bg-[#122A1E]' 
                    : 'bg-[#F1EDE5] text-[#0E100F] hover:bg-white'
                }`}
              >
                تصفح الـ Feed الآن
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-2.5">
            {seenConcepts.map((concept) => (
              <div
                key={concept.id}
                onClick={() => onSelectConceptReel?.(concept.id)}
                className={`p-4 rounded-xl border transition-colors flex items-center justify-between cursor-pointer group ${
                  isDayMode 
                    ? 'bg-white border-[#D4E0D8] hover:border-[#28543A] shadow-xs' 
                    : 'bg-[#151917] border-[#262D29] hover:border-[#39423D]'
                }`}
              >
                <div>
                  <div className={`text-xs font-mono mb-1 ${isDayMode ? 'text-[#3E674F]' : 'text-[#58675F]'}`} dir="ltr">
                    {concept.sourceLabel}
                  </div>
                  <h3 className={`text-sm font-semibold transition-colors ${
                    isDayMode ? 'text-[#0E2116] group-hover:text-[#18442B]' : 'text-[#F1EDE5] group-hover:text-white'
                  }`}>
                    {concept.title.replace('وش يعني ', '').replace('ليش ', '').replace(' أصلًا؟', '').replace('؟', '')}
                  </h3>
                  <p className={`text-xs line-clamp-1 mt-0.5 ${isDayMode ? 'text-[#486353]' : 'text-[#8C928E]'}`}>
                    {concept.shortExplanation}
                  </p>
                </div>
                <ArrowLeft className={`w-4 h-4 transition-colors shrink-0 mr-2 ${
                  isDayMode ? 'text-[#3E674F] group-hover:text-[#122A1E]' : 'text-[#58675F] group-hover:text-[#F1EDE5]'
                }`} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Two Strong Actions at bottom if concepts available */}
      {readyCount > 0 && (
        <div className="pt-6 space-y-3">
          <button
            onClick={onStartQuiz}
            className={`w-full py-3.5 px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer ${
              isDayMode 
                ? 'bg-[#183626] text-white shadow-md hover:bg-[#122A1E]' 
                : 'bg-[#F1EDE5] text-[#0E100F] shadow-lg shadow-black/40'
            }`}
          >
            <span>اختبرني</span>
          </button>

          <button
            onClick={onStartFlashcards}
            className={`w-full py-3.5 px-5 rounded-xl border font-semibold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer ${
              isDayMode 
                ? 'bg-white border-[#D4E0D8] text-[#12261A] hover:bg-[#EBF2EC]' 
                : 'bg-[#151917] border-[#39423D] text-[#F1EDE5] hover:bg-[#1B201D]'
            }`}
          >
            <span>فلاش كارد</span>
          </button>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { X, Check } from 'lucide-react';

interface QuizProps {
  questions: QuizQuestion[];
  isDayMode?: boolean;
  onComplete: (answers: Record<string, number>, wrongConceptIds: string[]) => void;
  onExit: () => void;
}

export const Quiz: React.FC<QuizProps> = ({ 
  questions, 
  isDayMode = false, 
  onComplete, 
  onExit 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [wrongConceptIds, setWrongConceptIds] = useState<string[]>([]);

  const currentQ = questions[currentIndex];

  if (!currentQ) {
    return null;
  }

  const handleSelectOption = (optionId: number) => {
    if (isAnswered) return;
    setSelectedOption(optionId);
    setIsAnswered(true);

    const isCorrect = optionId === currentQ.correctAnswerId;
    const newAnswers = { ...userAnswers, [currentQ.id]: optionId };
    setUserAnswers(newAnswers);

    let updatedWrong = [...wrongConceptIds];
    if (!isCorrect) {
      if (!updatedWrong.includes(currentQ.conceptId)) {
        updatedWrong.push(currentQ.conceptId);
      }
      setWrongConceptIds(updatedWrong);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      onComplete(userAnswers, wrongConceptIds);
    }
  };

  const isCurrentCorrect = selectedOption === currentQ.correctAnswerId;

  return (
    <div className={`min-h-[100dvh] pt-10 pb-16 px-5 flex flex-col justify-between max-w-[420px] mx-auto select-none transition-colors duration-500 ${
      isDayMode ? 'bg-[#F2F6F3] text-[#102318]' : 'bg-[#0E100F] text-[#F1EDE5]'
    }`}>
      {/* Top minimal chrome */}
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
          {currentIndex + 1} / {questions.length}
        </div>
      </div>

      {/* Main Question Area */}
      <div className="my-auto py-6">
        {currentQ.context && (
          <div className={`text-xs font-mono mb-3 px-3 py-1.5 rounded-lg inline-block border ${
            isDayMode 
              ? 'bg-white border-[#D4E0D8] text-[#1B422D] shadow-xs' 
              : 'bg-[#151917] border-[#262D29] text-[#A9B9AF]'
          }`} dir="ltr">
            {currentQ.context}
          </div>
        )}

        <h2 className={`text-xl sm:text-2xl font-bold leading-relaxed mb-8 ${
          isDayMode ? 'text-[#0E2116]' : 'text-[#F1EDE5]'
        }`}>
          {currentQ.question}
        </h2>

        {/* Options */}
        <div className="space-y-3.5">
          {currentQ.options.map((opt) => {
            const isSelected = selectedOption === opt.id;
            let optionStyles = isDayMode
              ? 'border-[#D4E0D8] bg-white text-[#193325] hover:border-[#28543A] shadow-xs'
              : 'border-[#262D29] bg-[#151917] text-[#B6BBB7] hover:border-[#39423D]';

            if (isAnswered) {
              if (isSelected) {
                if (isCurrentCorrect) {
                  optionStyles = isDayMode
                    ? 'border-[#1E4D34] bg-[#E3F2E9] text-[#0C2417] font-semibold'
                    : 'border-[#A9B9AF] bg-[#203029] text-[#F1EDE5]';
                } else {
                  optionStyles = isDayMode
                    ? 'border-[#C8847C] bg-[#FBEFEF] text-[#5C231E]'
                    : 'border-[#B88E88] bg-[#201817] text-[#F1EDE5]';
                }
              } else if (opt.id === currentQ.correctAnswerId && !isCurrentCorrect) {
                optionStyles = isDayMode
                  ? 'border-[#29543C] bg-[#EAF5EF] text-[#143A24]'
                  : 'border-[#39423D] bg-[#151917] text-[#A9B9AF]';
              } else {
                optionStyles = isDayMode
                  ? 'border-[#E2ECE6] bg-[#F8FAF9] text-[#9CB1A5] opacity-50'
                  : 'border-[#262D29]/50 bg-[#0E100F] text-[#606762] opacity-40';
              }
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                disabled={isAnswered}
                className={`w-full p-4 rounded-xl border text-right transition-all text-sm sm:text-base font-medium flex items-center justify-between active:scale-[0.99] cursor-pointer ${optionStyles}`}
              >
                <span>{opt.text}</span>
                {isAnswered && isSelected && (
                  <span className="shrink-0 mr-3">
                    {isCurrentCorrect ? (
                      <Check className={`w-5 h-5 ${isDayMode ? 'text-[#1E4D34]' : 'text-[#A9B9AF]'}`} />
                    ) : (
                      <span className={`text-xs font-mono ${isDayMode ? 'text-[#C8847C]' : 'text-[#B88E88]'}`}>•</span>
                    )}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Answer Feedback & CTA */}
      <div className="min-h-[110px] flex flex-col justify-end">
        {isAnswered ? (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-200">
            {isCurrentCorrect ? (
              <div className="mb-4">
                <div className={`text-base font-semibold mb-1 ${isDayMode ? 'text-[#1B422D]' : 'text-[#A9B9AF]'}`}>
                  صح — الفكرة ثبتت.
                </div>
                <div className={`text-xs ${isDayMode ? 'text-[#4A6756]' : 'text-[#8C928E]'}`}>
                  {currentQ.correctExplanation}
                </div>
              </div>
            ) : (
              <div className="mb-4">
                <div className={`text-base font-semibold mb-1 ${isDayMode ? 'text-[#102418]' : 'text-[#F1EDE5]'}`}>
                  قريب — خلنا نثبتها.
                </div>
                <div className={`text-xs leading-relaxed ${isDayMode ? 'text-[#A35147]' : 'text-[#B88E88]'}`}>
                  فيه معلومة تعتمد على جزء فقط من المفتاح.
                </div>
              </div>
            )}

            <button
              onClick={handleNext}
              className={`w-full py-3.5 px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-transform shadow-md cursor-pointer ${
                isDayMode 
                  ? 'bg-[#183626] text-white hover:bg-[#122A1E]' 
                  : 'bg-[#F1EDE5] text-[#0E100F] shadow-black/40'
              }`}
            >
              <span>كمّل</span>
            </button>
          </div>
        ) : (
          <div className={`text-center text-xs py-3 ${isDayMode ? 'text-[#486353]' : 'text-[#8C928E]'}`}>
            اختر الإجابة المناسبة
          </div>
        )}
      </div>
    </div>
  );
};

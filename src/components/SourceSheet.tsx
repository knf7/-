import React, { useState } from 'react';
import { Concept } from '../types';
import { X, FileText, ExternalLink, Check } from 'lucide-react';

interface SourceSheetProps {
  concept: Concept | null;
  isOpen: boolean;
  isDayMode?: boolean;
  onClose: () => void;
}

export const SourceSheet: React.FC<SourceSheetProps> = ({ 
  concept, 
  isOpen, 
  isDayMode = false, 
  onClose 
}) => {
  const [opened, setOpened] = useState(false);

  if (!isOpen || !concept) return null;

  const handleOpenSource = () => {
    setOpened(true);
    setTimeout(() => {
      setOpened(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm select-none animate-in fade-in duration-200">
      <div 
        className={`w-full max-w-[420px] rounded-t-3xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-300 border-t ${
          isDayMode ? 'bg-[#F4F7F5] border-[#D4E0D8] text-[#102418]' : 'bg-[#151917] border-[#39423D] text-[#F1EDE5]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`flex items-center justify-between pb-3 border-b ${
          isDayMode ? 'border-[#D4E0D8]' : 'border-[#262D29]'
        }`}>
          <div className={`w-8 h-1 rounded-full mx-auto absolute top-3 left-1/2 -translate-x-1/2 ${
            isDayMode ? 'bg-[#CDDDD2]' : 'bg-[#39423D]'
          }`} />
          <h3 className="text-base font-bold mt-1">
            مصدر المفهوم
          </h3>
          <button
            onClick={onClose}
            className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer ${
              isDayMode ? 'text-[#3E674F] hover:bg-black/5' : 'text-[#8C928E] hover:text-[#F1EDE5]'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Source Details List */}
        <div className="py-4 space-y-3">
          <div className={`p-4 rounded-xl border flex items-center gap-3.5 shadow-xs ${
            isDayMode ? 'bg-white border-[#D4E0D8]' : 'bg-[#1B201D] border-[#262D29]'
          }`}>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              isDayMode ? 'bg-[#E3EDE6] text-[#1E452E]' : 'bg-[#203029] border border-[#58675F]/50 text-[#F1EDE5]'
            }`}>
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className={`text-xs font-mono ${isDayMode ? 'text-[#3E674F]' : 'text-[#58675F]'}`} dir="ltr">IS-321</div>
              <div className="text-sm font-semibold">قواعد البيانات</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className={`p-3 rounded-xl border shadow-xs ${
              isDayMode ? 'bg-white border-[#D4E0D8]' : 'bg-[#1B201D] border-[#262D29]'
            }`}>
              <div className={`text-[10px] uppercase tracking-wider mb-1 ${isDayMode ? 'text-[#5A7A68]' : 'text-[#8C928E]'}`}>المحاضرة</div>
              <div className="text-xs font-mono font-medium">Lecture 6</div>
            </div>

            <div className={`p-3 rounded-xl border shadow-xs ${
              isDayMode ? 'bg-white border-[#D4E0D8]' : 'bg-[#1B201D] border-[#262D29]'
            }`}>
              <div className={`text-[10px] uppercase tracking-wider mb-1 ${isDayMode ? 'text-[#5A7A68]' : 'text-[#8C928E]'}`}>الشريحة</div>
              <div className="text-xs font-mono font-medium">{concept.sourceSlide}</div>
            </div>
          </div>

          <div className={`p-3 rounded-xl border shadow-xs ${
            isDayMode ? 'bg-white border-[#D4E0D8]' : 'bg-[#1B201D] border-[#262D29]'
          }`}>
            <div className={`text-[10px] uppercase tracking-wider mb-1 ${isDayMode ? 'text-[#5A7A68]' : 'text-[#8C928E]'}`}>اسم الملف الأصلي</div>
            <div className="text-xs font-mono font-medium" dir="ltr">{concept.sourceFile}</div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={handleOpenSource}
            className={`w-full py-3.5 px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer shadow-md ${
              isDayMode 
                ? 'bg-[#183626] text-white hover:bg-[#122A1E]' 
                : 'bg-[#F1EDE5] text-[#0E100F] shadow-black/40'
            }`}
          >
            {opened ? (
              <>
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>تم فتح الشريحة في التطبيق</span>
              </>
            ) : (
              <>
                <ExternalLink className="w-4 h-4 stroke-[2.5]" />
                <span>افتح المصدر</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

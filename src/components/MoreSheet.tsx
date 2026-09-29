import React, { useState } from 'react';
import { Concept } from '../types';
import { X, Share2, Copy, EyeOff, AlertCircle, Check } from 'lucide-react';

interface MoreSheetProps {
  concept: Concept | null;
  isOpen: boolean;
  isDayMode?: boolean;
  onClose: () => void;
}

export const MoreSheet: React.FC<MoreSheetProps> = ({ 
  concept, 
  isOpen, 
  isDayMode = false, 
  onClose 
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !concept) return null;

  const handleCopy = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      onClose();
    }, 900);
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
            خيارات السكرول
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

        <div className="py-3 space-y-2">
          <button
            onClick={handleCopy}
            className={`w-full p-3.5 rounded-xl flex items-center justify-between text-right transition-colors cursor-pointer border ${
              isDayMode 
                ? 'bg-white border-[#D4E0D8] hover:bg-[#EBF2EC] text-[#102418] shadow-xs' 
                : 'bg-[#1B201D] border-[#262D29] hover:bg-[#202622] text-[#F1EDE5]'
            }`}
          >
            <div className="flex items-center gap-3">
              <Copy className={`w-4 h-4 ${isDayMode ? 'text-[#2D5A40]' : 'text-[#B6BBB7]'}`} />
              <span className="text-sm font-medium">نسخ رابط المفهوم</span>
            </div>
            {copied && <Check className={`w-4 h-4 ${isDayMode ? 'text-[#1E4D34]' : 'text-[#A9B9AF]'}`} />}
          </button>

          <button
            onClick={handleCopy}
            className={`w-full p-3.5 rounded-xl flex items-center gap-3 text-right transition-colors cursor-pointer border ${
              isDayMode 
                ? 'bg-white border-[#D4E0D8] hover:bg-[#EBF2EC] text-[#102418] shadow-xs' 
                : 'bg-[#1B201D] border-[#262D29] hover:bg-[#202622] text-[#F1EDE5]'
            }`}
          >
            <Share2 className={`w-4 h-4 ${isDayMode ? 'text-[#2D5A40]' : 'text-[#B6BBB7]'}`} />
            <span className="text-sm font-medium">مشاركة مع الزملاء</span>
          </button>

          <button
            onClick={onClose}
            className={`w-full p-3.5 rounded-xl flex items-center gap-3 text-right transition-colors cursor-pointer border ${
              isDayMode 
                ? 'bg-white border-[#D4E0D8] hover:bg-[#EBF2EC] text-[#557564] shadow-xs' 
                : 'bg-[#1B201D] border-[#262D29] hover:bg-[#202622] text-[#8C928E]'
            }`}
          >
            <EyeOff className="w-4 h-4" />
            <span className="text-sm">تقليل مثل هذا المفهوم</span>
          </button>

          <button
            onClick={onClose}
            className={`w-full p-3.5 rounded-xl flex items-center gap-3 text-right transition-colors cursor-pointer border ${
              isDayMode 
                ? 'bg-white border-[#D4E0D8] hover:bg-[#EBF2EC] text-[#557564] shadow-xs' 
                : 'bg-[#1B201D] border-[#262D29] hover:bg-[#202622] text-[#8C928E]'
            }`}
          >
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">إبلاغ عن محتوى غير دقيق</span>
          </button>
        </div>
      </div>
    </div>
  );
};

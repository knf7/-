import React, { useState } from 'react';
import { X, FileText, Presentation, FileCode2, Check } from 'lucide-react';

interface CreateSheetProps {
  isOpen: boolean;
  isDayMode?: boolean;
  onClose: () => void;
  onFileUploaded: (fileInfo: { name: string; courseCode: string; date: string }) => void;
}

export const CreateSheet: React.FC<CreateSheetProps> = ({
  isOpen,
  isDayMode = false,
  onClose,
  onFileUploaded,
}) => {
  const [stage, setStage] = useState<'select' | 'processing' | 'done'>('select');
  const [selectedType, setSelectedType] = useState<string>('PDF');

  if (!isOpen) return null;

  const handleStartSimulateUpload = (type: string) => {
    setSelectedType(type);
    setStage('processing');

    setTimeout(() => {
      setStage('done');
      onFileUploaded({
        name: 'Normalization.pdf',
        courseCode: 'IS-321',
        date: 'اليوم',
      });

      setTimeout(() => {
        setStage('select');
        onClose();
      }, 1200);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm select-none animate-in fade-in duration-200">
      <div 
        className={`w-full max-w-[420px] rounded-t-3xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-300 border-t ${
          isDayMode ? 'bg-[#F4F7F5] border-[#D4E0D8] text-[#102418]' : 'bg-[#151917] border-[#39423D] text-[#F1EDE5]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`flex items-center justify-between pb-4 border-b ${
          isDayMode ? 'border-[#D4E0D8]' : 'border-[#262D29]'
        }`}>
          <div className={`w-8 h-1 rounded-full mx-auto absolute top-3 left-1/2 -translate-x-1/2 ${
            isDayMode ? 'bg-[#CDDDD2]' : 'bg-[#39423D]'
          }`} />
          <h3 className="text-lg font-bold mt-1">
            {stage === 'select' && 'وش نضيف للـFeed؟'}
            {stage === 'processing' && 'نجهز الـFeed'}
            {stage === 'done' && 'تم تجهيز المحتوى'}
          </h3>
          {stage === 'select' && (
            <button
              onClick={onClose}
              className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer ${
                isDayMode ? 'text-[#3E674F] hover:bg-black/5' : 'text-[#8C928E] hover:text-[#F1EDE5]'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* STAGE 1: SELECT FILE TYPE */}
        {stage === 'select' && (
          <div className="pt-4 pb-2">
            <p className={`text-xs mb-5 ${isDayMode ? 'text-[#486E56]' : 'text-[#8C928E]'}`}>
              نحوّل المحتوى إلى Scrolls قصيرة ونرتبها لك.
            </p>

            <div className="space-y-2.5 mb-6">
              {/* Option 1: PDF */}
              <button
                onClick={() => handleStartSimulateUpload('PDF')}
                className={`w-full p-4 rounded-xl border flex items-center justify-between text-right active:scale-[0.99] transition-all cursor-pointer shadow-xs ${
                  isDayMode 
                    ? 'bg-white border-[#D4E0D8] hover:border-[#28543A]' 
                    : 'bg-[#1B201D] border-[#262D29] hover:border-[#39423D]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isDayMode 
                      ? 'bg-[#E3EDE6] text-[#1E452E]' 
                      : 'bg-[#203029] border border-[#58675F]/40 text-[#F1EDE5]'
                  }`}>
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">
                      ملف PDF (مذكرات، سلايدات)
                    </div>
                    <div className={`text-xs font-mono mt-0.5 ${isDayMode ? 'text-[#4A6E58]' : 'text-[#8C928E]'}`} dir="ltr">
                      Normalization.pdf (1.8 MB)
                    </div>
                  </div>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded border ${
                  isDayMode 
                    ? 'bg-[#183626] text-white border-transparent' 
                    : 'bg-[#203029] text-[#F1EDE5] border-[#58675F]/60'
                }`}>
                  إضافة
                </span>
              </button>

              {/* Option 2: Slides */}
              <button
                onClick={() => handleStartSimulateUpload('سلايدات')}
                className={`w-full p-4 rounded-xl border flex items-center justify-between text-right active:scale-[0.99] transition-all cursor-pointer shadow-xs ${
                  isDayMode 
                    ? 'bg-white border-[#D4E0D8] hover:border-[#28543A]' 
                    : 'bg-[#1B201D] border-[#262D29] hover:border-[#39423D]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg border flex items-center justify-center ${
                    isDayMode ? 'bg-[#F2F6F4] border-[#D4E0D8] text-[#29543C]' : 'bg-[#151917] border-[#262D29] text-[#B6BBB7]'
                  }`}>
                    <Presentation className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">
                      عرض تقديمي (PowerPoint / Keynote)
                    </div>
                    <div className={`text-xs mt-0.5 ${isDayMode ? 'text-[#648070]' : 'text-[#8C928E]'}`}>
                      يتم استخراج كل شريحة كمفهوم مستقل
                    </div>
                  </div>
                </div>
                <span className={`text-xs font-mono ${isDayMode ? 'text-[#50705E]' : 'text-[#8C928E]'}`}>
                  اختر
                </span>
              </button>

              {/* Option 3: Code/Notes */}
              <button
                onClick={() => handleStartSimulateUpload('نصوص')}
                className={`w-full p-4 rounded-xl border flex items-center justify-between text-right active:scale-[0.99] transition-all cursor-pointer shadow-xs ${
                  isDayMode 
                    ? 'bg-white border-[#D4E0D8] hover:border-[#28543A]' 
                    : 'bg-[#1B201D] border-[#262D29] hover:border-[#39423D]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg border flex items-center justify-center ${
                    isDayMode ? 'bg-[#F2F6F4] border-[#D4E0D8] text-[#29543C]' : 'bg-[#151917] border-[#262D29] text-[#B6BBB7]'
                  }`}>
                    <FileCode2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">
                      ملخصات نصية أو أكواد
                    </div>
                    <div className={`text-xs mt-0.5 ${isDayMode ? 'text-[#648070]' : 'text-[#8C928E]'}`}>
                      Markdown، ملاحظات Notion، أو ملفات نصية
                    </div>
                  </div>
                </div>
                <span className={`text-xs font-mono ${isDayMode ? 'text-[#50705E]' : 'text-[#8C928E]'}`}>
                  اختر
                </span>
              </button>
            </div>
          </div>
        )}

        {/* STAGE 2: PROCESSING */}
        {stage === 'processing' && (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-4 animate-pulse ${
              isDayMode ? 'bg-[#E3EDE6] border-[#BCD0C3] text-[#1E4D34]' : 'bg-[#203029] border-[#58675F] text-[#FAF6EF]'
            }`}>
              <FileText className="w-7 h-7" />
            </div>
            <div className="text-base font-bold mb-1.5">
              نحلل السلايدات ونستخرج المفاهيم…
            </div>
            <p className={`text-xs max-w-xs ${isDayMode ? 'text-[#486E56]' : 'text-[#8C928E]'}`}>
              يتم تقسيم محاضرة Normalization إلى سكرولز مركّزة وأسئلة مراجعة.
            </p>
          </div>
        )}

        {/* STAGE 3: DONE */}
        {stage === 'done' && (
          <div className="py-12 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-[#1E4D34] text-white flex items-center justify-center mb-4 shadow-lg shadow-emerald-900/30">
              <Check className="w-7 h-7 stroke-[3]" />
            </div>
            <div className="text-base font-bold mb-1.5">
              أضيف إلى Feed موادي!
            </div>
            <p className={`text-xs ${isDayMode ? 'text-[#486E56]' : 'text-[#8C928E]'}`}>
              المفاهيم جاهزة الآن للتصفح والمراجعة.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

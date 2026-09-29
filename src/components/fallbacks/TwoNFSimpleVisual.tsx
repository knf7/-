import React, { useState, useEffect } from 'react';

interface VisualProps {
  isActive: boolean;
  isDayMode?: boolean;
}

export const TwoNFSimpleVisual: React.FC<VisualProps> = ({ isActive, isDayMode = false }) => {
  const [step, setStep] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    if (!isActive) {
      setStep(0);
      return;
    }

    const t1 = setTimeout(() => setStep(1), 1200);
    const t2 = setTimeout(() => setStep(2), 2600);

    const interval = setInterval(() => {
      setStep(0);
      setTimeout(() => setStep(1), 1200);
      setTimeout(() => setStep(2), 2600);
    }, 5500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearInterval(interval);
    };
  }, [isActive]);

  return (
    <div 
      className={`w-full h-full flex flex-col items-center justify-center pt-8 pb-32 px-4 select-none text-left relative overflow-hidden transition-colors duration-500 ${
        isDayMode 
          ? 'bg-gradient-to-b from-[#E7EFEA] via-[#DFE9E3] to-[#D5E1DA]' 
          : 'bg-gradient-to-b from-[#18261F] via-[#121E18] to-[#0D1511]'
      }`} 
      dir="ltr"
    >
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(${isDayMode ? '#4A6B58' : '#729882'} 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />

      <div className={`w-full max-w-sm relative z-10 flex flex-col items-center rounded-2xl p-5 transition-all duration-300 ${
        isDayMode 
          ? 'bg-white/80 backdrop-blur-2xl border border-white shadow-[0_20px_45px_rgba(30,55,40,0.15)]' 
          : 'bg-[#15211B]/90 backdrop-blur-2xl border border-[#3C5747] shadow-[0_25px_60px_rgba(0,0,0,0.7)]'
      }`}>
        {/* Step indicator */}
        <div className={`px-3 py-1 rounded-full border text-[11px] font-mono font-bold mb-5 ${
          isDayMode ? 'border-[#3D6E50] bg-[#E8F4EE] text-[#1E5232]' : 'border-[#4D7E63] bg-[#16271E] text-[#7FD6A4]'
        }`}>
          SIMPLIFIED EXPLANATION
        </div>

        {/* FULL KEY */}
        <div className="w-full text-center mb-3">
          <div className={`text-[10px] font-mono font-bold uppercase tracking-wider mb-1.5 ${
            isDayMode ? 'text-[#3E614D]' : 'text-[#87B499]'
          }`}>
            FULL KEY (المفتاح الكامل)
          </div>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border ${
            isDayMode ? 'border-[#3D6E50]/40 bg-[#E6F0EA]' : 'border-[#4C755E] bg-[#1B3024]'
          }`}>
            <span className={`font-mono text-xs font-bold ${isDayMode ? 'text-[#0F291B]' : 'text-[#F1EDE5]'}`}>Project_ID</span>
            <span className={isDayMode ? 'text-[#486353]' : 'text-[#8AA495]'}>+</span>
            <span className={`font-mono text-xs font-bold ${isDayMode ? 'text-[#0F291B]' : 'text-[#F1EDE5]'}`}>Employee_ID</span>
          </div>
        </div>

        {/* Target Field */}
        <div className="w-full flex flex-col items-center my-2">
          <div className={`text-[10px] font-mono font-bold uppercase tracking-wider mb-1 ${
            isDayMode ? 'text-[#3E614D]' : 'text-[#87B499]'
          }`}>
            FIELD IN QUESTION
          </div>
          <div className={`px-5 py-2 rounded-xl border text-sm font-mono font-bold ${
            isDayMode ? 'border-[#2D4537]/20 bg-white text-[#15291D] shadow-sm' : 'border-[#3A5043] bg-[#0E1712] text-[#F1EDE5]'
          }`}>
            Project_Name
          </div>
        </div>

        {/* Core Question & Answer */}
        <div className="w-full mt-3 flex flex-col items-center">
          <div className={`text-sm font-bold mb-2 font-sans ${isDayMode ? 'text-[#15291D]' : 'text-[#F1EDE5]'}`} dir="rtl">
            هل يحتاج المفتاح كامل؟
          </div>

          <div className={`transition-all duration-400 ${step >= 1 ? 'scale-110 opacity-100' : 'scale-90 opacity-0'}`}>
            <span className={`inline-block px-6 py-1.5 rounded-full font-bold text-base font-sans border shadow-md ${
              isDayMode 
                ? 'bg-[#FBEBEA] border-[#D96B64] text-[#9E261D]' 
                : 'bg-[#2E1615] border-[#B88E88] text-[#FAD2CD]'
            }`} dir="rtl">
              لا
            </span>
          </div>

          {/* Result Tag */}
          <div className={`mt-4 transition-all duration-500 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border shadow-sm ${
              isDayMode ? 'border-[#B88E88] bg-[#FFF2F0]' : 'border-[#B88E88]/70 bg-[#251514]'
            }`}>
              <span className="w-2.5 h-2.5 rounded-full bg-[#B88E88] animate-pulse" />
              <span className={`text-xs font-mono font-bold ${
                isDayMode ? 'text-[#852C25]' : 'text-[#FAD2CD]'
              }`}>
                = Partial Dependency (لسه ما وصلنا 2NF)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

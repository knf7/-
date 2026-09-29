import React, { useState, useEffect } from 'react';

interface VisualProps {
  isActive: boolean;
  isDayMode?: boolean;
}

export const PartialDependencyVisual: React.FC<VisualProps> = ({ isActive, isDayMode = false }) => {
  const [step, setStep] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    if (!isActive) {
      setStep(0);
      return;
    }

    const t1 = setTimeout(() => setStep(1), 1000);
    const t2 = setTimeout(() => setStep(2), 2400);

    const interval = setInterval(() => {
      setStep(0);
      setTimeout(() => setStep(1), 1000);
      setTimeout(() => setStep(2), 2400);
    }, 5600);

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

      {/* DISTINCT EDUCATIONAL STAGE CARD */}
      <div className={`w-full max-w-sm relative z-10 flex flex-col items-center rounded-2xl p-5 transition-all duration-300 ${
        isDayMode 
          ? 'bg-white/80 backdrop-blur-2xl border border-white shadow-[0_20px_45px_rgba(30,55,40,0.15)]' 
          : 'bg-[#15211B]/90 backdrop-blur-2xl border border-[#3C5747] shadow-[0_25px_60px_rgba(0,0,0,0.7)]'
      }`}>
        {/* Full Composite Key Header */}
        <div className={`text-[11px] font-mono font-bold uppercase tracking-wider mb-2.5 ${
          isDayMode ? 'text-[#395A47]' : 'text-[#8DB89F]'
        }`}>
          FULL COMPOSITE KEY
        </div>

        {/* Dual Key Badges */}
        <div className={`flex items-center gap-2.5 p-2 rounded-xl border mb-6 ${
          isDayMode ? 'bg-[#EEF5F1] border-[#3D5C4A]/20' : 'bg-[#0E1712] border-[#2A3E33]'
        }`}>
          {/* Active Key Part 1 */}
          <div className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all duration-500 ${
            step >= 1 
              ? (isDayMode ? 'bg-[#224430] text-[#FFFFFF] shadow-md' : 'bg-[#223E2E] text-[#6CE7B2] border border-[#52936F] shadow-lg') 
              : (isDayMode ? 'bg-white text-[#20362B]' : 'bg-[#18251E] text-[#B9CFC2]')
          }`}>
            Project_ID
          </div>

          <span className={`font-bold text-xs ${isDayMode ? 'text-[#3E614D]' : 'text-[#6EA586]'}`}>+</span>

          {/* Secondary Key Part 2 */}
          <div className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all duration-500 ${
            step >= 1 
              ? 'opacity-35 line-through scale-95' 
              : (isDayMode ? 'bg-white text-[#20362B]' : 'bg-[#18251E] text-[#B9CFC2]')
          }`}>
            Employee_ID
          </div>
        </div>

        {/* Directed Dependency Arrow */}
        <div className={`flex flex-col items-center my-1 transition-all duration-500 ${
          step >= 1 ? 'opacity-100 scale-100' : 'opacity-25 scale-90'
        }`}>
          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border mb-1 ${
            isDayMode ? 'bg-[#FBECEB] border-[#B88E88]/40 text-[#8F3C34]' : 'bg-[#2A1817] border-[#B88E88]/60 text-[#E5A8A0]'
          }`}>
            determines only
          </span>
          <svg className={`w-5 h-7 ${isDayMode ? 'text-[#A3433B]' : 'text-[#E5887E]'}`} viewBox="0 0 24 36" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 2v28m0 0l-5-5m5 5l5-5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Dependent Attribute */}
        <div className={`mt-2 w-full max-w-[260px] p-3 rounded-xl border transition-all duration-500 flex flex-col items-center ${
          step >= 1 
            ? (isDayMode ? 'border-[#B88E88]/60 bg-[#FFF5F4] shadow-md' : 'border-[#B88E88]/70 bg-[#1F1413] shadow-lg') 
            : (isDayMode ? 'border-[#3D5C4A]/20 bg-white' : 'border-[#26372E] bg-[#101914]')
        }`}>
          <span className={`text-xs font-mono font-bold ${
            isDayMode ? 'text-[#14261B]' : 'text-[#FAF6EF]'
          }`}>
            Project_Name
          </span>
          <span className={`text-[11px] mt-0.5 font-sans ${
            isDayMode ? 'text-[#5A4543]' : 'text-[#AFA1A0]'
          }`} dir="rtl">
            يعتمد فقط على Project_ID
          </span>
        </div>

        {/* Diagnostic Banner */}
        <div className={`mt-6 px-4 py-2 rounded-xl border transition-all duration-500 flex items-center gap-2 ${
          step === 2 
            ? (isDayMode ? 'border-[#B88E88] bg-[#FBEBEA] opacity-100' : 'border-[#B88E88] bg-[#2E1817] opacity-100') 
            : 'border-transparent bg-transparent opacity-0 translate-y-2'
        }`}>
          <span className="w-2.5 h-2.5 rounded-full bg-[#B88E88] animate-pulse" />
          <span className={`text-xs font-mono font-bold ${
            isDayMode ? 'text-[#7D2923]' : 'text-[#FAD2CD]'
          }`}>
            PARTIAL DEPENDENCY DETECTED
          </span>
        </div>
      </div>
    </div>
  );
};

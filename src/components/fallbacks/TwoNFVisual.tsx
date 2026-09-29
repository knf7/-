import React, { useState, useEffect } from 'react';

interface VisualProps {
  isActive: boolean;
  isDayMode?: boolean;
}

export const TwoNFVisual: React.FC<VisualProps> = ({ isActive, isDayMode = false }) => {
  const [normalized, setNormalized] = useState<boolean>(false);

  useEffect(() => {
    if (!isActive) {
      setNormalized(false);
      return;
    }

    const t1 = setTimeout(() => setNormalized(true), 2000);
    const interval = setInterval(() => {
      setNormalized(false);
      setTimeout(() => setNormalized(true), 2000);
    }, 6000);

    return () => {
      clearTimeout(t1);
      clearInterval(interval);
    };
  }, [isActive]);

  return (
    <div 
      className="w-full h-full flex flex-col items-center justify-center pt-8 pb-32 px-4 select-none text-left relative overflow-hidden bg-gradient-to-b from-[#16271F] via-[#101C15] to-[#0A120E]" 
      dir="ltr"
    >
      <div 
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#6E987F 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />

      <div className="w-full max-w-sm relative z-10 flex flex-col items-center rounded-2xl p-4 transition-all duration-300 bg-[#14211A]/95 backdrop-blur-2xl border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
        {/* Status indicator */}
        <div className={`flex items-center gap-2 mb-3.5 px-3 py-1 rounded-full border ${
          normalized 
            ? (isDayMode ? 'border-[#3D6E50] bg-[#E7F3EC]' : 'border-[#4E8C68] bg-[#16291E]') 
            : (isDayMode ? 'border-[#B88E88] bg-[#FBECEB]' : 'border-[#B88E88]/70 bg-[#281514]')
        }`}>
          <span className={`w-2 h-2 rounded-full ${normalized ? 'bg-[#349E65] shadow-[0_0_8px_rgba(52,158,101,0.6)]' : 'bg-[#D96B64]'}`} />
          <span className={`text-[11px] font-mono font-bold ${
            normalized 
              ? (isDayMode ? 'text-[#1D5432]' : 'text-[#8CE1B1]') 
              : (isDayMode ? 'text-[#852C25]' : 'text-[#ECA59E]')
          }`}>
            {normalized ? '2NF: REDUNDANCY ELIMINATED' : '1NF ONLY: DATA REDUNDANCY'}
          </span>
        </div>

        {!normalized ? (
          /* Un-normalized single table with duplicate Project_Name */
          <div className={`w-full rounded-xl border overflow-hidden transition-all duration-500 animate-in fade-in ${
            isDayMode ? 'border-[#B88E88]/50 bg-white shadow-md' : 'border-[#B88E88]/60 bg-[#120F0F] shadow-xl'
          }`}>
            <div className={`px-3 py-2 border-b flex items-center justify-between ${
              isDayMode ? 'bg-[#FBEBEA] border-[#B88E88]/30' : 'bg-[#291716] border-[#B88E88]/40'
            }`}>
              <span className={`text-[11px] font-mono font-bold ${isDayMode ? 'text-[#6B221C]' : 'text-[#FAD2CD]'}`}>
                COMBINED TABLE
              </span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#B88E88] text-white">
                Repeats!
              </span>
            </div>
            <div className={`grid grid-cols-3 text-[10px] font-mono py-1.5 px-3 border-b ${
              isDayMode ? 'bg-[#F5F2EC] border-[#B88E88]/20 text-[#594644]' : 'bg-[#1C1515] border-[#2E2020] text-[#9A8988]'
            }`}>
              <span>Project_ID</span>
              <span>Employee_ID</span>
              <span className="text-[#C24B40] font-bold">Project_Name</span>
            </div>
            <div className={`divide-y text-xs font-mono ${
              isDayMode ? 'divide-black/5 text-[#2B2322]' : 'divide-white/5 text-[#D1C3C2]'
            }`}>
              <div className="grid grid-cols-3 py-1.5 px-3 items-center">
                <span>101</span>
                <span>E-1</span>
                <span className="font-bold text-[#C24B40]">“AI Engine”</span>
              </div>
              <div className="grid grid-cols-3 py-1.5 px-3 items-center">
                <span>101</span>
                <span>E-2</span>
                <span className="font-bold text-[#C24B40]">“AI Engine”</span>
              </div>
              <div className="grid grid-cols-3 py-1.5 px-3 items-center">
                <span>101</span>
                <span>E-3</span>
                <span className="font-bold text-[#C24B40]">“AI Engine”</span>
              </div>
            </div>
          </div>
        ) : (
          /* Normalized two tables */
          <div className="w-full flex flex-col gap-2.5 transition-all duration-500 animate-in fade-in zoom-in-95">
            {/* Table 1: PROJECTS */}
            <div className={`w-full rounded-xl border overflow-hidden shadow-sm ${
              isDayMode ? 'border-[#3D6E50] bg-white' : 'border-[#437A5B] bg-[#0E1712]'
            }`}>
              <div className={`px-3 py-1.5 border-b flex items-center justify-between ${
                isDayMode ? 'bg-[#EBF5EF] border-[#3D6E50]/30' : 'bg-[#192E22] border-[#437A5B]/40'
              }`}>
                <span className={`text-[10px] font-mono font-bold ${isDayMode ? 'text-[#18482A]' : 'text-[#84DDB0]'}`}>
                  TABLE 1: PROJECTS
                </span>
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#358257] text-white">
                  1 Record
                </span>
              </div>
              <div className={`grid grid-cols-2 text-[10px] font-mono py-1 px-3 border-b ${
                isDayMode ? 'bg-[#F2F8F4] text-[#42614E]' : 'bg-[#131E17] text-[#7C9C88]'
              }`}>
                <span>Project_ID (PK)</span>
                <span>Project_Name</span>
              </div>
              <div className={`grid grid-cols-2 py-1.5 px-3 items-center text-xs font-mono font-bold ${
                isDayMode ? 'text-[#102919]' : 'text-[#F1EDE5]'
              }`}>
                <span>101</span>
                <span className={isDayMode ? 'text-[#1F6E3E]' : 'text-[#64E0A0]'}>“AI Engine”</span>
              </div>
            </div>

            {/* Table 2: ASSIGNMENTS */}
            <div className={`w-full rounded-xl border overflow-hidden shadow-sm ${
              isDayMode ? 'border-[#3D5C4A]/25 bg-white' : 'border-[#2D4537] bg-[#0E1712]'
            }`}>
              <div className={`px-3 py-1.5 border-b ${
                isDayMode ? 'bg-[#F0F5F2] border-[#3D5C4A]/20' : 'bg-[#17231C] border-[#2D4537]'
              }`}>
                <span className={`text-[10px] font-mono font-bold ${isDayMode ? 'text-[#203629]' : 'text-[#96B8A5]'}`}>
                  TABLE 2: PROJECT_EMPLOYEES
                </span>
              </div>
              <div className={`grid grid-cols-2 text-[10px] font-mono py-1 px-3 border-b ${
                isDayMode ? 'bg-[#F7FAF8] text-[#557361]' : 'bg-[#121B16] text-[#758E7F]'
              }`}>
                <span>Project_ID</span>
                <span>Employee_ID</span>
              </div>
              <div className={`divide-y text-xs font-mono ${
                isDayMode ? 'divide-black/5 text-[#21352A]' : 'divide-white/5 text-[#BCCFC5]'
              }`}>
                <div className="grid grid-cols-2 py-1.5 px-3"><span>101</span><span>E-1</span></div>
                <div className="grid grid-cols-2 py-1.5 px-3"><span>101</span><span>E-2</span></div>
                <div className="grid grid-cols-2 py-1.5 px-3"><span>101</span><span>E-3</span></div>
              </div>
            </div>
          </div>
        )}

        <p className={`text-xs mt-3.5 text-center font-sans ${
          isDayMode ? 'text-[#486353]' : 'text-[#96AEA0]'
        }`} dir="rtl">
          {normalized 
            ? 'فصلنا بيانات المشروع عن جدول الموظفين وألغينا التكرار تماماً.' 
            : 'تكرار اسم المشروع يسبب مشاكل التحديث والحذف.'}
        </p>
      </div>
    </div>
  );
};

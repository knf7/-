import React, { useState, useEffect } from 'react';

interface VisualProps {
  isActive: boolean;
  isDayMode?: boolean;
}

export const CompositeKeyVisual: React.FC<VisualProps> = ({ isActive, isDayMode = false }) => {
  const [phase, setPhase] = useState<'separate' | 'combining' | 'merged'>('separate');

  useEffect(() => {
    if (!isActive) {
      setPhase('separate');
      return;
    }

    const t1 = setTimeout(() => setPhase('combining'), 800);
    const t2 = setTimeout(() => setPhase('merged'), 2200);

    const interval = setInterval(() => {
      setPhase('separate');
      setTimeout(() => setPhase('combining'), 800);
      setTimeout(() => setPhase('merged'), 2200);
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
      {/* Background ambient light & grid pattern for clip distinction */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(${isDayMode ? '#4A6B58' : '#729882'} 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />
      
      {/* Luminous Top Spotlight */}
      <div 
        className={`absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-44 rounded-full blur-3xl pointer-events-none ${
          isDayMode ? 'bg-[#5B856D]/25' : 'bg-[#436753]/35'
        }`} 
      />

      {/* DISTINCT EDUCATIONAL STAGE (Floating Glassmorphic Presentation Card) */}
      <div className={`w-full max-w-sm relative z-10 flex flex-col items-center rounded-2xl p-4 transition-all duration-300 ${
        isDayMode 
          ? 'bg-white/80 backdrop-blur-2xl border border-white shadow-[0_20px_45px_rgba(30,55,40,0.15)]' 
          : 'bg-[#15211B]/90 backdrop-blur-2xl border border-[#3C5747] shadow-[0_25px_60px_rgba(0,0,0,0.7)]'
      }`}>
        {/* Terminal Header */}
        <div className={`w-full flex items-center justify-between pb-2.5 border-b mb-3 ${
          isDayMode ? 'border-[#2E483A]/15' : 'border-[#2A3E33]'
        }`}>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#528769] shadow-[0_0_8px_rgba(82,135,105,0.7)] animate-pulse" />
            <span className={`text-[11px] font-mono font-bold tracking-wider ${
              isDayMode ? 'text-[#20362A]' : 'text-[#A9C4B4]'
            }`}>
              TABLE: PROJECT_ASSIGNMENT
            </span>
          </div>
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
            isDayMode ? 'bg-[#E3EDE7] text-[#2D4738]' : 'bg-[#1E2E25] text-[#86AA95]'
          }`}>
            SCHEMA v1.2
          </span>
        </div>

        {/* Database Table Container with Illuminated Columns */}
        <div className={`w-full rounded-xl overflow-hidden border transition-all ${
          isDayMode 
            ? 'border-[#3D5C4A]/20 bg-white/90 shadow-sm' 
            : 'border-[#2E4337] bg-[#0E1712]/95 shadow-inner'
        }`}>
          {/* Table Header */}
          <div className={`grid grid-cols-3 border-b text-[11px] font-mono py-2 px-3 transition-colors ${
            isDayMode 
              ? 'bg-[#EBF3EE] border-[#3D5C4A]/15 text-[#1F3327]' 
              : 'bg-[#1A2821] border-[#2E4337] text-[#D8E6DE]'
          }`}>
            <div className={`font-bold transition-all duration-400 ${phase === 'merged' ? (isDayMode ? 'text-[#166534]' : 'text-[#5EEAD4]') : ''}`}>
              Project_ID
            </div>
            <div className={`font-bold transition-all duration-400 ${phase === 'merged' ? (isDayMode ? 'text-[#166534]' : 'text-[#5EEAD4]') : ''}`}>
              Employee_ID
            </div>
            <div className={isDayMode ? 'text-[#6A8576]' : 'text-[#879D91]'}>
              Hours
            </div>
          </div>

          {/* Sample Database Records */}
          <div className={`divide-y text-xs font-mono ${
            isDayMode ? 'divide-[#3D5C4A]/10 text-[#213529]' : 'divide-[#22332A] text-[#C4D6CC]'
          }`}>
            <div className="grid grid-cols-3 py-2 px-3 items-center">
              <span className={`font-semibold ${isDayMode ? 'text-[#11241A]' : 'text-[#F1EDE5]'}`}>PRJ-101</span>
              <span className={`font-semibold ${isDayMode ? 'text-[#11241A]' : 'text-[#F1EDE5]'}`}>EMP-404</span>
              <span className={isDayMode ? 'text-[#688274]' : 'text-[#86998E]'}>32 hrs</span>
            </div>
            <div className="grid grid-cols-3 py-2 px-3 items-center">
              <span className={`font-semibold ${isDayMode ? 'text-[#11241A]' : 'text-[#F1EDE5]'}`}>PRJ-101</span>
              <span className={`font-semibold ${isDayMode ? 'text-[#11241A]' : 'text-[#F1EDE5]'}`}>EMP-512</span>
              <span className={isDayMode ? 'text-[#688274]' : 'text-[#86998E]'}>18 hrs</span>
            </div>
            <div className="grid grid-cols-3 py-2 px-3 items-center">
              <span className={`font-semibold ${isDayMode ? 'text-[#11241A]' : 'text-[#F1EDE5]'}`}>PRJ-204</span>
              <span className={`font-semibold ${isDayMode ? 'text-[#11241A]' : 'text-[#F1EDE5]'}`}>EMP-404</span>
              <span className={isDayMode ? 'text-[#688274]' : 'text-[#86998E]'}>25 hrs</span>
            </div>
          </div>
        </div>

        {/* Dynamic Key Unification Interactive Stage */}
        <div className="w-full mt-4 flex flex-col items-center">
          <div className="relative w-full flex items-center justify-center min-h-[64px]">
            {phase === 'separate' && (
              <div className="flex items-center gap-2.5 transition-all duration-300 animate-in fade-in">
                <div className={`px-3 py-1.5 rounded-lg border font-mono text-xs font-semibold ${
                  isDayMode 
                    ? 'border-[#2E483A]/25 bg-white text-[#182C21] shadow-xs' 
                    : 'border-[#3D5647] bg-[#16241C] text-[#E0EFE7]'
                }`}>
                  Project_ID
                </div>
                <span className={`font-bold text-sm ${isDayMode ? 'text-[#3E614D]' : 'text-[#6EA586]'}`}>+</span>
                <div className={`px-3 py-1.5 rounded-lg border font-mono text-xs font-semibold ${
                  isDayMode 
                    ? 'border-[#2E483A]/25 bg-white text-[#182C21] shadow-xs' 
                    : 'border-[#3D5647] bg-[#16241C] text-[#E0EFE7]'
                }`}>
                  Employee_ID
                </div>
              </div>
            )}

            {phase === 'combining' && (
              <div className="flex items-center gap-1 transition-all duration-500 scale-95 animate-in fade-in">
                <div className={`px-3 py-1.5 rounded-l-lg border font-mono text-xs font-bold ${
                  isDayMode 
                    ? 'border-[#2E483A]/40 bg-[#D4E8DC] text-[#0F261A]' 
                    : 'border-[#4D745F] bg-[#223B2D] text-[#FAF6EF]'
                }`}>
                  Project_ID
                </div>
                <div className={`px-3 py-1.5 rounded-r-lg border font-mono text-xs font-bold ${
                  isDayMode 
                    ? 'border-[#2E483A]/40 bg-[#D4E8DC] text-[#0F261A]' 
                    : 'border-[#4D745F] bg-[#223B2D] text-[#FAF6EF]'
                }`}>
                  Employee_ID
                </div>
              </div>
            )}

            {phase === 'merged' && (
              <div className="flex flex-col items-center gap-1.5 transition-all duration-500 scale-100 animate-in zoom-in-95">
                <div className={`px-4 py-2 rounded-xl border flex items-center gap-2 shadow-lg ${
                  isDayMode 
                    ? 'border-[#28573D] bg-[#224430] text-[#FFFFFF] shadow-[0_6px_20px_rgba(34,68,48,0.3)]' 
                    : 'border-[#5FA67D] bg-[#1C3A29] text-[#FAF6EF] shadow-[0_6px_25px_rgba(40,85,60,0.5)]'
                }`}>
                  <svg className="w-4 h-4 text-[#F1EDE5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="8" cy="15" r="4"/>
                    <path d="M10.85 12.15L19 4"/>
                    <path d="M18 5L20 7"/>
                    <path d="M15 8L17 10"/>
                  </svg>
                  <span className="text-xs font-mono font-bold tracking-tight">
                    (Project_ID, Employee_ID)
                  </span>
                </div>
                <div className={`flex items-center gap-1.5 text-[10px] font-mono font-semibold ${
                  isDayMode ? 'text-[#1F4C34]' : 'text-[#7FD1A2]'
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>PRIMARY KEY (COMPOSITE)</span>
                </div>
              </div>
            )}
          </div>
          
          <p className={`text-xs mt-1 text-center font-sans ${
            isDayMode ? 'text-[#486353]' : 'text-[#96AEA0]'
          }`} dir="rtl">
            عمودين معاً يكوّنون معرّفاً فريداً لكل صف
          </p>
        </div>
      </div>
    </div>
  );
};

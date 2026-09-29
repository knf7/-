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
      className="w-full h-full flex flex-col items-center justify-center pt-8 pb-32 px-4 select-none text-left relative overflow-hidden bg-gradient-to-b from-[#16271F] via-[#101C15] to-[#0A120E]" 
      dir="ltr"
    >
      {/* Background ambient light & grid pattern for clip distinction */}
      <div 
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#6E987F 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />
      
      {/* Luminous Top Spotlight */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-44 rounded-full blur-3xl pointer-events-none bg-[#4E7A60]/35" />

      {/* DISTINCT EDUCATIONAL STAGE (Cinematic Video Frame Monitor) */}
      <div className="w-full max-w-sm relative z-10 flex flex-col items-center rounded-2xl p-4 transition-all duration-300 bg-[#14211A]/95 backdrop-blur-2xl border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
        {/* Terminal Header */}
        <div className="w-full flex items-center justify-between pb-2.5 border-b mb-3 border-[#2A3E33]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#528769] shadow-[0_0_8px_rgba(82,135,105,0.7)] animate-pulse" />
            <span className="text-[11px] font-mono font-bold tracking-wider text-[#A9C4B4]">
              TABLE: PROJECT_ASSIGNMENT
            </span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#1E2E25] text-[#86AA95] border border-white/10">
            SCHEMA v1.2
          </span>
        </div>

        {/* Database Table Container with Illuminated Columns */}
        <div className="w-full rounded-xl overflow-hidden border transition-all border-[#2E4337] bg-[#0E1712]/95 shadow-inner">
          {/* Table Header */}
          <div className="grid grid-cols-3 border-b text-[11px] font-mono py-2 px-3 transition-colors bg-[#1A2821] border-[#2E4337] text-[#D8E6DE]">
            <div className={`font-bold transition-all duration-400 ${phase === 'merged' ? 'text-emerald-400' : ''}`}>
              Project_ID 🔑
            </div>
            <div className={`font-bold transition-all duration-400 ${phase === 'merged' ? 'text-emerald-400' : ''}`}>
              Employee_ID 🔑
            </div>
            <div className="text-[#879D91]">
              Hours
            </div>
          </div>

          {/* Sample Database Records */}
          <div className="divide-y divide-[#22332A] text-xs font-mono text-[#C4D6CC]">
            <div className="grid grid-cols-3 py-2 px-3 items-center">
              <span className="font-semibold text-white">PRJ-101</span>
              <span className="font-semibold text-white">EMP-404</span>
              <span className="text-[#86998E]">32 hrs</span>
            </div>
            <div className="grid grid-cols-3 py-2 px-3 items-center">
              <span className="font-semibold text-white">PRJ-101</span>
              <span className="font-semibold text-white">EMP-512</span>
              <span className="text-[#86998E]">18 hrs</span>
            </div>
            <div className="grid grid-cols-3 py-2 px-3 items-center">
              <span className="font-semibold text-white">PRJ-204</span>
              <span className="font-semibold text-white">EMP-404</span>
              <span className="text-[#86998E]">25 hrs</span>
            </div>
          </div>
        </div>

        {/* Dynamic Key Unification Interactive Stage */}
        <div className="w-full mt-4 flex flex-col items-center">
          <div className="relative w-full flex items-center justify-center min-h-[64px]">
            {phase === 'separate' && (
              <div className="flex items-center gap-2.5 transition-all duration-300 animate-in fade-in">
                <div className="px-3 py-1.5 rounded-lg border font-mono text-xs font-semibold border-[#3D5647] bg-[#16241C] text-[#E0EFE7] shadow-sm">
                  Project_ID
                </div>
                <span className="font-bold text-sm text-[#6EA586]">+</span>
                <div className="px-3 py-1.5 rounded-lg border font-mono text-xs font-semibold border-[#3D5647] bg-[#16241C] text-[#E0EFE7] shadow-sm">
                  Employee_ID
                </div>
              </div>
            )}

            {phase === 'combining' && (
              <div className="flex items-center gap-1 transition-all duration-500 scale-95 animate-in fade-in">
                <div className="px-3 py-1.5 rounded-l-lg border font-mono text-xs font-bold border-[#4D745F] bg-[#223B2D] text-[#FAF6EF]">
                  Project_ID
                </div>
                <div className="px-3 py-1.5 rounded-r-lg border font-mono text-xs font-bold border-[#4D745F] bg-[#223B2D] text-[#FAF6EF]">
                  Employee_ID
                </div>
              </div>
            )}

            {phase === 'merged' && (
              <div className="flex flex-col items-center gap-1.5 transition-all duration-500 scale-100 animate-in zoom-in-95">
                <div className="px-4 py-2 rounded-xl border flex items-center gap-2 shadow-lg border-emerald-400 bg-gradient-to-r from-[#173827] via-[#1E4A34] to-[#173827] text-[#FAF6EF] shadow-[0_6px_25px_rgba(40,85,60,0.6)]">
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
                <div className="flex items-center gap-1.5 text-[10px] font-mono font-semibold text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
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

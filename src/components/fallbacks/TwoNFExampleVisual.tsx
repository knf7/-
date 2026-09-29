import React, { useState, useEffect } from 'react';

interface VisualProps {
  isActive: boolean;
  isDayMode?: boolean;
}

export const TwoNFExampleVisual: React.FC<VisualProps> = ({ isActive, isDayMode = false }) => {
  const [split, setSplit] = useState<boolean>(false);

  useEffect(() => {
    if (!isActive) {
      setSplit(false);
      return;
    }

    const t = setTimeout(() => setSplit(true), 1800);
    const interval = setInterval(() => {
      setSplit(false);
      setTimeout(() => setSplit(true), 1800);
    }, 6000);

    return () => {
      clearTimeout(t);
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

      <div className={`w-full max-w-sm relative z-10 flex flex-col items-center rounded-2xl p-4 transition-all duration-300 ${
        isDayMode 
          ? 'bg-white/80 backdrop-blur-2xl border border-white shadow-[0_20px_45px_rgba(30,55,40,0.15)]' 
          : 'bg-[#15211B]/90 backdrop-blur-2xl border border-[#3C5747] shadow-[0_25px_60px_rgba(0,0,0,0.7)]'
      }`}>
        <div className={`px-3 py-1 rounded-full border text-[11px] font-mono font-bold mb-3.5 ${
          isDayMode ? 'border-[#3D6E50] bg-[#E8F4EE] text-[#1E5232]' : 'border-[#4D7E63] bg-[#16271E] text-[#7FD6A4]'
        }`}>
          PRACTICAL SEPARATION EXAMPLE
        </div>

        {!split ? (
          <div className={`w-full rounded-xl border p-3 text-center transition-all duration-500 ${
            isDayMode ? 'border-[#B88E88]/50 bg-white shadow-sm' : 'border-[#4B3230] bg-[#120F0F]'
          }`}>
            <div className={`text-[10px] font-mono font-bold mb-2 uppercase tracking-wide ${
              isDayMode ? 'text-[#5E4240]' : 'text-[#AFA1A0]'
            }`}>
              BEFORE: COMBINED ATTRIBUTES
            </div>
            <div className="flex flex-wrap items-center justify-center gap-1.5 font-mono text-xs">
              <span className={`px-2.5 py-1.5 rounded font-bold ${
                isDayMode ? 'bg-[#DDEEE4] text-[#153B25]' : 'bg-[#1F362A] text-[#7FD6A4]'
              }`}>
                Project_ID (PK)
              </span>
              <span className={`px-2.5 py-1.5 rounded font-bold ${
                isDayMode ? 'bg-[#DDEEE4] text-[#153B25]' : 'bg-[#1F362A] text-[#7FD6A4]'
              }`}>
                Employee_ID (PK)
              </span>
              <span className={`px-2.5 py-1.5 rounded font-bold ${
                isDayMode ? 'bg-[#FBEBEA] text-[#B5342B]' : 'bg-[#2E1817] text-[#F39A92]'
              }`}>
                Project_Name
              </span>
              <span className={`px-2.5 py-1.5 rounded ${
                isDayMode ? 'bg-[#F0F5F2] text-[#4E6B5A]' : 'bg-[#1B2720] text-[#93ACA0]'
              }`}>
                Hours
              </span>
            </div>
            <div className={`text-[11px] font-bold mt-2.5 font-sans ${
              isDayMode ? 'text-[#A0281F]' : 'text-[#F39A92]'
            }`} dir="rtl">
              Project_Name يعتمد على Project_ID فقط!
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-2.5 transition-all duration-500 animate-in fade-in zoom-in-95">
            <div className={`rounded-xl border p-3 ${
              isDayMode ? 'border-[#3D6E50] bg-white shadow-sm' : 'border-[#437A5B] bg-[#0E1712]'
            }`}>
              <div className={`text-[10px] font-mono font-bold mb-1.5 uppercase tracking-wide ${
                isDayMode ? 'text-[#1D5E37]' : 'text-[#7FE0A9]'
              }`}>
                PROJECTS TABLE
              </div>
              <div className="flex gap-2 font-mono text-xs font-bold">
                <span className={`px-2.5 py-1 rounded ${
                  isDayMode ? 'bg-[#DDEEE4] text-[#123621]' : 'bg-[#1E3B2C] text-[#FAF6EF]'
                }`}>
                  Project_ID (PK)
                </span>
                <span className={`px-2.5 py-1 rounded ${
                  isDayMode ? 'bg-[#EBF5EF] text-[#227546]' : 'bg-[#152B1F] text-[#6CE7A7]'
                }`}>
                  Project_Name
                </span>
              </div>
            </div>

            <div className={`rounded-xl border p-3 ${
              isDayMode ? 'border-[#3D5C4A]/25 bg-white shadow-sm' : 'border-[#2D4537] bg-[#0E1712]'
            }`}>
              <div className={`text-[10px] font-mono font-bold mb-1.5 uppercase tracking-wide ${
                isDayMode ? 'text-[#203629]' : 'text-[#96B8A5]'
              }`}>
                ASSIGNMENTS TABLE
              </div>
              <div className="flex flex-wrap gap-1.5 font-mono text-xs font-bold">
                <span className={`px-2 py-1 rounded ${
                  isDayMode ? 'bg-[#DDEEE4] text-[#123621]' : 'bg-[#1E3B2C] text-[#FAF6EF]'
                }`}>
                  Project_ID
                </span>
                <span className={`px-2 py-1 rounded ${
                  isDayMode ? 'bg-[#DDEEE4] text-[#123621]' : 'bg-[#1E3B2C] text-[#FAF6EF]'
                }`}>
                  Employee_ID
                </span>
                <span className={`px-2 py-1 rounded ${
                  isDayMode ? 'bg-[#F0F5F2] text-[#4E6B5A]' : 'bg-[#16231C] text-[#86A394]'
                }`}>
                  Hours
                </span>
              </div>
            </div>
            <div className={`text-[11px] font-bold mt-1 text-center font-sans ${
              isDayMode ? 'text-[#1F6E3E]' : 'text-[#7DE2AA]'
            }`} dir="rtl">
              تم فصل جدول المشاريع واستقر البناء في 2NF بنجاح.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

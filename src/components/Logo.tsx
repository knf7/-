import React from 'react';

interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 96, showText = false, className = '' }) => {
  return (
    <div className={`inline-flex flex-col items-center justify-center select-none ${className}`} aria-label="Scroll It Logo">
      <svg
        width={size}
        height={size * 1.05}
        viewBox="0 0 120 126"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
      >
        <defs>
          {/* Top Loop Gradient: Bright warm ivory sweeping into sage green */}
          <linearGradient id="topLoopGrad" x1="25" y1="15" x2="105" y2="55" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#EAE5DC" />
            <stop offset="65%" stopColor="#96A69C" />
            <stop offset="100%" stopColor="#43554A" />
          </linearGradient>

          {/* Top Loop Underside / Inner fold shadow */}
          <linearGradient id="topUnderGrad" x1="45" y1="30" x2="85" y2="60" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#25352C" />
            <stop offset="50%" stopColor="#18231D" />
            <stop offset="100%" stopColor="#0E1612" />
          </linearGradient>

          {/* Central Connecting Ribbon Gradient */}
          <linearGradient id="midRibbonGrad" x1="30" y1="45" x2="90" y2="85" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4A5C51" />
            <stop offset="40%" stopColor="#6E8074" />
            <stop offset="70%" stopColor="#A3B2A8" />
            <stop offset="100%" stopColor="#C9D3CC" />
          </linearGradient>

          {/* Bottom Loop Outer Surface: Sage green to deep forest */}
          <linearGradient id="bottomLoopGrad" x1="95" y1="115" x2="20" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#D5DDD7" />
            <stop offset="35%" stopColor="#87998E" />
            <stop offset="75%" stopColor="#3F5247" />
            <stop offset="100%" stopColor="#1E2A23" />
          </linearGradient>

          {/* Bottom Inside Curve Gradient */}
          <linearGradient id="bottomUnderGrad" x1="75" y1="95" x2="35" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#16221B" />
            <stop offset="100%" stopColor="#0C130F" />
          </linearGradient>
        </defs>

        {/* 1. Back/Under fold of Top Loop (Depth & Occlusion) */}
        <path
          d="M48 42C48 30 60 18 80 18C92 18 100 24 100 34C100 46 88 56 68 62L48 42Z"
          fill="url(#topUnderGrad)"
          opacity="0.85"
        />

        {/* 2. Bottom Fold Base (Shadow Layer) */}
        <path
          d="M72 84C72 96 60 108 40 108C28 108 20 102 20 92C20 80 32 70 52 64L72 84Z"
          fill="url(#bottomUnderGrad)"
          opacity="0.9"
        />

        {/* 3. Top Ribbon Loop: Sweeping forward from center to top right, turning back left */}
        <path
          d="M38 52C42 34 58 18 82 18C98 18 106 28 106 40C106 54 90 64 64 70C52 62 42 56 38 52Z"
          fill="url(#topLoopGrad)"
        />

        {/* 4. Central 3D Ribbon Spine / Diagonal Fold */}
        <path
          d="M64 70C54 72 40 76 28 84C18 90 14 98 14 106C14 116 26 122 46 122C68 122 88 112 102 96L88 82C78 92 64 102 46 102C38 102 34 98 34 94C34 90 40 86 52 82L64 70Z"
          fill="url(#bottomLoopGrad)"
        />

        {/* 5. Central Twist Highlight */}
        <path
          d="M48 58C58 64 68 70 76 76C68 80 58 84 48 88C44 78 44 68 48 58Z"
          fill="url(#midRibbonGrad)"
          opacity="0.75"
        />

        {/* 6. Realistic 3D Upper Edge Specular Sheen */}
        <path
          d="M42 38C52 24 68 20 84 20C96 20 102 26 104 34C102 28 94 22 80 22C64 22 48 28 38 42"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>

      {showText && (
        <div className="flex flex-col items-center mt-3 text-center select-none">
          <span className="text-[26px] font-bold tracking-tight text-[#F1EDE5] leading-tight">سكرول إت</span>
          <span className="text-[13px] font-medium tracking-wider text-[#B6BBB7] uppercase mt-0.5" dir="ltr">Scroll It</span>
        </div>
      )}
    </div>
  );
};

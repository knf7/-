import React, { useId } from 'react';

interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

/** Three overlapping folds form the Scroll It ribbon. */
export const Logo: React.FC<LogoProps> = ({ size = 96, showText = false, className = '' }) => {
  const id = useId().replace(/:/g, '');

  return (
    <div className={`inline-flex flex-col items-center justify-center select-none ${className}`} aria-label="شعار سكرول إت">
      <svg width={size} height={size} viewBox="0 0 128 128" fill="none" role="img" aria-hidden="true" className="shrink-0">
        <defs>
          <linearGradient id={`${id}-fold`} x1="43" y1="49" x2="101" y2="99" gradientUnits="userSpaceOnUse">
            <stop stopColor="#263B2F" />
            <stop offset=".48" stopColor="#526B58" />
            <stop offset="1" stopColor="#1A2A21" />
          </linearGradient>
          <linearGradient id={`${id}-top`} x1="31" y1="55" x2="103" y2="17" gradientUnits="userSpaceOnUse">
            <stop stopColor="#DFE5DC" />
            <stop offset=".45" stopColor="#F1EEE7" />
            <stop offset="1" stopColor="#FFFDF7" />
          </linearGradient>
          <linearGradient id={`${id}-bottom`} x1="18" y1="114" x2="95" y2="70" gradientUnits="userSpaceOnUse">
            <stop stopColor="#B5C3B6" />
            <stop offset=".52" stopColor="#829A87" />
            <stop offset="1" stopColor="#344A3B" />
          </linearGradient>
        </defs>

        <path d="M40 57c18-9 42-4 55 8 11 10 6 21-12 29" stroke={`url(#${id}-fold)`} strokeWidth="27" strokeLinecap="round" />
        <path d="M32 53c-4-8-1-16 8-21L98 5c8-4 16-1 19 6 3 7 0 15-7 19L50 62c-8 4-14 2-18-9Z" fill={`url(#${id}-top)`} />
        <path d="M95 73c4 8 1 16-8 21l-55 29c-8 4-17 2-20-6-3-7 0-14 8-19l57-29c8-4 14-3 18 4Z" fill={`url(#${id}-bottom)`} />
      </svg>
      {showText && (
        <div className="mt-2 flex flex-col items-center text-center leading-none">
          <span className="text-[29px] font-semibold tracking-tight text-[#F1EEE7]">سكرول إت</span>
          <span className="mt-2 text-[18px] font-medium tracking-tight text-[#E7E8E2]" dir="ltr">Scroll <span className="text-[#8B9D8F]">It</span></span>
        </div>
      )}
    </div>
  );
};

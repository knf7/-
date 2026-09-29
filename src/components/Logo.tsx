import React, { useId } from 'react';

interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

/** The folded scroll ribbon. Gradients share no IDs between instances. */
export const Logo: React.FC<LogoProps> = ({ size = 96, showText = false, className = '' }) => {
  const id = useId().replace(/:/g, '');

  return (
    <div className={`inline-flex flex-col items-center justify-center select-none ${className}`} aria-label="شعار سكرول إت">
      <svg width={size} height={size} viewBox="0 0 128 128" fill="none" role="img" aria-hidden="true" className="shrink-0">
        <defs>
          <linearGradient id={`${id}-fold`} x1="47" y1="42" x2="95" y2="90" gradientUnits="userSpaceOnUse">
            <stop stopColor="#293D32" />
            <stop offset=".46" stopColor="#536A59" />
            <stop offset="1" stopColor="#17251D" />
          </linearGradient>
          <linearGradient id={`${id}-top`} x1="31" y1="55" x2="103" y2="17" gradientUnits="userSpaceOnUse">
            <stop stopColor="#DFE5DC" />
            <stop offset=".45" stopColor="#F1EEE7" />
            <stop offset="1" stopColor="#FFFDF7" />
          </linearGradient>
          <linearGradient id={`${id}-bottom`} x1="25" y1="116" x2="94" y2="73" gradientUnits="userSpaceOnUse">
            <stop stopColor="#B9C9BC" />
            <stop offset=".48" stopColor="#748F7B" />
            <stop offset="1" stopColor="#263C2F" />
          </linearGradient>
        </defs>

        <path d="M34 54c19-12 44-12 59-1 16 12 11 27-6 39L65 107" stroke={`url(#${id}-fold)`} strokeWidth="31" strokeLinecap="round" />
        <path d="M33 54c-5-8-2-15 7-20l59-29c9-4 17 0 19 8 2 7-1 12-8 16L47 62c-6 3-11 1-14-8Z" fill={`url(#${id}-top)`} />
        <path d="M95 75c4 8 1 15-8 21l-55 31c-8 5-18 2-21-5-3-7 0-14 7-18l62-34c7-4 12-3 15 5Z" fill={`url(#${id}-bottom)`} />
        <path d="M42 61c15-8 29-10 42-6" stroke="#0D1510" strokeOpacity=".22" strokeWidth="2" />
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

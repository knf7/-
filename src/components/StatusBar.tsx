import React from 'react';
import { Wifi } from 'lucide-react';

interface StatusBarProps {
  isDayMode?: boolean;
}

export const StatusBar: React.FC<StatusBarProps> = ({ isDayMode = false }) => {
  const textColor = isDayMode ? 'text-[#16271F]' : 'text-[#F1EDE5]';
  const batteryBorder = isDayMode ? 'border-[#16271F]' : 'border-[#F1EDE5]';
  const batteryFill = isDayMode ? 'bg-[#16271F]' : 'bg-[#F1EDE5]';

  return (
    <div className={`w-full pt-3 px-7 pb-1 flex items-center justify-between select-none pointer-events-none z-50 transition-colors duration-300 ${textColor}`} dir="ltr">
      {/* Time */}
      <span className="text-[14px] font-semibold tracking-tight">9:41</span>

      {/* Dynamic Island */}
      <div className={`w-24 h-6 rounded-full flex items-center justify-end px-2 gap-1.5 shadow-sm transition-colors ${
        isDayMode ? 'bg-[#111A15]' : 'bg-black'
      }`}>
        <div className={`w-2 h-2 rounded-full ${isDayMode ? 'bg-[#2B3E34]' : 'bg-[#151917]'}`} />
        <div className={`w-1.5 h-1.5 rounded-full ${isDayMode ? 'bg-[#405C4D]' : 'bg-[#203029]/80'}`} />
      </div>

      {/* Connectivity & Battery */}
      <div className="flex items-center gap-1.5">
        {/* Cellular 4 bars */}
        <div className="flex items-end gap-0.5 h-3">
          <span className={`w-0.5 h-1 rounded-xs transition-colors ${batteryFill}`} />
          <span className={`w-0.5 h-1.5 rounded-xs transition-colors ${batteryFill}`} />
          <span className={`w-0.5 h-2 rounded-xs transition-colors ${batteryFill}`} />
          <span className={`w-0.5 h-2.5 rounded-xs transition-colors ${batteryFill}`} />
        </div>

        {/* WiFi */}
        <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />

        {/* Battery Icon */}
        <div className="flex items-center">
          <div className={`w-5 h-2.5 rounded-[4px] border p-0.5 flex items-center transition-colors ${batteryBorder}`}>
            <div className={`w-3 h-full rounded-[2px] transition-colors ${batteryFill}`} />
          </div>
          <div className={`w-0.5 h-1 rounded-r-xs -ml-[0.5px] transition-colors ${batteryFill}`} />
        </div>
      </div>
    </div>
  );
};

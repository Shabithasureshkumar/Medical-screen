import React, { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface CriticalResultBannerProps {
  onViewResult?: () => void;
}

export const CriticalResultBanner: React.FC<CriticalResultBannerProps> = ({ onViewResult }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="w-full px-3 sm:px-6 lg:px-8 mt-1 sm:mt-2 mb-3 sm:mb-4">
      <div 
        role="alert"
        className="w-full rounded-[10px] sm:rounded-xl bg-[#F8D7DA]/95 border border-red-200/90 px-3 sm:px-6 py-2 sm:py-3 shadow-xs flex items-center justify-between gap-2 sm:gap-3 text-[#6B0505]"
      >
        <div className="flex items-center gap-1.5 sm:gap-2 flex-1 min-w-0">
          <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-[#6B0505] shrink-0 fill-[#6B0505]/10" />
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#E53E3E] shrink-0 inline-block mr-0.5 sm:mr-1"></span>
          <p className="text-[10.5px] sm:text-sm md:text-[15.5px] font-medium leading-snug sm:leading-normal text-[#6B0505] truncate xs:whitespace-normal">
            <strong>Critical Result:</strong> Your potassium level was 6.1 mEq/L on May 26 and requires immediate attention. Your care team has been notified.
          </p>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onViewResult}
            className="px-2 sm:px-3 h-[26px] sm:h-[32px] rounded-[6px] sm:rounded-[8px] bg-[#6B0505] hover:bg-[#520303] text-white text-[10.5px] sm:text-[14px] font-bold shadow-xs transition-colors cursor-pointer flex items-center justify-center shrink-0 whitespace-nowrap"
          >
            View Result
          </button>
          <button
            type="button"
            aria-label="Dismiss banner"
            onClick={() => setDismissed(true)}
            className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-[#6B0505] hover:opacity-75 transition-opacity cursor-pointer shrink-0"
          >
            <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

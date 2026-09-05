import React, { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface CriticalResultBannerProps {
  onViewResult?: () => void;
}

export const CriticalResultBanner: React.FC<CriticalResultBannerProps> = ({ onViewResult }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="w-full max-w-[1380px] mx-auto px-3 sm:px-6 lg:px-8 mt-2 mb-4">
      <div 
        role="alert"
        className="w-full min-h-[56px] rounded-xl bg-[#F8D7DA]/90 border border-red-200/90 px-4 sm:px-6 py-2.5 sm:py-3 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-[#6B0505]"
      >
        <div className="flex items-center gap-2 flex-1">
          <AlertTriangle className="w-5 h-5 text-[#6B0505] shrink-0 fill-[#6B0505]/10" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#E53E3E] shrink-0 inline-block mr-1"></span>
          <p className="text-xs sm:text-sm md:text-[15.5px] font-medium leading-normal text-[#6B0505]">
            <strong>Critical Result:</strong> Your potassium level was 6.1 mEq/L on May 26 and requires immediate attention. Your care team has been notified.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
          <button
            type="button"
            onClick={onViewResult}
            className="w-[113px] h-[32px] rounded-[8px] bg-[#6B0505] hover:bg-[#520303] text-white text-[14px] font-bold shadow-xs transition-colors cursor-pointer flex items-center justify-center"
          >
            View Result
          </button>
          <button
            type="button"
            aria-label="Dismiss banner"
            onClick={() => setDismissed(true)}
            className="w-6 h-6 flex items-center justify-center text-[#6B0505] hover:opacity-75 transition-opacity cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

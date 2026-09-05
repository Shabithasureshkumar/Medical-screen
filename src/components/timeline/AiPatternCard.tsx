import React from 'react';
import { Sparkles, TrendingUp } from 'lucide-react';

interface AiPatternCardProps {
  onViewInsight: () => void;
}

export const AiPatternCard: React.FC<AiPatternCardProps> = ({ onViewInsight }) => {
  return (
    <div className="w-full rounded-[17px] p-5 border border-indigo-200/50 bg-white shadow-[0_0_18px_rgba(99,102,241,0.08)] flex flex-col gap-4">
      {/* Top Details */}
      <div className="flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6366F1] to-[#A855F7] flex items-center justify-center text-white shrink-0 shadow-xs">
          <TrendingUp className="w-5 h-5" />
        </div>
        <div className="flex flex-col gap-1">
          <h4 className="text-xs font-bold text-[#6366F1] tracking-wider uppercase flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#6366F1]" />
            AI PATTERN DETECTION
          </h4>
          <p className="text-xs sm:text-[13.5px] text-[#191C1E] leading-relaxed">
            AI detected a pattern: Your blood pressure was checked 3 times this month and improved by 5%.
          </p>
        </div>
      </div>

      {/* Action Button */}
      <div className="self-start">
        <button
          type="button"
          onClick={onViewInsight}
          className="px-5 py-2 rounded-full bg-gradient-to-r from-[#6366F1] to-[#A855F7] hover:opacity-95 text-white font-semibold text-xs tracking-wide shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>View Insight</span>
        </button>
      </div>
    </div>
  );
};

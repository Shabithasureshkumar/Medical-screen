import React from 'react';
import { Sparkles, Heart, Shield, Zap } from 'lucide-react';
import { aiLabInsightsData } from '../../data/imagingData';

interface AiLabInsightsProps {
  onViewExplanation?: () => void;
}

export const AiLabInsights: React.FC<AiLabInsightsProps> = ({ onViewExplanation }) => {
  return (
    <div className="w-full h-full rounded-[22px] bg-gradient-to-br from-white/80 to-[#F8F2FC]/40 border border-[#7B61FF]/20 p-4 sm:p-5 lg:p-5 backdrop-blur-[18px] shadow-sm flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center gap-2 pb-3">
        <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
          <Sparkles className="w-3.5 h-3.5" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-[#1D1B20] font-inter tracking-tight">
          AI Lab Insights
        </h3>
      </div>

      {/* 3 Insight Rows */}
      <div className="flex flex-col gap-2.5 sm:gap-3.5 my-auto">
        {aiLabInsightsData.map((item) => {
          return (
            <div
              key={item.id}
              className="flex items-center justify-between gap-2 p-2 sm:p-2.5 rounded-xl hover:bg-white/40 transition-colors min-w-0"
            >
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                {/* Icon */}
                <div
                  className={`w-9 h-9 rounded-[11px] flex items-center justify-center shrink-0 ${
                    item.iconType === 'heart'
                      ? 'bg-[#FEE2E2] text-rose-500'
                      : item.iconType === 'immunity'
                      ? 'bg-[#DBEAFE] text-blue-500'
                      : 'bg-[#FEF3C7] text-amber-500'
                  }`}
                >
                  {item.iconType === 'heart' && <Heart className="w-4 h-4 fill-rose-500" />}
                  {item.iconType === 'immunity' && <Shield className="w-4 h-4 fill-blue-500" />}
                  {item.iconType === 'metabolism' && <Zap className="w-4 h-4 fill-amber-500" />}
                </div>

                {/* Text */}
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-xs sm:text-sm font-semibold text-[#1D1B20] font-inter leading-tight truncate">
                    {item.category}
                  </span>
                  <span className="text-[11px] text-[#7A7582] font-medium font-inter leading-tight truncate">
                    {item.title}
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              <span
                className={`text-xs font-semibold uppercase tracking-wider font-inter shrink-0 ${
                  item.statusType === 'elevated' ? 'text-[#D97706]' : 'text-[#059669]'
                }`}
              >
                {item.status}
              </span>
            </div>
          );
        })}
      </div>

      {/* Bottom Action Button */}
      <div className="pt-3">
        <button
          type="button"
          onClick={onViewExplanation}
          className="w-full h-11 rounded-[11px] border border-[#7B61FF] text-[#7B61FF] hover:bg-[#7B61FF]/10 font-semibold text-xs sm:text-sm font-inter flex items-center justify-center transition-all cursor-pointer shadow-2xs"
        >
          View AI Explanation
        </button>
      </div>
    </div>
  );
};

import React from 'react';
import { Sparkles, ArrowLeftRight } from 'lucide-react';

interface WelcomeSectionProps {
  onOpenInsight?: () => void;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({ onOpenInsight }) => {
  return (
    <div className="w-full max-w-[1380px] mx-auto px-3 sm:px-6 lg:px-8 pt-2 pb-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
      {/* Left Greeting & Subtext */}
      <div className="flex flex-col gap-3.5 max-w-2xl">
        <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#1D1B20] tracking-[-1.15px] leading-tight">
          Welcome back, Julian 👋
        </h1>
        <p className="text-sm sm:text-base lg:text-[17px] text-[#494551] leading-relaxed">
          Your encrypted health vault is synchronized. AI diagnostics have processed 3 new lab entries from this week.
        </p>

        {/* AI Insight Pill */}
        <button
          type="button"
          onClick={onOpenInsight}
          className="self-start inline-flex items-center gap-3.5 px-4 py-2 sm:py-2.5 rounded-full bg-[#FAF5FF]/90 border border-purple-300/60 shadow-[0_0_20px_rgba(113,42,226,0.12)] backdrop-blur-md hover:bg-purple-100/80 transition-all cursor-pointer group"
        >
          <span className="w-7 h-7 rounded-full bg-[#8A4CFC] flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
          </span>
          <span className="text-xs sm:text-sm font-semibold text-[#712AE2] tracking-normal font-jakarta">
            AI Insight: You have 3 new results from last week.
          </span>
        </button>
      </div>

      {/* Right Account Switcher Card */}
      <div className="lg:self-center shrink-0">
        <div className="w-full sm:w-[293px] h-[96px] rounded-[26px] bg-gradient-to-b from-[#AE8AF9] to-[#5C24FF] p-2.5 px-3.5 shadow-lg border border-white/30 flex items-center justify-between backdrop-blur-xl">
          <div className="flex items-center gap-3.5">
            <div className="w-[75px] h-[75px] rounded-[15px] overflow-hidden bg-white/20 shrink-0 ring-1 ring-white/40">
              <img
                src="/assets/avatars/david-brock-self.png"
                alt="David Brock"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col text-white">
              <span className="text-[18px] sm:text-[19px] font-bold leading-tight">David Brock</span>
              <span className="text-[14px] sm:text-[15px] font-medium text-[#EBEAED] leading-tight">Self</span>
            </div>
          </div>
          <button 
            type="button"
            aria-label="Switch profile"
            className="p-2 rounded-full hover:bg-white/20 transition-colors text-white/90 hover:text-white cursor-pointer"
          >
            <ArrowLeftRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

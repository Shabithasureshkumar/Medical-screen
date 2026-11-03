import React from 'react';
import { Sparkles, ArrowLeftRight } from 'lucide-react';

interface WelcomeSectionProps {
  onOpenInsight?: () => void;
  patientName?: string;
  relationship?: string;
  onSwitchProfile?: () => void;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  onOpenInsight,
  patientName = 'David Brock',
  relationship = 'Self',
  onSwitchProfile
}) => {
  const firstName = patientName.split(' ')[0];
  return (
    <div className="w-full px-3 sm:px-6 lg:px-8 pt-1 sm:pt-2 pb-4 sm:pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 lg:gap-6">
      {/* Greeting, Description & Mobile Switcher */}
      <div className="flex flex-col gap-2 sm:gap-3.5 flex-1 max-w-2xl">
        {/* Top Header Row with Switcher on Mobile only (< sm) */}
        <div className="flex items-center justify-between gap-2.5 w-full">
          <h1 className="text-xl sm:text-3xl lg:text-[46px] font-bold text-[#1D1B20] tracking-[-0.6px] lg:tracking-[-1.15px] leading-tight">
            Welcome back, {firstName} 👋
          </h1>

          {/* Compact Switcher for Mobile only (< sm) */}
          <div className="sm:hidden shrink-0">
            <div className="h-[44px] rounded-[14px] bg-gradient-to-b from-[#AE8AF9] to-[#5C24FF] px-2 py-1 shadow-md border border-white/30 flex items-center gap-2">
              <div className="w-[30px] h-[30px] rounded-[9px] overflow-hidden bg-white/20 shrink-0 ring-1 ring-white/40">
                <img
                  src="/assets/avatars/david-brock-self.png"
                  alt={patientName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col text-white">
                <span className="text-[11px] font-bold leading-tight whitespace-nowrap">{patientName}</span>
                <span className="text-[9px] font-medium text-[#EBEAED] leading-tight">{relationship}</span>
              </div>
              <button 
                type="button"
                aria-label="Switch profile"
                onClick={onSwitchProfile}
                className="p-1 rounded-full hover:bg-white/20 text-white/90 cursor-pointer"
              >
                <ArrowLeftRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Subtitle Description */}
        <p className="text-xs sm:text-base lg:text-[17px] text-[#494551] leading-relaxed">
          Your encrypted health vault is synchronized. AI diagnostics have processed 3 new lab entries from this week.
        </p>

        {/* AI Insight Pill (Desktop only, hidden on mobile per Figma) */}
        <button
          type="button"
          onClick={onOpenInsight}
          className="self-start hidden lg:inline-flex items-center gap-2 sm:gap-3.5 px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-full bg-[#FAF5FF]/90 border border-purple-300/60 shadow-[0_0_20px_rgba(113,42,226,0.12)] backdrop-blur-md hover:bg-purple-100/80 transition-all cursor-pointer group"
        >
          <span className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-[#8A4CFC] flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform shadow-xs">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </span>
          <span className="text-[10.5px] sm:text-sm font-semibold text-[#712AE2] tracking-normal font-jakarta">
            AI Insight: You have 3 new results from last week.
          </span>
        </button>
      </div>

      {/* Account Switcher Card (sm:flex for tablet and desktop >= 640px) */}
      <div className="hidden sm:flex self-center shrink-0">
        <div className="w-[clamp(220px,22vw,293px)] h-[clamp(74px,7vw,96px)] rounded-[clamp(18px,2vw,26px)] bg-gradient-to-b from-[#AE8AF9] to-[#5C24FF] p-2 sm:p-2.5 px-3 sm:px-3.5 shadow-lg border border-white/30 flex items-center justify-between backdrop-blur-xl">
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <div className="w-[clamp(52px,5.5vw,75px)] h-[clamp(52px,5.5vw,75px)] rounded-[clamp(12px,1.2vw,15px)] overflow-hidden bg-white/20 shrink-0 ring-1 ring-white/40">
              <img
                src="/assets/avatars/david-brock-self.png"
                alt={patientName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col text-white min-w-0">
              <span className="text-[clamp(15px,1.35vw,19px)] font-bold leading-tight truncate">{patientName}</span>
              <span className="text-[clamp(12px,1.05vw,15px)] font-medium text-[#EBEAED] leading-tight">{relationship}</span>
            </div>
          </div>
          <button 
            type="button"
            aria-label="Switch profile"
            onClick={onSwitchProfile}
            className="p-1.5 sm:p-2 rounded-full hover:bg-white/20 transition-colors text-white/90 hover:text-white cursor-pointer shrink-0 ml-1"
          >
            <ArrowLeftRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

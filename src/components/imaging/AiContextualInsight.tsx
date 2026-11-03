import React, { useState } from 'react';
import { Sparkles, ChevronDown, ChevronUp, MessageSquare, Apple, TrendingUp } from 'lucide-react';

interface AiContextualInsightProps {
  onAskAi?: () => void;
  onViewDiets?: () => void;
}

export const AiContextualInsight: React.FC<AiContextualInsightProps> = ({
  onAskAi,
  onViewDiets
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="w-full h-full bg-white/70 backdrop-blur-md rounded-2xl border border-[#7B61FF]/20 shadow-sm p-4 sm:p-6 transition-all duration-300 flex flex-col justify-between">
      <div 
        className="flex items-center justify-between cursor-pointer select-none"
        onClick={() => setIsExpanded(!isExpanded)}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsExpanded(!isExpanded);
          }
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F5F3FF] border border-[#7B61FF]/20 flex items-center justify-center text-[#6B38D4] shadow-sm">
            <Sparkles className="w-5 h-5 text-[#6B38D4]" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#6B38D4] tracking-wider uppercase block">
              AI CONTEXTUAL INSIGHT
            </span>
            <h3 className="text-base sm:text-lg font-bold text-[#1E1B4B] leading-snug">
              Understand Your Results
            </h3>
          </div>
        </div>

        <button
          type="button"
          aria-label={isExpanded ? 'Collapse section' : 'Expand section'}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6B7280] hover:text-[#1E1B4B] hover:bg-slate-100 transition-colors"
        >
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-slate-100 flex-1 flex flex-col justify-between">
          <div className="space-y-3.5 flex flex-col">
            {/* Narrative Explanation */}
            <div className="bg-[#FAF5FF]/80 rounded-xl p-4 border border-[#E9D5FF] text-slate-700 text-sm leading-relaxed space-y-2.5">
            <p>
              Think of your arteries like water pipes. Your{' '}
              <span className="text-[#6B38D4] font-semibold">LDL (bad cholesterol) of 135</span> is
              like having{' '}
              <span className="text-[#6B38D4] font-semibold italic">&ldquo;sticky clutter in a pipe&rdquo;</span>
              —it&apos;s starting to accumulate, which makes it harder for blood to flow smoothly.
            </p>
            <p>
              While your &ldquo;pipe-clearing&rdquo; HDL (good cholesterol) is doing well at 55, the total amount of clutter has increased. Compared to your March 2026 reading (130 mg/dL), your LDL has{' '}
              <span className="text-[#6B38D4] font-semibold">risen by 3.8% (+5 points)</span>, and by{' '}
              <span className="text-[#6B38D4] font-semibold">5.5% (+7 points) since January 2026 (128 mg/dL)</span>. Minor dietary tweaks focusing on soluble fiber could help &ldquo;scrub&rdquo; those pipes clean.
            </p>
          </div>

          {/* Key Findings Structured Rows */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-[#6B38D4] tracking-wider uppercase block">
              Key Findings
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* LDL Cholesterol */}
              <div className="p-2.5 rounded-xl bg-slate-50/90 border border-slate-200/70 flex flex-col justify-between shadow-2xs">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-semibold text-[#1E1B4B]">LDL Cholesterol</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                </div>
                <div className="flex items-baseline gap-1 my-0.5">
                  <span className="text-base font-bold text-rose-600 font-inter">135</span>
                  <span className="text-[10px] text-slate-500 font-medium font-inter">mg/dL</span>
                </div>
                <span className="text-[10.5px] font-medium text-rose-600/90 leading-tight">Above target range</span>
              </div>

              {/* HDL Cholesterol */}
              <div className="p-2.5 rounded-xl bg-slate-50/90 border border-slate-200/70 flex flex-col justify-between shadow-2xs">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-semibold text-[#1E1B4B]">HDL Cholesterol</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                </div>
                <div className="flex items-baseline gap-1 my-0.5">
                  <span className="text-base font-bold text-emerald-700 font-inter">55</span>
                  <span className="text-[10px] text-slate-500 font-medium font-inter">mg/dL</span>
                </div>
                <span className="text-[10.5px] font-medium text-emerald-700/90 leading-tight">Within healthy range</span>
              </div>

              {/* Total Cholesterol */}
              <div className="p-2.5 rounded-xl bg-slate-50/90 border border-slate-200/70 flex flex-col justify-between shadow-2xs">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-semibold text-[#1E1B4B]">Total Cholesterol</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                </div>
                <div className="flex items-baseline gap-1 my-0.5">
                  <span className="text-base font-bold text-amber-700 font-inter">210</span>
                  <span className="text-[10px] text-slate-500 font-medium font-inter">mg/dL</span>
                </div>
                <span className="text-[10.5px] font-medium text-amber-700/90 leading-tight">Borderline elevated</span>
              </div>
            </div>
          </div>

            {/* Compact Trend Summary */}
            <div className="p-2.5 sm:p-3 rounded-xl bg-[#FAF5FF]/80 border border-[#E9D5FF] flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-md bg-[#EDE9FE] flex items-center justify-center shrink-0 mt-0.5 text-[#6B38D4]">
                <TrendingUp className="w-3.5 h-3.5 text-[#6B38D4]" />
              </div>
              <div className="text-xs leading-relaxed text-slate-700">
                <span className="font-bold text-[#1E1B4B] mr-1">Trend Summary:</span>
                Your LDL has increased compared with the previous reading. The latest result is the primary value flagged for follow-up.
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-3 mt-auto">
            <button
              type="button"
              onClick={onAskAi}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#6366F1] hover:bg-[#4F46E5] text-white text-xs sm:text-sm font-semibold shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#6366F1]/50 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Ask HealthBridge AI about LDL</span>
            </button>

            <button
              type="button"
              onClick={onViewDiets}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-[#6366F1] border border-[#6366F1]/40 text-xs sm:text-sm font-semibold shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#6366F1]/30 cursor-pointer"
            >
              <Apple className="w-4 h-4" />
              <span>View Suggested Heart-Healthy Diets</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

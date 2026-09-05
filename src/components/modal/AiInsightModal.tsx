import React, { useEffect, useRef } from 'react';
import {
  X,
  Sparkles,
  BarChart2,
  Heart,
  FlaskConical,
  PlusSquare,
  Scan,
  Share2,
  Stethoscope,
  Check,
  Info,
  Calendar,
  Download,
  ArrowRight
} from 'lucide-react';
import {
  OverallHealthTrend,
  RecordsSummary,
  InsightCardData,
  RiskCategory,
  AiRecommendationItem
} from '../../types/ai-insight';
import { PatientProfile } from '../../types/medical';
import { generateSummaryPdf } from '../../utils/pdfGenerator';

interface AiInsightModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: PatientProfile;
  trend: OverallHealthTrend;
  recordsSummary: RecordsSummary;
  insights: InsightCardData[];
  risks: RiskCategory[];
  recommendations: AiRecommendationItem[];
  onToggleRecommendation: (id: string) => void;
  onViewTimeline: () => void;
}

export const AiInsightModal: React.FC<AiInsightModalProps> = ({
  isOpen,
  onClose,
  patient,
  trend,
  recordsSummary,
  insights,
  risks,
  recommendations,
  onToggleRecommendation,
  onViewTimeline
}) => {
  const modalContentRef = useRef<HTMLDivElement>(null);

  // Close on ESC & lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownloadPdf = () => {
    generateSummaryPdf({
      patient,
      trend,
      records: recordsSummary,
      insights,
      risks,
      recommendations
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
    >
      {/* Blurred & Dimmed Backdrop - Medical screen remains visible */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-md cursor-pointer transition-opacity"
      />

      {/* Solid Opaque White Modal Dialog Card */}
      <div
        ref={modalContentRef}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-[880px] bg-white rounded-[24px] border border-slate-200 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] flex flex-col max-h-[92vh] overflow-hidden my-auto"
      >
        {/* Header Section */}
        <div className="bg-[#F8FAFC] border-b border-slate-100 p-4 sm:p-6 sm:pb-5 flex items-start justify-between gap-4 shrink-0">
          <div className="flex items-start gap-3.5 sm:gap-4">
            {/* Sparkle squircle icon container */}
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-[12px] bg-gradient-to-br from-[#BC9CFF] to-[#5C24FF] flex items-center justify-center text-white shrink-0 shadow-xs">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>

            <div className="flex flex-col">
              <h2 id="modal-title" className="text-xl sm:text-[24px] font-semibold text-black tracking-[-0.24px] leading-snug font-inter">
                AI Insight Summary
              </h2>
              <p className="text-xs sm:text-[14px] text-[#434654] leading-relaxed mt-0.5 font-inter">
                Comprehensive detection from your recent health records, lab reports, medications, and vitals.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-5 no-scrollbar bg-white">
          {/* 1. OVERALL HEALTH TREND Card */}
          <div className="rounded-[8px] border border-[#C3C6D6] p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs bg-white">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] sm:text-[12px] font-semibold text-[#5C5F60] uppercase tracking-[0.60px]">
                OVERALL HEALTH TREND
              </span>
              <div className="flex items-baseline gap-2.5">
                <span className="text-2xl sm:text-[32px] font-bold text-black tracking-tight leading-none font-inter">
                  {trend.percentage}
                </span>
                <span className="text-sm sm:text-[16px] font-semibold text-black font-inter">
                  {trend.label}
                </span>
              </div>
            </div>

            {/* Ascending purple bar visualization */}
            <div className="flex items-end gap-1.5 sm:gap-2 h-16 self-end sm:self-auto pr-1 sm:pr-2">
              <div className="w-3 sm:w-3.5 h-[18px] rounded-t-[3px] bg-[#E0D4FC]" />
              <div className="w-3 sm:w-3.5 h-[26px] rounded-t-[3px] bg-[#C9B3FB]" />
              <div className="w-3 sm:w-3.5 h-[34px] rounded-t-[3px] bg-[#B18CFE]" />
              <div className="w-3 sm:w-3.5 h-[44px] rounded-t-[3px] bg-[#9463FD]" />
              <div className="w-3 sm:w-3.5 h-[54px] rounded-t-[3px] bg-[#7A42FE]" />
              <div className="w-3 sm:w-3.5 h-[64px] rounded-t-[3px] bg-[#5C24FF]" />
            </div>
          </div>

          {/* 2. RECORDS SUMMARY Horizontal Bar */}
          <div className="rounded-[4px] border border-dashed border-[#C3C6D6] bg-[#EEF2FF]/40 px-4 py-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs">
            <div className="flex items-center gap-2 text-black font-semibold tracking-wide">
              <BarChart2 className="w-3.5 h-3.5 text-slate-800" />
              <span>{recordsSummary.totalAnalyzed} Records Analyzed</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-[#434654] font-semibold text-xs tracking-wide">
              <span>{recordsSummary.labs} Labs</span>
              <span>{recordsSummary.prescriptions} Prescriptions</span>
              <span>{recordsSummary.vitals} Vitals</span>
              <span>{recordsSummary.consultations} Consultations</span>
            </div>
          </div>

          {/* 3. INSIGHT CARDS (2-Column Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {insights.map((card) => {
              // Card 1: Blood Pressure
              if (card.type === 'blood-pressure') {
                return (
                  <div
                    key={card.id}
                    className="rounded-[8px] border border-[#C3C6D6] p-4 flex flex-col justify-between gap-2.5 shadow-xs bg-white"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-[4px] bg-[#D1FAE5] flex items-center justify-center text-[#059669]">
                          <Heart className="w-4 h-4 fill-[#059669]" />
                        </div>
                        <span className="text-sm sm:text-base font-semibold text-black font-inter">
                          {card.title}
                        </span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669] text-xs font-semibold tracking-wide">
                        {card.statusBadge.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <span className="line-through text-base text-[#5C5F60] font-inter">
                        {card.previousValue}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-base font-bold text-black font-inter">
                        {card.primaryValue}
                      </span>
                    </div>
                  </div>
                );
              }

              // Card 2: Lab Result Alert
              if (card.type === 'lab-alert') {
                return (
                  <div
                    key={card.id}
                    className="rounded-[8px] border border-[#FFDAD6] bg-[#FFDAD6]/10 p-4 flex flex-col justify-between gap-2 shadow-xs"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-[4px] bg-[#FFDAD6] flex items-center justify-center text-[#BA1A1A]">
                          <FlaskConical className="w-4 h-4" />
                        </div>
                        <span className="text-sm sm:text-base font-semibold text-black font-inter">
                          {card.title}
                        </span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#BA1A1A]/10 text-[#BA1A1A] text-xs font-semibold tracking-wide">
                        {card.statusBadge.label}
                      </span>
                    </div>

                    <div className="flex flex-col pt-1">
                      <span className="text-base font-bold text-black font-inter">{card.primaryValue}</span>
                      <span className="text-xs sm:text-[13px] text-[#5C5F60] font-inter">
                        {card.targetSubtext}
                      </span>
                    </div>
                  </div>
                );
              }

              // Card 3: Adherence
              if (card.type === 'adherence') {
                return (
                  <div
                    key={card.id}
                    className="rounded-[8px] border border-[#C3C6D6] p-4 flex flex-col justify-between gap-2.5 shadow-xs bg-white"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-[4px] bg-[#FCE7F3] flex items-center justify-center text-[#DB2777]">
                          <PlusSquare className="w-4 h-4" />
                        </div>
                        <span className="text-sm sm:text-base font-semibold text-black font-inter">
                          {card.title}
                        </span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#FDF2F8] text-[#DB2777] text-xs font-semibold tracking-wide">
                        {card.statusBadge.label}
                      </span>
                    </div>

                    <div className="flex items-baseline gap-1.5 pt-1">
                      <span className="text-base font-bold text-black font-inter">{card.primaryValue}</span>
                      <span className="text-sm text-[#5C5F60] font-inter">{card.highlightText}</span>
                    </div>
                  </div>
                );
              }

              // Card 4: Imaging
              return (
                <div
                  key={card.id}
                  className="rounded-[8px] border border-[#C3C6D6] p-4 flex flex-col justify-between gap-2 shadow-xs bg-white"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-[4px] bg-[#FFEDD5] flex items-center justify-center text-orange-600">
                        <Scan className="w-4 h-4" />
                      </div>
                      <span className="text-sm sm:text-base font-semibold text-black font-inter">
                        {card.title}
                      </span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#E0E8FF] text-[#434654] text-xs font-semibold tracking-wide">
                      {card.statusBadge.label}
                    </span>
                  </div>

                  <div className="flex flex-col pt-1">
                    <span className="text-sm sm:text-base font-medium text-black font-inter">
                      {card.primaryValue}
                    </span>
                    <span className="text-xs sm:text-[13px] text-[#5C5F60] font-inter">
                      {card.dateSubtext}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 4. AI DETECTED CONNECTIONS */}
          <div className="rounded-[8px] border border-[#C3C6D6] bg-[#EEF2FF]/20 p-4 sm:p-5 flex flex-col gap-3.5">
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-purple-600" />
              <h3 className="text-sm sm:text-base font-semibold text-black font-inter">
                AI Detected Connections
              </h3>
            </div>

            {/* Connection Flow Strip */}
            <div className="flex items-center justify-between overflow-x-auto no-scrollbar gap-2 sm:gap-4 py-1">
              {/* Step 1: Medication */}
              <div className="flex flex-col items-center gap-1.5 shrink-0">
                <div className="w-10 h-10 rounded-[12px] bg-white border border-[#C3C6D6] shadow-xs flex items-center justify-center text-pink-500">
                  <PlusSquare className="w-4 h-4 text-pink-500" />
                </div>
                <span className="text-xs font-semibold text-black">Medication</span>
              </div>

              <div className="text-slate-400 font-bold shrink-0">→</div>

              {/* Step 2: Lab Test */}
              <div className="flex flex-col items-center gap-1.5 shrink-0">
                <div className="w-10 h-10 rounded-[12px] bg-white border border-[#C3C6D6] shadow-xs flex items-center justify-center text-purple-600">
                  <FlaskConical className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-black">Lab Test</span>
              </div>

              <div className="text-slate-400 font-bold shrink-0">→</div>

              {/* Step 3: Consultation */}
              <div className="flex flex-col items-center gap-1.5 shrink-0">
                <div className="w-10 h-10 rounded-[12px] bg-white border border-[#C3C6D6] shadow-xs flex items-center justify-center text-indigo-600">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-black">Consultation</span>
              </div>

              <div className="text-slate-400 font-bold shrink-0">→</div>

              {/* Step 4: Goal Met (Purple Filled) */}
              <div className="flex flex-col items-center gap-1.5 shrink-0">
                <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-[#BC9CFF] to-[#5C24FF] shadow-md flex items-center justify-center text-white">
                  <Check className="w-5 h-5 stroke-[2.5]" />
                </div>
                <span className="text-xs font-bold text-black">Goal Met</span>
              </div>
            </div>
          </div>

          {/* 5. RISK SUMMARY BADGES */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            {risks.map((risk) => (
              <div
                key={risk.id}
                className="rounded-[4px] border border-[#C3C6D6] p-3 text-center flex flex-col justify-center bg-white shadow-xs"
              >
                <span className="text-[11px] font-semibold text-[#5C5F60] uppercase tracking-wider">
                  {risk.title}
                </span>
                <span
                  className={`text-sm sm:text-base font-bold mt-1 font-inter ${
                    risk.variant === 'moderate' ? 'text-[#432F9C]' : 'text-black'
                  }`}
                >
                  {risk.level}
                </span>
              </div>
            ))}
          </div>

          {/* 6. AI RECOMMENDATIONS */}
          <div className="flex flex-col gap-2.5 pt-1">
            <h3 className="text-lg sm:text-[20px] font-semibold text-black font-inter">
              AI Recommendations
            </h3>

            <div className="flex flex-col gap-2">
              {recommendations.map((rec) => (
                <label
                  key={rec.id}
                  className={`rounded-[4px] p-3 sm:p-3.5 flex items-start gap-3 border transition-all cursor-pointer select-none ${
                    rec.checked
                      ? 'bg-purple-100/50 border-purple-300 text-purple-950 shadow-xs'
                      : 'bg-[#EEF2FF]/40 border-transparent hover:bg-[#EEF2FF]/70 text-black'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={rec.checked}
                    onChange={() => onToggleRecommendation(rec.id)}
                    className="mt-0.5 w-4 h-4 rounded border-slate-400 text-[#5C24FF] focus:ring-[#5C24FF] cursor-pointer shrink-0"
                  />
                  <span className={`text-xs sm:text-[15px] leading-snug font-inter ${rec.checked ? 'font-medium' : 'font-normal'}`}>
                    {rec.text}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* 7. INFORMATION DISCLAIMER */}
          <div className="rounded-[4px] border-l-4 border-l-[#818CF8] bg-[#EEF2FF]/50 p-3.5 sm:p-4 flex items-start gap-3 text-xs sm:text-[13.5px] text-[#5C5F60] italic leading-relaxed">
            <Info className="w-4 h-4 text-purple-600 shrink-0 mt-0.5 not-italic" />
            <p className="m-0">
              This AI summary is for informational purposes only. It is generated based on digital records and should be reviewed with your primary healthcare provider.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-white border-t border-slate-200/80 p-3.5 sm:p-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-[8px] border border-[#737685] text-xs font-semibold text-[#5C5F60] hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Close
          </button>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onViewTimeline}
              className="w-full sm:w-auto px-5 py-2.5 rounded-[8px] border border-black hover:bg-slate-50 text-black text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-black" />
              <span>View Full Timeline</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadPdf}
              className="w-full sm:w-auto px-6 py-2.5 rounded-[8px] bg-gradient-to-r from-[#B18CFE] to-[#5C24FF] hover:opacity-95 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-white" />
              <span>Download Summary PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

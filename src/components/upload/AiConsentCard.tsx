import React from 'react';
import { CheckCircle2, Sparkles, Check } from 'lucide-react';
import { QueuedFile } from '../../types/upload';

interface AiConsentCardProps {
  file: QueuedFile;
  onAnalyzeDocument: () => void;
  onSkipForNow: () => void;
}

export const AiConsentCard: React.FC<AiConsentCardProps> = ({
  file,
  onAnalyzeDocument,
  onSkipForNow
}) => {
  return (
    <div className="w-full flex flex-col gap-4">
      {/* Top Banner: Document Upload successfully */}
      <div
        data-testid="document-upload-success-banner"
        className="w-full bg-[#F8F9FA] rounded-[18px] sm:rounded-[20px] p-4 sm:p-4.5 border border-slate-200/80 flex flex-col gap-1 shadow-2xs"
      >
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 shrink-0 fill-emerald-50" />
          <h3 className="text-sm sm:text-base font-bold text-slate-900 font-inter">
            Document Upload  successfully
          </h3>
        </div>
        <div className="pl-6 sm:pl-7 flex flex-col gap-0.5">
          <span className="text-xs sm:text-[13px] font-semibold text-slate-800">
            {file.fileName}
          </span>
          <span className="text-[11px] sm:text-xs text-slate-500 font-normal">
            {file.fileSize} • {file.status}
          </span>
        </div>
      </div>

      {/* AI Document Analysis Card */}
      <div
        data-testid="ai-document-analysis-consent-card"
        className="w-full rounded-[24px] sm:rounded-[28px] p-5 sm:p-6 border-2 border-purple-200 bg-[#FAF8FE] flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 shadow-xs relative"
      >
        {/* Left: AI Robot Avatar */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shrink-0 border-2 border-purple-200/70 shadow-xs bg-[#EDE9FE] flex items-center justify-center">
          <img
            src="/assets/upload/ai-robot-avatar.png"
            alt="AI Document Analysis Assistant"
            className="w-full h-full object-cover select-none pointer-events-none"
          />
        </div>

        {/* Right Content */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* Header Row */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center text-white shrink-0 shadow-2xs">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="font-bold text-xs sm:text-sm text-slate-900 font-inter">
              AI Document Analysis
            </span>
            <span className="text-xs text-slate-400 font-normal">
              (With Your Consent)
            </span>
            <span className="bg-[#EDE9FE] text-[#7C3AED] text-[9.5px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
              BETA
            </span>
          </div>

          {/* Question */}
          <h4 className="text-base sm:text-[17px] lg:text-lg font-bold text-slate-900 leading-snug font-inter mt-2">
            Do you want me to scan this document and add the important details to your health timeline?
          </h4>

          {/* Explanation */}
          <p className="text-xs sm:text-[13px] text-slate-600 font-normal leading-relaxed mt-2">
            I'll extract dates, test names, results, diagnoses, medications, and provider information so you can track trends and access records faster.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <button
              type="button"
              onClick={onAnalyzeDocument}
              data-testid="yes-analyze-document-button"
              className="h-[40px] sm:h-[42px] px-5 sm:px-6 rounded-full bg-[#5C24FF] hover:bg-[#4F1CE6] active:scale-[0.99] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <div className="w-4 h-4 rounded-full border border-white/60 flex items-center justify-center shrink-0">
                <Check className="w-2.5 h-2.5 text-white" />
              </div>
              <span>Yes, Analyze Document</span>
            </button>

            <button
              type="button"
              onClick={onSkipForNow}
              data-testid="skip-for-now-button"
              className="h-[40px] sm:h-[42px] px-5 sm:px-6 rounded-full bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm border border-slate-200 shadow-2xs transition-all cursor-pointer"
            >
              Skip for Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

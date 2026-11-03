import React, { useEffect, useState } from 'react';
import { CheckCircle2, Clock, Info, Sparkles, Loader2 } from 'lucide-react';
import { ProcessingStep } from '../../types/upload';
import { initialProcessingSteps } from '../../data/uploadData';

interface AiProcessingModalProps {
  isOpen: boolean;
  onComplete: () => void;
  onClose?: () => void;
}

export const AiProcessingModal: React.FC<AiProcessingModalProps> = ({
  isOpen,
  onComplete,
  onClose
}) => {
  const [progress, setProgress] = useState(82);
  const [steps, setSteps] = useState<ProcessingStep[]>(initialProcessingSteps);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Simulated progressive analysis transition to success
  useEffect(() => {
    if (!isOpen) return;

    // After 2.5 seconds, advance step 3 and 4, reach 100% and complete
    const timer1 = setTimeout(() => {
      setProgress(94);
      setSteps((prev) =>
        prev.map((s) => (s.id === 'step-3' ? { ...s, status: 'completed' } : s))
      );
    }, 2200);

    const timer2 = setTimeout(() => {
      setProgress(100);
      setSteps((prev) =>
        prev.map((s) => ({ ...s, status: 'completed' }))
      );
    }, 3200);

    const timer3 = setTimeout(() => {
      onComplete();
    }, 3800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isOpen, onComplete]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="analyzing-modal-title"
      data-testid="ai-processing-modal-backdrop"
      className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <div
        data-testid="ai-processing-modal-content"
        className="w-full max-w-[540px] sm:max-w-[580px] bg-white rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 shadow-2xl relative flex flex-col items-center border border-slate-100 animate-scale-up my-auto"
      >
        {/* Fast-forward complete button for testing */}
        <button
          type="button"
          onClick={onComplete}
          data-testid="fast-forward-analysis-button"
          className="sr-only"
          aria-label="Skip to completion"
        >
          Skip to completion
        </button>

        {/* Top: Circular AI Robot Header Badge */}
        <div className="w-22 h-22 sm:w-26 sm:h-26 rounded-full bg-gradient-to-b from-[#FAF8FE] to-[#EDE9FE] border-2 border-purple-200/80 p-2 flex items-center justify-center relative shadow-sm">
          <img
            src="/assets/upload/ai-robot-modal.png"
            alt="AI Analyzing Assistant"
            className="w-full h-full object-contain select-none pointer-events-none"
          />
          {/* Sparkle Badge */}
          <div className="w-6 h-6 rounded-full bg-white shadow-xs border border-purple-200 flex items-center justify-center text-[#7C3AED] absolute top-1 right-1">
            <Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" />
          </div>
        </div>

        {/* Modal Title */}
        <h3
          id="analyzing-modal-title"
          className="text-xl sm:text-2xl font-bold text-slate-900 text-center font-inter mt-3.5"
        >
          Analyzing Your Medical Document
        </h3>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-slate-500 text-center font-normal mt-1 mb-5">
          Our AI is extracting and organizing important health information.
        </p>

        {/* Progress Container */}
        <div className="w-full bg-[#FAF8FE] rounded-2xl p-4 sm:p-5 border border-purple-100 flex flex-col gap-2.5 mb-5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-bold text-[#5C24FF] tracking-wider uppercase font-inter">
              CURRENT STATUS
            </span>
            <span className="text-base sm:text-lg font-bold text-[#5C24FF] font-inter">
              {progress}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2.5 sm:h-3 bg-slate-200/70 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Estimated Time */}
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 pt-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Estimated Time: 5–10 Seconds</span>
          </div>
        </div>

        {/* 4 Processing Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full mb-5">
          {steps.map((step) => {
            const isCompleted = step.status === 'completed';
            const isActive = step.status === 'active';

            return (
              <div
                key={step.id}
                data-testid={`processing-step-${step.id}`}
                className={`rounded-xl p-3 sm:p-3.5 flex items-center justify-between gap-2.5 border transition-all ${
                  isCompleted
                    ? 'bg-[#F4F1FD] border-purple-100/80 text-slate-800'
                    : isActive
                    ? 'bg-[#F0ECFD] border-[#7C3AED]/40 text-[#5C24FF] shadow-2xs'
                    : 'bg-[#FAF8FE] border-slate-200/60 text-slate-400'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-50 shrink-0" />
                  ) : isActive ? (
                    <Loader2 className="w-4 h-4 text-[#7C3AED] animate-spin shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                  )}
                  <span className="text-xs sm:text-[13px] font-semibold truncate font-inter">
                    {step.label}
                  </span>
                </div>

                {isActive && (
                  <Sparkles className="w-3.5 h-3.5 text-[#7C3AED] shrink-0 animate-pulse" />
                )}
              </div>
            );
          })}
        </div>

        {/* Security / Encryption Information Note */}
        <div className="bg-[#F9F7FE] border border-purple-100 rounded-xl p-3.5 sm:p-4 flex items-start gap-2.5 w-full text-slate-600">
          <Info className="w-4 h-4 text-[#7C3AED] shrink-0 mt-0.5" />
          <p className="text-[11px] sm:text-xs leading-relaxed font-normal">
            Clinical Clarity's AI is processing your document securely. Your data is encrypted and used only for your health insights. We ensure medical terminology is mapped correctly to your personal health history.
          </p>
        </div>
      </div>
    </div>
  );
};

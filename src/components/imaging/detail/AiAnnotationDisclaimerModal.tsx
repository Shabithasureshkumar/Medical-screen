import React, { useEffect, useRef } from 'react';
import { AlertTriangle } from 'lucide-react';

interface AiAnnotationDisclaimerModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onEnable: () => void;
}

export const AiAnnotationDisclaimerModal: React.FC<AiAnnotationDisclaimerModalProps> = ({
  isOpen,
  onCancel,
  onEnable
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Handle Escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onCancel();
        }
      }}
      role="presentation"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ai-disclaimer-title"
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-5 border border-slate-100 transition-all transform scale-100"
      >
        {/* Warning Icon */}
        <div className="w-12 h-12 rounded-2xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center">
          <AlertTriangle className="w-6 h-6" />
        </div>

        {/* Title & Description */}
        <div className="space-y-3">
          <h3 id="ai-disclaimer-title" className="text-xl sm:text-2xl font-bold text-slate-900">
            AI Annotation Disclaimer
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            AI annotations are <strong className="font-bold text-slate-900">investigational</strong> and
            intended to assist understanding only. They are not a medical diagnosis and should not replace a
            qualified radiologist's interpretation of imaging studies.
          </p>
        </div>

        {/* Callout box */}
        <div className="bg-[#FFFBEB] border border-[#FDE68A] text-[#92400E] text-xs sm:text-sm p-4 rounded-xl leading-relaxed">
          These AI-generated findings are experimental and have not been validated as a medical device. Always
          consult your healthcare provider for clinical decisions.
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 px-5 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-300"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onEnable}
            className="flex-1 py-3 px-5 text-sm font-semibold text-white bg-[#7C3AED] hover:bg-[#6D28D9] rounded-xl shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            Enable
          </button>
        </div>
      </div>
    </div>
  );
};

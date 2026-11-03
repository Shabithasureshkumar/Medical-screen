import React, { useEffect } from 'react';
import { 
  Check, 
  Sparkles, 
  FileCheck, 
  Activity, 
  FlaskConical, 
  Calendar, 
  FileText 
} from 'lucide-react';
import { successStatusRows } from '../../data/uploadData';

interface DocumentSuccessModalProps {
  isOpen: boolean;
  onDone: () => void;
  onViewTimeline: () => void;
  onViewRecord: () => void;
  onClose?: () => void;
}

export const DocumentSuccessModal: React.FC<DocumentSuccessModalProps> = ({
  isOpen,
  onDone,
  onViewTimeline,
  onViewRecord,
  onClose
}) => {
  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose ? onClose() : onDone();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onDone, onClose]);

  // Lock body scroll
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

  if (!isOpen) return null;

  const renderStatusIcon = (iconName: string) => {
    switch (iconName) {
      case 'record':
        return <FileCheck className="w-4 h-4 text-[#7C3AED]" />;
      case 'timeline':
        return <Activity className="w-4 h-4 text-[#7C3AED]" />;
      case 'lab':
        return <FlaskConical className="w-4 h-4 text-[#7C3AED]" />;
      case 'insight':
      default:
        return <Sparkles className="w-4 h-4 text-[#7C3AED]" />;
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-modal-title"
      data-testid="document-success-modal-backdrop"
      className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <div
        data-testid="document-success-modal-content"
        className="w-full max-w-[680px] sm:max-w-[720px] bg-white rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-slate-100 my-auto animate-scale-up"
      >
        {/* Left Purple Hero Panel */}
        <div className="bg-gradient-to-b from-[#8B5CF6] via-[#7C3AED] to-[#5C24FF] p-6 sm:p-8 text-white flex flex-col items-center justify-center text-center relative overflow-hidden md:w-[42%] shrink-0">
          {/* Subtle Sparkle Decors */}
          <Sparkles className="w-4 h-4 text-white/30 absolute top-4 left-4" />
          <Sparkles className="w-3.5 h-3.5 text-white/30 absolute bottom-6 right-6" />

          {/* Centered Check Badge */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-[22px] sm:rounded-[26px] bg-white/20 border border-white/30 flex items-center justify-center shadow-inner mb-4 sm:mb-5">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center text-[#7C3AED] shadow-sm">
              <Check className="w-7 h-7 sm:w-8 sm:h-8 stroke-[3] text-[#7C3AED]" />
            </div>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-inter">
            Success!
          </h3>

          <p className="text-xs sm:text-[13px] text-purple-100 font-normal leading-relaxed max-w-[210px]">
            Your clinical files have been verified and integrated.
          </p>
        </div>

        {/* Right Details Panel */}
        <div className="p-5 sm:p-7 sm:pl-6 flex flex-col justify-between flex-1 min-w-0 bg-white">
          <div>
            <h4
              id="success-modal-title"
              className="text-lg sm:text-xl font-bold text-slate-900 mb-1 font-inter"
            >
              Document Successfully Processed
            </h4>

            <p className="text-xs sm:text-sm text-slate-500 mb-4 sm:mb-5 font-normal">
              Systems synchronized with the latest health data.
            </p>

            {/* 4 Status Rows */}
            <div className="flex flex-col gap-2.5 mb-5">
              {successStatusRows.map((row) => (
                <div
                  key={row.id}
                  data-testid={`success-status-${row.id}`}
                  className="bg-[#F8F6FE] rounded-xl p-3 sm:p-3.5 flex items-center gap-3 border border-purple-50/60"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#EDE9FE] flex items-center justify-center shrink-0">
                    {renderStatusIcon(row.iconName)}
                  </div>
                  <span className="text-xs sm:text-[13px] font-semibold text-slate-800 font-inter">
                    {row.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2.5 pt-2">
            {/* Done Primary Button */}
            <button
              type="button"
              onClick={onDone}
              data-testid="success-done-button"
              className="w-full h-[42px] sm:h-[46px] rounded-full bg-[#5C24FF] hover:bg-[#4F1CE6] active:scale-[0.99] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center"
            >
              Done
            </button>

            {/* View Timeline & View Record Secondary Buttons */}
            <div className="flex items-center gap-2.5 w-full">
              <button
                type="button"
                onClick={onViewTimeline}
                data-testid="view-timeline-button"
                className="flex-1 h-[38px] sm:h-[40px] rounded-full border border-purple-200 hover:border-purple-300 text-purple-700 hover:bg-purple-50/70 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span>View Timeline</span>
              </button>

              <button
                type="button"
                onClick={onViewRecord}
                data-testid="view-record-button"
                className="flex-1 h-[38px] sm:h-[40px] rounded-full border border-purple-200 hover:border-purple-300 text-purple-700 hover:bg-purple-50/70 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span>View Record</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

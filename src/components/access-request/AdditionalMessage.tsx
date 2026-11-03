import React from 'react';

interface AdditionalMessageProps {
  message: string;
  onMessageChange: (val: string) => void;
  title?: string;
  placeholder?: string;
}

export const AdditionalMessage: React.FC<AdditionalMessageProps> = ({
  message,
  onMessageChange,
  title = 'Additional Note',
  placeholder = 'Explain why you are sharing these records...'
}) => {
  return (
    <div className="w-full rounded-[20px] sm:rounded-[24px] bg-[#F8FAFC] border border-slate-200/70 p-4 sm:p-5 flex flex-col gap-3 shadow-xs">
      <h2 className="text-sm sm:text-base font-bold text-[#0F172A] font-inter">
        {title}
      </h2>
      <textarea
        value={message}
        onChange={(e) => onMessageChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        data-testid="additional-message-textarea"
        aria-label={title}
        className="w-full rounded-[16px] sm:rounded-[20px] bg-white border border-slate-200/80 p-3.5 sm:p-4 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-purple-100 transition-all resize-none shadow-xs font-inter"
      />
    </div>
  );
};

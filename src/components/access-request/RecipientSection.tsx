import React from 'react';
import { AtSign } from 'lucide-react';

interface RecipientSectionProps {
  email: string;
  onEmailChange: (value: string) => void;
  placeholder?: string;
}

export const RecipientSection: React.FC<RecipientSectionProps> = ({
  email,
  onEmailChange,
  placeholder = "Doctor's email address"
}) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <label
        htmlFor="recipient-email-input"
        className="text-[11px] sm:text-xs font-bold text-[#64748B] tracking-wider uppercase font-inter"
      >
        Recipient Information
      </label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-3.5 sm:pl-4 flex items-center pointer-events-none text-[#7C3AED]">
          <AtSign className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <input
          id="recipient-email-input"
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder={placeholder}
          data-testid="recipient-email-input"
          className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-3.5 rounded-full sm:rounded-[24px] bg-white border border-slate-200/90 hover:border-purple-300 focus:border-[#7C3AED] text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-100 transition-all font-inter shadow-xs"
        />
      </div>
    </div>
  );
};

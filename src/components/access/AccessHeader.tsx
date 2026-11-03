import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { AccessType } from '../../types/access';

interface AccessHeaderProps {
  onBackToDashboard: () => void;
  accessType: AccessType;
  onToggleAccessType: (type: AccessType) => void;
}

export const AccessHeader: React.FC<AccessHeaderProps> = ({
  onBackToDashboard,
  accessType,
  onToggleAccessType
}) => {
  return (
    <header className="w-full pb-2">
      {/* Breadcrumb Back Navigation */}
      <div className="mb-2 sm:mb-3">
        <button
          type="button"
          onClick={onBackToDashboard}
          data-testid="back-to-dashboard-breadcrumb"
          className="inline-flex items-center gap-1.5 fluid-breadcrumb font-semibold text-purple-700 hover:text-purple-900 transition-colors group cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-lg px-1 py-0.5"
          aria-label="Back to Dashboard"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-x-0.5 transition-transform text-purple-600" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Main Header Row: Title & Family/Doctor Access Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 min-w-0">
        {/* Title & Subtitle */}
        <div className="flex flex-col min-w-0 flex-1">
          <h1 className="fluid-h1 font-bold text-[#1D1B20] tracking-tight font-inter">
            Access History & Requests
          </h1>
          <p className="text-xs sm:text-sm md:text-[15px] text-[#7A7582] font-normal leading-relaxed font-inter mt-1 sm:mt-1.5">
            Monitor all permission requests, approvals, rejections, and sharing activities.
          </p>
        </div>

        {/* Purple Segmented Toggle: Family Access / Doctor Access */}
        <div className="shrink-0 self-start sm:self-auto">
          <div
            role="group"
            aria-label="Access type selection"
            className="inline-flex items-center p-1 sm:p-1.5 rounded-full bg-gradient-to-r from-[#7B3FE4] to-[#6021E6] shadow-md border border-white/20"
          >
            <button
              type="button"
              data-testid="toggle-family-access"
              aria-pressed={accessType === 'family'}
              onClick={() => onToggleAccessType('family')}
              className={`rounded-full px-3.5 xs:px-5 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                accessType === 'family'
                  ? 'bg-white text-[#6B38D4] shadow-sm'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              Family Access
            </button>
            <button
              type="button"
              data-testid="toggle-doctor-access"
              aria-pressed={accessType === 'doctor'}
              onClick={() => onToggleAccessType('doctor')}
              className={`rounded-full px-3.5 xs:px-5 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                accessType === 'doctor'
                  ? 'bg-white text-[#6B38D4] shadow-sm'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              Doctor Access
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ClinicType } from '../../types/accessRequest';

interface AccessRequestHeaderProps {
  clinicType: ClinicType;
  onClinicTypeChange: (type: ClinicType) => void;
  onBackToDashboard: () => void;
}

export const AccessRequestHeader: React.FC<AccessRequestHeaderProps> = ({
  clinicType,
  onClinicTypeChange,
  onBackToDashboard
}) => {
  return (
    <div className="w-full flex flex-col gap-4 pb-2">
      {/* Breadcrumb Row */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onBackToDashboard}
          data-testid="back-to-dashboard-breadcrumb"
          className="inline-flex items-center gap-2 fluid-breadcrumb font-semibold text-[#6B38D4] hover:text-[#5221B5] transition-colors cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-md py-1 px-1.5 -ml-1.5"
          aria-label="Back to Dashboard"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Title + Toggle Row */}
      <div className="w-full flex flex-col md:flex-row md:items-start justify-between gap-4">
        {/* Left: Heading + Description */}
        <div className="flex flex-col gap-1.5 max-w-2xl">
          <h1 className="fluid-h1-lg font-bold text-[#0F172A] tracking-[-0.5px] font-inter">
            Access Request
          </h1>
          <p className="fluid-subtitle text-[#64748B] leading-relaxed font-inter">
            Securely share your medical history and clinical reports with healthcare professionals. Control exactly what they see and for how long.
          </p>
        </div>

        {/* Right: Segmented Switch (Inside Clinic vs External) */}
        <div
          role="tablist"
          aria-label="Clinic selection mode"
          className="self-start md:self-auto inline-flex p-1 rounded-full border-2 border-[#7C3AED] bg-white shadow-xs shrink-0"
        >
          <button
            type="button"
            role="tab"
            aria-selected={clinicType === 'inside'}
            data-testid="toggle-inside-clinic"
            onClick={() => onClinicTypeChange('inside')}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${
              clinicType === 'inside'
                ? 'bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white shadow-sm'
                : 'bg-transparent text-[#6D28D9] hover:bg-purple-50'
            }`}
          >
            Inside Clinic
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={clinicType === 'external'}
            data-testid="toggle-external"
            onClick={() => onClinicTypeChange('external')}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${
              clinicType === 'external'
                ? 'bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white shadow-sm'
                : 'bg-transparent text-[#6D28D9] hover:bg-purple-50'
            }`}
          >
            External
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Download, FileText, ArrowLeft, ArrowRightLeft, Upload } from 'lucide-react';

interface PrescriptionHeaderProps {
  onBackToDashboard: () => void;
  onDownloadPrescriptions: () => void;
  onViewPrescription: () => void;
  onUploadFile: () => void;
  onSwitchProfile?: () => void;
}

export const PrescriptionHeader: React.FC<PrescriptionHeaderProps> = ({
  onBackToDashboard,
  onDownloadPrescriptions,
  onViewPrescription,
  onUploadFile,
  onSwitchProfile
}) => {
  return (
    <header className="w-full pb-2">
      {/* Breadcrumb Back Navigation */}
      <div className="mb-2 sm:mb-3">
        <button
          type="button"
          onClick={onBackToDashboard}
          data-testid="back-to-dashboard-breadcrumb"
          className="inline-flex items-center gap-1.5 fluid-breadcrumb font-semibold text-purple-700 hover:text-purple-900 transition-colors group cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-lg px-1.5 py-0.5"
          aria-label="Back to Dashboard"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-x-0.5 transition-transform text-purple-600" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Main Header Row: Title & Profile Switcher */}
      <div className="flex items-start justify-between gap-3 sm:gap-4 lg:gap-6 min-w-0">
        {/* Title & Subtitle */}
        <div className="flex flex-col min-w-0 flex-1 max-w-[720px]">
          <h1 className="fluid-h1 font-bold text-[#1D1B20] tracking-tight font-inter">
            Prescription<span className="sm:inline block"> Intelligence Center</span>
          </h1>
          <p className="fluid-subtitle text-[#7A7582] font-normal leading-relaxed font-inter mt-1.5">
            Manage prescriptions, adherence, refills, and AI-powered medication insights.
          </p>
        </div>

        {/* David Brock / Self Profile Switcher */}
        <div className="shrink-0">
          <div className="fluid-profile-card bg-gradient-to-b from-[#AE8AF9] to-[#5C24FF] flex items-center justify-between text-white shadow-lg border border-white/30 backdrop-blur-md">
            <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
              <div className="fluid-profile-avatar overflow-hidden bg-white/20 shrink-0 border border-white/30">
                <img
                  src="/assets/avatars/david-brock-self.png"
                  alt="David Brock"
                  className="w-full h-full object-cover select-none pointer-events-none"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-bold fluid-profile-name font-inter truncate leading-tight">
                  David Brock
                </span>
                <span className="fluid-profile-role text-purple-200 font-medium font-inter">
                  Self
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={onSwitchProfile}
              data-testid="switch-profile-button"
              className="p-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer text-white/90 hover:text-white shrink-0"
              aria-label="Switch Profile Account"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 pt-3">
        {/* Desktop Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            type="button"
            onClick={onDownloadPrescriptions}
            data-testid="download-prescriptions-button"
            className="fluid-action-btn-sm rounded-full bg-[hsla(260,64%,53%,0.10)] hover:bg-purple-100 text-purple-700 font-semibold flex items-center justify-center gap-2 border border-purple-200/50 transition-all cursor-pointer shadow-2xs hover:shadow-xs shrink-0"
          >
            <Download className="w-4 h-4 text-purple-600 shrink-0" />
            <span className="bg-gradient-to-r from-[#9C73F2] to-[#5C24FF] bg-clip-text text-transparent font-semibold">
              Download Prescriptions
            </span>
          </button>

          <button
            type="button"
            onClick={onViewPrescription}
            data-testid="view-prescription-button"
            className="fluid-action-btn-sm rounded-full bg-gradient-to-b from-[#9C73F2] to-[#5C24FF] hover:opacity-95 text-white font-semibold flex items-center justify-center gap-2 shadow-xs hover:shadow-md transition-all cursor-pointer shrink-0"
          >
            <FileText className="w-4 h-4 text-white shrink-0" />
            <span>View Prescription</span>
          </button>
        </div>

        {/* Mobile Actions */}
        <div className="sm:hidden flex items-center gap-2.5 w-full min-w-0">
          <button
            type="button"
            onClick={onDownloadPrescriptions}
            data-testid="mobile-download-prescription-button"
            className="flex-1 min-w-0 h-[40px] rounded-full bg-[hsla(260,64%,53%,0.10)] hover:bg-purple-100 text-purple-700 font-semibold text-xs px-3 flex items-center justify-center gap-1.5 border border-purple-200/50 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-purple-600 shrink-0" />
            <span className="bg-gradient-to-r from-[#9C73F2] to-[#5C24FF] bg-clip-text text-transparent truncate">
              Download Prescription
            </span>
          </button>

          <button
            type="button"
            onClick={onUploadFile}
            data-testid="mobile-upload-file-button"
            className="flex-1 min-w-0 h-[40px] rounded-full bg-gradient-to-b from-[#9C73F2] to-[#5C24FF] hover:opacity-95 text-white font-semibold text-xs px-3 flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-white shrink-0" />
            <span className="truncate">Upload New File</span>
          </button>
        </div>
      </div>
    </header>
  );
};

import React from 'react';
import { ArrowLeft, ArrowRightLeft, Download, Upload } from 'lucide-react';
import { PatientProfile } from '../../types/medical';

interface ReportPdfHeaderProps {
  patient: PatientProfile;
  onBackToRecords: () => void;
  onDownloadPdf: () => void;
  onUploadNewFile: () => void;
  onSwitchProfile?: () => void;
  downloadDisabled?: boolean;
}

export const ReportPdfHeader: React.FC<ReportPdfHeaderProps> = ({
  patient,
  onBackToRecords,
  onDownloadPdf,
  onUploadNewFile,
  onSwitchProfile,
  downloadDisabled = false
}) => {
  return (
    <header className="w-full pb-2">
      {/* Breadcrumb back to the Reports listing */}
      <div className="mb-2 sm:mb-3">
        <button
          type="button"
          onClick={onBackToRecords}
          data-testid="back-to-records-breadcrumb"
          className="inline-flex items-center gap-1.5 fluid-breadcrumb font-semibold text-purple-700 hover:text-purple-900 transition-colors group cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-lg px-1.5 py-0.5"
          aria-label="Back to Medical Records"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-x-0.5 transition-transform text-purple-600" />
          <span>Back to Medical Records</span>
        </button>
      </div>

      <div className="flex items-start justify-between gap-3 sm:gap-4 lg:gap-6 min-w-0">
        <div className="flex flex-col min-w-0 flex-1 max-w-[760px]">
          <h1 className="fluid-h1 font-bold text-[#1D1B20] tracking-tight font-inter">
            Report Pdf view
          </h1>
          <p className="hidden md:block fluid-subtitle text-[#7A7582] font-normal leading-relaxed font-inter mt-1.5">
            Preview your medical record, prescriptions, adherence, refills, and AI-powered
            medication insights.
          </p>
        </div>

        {/* Active patient profile switcher */}
        <div className="shrink-0">
          <div className="fluid-profile-card bg-gradient-to-b from-[#AE8AF9] to-[#5C24FF] flex items-center justify-between text-white shadow-lg border border-white/30 backdrop-blur-md">
            <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
              <div className="fluid-profile-avatar overflow-hidden bg-white/20 shrink-0 border border-white/30">
                <img
                  src={patient.avatarUrl}
                  alt={patient.name}
                  className="w-full h-full object-cover select-none pointer-events-none"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-bold fluid-profile-name font-inter truncate leading-tight">
                  {patient.name}
                </span>
                <span className="fluid-profile-role text-purple-200 font-medium font-inter">
                  {patient.relationship || 'Self'}
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

      <p className="md:hidden text-[11px] text-[#7A7582] font-normal leading-relaxed font-inter mt-2">
        Preview your medical record, prescriptions, adherence, refills, and AI-powered medication
        insights.
      </p>

      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 pt-3">
        <button
          type="button"
          onClick={onDownloadPdf}
          disabled={downloadDisabled}
          data-testid="download-pdf-button"
          className="fluid-action-btn rounded-full bg-[hsla(260,64%,53%,0.10)] hover:bg-purple-100 text-purple-700 font-medium flex items-center justify-center gap-2 border border-purple-200/50 transition-all cursor-pointer shadow-2xs hover:shadow-xs shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600 shrink-0" />
          <span className="bg-gradient-to-r from-[#9C73F2] to-[#5C24FF] bg-clip-text text-transparent font-semibold">
            Download Pdf
          </span>
        </button>

        <button
          type="button"
          onClick={onUploadNewFile}
          data-testid="upload-new-file-button"
          className="fluid-action-btn rounded-full bg-gradient-to-b from-[#9C73F2] to-[#5C24FF] hover:opacity-95 text-white font-medium flex items-center justify-center gap-2 shadow-xs hover:shadow-md transition-all cursor-pointer shrink-0"
        >
          <Upload className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0" />
          <span>Upload New File</span>
        </button>
      </div>
    </header>
  );
};

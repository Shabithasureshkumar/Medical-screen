import React from 'react';
import { Download, Upload, ArrowLeft, ArrowRightLeft } from 'lucide-react';

interface LabImagingHeaderProps {
  onBackToDashboard?: () => void;
  onDownloadRecords?: () => void;
  onUploadFile?: () => void;
}

export const LabImagingHeader: React.FC<LabImagingHeaderProps> = ({
  onBackToDashboard,
  onDownloadRecords,
  onUploadFile,
}) => {
  return (
    <header className="w-full pb-2">
      {/* Breadcrumb Back Navigation */}
      <div className="mb-3 sm:mb-4">
        <button
          type="button"
          onClick={onBackToDashboard}
          data-testid="back-to-dashboard-button"
          className="inline-flex items-center gap-1.5 fluid-breadcrumb font-semibold text-purple-700 hover:text-purple-900 transition-colors group cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-lg px-1.5 py-0.5"
          aria-label="Back to Main Dashboard"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-x-0.5 transition-transform text-purple-600" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Main Header Row */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 lg:gap-6 relative min-w-0">
        {/* Left: Titles & Actions */}
        <div className="flex flex-col gap-3 sm:gap-4 flex-1 min-w-0 max-w-[660px]">
          <h1 className="text-[23px] sm:text-3xl lg:text-[40px] font-bold text-[#1D1B20] tracking-tight leading-tight sm:leading-10 font-inter">
            Lab &amp; Imaging Intelligence Center
          </h1>
          <p className="text-[11px] sm:text-base lg:text-[18px] text-[#7A7582] font-normal leading-relaxed font-inter">
            Real-time clinical synthesis and predictive analytics for your latest diagnostic datasets.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 pt-1">
            <button
              type="button"
              onClick={onDownloadRecords}
              className="h-[42px] sm:h-[48px] lg:h-[52px] rounded-full bg-[hsla(260,64%,53%,0.10)] hover:bg-purple-100 text-purple-700 font-medium text-xs sm:text-sm lg:text-[15.75px] px-4 sm:px-5 lg:px-6 flex items-center justify-center gap-2 border border-purple-200/50 transition-all cursor-pointer shadow-2xs hover:shadow-xs shrink-0"
            >
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600 shrink-0" />
              <span className="bg-gradient-to-r from-[#9C73F2] to-[#5C24FF] bg-clip-text text-transparent font-semibold">
                Download Medical Records
              </span>
            </button>

            <button
              type="button"
              onClick={onUploadFile}
              className="h-[42px] sm:h-[48px] lg:h-[52px] rounded-full bg-gradient-to-b from-[#9C73F2] to-[#5C24FF] hover:opacity-95 text-white font-medium text-xs sm:text-sm lg:text-[15.75px] px-4 sm:px-5 lg:px-6 flex items-center justify-center gap-2 shadow-xs hover:shadow-md transition-all cursor-pointer shrink-0"
            >
              <Upload className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0" />
              <span>Upload New File</span>
            </button>
          </div>
        </div>

        {/* Right: David Brock / Self Profile Switcher */}
        <div className="self-start md:self-center shrink-0">
          <div className="w-[clamp(220px,22vw,293px)] h-[clamp(74px,7vw,96px)] rounded-[clamp(20px,2vw,26px)] bg-gradient-to-b from-[#AE8AF9] to-[#5C24FF] p-[clamp(8px,1vw,12px)] flex items-center justify-between text-white shadow-lg border border-white/30 backdrop-blur-md">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div className="w-[clamp(52px,5.5vw,75px)] h-[clamp(52px,5.5vw,75px)] rounded-[clamp(10px,1.2vw,14px)] overflow-hidden bg-white/20 shrink-0 border border-white/30">
                <img
                  src="/assets/avatars/david-brock-self.png"
                  alt="David Brock"
                  className="w-full h-full object-cover select-none pointer-events-none"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-[clamp(15px,1.35vw,19px)] font-inter truncate leading-tight">
                  David Brock
                </span>
                <span className="text-[clamp(12px,1.05vw,15px)] text-purple-200 font-medium font-inter">
                  Self
                </span>
              </div>
            </div>
            <button
              type="button"
              className="p-1.5 sm:p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer text-white/90 hover:text-white shrink-0"
              aria-label="Switch Profile Account"
            >
              <ArrowRightLeft className="w-5 h-5 md:w-6 md:h-6 stroke-[1.8]" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

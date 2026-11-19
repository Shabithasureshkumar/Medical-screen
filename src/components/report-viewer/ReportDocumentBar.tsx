import React from 'react';
import { Download, Printer, X } from 'lucide-react';

interface ReportDocumentBarProps {
  fileName: string;
  uploadedDate: string;
  fileSize: string;
  originLabel: string;
  onDownload: () => void;
  onPrint: () => void;
  onClose: () => void;
  actionsDisabled: boolean;
}

export const ReportDocumentBar: React.FC<ReportDocumentBarProps> = ({
  fileName,
  uploadedDate,
  fileSize,
  originLabel,
  onDownload,
  onPrint,
  onClose,
  actionsDisabled
}) => {
  const iconButton =
    'w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-slate-500 hover:text-[#5C24FF] hover:bg-purple-50 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-300';

  return (
    <div className="w-full flex flex-wrap items-start justify-between gap-3 px-3 sm:px-5 lg:px-6 py-4 sm:py-5 border-b border-slate-100">
      <div className="min-w-0 flex-1">
        <h2
          data-testid="pdf-file-name"
          className="text-base sm:text-lg lg:text-xl font-bold text-[#0F172A] truncate"
          title={fileName}
        >
          {fileName}
        </h2>
        <p className="text-[11px] sm:text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-1">
          <span>Uploaded on {uploadedDate}</span>
          <span aria-hidden="true">•</span>
          <span data-testid="pdf-file-size">{fileSize}</span>
          <span
            className="ml-0.5 inline-flex items-center px-2 py-0.5 rounded-full bg-[#EDE9FE] text-[#7C3AED] text-[9.5px] font-bold uppercase tracking-wide border border-purple-200/60"
            title="Where this preview comes from"
          >
            {originLabel}
          </span>
        </p>
      </div>

      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
        <button
          type="button"
          onClick={onDownload}
          disabled={actionsDisabled}
          className={iconButton}
          title="Download this document"
          aria-label="Download this document"
          data-testid="document-download-button"
        >
          <Download className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
        </button>
        <button
          type="button"
          onClick={onPrint}
          disabled={actionsDisabled}
          className={iconButton}
          title="Print this document"
          aria-label="Print this document"
          data-testid="document-print-button"
        >
          <Printer className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
        </button>
        <button
          type="button"
          onClick={onClose}
          className={iconButton}
          title="Close preview"
          aria-label="Close preview and return to medical records"
          data-testid="document-close-button"
        >
          <X className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
};

import React from 'react';
import { FileText, X } from 'lucide-react';
import { QueuedFile } from '../../types/upload';

interface QueuedUploadProps {
  file: QueuedFile | null;
  onRemove: () => void;
}

export const QueuedUpload: React.FC<QueuedUploadProps> = ({ file, onRemove }) => {
  if (!file) return null;

  return (
    <div className="w-full flex flex-col gap-2.5">
      {/* Section Header */}
      <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-800 font-inter">
        QUEUED FOR UPLOAD
      </span>

      {/* Queued Card */}
      <div
        data-testid="queued-file-card"
        className="w-full rounded-[18px] sm:rounded-[20px] p-4 sm:p-4.5 bg-[#F9F7FE] border border-[#7C3AED] shadow-2xs flex items-center justify-between gap-3 min-w-0"
      >
        <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
          {/* File Icon Box */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white border border-purple-200/80 flex items-center justify-center text-purple-600 shadow-2xs shrink-0">
            <FileText className="w-5 h-5 text-[#7C3AED]" />
          </div>

          {/* File Metadata */}
          <div className="flex flex-col min-w-0">
            <span className="text-sm sm:text-[15px] font-bold text-[#0F172A] truncate font-inter">
              {file.fileName}
            </span>
            <span className="text-xs text-slate-500 font-normal">
              {file.fileSize} • {file.status}
            </span>
          </div>
        </div>

        {/* Remove Button */}
        <button
          type="button"
          onClick={onRemove}
          data-testid="remove-queued-file-button"
          className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-purple-100/60 transition-colors cursor-pointer shrink-0"
          aria-label="Remove queued file"
        >
          <X className="w-4 h-4 text-slate-500" />
        </button>
      </div>
    </div>
  );
};

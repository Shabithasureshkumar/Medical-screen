import React from 'react';
import { Download, Share2, Trash2, CheckCircle2 } from 'lucide-react';
import { RecentUploadItem } from '../../types/upload';

interface RecentUploadsProps {
  uploads: RecentUploadItem[];
  onViewAll?: () => void;
  onDownloadItem?: (item: RecentUploadItem) => void;
  onShareItem?: (item: RecentUploadItem) => void;
  onDeleteItem?: (item: RecentUploadItem) => void;
}

export const RecentUploads: React.FC<RecentUploadsProps> = ({
  uploads,
  onViewAll,
  onDownloadItem,
  onShareItem,
  onDeleteItem
}) => {
  return (
    <div className="w-full flex flex-col gap-3">
      {/* Header Row */}
      <div className="flex items-center justify-between">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 font-inter">
          Recent Uploads
        </h3>
        <button
          type="button"
          onClick={onViewAll}
          data-testid="view-all-recent-uploads-button"
          className="text-xs sm:text-sm font-semibold text-[#5C24FF] hover:text-[#4F1CE6] transition-colors cursor-pointer"
        >
          View All
        </button>
      </div>

      {/* Grid of 3 Upload Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {uploads.map((item) => (
          <div
            key={item.id}
            data-testid={`recent-upload-card-${item.id}`}
            className="bg-white rounded-[18px] sm:rounded-[20px] p-3 sm:p-3.5 border border-slate-100 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
          >
            {/* Top Thumbnail */}
            <div className="w-full aspect-[16/9] rounded-xl overflow-hidden bg-slate-900/10 mb-2.5 relative border border-slate-200/50">
              <img
                src={item.thumbnailUrl}
                alt={item.title}
                className="w-full h-full object-cover select-none pointer-events-none"
              />
            </div>

            {/* Details */}
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5 min-w-0">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 fill-emerald-50" />
                <span className="text-xs sm:text-[13px] font-bold text-[#0F172A] truncate font-inter">
                  {item.title}
                </span>
              </div>
              <span className="text-[10.5px] sm:text-[11px] text-slate-400 font-normal pl-5">
                {item.date} • {item.fileSize}
              </span>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-around border-t border-slate-100 pt-2.5 mt-2.5 text-slate-400">
              <button
                type="button"
                onClick={() => onDownloadItem?.(item)}
                aria-label={`Download ${item.title}`}
                className="p-1 hover:text-[#5C24FF] hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onShareItem?.(item)}
                aria-label={`Share ${item.title}`}
                className="p-1 hover:text-[#5C24FF] hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onDeleteItem?.(item)}
                aria-label={`Delete ${item.title}`}
                className="p-1 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

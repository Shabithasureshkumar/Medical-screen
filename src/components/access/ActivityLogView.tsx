import React from 'react';
import { Download } from 'lucide-react';
import { ActivityLogItem } from '../../types/access';
import { ActivityLogTimelineItem } from './ActivityLogTimelineItem';

interface ActivityLogViewProps {
  items: ActivityLogItem[];
  onDownloadFullAudit: () => void;
  onDoctorClick?: (doctorName: string) => void;
}

export const ActivityLogView: React.FC<ActivityLogViewProps> = ({
  items,
  onDownloadFullAudit,
  onDoctorClick
}) => {
  return (
    <section aria-label="Activity Log Timeline" className="w-full flex flex-col gap-3 sm:gap-4">
      {/* Activity Log Header */}
      <div className="flex items-center justify-between px-1">
        <h3 className="text-base sm:text-lg font-bold text-[#1D1B20] font-inter">
          Activity Log
        </h3>
        <button
          type="button"
          data-testid="download-full-audit-button"
          onClick={onDownloadFullAudit}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#5C24FF] hover:text-purple-800 transition-colors cursor-pointer group font-inter"
        >
          <span className="group-hover:underline">Download Full Audit</span>
          <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2] group-hover:translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* Main Timeline Card Container */}
      <div className="bg-white rounded-[20px] p-5 sm:p-7 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
        {items.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-sm font-inter">
            No activity records match your search filter.
          </div>
        ) : (
          <div className="flex flex-col">
            {items.map((item, index) => (
              <ActivityLogTimelineItem
                key={item.id}
                item={item}
                isLast={index === items.length - 1}
                onDoctorClick={onDoctorClick}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

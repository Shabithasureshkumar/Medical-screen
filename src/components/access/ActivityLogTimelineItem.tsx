import React from 'react';
import { ChevronRight, Check } from 'lucide-react';
import { ActivityLogItem } from '../../types/access';

interface ActivityLogTimelineItemProps {
  item: ActivityLogItem;
  isLast?: boolean;
  onDoctorClick?: (doctorName: string) => void;
}

export const ActivityLogTimelineItem: React.FC<ActivityLogTimelineItemProps> = ({
  item,
  isLast = false,
  onDoctorClick
}) => {
  const getDotBg = (color: ActivityLogItem['dotColor']) => {
    switch (color) {
      case 'emerald':
        return 'bg-emerald-400 ring-4 ring-emerald-50';
      case 'blue':
        return 'bg-blue-500 ring-4 ring-blue-50';
      case 'purple':
        return 'bg-purple-500 ring-4 ring-purple-50';
      case 'amber':
        return 'bg-amber-400 ring-4 ring-amber-50';
      case 'rose':
        return 'bg-rose-500 ring-4 ring-rose-50';
      default:
        return 'bg-slate-400 ring-4 ring-slate-50';
    }
  };

  return (
    <div className="relative flex items-start gap-3 sm:gap-4 group">
      {/* 1. Left: Dot and Connector Line */}
      <div className="flex flex-col items-center shrink-0">
        <div
          className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full ${getDotBg(
            item.dotColor
          )} z-10 transition-transform group-hover:scale-125 mt-1`}
        />
        {!isLast && (
          <div className="w-0.5 bg-slate-200/80 -mt-0.5 h-full min-h-[70px] sm:min-h-[85px]" />
        )}
      </div>

      {/* 2. Main Content & Right Timestamp */}
      <div className="flex-1 pb-6 sm:pb-8 flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4 min-w-0">
        {/* Event Details */}
        <div className="flex flex-col min-w-0 flex-1">
          <h4 className="text-sm sm:text-[15px] font-semibold text-[#1D1B20] font-inter">
            {item.title}
          </h4>
          <p className="text-xs sm:text-[13px] text-slate-600 font-inter mt-1 leading-relaxed">
            {item.description}
          </p>

          {/* Sub-Badges / Extra Metadata */}
          {item.isVerified && (
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full font-inter">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
                VERIFIED
              </span>
              {item.targetEntity && (
                <span className="text-xs text-[#7A7582] font-inter">
                  Initiated by {item.targetEntity}
                </span>
              )}
            </div>
          )}

          {(item.ip || item.sessionDuration) && (
            <div className="flex items-center gap-2 mt-2 flex-wrap text-xs text-[#7A7582] font-inter">
              {item.ip && (
                <span className="bg-[#F1F3F9] text-slate-700 text-[11px] font-mono font-medium px-2 py-0.5 rounded-md">
                  IP: {item.ip}
                </span>
              )}
              {item.sessionDuration && (
                <span>Session Duration: {item.sessionDuration}</span>
              )}
            </div>
          )}

          {/* Embedded Doctor Consultation Card */}
          {item.doctor && (
            <div
              role="button"
              tabIndex={0}
              onClick={() => onDoctorClick?.(item.doctor!.name)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onDoctorClick?.(item.doctor!.name);
                }
              }}
              data-testid="activity-doctor-card"
              className="mt-2.5 w-full max-w-sm bg-[#F8F9FD] border border-slate-100 rounded-xl p-2 sm:p-2.5 flex items-center justify-between gap-3 hover:bg-slate-100/70 transition-colors cursor-pointer group/doc shadow-2xs"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-lg overflow-hidden bg-slate-200 shrink-0 border border-slate-200/80">
                  <img
                    src={item.doctor.avatarUrl}
                    alt={item.doctor.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-xs sm:text-[13px] text-[#1D1B20] font-inter truncate group-hover/doc:text-purple-700 transition-colors">
                    {item.doctor.name}
                  </span>
                  <span className="text-[11px] text-[#7A7582] font-inter truncate">
                    {item.doctor.specialty} • {item.doctor.hospital}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-purple-600 shrink-0 group-hover/doc:translate-x-0.5 transition-transform" />
            </div>
          )}

          {/* Scope Badge */}
          {item.scopeBadge && (
            <div className="mt-2">
              <span className="inline-block bg-[#FFF3E6] text-[#D97706] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-amber-200 font-inter">
                {item.scopeBadge}
              </span>
            </div>
          )}
        </div>

        {/* Timestamp */}
        <div className="shrink-0 text-left sm:text-right">
          <span className="text-xs text-[#7A7582] font-mono sm:font-sans font-medium whitespace-nowrap">
            {item.timestamp}
          </span>
        </div>
      </div>
    </div>
  );
};

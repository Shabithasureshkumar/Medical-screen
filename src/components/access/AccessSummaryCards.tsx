import React from 'react';
import { AccessSummaryStats } from '../../types/access';

interface AccessSummaryCardsProps {
  stats: AccessSummaryStats;
}

export const AccessSummaryCards: React.FC<AccessSummaryCardsProps> = ({ stats }) => {
  return (
    <section aria-label="Access Statistics Summary" className="w-full">
      {/* Mobile: 2 cols with 3rd card full-width; Desktop (md+): 3 cols */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 w-full">
        {/* Card 1: ACTIVE ACCESS */}
        <div
          data-testid="summary-card-active"
          className="col-span-1 bg-white rounded-[16px] sm:rounded-[20px] p-4 sm:p-5 md:p-6 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex flex-col justify-between min-w-0"
        >
          <span className="text-[10px] sm:text-xs font-bold text-[#64748B] tracking-wider uppercase font-inter truncate">
            ACTIVE ACCESS
          </span>
          <div className="flex items-baseline gap-2 sm:gap-3 mt-2 sm:mt-3 flex-wrap">
            <span className="text-2xl sm:text-3xl md:text-[36px] font-bold text-[#1D1B20] font-inter leading-none">
              {stats.activeAccess.count}
            </span>
            <span className="text-[11px] sm:text-xs md:text-[13px] font-semibold text-emerald-500 font-inter">
              {stats.activeAccess.changeText}
            </span>
          </div>
        </div>

        {/* Card 2: PENDING REQUESTS */}
        <div
          data-testid="summary-card-pending"
          className="col-span-1 bg-white rounded-[16px] sm:rounded-[20px] p-4 sm:p-5 md:p-6 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex flex-col justify-between min-w-0"
        >
          <span className="text-[10px] sm:text-xs font-bold text-[#64748B] tracking-wider uppercase font-inter truncate">
            PENDING REQUESTS
          </span>
          <div className="flex items-baseline gap-2 sm:gap-3 mt-2 sm:mt-3 flex-wrap">
            <span className="text-2xl sm:text-3xl md:text-[36px] font-bold text-[#1D1B20] font-inter leading-none">
              {stats.pendingRequests.count}
            </span>
            <span className="text-[11px] sm:text-xs md:text-[13px] font-semibold text-amber-600 font-inter">
              {stats.pendingRequests.badgeText}
            </span>
          </div>
        </div>

        {/* Card 3: REJECTED REQUESTS (full width on mobile col-span-2, 1 col on md+) */}
        <div
          data-testid="summary-card-rejected"
          className="col-span-2 md:col-span-1 bg-white rounded-[16px] sm:rounded-[20px] p-4 sm:p-5 md:p-6 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex flex-col justify-between min-w-0"
        >
          <span className="text-[10px] sm:text-xs font-bold text-[#64748B] tracking-wider uppercase font-inter truncate">
            REJECTED REQUESTS
          </span>
          <div className="flex items-baseline gap-2 sm:gap-3 mt-2 sm:mt-3 flex-wrap">
            <span className="text-2xl sm:text-3xl md:text-[36px] font-bold text-[#1D1B20] font-inter leading-none">
              {stats.rejectedRequests.count}
            </span>
            <span className="text-[11px] sm:text-xs md:text-[13px] font-medium text-[#64748B] font-inter">
              {stats.rejectedRequests.periodText}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

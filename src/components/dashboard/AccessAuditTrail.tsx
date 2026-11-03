import React from 'react';
import { History, ShieldCheck } from 'lucide-react';
import { AuditRecord } from '../../types/medical';

interface AccessAuditTrailProps {
  logs: AuditRecord[];
  onFullHistory?: () => void;
}

export const AccessAuditTrail: React.FC<AccessAuditTrailProps> = ({
  logs,
  onFullHistory
}) => {
  return (
    <section className="w-full min-w-0 max-w-full rounded-[18px] sm:rounded-[22px] md:rounded-[26.59px] bg-[hsla(285,100%,98%,0.40)] border border-white/60 p-3.5 sm:p-5 md:p-6 shadow-xs backdrop-blur-[22.16px] flex flex-col gap-3 sm:gap-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 sm:pb-4 border-b border-white/60">
        <div className="flex flex-col">
          <h2 className="text-base sm:text-xl md:text-[24.37px] font-semibold text-black tracking-[-0.24px] font-inter">
            Access Audit Trail
          </h2>
          <span className="text-[10px] sm:text-xs text-[#64748B] font-inter md:hidden">
            Recent system access and data sharing log
          </span>
        </div>

        <button
          type="button"
          onClick={onFullHistory}
          className="inline-flex items-center gap-1 sm:gap-1.5 text-xs sm:text-[15.51px] font-bold text-[#4F378A] hover:text-purple-900 transition-colors cursor-pointer font-inter uppercase tracking-wider md:normal-case"
        >
          <History className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#4F378A]" />
          <span className="hidden md:inline">Full History</span>
          <span className="md:hidden text-[10px] sm:text-xs font-bold text-purple-700">DOWNLOAD FULL LOG</span>
        </button>
      </div>

      {/* Mobile Stacked Audit Cards (< md) */}
      <div className="flex flex-col divide-y divide-purple-100/60 md:hidden">
        {logs.slice(0, 2).map((log) => (
          <div key={log.id} className="py-3 flex items-start justify-between gap-2">
            {/* Left Column: Doctor / Entity */}
            <div className="flex flex-col min-w-0">
              <span className="text-[9px] font-bold text-[#8E8A94] uppercase tracking-wider font-inter">
                DOCTOR
              </span>
              <span className="font-bold text-[#1D1A23] text-[13px] font-inter truncate">
                {log.viewedBy}
              </span>
              <span className="text-[10.5px] text-[#8E8A94] font-inter mt-0.5">
                {log.timestamp}
              </span>
            </div>

            {/* Right Column: Action & Access Point */}
            <div className="flex flex-col items-end text-right min-w-0 shrink-0">
              <span className="text-[9px] font-bold text-[#8E8A94] uppercase tracking-wider font-inter">
                ACTION
              </span>
              <span className="font-bold text-[#6B38D4] text-[12.5px] font-inter">
                {log.actionTaken}
              </span>
              <span className="text-[10.5px] text-[#8E8A94] font-inter mt-0.5">
                {log.accessPoint}
              </span>
            </div>
          </div>
        ))}

        {/* View All History Button on Mobile */}
        <div className="pt-3">
          <button
            type="button"
            onClick={onFullHistory}
            className="w-full h-[40px] rounded-full bg-[#F1EAFC] hover:bg-purple-100 text-[#6B38D4] text-[11px] sm:text-xs font-bold flex items-center justify-center transition-colors cursor-pointer uppercase tracking-wider font-inter shadow-2xs"
          >
            VIEW ALL HISTORY
          </button>
        </div>
      </div>

      {/* Desktop Table (hidden on mobile, visible md+) */}
      <div className="hidden md:block w-full max-w-full min-w-0 overflow-x-auto no-scrollbar pt-2">
        <table className="w-full text-left border-collapse min-w-[520px] xl:min-w-[620px]">
          <thead>
            <tr className="bg-[hsla(285,44%,96%,0.50)] text-[11px] xl:text-[13.29px] font-bold text-[#494551] uppercase tracking-[0.66px] font-inter">
              <th className="py-2.5 xl:py-3 px-2.5 xl:px-4">VIEWED BY</th>
              <th className="py-2.5 xl:py-3 px-2.5 xl:px-4">DATE & TIME</th>
              <th className="py-2.5 xl:py-3 px-2.5 xl:px-4">ACCESS POINT</th>
              <th className="py-2.5 xl:py-3 px-2.5 xl:px-4">ACTION TAKEN</th>
              <th className="py-2.5 xl:py-3 px-2.5 xl:px-4 text-center">SECURITY</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-100/30 text-xs xl:text-[15.51px] font-inter">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-purple-50/20 transition-colors">
                {/* Viewed By */}
                <td className="py-3 xl:py-4 px-2.5 xl:px-4">
                  <div className="flex items-center gap-2 xl:gap-3">
                    <span
                      style={{ backgroundColor: log.badgeBg, color: log.badgeTextColor }}
                      className="w-[28px] h-[28px] xl:w-[35.45px] xl:h-[35.45px] rounded-full flex items-center justify-center font-bold text-[11px] xl:text-[13.29px] shrink-0 font-inter"
                    >
                      {log.badgeInitials}
                    </span>
                    <span className="font-bold text-black text-[12.5px] xl:text-[15.51px] font-inter">{log.viewedBy}</span>
                  </div>
                </td>

                {/* Date & Time */}
                <td className="py-3 xl:py-4 px-2.5 xl:px-4 text-[#494551] text-[12px] xl:text-[15.51px] whitespace-nowrap font-inter">
                  {log.timestamp}
                </td>

                {/* Access Point */}
                <td className="py-3 xl:py-4 px-2.5 xl:px-4 text-[#494551] text-[12px] xl:text-[15.51px] font-medium font-inter">
                  {log.accessPoint}
                </td>

                {/* Action Taken */}
                <td className="py-3 xl:py-4 px-2.5 xl:px-4">
                  <span
                    style={{ backgroundColor: log.actionBadgeBg, color: log.actionTextColor }}
                    className="inline-block px-2 xl:px-3 py-0.5 xl:py-1 rounded-[6px] xl:rounded-[8.86px] text-[11px] xl:text-[13.29px] font-normal font-inter"
                  >
                    {log.actionTaken}
                  </span>
                </td>

                {/* Security */}
                <td className="py-3 xl:py-4 px-2.5 xl:px-4 text-center">
                  <div className="flex items-center justify-center text-purple-600">
                    <ShieldCheck className="w-4 h-4 xl:w-5 xl:h-5 text-purple-600" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

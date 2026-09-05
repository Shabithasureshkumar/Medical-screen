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
    <section className="w-full rounded-[26.59px] bg-[hsla(285,100%,98%,0.40)] border border-white/60 p-5 sm:p-6 shadow-xs backdrop-blur-[22.16px]">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/60">
        <h2 className="text-xl sm:text-[24.37px] font-semibold text-black tracking-[-0.24px] font-inter">
          Access Audit Trail
        </h2>

        <button
          type="button"
          onClick={onFullHistory}
          className="inline-flex items-center gap-1.5 text-xs sm:text-[15.51px] font-bold text-[#4F378A] hover:text-purple-900 transition-colors cursor-pointer font-inter"
        >
          <History className="w-4 h-4 text-[#4F378A]" />
          <span>Full History</span>
        </button>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto no-scrollbar pt-2">
        <table className="w-full text-left border-collapse min-w-[640px]">
          <thead>
            <tr className="bg-[hsla(285,44%,96%,0.50)] text-[13.29px] font-bold text-[#494551] uppercase tracking-[0.66px] font-inter">
              <th className="py-3 px-4">VIEWED BY</th>
              <th className="py-3 px-4">DATE & TIME</th>
              <th className="py-3 px-4">ACCESS POINT</th>
              <th className="py-3 px-4">ACTION TAKEN</th>
              <th className="py-3 px-4 text-center">SECURITY</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-100/30 text-xs sm:text-[15.51px] font-inter">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-purple-50/20 transition-colors">
                {/* Viewed By */}
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <span
                      style={{ backgroundColor: log.badgeBg, color: log.badgeTextColor }}
                      className="w-[35.45px] h-[35.45px] rounded-full flex items-center justify-center font-bold text-[13.29px] shrink-0 font-inter"
                    >
                      {log.badgeInitials}
                    </span>
                    <span className="font-bold text-black text-[15.51px] font-inter">{log.viewedBy}</span>
                  </div>
                </td>

                {/* Date & Time */}
                <td className="py-4 px-4 text-[#494551] text-[15.51px] whitespace-nowrap font-inter">
                  {log.timestamp}
                </td>

                {/* Access Point */}
                <td className="py-4 px-4 text-[#494551] text-[15.51px] font-medium font-inter">
                  {log.accessPoint}
                </td>

                {/* Action Taken */}
                <td className="py-4 px-4">
                  <span
                    style={{ backgroundColor: log.actionBadgeBg, color: log.actionTextColor }}
                    className="inline-block px-3 py-1 rounded-[8.86px] text-[13.29px] font-normal font-inter"
                  >
                    {log.actionTaken}
                  </span>
                </td>

                {/* Security */}
                <td className="py-4 px-4 text-center">
                  <div className="flex items-center justify-center text-purple-600">
                    <ShieldCheck className="w-5 h-5 text-purple-600" />
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

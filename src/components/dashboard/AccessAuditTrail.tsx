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
    <section className="w-full rounded-[26px] bg-[#FCF8FD]/60 border border-purple-100/60 p-4 sm:p-6 shadow-xs backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 sm:pb-5 border-b border-purple-100/80">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Access Audit Trail
        </h2>

        <button
          type="button"
          onClick={onFullHistory}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#4F378A] hover:text-purple-900 transition-colors cursor-pointer"
        >
          <History className="w-4 h-4 text-[#4F378A]" />
          <span>Full History</span>
        </button>
      </div>

      {/* Table Container */}
      <div className="w-full overflow-x-auto no-scrollbar pt-2">
        <table className="w-full text-left border-collapse min-w-[640px]">
          <thead>
            <tr className="border-b border-purple-50 text-[11px] sm:text-[13px] font-bold text-[#494551] uppercase tracking-wider">
              <th className="py-3 px-3 sm:px-4 font-bold">VIEWED BY</th>
              <th className="py-3 px-3 sm:px-4 font-bold">DATE & TIME</th>
              <th className="py-3 px-3 sm:px-4 font-bold">ACCESS POINT</th>
              <th className="py-3 px-3 sm:px-4 font-bold">ACTION TAKEN</th>
              <th className="py-3 px-3 sm:px-4 font-bold text-center">SECURITY</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-100/40 text-xs sm:text-[14px]">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-purple-50/30 transition-colors">
                {/* Viewed By */}
                <td className="py-3.5 px-3 sm:px-4">
                  <div className="flex items-center gap-2.5">
                    <span
                      style={{ backgroundColor: log.badgeBg, color: log.badgeTextColor }}
                      className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0"
                    >
                      {log.badgeInitials}
                    </span>
                    <span className="font-bold text-slate-900">{log.viewedBy}</span>
                  </div>
                </td>

                {/* Date & Time */}
                <td className="py-3.5 px-3 sm:px-4 text-slate-600 whitespace-nowrap">
                  {log.timestamp}
                </td>

                {/* Access Point */}
                <td className="py-3.5 px-3 sm:px-4 text-slate-600 font-medium">
                  {log.accessPoint}
                </td>

                {/* Action Taken */}
                <td className="py-3.5 px-3 sm:px-4">
                  <span
                    style={{ backgroundColor: log.actionBadgeBg, color: log.actionTextColor }}
                    className="inline-block px-2.5 py-1 rounded-[8px] text-xs font-medium"
                  >
                    {log.actionTaken}
                  </span>
                </td>

                {/* Security */}
                <td className="py-3.5 px-3 sm:px-4 text-center">
                  <div className="flex items-center justify-center text-purple-600">
                    <ShieldCheck className="w-4 h-4 text-purple-600" />
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

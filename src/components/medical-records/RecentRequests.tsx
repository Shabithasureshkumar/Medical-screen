import React from 'react';
import { History, Info, Check } from 'lucide-react';
import { CorrectionRequestItem } from '../../data/medicalRecordsData';

interface RecentRequestsProps {
  requests: CorrectionRequestItem[];
  onViewFullHistory?: () => void;
  onRequestClick?: (req: CorrectionRequestItem) => void;
}

export const RecentRequests: React.FC<RecentRequestsProps> = ({
  requests,
  onViewFullHistory,
  onRequestClick
}) => {
  const getStatusBadge = (status: CorrectionRequestItem['status']) => {
    switch (status) {
      case 'APPROVED':
        return (
          <span className="bg-emerald-50 text-emerald-600 border border-emerald-200/80 text-[10px] font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
            <Check className="w-2.5 h-2.5 stroke-[3]" />
            <span>APPROVED</span>
          </span>
        );
      case 'PENDING':
      default:
        return (
          <span className="bg-purple-50 text-purple-600 border border-purple-200/80 text-[10px] font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
            <span>PENDING</span>
          </span>
        );
    }
  };

  return (
    <div className="w-full bg-white border border-slate-200/90 rounded-[22px] sm:rounded-[24px] p-5 sm:p-6 shadow-xs flex flex-col justify-between gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] tracking-tight">
          Recent Requests
        </h3>
        <button
          type="button"
          onClick={onViewFullHistory}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#7C3AED] hover:text-[#5C24FF] transition-colors cursor-pointer"
        >
          <History className="w-3.5 h-3.5 text-[#7C3AED]" />
          <span>Full History</span>
        </button>
      </div>

      {/* Desktop / Tablet Table View */}
      <div className="hidden sm:block w-full overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="py-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                REQUEST ID
              </th>
              <th className="py-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                FIELD
              </th>
              <th className="py-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                DATE
              </th>
              <th className="py-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">
                STATUS
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {requests.map((req) => (
              <tr 
                key={req.id}
                onClick={() => onRequestClick?.(req)}
                className="hover:bg-purple-50/20 transition-colors cursor-pointer"
              >
                <td className="py-3 text-xs font-bold text-[#7C3AED]">
                  {req.id}
                </td>
                <td className="py-3">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-slate-800">
                      {req.field}
                    </span>
                    <span className="text-[10.5px] text-slate-400 font-normal">
                      {req.subtext}
                    </span>
                  </div>
                </td>
                <td className="py-3 text-xs font-medium text-slate-600">
                  {req.date}
                </td>
                <td className="py-3 text-right">
                  {getStatusBadge(req.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Cards View (< 640px) */}
      <div className="sm:hidden flex flex-col gap-2.5">
        {requests.map((req) => (
          <div
            key={req.id}
            onClick={() => onRequestClick?.(req)}
            className="p-3 bg-slate-50/60 rounded-xl border border-slate-100 flex flex-col gap-1.5"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#7C3AED]">
                {req.id}
              </span>
              {getStatusBadge(req.status)}
            </div>
            <div className="flex items-center justify-between text-xs pt-1">
              <div>
                <span className="font-semibold text-slate-800 block">
                  {req.field}
                </span>
                <span className="text-[10px] text-slate-400">
                  {req.subtext}
                </span>
              </div>
              <span className="text-slate-500 text-[11px] font-medium">
                {req.date}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Processing Time Notice Box */}
      <div className="bg-[#F5F3FF] border border-[#E9D5FF] rounded-[16px] p-3.5 sm:p-4 flex items-start gap-3 mt-1">
        <Info className="w-4 h-4 text-[#7C3AED] shrink-0 mt-0.5" />
        <div className="flex flex-col">
          <span className="text-xs sm:text-sm font-bold text-[#0F172A]">
            Processing Time Notice
          </span>
          <p className="text-[11px] sm:text-xs text-slate-500 font-normal leading-relaxed mt-0.5">
            Correction requests are typically reviewed by our administrative board within 3–5 business days. You will receive an email notification when the status changes.
          </p>
        </div>
      </div>
    </div>
  );
};

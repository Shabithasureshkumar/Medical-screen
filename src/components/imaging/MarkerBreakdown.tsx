import React from 'react';
import { markerBreakdownData, MarkerBreakdownRow } from '../../data/imagingData';

interface MarkerBreakdownProps {
  data?: MarkerBreakdownRow[];
}

export const MarkerBreakdown: React.FC<MarkerBreakdownProps> = ({
  data = markerBreakdownData
}) => {
  const getFlagBadge = (flag: 'Borderline' | 'High' | 'Normal') => {
    switch (flag) {
      case 'High':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-600 border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
            High
          </span>
        );
      case 'Borderline':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
            Borderline
          </span>
        );
      case 'Normal':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            Normal
          </span>
        );
    }
  };

  return (
    <div className="w-full h-full bg-white/70 backdrop-blur-md rounded-2xl border border-[#7B61FF]/20 shadow-sm p-4 sm:p-6 transition-all duration-300 flex flex-col justify-between">
      {/* Header */}
      <div className="pb-4">
        <h3 className="text-base sm:text-lg font-bold text-[#1E1B4B]">
          Marker Breakdown
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Values outside reference range are highlighted.
        </p>
      </div>

      {/* Table Container */}
      <div className="w-full overflow-x-auto rounded-xl border border-slate-200/80">
        <table className="w-full text-left border-collapse min-w-[480px]">
          <thead>
            <tr className="bg-slate-50/90 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th scope="col" className="py-3 px-4">MARKER</th>
              <th scope="col" className="py-3 px-4">RESULT</th>
              <th scope="col" className="py-3 px-4">REF. RANGE</th>
              <th scope="col" className="py-3 px-4">FLAG</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
            {data.map((row, idx) => {
              const isFlagged = row.flag !== 'Normal';
              return (
                <tr
                  key={`${row.id}-${idx}`}
                  className={`transition-colors ${
                    isFlagged
                      ? 'bg-amber-50/40 hover:bg-amber-50/60'
                      : 'hover:bg-slate-50/70 bg-white'
                  }`}
                >
                  <td className="py-3 px-4 font-semibold text-[#1E1B4B]">
                    {row.marker}
                  </td>
                  <td className={`py-3 px-4 font-bold ${
                    row.flag === 'High'
                      ? 'text-rose-600'
                      : row.flag === 'Borderline'
                      ? 'text-amber-700'
                      : 'text-slate-800'
                  }`}>
                    {row.result}
                  </td>
                  <td className="py-3 px-4 text-slate-500">
                    {row.refRange}
                  </td>
                  <td className="py-3 px-4">
                    {getFlagBadge(row.flag)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

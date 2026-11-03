import React from 'react';
import { FileText, ChevronRight, Download } from 'lucide-react';
import { latestReportsData } from '../../data/imagingData';

interface LatestReportsProps {
  onSelectReport?: (reportId: string) => void;
}

export const LatestReports: React.FC<LatestReportsProps> = ({ onSelectReport }) => {
  return (
    <section className="w-full space-y-3">
      <h3 className="text-base sm:text-lg font-bold text-[#1E1B4B]">
        Latest Reports
      </h3>

      <div className="space-y-2.5">
        {latestReportsData.map((report) => (
          <div
            key={report.id}
            onClick={() => onSelectReport?.(report.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectReport?.(report.id);
              }
            }}
            className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-[#7B61FF]/20 shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F5F3FF] border border-[#7B61FF]/20 flex items-center justify-center text-[#6B38D4] group-hover:bg-[#6B38D4] group-hover:text-white transition-all shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#1E1B4B] group-hover:text-[#6B38D4] transition-colors">
                  {report.title}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  {report.date}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label={`Download ${report.title}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectReport?.(report.id);
                }}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-[#6B38D4] hover:bg-slate-100 transition-colors"
              >
                <Download className="w-4 h-4" />
              </button>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

import React from 'react';
import { 
  Heart, 
  FileText, 
  FlaskConical, 
  Eye, 
  Download, 
  Sparkles,
  Scan
} from 'lucide-react';
import { MedicalRecordItem } from '../../data/medicalRecordsData';

interface MedicalRecordsTableProps {
  records: MedicalRecordItem[];
  onViewRecord: (record: MedicalRecordItem) => void;
  onDownloadRecord: (record: MedicalRecordItem) => void;
}

export const MedicalRecordsTable: React.FC<MedicalRecordsTableProps> = ({
  records,
  onViewRecord,
  onDownloadRecord
}) => {
  const renderIcon = (type: MedicalRecordItem['iconType']) => {
    switch (type) {
      case 'heart':
        return <Heart className="w-5 h-5 text-[#7C3AED]" />;
      case 'imaging':
        return <Scan className="w-5 h-5 text-[#7C3AED]" />;
      case 'lab':
        return <FlaskConical className="w-5 h-5 text-[#7C3AED]" />;
      case 'document':
      default:
        return <FileText className="w-5 h-5 text-[#7C3AED]" />;
    }
  };

  const getBadgeStyle = (theme: 'purple' | 'blue') => {
    if (theme === 'blue') {
      return 'bg-[#E0F2FE] text-[#0284C7] border border-sky-200/60';
    }
    return 'bg-[#EDE9FE] text-[#7C3AED] border border-purple-200/60';
  };

  if (records.length === 0) {
    return (
      <div className="w-full py-12 text-center bg-white rounded-2xl border border-slate-200">
        <p className="text-sm font-medium text-slate-500">No medical records found matching your filters.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* ========================================================================= */}
      {/* DESKTOP TABLE VIEW (Hidden on mobile < 768px, Visible on md:block)       */}
      {/* ========================================================================= */}
      <div className="hidden md:block w-full overflow-hidden bg-white rounded-[20px] border border-slate-200/90 shadow-xs">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="py-3.5 px-6 text-[11px] font-bold text-[#7C3AED] uppercase tracking-wider">
                  DOCUMENT NAME
                </th>
                <th className="py-3.5 px-4 text-[11px] font-bold text-[#7C3AED] uppercase tracking-wider text-center">
                  TYPE
                </th>
                <th className="py-3.5 px-4 text-[11px] font-bold text-[#7C3AED] uppercase tracking-wider text-center">
                  UPLOADED DATE
                </th>
                <th className="py-3.5 px-6 text-[11px] font-bold text-[#7C3AED] uppercase tracking-wider text-right">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {records.map((rec) => (
                <tr 
                  key={rec.id}
                  className="hover:bg-purple-50/30 transition-colors group"
                >
                  {/* Document Name + AI Health Explanation */}
                  <td className="py-4 px-6 align-middle">
                    <div className="flex flex-col xl:flex-row xl:items-center gap-3.5">
                      {/* Left: Icon & Meta */}
                      <div className="flex items-center gap-3 shrink-0 min-w-[200px]">
                        <div className="w-10 h-10 rounded-[12px] bg-[#EDE9FE] flex items-center justify-center shrink-0">
                          {renderIcon(rec.iconType)}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-[#0F172A] group-hover:text-purple-900 transition-colors">
                            {rec.title}
                          </span>
                          <span className="text-xs text-slate-500 font-normal">
                            {rec.subtitle}
                          </span>
                        </div>
                      </div>

                      {/* Right: AI Health Explanation Card */}
                      <div className="flex-1 min-w-[240px] max-w-[480px] bg-[#F8F6FF] border border-[#E9D5FF]/70 rounded-[14px] p-2.5 sm:p-3">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Sparkles className="w-3.5 h-3.5 text-[#7C3AED] shrink-0" />
                          <span className="text-[9px] font-bold text-[#7C3AED] tracking-wider uppercase">
                            AI HEALTH EXPLANATION
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
                          {rec.aiExplanation}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Type Badge */}
                  <td className="py-4 px-4 align-middle text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-[10.5px] font-bold tracking-wide uppercase ${getBadgeStyle(rec.badgeTheme)}`}>
                      {rec.type}
                    </span>
                  </td>

                  {/* Uploaded Date */}
                  <td className="py-4 px-4 align-middle text-center">
                    <span className="text-xs lg:text-[13px] font-medium text-slate-700 whitespace-nowrap">
                      {rec.uploadedDate}
                    </span>
                  </td>

                  {/* Action Icons */}
                  <td className="py-4 px-6 align-middle text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => onViewRecord(rec)}
                        title={`View ${rec.title}`}
                        aria-label={`View ${rec.title}`}
                        className="p-1.5 rounded-lg text-[#7C3AED] hover:bg-purple-100 hover:text-[#5C24FF] transition-all cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDownloadRecord(rec)}
                        title={`Download ${rec.title}`}
                        aria-label={`Download ${rec.title}`}
                        className="p-1.5 rounded-lg text-[#7C3AED] hover:bg-purple-100 hover:text-[#5C24FF] transition-all cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE CARDS VIEW (Visible on < 768px, exactly matching Figma 375px)      */}
      {/* ========================================================================= */}
      <div className="md:hidden flex flex-col gap-3">
        {records.map((rec) => (
          <div
            key={rec.id}
            className="bg-white rounded-[18px] border border-slate-200/90 p-4 shadow-xs flex flex-col gap-3"
          >
            {/* Top Row: Icon + Type Badge */}
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-[12px] bg-[#EDE9FE] flex items-center justify-center shrink-0">
                {renderIcon(rec.iconType)}
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase ${getBadgeStyle(rec.badgeTheme)}`}>
                {rec.type}
              </span>
            </div>

            {/* Document Info */}
            <div className="flex flex-col">
              <h3 className="text-sm font-bold text-[#0F172A] leading-snug">
                {rec.title}
              </h3>
              <p className="text-xs text-slate-500 font-normal mt-0.5">
                {rec.subtitle}
              </p>
            </div>

            {/* Bottom Row: Upload Date + Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-xs font-medium text-slate-500">
                {rec.uploadedDate}
              </span>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => onViewRecord(rec)}
                  aria-label={`View ${rec.title}`}
                  className="p-1 text-[#7C3AED] hover:text-[#5C24FF] transition-colors cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onDownloadRecord(rec)}
                  aria-label={`Download ${rec.title}`}
                  className="p-1 text-[#7C3AED] hover:text-[#5C24FF] transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

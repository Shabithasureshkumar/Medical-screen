import React from 'react';
import { FileText, FlaskConical, Scan, Syringe, Check } from 'lucide-react';
import { ShareRecordItem } from '../../types/accessRequest';

interface RecordsSelectionProps {
  records: ShareRecordItem[];
  selectedRecordIds: string[];
  onToggleRecord: (id: string) => void;
}

export const RecordsSelection: React.FC<RecordsSelectionProps> = ({
  records,
  selectedRecordIds,
  onToggleRecord
}) => {
  const renderRecordIcon = (type: ShareRecordItem['iconType']) => {
    switch (type) {
      case 'document':
        return <FileText className="w-4.5 h-4.5" />;
      case 'flask':
        return <FlaskConical className="w-4.5 h-4.5" />;
      case 'mri':
        return <Scan className="w-4.5 h-4.5" />;
      case 'vaccine':
        return <Syringe className="w-4.5 h-4.5" />;
      default:
        return <FileText className="w-4.5 h-4.5" />;
    }
  };

  return (
    <div className="w-full rounded-[20px] sm:rounded-[24px] bg-[#F8FAFC] border border-slate-200/70 p-4 sm:p-5 flex flex-col gap-3.5 shadow-xs">
      <h2 className="text-sm sm:text-base font-bold text-[#0F172A] font-inter">
        Select Records to Share
      </h2>

      {/* 2x2 Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
        {records.map((rec) => {
          const isSelected = selectedRecordIds.includes(rec.id);
          return (
            <div
              key={rec.id}
              role="checkbox"
              aria-checked={isSelected}
              tabIndex={0}
              data-testid={`record-share-card-${rec.id}`}
              onClick={() => onToggleRecord(rec.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onToggleRecord(rec.id);
                }
              }}
              className={`relative rounded-[16px] sm:rounded-[20px] bg-white border p-4 sm:p-4.5 flex flex-col justify-between gap-3 cursor-pointer transition-all ${
                isSelected
                  ? 'border-[#7C3AED] ring-2 ring-purple-100 shadow-sm'
                  : 'border-slate-200/80 hover:border-slate-300'
              }`}
            >
              {/* Top Row: Icon + Checkbox */}
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[12px] bg-[#F3E8FF] text-[#7C3AED] flex items-center justify-center">
                  {renderRecordIcon(rec.iconType)}
                </div>

                {isSelected ? (
                  <div className="w-5 h-5 rounded-full bg-[#7C3AED] text-white flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                )}
              </div>

              {/* Title & Subtext */}
              <div className="flex flex-col gap-0.5">
                <h3 className="text-xs sm:text-sm font-bold text-[#0F172A]">
                  {rec.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-[#64748B]">
                  {rec.date} • {rec.provider}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

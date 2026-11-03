import React from 'react';
import { 
  Calendar, 
  Pill, 
  AlertTriangle, 
  Check, 
  Clock, 
  Download 
} from 'lucide-react';
import { 
  PrescriptionRecord, 
  PrescriptionFilter 
} from '../../data/prescriptionData';

interface PrescriptionRecordsProps {
  records: PrescriptionRecord[];
  activeFilter: PrescriptionFilter;
  onFilterChange: (filter: PrescriptionFilter) => void;
  onViewDetails: (record: PrescriptionRecord) => void;
  onDownloadRecord: (record: PrescriptionRecord) => void;
  onRequestRefill: (record: PrescriptionRecord) => void;
}

const FILTER_OPTIONS: PrescriptionFilter[] = [
  'All',
  'Active',
  'Pending Refill',
  'Completed',
  'Expired'
];

export const PrescriptionRecords: React.FC<PrescriptionRecordsProps> = ({
  records,
  activeFilter,
  onFilterChange,
  onViewDetails,
  onDownloadRecord,
  onRequestRefill
}) => {
  const getStatusBadge = (record: PrescriptionRecord) => {
    switch (record.status) {
      case 'Active':
        return (
          <span className="inline-flex items-center gap-1.5 text-[10.5px] font-bold text-emerald-600 tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>ACTIVE</span>
          </span>
        );
      case 'Pending Refill':
        return (
          <span className="inline-flex items-center gap-1.5 text-[10.5px] font-bold text-amber-600 tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>PENDING REFILL</span>
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 text-[10.5px] font-bold text-[#7C3AED] tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
            <span>COMPLETED</span>
          </span>
        );
      case 'Expired':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 text-[10.5px] font-bold text-slate-400 tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-slate-300" />
            <span>EXPIRED</span>
          </span>
        );
    }
  };

  return (
    <section className="w-full bg-[#F7F5FA] rounded-[22px] sm:rounded-[26px] p-4 sm:p-6 flex flex-col gap-4 border border-purple-100/50 shadow-xs">
      {/* Header & Filter Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-200/40 pb-3">
        <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] tracking-tight font-inter">
          My Prescription Records
        </h2>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1">
          {FILTER_OPTIONS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => onFilterChange(filter)}
                data-testid={`prescription-filter-${filter.toLowerCase().replace(/\s+/g, '-')}`}
                className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#5C24FF] text-white shadow-xs font-bold'
                    : 'bg-transparent text-slate-600 hover:bg-purple-100/70 hover:text-slate-900'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>

      {/* Record Cards */}
      <div className="flex flex-col gap-3">
        {records.length === 0 ? (
          <div className="py-8 text-center bg-white rounded-2xl border border-slate-200">
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              No prescription records found matching the selected filter.
            </p>
          </div>
        ) : (
          records.map((rec) => (
            <div
              key={rec.id}
              data-testid={`record-card-${rec.id}`}
              className="bg-white rounded-[16px] sm:rounded-[18px] p-4 sm:p-5 border border-slate-100 shadow-2xs hover:shadow-xs transition-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              {/* Left Details */}
              <div className="flex flex-col gap-1 min-w-0">
                {getStatusBadge(rec)}

                <h3 className="text-sm sm:text-base font-bold text-[#0F172A] leading-snug">
                  {rec.condition}
                </h3>

                <span className="text-xs text-slate-500 font-normal">
                  {rec.doctorName}
                </span>

                {/* Metadata Row */}
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 text-[11px] sm:text-xs text-slate-400 font-normal pt-1">
                  {rec.status === 'Active' && (
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Issued: {rec.issueDate} | Expires: {rec.expiryDate}</span>
                    </div>
                  )}

                  {rec.alertNotice && (
                    <div className="flex items-center gap-1.5 text-amber-600 font-semibold">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                      <span>{rec.alertNotice}</span>
                    </div>
                  )}

                  {rec.completedDate && (
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Check className="w-3.5 h-3.5 text-purple-600" />
                      <span>Completed: {rec.completedDate}</span>
                    </div>
                  )}

                  {rec.expiredDate && (
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Expired: {rec.expiredDate}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Pill className="w-3.5 h-3.5 text-purple-400" />
                    <span>{rec.medicationCountLabel}</span>
                  </div>
                </div>
              </div>

              {/* Right Action Buttons */}
              <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => onViewDetails(rec)}
                  aria-label={`View Details for ${rec.condition}`}
                  className="h-[36px] px-3.5 sm:px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
                >
                  View Details
                </button>

                <button
                  type="button"
                  onClick={() => onDownloadRecord(rec)}
                  aria-label={`Download ${rec.condition}`}
                  className="h-[36px] px-3 sm:px-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span className="hidden sm:inline">Download</span>
                </button>

                {rec.canRefill && (
                  <button
                    type="button"
                    onClick={() => onRequestRefill(rec)}
                    aria-label={`Request Refill for ${rec.condition}`}
                    className="h-[36px] px-4 rounded-xl bg-[#5C24FF] hover:bg-[#4C18EC] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    Request Refill
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

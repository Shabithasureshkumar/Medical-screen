import React, { useState } from 'react';
import { Search, Clock, FileText, ChevronRight } from 'lucide-react';
import { historicalRecordsData, HistoricalTestRecord } from '../../data/imagingData';

interface HistoricalRecordsProps {
  onSelectRecord?: (record: HistoricalTestRecord) => void;
  onViewAll?: () => void;
}

export const HistoricalRecords: React.FC<HistoricalRecordsProps> = ({
  onSelectRecord,
  onViewAll
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'labs' | 'imaging'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecords = historicalRecordsData.filter((rec) => {
    if (activeFilter !== 'all' && rec.category !== activeFilter) return false;
    if (searchQuery.trim() && !rec.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const pendingRecords = filteredRecords.filter((r) => r.group === 'pending');
  const juneRecords = filteredRecords.filter((r) => r.group === 'june2026');
  const mayRecords = filteredRecords.filter((r) => r.group === 'may2026');
  const aprilRecords = filteredRecords.filter((r) => r.group === 'april2026');

  const renderBadge = (status?: string, statusType?: string) => {
    if (!status) return null;
    if (statusType === 'abnormal') {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-600 border border-rose-200">
          {status}
        </span>
      );
    }
    if (statusType === 'completed') {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
          {status}
        </span>
      );
    }
    return (
      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600">
        {status}
      </span>
    );
  };

  const renderRecordItem = (record: HistoricalTestRecord) => (
    <button
      key={record.id}
      type="button"
      onClick={() => onSelectRecord?.(record)}
      className="w-full flex items-center justify-between p-3 sm:p-3.5 rounded-xl bg-slate-50/70 hover:bg-slate-100/80 border border-slate-200/60 transition-all text-left group"
    >
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
        <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 group-hover:text-[#6B38D4] transition-colors shrink-0">
          <FileText className="w-4 h-4" />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-xs sm:text-sm font-semibold text-[#1E1B4B] group-hover:text-[#6B38D4] transition-colors truncate">
            {record.name}
          </h4>
          <p className="text-[11px] text-slate-500 mt-0.5 truncate">
            {record.dateOrExpected}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {record.group === 'pending' ? (
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3 h-3 text-amber-500 animate-spin" style={{ animationDuration: '4s' }} />
            <span>Pending</span>
          </div>
        ) : (
          renderBadge(record.status, record.statusType)
        )}
        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
      </div>
    </button>
  );

  return (
    <div className="w-full bg-white/70 backdrop-blur-md rounded-2xl border border-[#7B61FF]/20 shadow-sm p-4 sm:p-6 transition-all duration-300 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-3">
        <h3 className="text-base sm:text-lg font-bold text-[#1E1B4B]">
          Historical Records
        </h3>
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs sm:text-sm font-semibold text-[#6B38D4] hover:text-[#5B2BBF] transition-colors"
        >
          View All
        </button>
      </div>

      {/* Search Input */}
      <div className="relative mt-2">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tests…"
          className="w-full pl-9 pr-4 py-2 bg-slate-50/90 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7B61FF]/30 focus:border-[#7B61FF]"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mt-3 pb-3 border-b border-slate-100">
        {(['all', 'labs', 'imaging'] as const).map((filter) => {
          const labels: Record<string, string> = { all: 'All', labs: 'Labs', imaging: 'Imaging' };
          const isActive = activeFilter === filter;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-[#6B38D4] text-white shadow-sm'
                  : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/80'
              }`}
            >
              {labels[filter]}
            </button>
          );
        })}
      </div>

      {/* Grouped Test Lists */}
      <div className="mt-3 space-y-4 flex-1 overflow-y-auto pr-1">
        {pendingRecords.length > 0 && (
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Pending
            </span>
            <div className="space-y-1.5">
              {pendingRecords.map(renderRecordItem)}
            </div>
          </div>
        )}

        {juneRecords.length > 0 && (
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              June 2026
            </span>
            <div className="space-y-1.5">
              {juneRecords.map(renderRecordItem)}
            </div>
          </div>
        )}

        {mayRecords.length > 0 && (
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              May 2026
            </span>
            <div className="space-y-1.5">
              {mayRecords.map(renderRecordItem)}
            </div>
          </div>
        )}

        {aprilRecords.length > 0 && (
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              April 2026
            </span>
            <div className="space-y-1.5">
              {aprilRecords.map(renderRecordItem)}
            </div>
          </div>
        )}

        {filteredRecords.length === 0 && (
          <div className="py-8 text-center text-xs text-slate-400">
            No matching records found.
          </div>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import { Search, ChevronDown, FileUp } from 'lucide-react';
import { RecordCategory } from '../../data/medicalRecordsData';

interface MedicalRecordsSearchProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedDateRange: string;
  onDateRangeChange: (val: string) => void;
  selectedDocType: string;
  onDocTypeChange: (val: string) => void;
  selectedCategory: RecordCategory;
  onCategoryChange: (cat: RecordCategory) => void;
  onUploadDocument: () => void;
}

const CATEGORIES: RecordCategory[] = [
  'All Records',
  'Lab Results',
  'Imaging',
  'Prescriptions',
  'Visit Notes',
  'Documents'
];

const DATE_RANGE_OPTIONS = [
  'Last 30 Days',
  'Last 60 Days',
  'Last 90 Days',
  'This Year',
  'All Time'
];

const DOC_TYPE_OPTIONS = [
  'All Types',
  'Diagnostic',
  'Imaging',
  'Lab Result',
  'Prescription',
  'Summary'
];

export const MedicalRecordsSearch: React.FC<MedicalRecordsSearchProps> = ({
  searchQuery,
  onSearchChange,
  selectedDateRange,
  onDateRangeChange,
  selectedDocType,
  onDocTypeChange,
  selectedCategory,
  onCategoryChange,
  onUploadDocument
}) => {
  return (
    <div className="w-full flex flex-col gap-4 py-2">
      {/* Top Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-end justify-between gap-3 sm:gap-4 w-full min-w-0">
        {/* Search Input Box */}
        <div className="flex-1 max-w-full md:max-w-[580px] lg:max-w-[620px]">
          <div className="relative flex items-center bg-white border border-slate-200/90 rounded-full px-3.5 sm:px-4 py-1.5 shadow-2xs hover:border-purple-300 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-200 transition-all">
            <Search className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search record, lab result..."
              className="w-full bg-transparent text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none py-1"
              aria-label="Search medical records"
            />
            <button
              type="button"
              onClick={() => onSearchChange(searchQuery.trim())}
              className="bg-[#7C3AED] hover:bg-[#6D28D9] active:scale-95 text-white text-xs font-semibold px-4 sm:px-5 py-1.5 rounded-full cursor-pointer transition-all shadow-xs shrink-0 ml-1"
            >
              Search
            </button>
          </div>
        </div>

        {/* Dropdown Filters (Desktop: inline row; Mobile: stacked cards matching Figma) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:flex items-end gap-2.5 sm:gap-3 shrink-0">
          {/* Date Range Selector */}
          <div className="flex flex-col gap-1 w-full sm:w-auto">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">
              DATE RANGE
            </span>
            <div className="relative">
              <select
                value={selectedDateRange}
                onChange={(e) => onDateRangeChange(e.target.value)}
                aria-label="Select Date Range"
                className="w-full md:min-w-[130px] appearance-none bg-white border border-slate-200/90 rounded-xl px-3.5 py-2 pr-8 text-xs font-medium text-slate-700 cursor-pointer shadow-2xs hover:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
              >
                {DATE_RANGE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Document Type Selector */}
          <div className="flex flex-col gap-1 w-full sm:w-auto">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">
              DOCUMENT TYPE
            </span>
            <div className="relative">
              <select
                value={selectedDocType}
                onChange={(e) => onDocTypeChange(e.target.value)}
                aria-label="Select Document Type"
                className="w-full md:min-w-[125px] appearance-none bg-white border border-slate-200/90 rounded-xl px-3.5 py-2 pr-8 text-xs font-medium text-slate-700 cursor-pointer shadow-2xs hover:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
              >
                {DOC_TYPE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Prominent Mobile Upload Button (Figma Mobile Feature) */}
      <div className="md:hidden w-full pt-1">
        <button
          type="button"
          onClick={onUploadDocument}
          className="w-full h-[48px] rounded-2xl bg-gradient-to-r from-[#8B5CF6] via-[#7C3AED] to-[#6366F1] hover:opacity-95 text-white font-semibold text-sm flex items-center justify-center gap-2.5 shadow-md shadow-purple-500/20 active:scale-[0.99] transition-all cursor-pointer"
        >
          <FileUp className="w-4 h-4 text-white" />
          <span>Upload New Document</span>
        </button>
      </div>

      {/* Category Pills (All Records, Lab Results, Imaging, Prescriptions, Visit Notes, Documents) */}
      <div className="w-full overflow-x-auto no-scrollbar py-1">
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-max">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onCategoryChange(cat)}
                className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'border border-[#7C3AED] bg-purple-50/80 text-[#7C3AED] shadow-2xs'
                    : 'border border-transparent bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

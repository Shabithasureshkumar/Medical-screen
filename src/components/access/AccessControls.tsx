import React, { useState, useRef, useEffect } from 'react';
import { Search, Calendar, ChevronDown, Check } from 'lucide-react';
import { AccessStatusTab } from '../../types/access';

interface AccessControlsProps {
  activeTab: AccessStatusTab;
  onTabChange: (tab: AccessStatusTab) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedDateRange: string;
  onDateRangeChange: (range: string) => void;
}

const DATE_OPTIONS = [
  'Last 7 Days',
  'Last 30 Days',
  'Last 90 Days',
  'All Time'
];

export const AccessControls: React.FC<AccessControlsProps> = ({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  selectedDateRange,
  onDateRangeChange
}) => {
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDateDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const tabs: { id: AccessStatusTab; label: string }[] = [
    { id: 'pending', label: 'Pending' },
    { id: 'approved', label: 'Approved' },
    { id: 'rejected', label: 'Rejected' },
    { id: 'history', label: 'History' }
  ];

  return (
    <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
      {/* Status Tabs */}
      <div
        role="tablist"
        aria-label="Access Request Status Tabs"
        className="inline-flex items-center p-1 sm:p-1.5 rounded-[14px] bg-[#F1F3F9] self-start md:self-auto overflow-x-auto max-w-full"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              data-testid={`access-tab-${tab.id}`}
              onClick={() => onTabChange(tab.id)}
              className={`rounded-[10px] px-3 xs:px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-gradient-to-r from-[#6A3AE0] to-[#5523D5] text-white shadow-sm'
                  : 'text-[#64748B] hover:text-[#1D1B20]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Right Controls: Search + Date Filter */}
      <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto">
        {/* Search Bar */}
        <div className="relative flex-1 md:w-[260px] lg:w-[280px]">
          <div className="h-[38px] sm:h-[42px] px-3 rounded-[12px] bg-[#F1F3F9] flex items-center gap-2 transition-all focus-within:ring-2 focus-within:ring-purple-400">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search activity..."
              data-testid="access-search-input"
              aria-label="Search activity"
              className="w-full bg-transparent border-0 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Date Filter Dropdown */}
        <div className="relative shrink-0" ref={dropdownRef}>
          <button
            type="button"
            data-testid="access-date-filter-button"
            aria-haspopup="listbox"
            aria-expanded={dateDropdownOpen}
            onClick={() => setDateDropdownOpen((prev) => !prev)}
            className="h-[38px] sm:h-[42px] px-3 sm:px-3.5 rounded-[12px] bg-white border border-slate-200 hover:bg-slate-50 flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700 shadow-2xs transition-all cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500 shrink-0" />
            <span className="whitespace-nowrap">{selectedDateRange}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </button>

          {/* Dropdown Menu */}
          {dateDropdownOpen && (
            <div
              role="listbox"
              data-testid="access-date-dropdown-menu"
              className="absolute right-0 mt-1.5 w-44 rounded-xl bg-white border border-slate-100 shadow-lg py-1 z-30 font-inter"
            >
              {DATE_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  role="option"
                  aria-selected={selectedDateRange === opt}
                  onClick={() => {
                    onDateRangeChange(opt);
                    setDateDropdownOpen(false);
                  }}
                  className="w-full px-3.5 py-2 text-left text-xs sm:text-sm flex items-center justify-between hover:bg-purple-50 text-slate-700 hover:text-purple-900 transition-colors cursor-pointer"
                >
                  <span>{opt}</span>
                  {selectedDateRange === opt && <Check className="w-3.5 h-3.5 text-purple-600" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { TimelineFilter } from '../../types/medical';

interface TimelineFiltersProps {
  currentFilter: TimelineFilter;
  onFilterChange: (filter: TimelineFilter) => void;
}

export const TimelineFilters: React.FC<TimelineFiltersProps> = ({
  currentFilter,
  onFilterChange
}) => {
  const filters: { id: TimelineFilter; label: string }[] = [
    { id: 'all', label: 'Full Journey' },
    { id: 'labs', label: 'Lab Reports' },
    { id: 'prescriptions', label: 'Prescriptions' },
    { id: 'vitals', label: 'Vitals' }
  ];

  return (
    <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1 sm:py-2 w-full">
      {filters.map((f) => {
        const isActive = currentFilter === f.id;
        return (
          <button
            key={f.id}
            type="button"
            onClick={() => onFilterChange(f.id)}
            className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              isActive
                ? 'bg-[#6B38D4] text-white shadow-xs font-bold'
                : 'bg-white text-[#424752] border border-slate-200/80 hover:bg-purple-50/50 hover:text-purple-700'
            }`}
          >
            {f.label}
          </button>
        );
      })}
    </div>
  );
};

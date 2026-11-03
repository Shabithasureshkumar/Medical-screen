import React from 'react';
import { BriefcaseMedical, Users } from 'lucide-react';
import { ExternalTab } from '../../types/accessRequest';

interface AccessRequestTabsProps {
  activeTab: ExternalTab;
  onTabChange: (tab: ExternalTab) => void;
}

export const AccessRequestTabs: React.FC<AccessRequestTabsProps> = ({
  activeTab,
  onTabChange
}) => {
  return (
    <div
      role="tablist"
      aria-label="External recipient category"
      className="w-full flex items-center gap-8 border-b border-slate-200/80 mt-1 mb-3"
    >
      {/* Outside Doctor Tab */}
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === 'outside-doctor'}
        data-testid="subtab-outside-doctor"
        onClick={() => onTabChange('outside-doctor')}
        className={`flex items-center gap-2 pb-3 text-sm sm:text-base font-semibold transition-colors relative cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded-t ${
          activeTab === 'outside-doctor'
            ? 'text-[#7C3AED] border-b-2 border-[#7C3AED] -mb-[1px]'
            : 'text-[#64748B] hover:text-[#1E293B]'
        }`}
      >
        <BriefcaseMedical className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
        <span>Outside Doctor</span>
      </button>

      {/* Family Member Tab */}
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === 'family-member'}
        data-testid="subtab-family-member"
        onClick={() => onTabChange('family-member')}
        className={`flex items-center gap-2 pb-3 text-sm sm:text-base font-semibold transition-colors relative cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded-t ${
          activeTab === 'family-member'
            ? 'text-[#7C3AED] border-b-2 border-[#7C3AED] -mb-[1px]'
            : 'text-[#64748B] hover:text-[#1E293B]'
        }`}
      >
        <Users className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
        <span>Family Member</span>
      </button>
    </div>
  );
};

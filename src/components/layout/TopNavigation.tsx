import React from 'react';
import { Search, Settings, Bell, LayoutGrid } from 'lucide-react';

interface TopNavigationProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  activeTab = 'Dashboard',
  onTabChange
}) => {
  const navItems = ['Dashboard', 'Appointment', 'Patient', 'Reports', 'Chats', 'Billing'];

  return (
    <header className="w-full pt-4 sm:pt-6 pb-2 px-3 sm:px-6 lg:px-8 max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Navigation Pill Container */}
      <nav 
        aria-label="Main Navigation"
        className="w-full md:w-auto bg-white rounded-[43px] p-2 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-100 flex items-center overflow-x-auto no-scrollbar gap-2 sm:gap-4 lg:gap-6"
      >
        {navItems.map((item) => {
          const isActive = activeTab === item;
          return (
            <button
              key={item}
              onClick={() => onTabChange?.(item)}
              className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-[14.8px] font-bold tracking-tight transition-all duration-200 cursor-pointer shrink-0 flex items-center gap-1.5 ${
                isActive
                  ? 'bg-gradient-to-b from-[#6B38D4] to-[#5C24FF] text-white shadow-sm font-extrabold'
                  : 'text-[#000000] hover:text-[#5C24FF] hover:bg-purple-50/40'
              }`}
            >
              {item === 'Dashboard' && <LayoutGrid className="w-4 h-4 text-white" />}
              {item}
            </button>
          );
        })}
      </nav>

      {/* Right Controls & Profile */}
      <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0 self-end md:self-auto">
        <button
          type="button"
          aria-label="Search"
          className="w-10 h-10 sm:w-[51px] sm:h-[51px] rounded-full bg-[#DDE2E8] flex items-center justify-center text-slate-700 hover:bg-slate-300 transition-colors cursor-pointer"
        >
          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
        </button>
        <button
          type="button"
          aria-label="Settings"
          className="w-10 h-10 sm:w-[51px] sm:h-[51px] rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
        >
          <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
        </button>
        <button
          type="button"
          aria-label="Notifications"
          className="w-10 h-10 sm:w-[51px] sm:h-[51px] rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
        >
          <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2.5 pl-1 sm:pl-2">
          <div className="w-10 h-10 sm:w-[41px] sm:h-[41px] rounded-full overflow-hidden ring-1 ring-slate-300 bg-purple-100 shrink-0">
            <img
              src="/assets/avatars/david-brock-physician.png"
              alt="David Brock"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-[12px] font-semibold text-[#232C2B] leading-tight">David Brock</span>
            <span className="text-[10.4px] font-semibold text-[#232C2B]/50 leading-tight">General Physician</span>
          </div>
        </div>
      </div>
    </header>
  );
};

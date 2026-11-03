import React, { useState } from 'react';
import { Search, Settings, Bell, LayoutGrid, Menu, X, ChevronDown } from 'lucide-react';

interface TopNavigationProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  patientName?: string;
  patientRole?: string;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  activeTab = 'Dashboard',
  onTabChange,
  patientName = 'David Brock',
  patientRole = 'Patient Portal'
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navItems = ['Dashboard', 'Appointment', 'Patient', 'Reports', 'Chats', 'Billing'];

  return (
    <header className="w-full pt-3 sm:pt-6 pb-2 px-3 sm:px-6 lg:px-8">
      {/* Mobile Top Bar (< 1024px) */}
      <div className="flex lg:hidden items-center justify-between w-full">
        {/* Left: Hamburger Menu Button */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="w-10 h-10 rounded-[12px] bg-[#F1F3F6] hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors cursor-pointer shrink-0 shadow-xs"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Right: Search, Notifications & Profile */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <button
            type="button"
            aria-label="Search"
            className="w-8 h-8 xs:w-9 xs:h-9 rounded-full bg-[#DDE2E8] flex items-center justify-center text-slate-700 hover:bg-slate-300 transition-colors cursor-pointer shrink-0"
          >
            <Search className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-slate-700" />
          </button>
          <button
            type="button"
            aria-label="Notifications"
            className="w-8 h-8 xs:w-9 xs:h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors shadow-xs cursor-pointer shrink-0"
          >
            <Bell className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-slate-700" />
          </button>

          {/* Physician Profile */}
          <div className="flex items-center gap-1 xs:gap-1.5 pl-0.5 shrink-0">
            <div className="w-8 h-8 xs:w-9 xs:h-9 rounded-full overflow-hidden ring-1 ring-slate-300 bg-purple-100 shrink-0">
              <img
                src="/assets/avatars/david-brock-physician.png"
                alt="David Brock"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-0.5">
                <span className="text-[9.5px] xs:text-[10.5px] sm:text-[11px] font-semibold text-[#232C2B] leading-tight whitespace-nowrap">
                  {patientName}
                </span>
                <ChevronDown className="w-2.5 h-2.5 xs:w-3 xs:h-3 text-[#232C2B]/60 shrink-0" />
              </div>
              <span className="text-[7.5px] xs:text-[8.5px] sm:text-[9px] font-medium text-[#232C2B]/50 leading-tight whitespace-nowrap">
                {patientRole}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu when hamburger is clicked */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 p-3 rounded-2xl bg-white border border-slate-100 shadow-lg flex flex-col gap-1.5 animate-in fade-in duration-200">
          {navItems.map((item) => {
            const isActive = activeTab === item;
            return (
              <button
                key={item}
                onClick={() => {
                  onTabChange?.(item);
                  setMobileMenuOpen(false);
                }}
                className={`w-full px-4 py-2 rounded-xl text-left text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#6B38D4] to-[#5C24FF] text-white shadow-xs'
                    : 'text-slate-700 hover:bg-purple-50/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  {item === 'Dashboard' && <LayoutGrid className="w-4 h-4" />}
                  <span>{item}</span>
                </div>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
              </button>
            );
          })}
        </div>
      )}

      {/* Desktop Navigation Header (lg:flex) */}
      <div className="hidden lg:flex items-center justify-between w-full">
        {/* Navigation Pill Container */}
        <nav 
          aria-label="Main Navigation"
          className="bg-white rounded-[43px] p-1.5 xl:p-2 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-100 flex items-center gap-1 xl:gap-3 min-[1380px]:gap-6 shrink-0"
        >
          {navItems.map((item) => {
            const isActive = activeTab === item;
            return (
              <button
                key={item}
                onClick={() => onTabChange?.(item)}
                className={`px-3 xl:px-5 min-[1380px]:px-6 py-2 xl:py-2.5 rounded-full text-xs xl:text-[13.5px] min-[1380px]:text-[14.8px] font-bold tracking-tight transition-all duration-200 cursor-pointer shrink-0 flex items-center gap-1 xl:gap-1.5 ${
                  isActive
                    ? 'bg-gradient-to-b from-[#6B38D4] to-[#5C24FF] text-white shadow-sm font-extrabold'
                    : 'text-[#000000] hover:text-[#5C24FF] hover:bg-purple-50/40'
                }`}
              >
                {item === 'Dashboard' && (
                  <LayoutGrid
                    className={`w-3.5 h-3.5 xl:w-4 xl:h-4 ${
                      isActive ? 'text-white' : 'text-current'
                    }`}
                  />
                )}
                {item}
              </button>
            );
          })}
        </nav>

        {/* Right Controls & Profile */}
        <div className="flex items-center gap-1.5 xl:gap-2.5 min-[1380px]:gap-3.5 shrink-0">
          <button
            type="button"
            aria-label="Search"
            className="w-9 h-9 xl:w-10 xl:h-10 min-[1380px]:w-[51px] min-[1380px]:h-[51px] rounded-full bg-[#DDE2E8] flex items-center justify-center text-slate-700 hover:bg-slate-300 transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4 min-[1380px]:w-5 min-[1380px]:h-5 text-slate-700" />
          </button>
          <button
            type="button"
            aria-label="Settings"
            className="w-9 h-9 xl:w-10 xl:h-10 min-[1380px]:w-[51px] min-[1380px]:h-[51px] rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
          >
            <Settings className="w-4 h-4 min-[1380px]:w-5 min-[1380px]:h-5 text-slate-700" />
          </button>
          <button
            type="button"
            aria-label="Notifications"
            className="w-9 h-9 xl:w-10 xl:h-10 min-[1380px]:w-[51px] min-[1380px]:h-[51px] rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
          >
            <Bell className="w-4 h-4 min-[1380px]:w-5 min-[1380px]:h-5 text-slate-700" />
          </button>

          {/* Profile */}
          <div className="flex items-center gap-2 min-[1380px]:gap-2.5 pl-1 sm:pl-2">
            <div className="w-9 h-9 xl:w-10 xl:h-10 min-[1380px]:w-[41px] min-[1380px]:h-[41px] rounded-full overflow-hidden ring-1 ring-slate-300 bg-purple-100 shrink-0">
              <img
                src="/assets/avatars/david-brock-physician.png"
                alt={patientName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[11px] xl:text-[13px] min-[1380px]:text-[12px] font-semibold text-[#232C2B] leading-tight">{patientName}</span>
              <span className="text-[9.5px] xl:text-[11px] min-[1380px]:text-[10.4px] font-semibold text-[#232C2B]/50 leading-tight">{patientRole}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

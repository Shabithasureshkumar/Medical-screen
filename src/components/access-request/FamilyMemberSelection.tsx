import React from 'react';
import { Check, Lock, Key, Plus } from 'lucide-react';
import { FamilyMemberRecipient } from '../../types/accessRequest';

interface FamilyMemberSelectionProps {
  familyMembers: FamilyMemberRecipient[];
  selectedMemberId: string | null;
  onSelectMember: (id: string) => void;
  onRequestAccess: (member: FamilyMemberRecipient) => void;
  onAddFamilyMember: () => void;
}

export const FamilyMemberSelection: React.FC<FamilyMemberSelectionProps> = ({
  familyMembers,
  selectedMemberId,
  onSelectMember,
  onRequestAccess,
  onAddFamilyMember
}) => {
  return (
    <div className="w-full rounded-[20px] sm:rounded-[24px] bg-[#F8FAFC] border border-slate-200/70 p-4 sm:p-5 flex flex-col gap-4 shadow-xs">
      <h2 className="text-sm sm:text-base font-bold text-[#0F172A] font-inter">
        Select Family Member
      </h2>

      {/* Responsive Grid: 1 col on mobile, 2 col on tablet, 3 col on desktop */}
      <div role="radiogroup" aria-label="Select Family Member" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5">
        {familyMembers.filter((m) => !m.isSelf).map((member) => {
          const isLocked = member.accessLevel === 'LOCKED';
          const isSelected = !isLocked && selectedMemberId === member.id;
          return (
            <div
              key={member.id}
              role="radio"
              aria-checked={isSelected}
              aria-disabled={isLocked}
              tabIndex={isLocked ? -1 : 0}
              data-testid={`family-member-card-${member.id}`}
              onClick={() => {
                if (!isLocked) {
                  onSelectMember(member.id);
                }
              }}
              onKeyDown={(e) => {
                if (!isLocked && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  onSelectMember(member.id);
                }
              }}
              className={`relative rounded-[16px] sm:rounded-[20px] bg-white border p-3 sm:p-3.5 flex items-center gap-3 transition-all ${
                isLocked
                  ? 'border-slate-200/70 opacity-85 cursor-not-allowed'
                  : isSelected
                  ? 'border-[#7C3AED] ring-2 ring-purple-100 shadow-sm cursor-pointer'
                  : 'border-slate-200/80 hover:border-slate-300 cursor-pointer'
              }`}
            >
              {/* Top-Right Indicator / Lock */}
              {isSelected ? (
                <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#7C3AED] text-white flex items-center justify-center">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              ) : member.accessLevel === 'LOCKED' ? (
                <div className="absolute top-2.5 right-2.5 text-slate-400">
                  <Lock className="w-3.5 h-3.5" />
                </div>
              ) : null}

              {/* Avatar */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-[14px] overflow-hidden bg-slate-100 ring-1 ring-slate-200/60 shrink-0">
                <img
                  src={member.avatarUrl}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="flex flex-col items-start gap-0.5 min-w-0 flex-1 pr-4">
                <span className="text-xs sm:text-sm font-bold text-[#0F172A] truncate">
                  {member.name}
                </span>

                {member.accessLevel === 'FULL ACCESS' && (
                  <span className="px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[8.5px] font-bold tracking-wider uppercase">
                    Full Access
                  </span>
                )}

                {member.accessLevel === 'VIEW ONLY' && (
                  <span className="px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[8.5px] font-bold tracking-wider uppercase">
                    View Only
                  </span>
                )}

                <span className="text-[10px] font-bold text-[#7C3AED] tracking-wider uppercase">
                  {member.relationship}
                </span>

                {member.canRequestAccess && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRequestAccess(member);
                    }}
                    data-testid={`request-access-btn-${member.id}`}
                    className="mt-1 px-3 py-1 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] hover:opacity-95 text-white text-[10px] font-semibold flex items-center gap-1.5 shadow-xs transition-opacity cursor-pointer"
                  >
                    <Key className="w-3 h-3" />
                    <span>Request Access</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {/* Add Family Member Card */}
        <button
          type="button"
          onClick={onAddFamilyMember}
          data-testid="add-family-member-button"
          className="rounded-[16px] sm:rounded-[20px] bg-white border border-dashed border-slate-300 hover:border-purple-400 p-3 sm:p-3.5 flex items-center gap-3 cursor-pointer transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 text-left"
        >
          <div className="w-10 h-10 rounded-[12px] bg-[#EDE9FE] text-[#7C3AED] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Plus className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-bold text-[#0F172A]">
              Add Family
            </span>
            <span className="text-[10px] font-semibold text-[#64748B] tracking-wider uppercase">
              Member
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

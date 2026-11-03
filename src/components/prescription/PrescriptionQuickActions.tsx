import React from 'react';
import { RotateCcw, Share2, MessageSquare, Sparkles } from 'lucide-react';

interface PrescriptionQuickActionsProps {
  doctorName: string;
  onRequestRefill: () => void;
  onShareWithCareTeam: () => void;
  onMessageDoctor: () => void;
  onAskAiAssistant: () => void;
}

export const PrescriptionQuickActions: React.FC<PrescriptionQuickActionsProps> = ({
  doctorName,
  onRequestRefill,
  onShareWithCareTeam,
  onMessageDoctor,
  onAskAiAssistant
}) => {
  return (
    <div className="w-full flex flex-col gap-2.5">
      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-1">
        QUICK ACTIONS
      </span>

      <div className="flex flex-col gap-2">
        {/* Action 1: Request Medication Refill */}
        <button
          type="button"
          onClick={onRequestRefill}
          data-testid="quick-action-request-refill"
          className="w-full h-[46px] rounded-full bg-white hover:bg-purple-50/50 border border-slate-200/90 text-slate-800 text-xs sm:text-[13px] font-semibold flex items-center gap-3 px-5 shadow-2xs hover:shadow-xs transition-all cursor-pointer group text-left"
        >
          <RotateCcw className="w-4 h-4 text-[#7C3AED] group-hover:rotate-180 transition-transform duration-300 shrink-0" />
          <span className="group-hover:text-purple-900 transition-colors">
            Request Medication Refill
          </span>
        </button>

        {/* Action 2: Share with Care Team */}
        <button
          type="button"
          onClick={onShareWithCareTeam}
          data-testid="quick-action-share-care-team"
          className="w-full h-[46px] rounded-full bg-white hover:bg-purple-50/50 border border-slate-200/90 text-slate-800 text-xs sm:text-[13px] font-semibold flex items-center gap-3 px-5 shadow-2xs hover:shadow-xs transition-all cursor-pointer group text-left"
        >
          <Share2 className="w-4 h-4 text-[#7C3AED] shrink-0" />
          <span className="group-hover:text-purple-900 transition-colors">
            Share with Care Team
          </span>
        </button>

        {/* Action 3: Message Doctor */}
        <button
          type="button"
          onClick={onMessageDoctor}
          data-testid="quick-action-message-doctor"
          className="w-full h-[46px] rounded-full bg-white hover:bg-purple-50/50 border border-slate-200/90 text-slate-800 text-xs sm:text-[13px] font-semibold flex items-center gap-3 px-5 shadow-2xs hover:shadow-xs transition-all cursor-pointer group text-left"
        >
          <MessageSquare className="w-4 h-4 text-[#7C3AED] shrink-0" />
          <span className="group-hover:text-purple-900 transition-colors truncate">
            Message {doctorName}
          </span>
        </button>

        {/* Action 4: Ask AI Assistant */}
        <button
          type="button"
          onClick={onAskAiAssistant}
          data-testid="quick-action-ask-ai"
          className="w-full h-[46px] rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#5C24FF] hover:opacity-95 text-white text-xs sm:text-[13px] font-semibold flex items-center justify-center gap-2 shadow-md shadow-purple-500/20 active:scale-[0.99] transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-white shrink-0" />
          <span>Ask AI Assistant</span>
        </button>
      </div>
    </div>
  );
};

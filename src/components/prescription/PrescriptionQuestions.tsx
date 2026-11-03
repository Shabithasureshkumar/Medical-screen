import React from 'react';
import { MessageSquare, Phone, Send, MessageCircle } from 'lucide-react';
import { ActivePrescriptionDetails } from '../../data/prescriptionData';

interface PrescriptionQuestionsProps {
  questions: ActivePrescriptionDetails['questions'];
  onMessageCareTeam: () => void;
  onCallOffice: () => void;
  onMessageDoctor: () => void;
}

export const PrescriptionQuestions: React.FC<PrescriptionQuestionsProps> = ({
  questions,
  onMessageCareTeam,
  onCallOffice,
  onMessageDoctor
}) => {
  return (
    <div className="w-full">
      {/* Desktop Card */}
      <div className="hidden md:flex flex-col bg-[#FBF9F7] border border-orange-100/80 rounded-[22px] p-5 shadow-xs gap-3.5">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-bold text-slate-900">
            Have Questions?
          </h3>
          <p className="text-xs text-slate-500 font-normal leading-relaxed">
            If you experience any unexpected side effects, please contact {questions.doctorName}'s office immediately.
          </p>
        </div>

        {/* Action 1: Message Care Team */}
        <button
          type="button"
          onClick={onMessageCareTeam}
          data-testid="message-care-team-button"
          className="w-full bg-white rounded-[14px] p-3 flex items-center justify-between border border-slate-100 hover:border-purple-200 shadow-2xs cursor-pointer transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#EDE9FE] flex items-center justify-center text-[#7C3AED] group-hover:scale-105 transition-transform shrink-0">
              <MessageSquare className="w-4 h-4 text-[#7C3AED]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-slate-800 group-hover:text-purple-900 transition-colors">
                Message Care Team
              </span>
              <span className="text-[10px] text-slate-400 font-normal">
                {questions.careTeamResponseTime}
              </span>
            </div>
          </div>
        </button>

        {/* Action 2: Call Office */}
        <button
          type="button"
          onClick={onCallOffice}
          data-testid="call-office-button"
          className="w-full bg-white rounded-[14px] p-3 flex items-center justify-between border border-slate-100 hover:border-purple-200 shadow-2xs cursor-pointer transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#EDE9FE] flex items-center justify-center text-[#7C3AED] group-hover:scale-105 transition-transform shrink-0">
              <Phone className="w-4 h-4 text-[#7C3AED]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-slate-800 group-hover:text-purple-900 transition-colors">
                Call Office
              </span>
              <span className="text-[10px] text-slate-400 font-normal">
                {questions.officePhone}
              </span>
            </div>
          </div>
        </button>
      </div>

      {/* Mobile Card */}
      <div
        onClick={onMessageDoctor}
        className="md:hidden flex items-center justify-between bg-[#FFF7ED] rounded-2xl p-4 shadow-2xs border border-orange-200/60 cursor-pointer active:scale-[0.99] transition-all"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-amber-700 shadow-2xs shrink-0">
            <MessageCircle className="w-5 h-5 text-amber-600" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[9px] font-bold text-amber-800 uppercase tracking-wider">
              HAVE QUESTIONS?
            </span>
            <span className="text-xs font-bold text-slate-900 truncate">
              Message {questions.doctorName}
            </span>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-amber-700 shadow-2xs shrink-0">
          <Send className="w-3.5 h-3.5 text-amber-600" />
        </div>
      </div>
    </div>
  );
};

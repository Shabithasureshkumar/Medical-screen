import React from 'react';
import { Check, Hourglass, Lock, X } from 'lucide-react';
import { RequestStatus, TimelineProgressStep } from '../../types/access';

interface AccessTimelineProgressProps {
  status: RequestStatus;
  steps?: TimelineProgressStep[];
}

export const AccessTimelineProgress: React.FC<AccessTimelineProgressProps> = ({ status, steps }) => {
  const stepLabels = [
    steps?.[0]?.label || 'Request Sent',
    steps?.[1]?.label || (status === 'pending' ? 'Waiting Approval' : status === 'approved' ? 'Approved' : 'Reviewed'),
    steps?.[2]?.label || (status === 'pending' ? 'Access Granted' : status === 'approved' ? 'Access Active' : 'Rejected')
  ];

  if (status === 'pending') {
    return (
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Step 1: Request Sent (Purple Complete) */}
        <div className="flex flex-col items-center">
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#5C24FF] text-white flex items-center justify-center shadow-xs">
            <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />
          </div>
          <span className="text-[8px] sm:text-[9px] md:text-[10px] font-semibold text-purple-700 whitespace-nowrap mt-1">
            {stepLabels[0]}
          </span>
        </div>

        {/* Connector 1: Active Purple */}
        <div className="w-5 sm:w-8 md:w-10 h-0.5 bg-[#5C24FF] self-center -mt-3.5" />

        {/* Step 2: Waiting Approval (Amber Hourglass) */}
        <div className="flex flex-col items-center">
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#FEF3C7] border border-amber-400 text-amber-600 flex items-center justify-center shadow-xs">
            <Hourglass className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          </div>
          <span className="text-[8px] sm:text-[9px] md:text-[10px] font-semibold text-amber-600 whitespace-nowrap mt-1">
            {stepLabels[1]}
          </span>
        </div>

        {/* Connector 2: Inactive Gray */}
        <div className="w-5 sm:w-8 md:w-10 h-0.5 bg-slate-200 self-center -mt-3.5" />

        {/* Step 3: Access Granted (Inactive Gray Lock) */}
        <div className="flex flex-col items-center">
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-50 border border-slate-300 text-slate-400 flex items-center justify-center">
            <Lock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          </div>
          <span className="text-[8px] sm:text-[9px] md:text-[10px] font-normal text-slate-400 whitespace-nowrap mt-1">
            {stepLabels[2]}
          </span>
        </div>
      </div>
    );
  }

  if (status === 'approved') {
    return (
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Step 1: Request Sent (Green) */}
        <div className="flex flex-col items-center">
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#10B981] text-white flex items-center justify-center shadow-xs">
            <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />
          </div>
          <span className="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-slate-600 whitespace-nowrap mt-1">
            {stepLabels[0]}
          </span>
        </div>

        {/* Connector 1: Green */}
        <div className="w-5 sm:w-8 md:w-10 h-0.5 bg-[#10B981] self-center -mt-3.5" />

        {/* Step 2: Approved (Green) */}
        <div className="flex flex-col items-center">
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#10B981] text-white flex items-center justify-center shadow-xs">
            <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />
          </div>
          <span className="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-slate-600 whitespace-nowrap mt-1">
            {stepLabels[1]}
          </span>
        </div>

        {/* Connector 2: Green */}
        <div className="w-5 sm:w-8 md:w-10 h-0.5 bg-[#10B981] self-center -mt-3.5" />

        {/* Step 3: Access Active (Green) */}
        <div className="flex flex-col items-center">
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#10B981] text-white flex items-center justify-center shadow-xs">
            <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />
          </div>
          <span className="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-slate-600 whitespace-nowrap mt-1">
            {stepLabels[2]}
          </span>
        </div>
      </div>
    );
  }

  // status === 'rejected'
  return (
    <div className="flex items-center gap-1 sm:gap-2">
      {/* Step 1: Request Sent (Green) */}
      <div className="flex flex-col items-center">
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#10B981] text-white flex items-center justify-center shadow-xs">
          <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />
        </div>
        <span className="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-slate-600 whitespace-nowrap mt-1">
          {stepLabels[0]}
        </span>
      </div>

      {/* Connector 1: Green */}
      <div className="w-5 sm:w-8 md:w-10 h-0.5 bg-[#10B981] self-center -mt-3.5" />

      {/* Step 2: Reviewed (Green) */}
      <div className="flex flex-col items-center">
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#10B981] text-white flex items-center justify-center shadow-xs">
          <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />
        </div>
        <span className="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-slate-600 whitespace-nowrap mt-1">
          {stepLabels[1]}
        </span>
      </div>

      {/* Connector 2: Red */}
      <div className="w-5 sm:w-8 md:w-10 h-0.5 bg-[#EF4444] self-center -mt-3.5" />

      {/* Step 3: Rejected (Red X) */}
      <div className="flex flex-col items-center">
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#EF4444] text-white flex items-center justify-center shadow-xs">
          <X className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />
        </div>
        <span className="text-[8px] sm:text-[9px] md:text-[10px] font-semibold text-rose-600 whitespace-nowrap mt-1">
          {stepLabels[2]}
        </span>
      </div>
    </div>
  );
};

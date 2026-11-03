import React from 'react';
import { Send, Eye, X, RotateCcw } from 'lucide-react';
import { AccessRequestItem } from '../../types/access';
import { AccessTimelineProgress } from './AccessTimelineProgress';

interface AccessRequestCardProps {
  request: AccessRequestItem;
  onSendReminder?: (request: AccessRequestItem) => void;
  onViewDetails?: (request: AccessRequestItem) => void;
  onCancelRequest?: (request: AccessRequestItem) => void;
  onViewRecords?: (request: AccessRequestItem) => void;
  onShareWithDoctor?: (request: AccessRequestItem) => void;
  onRevokeAccess?: (request: AccessRequestItem) => void;
  onManagePermission?: (request: AccessRequestItem) => void;
  onContactFamily?: (request: AccessRequestItem) => void;
  onRequestAgain?: (request: AccessRequestItem) => void;
}

export const AccessRequestCard: React.FC<AccessRequestCardProps> = ({
  request,
  onSendReminder,
  onViewDetails,
  onCancelRequest,
  onViewRecords,
  onShareWithDoctor,
  onRevokeAccess,
  onManagePermission,
  onContactFamily,
  onRequestAgain
}) => {
  return (
    <article
      data-testid={`access-card-${request.id}`}
      className="bg-white rounded-[20px] p-4 sm:p-5 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow flex flex-col xl:flex-row xl:items-center justify-between gap-4 xl:gap-6 min-w-0"
    >
      {/* 1. Left: Avatar + Name + Badges */}
      <div className="flex items-center gap-3 sm:gap-3.5 shrink-0 min-w-0 xl:w-[220px]">
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200/60 shadow-2xs">
          <img
            src={request.avatarUrl}
            alt={request.name}
            className="w-full h-full object-cover select-none pointer-events-none"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col min-w-0">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="font-bold text-[#1D1B20] text-sm sm:text-[15px] font-inter truncate">
              {request.name}
            </span>
            <span className="text-xs text-[#7A7582] font-inter shrink-0">
              ({request.relationship})
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-1 flex-wrap">
            <span className="bg-[#F3E8FF] text-[#6B21A8] text-[10px] font-bold px-2 py-0.5 rounded-full font-inter">
              {request.accessLevel}
            </span>
            <span className="text-[10px] text-[#7A7582] font-inter">
              • {request.duration}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Reason for Access / Rejection Reason Box */}
      <div className="shrink-0 xl:w-[200px] 2xl:w-[220px]">
        <div className="bg-[#F8F9FD] rounded-xl p-2.5 sm:p-3 border border-slate-100/80">
          {request.status === 'rejected' ? (
            <>
              <span className="text-[9px] font-bold text-[#7A7582] uppercase tracking-wider font-inter block">
                REJECTION REASON
              </span>
              <p className="text-[11px] text-slate-600 italic font-inter leading-tight mt-0.5 line-clamp-2">
                "{request.rejectionReason}"
              </p>
            </>
          ) : (
            <>
              <span className="text-[9px] font-bold text-[#7A7582] uppercase tracking-wider font-inter block">
                Reason for Access
              </span>
              <p className="text-[11px] font-medium text-slate-700 font-inter leading-tight mt-0.5 line-clamp-2">
                {request.reason}
              </p>
            </>
          )}
        </div>
      </div>

      {/* 3. Center: Visual Timeline Progression */}
      <div className="flex justify-center xl:justify-start shrink-0">
        <AccessTimelineProgress status={request.status} steps={request.timelineSteps} />
      </div>

      {/* 4. Action Buttons */}
      <div className="flex items-center gap-2 flex-wrap xl:flex-nowrap shrink-0">
        {request.status === 'pending' && (
          <>
            <button
              type="button"
              data-testid={`action-send-reminder-${request.id}`}
              onClick={() => onSendReminder?.(request)}
              className="h-[34px] sm:h-[36px] px-3.5 sm:px-4 rounded-full bg-[#5C24FF] hover:bg-[#4C1DE6] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>Send Reminder</span>
              <Send className="w-3 h-3 fill-current" />
            </button>
            <button
              type="button"
              data-testid={`action-view-details-${request.id}`}
              onClick={() => onViewDetails?.(request)}
              className="h-[34px] sm:h-[36px] px-3 sm:px-3.5 rounded-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
            >
              <Eye className="w-3.5 h-3.5 text-slate-500" />
              <span>View Details</span>
            </button>
            <button
              type="button"
              data-testid={`action-cancel-request-${request.id}`}
              onClick={() => onCancelRequest?.(request)}
              className="h-[34px] sm:h-[36px] px-3 sm:px-3.5 rounded-full bg-white border border-rose-200 hover:bg-rose-50 text-rose-600 text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
            >
              <X className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Cancel Request</span>
            </button>
          </>
        )}

        {request.status === 'approved' && (
          <>
            <button
              type="button"
              data-testid={`action-view-records-${request.id}`}
              onClick={() => onViewRecords?.(request)}
              className="h-[34px] sm:h-[36px] px-3.5 sm:px-4 rounded-full bg-[#5C24FF] hover:bg-[#4C1DE6] text-white text-xs font-semibold shadow-xs cursor-pointer transition-colors"
            >
              View Records
            </button>
            <button
              type="button"
              data-testid={`action-share-doctor-${request.id}`}
              onClick={() => onShareWithDoctor?.(request)}
              className="h-[34px] sm:h-[36px] px-3 sm:px-3.5 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium cursor-pointer transition-colors"
            >
              Share With Doctor
            </button>
            <button
              type="button"
              data-testid={`action-revoke-access-${request.id}`}
              onClick={() => onRevokeAccess?.(request)}
              className="h-[34px] sm:h-[36px] px-3 sm:px-3.5 rounded-full bg-white border border-rose-200 hover:bg-rose-50 text-rose-600 text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Revoke Access</span>
            </button>
            <button
              type="button"
              data-testid={`action-manage-permission-${request.id}`}
              onClick={() => onManagePermission?.(request)}
              className="h-[34px] sm:h-[36px] px-3 sm:px-3.5 rounded-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium cursor-pointer transition-colors shadow-2xs"
            >
              Manage Permission
            </button>
          </>
        )}

        {request.status === 'rejected' && (
          <>
            <button
              type="button"
              data-testid={`action-view-details-${request.id}`}
              onClick={() => onViewDetails?.(request)}
              className="h-[34px] sm:h-[36px] px-3.5 sm:px-4 rounded-full bg-[#5C24FF] hover:bg-[#4C1DE6] text-white text-xs font-semibold shadow-xs cursor-pointer transition-colors"
            >
              View Details
            </button>
            <button
              type="button"
              data-testid={`action-contact-family-${request.id}`}
              onClick={() => onContactFamily?.(request)}
              className="h-[34px] sm:h-[36px] px-3 sm:px-3.5 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium cursor-pointer transition-colors"
            >
              Contact Family Member
            </button>
            <button
              type="button"
              data-testid={`action-request-again-${request.id}`}
              onClick={() => onRequestAgain?.(request)}
              className="h-[34px] sm:h-[36px] px-3 sm:px-3.5 rounded-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium cursor-pointer transition-colors shadow-2xs"
            >
              Request Again
            </button>
          </>
        )}
      </div>

      {/* 5. Rightmost: Date Information */}
      <div className="flex flex-col text-left xl:text-right shrink-0 min-w-[110px]">
        {request.status === 'pending' && (
          <>
            <span className="text-[9px] font-bold text-[#7A7582] uppercase tracking-wider font-inter">
              REQUESTED ON
            </span>
            <span className="text-xs font-semibold text-slate-700 font-inter mt-0.5">
              {request.requestedDate}
            </span>
          </>
        )}

        {request.status === 'approved' && (
          <>
            <span className="text-[10px] text-[#7A7582] font-inter">
              Granted: <strong className="text-slate-700 font-semibold">{request.grantedDate}</strong>
            </span>
            <span className="text-[10px] text-[#7A7582] font-inter mt-0.5">
              Expires: <strong className="text-slate-700 font-semibold">{request.expiresDate}</strong>
            </span>
          </>
        )}

        {request.status === 'rejected' && (
          <>
            <span className="text-[10px] text-[#7A7582] font-inter">
              Request: <strong className="text-slate-700 font-semibold">{request.requestedDate}</strong>
            </span>
            <span className="text-[10px] text-[#7A7582] font-inter mt-0.5">
              Rejected: <strong className="text-slate-700 font-semibold">{request.rejectedDate}</strong>
            </span>
          </>
        )}
      </div>
    </article>
  );
};

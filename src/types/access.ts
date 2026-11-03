export type AccessType = 'family' | 'doctor';

export type AccessStatusTab = 'pending' | 'approved' | 'rejected' | 'history';

export type RequestStatus = 'pending' | 'approved' | 'rejected';

export interface TimelineProgressStep {
  label: string;
  sublabel?: string;
  status: 'completed' | 'current' | 'pending' | 'rejected';
}

export interface AccessRequestItem {
  id: string;
  name: string;
  relationship: string;
  avatarUrl: string;
  accessLevel: string; // e.g. 'Full Access'
  duration: string; // e.g. '30 Days'
  reason: string;
  status: RequestStatus;
  requestedDate: string;
  grantedDate?: string;
  expiresDate?: string;
  rejectedDate?: string;
  rejectionReason?: string;
  timelineSteps: TimelineProgressStep[];
  doctorInfo?: {
    specialty: string;
    hospital: string;
  };
}

export type ActivityLogType =
  | 'access_granted'
  | 'records_viewed'
  | 'shared_records'
  | 'permission_modified'
  | 'access_revoked';

export interface DoctorCardInfo {
  name: string;
  specialty: string;
  hospital: string;
  avatarUrl: string;
}

export interface ActivityLogItem {
  id: string;
  type: ActivityLogType;
  title: string;
  description: string;
  actor?: string;
  targetEntity?: string;
  isVerified?: boolean;
  ip?: string;
  sessionDuration?: string;
  doctor?: DoctorCardInfo;
  scopeBadge?: string;
  timestamp: string;
  dotColor: 'emerald' | 'blue' | 'purple' | 'amber' | 'rose';
}

export interface AccessSummaryStats {
  activeAccess: {
    count: number;
    changeText: string;
  };
  pendingRequests: {
    count: number;
    badgeText: string;
  };
  rejectedRequests: {
    count: number;
    periodText: string;
  };
}

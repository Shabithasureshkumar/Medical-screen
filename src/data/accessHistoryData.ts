import {
  AccessRequestItem,
  ActivityLogItem,
  AccessSummaryStats
} from '../types/access';

export const accessSummaryData: AccessSummaryStats = {
  activeAccess: {
    count: 12,
    changeText: '+2 this week'
  },
  pendingRequests: {
    count: 4,
    badgeText: 'Needs Review'
  },
  rejectedRequests: {
    count: 2,
    periodText: 'Last 30 days'
  }
};

export const pendingAccessRequestsData: AccessRequestItem[] = [
  {
    id: 'pending-1',
    name: 'Sarah Brock',
    relationship: 'Mother',
    avatarUrl: '/assets/avatars/sarah-brock.png',
    accessLevel: 'Full Access',
    duration: '30 Days',
    reason: 'Appointment Management & Prescription Oversight',
    status: 'pending',
    requestedDate: '12 June 2026',
    timelineSteps: [
      { label: 'Request Sent', status: 'completed' },
      { label: 'Waiting Approval', status: 'current' },
      { label: 'Access Granted', status: 'pending' }
    ]
  },
  {
    id: 'pending-2',
    name: 'Michael Brock',
    relationship: 'Spouse',
    avatarUrl: '/assets/avatars/michael-brock.png',
    accessLevel: 'View & Download',
    duration: '90 Days',
    reason: 'Cardiology Lipid & Electrolyte Panel Follow-up Review',
    status: 'pending',
    requestedDate: '04 June 2026',
    timelineSteps: [
      { label: 'Request Sent', status: 'completed' },
      { label: 'Waiting Approval', status: 'current' },
      { label: 'Access Granted', status: 'pending' }
    ]
  },
  {
    id: 'pending-3',
    name: 'Elena Brock',
    relationship: 'Sister',
    avatarUrl: '/assets/avatars/sarah-brock.png',
    accessLevel: 'Emergency Only',
    duration: '60 Days',
    reason: 'Emergency Care Contact & Allergy Record Verification',
    status: 'pending',
    requestedDate: '18 May 2026',
    timelineSteps: [
      { label: 'Request Sent', status: 'completed' },
      { label: 'Waiting Approval', status: 'current' },
      { label: 'Access Granted', status: 'pending' }
    ]
  }
];

export const approvedAccessRequestsData: AccessRequestItem[] = [
  {
    id: 'approved-1',
    name: 'Sarah Brock',
    relationship: 'Mother',
    avatarUrl: '/assets/avatars/sarah-brock.png',
    accessLevel: 'Full Access',
    duration: '30 Days',
    reason: 'Appointment Management & Prescription Oversight',
    status: 'approved',
    requestedDate: '12 June 2026',
    grantedDate: '12 June 2026',
    expiresDate: '12 July 2026',
    timelineSteps: [
      { label: 'Request Sent', status: 'completed' },
      { label: 'Approved', status: 'completed' },
      { label: 'Access Active', status: 'completed' }
    ]
  },
  {
    id: 'approved-2',
    name: 'Michael Brock',
    relationship: 'Spouse',
    avatarUrl: '/assets/avatars/michael-brock.png',
    accessLevel: 'Full Access',
    duration: '90 Days',
    reason: 'Household Medication & Diagnostic Lab Coordination',
    status: 'approved',
    requestedDate: '25 May 2026',
    grantedDate: '25 May 2026',
    expiresDate: '23 August 2026',
    timelineSteps: [
      { label: 'Request Sent', status: 'completed' },
      { label: 'Approved', status: 'completed' },
      { label: 'Access Active', status: 'completed' }
    ]
  },
  {
    id: 'approved-3',
    name: 'Arthur Brock',
    relationship: 'Father',
    avatarUrl: '/assets/avatars/david-brock-self.png',
    accessLevel: 'View Only',
    duration: '60 Days',
    reason: 'Family Cardiovascular History & Lipid Trend Reference',
    status: 'approved',
    requestedDate: '10 April 2026',
    grantedDate: '11 April 2026',
    expiresDate: '10 June 2026',
    timelineSteps: [
      { label: 'Request Sent', status: 'completed' },
      { label: 'Approved', status: 'completed' },
      { label: 'Access Active', status: 'completed' }
    ]
  },
  {
    id: 'approved-4',
    name: 'Claire Brock',
    relationship: 'Daughter',
    avatarUrl: '/assets/avatars/sarah-brock.png',
    accessLevel: 'View Only',
    duration: '30 Days',
    reason: 'Immunization & Annual Wellness Summary Access',
    status: 'approved',
    requestedDate: '14 Jan 2026',
    grantedDate: '15 Jan 2026',
    expiresDate: '14 Feb 2026',
    timelineSteps: [
      { label: 'Request Sent', status: 'completed' },
      { label: 'Approved', status: 'completed' },
      { label: 'Access Active', status: 'completed' }
    ]
  }
];

export const rejectedAccessRequestsData: AccessRequestItem[] = [
  {
    id: 'rejected-1',
    name: 'Sarah Brock',
    relationship: 'Mother',
    avatarUrl: '/assets/avatars/sarah-brock.png',
    accessLevel: 'Full Access',
    duration: '30 Days',
    reason: 'Unrestricted Psychiatric & Behavioral Notes Review',
    rejectionReason: 'User prefers to maintain private management of clinical notes at this time.',
    status: 'rejected',
    requestedDate: '02 June 2026',
    rejectedDate: '05 June 2026',
    timelineSteps: [
      { label: 'Request Sent', status: 'completed' },
      { label: 'Reviewed', status: 'completed' },
      { label: 'Rejected', status: 'rejected' }
    ]
  },
  {
    id: 'rejected-2',
    name: 'Thomas Brock',
    relationship: 'Brother',
    avatarUrl: '/assets/avatars/michael-brock.png',
    accessLevel: 'Full Access',
    duration: '365 Days',
    reason: 'Complete Longitudinal Archive Export',
    rejectionReason: 'Scope of 365-day full archive access exceeded needed timeframe.',
    status: 'rejected',
    requestedDate: '19 March 2026',
    rejectedDate: '21 March 2026',
    timelineSteps: [
      { label: 'Request Sent', status: 'completed' },
      { label: 'Reviewed', status: 'completed' },
      { label: 'Rejected', status: 'rejected' }
    ]
  },
  {
    id: 'rejected-3',
    name: 'Elena Brock',
    relationship: 'Sister',
    avatarUrl: '/assets/avatars/sarah-brock.png',
    accessLevel: 'View & Download',
    duration: '90 Days',
    reason: 'Surgical & Imaging Archive Download',
    rejectionReason: 'Superseded by 60-day emergency-only access tier.',
    status: 'rejected',
    requestedDate: '08 Nov 2025',
    rejectedDate: '10 Nov 2025',
    timelineSteps: [
      { label: 'Request Sent', status: 'completed' },
      { label: 'Reviewed', status: 'completed' },
      { label: 'Rejected', status: 'rejected' }
    ]
  }
];

export const activityLogData: ActivityLogItem[] = [
  {
    id: 'activity-1',
    type: 'access_granted',
    title: 'Access Granted',
    description: 'Temporary view permission granted to Sarah Brock for Lab Results.',
    actor: 'Sarah Brock',
    isVerified: true,
    targetEntity: 'Patient Shell',
    timestamp: 'Jun 12, 2026, 09:12 AM',
    dotColor: 'emerald'
  },
  {
    id: 'activity-2',
    type: 'records_viewed',
    title: 'Records Viewed',
    description: 'Sarah Brock viewed Cardiology & Lipid Panel Report - May 2026.',
    actor: 'Sarah Brock',
    ip: '192.168.1.45',
    sessionDuration: '12m',
    timestamp: 'Jun 12, 2026, 11:45 AM',
    dotColor: 'blue'
  },
  {
    id: 'activity-3',
    type: 'shared_records',
    title: 'Shared Records',
    description: 'Complete health profile shared with Dr. Alexander for consultation.',
    doctor: {
      name: 'Dr. Robert Alexander',
      specialty: 'Cardiology Specialist',
      hospital: 'St. Jude Hospital',
      avatarUrl: '/assets/avatars/dr-robert-alexander.png'
    },
    timestamp: 'Jun 02, 2026, 04:20 PM',
    dotColor: 'purple'
  },
  {
    id: 'activity-4',
    type: 'permission_modified',
    title: 'Permission Modified',
    description: "Access level for Insurance Provider Portal changed from 'Full' to 'Restricted'.",
    scopeBadge: 'SCOPE: BILLING ONLY',
    timestamp: 'May 18, 2026, 10:05 AM',
    dotColor: 'amber'
  },
  {
    id: 'activity-5',
    type: 'access_revoked',
    title: 'Access Revoked',
    description: 'Permanent access removal for Legacy Health Partners system-wide.',
    timestamp: 'Jan 21, 2026, 02:30 PM',
    dotColor: 'rose'
  }
];

export const doctorAccessRequestsData: AccessRequestItem[] = [
  {
    id: 'doctor-1',
    name: 'Dr. Robert Alexander',
    relationship: 'Cardiologist',
    avatarUrl: '/assets/avatars/dr-robert-alexander.png',
    accessLevel: 'Clinical Access',
    duration: '90 Days',
    reason: 'Consultation & Pre-operative Cardiac Assessment',
    status: 'approved',
    requestedDate: '01 June 2026',
    grantedDate: '02 June 2026',
    expiresDate: '31 August 2026',
    doctorInfo: {
      specialty: 'Cardiology Specialist',
      hospital: 'St. Jude Hospital'
    },
    timelineSteps: [
      { label: 'Request Sent', status: 'completed' },
      { label: 'Approved', status: 'completed' },
      { label: 'Access Active', status: 'completed' }
    ]
  },
  {
    id: 'doctor-2',
    name: 'Dr. Sarah Jenkins',
    relationship: 'Primary Physician',
    avatarUrl: '/assets/avatars/dr-sarah-jenkins.png',
    accessLevel: 'Full Access',
    duration: '365 Days',
    reason: 'Comprehensive Longitudinal Health Management',
    status: 'approved',
    requestedDate: '15 Jan 2026',
    grantedDate: '15 Jan 2026',
    expiresDate: '15 Jan 2027',
    doctorInfo: {
      specialty: 'General Practitioner',
      hospital: 'Metro Health Center'
    },
    timelineSteps: [
      { label: 'Request Sent', status: 'completed' },
      { label: 'Approved', status: 'completed' },
      { label: 'Access Active', status: 'completed' }
    ]
  },
  {
    id: 'doctor-3',
    name: 'Dr. Marcus Thorne',
    relationship: 'Endocrinologist',
    avatarUrl: '/assets/avatars/dr-patel.png',
    accessLevel: 'Lab & Metabolic Access',
    duration: '60 Days',
    reason: 'Metabolic & Electrolyte Panel Specialist Review',
    status: 'pending',
    requestedDate: '10 June 2026',
    doctorInfo: {
      specialty: 'Endocrinology Specialist',
      hospital: 'City Medical Center'
    },
    timelineSteps: [
      { label: 'Request Sent', status: 'completed' },
      { label: 'Waiting Approval', status: 'current' },
      { label: 'Access Granted', status: 'pending' }
    ]
  },
  {
    id: 'doctor-4',
    name: 'Dr. Emily Watson',
    relationship: 'Pulmonologist',
    avatarUrl: '/assets/avatars/dr-sarah-jenkins.png',
    accessLevel: 'Imaging & Signal Access',
    duration: '30 Days',
    reason: 'Pulmonary Spirometry & Thoracic Imaging Review',
    rejectionReason: 'Spirometry study was normal; follow-up referral not required.',
    status: 'rejected',
    requestedDate: '05 May 2026',
    rejectedDate: '07 May 2026',
    doctorInfo: {
      specialty: 'Pulmonology',
      hospital: 'Northwest Respiratory Clinic'
    },
    timelineSteps: [
      { label: 'Request Sent', status: 'completed' },
      { label: 'Reviewed', status: 'completed' },
      { label: 'Rejected', status: 'rejected' }
    ]
  }
];

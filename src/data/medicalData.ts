import { PatientProfile, DoctorAccess, AuditRecord, TimelineItem, HealthMetric } from '../types/medical';

export const initialPatient: PatientProfile = {
  id: '#4432-6TH',
  name: 'Julian Casablancas',
  age: '34 Years',
  gender: 'Male',
  bloodGroup: 'O Positive (O+)',
  height: 188,
  weight: 76,
  bmi: 21.5,
  avatarUrl: '/assets/avatars/julian-casablancas.png'
};

export const initialDoctors: DoctorAccess[] = [
  {
    id: 'doc-1',
    name: 'Dr. Sarah Jenkins',
    role: 'SENIOR NEUROLOGIST',
    specialty: 'Family Medicine • 12+ Years Exp.',
    experienceYears: 12,
    rating: 4.8,
    reviewCount: 1299,
    avatarUrl: '/assets/avatars/dr-sarah-jenkins.png',
    permissions: {
      medicalRecords: true,
      laboratoryResults: true,
      prescriptions: false
    }
  },
  {
    id: 'doc-2',
    name: 'Dr. Sarah Jenkins',
    role: 'SENIOR NEUROLOGIST',
    specialty: 'Family Medicine • 12+ Years Exp.',
    experienceYears: 12,
    rating: 4.8,
    reviewCount: 1299,
    avatarUrl: '/assets/avatars/dr-sarah-jenkins.png',
    permissions: {
      medicalRecords: true,
      laboratoryResults: true,
      prescriptions: false
    }
  }
];

export const initialAuditLogs: AuditRecord[] = [
  {
    id: 'audit-1',
    viewedBy: 'Dr. Sarah Johnson',
    badgeInitials: 'DS',
    badgeBg: 'rgba(79, 55, 138, 0.1)',
    badgeTextColor: '#4F378A',
    timestamp: 'Feb 16, 2024 • 02:45 PM',
    accessPoint: 'Aegis Professional Portal',
    actionTaken: 'Record Viewed',
    actionBadgeBg: '#F2ECF4',
    actionTextColor: '#000000',
    isSecured: true
  },
  {
    id: 'audit-2',
    viewedBy: 'Central Lab (API)',
    badgeInitials: 'CL',
    badgeBg: 'rgba(118, 91, 0, 0.1)',
    badgeTextColor: '#765B00',
    timestamp: 'Feb 14, 2024 • 09:12 AM',
    accessPoint: 'HIE Data Exchange',
    actionTaken: 'New Data Added',
    actionBadgeBg: 'rgba(79, 55, 138, 0.1)',
    actionTextColor: '#4F378A',
    isSecured: true
  },
  {
    id: 'audit-3',
    viewedBy: 'System AI (Auto)',
    badgeInitials: 'SY',
    badgeBg: 'rgba(29, 27, 32, 0.1)',
    badgeTextColor: '#1D1B20',
    timestamp: 'Feb 14, 2024 • 09:15 AM',
    accessPoint: 'Internal Health Engine',
    actionTaken: 'AI Analysis Generated',
    actionBadgeBg: '#F2ECF4',
    actionTextColor: '#000000',
    isSecured: true
  }
];

export const healthMetrics: HealthMetric[] = [
  {
    id: 'metric-1',
    title: 'Medical RECORDS',
    badge: '+12.5%',
    badgeType: 'amber',
    iconType: 'records'
  },
  {
    id: 'metric-2',
    title: 'LAB REPORTS',
    badge: '3 Pending',
    badgeType: 'violet',
    iconType: 'labs'
  },
  {
    id: 'metric-3',
    title: 'Prescription',
    badge: 'Active',
    badgeType: 'cyan',
    iconType: 'prescription'
  },
  {
    id: 'metric-4',
    title: 'Imaging',
    badge: 'Active',
    badgeType: 'purple',
    iconType: 'imaging'
  }
];

export const timelineItems: TimelineItem[] = [
  {
    id: 'tl-1',
    monthGroup: 'MAY 2026 • MANAGEMENT PHASE',
    category: 'labs',
    title: 'Lipid Panel Results',
    subtitle: 'Diagnostics Lab East • May 25, 2026',
    tag: {
      label: 'Stable',
      variant: 'stable'
    },
    note: {
      highlight: 'AI Note:',
      text: 'LDL levels are maintaining a 5% reduction since Q1 adjustments.'
    }
  },
  {
    id: 'tl-2',
    monthGroup: 'MAY 2026 • MANAGEMENT PHASE',
    category: 'consultation',
    title: 'Cardiology Follow-up',
    subtitle: 'Dr. Patel • May 15, 2026',
    doctorAvatar: '/assets/avatars/dr-patel.png',
    doctorName: 'Dr. Patel',
    description: 'Discussed medication efficacy and lifestyle compliance. Patient reporting high energy levels.'
  },
  {
    id: 'tl-3',
    monthGroup: 'MAY 2026 • MANAGEMENT PHASE',
    category: 'medication',
    title: 'Refill: Atorvastatin 20mg',
    subtitle: 'Taken daily at night • 30 Day Supply',
    dateBadge: 'May 12, 2026'
  },
  {
    id: 'tl-4',
    monthGroup: 'APRIL 2026 • ASSESSMENT PHASE',
    category: 'vitals',
    title: 'Vitals Record',
    subtitle: 'April 05, 2026',
    dateBadge: 'April 05, 2026',
    vitalsData: [
      {
        label: 'BLOOD PRESSURE',
        value: '118/78',
        unit: 'mmHg',
        color: '#22C55E'
      },
      {
        label: 'HEART RATE',
        value: '64',
        unit: 'BPM',
        color: '#0F172A'
      }
    ]
  }
];

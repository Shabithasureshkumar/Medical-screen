import { PatientProfile, DoctorAccess, AuditRecord, TimelineItem, HealthMetric } from '../types/medical';

export const initialPatient: PatientProfile = {
  id: '#4432-6TH',
  name: 'David Brock',
  age: '34 Years',
  gender: 'Male',
  bloodGroup: 'O Positive (O+)',
  height: 188,
  weight: 76,
  bmi: 21.5,
  avatarUrl: '/assets/avatars/julian-casablancas.png'
};

export const familyPatientProfiles: Array<PatientProfile & { relationship: string }> = [
  {
    ...initialPatient,
    relationship: 'Self'
  },
  {
    id: '#4433-8SB',
    name: 'Sarah Brock',
    age: '58 Years',
    gender: 'Female',
    bloodGroup: 'A Positive (A+)',
    height: 165,
    weight: 62,
    bmi: 22.8,
    avatarUrl: '/assets/avatars/julian-casablancas.png',
    relationship: 'Mother'
  },
  {
    id: '#4434-2MB',
    name: 'Michael Brock',
    age: '61 Years',
    gender: 'Male',
    bloodGroup: 'O Positive (O+)',
    height: 180,
    weight: 81,
    bmi: 25.0,
    avatarUrl: '/assets/avatars/julian-casablancas.png',
    relationship: 'Father'
  },
  {
    id: '#4435-9EB',
    name: 'Emma Brock',
    age: '10 Years',
    gender: 'Female',
    bloodGroup: 'O Positive (O+)',
    height: 138,
    weight: 32,
    bmi: 16.8,
    avatarUrl: '/assets/avatars/julian-casablancas.png',
    relationship: 'Daughter'
  }
];

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
    name: 'Dr. Michael Chang',
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
    viewedBy: 'Sarah Chen, MD',
    badgeInitials: 'SC',
    badgeBg: 'rgba(79, 55, 138, 0.1)',
    badgeTextColor: '#4F378A',
    timestamp: 'May 24, 2026 • 10:14 AM',
    accessPoint: 'Neurology PACS Portal',
    actionTaken: 'Viewed Imaging',
    actionBadgeBg: '#F2ECF4',
    actionTextColor: '#4F378A',
    isSecured: true
  },
  {
    id: 'audit-2',
    viewedBy: 'Patient / Self',
    badgeInitials: 'DB',
    badgeBg: 'rgba(118, 91, 0, 0.1)',
    badgeTextColor: '#765B00',
    timestamp: 'May 20, 2026 • 02:45 PM',
    accessPoint: 'Patient Portal Web',
    actionTaken: 'Exported Summary PDF',
    actionBadgeBg: 'rgba(79, 55, 138, 0.1)',
    actionTextColor: '#4F378A',
    isSecured: true
  },
  {
    id: 'audit-3',
    viewedBy: 'Central Lab (API)',
    badgeInitials: 'CL',
    badgeBg: 'rgba(29, 27, 32, 0.1)',
    badgeTextColor: '#1D1B20',
    timestamp: 'May 16, 2026 • 09:12 AM',
    accessPoint: 'HIE Data Exchange',
    actionTaken: 'New Lab Report Added',
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
    title: 'Lipid & Electrolyte Panel Results',
    subtitle: 'Diagnostics Lab East • May 25–26, 2026',
    tag: {
      label: 'Attention',
      variant: 'attention'
    },
    note: {
      highlight: 'AI Note:',
      text: 'LDL-C is 135 mg/dL (+22.7% over 12 months) and serum potassium is 6.1 mEq/L. Follow-up lab review advised.'
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

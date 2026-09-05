export interface PatientProfile {
  id: string;
  name: string;
  age: string;
  gender: string;
  bloodGroup: string;
  height: number;
  weight: number;
  bmi: number;
  avatarUrl: string;
}

export interface DoctorAccess {
  id: string;
  name: string;
  role: string;
  specialty: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  avatarUrl: string;
  permissions: {
    medicalRecords: boolean;
    laboratoryResults: boolean;
    prescriptions: boolean;
  };
}

export interface AuditRecord {
  id: string;
  viewedBy: string;
  badgeInitials: string;
  badgeBg: string;
  badgeTextColor: string;
  timestamp: string;
  accessPoint: string;
  actionTaken: string;
  actionBadgeBg: string;
  actionTextColor: string;
  isSecured: boolean;
}

export type TimelineFilter = 'all' | 'labs' | 'prescriptions' | 'vitals';

export interface TimelineItem {
  id: string;
  monthGroup: string;
  category: 'labs' | 'consultation' | 'medication' | 'vitals';
  title: string;
  subtitle: string;
  tag?: {
    label: string;
    variant: 'stable' | 'active' | 'attention';
  };
  note?: {
    highlight: string;
    text: string;
  };
  doctorAvatar?: string;
  doctorName?: string;
  description?: string;
  dateBadge?: string;
  vitalsData?: {
    label: string;
    value: string;
    unit: string;
    color: string;
  }[];
}

export interface HealthMetric {
  id: string;
  title: string;
  badge: string;
  badgeType: 'amber' | 'violet' | 'cyan' | 'purple';
  iconType: 'records' | 'labs' | 'prescription' | 'imaging';
}

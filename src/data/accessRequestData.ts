import {
  DoctorRecipient,
  FamilyMemberRecipient,
  ShareRecordItem,
  SecuritySettingsState
} from '../types/accessRequest';

export const initialInsideClinicDoctors: DoctorRecipient[] = [
  {
    id: 'doc-inside-1',
    name: 'Dr. Sarah Jenkins',
    role: 'Senior Neurologist',
    specialty: 'Family Medicine',
    experience: '12+ Years Exp.',
    email: 's.jenkins@hcare.org',
    hospital: 'Health Care +',
    avatarUrl: '/assets/avatars/dr-sarah-jenkins.png',
    isInsideClinic: true,
    selected: true
  },
  {
    id: 'doc-inside-2',
    name: 'Dr. Julian Hales',
    role: 'Attending Physician',
    specialty: 'Internal Medicine',
    experience: '14+ Years Exp.',
    email: 'julian.h@clinic.com',
    hospital: "St. Mary's Hospital",
    avatarUrl: '/assets/avatars/dr-julian-hales.png',
    isInsideClinic: true,
    selected: false
  }
];

export const initialOutsideDoctors: DoctorRecipient[] = [
  {
    id: 'doc-ext-1',
    name: 'Dr. Aris Thorne',
    role: 'Chief Cardiologist',
    specialty: 'Cardiovascular Surgery',
    experience: '18+ Years Exp.',
    email: 'aris.thorne@metro.org',
    hospital: 'Metro Cardiology Institute',
    avatarUrl: '/assets/avatars/dr-aris-thorne.png',
    isInsideClinic: false,
    selected: true
  },
  {
    id: 'doc-ext-2',
    name: 'Dr. Elena Vance',
    role: 'Diagnostic Radiologist',
    specialty: 'Clinical Imaging',
    experience: '11+ Years Exp.',
    email: 'elena.v@imaging.center',
    hospital: 'Premier Diagnostic Center',
    avatarUrl: '/assets/avatars/dr-elena-vance.png',
    isInsideClinic: false,
    selected: true
  },
  {
    id: 'doc-ext-3',
    name: 'Dr. Robert Alexander',
    role: 'Consulting Neurologist',
    specialty: 'Neuro-Critical Care',
    experience: '20+ Years Exp.',
    email: 'r.alexander@neurology.org',
    hospital: 'St. Jude Medical',
    avatarUrl: '/assets/avatars/dr-robert-alexander.png',
    isInsideClinic: false,
    selected: false
  }
];

export const initialFamilyMembers: FamilyMemberRecipient[] = [
  {
    id: 'fam-3',
    name: 'Michael Brock',
    relationship: 'FATHER',
    accessLevel: 'VIEW ONLY',
    avatarUrl: '/assets/avatars/michael-brock.png',
    selected: true
  },
  {
    id: 'fam-2',
    name: 'Sarah Brock',
    relationship: 'MOTHER',
    accessLevel: 'LOCKED',
    avatarUrl: '/assets/avatars/sarah-brock.png',
    selected: false,
    canRequestAccess: true
  },
  {
    id: 'fam-4',
    name: 'Emma Brock',
    relationship: 'DAUGHTER',
    accessLevel: 'LOCKED',
    avatarUrl: '/assets/avatars/emma-brock.png',
    selected: false,
    canRequestAccess: true
  }
];

export const initialShareRecords: ShareRecordItem[] = [
  {
    id: 'rec-1',
    title: 'Initial Consultation',
    date: 'May 10, 2026',
    provider: 'Dr. Jenkins',
    fileType: 'PDF',
    iconType: 'document',
    selected: true
  },
  {
    id: 'rec-2',
    title: 'Blood Test Results',
    date: 'May 25, 2026',
    provider: 'Quest Diagnostics',
    fileType: 'PDF',
    iconType: 'flask',
    selected: false
  },
  {
    id: 'rec-3',
    title: 'MRI Scan Report',
    date: 'May 19, 2026',
    provider: 'City Imaging Center',
    fileType: 'PDF',
    iconType: 'mri',
    selected: false
  },
  {
    id: 'rec-4',
    title: 'Vaccination Record',
    date: 'Updated April 2026',
    provider: 'Clinic Records',
    fileType: 'PDF',
    iconType: 'vaccine',
    selected: false
  }
];

export const defaultSecuritySettings: SecuritySettingsState = {
  expiration: '24h',
  viewOnly: true,
  notifications: false,
  permission: 'view_only',
  passwordProtected: false,
  password: '',
  confirmPassword: ''
};

export type PrescriptionStatus = 'Active' | 'Pending Refill' | 'Completed' | 'Expired';

export interface PrescribedMedicine {
  id: string;
  name: string;
  formulation: string;
  dosage: string;
  duration: string;
  frequencyDesktop: string;
  frequencyMobile: string;
  timingBadge: 'MORNING' | 'EVENING';
  refillsLeft: string;
  instructions?: string;
}

export interface PrescriptionRecord {
  id: string;
  condition: string;
  doctorName: string;
  doctorSpecialty: string;
  status: PrescriptionStatus;
  statusColor: 'emerald' | 'amber' | 'purple' | 'slate';
  issueDate: string;
  expiryDate?: string;
  completedDate?: string;
  expiredDate?: string;
  alertNotice?: string;
  medicationCount: number;
  medicationCountLabel: string;
  canRefill: boolean;
}

export interface ActivePrescriptionDetails {
  id: string;
  condition: string;
  status: string;
  issueDate: string;
  expiryDate: string;
  doctor: {
    name: string;
    specialty: string;
    facility: string;
    avatarUrl: string;
  };
  diagnosisSummary: string;
  instructionsDesktop: string;
  instructionsMobile: string;
  medicines: PrescribedMedicine[];
  pharmacy: {
    nameDesktop: string;
    nameMobile: string;
    address: string;
    phone: string;
    status: string;
  };
  questions: {
    doctorName: string;
    careTeamResponseTime: string;
    officePhone: string;
  };
}

export const activePrescriptionData: ActivePrescriptionDetails = {
  id: 'rx-2023-8842',
  condition: 'Hypertension Management',
  status: 'ACTIVE PRESCRIPTION',
  issueDate: 'Oct 24, 2023',
  expiryDate: 'Jan 24, 2024',
  doctor: {
    name: 'Dr. Sarah Chen',
    specialty: 'Cardiology Specialist',
    facility: 'Metro Health Center',
    avatarUrl: '/assets/avatars/dr-sarah-jenkins.png'
  },
  diagnosisSummary:
    'Patient presents with Stage 1 Hypertension. Focus on pharmacological intervention alongside dietary adjustments (DASH diet) and increased aerobic activity.',
  instructionsDesktop:
    'Take Lisinopril on an empty stomach for best absorption. Monitor blood pressure twice weekly and log in the Health Metrics section. Avoid excessive salt intake.',
  instructionsMobile:
    'Take Lisinopril on an empty stomach for best absorption. Monitor blood pressure twice weekly and log in the Health Metrics section. Avoid excessive salt intake.',
  medicines: [
    {
      id: 'med-1',
      name: 'Lisinopril',
      formulation: 'Oral Tablet',
      dosage: '10 mg',
      duration: '90 Days',
      frequencyDesktop: 'Once Daily (AM)',
      frequencyMobile: 'Once Daily (AM)',
      timingBadge: 'MORNING',
      refillsLeft: '3 Refills'
    },
    {
      id: 'med-2',
      name: 'Hydrochlorothiazide',
      formulation: 'Capsule',
      dosage: '12.5 mg',
      duration: '90 Days',
      frequencyDesktop: 'Once Daily (AM)',
      frequencyMobile: 'Once Daily (AM)',
      timingBadge: 'MORNING',
      refillsLeft: '3 Refills'
    },
    {
      id: 'med-3',
      name: 'Amlodipine Besylate',
      formulation: 'Oral Tablet',
      dosage: '5 mg',
      duration: '30 Days',
      frequencyDesktop: 'Once Daily (PM)',
      frequencyMobile: 'Once Daily (PM)',
      timingBadge: 'EVENING',
      refillsLeft: '1 Refill'
    }
  ],
  pharmacy: {
    nameDesktop: 'CVS Pharmacy #4829',
    nameMobile: 'CVS Pharmacy #4829',
    address: '1200 Medical Center Way, Portland, OR 97201',
    phone: '(503) 555-0199',
    status: 'Ready for Pickup'
  },
  questions: {
    doctorName: 'Dr. Sarah Chen',
    careTeamResponseTime: 'Typical response: 2h',
    officePhone: '(503) 555-0128'
  }
};

export const prescriptionRecordsData: PrescriptionRecord[] = [
  {
    id: 'rec-rx-1',
    condition: 'Hypertension Management',
    doctorName: 'Dr. Sarah Chen',
    doctorSpecialty: 'Cardiology Specialist',
    status: 'Active',
    statusColor: 'emerald',
    issueDate: 'Oct 24, 2023',
    expiryDate: 'Jan 24, 2024',
    medicationCount: 3,
    medicationCountLabel: '3 Medications',
    canRefill: true
  },
  {
    id: 'rec-rx-2',
    condition: 'Type 2 Diabetes Control',
    doctorName: 'Dr. Marcus Thorne',
    doctorSpecialty: 'Endocrinologist',
    status: 'Pending Refill',
    statusColor: 'amber',
    issueDate: 'Sep 15, 2023',
    alertNotice: 'Refill Due in 2 Days',
    medicationCount: 4,
    medicationCountLabel: '4 Medications',
    canRefill: true
  },
  {
    id: 'rec-rx-3',
    condition: 'Cholesterol Management',
    doctorName: 'Dr. Sarah Chen',
    doctorSpecialty: 'Cardiology Specialist',
    status: 'Completed',
    statusColor: 'purple',
    issueDate: 'May 10, 2023',
    completedDate: 'Aug 15, 2023',
    medicationCount: 2,
    medicationCountLabel: '2 Medications',
    canRefill: false
  },
  {
    id: 'rec-rx-4',
    condition: 'Vitamin D Therapy',
    doctorName: 'Dr. Rachel Adams',
    doctorSpecialty: 'Primary Care Physician',
    status: 'Expired',
    statusColor: 'slate',
    issueDate: 'Jan 10, 2023',
    expiredDate: 'Jul 10, 2023',
    medicationCount: 1,
    medicationCountLabel: '1 Medication',
    canRefill: false
  }
];

export type PrescriptionFilter = 'All' | 'Active' | 'Pending Refill' | 'Completed' | 'Expired';

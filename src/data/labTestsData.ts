export type LabTestStatus = 'pending' | 'attention' | 'normal' | 'abnormal';

export type LabFilterTab = 'All' | 'Recent (30 days)' | 'Needs Attention' | 'Pending' | 'Favorites';

export interface LabBiomarkerItem {
  name: string;
  value: string;
  unit: string;
  referenceRange: string;
  status: 'Normal' | 'Elevated' | 'Low' | 'Critical' | 'Pending';
}

export interface LabTestItem {
  id: string;
  title: string;
  shortTitle?: string;
  status: LabTestStatus;
  badgeLabel: 'PENDING' | 'NEEDS ATTENTION' | 'NORMAL' | 'ABNORMAL';
  recentBadgeLabel?: 'Needs Attention' | 'Normal' | 'Pending';
  doctor: string;
  facility: string;
  date: string;
  recentCardDate?: string;
  rawDate: string;
  summary: string;
  iconType: 'flask' | 'specimen' | 'blood-tube' | 'glucometer' | 'thyroid' | 'urinalysis' | 'vitamin';
  dotColor: 'purple' | 'amber' | 'emerald' | 'rose';
  isRecentCard?: boolean;
  isFavorite?: boolean;
  aiClinicalNote: string;
  biomarkers: LabBiomarkerItem[];
}

export const initialLabTestsData: LabTestItem[] = [
  {
    id: 'lab-bmp-2026',
    title: 'Basic Metabolic Panel',
    status: 'pending',
    badgeLabel: 'PENDING',
    recentBadgeLabel: 'Pending',
    doctor: 'Dr. Patel',
    facility: 'Quest Diagnostics',
    date: 'May 26, 2026',
    rawDate: '2026-05-26',
    summary: 'Sample received. Results expected within 24 hours.',
    iconType: 'flask',
    dotColor: 'purple',
    isFavorite: true,
    aiClinicalNote:
      'Preliminary automated analyzer flag noted elevated Serum Potassium (6.1 mEq/L); final pathologist verification of remaining electrolyte markers is in progress (expected within 24 hours).',
    biomarkers: [
      {
        name: 'Serum Potassium (K+) [Preliminary]',
        value: '6.1',
        unit: 'mEq/L',
        referenceRange: '3.5 - 5.1 mEq/L',
        status: 'Critical'
      },
      {
        name: 'Fasting Glucose',
        value: '92',
        unit: 'mg/dL',
        referenceRange: '70 - 99 mg/dL',
        status: 'Normal'
      },
      {
        name: 'Sodium (Na+)',
        value: '139',
        unit: 'mEq/L',
        referenceRange: '135 - 145 mEq/L',
        status: 'Normal'
      },
      {
        name: 'Creatinine / eGFR Verification',
        value: 'In Progress',
        unit: '',
        referenceRange: '0.7 - 1.3 mg/dL',
        status: 'Pending'
      }
    ]
  },
  {
    id: 'lab-lipid-2026',
    title: 'Lipid Panel',
    shortTitle: 'Lipid Panel',
    status: 'attention',
    badgeLabel: 'NEEDS ATTENTION',
    recentBadgeLabel: 'Needs Attention',
    doctor: 'Dr. Chen',
    facility: 'LabCorp',
    date: 'May 25, 2026',
    recentCardDate: 'May 22, 2026',
    rawDate: '2026-05-25',
    summary: 'LDL slightly elevated at 135 mg/dL — review recommended.',
    iconType: 'specimen',
    dotColor: 'amber',
    isRecentCard: true,
    isFavorite: true,
    aiClinicalNote:
      'LDL Cholesterol is 135 mg/dL (above the < 100 mg/dL optimal target), while protective HDL remains healthy at 55 mg/dL. Increasing soluble dietary fiber and reviewing statin timing is advised.',
    biomarkers: [
      {
        name: 'LDL Cholesterol (Direct)',
        value: '135',
        unit: 'mg/dL',
        referenceRange: '< 100 mg/dL',
        status: 'Elevated'
      },
      {
        name: 'HDL Cholesterol',
        value: '55',
        unit: 'mg/dL',
        referenceRange: '> 40 mg/dL',
        status: 'Normal'
      },
      {
        name: 'Total Cholesterol',
        value: '218',
        unit: 'mg/dL',
        referenceRange: '< 200 mg/dL',
        status: 'Elevated'
      },
      {
        name: 'Triglycerides',
        value: '140',
        unit: 'mg/dL',
        referenceRange: '< 150 mg/dL',
        status: 'Normal'
      }
    ]
  },
  {
    id: 'lab-cbc-2026',
    title: 'Complete Blood Count (CBC)',
    shortTitle: 'Complete Blood Count',
    status: 'normal',
    badgeLabel: 'NORMAL',
    recentBadgeLabel: 'Normal',
    doctor: 'Dr. Patel',
    facility: 'Quest Diagnostics',
    date: 'May 18, 2026',
    recentCardDate: 'May 18, 2026',
    rawDate: '2026-05-18',
    summary: 'All values within reference intervals. Hemoglobin stable.',
    iconType: 'blood-tube',
    dotColor: 'emerald',
    isRecentCard: true,
    isFavorite: false,
    aiClinicalNote:
      'Red blood cell indices, hemoglobin (15.2 g/dL), leukocyte differential, and platelet count are well within physiological reference intervals.',
    biomarkers: [
      {
        name: 'Hemoglobin (Hgb)',
        value: '15.2',
        unit: 'g/dL',
        referenceRange: '13.5 - 17.5 g/dL',
        status: 'Normal'
      },
      {
        name: 'White Blood Cell Count (WBC)',
        value: '6.4',
        unit: 'x10³/µL',
        referenceRange: '4.5 - 11.0 x10³/µL',
        status: 'Normal'
      },
      {
        name: 'Hematocrit (Hct)',
        value: '45.1',
        unit: '%',
        referenceRange: '41.0 - 50.0 %',
        status: 'Normal'
      },
      {
        name: 'Platelets',
        value: '248',
        unit: 'x10³/µL',
        referenceRange: '150 - 450 x10³/µL',
        status: 'Normal'
      }
    ]
  },
  {
    id: 'lab-a1c-2026',
    title: 'Hemoglobin A1C',
    shortTitle: 'Hemoglobin A1C',
    status: 'normal',
    badgeLabel: 'NORMAL',
    recentBadgeLabel: 'Normal',
    doctor: 'Dr. Thorne',
    facility: 'LabCorp',
    date: 'May 14, 2026',
    recentCardDate: 'May 14, 2026',
    rawDate: '2026-05-14',
    summary: '5.4% — well within healthy range. Trending stable.',
    iconType: 'glucometer',
    dotColor: 'emerald',
    isRecentCard: true,
    isFavorite: false,
    aiClinicalNote:
      'HbA1c of 5.4% reflects consistent 90-day glycemic control (estimated average glucose 108 mg/dL), well below the prediabetes threshold of 5.7%.',
    biomarkers: [
      {
        name: 'Hemoglobin A1C',
        value: '5.4',
        unit: '%',
        referenceRange: '4.0 - 5.6 %',
        status: 'Normal'
      },
      {
        name: 'Estimated Average Glucose (eAG)',
        value: '108',
        unit: 'mg/dL',
        referenceRange: '70 - 114 mg/dL',
        status: 'Normal'
      }
    ]
  },
  {
    id: 'lab-thyroid-2026',
    title: 'Thyroid Panel (TSH, T3, T4)',
    status: 'attention',
    badgeLabel: 'NEEDS ATTENTION',
    doctor: 'Dr. Vance',
    facility: 'Mayo Clinic Labs',
    date: 'May 09, 2026',
    rawDate: '2026-05-09',
    summary: 'TSH marginally elevated. Follow-up in 6 weeks suggested.',
    iconType: 'thyroid',
    dotColor: 'amber',
    isFavorite: false,
    aiClinicalNote:
      'TSH is mildly above reference range (4.68 mIU/L) while Free T4 (1.2 ng/dL) and Free T3 (3.1 pg/mL) remain normal. Repeat thyroid function testing in 6 weeks is recommended.',
    biomarkers: [
      {
        name: 'Thyroid Stimulating Hormone (TSH)',
        value: '4.68',
        unit: 'mIU/L',
        referenceRange: '0.45 - 4.50 mIU/L',
        status: 'Elevated'
      },
      {
        name: 'Free T4 (Thyroxine)',
        value: '1.2',
        unit: 'ng/dL',
        referenceRange: '0.8 - 1.8 ng/dL',
        status: 'Normal'
      },
      {
        name: 'Free T3 (Triiodothyronine)',
        value: '3.1',
        unit: 'pg/mL',
        referenceRange: '2.3 - 4.2 pg/mL',
        status: 'Normal'
      }
    ]
  },
  {
    id: 'lab-urinalysis-2026',
    title: 'Urinalysis',
    status: 'normal',
    badgeLabel: 'NORMAL',
    doctor: 'Dr. Patel',
    facility: 'Quest Diagnostics',
    date: 'May 02, 2026',
    rawDate: '2026-05-02',
    summary: 'No abnormalities detected. Clear and well-hydrated.',
    iconType: 'urinalysis',
    dotColor: 'emerald',
    isFavorite: false,
    aiClinicalNote:
      'Specific gravity (1.012), pH (6.0), and negative protein, glucose, ketones, and leukocyte esterase confirm normal renal filtration and hydration.',
    biomarkers: [
      {
        name: 'Specific Gravity',
        value: '1.012',
        unit: '',
        referenceRange: '1.005 - 1.025',
        status: 'Normal'
      },
      {
        name: 'Urine pH',
        value: '6.0',
        unit: '',
        referenceRange: '5.0 - 8.0',
        status: 'Normal'
      },
      {
        name: 'Protein / Glucose / Ketones',
        value: 'Negative',
        unit: '',
        referenceRange: 'Negative',
        status: 'Normal'
      }
    ]
  },
  {
    id: 'lab-vitd-2026',
    title: 'Vitamin D, 25-Hydroxy',
    status: 'abnormal',
    badgeLabel: 'ABNORMAL',
    doctor: 'Dr. Chen',
    facility: 'LabCorp',
    date: 'Apr 19, 2026',
    rawDate: '2026-04-19',
    summary: 'Low at 18 ng/mL — supplementation recommended.',
    iconType: 'vitamin',
    dotColor: 'rose',
    isFavorite: true,
    aiClinicalNote:
      '25-Hydroxyvitamin D is insufficient at 18 ng/mL (optimal range 30–80 ng/mL). Daily Vitamin D3 supplementation (2,000 IU) with dietary fat is recommended.',
    biomarkers: [
      {
        name: '25-Hydroxyvitamin D Total',
        value: '18',
        unit: 'ng/mL',
        referenceRange: '30 - 80 ng/mL',
        status: 'Low'
      }
    ]
  }
];

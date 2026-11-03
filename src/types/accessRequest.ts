export type ClinicType = 'inside' | 'external';
export type ExternalTab = 'outside-doctor' | 'family-member';
export type LinkExpiration = '24h' | '7d' | '30d';
export type PermissionType = 'view_only' | 'view_share_download';

export interface DoctorRecipient {
  id: string;
  name: string;
  role: string;
  specialty: string;
  experience: string;
  hospital?: string;
  email: string;
  avatarUrl: string;
  isInsideClinic: boolean;
  selected?: boolean;
}

export type FamilyRelationship = 'SELF' | 'MOTHER' | 'FATHER' | 'DAUGHTER' | 'OTHER';
export type FamilyAccessLevel = 'FULL ACCESS' | 'VIEW ONLY' | 'LOCKED';

export interface FamilyMemberRecipient {
  id: string;
  name: string;
  relationship: FamilyRelationship;
  accessLevel: FamilyAccessLevel;
  avatarUrl: string;
  isSelf?: boolean;
  selected?: boolean;
  canRequestAccess?: boolean;
}

export interface ShareRecordItem {
  id: string;
  title: string;
  date: string;
  provider: string;
  fileType: string;
  iconType: 'document' | 'flask' | 'mri' | 'vaccine';
  selected: boolean;
}

export interface SecuritySettingsState {
  expiration: LinkExpiration;
  viewOnly: boolean;
  notifications: boolean;
  permission: PermissionType;
  passwordProtected: boolean;
  password?: string;
  confirmPassword?: string;
}

export interface AccessRequestFormData {
  clinicType: ClinicType;
  externalTab: ExternalTab;
  doctorEmail: string;
  selectedDoctorIds: string[];
  selectedFamilyMemberId: string | null;
  selectedRecordIds: string[];
  securitySettings: SecuritySettingsState;
  additionalMessage: string;
}

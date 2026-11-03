import { DoctorAccess, AuditRecord, TimelineItem } from '../types/medical';
import { AiRecommendationItem } from '../types/ai-insight';
import { MedicalRecordItem } from '../data/medicalRecordsData';

export interface PersistedPortalState {
  doctors: DoctorAccess[];
  auditLogs: AuditRecord[];
  recommendations: AiRecommendationItem[];
  medicalRecords: MedicalRecordItem[];
  timelineItems: TimelineItem[];
}

const ACTIVE_PATIENT_KEY = 'mednevo_active_patient_id_v1';
const STATE_PREFIX = 'mednevo_portal_state_v1_';

export function loadActivePatientId(defaultId: string = '#4432-6TH'): string {
  if (typeof window === 'undefined') return defaultId;
  try {
    return window.localStorage.getItem(ACTIVE_PATIENT_KEY) || defaultId;
  } catch {
    return defaultId;
  }
}

export function saveActivePatientId(patientId: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(ACTIVE_PATIENT_KEY, patientId);
  } catch {
    // Ignore storage quota errors
  }
}

export function loadPatientPortalState(
  patientId: string,
  defaults: PersistedPortalState
): PersistedPortalState {
  if (typeof window === 'undefined') return defaults;
  try {
    const raw = window.localStorage.getItem(`${STATE_PREFIX}${patientId}`);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw) as Partial<PersistedPortalState>;
    return {
      doctors: Array.isArray(parsed.doctors) ? parsed.doctors : defaults.doctors,
      auditLogs: Array.isArray(parsed.auditLogs) ? parsed.auditLogs : defaults.auditLogs,
      recommendations: Array.isArray(parsed.recommendations)
        ? parsed.recommendations
        : defaults.recommendations,
      medicalRecords: Array.isArray(parsed.medicalRecords)
        ? parsed.medicalRecords
        : defaults.medicalRecords,
      timelineItems: Array.isArray(parsed.timelineItems)
        ? parsed.timelineItems
        : defaults.timelineItems
    };
  } catch {
    return defaults;
  }
}

// Whether the dev-server /api middleware is reachable. null = not probed yet,
// false = static host with no API (skip further requests). `apiProbe` is the
// in-flight GET that decides it, so a save that happens on the same mount waits
// for the answer instead of racing it with a request that 404s.
let apiAvailable: boolean | null = null;
let apiProbe: Promise<unknown> | null = null;

export function savePatientPortalState(
  patientId: string,
  state: PersistedPortalState
): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(`${STATE_PREFIX}${patientId}`, JSON.stringify(state));
  } catch {
    // Ignore storage quota errors
  }

  // Asynchronous sync to backend API when the server middleware is active.
  // On a static host (Vercel, `vite preview`) there is no /api route, so skip
  // the request entirely once the probe has told us it is absent -- otherwise
  // every save would log a 404 in the console even though localStorage already
  // holds the state.
  void (async () => {
    if (apiAvailable === null && apiProbe) {
      await apiProbe.catch(() => undefined);
    }
    if (apiAvailable === false) return;

    try {
      const res = await fetch('/api/state', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Patient-Session': patientId
        },
        body: JSON.stringify({ patientId, state })
      });
      if (!res.ok) apiAvailable = false;
    } catch {
      // Offline or static preview fallback handled by localStorage
      apiAvailable = false;
    }
  })();
}

export async function fetchPatientPortalStateFromApi(
  patientId: string
): Promise<Partial<PersistedPortalState> | null> {
  if (typeof window === 'undefined') return null;
  if (apiAvailable === false) return null;
  const probe = probePatientPortalState(patientId);
  apiProbe = probe;
  return probe;
}

async function probePatientPortalState(
  patientId: string
): Promise<Partial<PersistedPortalState> | null> {
  try {
    const res = await fetch(`/api/state?patientId=${encodeURIComponent(patientId)}`, {
      headers: { 'X-Patient-Session': patientId }
    });
    if (!res.ok) {
      apiAvailable = false;
      return null;
    }
    // A static host rewrites unknown paths to index.html, which answers 200
    // with HTML -- treat anything that is not JSON as "no API here".
    if (!(res.headers.get('content-type') || '').includes('application/json')) {
      apiAvailable = false;
      return null;
    }
    const data = (await res.json()) as { ok?: boolean; state?: Partial<PersistedPortalState> | null };
    apiAvailable = true;
    return data.ok && data.state ? data.state : null;
  } catch {
    apiAvailable = false;
    return null;
  }
}

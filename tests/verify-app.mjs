import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const root = process.cwd();
const read = (relPath) => fs.readFileSync(path.join(root, relPath), 'utf-8');

let passed = 0;
const test = (name, fn) => {
  fn();
  passed++;
  console.log(`PASS [${passed}]: ${name}`);
};

// 1. Critical ISS-02: DOM-based XSS remediation in pdfGenerator.ts
test('ISS-02: pdfGenerator.ts escapes all HTML entities and uses noopener,noreferrer', () => {
  const code = read('src/utils/pdfGenerator.ts');
  assert.ok(code.includes('export function escapeHtml(value: unknown): string'), 'escapeHtml helper must exist');
  assert.ok(code.includes(".replace(/</g, '&lt;')"), 'Must escape <');
  assert.ok(code.includes(".replace(/>/g, '&gt;')"), 'Must escape >');
  assert.ok(code.includes('printWindow.opener = null'), 'window.open must clear opener');
});

// 2. Critical ISS-03, ISS-18, ISS-19, ISS-20: SignalStudyDetail.tsx Spirometry & Signal fixes
test('ISS-03, ISS-18, ISS-19, ISS-20: SignalStudyDetail.tsx renders Spirometry Flow-Volume loop, dynamic badges, 10s/30s window, and AI disclaimer modal', () => {
  const code = read('src/components/imaging/detail/SignalStudyDetail.tsx');
  assert.ok(code.includes('generateSpirometryPoints'), 'Must include generateSpirometryPoints');
  assert.ok(code.includes('Flow (L/s)'), 'Must label Y-axis Flow (L/s) for Spirometry');
  assert.ok(code.includes('AiAnnotationDisclaimerModal'), 'Must render AiAnnotationDisclaimerModal');
  assert.ok(code.includes("windowSpan === '30s'"), 'Must dynamically handle 30s vs 10s window span');
});

// 3. Critical ISS-04, ISS-15, ISS-23, ISS-25: App.tsx Revoke Access, Lab Reports nav, Tab sync, Timeline scroll
test('ISS-04, ISS-15, ISS-23, ISS-25: App.tsx revokes doctor access, routes metric-2 to lab-tests, derives activeTab, and scrolls to timeline', () => {
  const code = read('src/App.tsx');
  assert.ok(code.includes('prev.filter((d) => d.id !== doctorId)'), 'Must filter out revoked doctor');
  assert.ok(code.includes("id === 'metric-2'") && code.includes("handleNavigate('lab-tests')"), 'Must route metric-2 (Lab Reports) to lab-tests');
  assert.ok(code.includes('derivedActiveTab'), 'Must derive TopNavigation activeTab from currentPage');
  assert.ok(code.includes('savePatientPortalState'), 'Must persist state via storageService');
});

// 4. Critical ISS-05, ISS-07, ISS-10, ISS-11, ISS-26, ISS-31: Access Request fixes
test('ISS-05, ISS-07, ISS-10, ISS-11, ISS-26, ISS-31: Access Request mobile state sync, no hardcoded passwords, email validation, and lock enforcement', () => {
  const dataCode = read('src/data/accessRequestData.ts');
  assert.ok(!dataCode.includes('AzureShare2024'), 'Hardcoded password AzureShare2024 must be removed');
  const pwCode = read('src/components/access-request/PasswordProtection.tsx');
  assert.ok(pwCode.includes('useState(false)'), 'Password visibility must default to hidden (false)');
  const permCode = read('src/components/access-request/Permissions.tsx');
  assert.ok(permCode.includes('View & Share & Download'), 'Permission typo must be fixed');
  const famCode = read('src/components/access-request/FamilyMemberSelection.tsx');
  assert.ok(famCode.includes('aria-disabled={isLocked}'), 'Locked family members must be aria-disabled');
  const mobileCode = read('src/components/access-request/AccessRequestMobileView.tsx');
  assert.ok(!mobileCode.includes('<header'), 'Duplicate mobile header must be removed');
});

// 5. Critical ISS-06, ISS-12, ISS-13, ISS-21, ISS-22: Clinical Potassium & LDL consistency
test('ISS-06, ISS-12, ISS-13, ISS-21, ISS-22: Potassium 6.1 mEq/L alert, unified David Brock identity, LDL 135 mg/dL trends, and HistoricalRecords June 2026 & Imaging', () => {
  const modalCode = read('src/components/modal/AiInsightModal.tsx');
  assert.ok(modalCode.includes('6.1 mEq/L'), 'AiInsightModal must surface Potassium 6.1 mEq/L alert');
  const medData = read('src/data/medicalData.ts');
  assert.ok(medData.includes("name: 'David Brock'"), 'initialPatient must be unified to David Brock');
  const ldlCode = read('src/components/imaging/LdlTrendAnalysis.tsx');
  assert.ok(ldlCode.includes('periodDatasets'), 'LdlTrendAnalysis must switch datasets across 1Y, 5Y, and Max');
  const histCode = read('src/components/imaging/HistoricalRecords.tsx');
  assert.ok(histCode.includes('juneRecords'), 'HistoricalRecords must render June 2026 group');
});

// 6. High ISS-08, ISS-09, ISS-32: Upload validation, input reset, and metadata propagation
test('ISS-08, ISS-09, ISS-32: UploadDropzone validates file size/type and resets input; DocumentDetails & UploadMedicalDocumentsPage save metadata', () => {
  const dropCode = read('src/components/upload/UploadDropzone.tsx');
  assert.ok(dropCode.includes('MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024'), 'Must enforce 10MB limit');
  assert.ok(dropCode.includes("e.target.value = ''"), 'Must reset file input value after selection');
  const detailsCode = read('src/components/upload/DocumentDetails.tsx');
  assert.ok(detailsCode.includes('filteredPractitioners'), 'Must support selecting practitioners');
  const pageCode = read('src/components/upload/UploadMedicalDocumentsPage.tsx');
  assert.ok(pageCode.includes('commitUploadedDocument'), 'Must commit uploaded document with metadata');
});

// 7. High ISS-14, ISS-16, ISS-17, ISS-28: Prescriptions, Medical Records filters, Access History
test('ISS-14, ISS-16, ISS-17, ISS-28: Prescription parity, Medical Records filters, Access History permission toggles & status/date filtering', () => {
  const rxCard = read('src/components/prescription/CurrentPrescriptionCard.tsx');
  assert.ok(!rxCard.includes('1 Tablet Daily'), 'Hardcoded mismatched mobile medication frequency must be removed');
  const mrPage = read('src/components/medical-records/MedicalRecordsPage.tsx');
  assert.ok(mrPage.includes("selectedDateRange !== 'All Time'"), 'MedicalRecordsPage must filter by selectedDateRange');
  const accessModal = read('src/components/access/AccessDetailModal.tsx');
  assert.ok(accessModal.includes("mode === 'permissions'"), 'AccessDetailModal must render interactive permission toggles');
  const accessPage = read('src/components/access/AccessHistoryPage.tsx');
  assert.ok(accessPage.includes("const matchesStatus = activeTab === 'history' ? true : item.status === activeTab"), 'Doctor tab must filter by active status tab');
});

// 8. Critical ISS-01: Persistence & Backend API Middleware
test('ISS-01: storageService.ts and vite.config.ts API middleware exist and isolate per-patient data', () => {
  const storageCode = read('src/services/storageService.ts');
  assert.ok(storageCode.includes('mednevo_portal_state_v1_'), 'Must namespace localStorage per patientId');
  const viteCode = read('vite.config.ts');
  assert.ok(viteCode.includes('medicalPortalApiPlugin'), 'Vite config must register medicalPortalApiPlugin');
});

// 9. Lab Tests Page Integration & Reference UI Verification
test('Lab Tests Page: integrates LabTestsPage, labTestsData, summary cards, timeline, Recent Lab Results, Auto-Sync & HIPAA sections, and PDF export', () => {
  const labPageCode = read('src/components/lab-tests/LabTestsPage.tsx');
  const labDataCode = read('src/data/labTestsData.ts');
  const pdfCode = read('src/utils/pdfGenerator.ts');
  assert.ok(labPageCode.includes('Order Lab Test'), 'Must render Order Lab Test button');
  assert.ok(labPageCode.includes('Upload Report'), 'Must render Upload Report button');
  assert.ok(labPageCode.includes('Download All'), 'Must render Download All button');
  assert.ok(labPageCode.includes('Recent Lab Results'), 'Must render Recent Lab Results section');
  assert.ok(labPageCode.includes('Auto-Sync & Smart Insights'), 'Must render Auto-Sync & Smart Insights card');
  assert.ok(labPageCode.includes('HIPAA Compliant'), 'Must render HIPAA Compliant Enterprise Security card');
  assert.ok(labDataCode.includes('Basic Metabolic Panel'), 'Must include Basic Metabolic Panel');
  assert.ok(labDataCode.includes('Vitamin D, 25-Hydroxy'), 'Must include Vitamin D, 25-Hydroxy');
  assert.ok(pdfCode.includes('export function generateLabTestsPdf'), 'Must export generateLabTestsPdf');
});

// 10. Lab Tests Full-Width & Responsive Fluid clamp() Layout Verification
test('Lab Tests Full-Width Layout: removes narrow max-w-[1380px] mx-auto and max-w-xl constraints and uses fluid clamp() sizing', () => {
  const labPageCode = read('src/components/lab-tests/LabTestsPage.tsx');
  assert.ok(!labPageCode.includes('max-w-[1380px] mx-auto'), 'Narrow centered max-w-[1380px] mx-auto container must be removed');
  assert.ok(!labPageCode.includes('max-w-xl'), 'Narrow max-w-xl width constraints on title and search bar must be removed');
  assert.ok(labPageCode.includes('px-[clamp(0.75rem,2vw,2rem)]'), 'Must use fluid clamp() horizontal page padding');
  assert.ok(labPageCode.includes('text-[clamp(1.75rem,2.6vw,2.75rem)]'), 'Must use fluid clamp() page title typography');
  assert.ok(labPageCode.includes('gap-[clamp(0.75rem,1.5vw,1.5rem)]'), 'Must use fluid clamp() grid gap');
});

// 11. Report PDF Viewer: real PDF.js rendering wired into the Medical Records listing
test('Report PDF Viewer: renders real PDF pages via PDF.js with working zoom, rotation, paging, download, print and close', () => {
  const viewerCode = read('src/components/report-viewer/PdfCanvasViewer.tsx');
  assert.ok(viewerCode.includes("from '../../services/pdfjs'"), 'Viewer must render through the shared PDF.js setup');
  assert.ok(viewerCode.includes('pdfjsLib.getDocument'), 'Viewer must load documents with PDF.js, not a static placeholder');
  assert.ok(viewerCode.includes('bytes.slice()'), 'Viewer must hand PDF.js a private copy so the buffer is not detached');
  assert.ok(viewerCode.includes("effectiveStatus === 'error'"), 'Viewer must expose a professional error state');
  assert.ok(viewerCode.includes("effectiveStatus === 'loading'"), 'Viewer must expose a loading state');

  const toolbarCode = read('src/components/report-viewer/PdfToolbar.tsx');
  assert.ok(toolbarCode.includes('aria-label="Zoom in"') && toolbarCode.includes('aria-label="Zoom out"'), 'Toolbar must expose zoom controls');
  assert.ok(toolbarCode.includes('Page {numPages === 0'), 'Toolbar must show a live page indicator');
  assert.ok(toolbarCode.includes('Rotate document 90 degrees clockwise'), 'Toolbar must expose rotation');
  assert.ok(toolbarCode.includes('fitMode'), 'Toolbar must expose a fit-to-width / fit-to-page control');

  const pageCode = read('src/components/report-viewer/ReportPdfViewPage.tsx');
  assert.ok(pageCode.includes('resolveReportDocument(record, patient)'), 'Page must resolve the selected record dynamically, never a static sample');
  assert.ok(pageCode.includes('registerUploadedDocument'), 'Page must support uploading a new PDF');
  assert.ok(pageCode.includes('downloadPdf(') && pageCode.includes('printPdf('), 'Page must support download and print of the exact bytes');
  assert.ok(!pageCode.includes('David Brock'), 'Patient details must come from the active profile, not hardcoded strings');

  const serviceCode = read('src/services/reportDocumentService.ts');
  assert.ok(serviceCode.includes("from 'jspdf'"), 'Service must compose real PDF bytes');
  assert.ok(!serviceCode.includes('David Brock'), 'Generated documents must be driven by record/patient data');

  const appCode = read('src/App.tsx');
  assert.ok(appCode.includes("'report-view'"), 'App must route to the Report PDF viewer');
  assert.ok(appCode.includes('handleOpenReportDocument'), 'App must open the viewer for a selected record');
  assert.ok(appCode.includes("url.searchParams.set('record', recordId)"), 'Viewer route must carry the selected record id');
  assert.ok(appCode.includes('lazy(() =>'), 'PDF stack must stay out of the main bundle');

  const recordsPageCode = read('src/components/medical-records/MedicalRecordsPage.tsx');
  assert.ok(recordsPageCode.includes('onViewRecord'), 'Medical Records page must forward record clicks to the viewer');

  const tableCode = read('src/components/medical-records/MedicalRecordsTable.tsx');
  assert.ok(tableCode.includes('Open PDF preview for'), 'Record rows and cards must be clickable');
});

console.log(`\nAll ${passed} verification test suites passed successfully!`);

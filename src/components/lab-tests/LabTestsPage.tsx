import React, { useState, useMemo, useRef } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Search,
  Upload,
  Share2,
  Download,
  FlaskConical,
  Sparkles,
  ShieldCheck,
  Lock,
  Star,
  X,
  CheckCircle2,
  AlertTriangle,
  Clock
} from 'lucide-react';
import {
  initialLabTestsData,
  LabTestItem,
  LabFilterTab
} from '../../data/labTestsData';
import { generateLabTestsPdf } from '../../utils/pdfGenerator';

interface LabTestsPageProps {
  onBackToDashboard: () => void;
  onNavigateToUpload?: () => void;
  onNavigateToShare?: () => void;
  onOpenAiInsight?: () => void;
  patientName?: string;
  patientId?: string;
}

export const LabTestsPage: React.FC<LabTestsPageProps> = ({
  onBackToDashboard,
  onNavigateToUpload,
  onNavigateToShare,
  onOpenAiInsight,
  patientName = 'David Brock',
  patientId = '#4432-6TH'
}) => {
  const [labTests, setLabTests] = useState<LabTestItem[]>(initialLabTestsData);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<LabFilterTab>('All');
  const [selectedTest, setSelectedTest] = useState<LabTestItem | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderPanelName, setOrderPanelName] = useState('Comprehensive Metabolic Panel (CMP)');
  const [orderDoctor, setOrderDoctor] = useState('Dr. Patel');
  const [orderFacility, setOrderFacility] = useState('Quest Diagnostics');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const timelineRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  // Summary counts derived from current labTests state
  const summaryStats = useMemo(() => {
    const total = labTests.length;
    const attention = labTests.filter(
      (t) => t.status === 'attention' || t.status === 'abnormal'
    ).length;
    const pending = labTests.filter((t) => t.status === 'pending').length;
    const normal = labTests.filter((t) => t.status === 'normal').length;
    return { total, attention, pending, normal };
  }, [labTests]);

  // 3 Recent Lab Results cards
  const recentLabCards = useMemo(() => {
    return labTests.filter((t) => t.isRecentCard).slice(0, 3);
  }, [labTests]);

  // Filtered Timeline items
  const filteredTimelineTests = useMemo(() => {
    const anchorDate = new Date('2026-05-26T23:59:59').getTime();

    return labTests.filter((test) => {
      // Tab filter
      if (activeFilter === 'Recent (30 days)') {
        const testTime = new Date(test.rawDate).getTime();
        const diffDays = (anchorDate - testTime) / (1000 * 60 * 60 * 24);
        if (diffDays > 30) return false;
      } else if (activeFilter === 'Needs Attention') {
        if (test.status !== 'attention' && test.status !== 'abnormal') return false;
      } else if (activeFilter === 'Pending') {
        if (test.status !== 'pending') return false;
      } else if (activeFilter === 'Favorites') {
        if (!test.isFavorite) return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = test.title.toLowerCase().includes(q);
        const matchesDoctor = test.doctor.toLowerCase().includes(q);
        const matchesFacility = test.facility.toLowerCase().includes(q);
        const matchesSummary = test.summary.toLowerCase().includes(q);
        const matchesBadge = test.badgeLabel.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDoctor && !matchesFacility && !matchesSummary && !matchesBadge) {
          return false;
        }
      }

      return true;
    });
  }, [labTests, activeFilter, searchQuery]);

  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLabTests((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextFav = !item.isFavorite;
          showToast(
            nextFav
              ? `Added "${item.title}" to Favorites`
              : `Removed "${item.title}" from Favorites`
          );
          return { ...item, isFavorite: nextFav };
        }
        return item;
      })
    );
  };

  const handleOrderLabSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTest: LabTestItem = {
      id: `lab-order-${Date.now()}`,
      title: orderPanelName,
      status: 'pending',
      badgeLabel: 'PENDING',
      recentBadgeLabel: 'Pending',
      doctor: orderDoctor,
      facility: orderFacility,
      date: 'May 26, 2026',
      rawDate: '2026-05-26',
      summary: 'Requisition transmitted electronically. Awaiting specimen collection.',
      iconType: 'flask',
      dotColor: 'purple',
      isFavorite: false,
      aiClinicalNote:
        'Electronic lab requisition has been sent to the selected diagnostic facility. Bring your requisition ID and photo ID to your appointment.',
      biomarkers: [
        {
          name: orderPanelName,
          value: 'Scheduled',
          unit: '',
          referenceRange: 'Standard Reference Interval',
          status: 'Pending'
        }
      ]
    };
    setLabTests((prev) => [newTest, ...prev]);
    setIsOrderModalOpen(false);
    setActiveFilter('All');
    showToast(`Lab requisition for "${orderPanelName}" submitted to ${orderFacility}.`);
  };

  const handleDownloadAll = () => {
    showToast('Generating printable PDF report of all laboratory results...');
    generateLabTestsPdf(labTests, patientName, patientId);
  };

  const handleShareAll = () => {
    if (onNavigateToShare) {
      onNavigateToShare();
    } else {
      showToast('Secure sharing link prepared for your care team.');
    }
  };

  const renderTimelineIcon = (iconType: LabTestItem['iconType']) => {
    const iconBoxClass =
      'w-[clamp(2.75rem,3vw,3.25rem)] h-[clamp(2.75rem,3vw,3.25rem)] rounded-2xl flex items-center justify-center shrink-0 shadow-2xs';
    switch (iconType) {
      case 'flask':
        return (
          <div className={`${iconBoxClass} bg-[#F3E8FF] border border-purple-200/60`}>
            <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none">
              <path
                d="M12 4H20M14 4V11L7.5 22.2C6.7 23.5 7.6 25.2 9.2 25.2H22.8C24.4 25.2 25.3 23.5 24.5 22.2L18 11V4"
                stroke="#7C3AED"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.5 19.5C12 18.5 14.5 20.5 17 19.5C19.5 18.5 21 19.5 22.5 19.5L24.2 22.4C24.7 23.3 24.1 24.4 23 24.4H9C7.9 24.4 7.3 23.3 7.8 22.4L9.5 19.5Z"
                fill="url(#flaskGrad)"
              />
              <defs>
                <linearGradient id="flaskGrad" x1="8" y1="19" x2="24" y2="25" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#C084FC" />
                  <stop offset="1" stopColor="#7C3AED" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        );
      case 'specimen':
        return (
          <div className={`${iconBoxClass} bg-[#FFF7ED] border border-amber-200/60`}>
            <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none">
              <rect x="8" y="6" width="16" height="4" rx="1.5" fill="#EA580C" />
              <path
                d="M10 10H22L21 25C20.9 26.1 20 27 18.9 27H13.1C12 27 11.1 26.1 11 25L10 10Z"
                fill="#FED7AA"
                stroke="#F97316"
                strokeWidth="1.5"
              />
              <path d="M10.6 16H21.4L20.8 24.5C20.7 25.3 20 26 19.2 26H12.8C12 26 11.3 25.3 11.2 24.5L10.6 16Z" fill="#F59E0B" />
            </svg>
          </div>
        );
      case 'blood-tube':
        return (
          <div className={`${iconBoxClass} bg-[#F5F3FF] border border-purple-200/60`}>
            <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none">
              <path
                d="M19.5 6.5L25.5 12.5L13.5 24.5C11.8 26.2 9.1 26.2 7.5 24.5C5.8 22.8 5.8 20.2 7.5 18.5L19.5 6.5Z"
                stroke="#7C3AED"
                strokeWidth="1.8"
                fill="#EDE9FE"
              />
              <path
                d="M13.5 12.5L19.5 18.5L13.5 24.5C11.8 26.2 9.1 26.2 7.5 24.5C5.8 22.8 5.8 20.2 7.5 18.5L13.5 12.5Z"
                fill="#EF4444"
              />
              <path d="M18 5L27 14" stroke="#6D28D9" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        );
      case 'glucometer':
        return (
          <div className={`${iconBoxClass} bg-[#EFF6FF] border border-blue-200/60`}>
            <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none">
              <rect x="8" y="5" width="16" height="22" rx="4" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
              <rect x="10.5" y="8" width="11" height="9" rx="1.5" fill="#E0F2FE" />
              <text x="16" y="14.5" textAnchor="middle" fill="#0284C7" fontSize="6" fontWeight="bold">
                5.4
              </text>
              <circle cx="16" cy="21.5" r="2" fill="#38BDF8" />
            </svg>
          </div>
        );
      case 'thyroid':
        return (
          <div className={`${iconBoxClass} bg-[#FAF5FF] border border-purple-200/60`}>
            <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none">
              <rect x="9" y="6" width="5" height="20" rx="2.5" fill="#E9D5FF" stroke="#9333EA" strokeWidth="1.5" />
              <rect x="9.8" y="14" width="3.4" height="11" rx="1.7" fill="#A855F7" />
              <rect x="18" y="6" width="5" height="20" rx="2.5" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
              <rect x="18.8" y="12" width="3.4" height="13" rx="1.7" fill="#F59E0B" />
            </svg>
          </div>
        );
      case 'urinalysis':
        return (
          <div className={`${iconBoxClass} bg-[#FEFCE8] border border-yellow-200/70`}>
            <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none">
              <rect x="9" y="6" width="14" height="3.5" rx="1.2" fill="#3B82F6" />
              <path d="M10.5 9.5H21.5L20.5 25C20.4 26 19.6 26.8 18.6 26.8H13.4C12.4 26.8 11.6 26 11.5 25L10.5 9.5Z" fill="#FEF08A" stroke="#EAB308" strokeWidth="1.5" />
              <path d="M11.2 15.5H20.8L20.2 24.5C20.1 25.3 19.4 26 18.6 26H13.4C12.6 26 11.9 25.3 11.8 24.5L11.2 15.5Z" fill="#FACC15" />
            </svg>
          </div>
        );
      case 'vitamin':
      default:
        return (
          <div className={`${iconBoxClass} bg-[#FFF1F2] border border-rose-200/60`}>
            <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none">
              <rect
                x="7"
                y="12"
                width="18"
                height="9"
                rx="4.5"
                transform="rotate(-25 16 16.5)"
                fill="#FDE047"
                stroke="#F59E0B"
                strokeWidth="1.5"
              />
              <path
                d="M15.5 10.5L21.5 7.7C23.8 6.6 26.5 7.6 27.6 9.9C28.7 12.2 27.7 14.9 25.4 16L19.4 18.8L15.5 10.5Z"
                fill="#F97316"
              />
            </svg>
          </div>
        );
    }
  };

  const renderStatusBadge = (label: LabTestItem['badgeLabel']) => {
    if (label === 'PENDING') {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#F3E8FF] text-[#7C3AED] border border-purple-200/70">
          PENDING
        </span>
      );
    }
    if (label === 'NEEDS ATTENTION') {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#FEF3C7] text-[#D97706] border border-amber-200/80">
          NEEDS ATTENTION
        </span>
      );
    }
    if (label === 'ABNORMAL') {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#FFE4E6] text-[#E11D48] border border-rose-200/80">
          ABNORMAL
        </span>
      );
    }
    return (
      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#D1FAE5] text-[#059669] border border-emerald-200/80">
        NORMAL
      </span>
    );
  };

  const renderDotColor = (dot: LabTestItem['dotColor']) => {
    if (dot === 'purple') return 'bg-[#7C3AED] ring-purple-100';
    if (dot === 'amber') return 'bg-[#F59E0B] ring-amber-100';
    if (dot === 'rose') return 'bg-[#EF4444] ring-rose-100';
    return 'bg-[#10B981] ring-emerald-100';
  };

  const renderRecentCardIllustration = (iconType: LabTestItem['iconType']) => {
    if (iconType === 'specimen') {
      // 3D Specimen Container Illustration
      return (
        <div className="w-full h-[130px] sm:h-[140px] rounded-2xl bg-gradient-to-b from-[#FFFBEB]/80 via-[#FFF7ED]/50 to-white flex items-center justify-center relative overflow-hidden">
          <div className="w-24 h-24 rounded-full bg-amber-200/30 blur-xl absolute" />
          <svg className="w-24 h-24 relative z-10 drop-shadow-md" viewBox="0 0 96 96" fill="none">
            <g transform="rotate(-12 48 48)">
              <rect x="24" y="18" width="48" height="11" rx="4" fill="url(#capGrad)" />
              <path
                d="M28 29H68L64 74C63.6 78.5 59.8 82 55.3 82H40.7C36.2 82 32.4 78.5 32 74L28 29Z"
                fill="url(#cupGlass)"
                stroke="#FDBA74"
                strokeWidth="1.5"
              />
              <path
                d="M29.8 46H66.2L63.5 73C63.1 76.9 59.8 80 55.8 80H40.2C36.2 80 32.9 76.9 32.5 73L29.8 46Z"
                fill="url(#liquidAmber)"
              />
              <rect x="35" y="38" width="16" height="24" rx="2" fill="white" fillOpacity="0.75" />
              <line x1="38" y1="44" x2="48" y2="44" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
              <line x1="38" y1="50" x2="46" y2="50" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="38" y1="55" x2="49" y2="55" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
            </g>
            <defs>
              <linearGradient id="capGrad" x1="24" y1="18" x2="72" y2="29" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FB923C" />
                <stop offset="1" stopColor="#C2410C" />
              </linearGradient>
              <linearGradient id="cupGlass" x1="28" y1="29" x2="68" y2="82" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFFFFF" stopOpacity="0.9" />
                <stop offset="1" stopColor="#FFEDD5" stopOpacity="0.7" />
              </linearGradient>
              <linearGradient id="liquidAmber" x1="30" y1="46" x2="66" y2="80" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FBBF24" />
                <stop offset="1" stopColor="#D97706" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      );
    }

    if (iconType === 'blood-tube') {
      // 3D Blood Tubes Illustration
      return (
        <div className="w-full h-[130px] sm:h-[140px] rounded-2xl bg-gradient-to-b from-[#F5F3FF]/80 via-[#FAF5FF]/50 to-white flex items-center justify-center relative overflow-hidden">
          <div className="w-24 h-24 rounded-full bg-purple-200/30 blur-xl absolute" />
          <svg className="w-24 h-24 relative z-10 drop-shadow-md" viewBox="0 0 96 96" fill="none">
            <g transform="rotate(25 48 48)">
              <rect x="34" y="14" width="12" height="58" rx="6" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
              <rect x="35" y="40" width="10" height="31" rx="5" fill="url(#bloodGrad)" />
              <rect x="33" y="12" width="14" height="9" rx="3" fill="#EF4444" />
              <rect x="37" y="26" width="6" height="16" rx="1" fill="white" stroke="#E2E8F0" />
            </g>
            <g transform="rotate(-18 54 52)">
              <rect x="48" y="20" width="12" height="54" rx="6" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
              <rect x="49" y="44" width="10" height="29" rx="5" fill="url(#bloodGrad)" />
              <rect x="47" y="18" width="14" height="9" rx="3" fill="#8B5CF6" />
              <rect x="51" y="31" width="6" height="15" rx="1" fill="white" stroke="#E2E8F0" />
            </g>
            <defs>
              <linearGradient id="bloodGrad" x1="35" y1="40" x2="45" y2="72" gradientUnits="userSpaceOnUse">
                <stop stopColor="#EF4444" />
                <stop offset="1" stopColor="#991B1B" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      );
    }

    // 3D Hemoglobin A1C Digital Meter Illustration
    return (
      <div className="w-full h-[130px] sm:h-[140px] rounded-2xl bg-gradient-to-b from-[#F0F9FF]/80 via-[#F8FAFC]/60 to-white flex items-center justify-center relative overflow-hidden">
        <div className="w-24 h-24 rounded-full bg-sky-200/30 blur-xl absolute" />
        <svg className="w-24 h-24 relative z-10 drop-shadow-md" viewBox="0 0 96 96" fill="none">
          <rect x="26" y="16" width="38" height="58" rx="10" fill="url(#meterBody)" stroke="#475569" strokeWidth="1.5" />
          <rect x="31" y="23" width="28" height="24" rx="4" fill="#E0F2FE" />
          <text x="45" y="37" textAnchor="middle" fill="#0369A1" fontSize="11" fontWeight="bold" fontFamily="monospace">
            5.4%
          </text>
          <text x="45" y="44" textAnchor="middle" fill="#0284C7" fontSize="5" fontWeight="bold">
            HbA1c NORMAL
          </text>
          <circle cx="45" cy="59" r="6" fill="#334155" stroke="#64748B" strokeWidth="1.5" />
          <rect x="42" y="74" width="6" height="10" rx="1" fill="#E2E8F0" stroke="#94A3B8" />
          <circle cx="45" cy="82" r="1.8" fill="#EF4444" />
          <defs>
            <linearGradient id="meterBody" x1="26" y1="16" x2="64" y2="74" gradientUnits="userSpaceOnUse">
              <stop stopColor="#334155" />
              <stop offset="1" stopColor="#0F172A" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  };

  return (
    <div
      data-testid="lab-tests-page"
      className="w-full min-h-screen bg-[#FAF9FE] text-[#0F172A] pb-16 font-inter overflow-x-hidden"
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 bg-[#0F172A] text-white px-4 py-2.5 rounded-xl shadow-xl text-xs sm:text-sm font-medium animate-fade-in flex items-center gap-2 border border-white/10"
        >
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      <main className="w-full px-[clamp(0.75rem,2vw,2rem)] pt-[clamp(0.75rem,1.5vw,1.5rem)] space-y-[clamp(1.25rem,2vw,2rem)]">
        {/* ============================================================ */}
        {/* 1. BREADCRUMB + LAB TESTS HEADER & ACTION BUTTONS            */}
        {/* ============================================================ */}
        <header className="w-full flex flex-col gap-3">
          {/* Back to Dashboard Breadcrumb */}
          <div>
            <button
              type="button"
              onClick={onBackToDashboard}
              data-testid="lab-tests-back-button"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#6D28D9] hover:text-[#4C1D95] transition-colors group cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-lg px-1.5 py-0.5 -ml-1.5"
              aria-label="Back to Dashboard"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Dashboard</span>
            </button>
          </div>

          {/* Last Updated Pill */}
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3E8FF] text-[#6D28D9] text-[11px] sm:text-xs font-semibold border border-purple-200/60">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
              <span>Last updated: Just now • May 25, 2026</span>
            </span>
          </div>

          {/* Title Row + Action Buttons */}
          <div className="w-full flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="flex flex-col flex-1 min-w-0">
              <h1 className="text-[clamp(1.75rem,2.6vw,2.75rem)] font-extrabold text-[#0F172A] tracking-tight leading-tight">
                Lab Tests
              </h1>
              <p className="text-[clamp(0.8125rem,1vw,0.95rem)] text-slate-500 mt-1.5 leading-relaxed">
                A complete history of your laboratory results, intelligently organized and ready when you need them.
              </p>
            </div>

            {/* Right Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => setIsOrderModalOpen(true)}
                data-testid="order-lab-test-button"
                className="h-[38px] sm:h-[42px] px-4 sm:px-5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] hover:from-[#6D28D9] hover:to-[#5B21B6] text-white text-xs sm:text-sm font-semibold shadow-md shadow-purple-500/20 flex items-center gap-2 cursor-pointer transition-all"
              >
                <span className="text-base leading-none">+</span>
                <FlaskConical className="w-3.5 h-3.5" />
                <span>Order Lab Test</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (onNavigateToUpload) {
                    onNavigateToUpload();
                  } else {
                    showToast('Opening lab report upload dialog...');
                  }
                }}
                data-testid="upload-lab-report-button"
                className="h-[38px] sm:h-[42px] px-3.5 sm:px-4 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 text-xs sm:text-sm font-semibold shadow-2xs flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <Upload className="w-3.5 h-3.5 text-slate-500" />
                <span>Upload Report</span>
              </button>

              <button
                type="button"
                onClick={handleShareAll}
                data-testid="share-lab-tests-button"
                className="h-[38px] sm:h-[42px] px-3.5 sm:px-4 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 text-xs sm:text-sm font-semibold shadow-2xs flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <Share2 className="w-3.5 h-3.5 text-slate-500" />
                <span>Share</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadAll}
                data-testid="download-all-labs-button"
                className="h-[38px] sm:h-[42px] px-3.5 sm:px-4 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 text-xs sm:text-sm font-semibold shadow-2xs flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Download All</span>
              </button>
            </div>
          </div>
        </header>

        {/* ============================================================ */}
        {/* 2. FOUR SUMMARY CARDS ROW                                    */}
        {/* ============================================================ */}
        <section
          aria-label="Lab Results Summary"
          className="w-full grid grid-cols-1 min-[425px]:grid-cols-2 lg:grid-cols-4 gap-[clamp(0.75rem,1.5vw,1.5rem)]"
        >
          {/* Card 1: All Results */}
          <div
            onClick={() => setActiveFilter('All')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveFilter('All');
              }
            }}
            data-testid="summary-card-all"
            className="w-full rounded-[20px] p-[clamp(1rem,1.6vw,1.5rem)] bg-gradient-to-br from-[#F5F3FF] via-[#FAF8FF] to-[#EDE9FE]/80 border border-purple-100/90 shadow-2xs hover:shadow-md transition-all flex items-center justify-between cursor-pointer"
          >
            <div className="flex flex-col min-w-0">
              <span className="text-xs sm:text-[13px] font-semibold text-slate-500">All Results</span>
              <span className="text-[clamp(1.5rem,2.2vw,2.25rem)] font-extrabold text-[#0F172A] mt-1 leading-none">
                {summaryStats.total}
              </span>
              <span className="text-[11px] sm:text-xs font-medium text-slate-400 mt-1.5">+2 this month</span>
            </div>
            {/* 3D Clipboard Icon */}
            <div className="w-[clamp(2.75rem,3.5vw,3.75rem)] h-[clamp(2.75rem,3.5vw,3.75rem)] flex items-center justify-center shrink-0">
              <svg className="w-full h-full drop-shadow-xs" viewBox="0 0 48 48" fill="none">
                <rect x="10" y="8" width="28" height="34" rx="5" fill="url(#clipGrad)" />
                <rect x="13" y="12" width="22" height="27" rx="3" fill="#FAF5FF" />
                <rect x="17" y="5" width="14" height="6" rx="3" fill="#F59E0B" />
                <line x1="17" y1="19" x2="30" y2="19" stroke="#A855F7" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="17" y1="25" x2="28" y2="25" stroke="#C084FC" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="17" y1="31" x2="25" y2="31" stroke="#C084FC" strokeWidth="2.2" strokeLinecap="round" />
                <defs>
                  <linearGradient id="clipGrad" x1="10" y1="8" x2="38" y2="42" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#A855F7" />
                    <stop offset="1" stopColor="#6D28D9" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Card 2: Needs Attention */}
          <div
            onClick={() => setActiveFilter('Needs Attention')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveFilter('Needs Attention');
              }
            }}
            data-testid="summary-card-attention"
            className="w-full rounded-[20px] p-[clamp(1rem,1.6vw,1.5rem)] bg-gradient-to-br from-[#FFFBEB] via-[#FFFDF7] to-[#FEF3C7]/70 border border-amber-100/90 shadow-2xs hover:shadow-md transition-all flex items-center justify-between cursor-pointer"
          >
            <div className="flex flex-col min-w-0">
              <span className="text-xs sm:text-[13px] font-semibold text-slate-500">Needs Attention</span>
              <span className="text-[clamp(1.5rem,2.2vw,2.25rem)] font-extrabold text-[#0F172A] mt-1 leading-none">
                {summaryStats.attention}
              </span>
              <span className="text-[11px] sm:text-xs font-medium text-slate-400 mt-1.5">+1 this month</span>
            </div>
            {/* 3D Warning Triangle Icon */}
            <div className="w-[clamp(2.75rem,3.5vw,3.75rem)] h-[clamp(2.75rem,3.5vw,3.75rem)] flex items-center justify-center shrink-0">
              <svg className="w-full h-full drop-shadow-xs" viewBox="0 0 48 48" fill="none">
                <path
                  d="M21.4 9.6C22.6 7.5 25.4 7.5 26.6 9.6L41.2 35C42.4 37.1 40.9 39.7 38.6 39.7H9.4C7.1 39.7 5.6 37.1 6.8 35L21.4 9.6Z"
                  fill="url(#warnGrad)"
                />
                <path d="M24 18V27" stroke="white" strokeWidth="3.2" strokeLinecap="round" />
                <circle cx="24" cy="33" r="2" fill="white" />
                <defs>
                  <linearGradient id="warnGrad" x1="12" y1="8" x2="36" y2="40" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FBBF24" />
                    <stop offset="1" stopColor="#EA580C" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Card 3: Pending */}
          <div
            onClick={() => setActiveFilter('Pending')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveFilter('Pending');
              }
            }}
            data-testid="summary-card-pending"
            className="w-full rounded-[20px] p-[clamp(1rem,1.6vw,1.5rem)] bg-gradient-to-br from-[#FAF5FF] via-[#FDFBFF] to-[#F3E8FF]/80 border border-purple-100/90 shadow-2xs hover:shadow-md transition-all flex items-center justify-between cursor-pointer"
          >
            <div className="flex flex-col min-w-0">
              <span className="text-xs sm:text-[13px] font-semibold text-slate-500">Pending</span>
              <span className="text-[clamp(1.5rem,2.2vw,2.25rem)] font-extrabold text-[#0F172A] mt-1 leading-none">
                {summaryStats.pending}
              </span>
              <span className="text-[11px] sm:text-xs font-medium text-slate-400 mt-1.5">Est. 24h turnaround</span>
            </div>
            {/* 3D Purple Flask Icon */}
            <div className="w-[clamp(2.75rem,3.5vw,3.75rem)] h-[clamp(2.75rem,3.5vw,3.75rem)] flex items-center justify-center shrink-0">
              <svg className="w-full h-full drop-shadow-xs" viewBox="0 0 48 48" fill="none">
                <path
                  d="M18 7H30M21 7V17L11 34C9.8 36 11.2 38.5 13.6 38.5H34.4C36.8 38.5 38.2 36 37 34L27 17V7"
                  stroke="#7C3AED"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 29C18 27.5 22 30.5 26 29C30 27.5 32 29 34 29L36.5 33.5C37.3 35 36.3 36.8 34.6 36.8H13.4C11.7 36.8 10.7 35 11.5 33.5L14 29Z"
                  fill="url(#sumFlaskGrad)"
                />
                <defs>
                  <linearGradient id="sumFlaskGrad" x1="12" y1="28" x2="36" y2="37" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#C084FC" />
                    <stop offset="1" stopColor="#6D28D9" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Card 4: Normal */}
          <div
            onClick={() => setActiveFilter('All')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveFilter('All');
              }
            }}
            data-testid="summary-card-normal"
            className="w-full rounded-[20px] p-[clamp(1rem,1.6vw,1.5rem)] bg-gradient-to-br from-[#ECFDF5] via-[#F6FEF9] to-[#D1FAE5]/70 border border-emerald-100/90 shadow-2xs hover:shadow-md transition-all flex items-center justify-between cursor-pointer"
          >
            <div className="flex flex-col min-w-0">
              <span className="text-xs sm:text-[13px] font-semibold text-slate-500">Normal</span>
              <span className="text-[clamp(1.5rem,2.2vw,2.25rem)] font-extrabold text-[#0F172A] mt-1 leading-none">
                {summaryStats.normal}
              </span>
              <span className="text-[11px] sm:text-xs font-medium text-slate-400 mt-1.5">All in healthy range</span>
            </div>
            {/* 3D Green Shield Icon */}
            <div className="w-[clamp(2.75rem,3.5vw,3.75rem)] h-[clamp(2.75rem,3.5vw,3.75rem)] flex items-center justify-center shrink-0">
              <svg className="w-full h-full drop-shadow-xs" viewBox="0 0 48 48" fill="none">
                <path
                  d="M24 6L38 12V23C38 32.5 31.8 39.8 24 42C16.2 39.8 10 32.5 10 23V12L24 6Z"
                  fill="url(#shieldGreen)"
                />
                <path
                  d="M18.5 24.5L22.5 28.5L30.5 20.5"
                  stroke="white"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient id="shieldGreen" x1="10" y1="6" x2="38" y2="42" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#34D399" />
                    <stop offset="1" stopColor="#059669" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 3. SEARCH & FILTER BAR                                       */}
        {/* ============================================================ */}
        <section
          ref={timelineRef}
          aria-label="Search and filter lab tests"
          className="w-full flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4"
        >
          {/* Search Input (stretches across available horizontal space) */}
          <div className="relative flex-1 min-w-0">
            <div className="h-[42px] sm:h-[46px] px-4 rounded-full bg-white border border-slate-200/90 shadow-2xs flex items-center gap-2.5 focus-within:ring-2 focus-within:ring-purple-500/40 focus-within:border-purple-400 transition-all">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Find a test..."
                aria-label="Find a test"
                data-testid="lab-tests-search-input"
                className="w-full bg-transparent text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Filter Pills */}
          <div
            role="tablist"
            aria-label="Lab test category filters"
            className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5 shrink-0"
          >
            {(['All', 'Recent (30 days)', 'Needs Attention', 'Pending', 'Favorites'] as LabFilterTab[]).map(
              (tab) => {
                const isActive = activeFilter === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    data-testid={`lab-filter-${tab.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    onClick={() => setActiveFilter(tab)}
                    className={`h-[36px] sm:h-[40px] px-3.5 sm:px-4 rounded-full text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#6D28D9] text-white shadow-sm shadow-purple-500/20'
                        : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-50'
                    }`}
                  >
                    {tab === 'Favorites' && (
                      <Star
                        className={`w-3.5 h-3.5 ${
                          isActive ? 'fill-white text-white' : 'text-slate-400'
                        }`}
                      />
                    )}
                    <span>{tab}</span>
                  </button>
                );
              }
            )}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 4. LAB TEST HISTORY VERTICAL TIMELINE                        */}
        {/* ============================================================ */}
        <section aria-label="Lab Test History Timeline" className="w-full relative pl-4 sm:pl-7">
          {/* Vertical Spine */}
          <div
            aria-hidden="true"
            className="absolute left-[7px] sm:left-[11px] top-6 bottom-6 w-[2px] bg-slate-200/90 rounded-full"
          />

          <div className="w-full flex flex-col gap-[clamp(0.75rem,1.2vw,1.125rem)]">
            {filteredTimelineTests.length === 0 ? (
              <div className="w-full bg-white rounded-[22px] border border-slate-200/80 p-10 text-center">
                <p className="text-sm font-semibold text-slate-600">
                  No laboratory tests match your current search or filter.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveFilter('All');
                  }}
                  className="mt-3 px-4 py-2 rounded-full bg-purple-50 text-[#6D28D9] text-xs font-bold hover:bg-purple-100 transition-colors cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredTimelineTests.map((test) => (
                <div
                  key={test.id}
                  onClick={() => setSelectedTest(test)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedTest(test);
                    }
                  }}
                  data-testid={`lab-timeline-card-${test.id}`}
                  className="w-full relative bg-white rounded-[20px] sm:rounded-[22px] p-[clamp(0.875rem,1.5vw,1.375rem)] border border-slate-100 shadow-[0_2px_12px_rgba(15,23,42,0.03)] hover:shadow-md hover:border-purple-200/70 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 cursor-pointer group"
                >
                  {/* Timeline Colored Dot */}
                  <span
                    aria-hidden="true"
                    className={`absolute -left-[14px] sm:-left-[21px] top-7 sm:top-1/2 sm:-translate-y-1/2 w-3 h-3 rounded-full ring-4 ${renderDotColor(
                      test.dotColor
                    )}`}
                  />

                  <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 min-w-0 flex-1">
                    {/* 3D Icon Box */}
                    {renderTimelineIcon(test.iconType)}

                    {/* Text Details */}
                    <div className="flex flex-col min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-[clamp(0.9375rem,1.1vw,1.0625rem)] font-bold text-[#0F172A] group-hover:text-[#6D28D9] transition-colors">
                          {test.title}
                        </h3>
                        {renderStatusBadge(test.badgeLabel)}
                      </div>

                      <span className="text-[11px] sm:text-xs text-slate-400 font-medium mt-0.5">
                        Ordered by {test.doctor} • {test.facility} • {test.date}
                      </span>

                      <p className="text-xs sm:text-[13.5px] text-slate-600 font-normal mt-1.5 leading-relaxed">
                        {test.summary}
                      </p>
                    </div>
                  </div>

                  {/* Right Actions: Favorite Star & View Details */}
                  <div className="flex items-center justify-end gap-2 shrink-0 sm:self-center pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-100/80">
                    <button
                      type="button"
                      onClick={(e) => handleToggleFavorite(test.id, e)}
                      aria-label={
                        test.isFavorite
                          ? `Remove ${test.title} from favorites`
                          : `Add ${test.title} to favorites`
                      }
                      className="w-9 h-9 rounded-full hover:bg-slate-100 text-slate-400 hover:text-amber-500 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          test.isFavorite ? 'fill-amber-400 text-amber-400' : ''
                        }`}
                      />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTest(test);
                      }}
                      className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-slate-50 group-hover:bg-purple-50 text-xs font-semibold text-slate-600 group-hover:text-[#6D28D9] transition-colors cursor-pointer"
                    >
                      <span>View Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 5. RECENT LAB RESULTS (3 ILLUSTRATED CARDS)                  */}
        {/* ============================================================ */}
        <section aria-label="Recent Lab Results" className="w-full pt-2 space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-[clamp(1.125rem,1.4vw,1.375rem)] font-extrabold text-[#0F172A]">
                Recent Lab Results
              </h2>
              <p className="text-xs sm:text-[13px] text-slate-400 font-medium mt-0.5">
                Auto-synced from your providers • last 30 days
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setActiveFilter('All');
                timelineRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="text-xs sm:text-sm font-bold text-[#6D28D9] hover:text-[#4C1D95] transition-colors cursor-pointer shrink-0"
            >
              View all →
            </button>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-[clamp(0.875rem,1.5vw,1.5rem)]">
            {recentLabCards.map((card) => {
              const isAttention = card.recentBadgeLabel === 'Needs Attention';
              return (
                <div
                  key={`recent-${card.id}`}
                  data-testid={`recent-lab-card-${card.id}`}
                  className="w-full bg-white rounded-[24px] p-[clamp(1rem,1.6vw,1.5rem)] border border-slate-100 shadow-[0_4px_20px_rgba(15,23,42,0.04)] hover:shadow-lg transition-all flex flex-col justify-between gap-4"
                >
                  {/* Top 3D Illustration Area */}
                  {renderRecentCardIllustration(card.iconType)}

                  {/* Card Title, Badge & Date */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-[clamp(0.95rem,1.1vw,1.0625rem)] font-bold text-[#0F172A]">
                        {card.shortTitle || card.title}
                      </h3>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                          isAttention
                            ? 'bg-[#FEF3C7] text-[#D97706]'
                            : 'bg-[#D1FAE5] text-[#059669]'
                        }`}
                      >
                        {card.recentBadgeLabel || 'Normal'}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 font-medium">
                      {card.recentCardDate || card.date}
                    </span>
                  </div>

                  {/* Full-width View Details Pill Button */}
                  <button
                    type="button"
                    onClick={() => setSelectedTest(card)}
                    data-testid={`recent-view-details-${card.id}`}
                    className="w-full h-[40px] rounded-full bg-white hover:bg-purple-50/60 border border-slate-200/90 hover:border-purple-300 text-xs font-bold text-[#0F172A] hover:text-[#6D28D9] flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                  >
                    <span>View Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 6. AUTO-SYNC & SMART INSIGHTS + HIPAA COMPLIANT BANNERS      */}
        {/* ============================================================ */}
        <section
          aria-label="Smart Insights and HIPAA Security"
          className="w-full grid grid-cols-1 lg:grid-cols-2 gap-[clamp(0.875rem,1.5vw,1.5rem)] pt-2"
        >
          {/* Left Banner: Auto-Sync & Smart Insights */}
          <div className="w-full rounded-[24px] p-[clamp(1.25rem,2vw,2rem)] bg-gradient-to-br from-white via-[#FAF8FF] to-[#F3E8FF]/60 border border-purple-100 shadow-xs flex items-center justify-between gap-6 relative overflow-hidden">
            <div className="flex flex-col items-start gap-2.5 flex-1 min-w-0 z-10">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F3E8FF] text-[#6D28D9] text-[11px] font-bold">
                <Sparkles className="w-3 h-3" />
                <span>AI-Powered</span>
              </span>
              <h3 className="text-[clamp(1.125rem,1.4vw,1.375rem)] font-extrabold text-[#0F172A]">
                Auto-Sync &amp; Smart Insights
              </h3>
              <p className="text-[clamp(0.75rem,0.95vw,0.875rem)] text-slate-500 leading-relaxed">
                We automatically sync your lab results and highlight what matters most — trends, anomalies, and the next best action.
              </p>
              <button
                type="button"
                onClick={() => {
                  if (onOpenAiInsight) {
                    onOpenAiInsight();
                  } else {
                    showToast('AI Smart Insights synchronized with your latest 7 lab panels.');
                  }
                }}
                data-testid="auto-sync-learn-more-button"
                className="mt-1 h-[38px] px-5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] hover:from-[#6D28D9] hover:to-[#5B21B6] text-white text-xs font-bold shadow-sm flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <span>Learn More</span>
                <span>→</span>
              </button>
            </div>

            {/* Right 3D Purple Clipboard Illustration */}
            <div className="hidden sm:flex items-center justify-center shrink-0">
              <svg className="w-28 h-28 drop-shadow-md" viewBox="0 0 110 110" fill="none">
                <g transform="rotate(14 55 55)">
                  <rect x="22" y="16" width="66" height="80" rx="12" fill="url(#smartClipGrad)" />
                  <rect x="29" y="26" width="52" height="62" rx="8" fill="white" fillOpacity="0.92" />
                  <rect x="40" y="10" width="30" height="12" rx="5" fill="#C084FC" />
                  <rect x="36" y="36" width="14" height="14" rx="3" fill="#F3E8FF" />
                  <path d="M39 45L43 40L47 43" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
                  <line x1="55" y1="39" x2="73" y2="39" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="55" y1="46" x2="68" y2="46" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
                  <line x1="36" y1="60" x2="73" y2="60" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" />
                  <line x1="36" y1="68" x2="66" y2="68" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="68" cy="76" r="6" fill="#A855F7" />
                </g>
                <defs>
                  <linearGradient id="smartClipGrad" x1="22" y1="16" x2="88" y2="96" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#9333EA" />
                    <stop offset="1" stopColor="#5B21B6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Right Banner: HIPAA Compliant / Enterprise Security */}
          <div className="w-full rounded-[24px] p-[clamp(1.25rem,2vw,2rem)] bg-gradient-to-br from-[#6D28D9] via-[#7C3AED] to-[#9333EA] text-white shadow-md flex items-center justify-between gap-6 relative overflow-hidden">
            <div className="flex flex-col items-start gap-2.5 flex-1 min-w-0 z-10">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-xs text-white text-[11px] font-bold border border-white/20">
                <Lock className="w-3 h-3" />
                <span>Enterprise Security</span>
              </span>
              <h3 className="text-[clamp(1.125rem,1.4vw,1.375rem)] font-extrabold text-white">
                HIPAA Compliant
              </h3>
              <p className="text-[clamp(0.75rem,0.95vw,0.875rem)] text-purple-100 leading-relaxed">
                Your data is encrypted end-to-end. Protected Health Information is never sold or shared without consent.
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="px-2.5 py-1 rounded-full bg-white/15 border border-white/25 text-[10px] font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>AES-256</span>
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white/15 border border-white/25 text-[10px] font-bold">
                  ✓ SOC 2 Type II
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white/15 border border-white/25 text-[10px] font-bold">
                  🔒 HIPAA
                </span>
              </div>
            </div>

            {/* Right 3D Gold/Crimson Shield Illustration */}
            <div className="hidden sm:flex items-center justify-center shrink-0">
              <svg className="w-28 h-28 drop-shadow-lg" viewBox="0 0 110 110" fill="none">
                <path
                  d="M55 12L90 26V53C90 76.5 75.2 94.2 55 100C34.8 94.2 20 76.5 20 53V26L55 12Z"
                  fill="url(#goldRim)"
                />
                <path
                  d="M55 19L83 30.5V52.5C83 72.2 70.8 87.2 55 92.5C39.2 87.2 27 72.2 27 52.5V30.5L55 19Z"
                  fill="url(#crimsonCore)"
                />
                <path
                  d="M43 54L51 62L69 44"
                  stroke="url(#goldRim)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient id="goldRim" x1="20" y1="12" x2="90" y2="100" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FDE047" />
                    <stop offset="0.5" stopColor="#F59E0B" />
                    <stop offset="1" stopColor="#B45309" />
                  </linearGradient>
                  <linearGradient id="crimsonCore" x1="27" y1="19" x2="83" y2="92" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FB7185" />
                    <stop offset="0.5" stopColor="#E11D48" />
                    <stop offset="1" stopColor="#881337" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </section>
      </main>

      {/* ============================================================ */}
      {/* MODAL 1: LAB TEST DETAILS & BIOMARKER BREAKDOWN              */}
      {/* ============================================================ */}
      {selectedTest && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lab-detail-modal-title"
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fade-in"
          onClick={() => setSelectedTest(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-white rounded-[24px] sm:rounded-[28px] shadow-2xl border border-slate-100 p-5 sm:p-7 flex flex-col gap-5 my-auto"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3.5">
                {renderTimelineIcon(selectedTest.iconType)}
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3
                      id="lab-detail-modal-title"
                      className="text-lg sm:text-xl font-extrabold text-[#0F172A]"
                    >
                      {selectedTest.title}
                    </h3>
                    {renderStatusBadge(selectedTest.badgeLabel)}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Ordered by {selectedTest.doctor} • {selectedTest.facility} • {selectedTest.date}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTest(null)}
                aria-label="Close lab test details"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* AI Clinical Interpretation */}
            <div className="rounded-2xl bg-[#FAF5FF] border border-purple-200/70 p-4 flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-[#7C3AED] shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                <strong className="text-[#6D28D9] block mb-0.5">AI Clinical Synthesis</strong>
                {selectedTest.aiClinicalNote}
              </div>
            </div>

            {/* Biomarker Breakdown Table */}
            <div className="overflow-x-auto border border-slate-200/80 rounded-2xl">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200/80">
                    <th className="py-3 px-4">Biomarker</th>
                    <th className="py-3 px-4">Result</th>
                    <th className="py-3 px-4">Reference Interval</th>
                    <th className="py-3 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selectedTest.biomarkers.map((bm, i) => (
                    <tr key={i} className="hover:bg-slate-50/70">
                      <td className="py-3 px-4 font-semibold text-slate-800">{bm.name}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {bm.value}{' '}
                        <span className="text-xs font-normal text-slate-500">{bm.unit}</span>
                      </td>
                      <td className="py-3 px-4 text-slate-500 font-mono text-xs">
                        {bm.referenceRange}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            bm.status === 'Normal'
                              ? 'bg-emerald-50 text-emerald-700'
                              : bm.status === 'Critical'
                              ? 'bg-rose-100 text-rose-700'
                              : bm.status === 'Pending'
                              ? 'bg-purple-50 text-purple-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {bm.status === 'Normal' && <CheckCircle2 className="w-3 h-3" />}
                          {(bm.status === 'Elevated' ||
                            bm.status === 'Low' ||
                            bm.status === 'Critical') && <AlertTriangle className="w-3 h-3" />}
                          {bm.status === 'Pending' && <Clock className="w-3 h-3" />}
                          <span>{bm.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  generateLabTestsPdf([selectedTest], patientName, patientId);
                }}
                className="px-4 py-2 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedTest(null)}
                className="px-5 py-2 rounded-full bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs sm:text-sm font-semibold cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 2: ORDER LAB TEST                                      */}
      {/* ============================================================ */}
      {isOrderModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="order-lab-modal-title"
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fade-in"
          onClick={() => setIsOrderModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-white rounded-[24px] shadow-2xl border border-slate-100 p-5 sm:p-6 flex flex-col gap-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#F3E8FF] text-[#6D28D9] flex items-center justify-center">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <h3 id="order-lab-modal-title" className="text-lg font-extrabold text-[#0F172A]">
                  Order Lab Test
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsOrderModalOpen(false)}
                aria-label="Close Order Lab Test modal"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleOrderLabSubmit} className="flex flex-col gap-4 text-xs sm:text-sm">
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-slate-700">Diagnostic Panel</label>
                <select
                  value={orderPanelName}
                  onChange={(e) => setOrderPanelName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  <option value="Comprehensive Metabolic Panel (CMP)">
                    Comprehensive Metabolic Panel (CMP)
                  </option>
                  <option value="Serum Potassium & Electrolyte Follow-up">
                    Serum Potassium &amp; Electrolyte Follow-up
                  </option>
                  <option value="High-Sensitivity CRP & Lipid Subfractions">
                    High-Sensitivity CRP &amp; Lipid Subfractions
                  </option>
                  <option value="Iron, Ferritin & Total Iron Binding Capacity">
                    Iron, Ferritin &amp; Total Iron Binding Capacity
                  </option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-slate-700">Ordering Physician</label>
                <select
                  value={orderDoctor}
                  onChange={(e) => setOrderDoctor(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  <option value="Dr. Patel">Dr. Patel (Internal Medicine)</option>
                  <option value="Dr. Chen">Dr. Sarah Chen (Cardiology)</option>
                  <option value="Dr. Thorne">Dr. Marcus Thorne (Endocrinology)</option>
                  <option value="Dr. Vance">Dr. Elena Vance (Preventive Care)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-slate-700">Preferred Laboratory Facility</label>
                <select
                  value={orderFacility}
                  onChange={(e) => setOrderFacility(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  <option value="Quest Diagnostics">Quest Diagnostics</option>
                  <option value="LabCorp">LabCorp</option>
                  <option value="Mayo Clinic Labs">Mayo Clinic Labs</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsOrderModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  data-testid="confirm-order-lab-button"
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white font-semibold shadow-sm cursor-pointer"
                >
                  Submit Lab Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

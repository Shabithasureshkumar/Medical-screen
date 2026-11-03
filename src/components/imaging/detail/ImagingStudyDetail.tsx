import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Building,
  User,
  FileText,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  CheckCircle2,
  Eye,
  EyeOff
} from 'lucide-react';
import { imagingCardsData, ImagingCardData } from '../../../data/imagingData';
import { AiAnnotationDisclaimerModal } from './AiAnnotationDisclaimerModal';

interface ImagingStudyDetailProps {
  initialStudyId?: string;
  onBackToDashboard: () => void;
  onBackToLanding: () => void;
  onSelectStudy?: (studyId: string) => void;
}

export const ImagingStudyDetail: React.FC<ImagingStudyDetailProps> = ({
  initialStudyId = 'img-3',
  onBackToDashboard,
  onBackToLanding,
  onSelectStudy
}) => {
  const [selectedId, setSelectedId] = useState(initialStudyId);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [showAnnotations, setShowAnnotations] = useState(false);
  const [hasDisclaimerAccepted, setHasDisclaimerAccepted] = useState(false);
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const [isAiSummaryOpen, setIsAiSummaryOpen] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentStudy: ImagingCardData =
    imagingCardsData.find((s) => s.id === selectedId) || imagingCardsData[2];

  const handleStudyChange = (study: ImagingCardData) => {
    setSelectedId(study.id);
    setZoomLevel(100);
    onSelectStudy?.(study.id);
  };

  const handleToggleAnnotations = () => {
    if (!showAnnotations) {
      if (!hasDisclaimerAccepted) {
        setIsDisclaimerOpen(true);
      } else {
        setShowAnnotations(true);
      }
    } else {
      setShowAnnotations(false);
    }
  };

  const handleEnableDisclaimer = () => {
    setHasDisclaimerAccepted(true);
    setIsDisclaimerOpen(false);
    setShowAnnotations(true);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 25, 50));
  };

  const handleResetZoom = () => {
    setZoomLevel(100);
  };

  return (
    <div className="w-full min-h-screen bg-[#F8F9FE] text-[#1E1B4B] pb-16">
      {/* Disclaimer Modal */}
      <AiAnnotationDisclaimerModal
        isOpen={isDisclaimerOpen}
        onCancel={() => setIsDisclaimerOpen(false)}
        onEnable={handleEnableDisclaimer}
      />

      <div className="fluid-page-x pt-[clamp(0.875rem,1.5vw,1.5rem)] flex flex-col fluid-section-gap">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center flex-wrap gap-2 text-xs sm:text-sm text-slate-500 font-medium"
        >
          <button
            type="button"
            onClick={onBackToDashboard}
            className="inline-flex items-center gap-1.5 text-slate-700 hover:text-[#7C3AED] transition-colors focus:outline-none focus:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </button>
          <span className="text-slate-400">/</span>
          <button
            type="button"
            onClick={onBackToLanding}
            className="text-slate-700 hover:text-[#7C3AED] transition-colors focus:outline-none focus:underline"
          >
            Imaging Studies
          </button>
          <span className="text-slate-400">/</span>
          <span className="text-[#7C3AED] font-semibold">{currentStudy.title}</span>
        </nav>

        {/* Main Grid: Left Sidebar (3 studies) | Center (Viewer) | Right (Study info) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
          {/* ============================================================ */}
          {/* LEFT SIDEBAR: Imaging Studies list (~3 cols on lg) */}
          {/* ============================================================ */}
          <aside className="lg:col-span-3 space-y-3">
            <div className="flex items-baseline justify-between">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Imaging Studies
              </h2>
              <span className="text-xs text-slate-500">Sorted by newest first</span>
            </div>

            {/* Studies List */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
              {imagingCardsData.map((study) => {
                const isSelected = study.id === currentStudy.id;
                return (
                  <button
                    key={study.id}
                    type="button"
                    onClick={() => handleStudyChange(study)}
                    className={`w-full text-left rounded-2xl overflow-hidden transition-all duration-200 p-2.5 sm:p-3 flex flex-col gap-2.5 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] ${
                      isSelected
                        ? 'bg-[#FAF5FF] border-2 border-[#7C3AED] shadow-sm'
                        : 'bg-white border border-slate-200 hover:border-slate-300 shadow-xs'
                    }`}
                  >
                    {/* Thumbnail Image */}
                    <div className="relative w-full h-24 rounded-xl overflow-hidden bg-slate-900">
                      <img
                        src={study.imageSrc}
                        alt={study.title}
                        className="w-full h-full object-cover object-center"
                      />
                      <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-black/60 text-white backdrop-blur-xs uppercase tracking-wide">
                        {study.modality || 'Scan'}
                      </span>
                    </div>

                    {/* Title & Metadata */}
                    <div className="space-y-1">
                      <h3
                        className={`text-sm font-bold truncate ${
                          isSelected ? 'text-[#7C3AED]' : 'text-slate-900'
                        }`}
                      >
                        {study.title}
                      </h3>
                      <p className="text-xs text-slate-500 truncate">
                        {study.bodyPart} · {study.date}
                      </p>
                    </div>

                    {/* Status Badge */}
                    <div className="pt-0.5">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {study.status || 'Completed'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* ============================================================ */}
          {/* CENTER: Central Imaging Viewer (~6 cols on lg, flex-1) */}
          {/* ============================================================ */}
          <main className="lg:col-span-6 flex flex-col space-y-3">
            <div
              className={`w-full bg-[#181E29] rounded-2xl overflow-hidden shadow-lg border border-slate-800 transition-all flex flex-col ${
                isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'min-h-[520px] sm:min-h-[600px]'
              }`}
            >
              {/* Viewer Top Toolbar */}
              <div className="px-4 py-2.5 bg-[#1F2937] border-b border-slate-700/60 flex items-center justify-between gap-2 flex-wrap">
                {/* Left: AI Annotations + Investigational Badge */}
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#A78BFA]" />
                  <span className="text-xs font-semibold text-slate-200">AI Annotations</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FEF3C7] text-[#D97706] tracking-wide uppercase">
                    Investigational
                  </span>
                </div>

                {/* Right: Show AI Annotations Toggle Button */}
                <button
                  type="button"
                  onClick={handleToggleAnnotations}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    showAnnotations
                      ? 'bg-[#7C3AED] text-white shadow-xs'
                      : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                  }`}
                  aria-pressed={showAnnotations}
                >
                  {showAnnotations ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Hide AI Annotations</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>Show AI Annotations</span>
                    </>
                  )}
                </button>
              </div>

              {/* Sub-toolbar: Zoom controls, Study label, Fullscreen */}
              <div className="px-4 py-2 bg-[#141B26] border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 gap-2 flex-wrap">
                {/* Zoom controls */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    aria-label="Zoom in"
                    onClick={handleZoomIn}
                    className="p-1 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Zoom out"
                    onClick={handleZoomOut}
                    className="p-1 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="text-[11px] font-mono font-medium px-1.5 text-slate-300">
                    {zoomLevel}%
                  </span>
                  <button
                    type="button"
                    aria-label="Reset zoom"
                    onClick={handleResetZoom}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white text-[11px] transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                </div>

                {/* Center Title */}
                <div className="text-[11px] text-slate-400 font-medium truncate max-w-[200px] sm:max-w-none">
                  {currentStudy.title} - {currentStudy.modality}
                </div>

                {/* Fullscreen Button */}
                <button
                  type="button"
                  aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                  onClick={() => setIsFullscreen((prev) => !prev)}
                  className="p-1 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-4 h-4" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Main Medical Image Canvas Area */}
              <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden p-4 min-h-[440px] sm:min-h-[500px]">
                <div
                  className="relative transition-transform duration-200 origin-center flex items-center justify-center max-w-full max-h-full"
                  style={{ transform: `scale(${zoomLevel / 100})` }}
                >
                  <img
                    src={currentStudy.detailImageSrc || currentStudy.imageSrc}
                    alt={currentStudy.title}
                    className="max-h-[480px] sm:max-h-[540px] w-auto object-contain rounded select-none"
                    draggable={false}
                  />

                  {/* AI Annotation Overlay (When Enabled & available for this study) */}
                  {showAnnotations && currentStudy.hasAiAnnotations && currentStudy.annotation && (
                    <div
                      className="absolute pointer-events-auto transition-all duration-300 animate-fade-in"
                      style={{
                        left: `${currentStudy.annotation.box.xPercent}%`,
                        top: `${currentStudy.annotation.box.yPercent}%`,
                        width: `${currentStudy.annotation.box.widthPercent}%`,
                        height: `${currentStudy.annotation.box.heightPercent}%`
                      }}
                    >
                      {/* Purple pill tag with sparkle icon */}
                      <div className="absolute -top-7 left-0 -translate-y-1 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7C3AED] text-white text-[11px] font-semibold shadow-lg whitespace-nowrap z-10 animate-bounce-subtle">
                        <Sparkles className="w-3 h-3" />
                        <span>{currentStudy.annotation.label}</span>
                      </div>

                      {/* Purple dashed bounding box */}
                      <div className="w-full h-full border-2 border-dashed border-[#7C3AED] bg-[#7C3AED]/15 rounded-lg shadow-[0_0_15px_rgba(124,58,237,0.3)]" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>

          {/* ============================================================ */}
          {/* RIGHT PANEL: Study Info, Radiologist Report, AI Summary (~3 cols on lg) */}
          {/* ============================================================ */}
          <aside className="lg:col-span-3 space-y-4">
            {/* Study Metadata Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {currentStudy.title}
                </h3>
                <div className="mt-2 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{currentStudy.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{currentStudy.facility}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{currentStudy.provider}</span>
                  </div>
                </div>

                <div className="mt-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {currentStudy.status || 'Completed'}
                  </span>
                </div>
              </div>

              {/* Radiologist Report */}
              <div className="pt-3 border-t border-slate-100 space-y-3">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <FileText className="w-4 h-4 text-slate-500" />
                  <h4>Radiologist Report</h4>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    FINDINGS
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {currentStudy.findings}
                  </p>
                </div>

                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    IMPRESSION
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {currentStudy.impression}
                  </p>
                </div>
              </div>

              {/* AI Plain Language Summary (Collapsible Accordion) */}
              <div className="rounded-xl border border-purple-200 bg-[#FAF5FF] overflow-hidden transition-all">
                <button
                  type="button"
                  onClick={() => setIsAiSummaryOpen((prev) => !prev)}
                  className="w-full p-3 flex items-center justify-between gap-2 text-left hover:bg-purple-100/50 transition-colors focus:outline-none"
                  aria-expanded={isAiSummaryOpen}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Sparkles className="w-4 h-4 text-[#7C3AED] shrink-0" />
                    <span className="text-xs font-bold text-slate-900 truncate">
                      AI Plain Language Summary
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[10px] font-semibold text-[#7C3AED] bg-white px-2 py-0.5 rounded-full border border-purple-200">
                      Generated by AI
                    </span>
                    {isAiSummaryOpen ? (
                      <ChevronUp className="w-3.5 h-3.5 text-slate-500" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                    )}
                  </div>
                </button>

                {isAiSummaryOpen && (
                  <div className="px-3 pb-3 pt-1 text-xs text-slate-700 leading-relaxed border-t border-purple-100/80 animate-fade-in">
                    {currentStudy.aiPlainLanguageSummary}
                  </div>
                )}
              </div>

              {/* Compare with Previous Study Card */}
              {currentStudy.comparison && (
                <div className="rounded-xl border border-slate-200 p-3 bg-white hover:border-purple-300 transition-colors space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center text-slate-600">
                        <FileText className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="font-semibold text-slate-900 block">
                          Compare with Previous Study
                        </span>
                        <span className="text-[11px] text-slate-400">
                          Previous: {currentStudy.comparison.studyDate}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>

                  <div className="flex items-start gap-1.5 text-[11px] text-slate-600 pt-1 border-t border-slate-100">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{currentStudy.comparison.note}</span>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

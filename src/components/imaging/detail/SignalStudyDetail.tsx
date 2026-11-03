import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Activity,
  Calendar,
  Building,
  User,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ZoomIn,
  ZoomOut,
  Play,
  Pause,
  SkipBack,
  AlertCircle
} from 'lucide-react';
import { signalStudiesData, SignalStudyData } from '../../../data/imagingData';
import { AiAnnotationDisclaimerModal } from './AiAnnotationDisclaimerModal';

interface SignalStudyDetailProps {
  initialStudyId?: string;
  onBackToDashboard: () => void;
  onBackToLanding: () => void;
  onSelectStudy?: (studyId: string) => void;
}

export const SignalStudyDetail: React.FC<SignalStudyDetailProps> = ({
  initialStudyId = 'sig-2',
  onBackToDashboard,
  onBackToLanding,
  onSelectStudy
}) => {
  const [selectedId, setSelectedId] = useState(initialStudyId);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 2>(1);
  const [windowSpan, setWindowSpan] = useState<'10s' | '30s'>('10s');
  const [zoomLevel, setZoomLevel] = useState(100);
  const [showAnnotations, setShowAnnotations] = useState(false);
  const [hasAcceptedDisclaimer, setHasAcceptedDisclaimer] = useState(false);
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const [isMeasurementsOpen, setIsMeasurementsOpen] = useState(true);
  const [animOffset, setAnimOffset] = useState(0);

  const animRef = useRef<number | null>(null);

  const currentStudy: SignalStudyData =
    signalStudiesData.find((s) => s.id === selectedId) || signalStudiesData[1];

  const isSpirometry = currentStudy.waveformType === 'spirometry';

  const handleStudyChange = (study: SignalStudyData) => {
    setSelectedId(study.id);
    setIsPlaying(false);
    setAnimOffset(0);
    setZoomLevel(100);
    if (!study.hasAiAnnotations) {
      setShowAnnotations(false);
    }
    onSelectStudy?.(study.id);
  };

  const handleToggleAnnotations = () => {
    if (!currentStudy.hasAiAnnotations) return;
    if (!showAnnotations && !hasAcceptedDisclaimer) {
      setIsDisclaimerOpen(true);
      return;
    }
    setShowAnnotations((prev) => !prev);
  };

  const handleConfirmDisclaimer = () => {
    setHasAcceptedDisclaimer(true);
    setIsDisclaimerOpen(false);
    setShowAnnotations(true);
  };

  // Playback animation loop
  useEffect(() => {
    if (!isPlaying) {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      return;
    }

    let lastTime = performance.now();
    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;
      setAnimOffset((prev) => (prev + delta * playbackSpeed * 30) % 200);
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying, playbackSpeed]);

  const handleRewind = () => {
    setAnimOffset(0);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 20, 180));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 20, 60));
  };

  const baseInterval = windowSpan === '30s' ? 45 : 100;
  const beatInterval = baseInterval * (100 / zoomLevel);

  // Compute dynamic PVC beat X position so the annotation pin tracks playback and zoom
  const getPvcBeatX = () => {
    // Anchor PVC to beat index 4 in the visible window
    const targetBeat = windowSpan === '30s' ? 10 : 4;
    const rawX = targetBeat * beatInterval + 50 * (beatInterval / 100) - (animOffset % beatInterval);
    const clampedX = Math.max(120, Math.min(880, rawX));
    return (clampedX / 1000) * 100;
  };

  // Generate ECG Waveform SVG path (for 12-Lead ECG & Holter Monitor)
  const generateEcgPoints = () => {
    const width = 1000;
    const baseHeight = 120; // 0 line
    const points: string[] = [];
    const targetBeat = windowSpan === '30s' ? 10 : 4;

    for (let x = 0; x <= width; x += 2) {
      const shiftedX = x + animOffset;
      const beatIdx = Math.floor(shiftedX / beatInterval);
      const localX = ((shiftedX % beatInterval) / beatInterval) * 100;
      const isPvcBeat = currentStudy.id === 'sig-2' && beatIdx === targetBeat;
      let y = baseHeight;

      if (isPvcBeat) {
        // Premature Ventricular Contraction (wide, bizarre QRS complex + inverted T wave)
        if (localX >= 34 && localX < 46) {
          y -= Math.sin(((localX - 34) / 12) * Math.PI) * 105;
        } else if (localX >= 46 && localX < 58) {
          y += Math.sin(((localX - 46) / 12) * Math.PI) * 32;
        } else if (localX >= 60 && localX < 88) {
          y += Math.sin(((localX - 60) / 28) * Math.PI) * 22;
        }
      } else {
        // Standard P-QRS-T complex
        if (localX >= 20 && localX < 35) {
          y -= Math.sin(((localX - 20) / 15) * Math.PI) * 10;
        } else if (localX >= 42 && localX < 46) {
          y += 8;
        } else if (localX >= 46 && localX < 50) {
          y -= 95;
        } else if (localX >= 50 && localX < 54) {
          y += 20;
        } else if (localX >= 54 && localX < 60) {
          y += 12;
        } else if (localX >= 70 && localX < 95) {
          y -= Math.sin(((localX - 70) / 25) * Math.PI) * 18;
        }
      }

      // Add subtle physiologic baseline wander
      y += Math.sin((x + animOffset) * 0.02) * 1.5;

      points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }

    return points.join(' ');
  };

  // Generate Pulmonary Spirometry Flow-Volume Loop SVG path (for sig-3)
  const generateSpirometryPoints = () => {
    const scale = zoomLevel / 100;
    const centerX = 120;
    const maxVolWidth = Math.min(760, 620 * scale);
    const zeroFlowY = 104; // 0 L/s baseline
    const points: string[] = [];

    // Expiratory limb (0 -> FVC): steep rise to PEF (~8.18 L/s at ~18% volume), then linear decay to FVC (4.52L)
    const steps = 120;
    const phaseProgress = isPlaying ? ((animOffset % 200) / 200) : 1;
    const totalPoints = Math.max(20, Math.floor(steps * 2 * phaseProgress));

    for (let i = 0; i <= Math.min(steps, totalPoints); i++) {
      const vNorm = i / steps; // 0 to 1
      const x = centerX + vNorm * maxVolWidth;
      let flowRatio = 0;
      if (vNorm <= 0.18) {
        // Rapid ascent to Peak Expiratory Flow (PEF)
        flowRatio = Math.sin((vNorm / 0.18) * (Math.PI / 2));
      } else {
        // Effort-independent linear-curvilinear decay to Residual Volume (RV)
        flowRatio = Math.pow(1 - (vNorm - 0.18) / 0.82, 1.15);
      }
      const y = zeroFlowY - flowRatio * 82 * scale;
      points.push(`${x.toFixed(1)},${Math.max(12, y).toFixed(1)}`);
    }

    // Inspiratory limb (FVC -> 0): symmetric U-shaped curve below 0 L/s baseline reaching ~-5.0 L/s
    if (totalPoints > steps) {
      const inspSteps = totalPoints - steps;
      for (let i = 0; i <= inspSteps; i++) {
        const vNorm = 1 - i / steps;
        const x = centerX + vNorm * maxVolWidth;
        const inspRatio = Math.sin(vNorm * Math.PI);
        const y = zeroFlowY + inspRatio * 44 * scale;
        points.push(`${x.toFixed(1)},${Math.min(154, y).toFixed(1)}`);
      }
    }

    return points.join(' ');
  };

  const timeAxisLabels = isSpirometry
    ? ['0.0L', '0.5L', '1.0L', '1.5L', '2.0L', '2.5L', '3.0L', '3.5L', '4.0L', '4.5L', '5.0L']
    : windowSpan === '30s'
    ? ['0s', '3s', '6s', '9s', '12s', '15s', '18s', '21s', '24s', '27s', '30s']
    : ['4s', '5s', '6s', '7s', '8s', '9s', '10s', '11s', '12s', '13s', '14s'];

  return (
    <div className="w-full min-h-screen bg-[#F8F9FE] text-[#1E1B4B] pb-16">
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
            Signal Studies
          </button>
          <span className="text-slate-400">/</span>
          <span className="text-[#7C3AED] font-semibold">{currentStudy.title}</span>
        </nav>

        {/* Main 2-Column Grid: Left Sidebar (Signal Studies) | Right (Study Header + Waveform + Summary + Measurements) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
          {/* ============================================================ */}
          {/* LEFT SIDEBAR: 3 Signal Studies (~3.5 cols on lg) */}
          {/* ============================================================ */}
          <aside className="lg:col-span-3 space-y-3">
            <div className="flex items-baseline justify-between">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Signal Studies
              </h2>
              <span className="text-xs text-slate-500">Sorted by newest first</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
              {signalStudiesData.map((study) => {
                const isSelected = study.id === currentStudy.id;
                return (
                  <button
                    key={study.id}
                    type="button"
                    onClick={() => handleStudyChange(study)}
                    className={`w-full text-left rounded-2xl p-4 transition-all duration-200 flex flex-col justify-between space-y-3 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] ${
                      isSelected
                        ? 'bg-[#FAF5FF] border-2 border-[#7C3AED] shadow-sm'
                        : 'bg-white border border-slate-200 hover:border-slate-300 shadow-xs'
                    }`}
                  >
                    {/* Top Row: Icon + Title + Status badge */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'bg-purple-100 text-[#7C3AED]'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          <Activity className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <h3
                            className={`text-sm font-bold truncate ${
                              isSelected ? 'text-[#7C3AED]' : 'text-slate-900'
                            }`}
                          >
                            {study.title}
                          </h3>
                          <p className="text-xs text-slate-500 truncate">
                            {study.date}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-slate-500">
                      {study.provider}
                    </div>

                    {/* Bottom row: Status badge & Modality pills */}
                    <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                      <span
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold"
                        style={{
                          backgroundColor: `${study.statusDotColor}15`,
                          color: study.statusColor
                        }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: study.statusDotColor }}
                        />
                        {study.statusBadge}
                      </span>

                      <div className="flex items-center gap-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">
                          {study.badgeType}
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-400">
                          {study.waveformType === 'spirometry' ? '12s' : '30s'}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* ============================================================ */}
          {/* MAIN CONTENT: Header Card + Waveform Viewer + AI Summary + Routine Measurements (~9 cols on lg) */}
          {/* ============================================================ */}
          <main className="lg:col-span-9 space-y-4 sm:space-y-5">
            {/* 1. Header Information Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F3E8FF] text-[#7C3AED] flex items-center justify-center shrink-0">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                      {currentStudy.title}
                    </h1>
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                        currentStudy.statusBadge === 'Normal'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          currentStudy.statusBadge === 'Normal' ? 'bg-emerald-500' : 'bg-amber-500'
                        }`}
                      />
                      {currentStudy.statusBadge}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                      {currentStudy.badgeType}
                    </span>
                  </div>

                  {/* Metadata Grid */}
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>Date: <strong className="text-slate-800 font-semibold">{currentStudy.date}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>Facility: <strong className="text-slate-800 font-semibold">{currentStudy.facility}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>Provider: <strong className="text-slate-800 font-semibold">{currentStudy.provider}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="w-3.5 h-3.5 text-[#7C3AED] shrink-0" />
                      <span className="text-[#7C3AED] font-semibold">{currentStudy.recordingInfo}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Waveform Viewer Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
              {/* Controls Toolbar */}
              <div className="flex items-center justify-between gap-3 flex-wrap border-b border-slate-100 pb-3">
                {/* Left Controls: Zoom, Window, Playback, Speed */}
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  {/* Zoom in/out */}
                  <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg p-0.5">
                    <button
                      type="button"
                      aria-label="Zoom in waveform"
                      onClick={handleZoomIn}
                      className="p-1 hover:bg-white rounded text-slate-600 hover:text-slate-900 transition-colors"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      aria-label="Zoom out waveform"
                      onClick={handleZoomOut}
                      className="p-1 hover:bg-white rounded text-slate-600 hover:text-slate-900 transition-colors"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Window Dropdown */}
                  <div className="relative">
                    <select
                      aria-label="Waveform time window"
                      value={windowSpan}
                      onChange={(e) => setWindowSpan(e.target.value as '10s' | '30s')}
                      className="text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 appearance-none pr-7 cursor-pointer hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                      <option value="10s">10s window</option>
                      <option value="30s">30s window</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
                  </div>

                  {/* Playback Controls */}
                  <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg p-0.5">
                    <button
                      type="button"
                      aria-label="Rewind to start"
                      onClick={handleRewind}
                      className="p-1.5 hover:bg-white rounded text-slate-600 hover:text-slate-900 transition-colors"
                    >
                      <SkipBack className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      aria-label={isPlaying ? 'Pause telemetry playback' : 'Play telemetry playback'}
                      onClick={() => setIsPlaying((prev) => !prev)}
                      className={`p-1.5 rounded transition-colors ${
                        isPlaying
                          ? 'bg-[#7C3AED] text-white'
                          : 'hover:bg-white text-slate-700'
                      }`}
                    >
                      {isPlaying ? (
                        <Pause className="w-3.5 h-3.5" />
                      ) : (
                        <Play className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Speed Controls: 1x / 2x */}
                  <div className="flex items-center bg-slate-100 rounded-lg p-0.5 text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setPlaybackSpeed(1)}
                      className={`px-2 py-1 rounded-md transition-colors ${
                        playbackSpeed === 1
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      1x
                    </button>
                    <button
                      type="button"
                      onClick={() => setPlaybackSpeed(2)}
                      className={`px-2 py-1 rounded-md transition-colors ${
                        playbackSpeed === 2
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      2x
                    </button>
                  </div>
                </div>

                {/* Right: AI Annotations Toggle Button */}
                <button
                  type="button"
                  onClick={handleToggleAnnotations}
                  disabled={!currentStudy.hasAiAnnotations}
                  title={
                    currentStudy.hasAiAnnotations
                      ? 'Toggle AI signal annotations'
                      : 'No AI annotations available for this study'
                  }
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    !currentStudy.hasAiAnnotations
                      ? 'bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed opacity-70'
                      : showAnnotations
                      ? 'bg-[#7C3AED] text-white shadow-xs cursor-pointer'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer'
                  }`}
                  aria-pressed={showAnnotations && currentStudy.hasAiAnnotations}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Annotations</span>
                </button>
              </div>

              {/* Waveform Visualization Chart */}
              <div className="relative w-full border border-slate-200 rounded-xl bg-[#FAFAFC] overflow-hidden p-2 sm:p-4">
                {/* SVG Medical Grid & Signal */}
                <div className="relative w-full h-48 sm:h-56">
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 1000 160"
                    preserveAspectRatio="none"
                    aria-label={isSpirometry ? 'Pulmonary Flow-Volume Loop chart' : 'Continuous waveform chart'}
                  >
                    <defs>
                      {/* Minor Medical Grid */}
                      <pattern id="ecg-minor" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#F1F5F9" strokeWidth="1" />
                      </pattern>
                      {/* Major Medical Grid */}
                      <pattern id="ecg-major" width="100" height="40" patternUnits="userSpaceOnUse">
                        <rect width="100" height="40" fill="url(#ecg-minor)" />
                        <path d="M 100 0 L 0 0 0 40" fill="none" stroke="#E2E8F0" strokeWidth="1.2" />
                      </pattern>
                    </defs>

                    {/* Background Grid */}
                    <rect width="100%" height="100%" fill="url(#ecg-major)" />

                    {/* Zero-flow reference line for Spirometry */}
                    {isSpirometry && (
                      <line
                        x1="40"
                        y1="104"
                        x2="980"
                        y2="104"
                        stroke="#94A3B8"
                        strokeWidth="1.2"
                        strokeDasharray="4 4"
                      />
                    )}

                    {/* Y-axis ticks and labels */}
                    {isSpirometry ? (
                      <g className="text-[9px] fill-slate-400 select-none font-mono">
                        <text x="10" y="24">+8.0</text>
                        <text x="10" y="44">+6.0</text>
                        <text x="10" y="64">+4.0</text>
                        <text x="10" y="84">+2.0</text>
                        <text x="10" y="104">0.0</text>
                        <text x="10" y="124">-2.0</text>
                        <text x="10" y="144">-4.0</text>
                        <text x="10" y="156">-6.0</text>
                      </g>
                    ) : (
                      <g className="text-[9px] fill-slate-400 select-none font-mono">
                        <text x="10" y="24">1.2</text>
                        <text x="10" y="44">1.0</text>
                        <text x="10" y="64">0.8</text>
                        <text x="10" y="84">0.6</text>
                        <text x="10" y="104">0.4</text>
                        <text x="10" y="124">0.2</text>
                        <text x="10" y="144">0</text>
                        <text x="10" y="156">-0.2</text>
                      </g>
                    )}

                    {/* Waveform Path (Purple) */}
                    <polyline
                      fill={isSpirometry ? 'rgba(124, 58, 237, 0.06)' : 'none'}
                      stroke="#7C3AED"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={isSpirometry ? generateSpirometryPoints() : generateEcgPoints()}
                    />
                  </svg>

                  {/* Y-Axis Label */}
                  <div className="absolute left-1 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-semibold text-slate-400 select-none pointer-events-none">
                    {isSpirometry ? 'Flow (L/s)' : 'Amplitude (mV)'}
                  </div>

                  {/* AI Annotation Marker on PVC Peak (Shown when showAnnotations is true) */}
                  {showAnnotations && currentStudy.hasAiAnnotations && currentStudy.pvcAnnotation && (
                    <div
                      style={{ left: `${getPvcBeatX()}%` }}
                      className="absolute top-[6%] -translate-x-1/2 flex flex-col items-center pointer-events-auto z-10 animate-fade-in transition-[left] duration-75"
                    >
                      {/* Tooltip Card */}
                      <div className="bg-white border border-amber-300 shadow-xl rounded-xl p-2.5 max-w-[220px] text-left text-xs mb-1">
                        <div className="flex items-center gap-1.5 text-amber-600 font-bold mb-0.5">
                          <span className="w-2 h-2 rounded-full bg-amber-500" />
                          <span>{currentStudy.pvcAnnotation.label}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-snug">
                          {currentStudy.pvcAnnotation.description}
                        </p>
                      </div>

                      {/* Orange pin line to waveform */}
                      <div className="w-0.5 h-6 bg-amber-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500 ring-4 ring-amber-200" />
                    </div>
                  )}
                </div>

                {/* X-Axis Labels Row */}
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-200 select-none px-4">
                  {timeAxisLabels.map((label) => (
                    <span key={label}>{label}</span>
                  ))}
                </div>

                {/* Left/Right Range Indicators */}
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1 px-1">
                  <span>{isSpirometry ? 'Volume: 0.0L (TLC)' : windowSpan === '30s' ? '0.0s' : '3.6s'}</span>
                  <span>{isSpirometry ? 'FVC: 4.52L (RV)' : windowSpan === '30s' ? '30.0s' : '14.0s'}</span>
                </div>
              </div>

              {/* AI Signal Annotation Legend (Shown when showAnnotations is active) */}
              {showAnnotations && currentStudy.hasAiAnnotations && (
                <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-xl p-3 sm:p-4 space-y-2 animate-fade-in">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                      <span className="text-xs font-bold text-amber-900">
                        AI Signal Annotation Legend
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-200 text-amber-900 uppercase">
                      Investigational
                    </span>
                  </div>
                  <div className="flex items-center gap-2 pt-0.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="text-xs font-semibold text-amber-900">
                      Isolated PVC ({currentStudy.pvcAnnotation?.count || 14} total detected)
                    </span>
                  </div>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    AI-detected signal anomalies are experimental and intended to assist clinical review. Always
                    review full telemetry recordings with a board-certified cardiologist.
                  </p>
                </div>
              )}
            </div>

            {/* 3. AI Signal Summary Card */}
            <div className="rounded-2xl border border-purple-200 bg-[#FAF5FF] p-4 sm:p-5 space-y-2.5 shadow-xs">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-purple-100 text-[#7C3AED] flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    AI Signal Summary
                  </h3>
                </div>
                <span className="text-[11px] font-semibold text-[#7C3AED] bg-white px-2.5 py-0.5 rounded-full border border-purple-200 shadow-2xs">
                  Generated by AI
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {currentStudy.aiSummary}
              </p>

              {currentStudy.aiSummaryDisclaimer && (
                <p className="text-xs text-[#7C3AED] italic font-medium pt-1">
                  {currentStudy.aiSummaryDisclaimer}
                </p>
              )}
            </div>

            {/* 4. Routine Measurements Expandable Table */}
            {currentStudy.routineMeasurements && (
              <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#7C3AED] flex items-center justify-center">
                      <AlertCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        Routine Measurements
                      </h3>
                      <p className="text-xs text-slate-500">
                        {currentStudy.routineMeasurements.length} parameters measured
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    aria-label={isMeasurementsOpen ? 'Collapse routine measurements' : 'Expand routine measurements'}
                    onClick={() => setIsMeasurementsOpen((prev) => !prev)}
                    className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
                  >
                    {isMeasurementsOpen ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Collapsible Table */}
                {isMeasurementsOpen && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                          <th className="py-2.5 px-2">Parameter</th>
                          <th className="py-2.5 px-2">Value</th>
                          <th className="py-2.5 px-2">Reference Range</th>
                          <th className="py-2.5 px-2 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {currentStudy.routineMeasurements.map((m) => (
                          <tr key={m.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-3 px-2 font-medium text-slate-800">
                              {m.parameter}
                            </td>
                            <td className="py-3 px-2">
                              <span className="font-bold text-slate-900 text-sm">{m.value}</span>{' '}
                              <span className="text-slate-500 text-xs">{m.unit}</span>
                            </td>
                            <td className="py-3 px-2 text-slate-500 font-mono">
                              {m.referenceRange}
                            </td>
                            <td className="py-3 px-2 text-right">
                              <span
                                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                                  m.status === 'Normal'
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                                }`}
                              >
                                <span
                                  className={`w-1.5 h-1.5 rounded-full ${
                                    m.status === 'Normal' ? 'bg-emerald-500' : 'bg-amber-500'
                                  }`}
                                />
                                {m.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>

      <AiAnnotationDisclaimerModal
        isOpen={isDisclaimerOpen}
        onCancel={() => setIsDisclaimerOpen(false)}
        onEnable={handleConfirmDisclaimer}
      />
    </div>
  );
};

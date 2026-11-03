import React, { useEffect, useRef } from 'react';
import { X, Apple, Wheat, Droplets, Ban, Info, CheckCircle2 } from 'lucide-react';

interface HeartHealthyDietsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HeartHealthyDietsModal: React.FC<HeartHealthyDietsModalProps> = ({
  isOpen,
  onClose
}) => {
  const modalContentRef = useRef<HTMLDivElement>(null);

  // Close on ESC & lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="heart-healthy-diets-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
    >
      {/* Blurred & Dimmed Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-md cursor-pointer transition-opacity"
      />

      {/* Modal Container */}
      <div
        ref={modalContentRef}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-[680px] bg-white rounded-[24px] border border-slate-200 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] flex flex-col max-h-[92vh] overflow-hidden my-auto animate-fade-in"
      >
        {/* Header Section */}
        <div className="bg-[#F8FAFC] border-b border-slate-100 p-4 sm:p-6 sm:pb-5 flex items-start justify-between gap-4 shrink-0">
          <div className="flex items-start gap-3.5 sm:gap-4">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-[12px] bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center text-white shrink-0 shadow-xs">
              <Apple className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex flex-col">
              <h2
                id="heart-healthy-diets-title"
                className="text-lg sm:text-xl font-bold text-[#1E1B4B] tracking-tight leading-snug font-inter"
              >
                Suggested Heart-Healthy Diets
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mt-0.5">
                Evidence-based nutritional adjustments aligned with your lipid panel (LDL: 135 mg/dL · HDL: 55 mg/dL).
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#10B981]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-5 text-slate-700 text-sm no-scrollbar">
          {/* Section 1: High-Fiber Foods */}
          <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/40 p-4 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Wheat className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#1E1B4B]">High-Fiber Foods</h3>
                <p className="text-xs text-emerald-800">
                  Soluble fiber acts like a sponge, binding to cholesterol particles in the digestive tract to carry them out.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {[
                { item: 'Oats & Oat Bran', detail: 'Contains beta-glucan which directly reduces LDL reabsorption.' },
                { item: 'Beans (Kidney, Black, Navy)', detail: 'Rich in viscous fiber and plant-based protein.' },
                { item: 'Lentils & Chickpeas', detail: 'Stabilizes blood glucose while supporting healthy cholesterol clearance.' },
                { item: 'Leafy & Cruciferous Vegetables', detail: 'Broccoli, Brussels sprouts, spinach, and carrots.' },
                { item: 'Whole Grains', detail: 'Barley, quinoa, brown rice, and whole wheat breads.' },
                { item: 'Pectins (Apples, Berries)', detail: 'High antioxidant fruits rich in soluble dietary fiber.' }
              ].map((food, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-white border border-emerald-100/90 flex items-start gap-2 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-[#1E1B4B] block">{food.item}</span>
                    <span className="text-[11px] text-slate-500 leading-tight block">{food.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Heart-Healthy Fats */}
          <div className="rounded-2xl border border-indigo-200/80 bg-indigo-50/40 p-4 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                <Droplets className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#1E1B4B]">Heart-Healthy Fats</h3>
                <p className="text-xs text-indigo-800">
                  Replace saturated fats with unsaturated fats to help maintain and support protective HDL (55 mg/dL).
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {[
                { item: 'Nuts (Walnuts, Almonds)', detail: 'Rich in plant sterols, omega-3s, and L-arginine.' },
                { item: 'Seeds (Chia, Flaxseed)', detail: 'Packed with alpha-linolenic acid (ALA) for cardiovascular health.' },
                { item: 'Extra Virgin Olive Oil', detail: 'Contains polyphenol antioxidants and monounsaturated oleic acid.' },
                { item: 'Avocado', detail: 'Provides heart-healthy fats alongside substantial dietary fiber.' }
              ].map((fat, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-white border border-indigo-100/90 flex items-start gap-2 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-[#1E1B4B] block">{fat.item}</span>
                    <span className="text-[11px] text-slate-500 leading-tight block">{fat.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Foods to Limit */}
          <div className="rounded-2xl border border-rose-200/80 bg-rose-50/40 p-4 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                <Ban className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#1E1B4B]">Foods to Limit</h3>
                <p className="text-xs text-rose-800">
                  Reducing intake of these items directly decreases LDL production and arterial plaque accumulation.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {[
                { item: 'Foods High in Saturated Fat', detail: 'Fatty cuts of red meat, full-fat dairy, butter, and tropical oils.' },
                { item: 'Highly Processed Foods', detail: 'Commercial pastries, packaged snacks, and fried fast foods with trans fats.' }
              ].map((limit, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-white border border-rose-100/90 flex items-start gap-2 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                  <div>
                    <span className="text-xs font-semibold text-[#1E1B4B] block">{limit.item}</span>
                    <span className="text-[11px] text-slate-500 leading-tight block">{limit.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contextual Educational Notice */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-600">
            <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <span className="font-semibold text-slate-700">Notice:</span> These suggestions are general educational guidance based on your current lipid results. Do not consider this a medical prescription or substitute for individualized dietary counseling from your healthcare provider.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-[#F8FAFC] border-t border-slate-100 p-4 sm:p-5 flex items-center justify-end gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs sm:text-sm font-semibold transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

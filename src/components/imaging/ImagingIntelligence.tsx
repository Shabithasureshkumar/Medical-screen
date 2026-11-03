import React from 'react';
import { Eye, Sparkles, ArrowRight } from 'lucide-react';
import { imagingCardsData, ImagingCardData } from '../../data/imagingData';

interface ImagingIntelligenceProps {
  onSelectCard?: (card: ImagingCardData) => void;
}

export const ImagingIntelligence: React.FC<ImagingIntelligenceProps> = ({ onSelectCard }) => {
  return (
    <section className="w-full space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#F5F3FF] border border-[#7B61FF]/20 flex items-center justify-center text-[#6B38D4]">
            <Eye className="w-4 h-4" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-[#1E1B4B]">
            Imaging Intelligence
          </h3>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#7B61FF]/10 border border-[#7B61FF]/20 self-start sm:self-auto">
          <Sparkles className="w-3.5 h-3.5 text-[#7B61FF]" />
          <span className="text-xs font-semibold text-[#7B61FF]">
            AI Imaging Intelligence Active
          </span>
        </div>
      </div>

      {/* 3 Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {imagingCardsData.map((card) => (
          <div
            key={card.id}
            role="button"
            tabIndex={0}
            onClick={() => onSelectCard?.(card)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectCard?.(card);
              }
            }}
            aria-label={`Open detailed report for ${card.title}`}
            className="group bg-white/70 backdrop-blur-md rounded-2xl border border-[#7B61FF]/20 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col min-w-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#7B61FF]"
          >
            {/* Image Container with Badge */}
            <div className="relative w-full h-44 bg-slate-900 overflow-hidden">
              <img
                src={card.imageSrc}
                alt={card.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

              {/* Status Badge */}
              <div className="absolute top-3 right-3">
                <span
                  className="px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider text-white shadow-sm uppercase backdrop-blur-sm"
                  style={{ backgroundColor: card.badgeBg }}
                >
                  {card.badge}
                </span>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <span
                  className="text-[11px] font-bold tracking-wider uppercase block"
                  style={{ color: card.categoryColor }}
                >
                  {card.category}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-[#1E1B4B]">
                  {card.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Action Link */}
              <div className="pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCard?.(card);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold hover:gap-2 transition-all"
                  style={{ color: card.ctaColor }}
                >
                  <span>{card.ctaText.replace('→', '').trim()}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

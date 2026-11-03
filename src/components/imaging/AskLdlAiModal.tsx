import React, { useEffect, useRef, useState } from 'react';
import { X, Sparkles, Send, Info } from 'lucide-react';

interface AskLdlAiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AskLdlAiModal: React.FC<AskLdlAiModalProps> = ({ isOpen, onClose }) => {
  const modalContentRef = useRef<HTMLDivElement>(null);
  const [question, setQuestion] = useState('');
  const [conversation, setConversation] = useState<Array<{ role: 'user' | 'ai'; text: string }>>([]);

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

  const handleAsk = (queryText?: string) => {
    const textToSend = queryText || question;
    if (!textToSend.trim()) return;

    const userMessage = textToSend.trim();
    setConversation((prev) => [
      ...prev,
      { role: 'user', text: userMessage },
      {
        role: 'ai',
        text: `Based on your latest lipid profile (May 25, 2026), your LDL is 135 mg/dL (target < 100 mg/dL). Increasing viscous soluble fiber (such as oatmeal, beans, and chia seeds) can lower LDL by 5–10% over 6 to 12 weeks. Maintain your healthy HDL level (55 mg/dL) through regular aerobic activity. Please consult Dr. Sarah Jenkins before making changes to any prescribed treatments.`
      }
    ]);
    setQuestion('');
  };

  const sampleQuestions = [
    'How quickly can dietary changes reduce LDL?',
    'What is the difference between LDL and HDL?',
    'Should I discuss medication adjustments with my doctor?'
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ask-ldl-modal-title"
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
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-[12px] bg-gradient-to-br from-[#BC9CFF] to-[#5C24FF] flex items-center justify-center text-white shrink-0 shadow-xs">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex flex-col">
              <h2
                id="ask-ldl-modal-title"
                className="text-lg sm:text-xl font-bold text-[#1E1B4B] tracking-tight leading-snug font-inter"
              >
                Ask HealthBridge AI about LDL
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mt-0.5">
                Clinical context and insights for your recent LDL-C result of 135 mg/dL.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#7B61FF]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-slate-700 text-sm no-scrollbar">
          {/* Diagnostic Context Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-rose-50/80 border border-rose-200 flex flex-col justify-between">
              <span className="text-[11px] font-semibold text-rose-700 uppercase tracking-wider">
                Current LDL-C
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-bold text-rose-600 font-inter">135</span>
                <span className="text-xs text-rose-500 font-medium">mg/dL</span>
              </div>
              <span className="text-[11px] text-rose-600/90 font-medium mt-0.5">Above Target Range</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                Reference Target
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-bold text-[#1E1B4B] font-inter">&lt; 100</span>
                <span className="text-xs text-slate-500 font-medium">mg/dL</span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium mt-0.5">Optimal Healthy Threshold</span>
            </div>

            <div className="p-3 rounded-xl bg-purple-50/80 border border-[#E9D5FF] flex flex-col justify-between">
              <span className="text-[11px] font-semibold text-[#6B38D4] uppercase tracking-wider">
                12-Month Trend
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-bold text-[#6B38D4] font-inter">+25</span>
                <span className="text-xs text-[#6B38D4] font-medium">points</span>
              </div>
              <span className="text-[11px] text-[#6B38D4]/90 font-medium mt-0.5">+22% rise since Jun &apos;25</span>
            </div>
          </div>

          {/* Clinical Analogy & Explanation */}
          <div className="p-4 rounded-xl bg-[#FAF5FF] border border-[#E9D5FF] space-y-2.5">
            <div className="flex items-center gap-2 text-[#6B38D4] font-semibold text-xs uppercase tracking-wide">
              <Sparkles className="w-4 h-4" />
              <span>AI Clinical Interpretation</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Think of your arteries like water pipes. Your{' '}
              <span className="text-[#6B38D4] font-semibold">LDL (bad cholesterol) of 135</span> is
              like having{' '}
              <span className="text-[#6B38D4] font-semibold italic">&ldquo;sticky clutter in a pipe&rdquo;</span>
              —it is starting to accumulate, which makes it harder for blood to flow smoothly over time.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              While your &ldquo;pipe-clearing&rdquo; HDL (good cholesterol) is healthy at 55 mg/dL, the total amount of circulating LDL has risen by 5.5% (7 points) since January 2026. Targeted dietary adjustments focusing on soluble fiber and heart-healthy unsaturated fats can help clear excess particles.
            </p>
          </div>

          {/* Dynamic Follow-up Conversation Area */}
          {conversation.length > 0 && (
            <div className="space-y-3 pt-1">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                Follow-up Discussion
              </span>
              {conversation.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl text-xs sm:text-sm ${
                    msg.role === 'user'
                      ? 'bg-slate-100 text-slate-900 ml-6 sm:ml-12 border border-slate-200/80 font-medium'
                      : 'bg-[#F5F3FF] text-[#1E1B4B] mr-6 sm:mr-12 border border-[#E9D5FF] leading-relaxed'
                  }`}
                >
                  <span className="text-[11px] font-bold text-slate-400 block mb-1">
                    {msg.role === 'user' ? 'You asked:' : 'HealthBridge AI:'}
                  </span>
                  {msg.text}
                </div>
              ))}
            </div>
          )}

          {/* Sample Prompts */}
          <div className="space-y-2 pt-1">
            <span className="text-xs font-semibold text-slate-500 block">
              Suggested questions to explore:
            </span>
            <div className="flex flex-wrap gap-2">
              {sampleQuestions.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleAsk(q)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-[#FAF5FF] hover:text-[#6B38D4] text-slate-700 border border-slate-200/60 transition-colors text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#7B61FF]"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Question Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAsk();
            }}
            className="flex items-center gap-2 pt-2"
          >
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a question about your LDL reading..."
              aria-label="Ask a question about your LDL reading"
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all bg-white"
            />
            <button
              type="submit"
              disabled={!question.trim()}
              aria-label="Send question"
              className="px-4 py-2.5 rounded-xl bg-[#6366F1] hover:bg-[#4F46E5] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ask</span>
            </button>
          </form>

          {/* Safe Educational Note */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-500">
            <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <span className="font-semibold text-slate-700">Educational Notice:</span> HealthBridge AI responses are generated locally from your verified laboratory diagnostics. They do not constitute medical diagnosis or therapy prescription.
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

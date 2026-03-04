import { ArrowLeft, CheckCircle2, ChevronRight } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../../hooks/quiz/quizQuestions.js';

export const QuizSummary = ({ answers, handleSummaryBack, confirmFinalResults }) => (
  <div className="flex flex-col h-full justify-start min-[376px]:justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">

    <div className="flex flex-col max-h-full">

      <div className="text-center mb-6 relative shrink-0">
        <button onClick={handleSummaryBack} className="absolute left-0 top-0 p-2 text-slate-400 hover:text-brand transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-2">
          <CheckCircle2 className="text-green-500" size={24} />
        </div>
        <h2 className="text-xl font-black text-slate-800">Review Profile</h2>
      </div>

      {/* Scrollable Area - height is constrained to allow centering on small screens */}
      <div className="flex-1 overflow-y-auto max-h-[50vh] min-[376px]:max-h-full space-y-3 pr-1 mb-6 custom-scrollbar">
        {QUIZ_QUESTIONS.map((q, idx) => (
          <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-300">
            <p className="text-[11px] font-bold text-slate-500 mb-1 italic">"{q.id}. {q.question}"</p>
            <p className="text-sm font-black text-brand">{answers[idx]?.label || "Skipped"}</p>
          </div>
        ))}
      </div>

      <button
        onClick={confirmFinalResults}
        className="w-full bg-slate-900 text-white rounded-xl py-4 font-black text-[10px] min-[376px]:text-[12px] uppercase tracking-widest shadow-xl active:scale-95 transition-transform flex items-center justify-center gap-2 shrink-0 mb-4 min-[376px]:mb-0"
      >
        Confirm & Analyze <ChevronRight size={18} />
      </button>

    </div>
  </div>
);
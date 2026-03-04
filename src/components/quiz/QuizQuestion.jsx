import { ChevronRight } from 'lucide-react';

export const QuizQuestion = ({ question, options, handleAnswer }) => (
  <div className="flex flex-col flex-1 mt-4">
    <div className="min-h-[80px] mb-2">
      <h2 className="text-xl font-black text-slate-800 text-left leading-tight">
        {question}
      </h2>
    </div>

    <div className="space-y-3 overflow-hidden">
      {options?.map((option, idx) => (
        <button
          key={idx}
          onClick={() => handleAnswer(option)}
          className="w-full flex items-center justify-between p-4 rounded-2xl border-2 border-slate-200 hover:border-brand hover:bg-brand/5 group transition-all"
        >
          <span className="font-bold text-sm text-slate-600 group-hover:text-brand">
            {option.label}
          </span>
          <ChevronRight className="text-slate-300 group-hover:text-brand" size={20} />
        </button>
      ))}
    </div>
  </div>
);
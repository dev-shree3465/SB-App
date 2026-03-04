import { ArrowLeft } from 'lucide-react';

export const QuizHeader = ({ currentStep, progress, handleBack }) => (
  <div className="h-[60px] flex flex-col justify-center shrink-0">
    <div className="flex justify-between items-center mb-2">
      <div className="flex items-center gap-2">
        {currentStep > 0 ? (
          <button onClick={handleBack} className="p-1.5 text-slate-400 hover:text-brand transition-colors">
            <ArrowLeft size={20} />
          </button>
        ) : (
          <div className="w-[32px]" />
        )}
        <span className="text-[10px] font-black text-brand uppercase tracking-widest">
          Step {currentStep + 1} of 7
        </span>
      </div>
      <span className="text-[10px] font-black text-slate-300">{Math.round(progress)}%</span>
    </div>
    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
      <div className="h-full bg-brand transition-all duration-700" style={{ width: `${progress}%` }} />
    </div>
  </div>
);
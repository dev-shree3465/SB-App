import { ChevronRight, Sparkles } from 'lucide-react';
import { useSkinQuiz, QUIZ_QUESTIONS } from '../../hooks/quiz/useSkinQuiz';
import { AgeStep } from './AgeStep';

export const SkinQuiz = ({ onComplete, initialAge }) => {
  const {
    birthDate, setBirthDate,
    showAgeStep, setShowAgeStep,
    currentStep,
    handleAnswer,
    progress
  } = useSkinQuiz(onComplete, initialAge);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-50/50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white p-6 md:p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 animate-in zoom-in duration-300">
        
        {showAgeStep ? (
          <AgeStep 
            birthDate={birthDate} 
            setBirthDate={setBirthDate} 
            onSubmit={() => setShowAgeStep(false)} 
          />
        ) : (
          <>
            <div className="mb-6">
              <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] font-black text-brand uppercase tracking-widest">Step {currentStep + 1} of 7</span>
                <span className="text-[10px] font-black text-slate-300">{Math.round(progress)}%</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-brand transition-all duration-700 ease-out" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <h2 className="text-lg md:text-xl font-black text-slate-800 leading-snug mb-6 min-h-[3rem]">
              {QUIZ_QUESTIONS[currentStep].question}
            </h2>

            <div className="space-y-2.5">
              {QUIZ_QUESTIONS[currentStep].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  className="w-full flex items-center justify-between p-4 md:p-5 rounded-2xl border-2 border-slate-50 hover:border-brand hover:bg-brand/5 transition-all group text-left"
                >
                  <span className="font-bold text-sm text-slate-600 group-hover:text-brand">{option.label}</span>
                  <ChevronRight className="text-slate-200 group-hover:text-brand transition-all" size={18} />
                </button>
              ))}
            </div>
          </>
        )}

        <div className="mt-8 p-4 bg-slate-50 rounded-[1.5rem] flex items-start gap-4">
          <Sparkles className="text-brand shrink-0" size={16} />
          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider leading-relaxed">
            Personalized safety analysis based on your age and skin type.
          </p>
        </div>
      </div>
    </div>
  );
};
import { Sparkles } from 'lucide-react';
import { useQuiz } from '../hooks/quiz/useQuiz.js';
import { QUIZ_QUESTIONS } from '../hooks/quiz/quizQuestions.js';
import { AgeStep } from '../components/quiz/AgeStep';
import { QuizHeader } from '../components/quiz/QuizHeader';
import { QuizQuestion } from '../components/quiz/QuizQuestion';
import { QuizSummary } from '../components/quiz/QuizSummary';

export const Quiz = ({ core }) => {
  // Check if a user session exists (Reset Mode)
  const isExistingUser = !!core.user;

  // If resetting, pull age from the persistent user object, not the deleted profile
  const initialAge = isExistingUser ? (core.user.age || 0) : null;

  const {
    birthDate, setBirthDate, showAgeStep, setShowAgeStep,
    currentStep, handleAnswer, handleBack, handleSummaryBack, progress,
    validateAndSetAge, showSummary, answers, confirmFinalResults
  } = useQuiz(core, initialAge);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md overflow-hidden touch-none p-0 min-[376px]:p-4">
      <div className="w-full h-full min-[376px]:h-auto min-[376px]:max-w-md bg-white rounded-none min-[376px]:rounded-[2.5rem] shadow-2xl border-slate-100 flex flex-col items-center justify-center overflow-hidden">

        <div className="w-full max-w-[400px] h-full min-[376px]:h-[540px] px-6 pt-16 pb-6 min-[376px]:px-6 min-[376px]:py-4 flex flex-col">

          {showAgeStep ? (
            <div className="flex-1 flex flex-col justify-center">
              <AgeStep
                birthDate={birthDate}
                setBirthDate={setBirthDate}
                validateAndSetAge={validateAndSetAge}
                onSubmit={() => setShowAgeStep(false)}
              />
            </div>
          ) : showSummary ? (
            <QuizSummary answers={answers} handleSummaryBack={handleSummaryBack} confirmFinalResults={confirmFinalResults} />
          ) : (
            <div className="flex flex-col h-full">
              {/* Logic: Disable back button on first question if user is resetting */}
              <QuizHeader
                currentStep={currentStep}
                progress={progress}
                handleBack={(currentStep === 0 && isExistingUser) ? null : handleBack}
              />

              <div className="flex-1 flex flex-col min-h-0">
                <QuizQuestion
                  question={QUIZ_QUESTIONS[currentStep]?.question}
                  options={QUIZ_QUESTIONS[currentStep]?.options}
                  handleAnswer={handleAnswer}
                />
              </div>

              <div className="flex items-center border-t border-slate-50 shrink-0 py-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="text-brand shrink-0" size={16} />
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-tight text-left">
                    Personalized safety analysis based on your age and skin type. Answer Genuinely.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
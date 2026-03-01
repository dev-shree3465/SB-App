import { Calendar, ChevronRight, Sparkles } from 'lucide-react';
import { useState } from 'react';

export const AgeStep = ({ birthDate, setBirthDate, onSubmit }) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const [calculatedAge, setCalculatedAge] = useState(null);

  const handleAgeCheck = (e) => {
    e.preventDefault();

    // Calculate Age
    const birthYear = new Date(birthDate).getFullYear();
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;

    setCalculatedAge(age);
    setIsConfirming(true);

    // 3 Seconds Delay before moving to Skin Quiz
    setTimeout(() => {
      onSubmit();
    }, 3000);
  };

  if (isConfirming) {
    return (
      <div className="py-12 text-center animate-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-50 text-green-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm">
          <Sparkles size={40} className="animate-pulse" />
        </div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Calibration Complete</p>
        <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight">
          Your age is <span className="text-brand">{calculatedAge}</span>
        </h2>
        <div className="mt-8 flex justify-center gap-1">
          <div className="w-1 h-1 bg-brand rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-1 h-1 bg-brand rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-1 h-1 bg-brand rounded-full animate-bounce"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-2 text-center animate-in fade-in slide-in-from-bottom-4">
      <div className="w-16 h-16 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-slate-100 shadow-sm">
        <Calendar size={32} />
      </div>
      <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight mb-2">When were you born?</h2>
      <p className="text-[10px] font-bold text-slate-400 mb-8 uppercase tracking-widest">To analyze your skin cycle</p>

      <form onSubmit={handleAgeCheck}>
        <input
          required
          type="date"
          max={new Date().toISOString().split("T")[0]}
          className="w-full bg-slate-50 rounded-2xl py-5 px-6 text-center text-xl font-black mb-6 focus:ring-2 focus:ring-slate-900 outline-none transition-all uppercase"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
        <button
          disabled={!birthDate}
          className="w-full bg-slate-900 text-white rounded-2xl py-5 font-black text-xs uppercase shadow-xl disabled:opacity-30 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          Confirm Birth Date <ChevronRight size={16} />
        </button>
      </form>
    </div>
  );
};
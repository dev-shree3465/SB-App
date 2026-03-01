import { Sparkles } from 'lucide-react';

export const SuccessPopup = ({ isOpen, skinType }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
      <div className="bg-white w-full max-w-xs rounded-[2.5rem] p-8 text-center animate-in zoom-in duration-300 shadow-2xl">
        <div className="w-20 h-20 bg-green-50 text-green-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <Sparkles size={40} className="animate-bounce" />
        </div>

        <h2 className="text-xl font-black uppercase tracking-tight text-slate-800">
          Profile Complete!
        </h2>

        <div className="mt-4 p-3 bg-brand/5 border border-brand/20 rounded-2xl">
          <p className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">
            Your Calibrated Type:
          </p>
          <p className="text-2xl font-black text-brand uppercase tracking-tighter">
            {skinType || "Calculating..."}
          </p>
        </div>

        <p className="text-[10px] font-bold text-slate-400 mt-6 uppercase tracking-[0.2em]">
          Finalizing your dashboard...
        </p>
      </div>
    </div>
  );
};
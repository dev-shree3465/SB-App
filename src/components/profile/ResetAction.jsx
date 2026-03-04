import { AlertCircle, RefreshCcw } from 'lucide-react';

export const ResetAction = ({ onReset }) => (
  <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 mt-6">
    <div className="flex items-center gap-2 mb-4">
      <AlertCircle className="text-red-500" size={20} />
      <h3 className="font-black text-sm md:text-base text-slate-800 uppercase tracking-tight">
        Skin Irritant Report
      </h3>
    </div>

    <div className="p-4 md:p-8 bg-red-50 border border-red-100 rounded-[1.5rem] md:rounded-4xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <h4 className="font-black text-base md:text-xl text-red-700 uppercase">Reset Profile?</h4>
          <p className="text-xs md:text-sm text-red-600/80 font-bold mt-1 max-w-xs">
            This will delete your skin calibration and let you retake the quiz.
          </p>
        </div>
        <button
          onClick={onReset}
          className="w-full md:w-auto bg-red-600 text-white px-6 py-4 rounded-2xl font-black text-[10px] md:text-xs flex items-center justify-center gap-2 hover:bg-red-700 active:scale-95 transition-all shadow-lg shadow-red-100 uppercase"
        >
          <RefreshCcw size={14} /> Reset Now
        </button>
      </div>
    </div>
  </div>
);
import { ShieldCheck, AlertCircle, Info, CheckCircle2, Calendar } from 'lucide-react';

export const ResultCard = ({ result, onSave, onClose }) => {
  if (!result) return null;

  const isSafe = result.status === 'GREEN';
  const isWarning = result.status === 'YELLOW';

  return (
    <div
      className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in duration-300 max-h-[90vh] overflow-y-auto mx-auto w-full"
    >
      <div className={`p-6 md:p-8 text-center ${isSafe ? 'bg-green-50' : isWarning ? 'bg-amber-50' : 'bg-red-50'}`}>
        <div className={
          `w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-4xl flex items-center justify-center mx-auto shadow-lg ${isSafe ? 'bg-green-500 shadow-green-100' :
            isWarning ? 'bg-amber-500 shadow-amber-100' : 'bg-red-500 shadow-red-100'
          }`
        }>
          {isSafe ? <ShieldCheck className="text-white" size={window.innerWidth < 768 ? 28 : 40} /> : <AlertCircle className="text-white" size={window.innerWidth < 768 ? 28 : 40} />}
        </div>

        <h2 className={`text-lg md:text-2xl font-black tracking-tighter uppercase ${isSafe ? 'text-green-800' : isWarning ? 'text-amber-800' : 'text-red-800'}`}>
          {result.status} Analysis
        </h2>

        <p className="text-[10px] md:text-sm font-bold opacity-70 mt-1 uppercase tracking-widest truncate px-2">{result.name}</p>
      </div>

      <div className="p-5 md:p-8 space-y-1">
        {/* 1. Ingredient Breakdown Section */}
        <div>
          <h3 className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
            <Info size={12} /> Ingredients
          </h3>
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            {result.ingredients?.map((ing, i) => (
              <span key={i} className="px-3 py-1.5 md:px-4 md:py-2 bg-slate-50 border border-slate-100 rounded-lg md:rounded-xl text-[10px] md:text-xs font-bold text-slate-600">
                {ing}
              </span>
            ))}
          </div>
        </div>

        {/* 2. Expiration Status Section */}
        <div className="pt-4 border-t border-slate-50">
          <h3 className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
            <Calendar size={12} /> Expiration
          </h3>
          <p className={`text-xs md:text-sm font-bold uppercase tracking-tight ${result.expiry?.includes('EXPIRED') ? 'text-red-500' : 'text-slate-600'}`}>
            {result.expiry || "No Date Provided"}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 mt-4 md:mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3.5 md:py-4 rounded-2xl font-black text-slate-500 bg-slate-100 border border-slate-200 hover:bg-slate-200 transition-all uppercase text-[10px] md:text-xs tracking-widest"
          >
            Discard
          </button>
          
          <button
            onClick={() => onSave(result)}
            className={
              `flex-1 px-6 py-3.5 md:py-4 rounded-2xl font-black text-white shadow-lg transition-all hover:scale-[1.02] active:scale-95 uppercase text-[10px] md:text-xs flex items-center justify-center gap-2 tracking-widest ${result.status === 'GREEN' ? 'bg-green-600' : result.status === 'YELLOW' ? 'bg-amber-500' : 'bg-red-600'}`
            }
          >
            <CheckCircle2 size={16} /> Save to Vault
          </button>
        </div>
      </div>
    </div>
  );
};
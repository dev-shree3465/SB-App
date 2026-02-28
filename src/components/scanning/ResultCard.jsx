import { ShieldCheck, AlertCircle, Info, CheckCircle2 } from 'lucide-react';

export const ResultCard = ({ result, onSave, onCancel }) => {
  const isSafe = result.status === 'GREEN';
  const isWarning = result.status === 'YELLOW';

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in duration-300">

      {/* Dynamic Header based on Safety Status */}
      <div className={`p-8 text-center ${isSafe ? 'bg-green-50' : isWarning ? 'bg-amber-50' : 'bg-red-50'
        }`}>
        <div className={`w-20 h-20 rounded-4xl flex items-center justify-center mx-auto mb-4 shadow-lg ${isSafe ? 'bg-green-500 shadow-green-100' : isWarning ? 'bg-amber-500 shadow-amber-100' : 'bg-red-500 shadow-red-100'
          }`}>
          {isSafe ? <ShieldCheck className="text-white" size={40} /> : <AlertCircle className="text-white" size={40} />}
        </div>
        <h2 className={`text-2xl font-black tracking-tighter uppercase ${isSafe ? 'text-green-800' : isWarning ? 'text-amber-800' : 'text-red-800'
          }`}>
          {result.status} Analysis
        </h2>
        <p className="text-sm font-bold opacity-70 mt-1 uppercase tracking-widest">{result.name}</p>
      </div>

      <div className="p-8 space-y-6">
        {/* Ingredient Breakdown Section */}
        <div>
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Info size={14} /> Ingredient Breakdown
          </h3>
          <div className="flex flex-wrap gap-2">
            {result.ingredients?.map((ing, i) => (
              <span key={i} className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-600">
                {ing}
              </span>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex gap-4 pt-4">
          <button
            onClick={onCancel}
            className="flex-1 px-6 py-4 rounded-2xl font-black text-slate-400 hover:bg-slate-50 transition-colors uppercase text-xs"
          >
            Discard
          </button>
          <button
            onClick={() => onSave(result)}
            className={`flex-1 px-6 py-4 rounded-2xl font-black text-white shadow-xl transition-all hover:scale-105 active:scale-95 uppercase text-xs flex items-center justify-center gap-2 ${isSafe ? 'bg-green-600 shadow-green-100' : 'bg-brand shadow-brand'
              }`}
          >
            <CheckCircle2 size={18} /> Save to Vault
          </button>
        </div>
      </div>
    </div>
  );
};
import { AlertTriangle } from 'lucide-react';

export const ExpiryDate = ({ knowExpiry, setKnowExpiry, manualDate, setManualDate, setScanStep, resetScanner }) => {
  return (
    <div className="bg-white p-8 rounded-[3rem] shadow-sm animate-in zoom-in-95">
      <h2 className="text-xl font-black mb-1 text-slate-800 uppercase tracking-tighter italic">Know Expiry Date?</h2>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Check the bottle for a date or PAO symbol</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <button onClick={() => setKnowExpiry('YES')}
          className={`p-6 rounded-3xl border-2 font-black uppercase text-xs transition-all ${knowExpiry === 'YES' ? 'border-green-500 bg-green-500/5 text-green-500' : 'border-slate-50 text-slate-400'}`}>
          Yes, I Have It
        </button>
        <button onClick={() => setKnowExpiry('NO')}
          className={`p-6 rounded-3xl border-2 font-black uppercase text-xs transition-all ${knowExpiry === 'NO' ? 'border-red-500 bg-red-50 text-red-500' : 'border-slate-50 text-slate-400'}`}>
          No, Not Sure
        </button>
      </div>

      {/* Dynamic Content Area (No fixed height to prevent gap issues) */}
      <div className="flex flex-col justify-start">
        {knowExpiry === 'YES' && (
          <div className="animate-in slide-in-from-top-2 w-full">
            <input
              type="date"
              className="w-full p-5 bg-slate-50 rounded-2xl font-black mb-4 outline-none focus:ring-2 focus:ring-brand transition-all uppercase"
              value={manualDate}
              onChange={(e) => setManualDate(e.target.value)}
            />
            <button
              disabled={!manualDate}
              onClick={() => setScanStep('METHOD_SELECT')}
              className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] disabled:opacity-30 transition-all"
            >
              Continue to Scan
            </button>
          </div>
        )}

        {knowExpiry === 'NO' && (
          <div className="p-6 bg-red-50 rounded-3xl animate-in slide-in-from-top-2 w-full flex flex-col gap-4">
            <div className="flex items-center gap-4 text-red-600">
              <AlertTriangle size={20} className="shrink-0" />
              <p className="text-[10px] font-black uppercase leading-relaxed tracking-wider">
                Disclaimer: We cannot verify the expiration. Please use this product with caution.
              </p>
            </div>
            <button
              onClick={() => setScanStep('METHOD_SELECT')}
              className="w-full bg-red-500 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest"
            >
              Yes, Proceed
            </button>
          </div>
        )}
      </div>

      {/* Cancel Button with Dynamic Logic */}
      <button
        onClick={resetScanner}
        className={`w-full mt-6 text-[10px] font-black uppercase tracking-widest transition-colors duration-300 ${!knowExpiry || knowExpiry === 'YES' ? 'text-red-500' : 'text-green-600'
          }`}
      >
        Cancel Analysis
      </button>
    </div>
  );
};
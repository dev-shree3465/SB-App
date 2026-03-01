import { AlertTriangle } from 'lucide-react';

export const ExpiryDate = ({ knowExpiry, setKnowExpiry, manualDate, setManualDate, setScanStep, resetScanner }) => {
  return (
    <div className="bg-white p-8 rounded-[3rem] shadow-sm animate-in zoom-in-95">
      <h2 className="text-xl font-black mb-2 text-slate-800 uppercase tracking-tighter italic">Know Expiry Date?</h2>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8">Check the bottle for a date or PAO symbol</p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <button onClick={() => setKnowExpiry('YES')}
          className={`p-6 rounded-3xl border-2 font-black uppercase text-xs transition-all ${knowExpiry === 'YES' ? 'border-green-500 bg-green-500/5 text-green-500' : 'border-slate-50 text-slate-400'}`}>
          Yes, I Have It
        </button>
        <button onClick={() => setKnowExpiry('NO')}
          className={`p-6 rounded-3xl border-2 font-black uppercase text-xs transition-all ${knowExpiry === 'NO' ? 'border-red-500 bg-red-50 text-red-500' : 'border-slate-50 text-slate-400'}`}>
          No, Not Sure
        </button>
      </div>

      {/* {knowExpiry === 'YES' && (
        <div className="animate-in slide-in-from-top-2">
          <input type="date" className="w-full p-5 bg-slate-50 rounded-2xl font-black mb-6 outline-none focus:ring-2 focus:ring-brand" value={manualDate} onChange={(e) => setManualDate(e.target.value)} />
          <button disabled={!manualDate} onClick={() => setScanStep('METHOD_SELECT')} className="w-full bg-green-500 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] disabled:opacity-30 transition-all">Continue to Scan</button>
        </div>
      )}

      {knowExpiry === 'NO' && (
        <div className="p-6 bg-red-50 rounded-3xl mb-2 animate-in slide-in-from-top-2">
          <div className="flex items-center gap-4 text-red-600 mb-4">
            <AlertTriangle size={20} className="shrink-0" />
            <p className="text-[10px] font-black uppercase leading-relaxed tracking-wider">Disclaimer: We cannot verify the expiration. Please use this product with caution.</p>
          </div>
          <button onClick={() => setScanStep('METHOD_SELECT')} className="w-full bg-red-500 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest">
            Yes, Proceed
          </button>
        </div>
      )} */}

      <div className="max-h-[120px] flex flex-col justify-start">
        {knowExpiry === 'YES' && (
          <div className="animate-in slide-in-from-top-2 w-full">
            <input
              type="date"
              className="w-full p-5 bg-slate-50 rounded-2xl font-black mb-6 outline-none focus:ring-2 focus:ring-brand"
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
          <div className="p-6 bg-red-50 rounded-3xl animate-in slide-in-from-top-2 w-full h-full flex flex-col justify-between">
            <div className="flex items-center gap-4 text-red-600 mb-4">
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

      <button onClick={resetScanner} className={`w-full mt-15 text-[10px] font-black uppercase tracking-widest ${knowExpiry === 'YES' ? 'text-red-500' : 'text-green-500'}`}>Cancel</button>
    </div>
  );
};
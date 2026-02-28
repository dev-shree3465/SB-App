import { Calendar, ChevronRight } from 'lucide-react';

export const AgeStep = ({ birthDate, setBirthDate, onSubmit }) => (
  <div className="py-2 text-center">
    <div className="w-16 h-16 bg-brand/10 text-brand rounded-2xl flex items-center justify-center mx-auto mb-6">
      <Calendar size={32} />
    </div>
    <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight mb-2">When were you born?</h2>
    <p className="text-[10px] font-bold text-slate-400 mb-8 uppercase tracking-widest">To analyze your skin cycle</p>

    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
      <input
        required
        type="date"
        max={new Date().toISOString().split("T")[0]}
        className="w-full bg-slate-50 rounded-2xl py-5 px-6 text-center text-xl font-black mb-6 focus:ring-2 focus:ring-brand outline-none transition-all uppercase"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
      />
      <button disabled={!birthDate} className="w-full bg-slate-900 text-white rounded-2xl py-5 font-black text-xs uppercase shadow-xl disabled:opacity-30 active:scale-95 transition-all">
        Continue <ChevronRight className="inline ml-1" size={16} />
      </button>
    </form>
  </div>
);
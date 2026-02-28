import { Trash2, Calendar, AlertCircle, ShieldCheck, ChevronRight } from 'lucide-react'; // Added ChevronRight

export const ProductTable = ({ products, onDelete, showTitle = true, onNavigate }) => {

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[4rem] border-4 border-dashed border-slate-50 animate-in fade-in zoom-in-95">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
          <ShieldCheck size={40} className="text-slate-200" />
        </div>
        <p className="text-slate-400 font-black uppercase text-xs tracking-[0.3em]">Your Vault is empty</p>
        <span className="text-[10px] text-slate-300 font-bold uppercase mt-2 tracking-widest italic">Scan a product to start building your history</span>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-10">
      {/* 1. Header Logic: Show title only if showTitle is true */}
      {showTitle && (
        <div className="flex items-center justify-between mb-4 px-6">
          <h3 className="text-lg font-black text-slate-800 uppercase tracking-tighter italic">
            Recent Scans
          </h3>

          {/* 2. Chevron Logic: Moved next to the dark header */}
          {onNavigate && (
            <button
              onClick={onNavigate}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors group"
            >
              <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-900" />
            </button>
          )}
        </div>
      )}

      {/* Grid Container for products */}
      <div className="grid gap-4">
        {products.map((p, idx) => (
          <div key={idx} className="bg-white border border-slate-100 p-5 rounded-[2.5rem] flex items-center justify-between hover:shadow-xl transition-all group animate-in slide-in-from-bottom-2">
            <div className="flex items-center gap-5">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${p.status === 'GREEN' ? 'bg-green-50 text-green-500' :
                  p.status === 'YELLOW' ? 'bg-amber-50 text-amber-500' :
                    'bg-red-50 text-red-500'
                }`}>
                {p.status === 'GREEN' ? <ShieldCheck size={24} /> : <AlertCircle size={24} />}
              </div>
              <div className="flex flex-col">
                <h4 className="font-black text-slate-800 text-sm uppercase leading-tight">{p.name}</h4>
                <div className="flex items-center gap-1.5 mt-1 text-slate-400">
                  <Calendar size={10} />
                  <span className="text-[9px] font-black uppercase tracking-wider italic">{p.expiry}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => onDelete(idx)}
              className="p-4 bg-slate-50 text-slate-300 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all active:scale-90 group-hover:opacity-100 opacity-0 sm:opacity-100"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
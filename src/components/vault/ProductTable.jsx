import { Trash2, Calendar, AlertCircle, ShieldCheck } from 'lucide-react';

export const ProductTable = ({ products, onDelete }) => {
  if (products.length === 0) return null;

  return (
    <div className="grid gap-4">
      {products.map((p, idx) => (
        <div key={idx}
          className="bg-white border border-slate-100 p-4 sm:p-5 rounded-[2.5rem] flex items-center justify-between hover:shadow-xl transition-all group animate-in slide-in-from-bottom-2"
        >
          <div className="flex items-center gap-3 sm:gap-5 min-w-0">
            <div
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex-shrink-0 flex items-center justify-center ${p.status === 'GREEN' ? 'bg-green-50 text-green-500' : p.status === 'YELLOW' ? 'bg-amber-50 text-amber-500' : 'bg-red-50 text-red-500'}`}
            >
              {p.status === 'GREEN' ? <ShieldCheck size={20} /> : <AlertCircle size={20} />}
            </div>
            <div className="flex flex-col min-w-0">
              <h4 className="font-black text-slate-800 text-[11px] sm:text-sm uppercase leading-tight truncate">
                {p.name}
              </h4>
              <div className="flex items-center gap-1.5 mt-1 text-slate-400">
                <Calendar size={10} />
                <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider italic">
                  {p.expiry}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onDelete(idx)}
            className="p-3 sm:p-4 bg-red-50 text-red-500 rounded-2xl active:scale-90 flex-shrink-0"
          >
            <Trash2 size={16} md:size={18} />
          </button>
        </div>
      ))}
    </div>
  );
};
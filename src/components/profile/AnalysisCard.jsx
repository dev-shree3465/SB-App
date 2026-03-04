import { ShieldCheck } from 'lucide-react';

export const AnalysisCard = ({ displaySkinType }) => (
  <div>
    <div className="flex items-center gap-2 mb-4 md:mb-6">
      <ShieldCheck className="text-brand" size={20} />
      <h3 className="font-black text-sm md:text-base text-slate-800 uppercase tracking-tight">
        Skin Analysis
      </h3>
    </div>
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100">
      <div className="p-4 md:p-8 bg-brand/5 border-2 border-dashed border-brand/20 rounded-[1.5rem] md:rounded-4xl  text-center">
        <p className="text-[10px] md:text-xs font-black text-brand uppercase tracking-widest mb-1">
          Calibrated Skin Type
        </p>
        <p className="text-2xl md:text-4xl font-black text-brand tracking-tighter uppercase">
          {displaySkinType || "Scanning..."}
        </p>
      </div>
    </div>
  </div>
);
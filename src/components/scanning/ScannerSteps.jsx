import { ScanLine, RefreshCcw, ChevronRight, Camera, Image as ImageIcon } from 'lucide-react';

export const ScannerSteps = ({ scanStep, setScanStep, setScanMethod, skinType }) => {

  // 1. INITIAL CHOICE VIEW
  if (scanStep === 'CHOICE') {
    return (
      <div className="space-y-4 animate-in fade-in">
        <div className="bg-brand/5 p-6 rounded-[2.5rem] mb-6 border border-brand/10">
          <h1 className="text-2xl font-black text-slate-800 uppercase italic">Scan Station</h1>
          <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest leading-relaxed">
            Current Protocol: {typeof skinType === 'object' ? skinType.skinType : skinType} Skin
          </p>
        </div>

        <button onClick={() => setScanStep('METHOD_SELECT')} className="w-full p-8 bg-white border-2 border-slate-300 rounded-[2.5rem] flex items-center justify-between hover:border-brand transition-all group">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-brand/10 rounded-2xl flex items-center justify-center text-brand group-hover:rotate-12 transition-transform"><ScanLine /></div>
            <div className="text-left">
              <h3 className="text-lg font-black uppercase tracking-tighter">Full Analysis</h3>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Ingredients + Expiry</p>
            </div>
          </div>
          <ChevronRight className="text-slate-300" />
        </button>

        <button onClick={() => setScanStep('QUICK_LOG_DATE')} className="w-full p-8 bg-white border-2 border-slate-300 rounded-[2.5rem] flex items-center justify-between hover:border-brand transition-all group">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 group-hover:rotate-12 transition-transform">
              <RefreshCcw />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-black uppercase tracking-tighter">Quick Log</h3>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Manual Expiry Check</p>
            </div>
          </div>
          <ChevronRight className="text-slate-300" />
        </button>
      </div>
    );
  }

  // 2. METHOD SELECTION VIEW
  if (scanStep === 'METHOD_SELECT') {
    return (
      <div className="space-y-4 animate-in zoom-in-95 bg-white p-8 rounded-[3rem]">
        <h2 className="text-xl font-black mb-2 text-slate-800 uppercase tracking-tighter italic">Choose Scan Method</h2>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8">Live camera or gallery upload</p>

        <button onClick={() => { setScanMethod('CAMERA'); setScanStep('SCAN_START'); }} className="w-full p-6 bg-white border-2 border-slate-300 rounded-3xl flex items-center gap-4 text-slate-600 hover:border-brand transition-all">
          <Camera size={20} /> <span className="font-black uppercase text-xs tracking-widest">Live Camera Scan</span>
        </button>

        <button onClick={() => { setScanMethod('UPLOAD'); setScanStep('SCAN_START'); }} className="w-full p-6 bg-white border-2 border-slate-300 rounded-3xl flex items-center gap-4 text-slate-600 hover:border-brand transition-all">
          <ImageIcon size={20} /> <span className="font-black uppercase text-xs tracking-widest">Upload from Gallery</span>
        </button>

        <button onClick={() => setScanStep('CHOICE')} className="w-full mt-4 text-[10px] font-black text-slate-700 tracking-widest">BACK</button>
      </div>
    );
  }

  return null;
};
import { Camera, ShieldCheck, Calendar, RefreshCcw } from 'lucide-react';

export const CameraInterface = ({
  scanStep, scanMethod, capturedImages, handleAction, handleUpload, resetScanner
}) => {

  // 1. PROCESSING VIEW
  if (scanStep === 'PROCESSING') {
    return (
      <div className="text-center py-24 bg-white rounded-[3rem] shadow-sm animate-in fade-in">
        <div className="w-20 h-20 bg-brand/10 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-spin">
          <RefreshCcw className="text-brand" size={40} />
        </div>
        <h2 className="text-xl font-black text-slate-800 uppercase tracking-tighter italic leading-none">Analyzing Safety</h2>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-3 animate-pulse">Checking Molecular Stability...</p>
      </div>
    );
  }

  // 2. MAIN SCANNING VIEW
  const currentType = !capturedImages.front ? 'front' : !capturedImages.back ? 'back' : 'expiry';

  return (
    <div className="bg-white p-8 rounded-[3rem] text-center shadow-sm animate-in fade-in">
      <div className="mb-8">
        <div className="bg-slate-50 h-64 rounded-[2.5rem] flex flex-col items-center justify-center border-2 border-dashed border-slate-200 relative">
          {!capturedImages.front ? (
            <div className="text-center p-6 italic">
              <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center mx-auto mb-4 border border-slate-100">
                <Camera className="text-slate-300" size={32} />
              </div>
              <h4 className="font-black text-slate-800 uppercase text-sm">Snap Front Label</h4>
              <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">Make sure brand name is visible</p>
            </div>
          ) : !capturedImages.back ? (
            <div className="text-center p-6 italic animate-in zoom-in">
              <ShieldCheck className="text-green-500 mx-auto mb-2" size={48} />
              <h4 className="font-black text-slate-800 uppercase text-sm tracking-tighter">Front Label Locked</h4>
              <p className="text-[9px] text-green-600 font-bold uppercase mt-1">Now scan the ingredients list</p>
            </div>
          ) : (
            <div className="text-center p-6 italic animate-in zoom-in">
              <Calendar className="text-blue-500 mx-auto mb-2" size={48} />
              <h4 className="font-black text-slate-800 uppercase text-sm tracking-tighter">Ingredients Locked</h4>
              <p className="text-[9px] text-blue-600 font-bold uppercase mt-1">Final Step: Scan Expiry Date</p>
            </div>
          )}
        </div>
      </div>

      {scanMethod === 'CAMERA' ? (
        <button
          onClick={() => handleAction(currentType)}
          className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-slate-800 active:scale-95 transition-all"
        >
          {currentType === 'front' ? "Capture Front" : currentType === 'back' ? "Capture Back" : "Capture Expiry"}
        </button>
      ) : (
        <label className="block w-full cursor-pointer">
          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUpload(e, currentType)} />
          <div className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-slate-800 transition-all text-center">
            {currentType === 'front' ? "Upload Front" : currentType === 'back' ? "Upload Back" : "Upload Expiry"}
          </div>
        </label>
      )}
      <button onClick={resetScanner} className="mt-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Cancel Analysis</button>
    </div>
  );
};
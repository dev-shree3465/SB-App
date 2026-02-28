// import { useState } from 'react';
// import {
//   Camera, ScanLine, RefreshCcw, Search,
//   ChevronRight, AlertTriangle, X, ShieldCheck, Calendar, Info, Image as ImageIcon
// } from 'lucide-react';
// import { SAFETY_DATABASE } from '../../data/safety_dictionary';

// export const Scanner = ({ onScanComplete, skinType, notify }) => {
//   const [scanStep, setScanStep] = useState('CHOICE');
//   const [scanMethod, setScanMethod] = useState(null);
//   const [capturedImages, setCapturedImages] = useState({ front: null, back: null, expiry: null });
//   // const [searchQuery, setSearchQuery] = useState('');
//   const [manualDate, setManualDate] = useState('');
//   const [knowExpiry, setKnowExpiry] = useState(null);

//   const calculateDaysLeft = (expiryDate) => {
//     if (!expiryDate) return "";
//     const today = new Date();
//     const exp = new Date(expiryDate);
//     today.setHours(0, 0, 0, 0);
//     const diffTime = exp - today;
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     return diffDays >= 0 ? ` (${diffDays} days left)` : ` (EXPIRED)`;
//   };

//   const processFinalResults = (dateStr) => {
//     setScanStep('PROCESSING');

//     const detectedIngredients = ["Fragrance", "Ceramides", "Parabens", "Aqua"];

//     const safetyStatus = SAFETY_DATABASE.getStatus(detectedIngredients, skinType);
//     const daysLeftLabel = dateStr ? calculateDaysLeft(dateStr) : "";

//     setTimeout(() => {
//       onScanComplete({
//         name: "Scanned Product", // Later we will extract this from the front label
//         status: safetyStatus,
//         ingredients: detectedIngredients,
//         expiry: dateStr ? `${dateStr}${daysLeftLabel}` : "No Date Provided",
//       });
//       resetScanner();
//     }, 2000);
//   };

//   const handleAction = (type) => {
//     if (scanMethod === 'CAMERA') {
//       if (type === 'front') {
//         setCapturedImages(prev => ({ ...prev, front: 'dummy' }));
//         notify("Front label captured", "success");
//       } else if (type === 'back') {
//         setCapturedImages(prev => ({ ...prev, back: 'dummy' }));
//         if (knowExpiry === 'NO') {
//           notify("Ingredients captured", "success");
//           processFinalResults(manualDate); // Proceed to logic
//         } else {
//           processFinalResults(manualDate);
//         }
//       } else if (type === 'expiry') {
//         processFinalResults(manualDate);
//       }
//     }
//   };

//   const handleUpload = (e, type) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     if (type === 'front') {
//       setCapturedImages(prev => ({ ...prev, front: file }));
//       notify("Front label uploaded", "success");
//     } else if (type === 'back') {
//       setCapturedImages(prev => ({ ...prev, back: file }));
//       processFinalResults(manualDate);
//     } else if (type === 'expiry') {
//       processFinalResults(manualDate);
//     }
//   };

//   const resetScanner = () => {
//     setScanStep('CHOICE');
//     setScanMethod(null);
//     setManualDate('');
//     setKnowExpiry(null);
//     setCapturedImages({ front: null, back: null, expiry: null });
//   };

//   return (
//     <div className="max-w-2xl mx-auto min-h-[400px] relative px-2">

//       {/* 1. INITIAL CHOICE */}
//       {scanStep === 'CHOICE' && (
//         <div className="space-y-4 animate-in fade-in">
//           <div className="bg-brand/5 p-6 rounded-[2.5rem] mb-6 border border-brand/10">
//             <h1 className="text-2xl font-black text-slate-800 uppercase italic">Scan Station</h1>
//             <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest leading-relaxed">
//               Current Protocol: {typeof skinType === 'object' ? skinType.skinType : skinType} Skin
//             </p>
//           </div>

//           <button onClick={() => setScanStep('METHOD_SELECT')} className="w-full p-8 bg-white border-2 border-slate-300 rounded-[2.5rem] flex items-center justify-between hover:border-brand transition-all group">
//             <div className="flex items-center gap-5">
//               <div className="w-14 h-14 bg-brand/10 rounded-2xl flex items-center justify-center text-brand group-hover:rotate-12 transition-transform"><ScanLine /></div>
//               <div className="text-left"><h3 className="text-lg font-black uppercase tracking-tighter">Full Analysis</h3><p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Ingredients + Expiry</p></div>
//             </div>
//             <ChevronRight className="text-slate-300" />
//           </button>

//           <button onClick={() => setScanStep('QUICK_LOG_DATE')} className="w-full p-8 bg-white border-2 border-slate-300 rounded-[2.5rem] flex items-center justify-between hover:border-brand transition-all group">
//             <div className="flex items-center gap-5">
//               <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 group-hover:rotate-12 transition-transform">
//                 <RefreshCcw />
//               </div>
//               <div className="text-left">
//                 <h3 className="text-lg font-black uppercase tracking-tighter">Quick Log</h3>
//                 <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
//                   Manual Expiry Check
//                 </p>
//               </div>
//             </div>
//             <ChevronRight className="text-slate-300" />
//           </button>
//         </div>
//       )}

//       {/* 1.5 METHOD SELECTION (ONLY FOR FULL ANALYSIS) */}
//       {scanStep === 'METHOD_SELECT' && (
//         <div className="space-y-4 animate-in zoom-in-95 bg-white p-8 rounded-[3rem]">
//           <h2 className="text-xl font-black mb-2 text-slate-800 uppercase tracking-tighter italic">Choose Scan Method</h2>
//           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8">Live camera or gallery upload</p>

//           <button onClick={() => { setScanMethod('CAMERA'); setScanStep('SCAN_START'); }} className="w-full p-6 bg-white border-2 border-slate-300 rounded-3xl flex items-center gap-4 text-slate-600 hover:border-brand transition-all">
//             <Camera size={20} /> <span className="font-black uppercase text-xs tracking-widest">Live Camera Scan</span>
//           </button>

//           <button onClick={() => { setScanMethod('UPLOAD'); setScanStep('SCAN_START'); }} className="w-full p-6 bg-white border-2 border-slate-300 rounded-3xl flex items-center gap-4 text-slate-600 hover:border-brand transition-all">
//             <ImageIcon size={20} /> <span className="font-black uppercase text-xs tracking-widest">Upload from Gallery</span>
//           </button>

//           <button onClick={() => setScanStep('CHOICE')} className="w-full mt-4 text-[10px] font-black text-slate-700 tracking-widest">BACK</button>
//         </div>
//       )}

//       {/* 2. QUICK LOG - EXACT ORIGINAL UI RESTORED */}
//       {scanStep === 'QUICK_LOG_DATE' && (
//         <div className="bg-white p-8 rounded-[3rem] shadow-sm animate-in zoom-in-95">
//           <h2 className="text-xl font-black mb-2 text-slate-800 uppercase tracking-tighter italic">Know Expiry Date?</h2>
//           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8">Check the bottle for a date or PAO symbol</p>

//           <div className="grid grid-cols-2 gap-4 mb-6">
//             <button onClick={() => setKnowExpiry('YES')} className={`p-6 rounded-3xl border-2 font-black uppercase text-xs transition-all ${knowExpiry === 'YES' ? 'border-brand bg-brand/5 text-brand' : 'border-slate-50 text-slate-400'}`}>Yes, I Have It</button>
//             <button onClick={() => setKnowExpiry('NO')} className={`p-6 rounded-3xl border-2 font-black uppercase text-xs transition-all ${knowExpiry === 'NO' ? 'border-red-500 bg-red-50 text-red-500' : 'border-slate-50 text-slate-400'}`}>No, Not Sure</button>
//           </div>

//           {knowExpiry === 'YES' && (
//             <div className="animate-in slide-in-from-top-2">
//               <input type="date" className="w-full p-5 bg-slate-50 rounded-2xl font-black mb-6 outline-none focus:ring-2 focus:ring-brand" value={manualDate} onChange={(e) => setManualDate(e.target.value)} />
//               <button disabled={!manualDate} onClick={() => setScanStep('METHOD_SELECT')} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] disabled:opacity-30 transition-all">Continue to Scan</button>
//             </div>
//           )}

//           {knowExpiry === 'NO' && (
//             <div className="p-6 bg-red-50 rounded-3xl mb-6 animate-in slide-in-from-top-2">
//               <div className="flex gap-3 text-red-600 mb-4">
//                 <AlertTriangle size={20} className="shrink-0" />
//                 <p className="text-[10px] font-black uppercase leading-relaxed tracking-wider">Disclaimer: Without an expiry date, namma product stability-ah verify panna mudiyathu. Risk eduthu scan panna ok-va?</p>
//               </div>
//               <button onClick={() => setScanStep('METHOD_SELECT')} className="w-full bg-red-500 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest">Yes, Proceed</button>
//             </div>
//           )}
//           <button onClick={resetScanner} className="w-full mt-4 text-[10px] font-black text-slate-300 uppercase tracking-widest">Cancel</button>
//         </div>
//       )}

//       {/* 3. MAIN SCANNING FLOW */}
//       {scanStep === 'SCAN_START' && (
//         <div className="bg-white p-8 rounded-[3rem] text-center shadow-sm animate-in fade-in">
//           <div className="mb-8">
//             <div className="bg-slate-50 h-64 rounded-[2.5rem] flex flex-col items-center justify-center border-2 border-dashed border-slate-200 relative">
//               {!capturedImages.front ? (
//                 <div className="text-center p-6 italic">
//                   <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center mx-auto mb-4 border border-slate-100"><Camera className="text-slate-300" size={32} /></div>
//                   <h4 className="font-black text-slate-800 uppercase text-sm">Snap Front Label</h4>
//                   <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">Make sure the brand name is visible</p>
//                 </div>
//               ) : !capturedImages.back ? (
//                 <div className="text-center p-6 italic animate-in zoom-in">
//                   <ShieldCheck className="text-green-500 mx-auto mb-2" size={48} />
//                   <h4 className="font-black text-slate-800 uppercase text-sm tracking-tighter">Front Label Locked</h4>
//                   <p className="text-[9px] text-green-600 font-bold uppercase mt-1">Now scan the ingredients list</p>
//                 </div>
//               ) : (
//                 <div className="text-center p-6 italic animate-in zoom-in">
//                   <Calendar className="text-blue-500 mx-auto mb-2" size={48} />
//                   <h4 className="font-black text-slate-800 uppercase text-sm tracking-tighter">Ingredients Locked</h4>
//                   <p className="text-[9px] text-blue-600 font-bold uppercase mt-1">Final Step: Scan Expiry Date</p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {scanMethod === 'CAMERA' ? (
//             <button
//               onClick={() => handleAction(!capturedImages.front ? 'front' : !capturedImages.back ? 'back' : 'expiry')}
//               className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-slate-800 active:scale-95 transition-all"
//             >
//               {!capturedImages.front ? "Capture Front" : !capturedImages.back ? "Capture Back" : "Capture Expiry"}
//             </button>
//           ) : (
//             <label className="block w-full cursor-pointer">
//               <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUpload(e, !capturedImages.front ? 'front' : !capturedImages.back ? 'back' : 'expiry')} />
//               <div className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-slate-800 transition-all text-center">
//                 {!capturedImages.front ? "Upload Front" : !capturedImages.back ? "Upload Back" : "Upload Expiry"}
//               </div>
//             </label>
//           )}
//           <button onClick={resetScanner} className="mt-6 text-[10px] font-black text-slate-300 uppercase tracking-widest">Cancel Analysis</button>
//         </div>
//       )}

//       {/* 4. PROCESSING VIEW */}
//       {scanStep === 'PROCESSING' && (
//         <div className="text-center py-24 bg-white rounded-[3rem] shadow-sm animate-in fade-in">
//           <div className="w-20 h-20 bg-brand/10 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-spin">
//             <RefreshCcw className="text-brand" size={40} />
//           </div>
//           <h2 className="text-xl font-black text-slate-800 uppercase tracking-tighter italic leading-none">Analyzing Safety</h2>
//           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-3 animate-pulse">Checking Molecular Stability...</p>
//         </div>
//       )}

//     </div>
//   );
// };

import { useScanner } from '../../hooks/scanning/useScanner';
import { ScannerSteps } from './ScannerSteps';
import { ExpiryDate } from './ExpiryDate';
import { CameraInterface } from './CameraInterface';

export const Scanner = ({ onScanComplete, skinType, notify }) => {
  const {
    scanStep, setScanStep,
    scanMethod, setScanMethod,
    capturedImages,
    manualDate, setManualDate,
    knowExpiry, setKnowExpiry,
    handleAction, handleUpload, resetScanner
  } = useScanner(onScanComplete, skinType, notify);

  return (
    <div className="max-w-2xl mx-auto min-h-[400px] relative px-2">

      {/* 1. Initial Choice & Method Selection */}
      {(scanStep === 'CHOICE' || scanStep === 'METHOD_SELECT') && (
        <ScannerSteps
          scanStep={scanStep}
          setScanStep={setScanStep}
          setScanMethod={setScanMethod}
          skinType={skinType}
        />
      )}

      {/* 2. Quick Log / Expiry Logic */}
      {scanStep === 'QUICK_LOG_DATE' && (
        <ExpiryDate
          knowExpiry={knowExpiry}
          setKnowExpiry={setKnowExpiry}
          manualDate={manualDate}
          setManualDate={setManualDate}
          setScanStep={setScanStep}
          resetScanner={resetScanner}
        />
      )}

      {/* 3. Scanning & Processing Interface */}
      {(scanStep === 'SCAN_START' || scanStep === 'PROCESSING') && (
        <CameraInterface
          scanStep={scanStep}
          scanMethod={scanMethod}
          capturedImages={capturedImages}
          handleAction={handleAction}
          handleUpload={handleUpload}
          resetScanner={resetScanner}
        />
      )}

    </div>
  );
};
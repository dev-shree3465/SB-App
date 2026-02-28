import { ShieldCheck, ArrowLeft } from 'lucide-react';

const OTPView = ({ email, otpValue, setOtpValue, onVerify, onBack }) => {
  return (
    <div className="py-4 max-w-[320px] mx-auto animate-in fade-in duration-500">
      <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <ShieldCheck size={32} />
      </div>
      <h2 className="text-xl font-black uppercase tracking-tight">Verify</h2>
      <p className="text-[10px] font-bold text-slate-400 mt-2 mb-8 uppercase tracking-widest">Sent to {email}</p>

      <input
        type="text" maxLength="6" placeholder="123456"
        className="w-full bg-slate-50 rounded-2xl py-5 text-center text-2xl font-black tracking-[0.5em] mb-6 focus:ring-2 focus:ring-brand outline-none border-none"
        value={otpValue}
        onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ''))}
      />

      <button onClick={onVerify} className="w-full bg-brand text-white rounded-2xl py-5 font-black text-xs uppercase shadow-xl shadow-brand/20 active:scale-95 transition-all">
        Verify & Continue
      </button>

      <button onClick={onBack} className="mt-4 text-[10px] font-black text-slate-300 uppercase flex items-center justify-center gap-2 mx-auto">
        <ArrowLeft size={14} /> Change Email
      </button>
    </div>
  );
};

export default OTPView;
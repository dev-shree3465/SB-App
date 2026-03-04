
import { ShieldAlert, X } from 'lucide-react';

export const TwoFAAlert = ({ user, onDismiss, onEnable }) => {
  // Return null if user isn't logged in or 2FA is already on
  if (!user || user.twoFactorEnabled) return null;

  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-[2rem] p-5 sm:p-6 relative overflow-hidden shadow-xl shadow-slate-200">
      {/* Decorative background shield */}
      <ShieldAlert className="absolute -right-4 -bottom-4 text-white/5 w-32 h-32 rotate-12" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-brand/20 rounded-2xl text-brand border border-brand/20">
            <ShieldAlert size={24} />
          </div>
          <div>
            <h4 className="text-sm font-black text-white uppercase tracking-tight italic">Secure Your Account</h4>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Two-Factor Authentication is currently disabled</p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={onEnable}
            className="flex-1 sm:flex-none px-5 py-2.5 bg-brand text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-brand/90 transition-all active:scale-95 shadow-lg shadow-brand/20"
          >
            Enable 2FA Now
          </button>
          <button
            onClick={onDismiss}
            className="p-2.5 bg-white/5 text-slate-400 rounded-xl hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
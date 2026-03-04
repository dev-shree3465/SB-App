
import { ChevronRight, LogIn, UserPlus } from 'lucide-react';

const AuthButtons = ({ isNewUser, handleManualToggle }) => {
  return (
    <div className="mt-5">
      {/* MOBILE VIEW: Below 530px */}
      <div className="min-[530px]:hidden">
        {isNewUser ? (
          /* SIGNUP MOBILE: Side-by-side Layout (Image 2 Style) */
          <div className="flex flex-row items-center gap-3">
            <button
              type="button"
              onClick={handleManualToggle}
              className="flex-1 text-[9px] font-black border-2 border-slate-300 rounded-2xl text-slate-500 py-4 uppercase tracking-tighter flex items-center justify-center gap-1 active:scale-95 transition-transform"
            >
              <LogIn size={14} /> Back to Login
            </button>
            <button
              type="submit"
              form="auth-form"
              className="flex-1 bg-slate-900 text-white rounded-2xl py-4 font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform"
            >
              Start <ChevronRight size={14} />
            </button>
          </div>
        ) : (
          /* LOGIN MOBILE: Stacked Layout with Sign In on TOP (Image 1 Fix) */
          <div className="flex flex-col gap-3">
            <button
              type="submit"
              form="auth-form"
              className="w-full bg-slate-900 text-white rounded-2xl py-4 font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-transform"
            >
              Sign In <ChevronRight size={14} />
            </button>
            <button
              type="button"
              onClick={handleManualToggle}
              className="w-full text-[9px] font-black border-2 border-slate-200 rounded-2xl text-slate-400 py-4 uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <UserPlus size={14} /> New? Create Account
            </button>
          </div>
        )}
      </div>

      {/* DESKTOP VIEW: 530px and above */}
      <div className="hidden min-[530px]:flex flex-col gap-3">
        <button
          type="submit"
          form="auth-form"
          className="w-full bg-slate-900 text-white rounded-2xl py-5 font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl hover:bg-slate-800 transition-colors"
        >
          {isNewUser ? "Start Journey" : "Sign In"} <ChevronRight size={14} />
        </button>
        <button
          type="button"
          onClick={handleManualToggle}
          className="w-full text-[11px] font-black border-2 border-slate-300 rounded-2xl text-slate-500 py-4 hover:border-slate-400 transition-all uppercase tracking-widest flex items-center justify-center gap-2"
        >
          {isNewUser ? (
            <><LogIn size={14} /> Back to Login</>
          ) : (
            <><UserPlus size={14} /> New? Create Account</>
          )}
        </button>
      </div>
    </div>
  );
};

export default AuthButtons;
import { Lock, UserPlus, X } from 'lucide-react';

const AuthHeader = ({ isNewUser, onClose }) => {
  return (
    <div className="relative">
      <button
        onClick={onClose}
        className="absolute top-0 right-0 min-[530px]:-top-2 min-[530px]:-right-2 min-[530px]:p-2 text-slate-400 hover:text-slate-600 transition-all duration-200 group"
      >
        <X size={24} className="min-[530px]:hidden group-active:scale-90" strokeWidth={3} />
        <X size={20} className="hidden min-[530px]:block group-active:scale-90" strokeWidth={3} />
      </button>

      <div className="w-14 h-14 bg-brand rounded-2xl flex items-center justify-center mx-auto mb-2 min-[530px]:mb-4 shadow-lg shadow-brand/20 transition-all duration-500">
        {isNewUser ? (
          <UserPlus className="text-white animate-in zoom-in" size={24} />
        ) : (
          <Lock className="text-white animate-in zoom-in" size={24} />
        )}
      </div>

      <h2 className="text-xl font-black text-slate-800 tracking-tight mb-1 uppercase">
        {isNewUser ? "Create Account" : "Welcome Back"}
      </h2>

      <p className="text-slate-400 font-bold text-[9px] uppercase tracking-widest mb-6">
        {isNewUser ? "Join the SkinBloom community" : "Access your secure vault"}
      </p>
    </div>
  );
};

export default AuthHeader;
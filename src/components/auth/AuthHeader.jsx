import React from 'react';
import { Lock, UserPlus } from 'lucide-react';

const AuthHeader = ({ isNewUser }) => {
  return (
    <>
      {/* Icon Container with your Brand Color and Opacity */}
      <div className="w-14 h-14 bg-brand rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-brand/20 transition-all duration-500">
        {isNewUser ? (
          <UserPlus className="text-white animate-in zoom-in" size={24} />
        ) : (
          <Lock className="text-white animate-in zoom-in" size={24} />
        )}
      </div>

      {/* Main Title */}
      <h2 className="text-xl font-black text-slate-800 tracking-tight mb-1 uppercase">
        {isNewUser ? "Create Account" : "Welcome Back"}
      </h2>

      {/* Subtitle */}
      <p className="text-slate-400 font-bold text-[9px] uppercase tracking-widest mb-6">
        {isNewUser ? "Join the SkinBloom community" : "Access your secure vault"}
      </p>
    </>
  );
};

export default AuthHeader;
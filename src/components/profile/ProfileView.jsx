// import { useState } from 'react';
// import { User, ShieldCheck, AlertCircle, RefreshCcw, Phone, Mail } from 'lucide-react';

// export const ProfileView = ({ user, skinType, onResetProfile }) => {
//   const [userId] = useState(() => `SKIN-${Math.floor(Math.random() * 9000) + 1000}`);

//   const actualSkinType = typeof skinType === 'object' ? skinType.skinType : skinType;

//   return (
//     <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
//       <div className="bg-white rounded-[3rem] p-8 shadow-sm border border-slate-100 overflow-hidden relative">
//         <div className="absolute top-0 right-0 w-32 h-32 bg-brand rounded-full -mr-16 -mt-16 opacity-20" />

//         <div className="flex items-center gap-6 relative z-10">
//           <div className="w-20 h-20 bg-brand rounded-full flex items-center justify-center shadow-xl shadow-brand/20 border-4 border-white">
//             <User className="text-white" size={36} />
//           </div>
//           <div>
//             <h2 className="text-3xl font-black text-slate-800 tracking-tighter">{user.name}</h2>
//             <div className="flex items-center gap-2 mt-2">
//               <span className="bg-brand text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
//                 {/* Always shows the dynamic age passed from SkinBloom.jsx */}
//                 Age: {user.age}
//               </span>
//               <span className="bg-slate-100 text-slate-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
//                 ID: {userId}
//               </span>
//             </div>
//           </div>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
//           <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-3 border border-slate-100">
//             <Mail className="text-brand" size={18} />
//             <span className="text-sm font-bold text-slate-600">{user.email || 'Email not linked'}</span>
//           </div>
//           <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-3 border border-slate-100">
//             <Phone className="text-brand" size={18} />
//             <span className="text-sm font-bold text-slate-600">{user.phone || 'Phone not linked'}</span>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white rounded-[3rem] p-8 shadow-sm border border-slate-100">
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center gap-3">
//             <ShieldCheck className="text-brand" size={24} />
//             <h3 className="font-black text-slate-800 uppercase tracking-tighter">Skin Analysis</h3>
//           </div>
//         </div>

//         <div className="p-6 bg-brand/10 border-2 border-dashed border-brand rounded-4xl mb-6 text-center">
//           <p className="text-xs font-black text-brand uppercase tracking-widest mb-1">Calibrated Type</p>

//           <p className="text-5xl font-black text-brand tracking-tighter drop-shadow-sm">
//             {actualSkinType}
//           </p>
//         </div>

//         <div className="p-6 bg-red-50 border border-red-300 rounded-4xl">
//           <div className="flex items-start gap-4">
//             <div className="p-3 bg-red-100 rounded-2xl text-red-600">
//               <AlertCircle size={24} />
//             </div>
//             <div className="flex-1">
//               <h4 className="font-black text-red-800 uppercase tracking-tight">Need a Re-scan?</h4>
//               <p className="text-sm text-red-600 font-medium mt-1 leading-snug">
//                 Resetting will remove your skin profile and let you take the quiz again.
//               </p>
//               <button
//                 onClick={onResetProfile}
//                 className="mt-4 bg-red-600 text-white px-6 py-3 rounded-xl font-black text-xs flex items-center gap-2 hover:bg-red-700 transition-all uppercase tracking-widest active:scale-95"
//               >
//                 <RefreshCcw size={16} /> Reset Profile
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


import { ShieldCheck, AlertCircle, RefreshCcw } from 'lucide-react';
import { useProfile } from '../../hooks/profile/useProfile';
import { UserIdentityCard } from './UserIdentityCard';

export const ProfileView = ({ user, skinType, onResetProfile }) => {
  const { userId, displaySkinType } = useProfile(skinType);

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

      <UserIdentityCard user={user} userId={userId} />

      <div className="bg-white rounded-[3rem] p-8 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-brand" size={24} />
            <h3 className="font-black text-slate-800 uppercase tracking-tighter">Skin Analysis</h3>
          </div>
        </div>

        {/* Skin Type Badge */}
        <div className="p-6 bg-brand/10 border-2 border-dashed border-brand rounded-4xl mb-6 text-center">
          <p className="text-xs font-black text-brand uppercase tracking-widest mb-1">Calibrated Type</p>
          <p className="text-5xl font-black text-brand tracking-tighter drop-shadow-sm">
            {displaySkinType}
          </p>
        </div>

        {/* Danger Zone / Reset */}
        <div className="p-6 bg-red-50 border border-red-300 rounded-4xl">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-red-100 rounded-2xl text-red-600">
              <AlertCircle size={24} />
            </div>
            <div className="flex-1">
              <h4 className="font-black text-red-800 uppercase tracking-tight">Need a Re-scan?</h4>
              <p className="text-sm text-red-600 font-medium mt-1 leading-snug">
                Resetting will remove your skin profile and let you take the quiz again.
              </p>
              <button
                onClick={onResetProfile}
                className="mt-4 bg-red-600 text-white px-6 py-3 rounded-xl font-black text-xs flex items-center gap-2 hover:bg-red-700 transition-all uppercase tracking-widest active:scale-95"
              >
                <RefreshCcw size={16} /> Reset Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
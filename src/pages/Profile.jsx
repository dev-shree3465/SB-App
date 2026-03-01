import { useState } from 'react'; 
import { ShieldCheck, AlertCircle, RefreshCcw } from 'lucide-react';
import { useProfile } from '../hooks/profile/useProfile';
import { UserIdentityCard } from '../components/profile/UserIdentityCard';
import { LogoutConfirmModal } from '../components/modals/LogoutConfirmModal';

export const Profile = ({ user, skinType, onResetProfile, onLogout }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const profileData = useProfile(user, skinType);
  const { displaySkinType, isLoggedIn } = profileData;

  return (
    <div className="max-w-2xl mx-auto space-y-3 md:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

      <UserIdentityCard
        profileData={profileData}
        user={user}
        onLogout={() => setShowLogoutModal(true)}
      />

      {/* Profile logic continues... */}

      {/* 2. MODAL RENDER: Modal-ah inga add pannunga */}
      <LogoutConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onLogout={(wipe) => {
          onLogout(wipe); // Main logout logic trigger aagum
          setShowLogoutModal(false);
        }}
      />

      <div className="bg-white rounded-[1.8rem] md:rounded-[3rem] p-4 sm:p-6 md:p-8 shadow-sm border border-slate-100">

        {/* Skin Analysis Header */}
        <div className="flex items-center gap-2 mb-3 md:mb-6">
          <ShieldCheck className="text-brand" size={16} md:size={24} />
          <h3 className="font-black text-xs md:text-base text-slate-800 uppercase tracking-tighter">
            Skin Analysis
          </h3>
        </div>

        {/* Calibrated Type Box: Compact for small screens */}
        <div className="p-3 sm:p-5 md:p-8 bg-brand/10 border-2 border-dashed border-brand rounded-[1.2rem] md:rounded-4xl mb-4 md:mb-6 text-center">
          <p className="text-[8px] md:text-xs font-black text-brand uppercase tracking-widest mb-0.5">
            Calibrated Skin Type
          </p>
          <p className="text-2xl sm:text-4xl md:text-6xl font-black text-brand tracking-tighter drop-shadow-sm">
            {displaySkinType}
          </p>
        </div>

        {isLoggedIn && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Report Header */}
            <div className="flex items-center gap-2 my-2 md:my-6">
              <AlertCircle className="text-red-600" size={16} md:size={24} />
              <h3 className="font-black text-xs md:text-base text-slate-800 uppercase tracking-tighter">
                Skin Irritant Report
              </h3>
            </div>

            {/* Reset Profile Card */}
            <div className="p-3.5 sm:p-5 md:p-8 bg-red-50 border border-red-200 rounded-[1.2rem] md:rounded-4xl shadow-sm">
              <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-7">
                {/* Text Section */}
                <div className="text-center md:text-left flex flex-col items-center md:items-start flex-1">
                  <h4 className="font-black text-[12px] md:text-[1.3rem] text-red-700 uppercase tracking-tight">
                    Need a Re-scan?
                  </h4>
                  <p className="text-[10px] md:text-[1rem] text-red-600 font-medium mt-0.5 leading-tight max-w-[180px] sm:max-w-[250px] md:max-w-md">
                    Resetting will remove your skin profile and let you take the quiz again.
                  </p>
                </div>

                {/* Button Section */}
                <div className="w-full md:w-auto shrink-0 mt-0">
                  <button
                    onClick={onResetProfile}
                    className="w-full md:w-auto bg-red-600 text-white px-4 py-3 md:py-3 rounded-xl font-black text-[9px] md:text-xs flex items-center justify-center gap-2 hover:bg-red-700 active:scale-95 transition-all uppercase tracking-widest"
                  >
                    <RefreshCcw size={12} className="md:size-3.5" />
                    Reset Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
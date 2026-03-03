import { ShieldCheck, AlertCircle, RefreshCcw } from 'lucide-react';
import { useProfile } from '../hooks/profile/useProfile';
import { UserIdentityCard } from '../components/profile/UserIdentityCard';
import { LogoutConfirmModal } from '../components/modals/LogoutConfirmModal';

export const Profile = ({ core }) => {
  // Pass the whole core object to the hook
  const profileData = useProfile(core);
  const { displaySkinType, isLoggedIn, handleResetProfile } = profileData;
  
  const openLogoutModal = () => core.setShowLogoutConfirm(true);
  
  const handleConfirmLogout = (wipeAll) => {
    core.handleLogout(wipeAll);
    core.setShowLogoutConfirm(false);
  };
  
  if (!core) return null;
  return (
    <div className="max-w-2xl mx-auto space-y-4 md:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24">
      <UserIdentityCard
        profileData={profileData}
        user={core.user}
        onLogout={openLogoutModal}
      />

      <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 sm:p-8 shadow-sm border border-slate-100">
        <div className="flex items-center gap-2 mb-4 md:mb-6">
          <ShieldCheck className="text-brand" size={20} />
          <h3 className="font-black text-sm md:text-base text-slate-800 uppercase tracking-tight">Skin Analysis</h3>
        </div>

        <div className="p-6 md:p-10 bg-brand/5 border-2 border-dashed border-brand/20 rounded-[1.5rem] md:rounded-4xl mb-6 text-center">
          <p className="text-[10px] md:text-xs font-black text-brand uppercase tracking-widest mb-2">Calibrated Skin Type</p>
          <p className="text-4xl md:text-6xl font-black text-brand tracking-tighter uppercase">
            {displaySkinType || "Scanning..."}
          </p>
        </div>

        {isLoggedIn && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="text-red-500" size={20} />
              <h3 className="font-black text-sm md:text-base text-slate-800 uppercase tracking-tight">Account Actions</h3>
            </div>

            <div className="p-5 md:p-8 bg-red-50 border border-red-100 rounded-[1.5rem] md:rounded-4xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left">
                  <h4 className="font-black text-base md:text-xl text-red-700 uppercase">Reset Profile?</h4>
                  <p className="text-xs md:text-sm text-red-600/80 font-bold mt-1 max-w-xs">
                    This will delete your skin calibration and let you retake the quiz.
                  </p>
                </div>
                <button
                  onClick={handleResetProfile} // Using the logic from useProfile hook
                  className="w-full md:w-auto bg-red-600 text-white px-6 py-4 rounded-2xl font-black text-[10px] md:text-xs flex items-center justify-center gap-2 hover:bg-red-700 active:scale-95 transition-all shadow-lg shadow-red-100 uppercase"
                >
                  <RefreshCcw size={14} /> Reset Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <LogoutConfirmModal
        isOpen={core.showLogoutConfirm}
        onClose={() => core.setShowLogoutConfirm(false)}
        onLogout={handleConfirmLogout}
      />
    </div>
  );
};
import { useState } from 'react';
import { useProfile } from '../hooks/profile/useProfile';
import { useAuth } from '../hooks/auth/useAuth';
import { UserIdentityCard } from '../components/profile/UserIdentityCard';
import { LogoutConfirmModal } from '../components/modals/LogoutConfirmModal';
import { AnalysisCard } from '../components/profile/AnalysisCard';
import { ResetAction } from '../components/profile/ResetAction';
import { Settings } from '../pages/Settings';

export const Profile = ({ core }) => {
  const [showSettings, setShowSettings] = useState(false);
  const profileData = useProfile(core);
  const { handleLogout } = useAuth(core);
  const { displaySkinType, isLoggedIn, handleResetProfile } = profileData;

  const handleConfirmLogout = (wipeAll) => {
    handleLogout(wipeAll);
    core.setShowLogoutConfirm(false);
    setShowSettings(false);
  };

  if (!core) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-4 md:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24">
      <UserIdentityCard
        profileData={profileData}
        user={core.user}
        onSettingsClick={() => setShowSettings(true)}
      />

      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100">
        <AnalysisCard displaySkinType={displaySkinType} />

        {isLoggedIn && (
          <ResetAction onReset={handleResetProfile} />
        )}
      </div>

      {showSettings && (
        <Settings
          core={core}
          onClose={() => setShowSettings(false)}
          onLogout={() => core.setShowLogoutConfirm(true)}
        />
      )}

      <LogoutConfirmModal
        isOpen={core.showLogoutConfirm}
        onClose={() => core.setShowLogoutConfirm(false)}
        onLogout={handleConfirmLogout}
      />
    </div>
  );
};
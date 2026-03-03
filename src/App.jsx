import { useState } from 'react';

// Layout
import { Navbar } from './components/layout/Navbar';
import { MobileNav } from './components/layout/MobileNav';
import { useCoreLogic } from './hooks/core/useCoreLogic';

// Modals
import { AuthModal } from './components/modals/AuthModal';
import { LogoutConfirmModal } from './components/modals/LogoutConfirmModal';
import { DeleteConfirmModal } from './components/modals/DeleteConfirmModal';
import { SuccessPopup } from './components/modals/SuccessPopup';
import { Notification } from './components/layout/Notification';

// Pages
import { Dashboard } from './pages/Dashboard';
import { Vault } from './pages/Vault';
import { Scanner } from './pages/Scanner';
import { Profile } from './pages/Profile';
import { Quiz } from './pages/Quiz';

const App = () => {
  const core = useCoreLogic();
  const [isPopupActive, setIsPopupActive] = useState(false);

  const handleTabChange = (tab) => {
    if (isPopupActive) {
      core.notify("Please Save or Discard the result first!", "error");
      return;
    }
    core.setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans-serif pb-24 text-slate-900 relative">
      {!core.user && (
        <div
          onClick={() => core.setShowAuthModal(true)}
          className="fixed inset-0 z-[40] cursor-pointer bg-transparent"
        />
      )}

      <AuthModal
        isOpen={core.showAuthModal}
        onClose={() => core.setShowAuthModal(false)}
        onLogin={core.handleAuthComplete}
        notify={core.notify}
        initialEmail={core.registeredEmail}
      />
      <SuccessPopup isOpen={core.showSuccessPopup} skinType={core.skinProfile?.type} />

      <LogoutConfirmModal isOpen={core.showLogoutConfirm} onClose={() => core.setShowLogoutConfirm(false)} onLogout={core.handleLogout} />

      <DeleteConfirmModal
        item={core.deleteConfirm}
        onClose={() => core.setDeleteConfirm(null)}
        onDelete={() => {
          core.setScannedProducts(core.scannedProducts.filter((_, i) => i !== core.deleteConfirm.idx));
          core.setDeleteConfirm(null);
        }}
      />

      <Notification
        notification={core.notification}
        onClose={() => core.setNotification(null)}
        isAuthOpen={core.showAuthModal}
      />

      <Navbar
        user={core.user}
        onLogout={() => core.setShowLogoutConfirm(true)}
        activeTab={core.activeTab}
        setActiveTab={handleTabChange}
        onLoginClick={() => {
          core.setShowAuthModal(true);
        }}
      />

      <main className="max-w-7xl mx-auto px-4 pt-24">
        {/* {core.user && core.isNewRegistration ? ( */}
        {(core.user || core.pendingUser) && core.isNewRegistration ? (
          <div className="max-xl mx-auto py-8">
            <Quiz
              onComplete={core.handleQuizComplete}
              initialAge={core.getDynamicAge()}
              notify={core.notify}
            />
          </div>
        ) : (
          <>
            {!core.user && core.activeTab !== 'DASHBOARD' && (
              <div onClick={() => core.setShowAuthModal(true)} className="fixed inset-0 z-[50] cursor-pointer bg-transparent" />
            )}

            {core.activeTab === 'DASHBOARD' && <Dashboard core={core} />}

            {core.activeTab === 'VAULT' && <Vault core={core} />}

            {core.activeTab === 'SCAN' && (
              <Scanner
                userAge={core.getDynamicAge()}
                skinType={core.skinProfile?.type}
                onResultPopup={setIsPopupActive}
                onScanComplete={(res) => {
                  core.setScannedProducts([res, ...core.scannedProducts]);
                  setIsPopupActive(false);
                  core.setActiveTab('DASHBOARD');
                  core.notify("Analysis Complete & Saved", "success");
                }}
                notify={core.notify}
              />
            )}

            {core.activeTab === 'PROFILE' && (
              <Profile core={core} />
            )}
          </>
        )}
      </main>

      <MobileNav
        user={core.user}
        activeTab={core.activeTab}
        setActiveTab={core.setActiveTab}
        onLoginClick={() => core.setShowAuthModal(true)}
      />
    </div>
  );
};

export default App;
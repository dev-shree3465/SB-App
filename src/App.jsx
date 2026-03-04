// Layout
import { Navbar } from './components/layout/Navbar';
import { MobileNav } from './components/layout/MobileNav';
import { useCoreLogic } from './hooks/core/useCoreLogic';

// Modals
import { AuthModal } from './components/modals/AuthModal';
import { LogoutConfirmModal } from './components/modals/LogoutConfirmModal';
import { DeleteConfirmModal } from './components/modals/DeleteConfirmModal';
import { SuccessPopup } from './components/modals/SuccessPopup';
import { NotificationModal } from './components/modals/NotificationModal';

// Pages
import { Dashboard } from './pages/Dashboard';
import { Vault } from './pages/Vault';
import { Scanner } from './pages/Scanner';
import { Profile } from './pages/Profile';
import { Quiz } from './pages/Quiz';

const App = () => {

  const core = useCoreLogic()

  return (
    <div className="min-h-screen bg-slate-50 font-sans-serif pb-24 text-slate-900 relative">
      {/* 1. Global Auth Guard Overlay */}
      {!core.user && (
        <div onClick={() => core.setShowAuthModal(true)} className="fixed inset-0 z-[40] cursor-pointer bg-transparent" />
      )}

      {/* 2. Modals & Global UI */}
      <AuthModal
        isOpen={core.showAuthModal}
        onClose={() => core.setShowAuthModal(false)}
        core={core}
        initialEmail={core.registeredEmail}
      />

      <SuccessPopup
        isOpen={core.showSuccessPopup}
        skinType={core.skinProfile?.type || "ANALYZING..."}
      />

      <LogoutConfirmModal
        isOpen={core.showLogoutConfirm}
        onClose={() => core.setShowLogoutConfirm(false)}
        onLogout={core.handleLogout}
      />

      <DeleteConfirmModal
        item={core.deleteConfirm}
        onClose={() => core.setDeleteConfirm(null)}
        onDelete={() => {
          const indexToDelete = core.deleteConfirm.idx;
          core.setScannedProducts(prev => prev.filter((_, i) => i !== indexToDelete));
          core.setDeleteConfirm(null);
          core.notify("Product removed from vault", "info");
        }}
      />

      <NotificationModal
        notification={core.notification}
        onClose={() => core.setNotification(null)}
        isAuthOpen={core.showAuthModal}
      />

      {/* 3. Navigation */}
      <Navbar
        user={core.user}
        activeTab={core.activeTab}
        setActiveTab={core.handleTabChange}
        onLoginClick={() => core.setShowAuthModal(true)}
        scannedProducts={core.scannedProducts}
      />

      <main className="max-w-7xl mx-auto px-4 pt-24">
        {/* 4. Quiz Logic (Conditional) */}
        {core.isNewRegistration && (core.user || core.pendingUser) ? (
          <div className="max-xl mx-auto py-8">
            <Quiz core={core} />
          </div>
        ) : (
          /* 5. Main Pages */
          <>
            {core.activeTab === 'DASHBOARD' && <Dashboard core={core} />}
            {core.activeTab === 'VAULT' && <Vault core={core} />}
            {core.activeTab === 'SCAN' && (
              <Scanner
                core={core}
                onScanComplete={(res) => {
                  core.setScannedProducts([res, ...core.scannedProducts]);
                  core.setActiveTab('DASHBOARD');
                  core.notify("Analysis Complete & Saved", "success");
                }}
              />
            )}
            {core.activeTab === 'PROFILE' && <Profile core={core} />}
          </>
        )}
      </main>

      <MobileNav user={core.user} activeTab={core.activeTab} setActiveTab={core.handleTabChange} onLoginClick={() => core.setShowAuthModal(true)} />
    </div>
  );
};
export default App;
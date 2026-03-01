import { X } from 'lucide-react';

// Layout
import { Navbar } from './components/layout/Navbar';
import { MobileNav } from './components/layout/MobileNav';
import { useCoreLogic } from './hooks/core/useCoreLogic';

// Modals
import { AuthModal } from './components/modals/AuthModal';
import { LogoutConfirmModal } from './components/modals/LogoutConfirmModal';
import { DeleteConfirmModal } from './components/modals/DeleteConfirmModal';
import { SuccessPopup } from './components/modals/SuccessPopup';

// Pages
import { Dashboard } from './pages/Dashboard';
import { Vault } from './pages/Vault';
import { Scanner } from './pages/Scanner';
import { Profile } from './pages/Profile';
import { Quiz } from './pages/Quiz';

const App = () => {
  const core = useCoreLogic();

  return (
    <div className="min-h-screen bg-slate-50 font-sans-serif pb-24 text-slate-900 relative">
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

      {core.notification && (
        <div className="fixed bottom-6 right-6 z-[700] w-auto max-w-[280px] sm:max-w-[320px] animate-in slide-in-from-right-10 duration-300">
          <div className={`flex items-center gap-3 p-4 rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border backdrop-blur-md bg-white/90 ${core.notification.type === 'success' ? 'border-green-100 text-green-800' : 'border-slate-100 text-slate-700'}`}>
            <div className={`w-2 h-2 rounded-full animate-pulse ${core.notification.type === 'success' ? 'bg-green-500' : 'bg-blue-500'}`} />
            <p className="text-[10px] font-black uppercase tracking-widest flex-1 leading-tight">{core.notification.message}</p>
            <button onClick={() => core.setNotification(null)} className="p-1 hover:bg-slate-100 rounded-lg transition-colors text-slate-400"><X size={14} /></button>
          </div>
        </div>
      )}

      <Navbar user={core.user} onLogout={() => core.setShowLogoutConfirm(true)} activeTab={core.activeTab} setActiveTab={core.setActiveTab} onLoginClick={() => { core.setRegisteredEmail(""); core.setShowAuthModal(true); }} />

      <main className="max-w-7xl mx-auto px-4 pt-24">
        {core.user && core.isNewRegistration ? (
          <div className="max-xl mx-auto py-8">
            <Quiz onComplete={core.handleQuizComplete} initialAge={core.getDynamicAge()} />
          </div>
        ) : (
          <div className="relative">
            {!core.user && core.activeTab !== 'DASHBOARD' && (
              <div onClick={() => core.setShowAuthModal(true)} className="fixed inset-0 z-[50] cursor-pointer bg-transparent" />
            )}
            {core.activeTab === 'DASHBOARD' && <Dashboard core={core} />}
            {core.activeTab === 'VAULT' && <Vault core={core} />}
            {core.activeTab === 'SCAN' && (
              <Scanner
                userAge={core.getDynamicAge()}
                skinType={core.skinProfile?.type}
                onScanComplete={(res) => {
                  core.setScannedProducts([res, ...core.scannedProducts]);
                  core.setActiveTab('DASHBOARD');
                  core.notify("Analysis Complete & Saved", "success");
                }}
                notify={core.notify}
              />
            )}
            {core.activeTab === 'PROFILE' && (
              <Profile
                core={core}
                user={core.user ? { ...core.user, age: core.getDynamicAge() } : null}
                skinType={core.user ? core.skinProfile?.type : null}
                onResetProfile={core.handleResetProfile}
              />
            )}
          </div>
        )}
      </main>

      <MobileNav activeTab={core.activeTab} setActiveTab={core.setActiveTab} />
    </div>
  );
};

export default App;
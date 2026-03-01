import { useState, useEffect } from 'react';
import { X, Filter, SortDesc, Sparkles } from 'lucide-react';

import { Navbar } from './components/layout/Navbar';
import { MobileNav } from './components/layout/MobileNav';
import AuthLogic from './components/auth/AuthLogic';
import { SkinQuiz } from './components/quiz/SkinQuiz';
import { Scanner } from './components/scanning/Scanner';
import { ProfileView } from './components/profile/ProfileView';
import { SafetyChart } from './components/dashboard/SafetyChart';
import { ProductTable } from './components/dashboard/ProductTable';
import { CustomDropdown } from './components/layout/CustomDropdown';

const APP_ID = "skinbloom-v1";

const SkinBloom = () => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem(`${APP_ID}_user`);
    return saved ? JSON.parse(saved) : null;
  });

  const [skinProfile, setSkinProfile] = useState(() => {
    const saved = localStorage.getItem(`${APP_ID}_profile`);
    return saved ? JSON.parse(saved) : null;
  });

  const [scannedProducts, setScannedProducts] = useState(() => {
    const saved = localStorage.getItem(`${APP_ID}_scans`);
    return saved ? JSON.parse(saved) : [];
  });

  const [activeTab, setActiveTab] = useState('DASHBOARD');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortOrder, setSortOrder] = useState('LATEST');

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [notification, setNotification] = useState(null);
  const [isNewRegistration, setIsNewRegistration] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const [registeredEmail, setRegisteredEmail] = useState("");

  useEffect(() => {
    if (user) localStorage.setItem(`${APP_ID}_user`, JSON.stringify(user));
    if (skinProfile) localStorage.setItem(`${APP_ID}_profile`, JSON.stringify(skinProfile));
    localStorage.setItem(`${APP_ID}_scans`, JSON.stringify(scannedProducts));
  }, [user, skinProfile, scannedProducts]);

  const notify = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleAuthComplete = (userData, isSignup = false) => {
    if (isSignup) {
      // Step 1: Signup Success
      setRegisteredEmail(userData.email); // Store email for later pre-fill
      setUser(userData);
      setIsNewRegistration(true);
      setShowAuthModal(false);
      notify("Register Success! Let's calibrate your skin.", "success");
    } else {
      // Normal Login Logic
      setUser(userData);
      setShowAuthModal(false);
      const allProfiles = JSON.parse(localStorage.getItem(`skinbloom_all_profiles`) || "{}");
      const userProfile = allProfiles[userData.email];

      if (userProfile) {
        setSkinProfile(userProfile);
        setIsNewRegistration(false);
      } else {
        setIsNewRegistration(true);
      }
    }
  };

  const handleQuizComplete = (quizData) => {
    const newProfile = {
      type: quizData.skinType,
      birthYear: quizData.birthYear,
      date: new Date().toISOString()
    };

    setSkinProfile(newProfile);

    // Save to global profiles
    const allProfiles = JSON.parse(localStorage.getItem(`skinbloom_all_profiles`) || "{}");
    allProfiles[user.email] = newProfile;
    localStorage.setItem(`skinbloom_all_profiles`, JSON.stringify(allProfiles));

    if (isNewRegistration) {
      // Step 4: Quiz Finished -> Show Success -> Redirect to Login
      setShowSuccessPopup(true);

      setTimeout(() => {
        setShowSuccessPopup(false);
        setUser(null); // Log them out so they have to login
        setIsNewRegistration(false);
        setShowAuthModal(true); // Step 5: Open Login Modal automatically
        notify("Profile Saved! Please login to start.", "success");
      }, 3000);
    } else {
      setActiveTab('DASHBOARD');
      notify("Profile Calibrated!", "success");
    }
  };

  const getFilteredProducts = () => {
    let list = [...scannedProducts];
    if (statusFilter !== 'ALL') {
      list = list.filter(p => p.status === statusFilter);
    }
    if (sortOrder === 'LATEST') {
      list.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
    } else if (sortOrder === 'EXPIRY') {
      list.sort((a, b) => new Date(a.expiryDate || Infinity) - new Date(b.expiryDate || Infinity));
    }
    return list;
  };

  const getDynamicAge = () => {
    if (skinProfile?.birthYear) {
      const currentYear = new Date().getFullYear();
      return currentYear - skinProfile.birthYear;
    }
    return user?.age || 0;
  };

  const handleResetProfile = () => {
    const allProfiles = JSON.parse(localStorage.getItem(`skinbloom_all_profiles`) || "{}");
    delete allProfiles[user.email];
    localStorage.setItem(`skinbloom_all_profiles`, JSON.stringify(allProfiles));

    setIsNewRegistration(true);
  };

  const handleLogout = (wipeAll = false) => {
    if (wipeAll) {
      localStorage.clear();
      setSkinProfile(null);
      setScannedProducts([]);
      setUser(null);
      setRegisteredEmail(""); // ADD THIS LINE to clear the pre-fill memory
    } else {
      localStorage.removeItem(`${APP_ID}_user`);
      setUser(null);
    }
    setIsNewRegistration(false);
    setShowLogoutConfirm(false);
    notify(wipeAll ? "All data cleared." : "Logged out.", "info");
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans-serif pb-24 text-slate-900 relative">

      {/* AUTH MODAL - Only shows when triggered */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[600]">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowAuthModal(false)} />
          <AuthLogic
            onLogin={handleAuthComplete}
            notify={notify}
            onClose={() => setShowAuthModal(false)}
            initialEmail={registeredEmail}
          />
        </div>
      )}

      {showSuccessPopup && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
          <div className="bg-white w-full max-w-xs rounded-[2.5rem] p-8 text-center animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-50 text-green-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Sparkles size={40} className="animate-bounce" />
            </div>

            <h2 className="text-xl font-black uppercase tracking-tight text-slate-800">
              Profile Complete!
            </h2>

            {/* NEW: Displaying the actual result clearly */}
            <div className="mt-4 p-3 bg-brand/5 border border-brand/20 rounded-2xl">
              <p className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Your Calibrated Type:</p>
              <p className="text-2xl font-black text-brand uppercase tracking-tighter">
                {skinProfile?.type || "Calculating..."}
              </p>
            </div>

            <p className="text-[10px] font-bold text-slate-400 mt-6 uppercase tracking-[0.2em]">
              Finalizing your dashboard...
            </p>
          </div>
        </div>
      )}

      {notification && (
        <div className="fixed bottom-6 right-6 z-[700] w-auto max-w-[280px] sm:max-w-[320px] animate-in slide-in-from-right-10 duration-300">
          <div className={`
            flex items-center gap-3 p-4 rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] 
            border backdrop-blur-md bg-white/90 
            ${notification.type === 'success' ? 'border-green-100 text-green-800' : 'border-slate-100 text-slate-700'}
          `}>
            <div className={`w-2 h-2 rounded-full animate-pulse ${notification.type === 'success' ? 'bg-green-500' : 'bg-blue-500'}`} />
            <p className="text-[10px] font-black uppercase tracking-widest flex-1 leading-tight">{notification.message}</p>
            <button onClick={() => setNotification(null)} className="p-1 hover:bg-slate-100 rounded-lg transition-colors text-slate-400">
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      <Navbar
        user={user}
        onLogout={() => setShowLogoutConfirm(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLoginClick={() => {
          setRegisteredEmail("");
          setShowAuthModal(true);
        }} />

      <main className="max-w-7xl mx-auto px-4 pt-24">
        {user && isNewRegistration ? (
          <div className="max-xl mx-auto py-8">
            <SkinQuiz onComplete={handleQuizComplete} initialAge={getDynamicAge()} />
          </div>
        ) : (
          <div className="relative">

            {/* OVERLAY LOGIC */}
            {!user && activeTab !== 'DASHBOARD' && (
              <div
                onClick={() => setShowAuthModal(true)}
                className="fixed inset-0 z-[50] cursor-pointer bg-transparent"
                title="Click to "
              >
              </div>
            )}
            <div className={!user ? "pointer-events-none opacity-50 grayscale blur-[2px] transition-all duration-500" : ""}></div>
            {activeTab === 'DASHBOARD' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-4" onClick={() => !user && setShowAuthModal(true)}>
                  <div className={!user ? "pointer-events-none opacity-60 grayscale" : ""}>
                    <SafetyChart products={scannedProducts} onNavigate={() => user ? setActiveTab('VAULT') : setShowAuthModal(true)} />
                  </div>
                </div>
                <div className="lg:col-span-8" onClick={() => !user && setShowAuthModal(true)}>
                  <div className={!user ? "pointer-events-none opacity-60 grayscale" : ""}>
                    <ProductTable
                      products={scannedProducts.slice(0, 3)}
                      onDelete={(idx) => setDeleteConfirm({ idx, name: scannedProducts[idx].name })}
                      showTitle={true}
                      onNavigate={() => user ? setActiveTab('VAULT') : setShowAuthModal(true)}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'VAULT' && (
              <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* HEADER SECTION - Tightened Gap and Padding */}
                <div className="flex flex-row items-center justify-between mb-8 px-4 sm:px-6 gap-1.5">

                  <div className="flex-shrink-0">
                    <h2 className="text-base sm:text-2xl md:text-3xl font-black uppercase tracking-tight whitespace-nowrap">
                      Product Vault
                    </h2>
                  </div>

                  <div className="flex flex-row items-center justify-end gap-1 sm:gap-2 flex-nowrap flex-1">
                    <CustomDropdown
                      icon={Filter}
                      value={statusFilter}
                      onChange={setStatusFilter}
                      label="Status"
                      options={[
                        { value: 'ALL', label: 'Status' }, // Shorter labels for mobile
                        { value: 'GREEN', label: 'Safe' },
                        { value: 'YELLOW', label: 'Warn' },
                        { value: 'RED', label: 'Risk' },
                      ]}
                    />
                    <CustomDropdown
                      icon={SortDesc}
                      value={sortOrder}
                      onChange={setSortOrder}
                      label="Sort"
                      options={[
                        { value: 'LATEST', label: 'Latest' },
                        { value: 'EXPIRY', label: 'Expiry' },
                      ]}
                    />
                  </div>
                </div>
                <ProductTable
                  products={getFilteredProducts()}
                  onDelete={(idx) => setDeleteConfirm({ idx, name: scannedProducts[idx].name })}
                  showTitle={false}
                />
                {getFilteredProducts().length === 0 && (
                  <div className="text-center py-20 opacity-20">
                    <p className="font-black uppercase tracking-widest text-xs">No products match these filters</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'SCAN' && (
              <Scanner
                userAge={getDynamicAge()}
                skinType={skinProfile?.type}
                onScanComplete={(res) => {
                  setScannedProducts([res, ...scannedProducts]);
                  setActiveTab('DASHBOARD');
                  notify("Saved", "success");
                }}
                notify={notify}
              />
            )}
            {activeTab === 'PROFILE' && (
              <ProfileView
                user={user ? { ...user, age: getDynamicAge() } : null}
                skinType={user ? skinProfile?.type : null} // Hide skin type if logged out
                onResetProfile={handleResetProfile}
              />
            )}
          </div>
        )}
      </main>

      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {
        showLogoutConfirm && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white w-full max-w-sm rounded-[3rem] p-8 text-center animate-in zoom-in-95">
              <h2 className="text-xl font-black uppercase">Exit SkinBloom?</h2>
              <div className="flex flex-col gap-3 mt-8">
                <button onClick={() => handleLogout(false)} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase text-xs">Just Logout</button>
                <button onClick={() => handleLogout(true)} className="w-full border-2 border-red-100 text-red-500 py-4 rounded-2xl font-black uppercase text-xs">Wipe All Data</button>
                <button onClick={() => setShowLogoutConfirm(false)} className="text-slate-300 font-black uppercase text-[10px] mt-2">Cancel</button>
              </div>
            </div>
          </div>
        )
      }

      {
        deleteConfirm && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/40">
            <div className="bg-white w-full max-w-sm rounded-[3rem] p-8 text-center">
              <h2 className="text-xl font-black uppercase">Remove Item?</h2>
              <div className="flex flex-col gap-2 mt-6">
                <button onClick={() => { setScannedProducts(scannedProducts.filter((_, i) => i !== deleteConfirm.idx)); setDeleteConfirm(null); }} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase text-xs">Delete</button>
                <button onClick={() => setDeleteConfirm(null)} className="w-full py-4 text-slate-300 font-black uppercase text-xs">Cancel</button>
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
};

export default SkinBloom;
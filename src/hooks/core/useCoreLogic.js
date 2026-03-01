import { useState, useEffect } from 'react';

const APP_ID = "skinbloom-v1";

export const useCoreLogic = () => {
  // 1. Core States
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

  // 2. UI States
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

  // 3. Persistance logic
  useEffect(() => {
    if (user) localStorage.setItem(`${APP_ID}_user`, JSON.stringify(user));
    if (skinProfile) localStorage.setItem(`${APP_ID}_profile`, JSON.stringify(skinProfile));
    localStorage.setItem(`${APP_ID}_scans`, JSON.stringify(scannedProducts));
  }, [user, skinProfile, scannedProducts]);

  // 4. Action Handlers
  const notify = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleAuthComplete = (userData, isSignup = false) => {
    if (isSignup) {
      setRegisteredEmail(userData.email);
      setUser(userData);
      setIsNewRegistration(true);
      setShowAuthModal(false);
      notify("Register Success! Let's calibrate your skin.", "success");
    } else {
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
    const allProfiles = JSON.parse(localStorage.getItem(`skinbloom_all_profiles`) || "{}");
    allProfiles[user.email] = newProfile;
    localStorage.setItem(`skinbloom_all_profiles`, JSON.stringify(allProfiles));

    if (isNewRegistration) {
      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
        setUser(null);
        setIsNewRegistration(false);
        setShowAuthModal(true);
        notify("Profile Saved! Please login to start.", "success");
      }, 3000);
    } else {
      setActiveTab('DASHBOARD');
      notify("Profile Calibrated!", "success");
    }
  };

  const handleLogout = (wipeAll = false) => {
    if (wipeAll) {
      localStorage.clear();
      setSkinProfile(null);
      setScannedProducts([]);
      setUser(null);
      setRegisteredEmail("");
    } else {
      localStorage.removeItem(`${APP_ID}_user`);
      setUser(null);
    }
    setIsNewRegistration(false);
    setShowLogoutConfirm(false);
    notify(wipeAll ? "All data cleared." : "Logged out.", "info");
  };

  const handleResetProfile = () => {
    const allProfiles = JSON.parse(localStorage.getItem(`skinbloom_all_profiles`) || "{}");
    delete allProfiles[user.email];
    localStorage.setItem(`skinbloom_all_profiles`, JSON.stringify(allProfiles));
    setIsNewRegistration(true);
  };

  const getDynamicAge = () => {
    if (skinProfile?.birthYear) {
      return new Date().getFullYear() - skinProfile.birthYear;
    }
    return user?.age || 0;
  };

  // 5. Computed Data
  const filteredProducts = [...scannedProducts]
    .filter(p => statusFilter === 'ALL' || p.status === statusFilter)
    .sort((a, b) => {
      if (sortOrder === 'LATEST') return new Date(b.date || 0) - new Date(a.date || 0);
      if (sortOrder === 'EXPIRY') return new Date(a.expiryDate || Infinity) - new Date(b.expiryDate || Infinity);
      return 0;
    });

  return {
    user, skinProfile, scannedProducts, setScannedProducts,
    activeTab, setActiveTab,
    statusFilter, setStatusFilter,
    sortOrder, setSortOrder,
    showAuthModal, setShowAuthModal,
    showLogoutConfirm, setShowLogoutConfirm,
    deleteConfirm, setDeleteConfirm,
    notification, setNotification,
    isNewRegistration, showSuccessPopup,
    registeredEmail, setRegisteredEmail,
    notify, handleAuthComplete, handleQuizComplete,
    handleLogout, handleResetProfile, getDynamicAge, filteredProducts
  };
};
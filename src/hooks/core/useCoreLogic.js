import { useState, useEffect } from 'react';

const APP_ID = "skinbloom-v1";

export const useCoreLogic = () => {
  // --- CORE DATA STATES ---
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

  // --- UI & TEMP STATES ---
  const [activeTab, setActiveTab] = useState('DASHBOARD');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [notification, setNotification] = useState(null);
  const [isNewRegistration, setIsNewRegistration] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [isPopupActive, setIsPopupActive] = useState(false);
  const [otpPurpose, setOtpPurpose] = useState("AUTH");

  const [pendingUser, setPendingUser] = useState(() => {
    const saved = sessionStorage.getItem(`${APP_ID}_pending_user`);
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(`${APP_ID}_user`, JSON.stringify(user));
    } else {
      localStorage.removeItem(`${APP_ID}_user`);
    }
  }, [user]);

  useEffect(() => {
    if (pendingUser) {
      sessionStorage.setItem(`${APP_ID}_pending_user`, JSON.stringify(pendingUser));
    } else {
      sessionStorage.removeItem(`${APP_ID}_pending_user`);
    }
  }, [pendingUser]);

  useEffect(() => {
    if (skinProfile) {
      localStorage.setItem(`${APP_ID}_profile`, JSON.stringify(skinProfile));
    } else {
      localStorage.removeItem(`${APP_ID}_profile`);
    }
  }, [skinProfile]);

  useEffect(() => {
    localStorage.setItem(`${APP_ID}_scans`, JSON.stringify(scannedProducts));
  }, [scannedProducts]);

  // --- GLOBAL UTILITIES ---
  const notify = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 2500);
  };

  const handleTabChange = (tab) => {
    if (isPopupActive) {
      notify("Please Save or Discard the result first!", "error");
      return;
    }
    setActiveTab(tab);
  };

  const getDynamicAge = () => {
    if (skinProfile?.birthYear) return new Date().getFullYear() - skinProfile.birthYear;
    return user?.age || pendingUser?.age || 0;
  };

  return {
    user, setUser,
    skinProfile, setSkinProfile,
    scannedProducts, setScannedProducts,
    pendingUser, setPendingUser,
    activeTab, setActiveTab,
    showAuthModal, setShowAuthModal,
    showLogoutConfirm, setShowLogoutConfirm,
    deleteConfirm, setDeleteConfirm,
    notification, setNotification,
    isNewRegistration, setIsNewRegistration,
    showSuccessPopup, setShowSuccessPopup,
    registeredEmail, setRegisteredEmail,
    otpPurpose, setOtpPurpose,
    notify,
    getDynamicAge, isPopupActive, setIsPopupActive,
    handleTabChange
  };
};
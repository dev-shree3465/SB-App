import { useState, useEffect } from 'react';

const APP_ID = "skinbloom-v1";

export const useCoreLogic = () => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem(`${APP_ID}_user`)) || null);
  const [skinProfile, setSkinProfile] = useState(() => JSON.parse(localStorage.getItem(`${APP_ID}_profile`)) || null);
  const [scannedProducts, setScannedProducts] = useState(() => JSON.parse(localStorage.getItem(`${APP_ID}_scans`)) || []);

  // Memory-only state. Refreshes wipe this. 
  const [pendingUser, setPendingUser] = useState(null);

  const [activeTab, setActiveTab] = useState('DASHBOARD');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [notification, setNotification] = useState(null);
  const [isNewRegistration, setIsNewRegistration] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  // --- PERSISTENCE GATEKEEPER ---
  useEffect(() => {
    // STRICT RULE: If no official user is logged in, DO NOT save anything to user key
    if (user) {
      localStorage.setItem(`${APP_ID}_user`, JSON.stringify(user));
      // Only save profile for officially logged-in users
      if (skinProfile && skinProfile.type && skinProfile.type !== "NONE") {
        localStorage.setItem(`${APP_ID}_profile`, JSON.stringify(skinProfile));
      }
    } else {
      // If user is null (Cases 1, 2, 3), we ensure localStorage is clean
      localStorage.removeItem(`${APP_ID}_user`);
      localStorage.removeItem(`${APP_ID}_profile`);
    }
    localStorage.setItem(`${APP_ID}_scans`, JSON.stringify(scannedProducts));
  }, [user, skinProfile, scannedProducts]);

  const notify = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAuthComplete = (userData, isSignup = false) => {
    if (isSignup) {
      // CASES 1, 2, 3: Zero LocalStorage impact
      setPendingUser(userData);
      setRegisteredEmail(userData.email);
      setIsNewRegistration(true);
      setShowAuthModal(false);

      setUser(null); // Keep official user null
      setSkinProfile(null); // Keep official profile null

      notify("Verification successful! Complete the quiz to finish signup.", "success");
    } else {
      // Normal Login
      setUser(userData);
      setShowAuthModal(false);
      const allProfiles = JSON.parse(localStorage.getItem(`skinbloom_all_profiles`) || "{}");
      if (allProfiles[userData.email]) {
        setSkinProfile(allProfiles[userData.email]);
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

    // CASE 4: The ONLY place data enters the "Database"
    if (isNewRegistration && pendingUser) {
      // 1. Write to All Users List
      const allUsers = JSON.parse(localStorage.getItem(`skinbloom_all_users`) || "{}");
      allUsers[pendingUser.email] = pendingUser;
      localStorage.setItem(`skinbloom_all_users`, JSON.stringify(allUsers));

      // 2. Write to All Profiles List
      const allProfiles = JSON.parse(localStorage.getItem(`skinbloom_all_profiles`) || "{}");
      allProfiles[pendingUser.email] = newProfile;
      localStorage.setItem(`skinbloom_all_profiles`, JSON.stringify(allProfiles));

      setShowSuccessPopup(true);

      setTimeout(() => {
        setShowSuccessPopup(false);
        setIsNewRegistration(false);

        // 3. WIPE ALL TEMPORARY STATE
        setPendingUser(null);
        setUser(null);
        setSkinProfile(null);

        // 4. REDIRECT TO LOGIN
        setShowAuthModal(true);
        setActiveTab('DASHBOARD');
        notify("Account created! Please login to continue.", "success");
      }, 3000);
    } else {
      // Update logic for existing logged-in users
      setSkinProfile(newProfile);
      if (user) {
        const allProfiles = JSON.parse(localStorage.getItem(`skinbloom_all_profiles`) || "{}");
        allProfiles[user.email] = newProfile;
        localStorage.setItem(`skinbloom_all_profiles`, JSON.stringify(allProfiles));
      }
      setActiveTab('PROFILE');
      notify("Profile Updated!", "success");
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
      setUser(null);
    }
    setPendingUser(null);
    setIsNewRegistration(false);
    setShowLogoutConfirm(false);
    notify(wipeAll ? "All data cleared." : "Logged out.", "info");
  };

  const getDynamicAge = () => {
    if (skinProfile?.birthYear) return new Date().getFullYear() - skinProfile.birthYear;
    return user?.age || pendingUser?.age || 0;
  };

  return {
    user, skinProfile, setSkinProfile, scannedProducts, setScannedProducts,
    activeTab, setActiveTab,
    showAuthModal, setShowAuthModal,
    showLogoutConfirm, setShowLogoutConfirm,
    deleteConfirm, setDeleteConfirm,
    notification, setNotification,
    isNewRegistration, setIsNewRegistration, showSuccessPopup,
    registeredEmail, setRegisteredEmail,
    notify, handleAuthComplete, handleQuizComplete,
    handleLogout, getDynamicAge,
    pendingUser
  };
};
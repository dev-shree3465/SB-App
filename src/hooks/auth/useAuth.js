import { useState, useCallback } from 'react';

export const useAuth = (core, initialEmail) => {
  const {
    setActiveTab,
    setUser,
    setSkinProfile,
    setPendingUser,
    setIsNewRegistration,
    setRegisteredEmail,
    setShowAuthModal,
    setScannedProducts,
    setShowLogoutConfirm,
    notify,
    user,
    otpPurpose,
    setOtpPurpose
  } = core;

  const [isNewUser, setIsNewUser] = useState(false);

  const [step, setStep] = useState(otpPurpose === "2FA_TOGGLE" ? 'OTP' : 'AUTH');

  const [otpValue, setOtpValue] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: initialEmail || '',
    password: '',
    confirmPassword: ''
  });

  const toggleAuthMode = useCallback(() => {
    setIsNewUser(prev => !prev);
    setStep('AUTH');
    setFormData(prev => ({
      ...prev,
      password: '',
      confirmPassword: '',
      name: '',
      phone: ''
    }));
  }, []);

  const handleManualToggle = () => {
    if (!isNewUser) {
      setFormData(prev => ({
        name: '', phone: '', email: prev.email,
        password: '', confirmPassword: ''
      }));
    } else {
      setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
    }
    toggleAuthMode();
  };

  const handleAuthComplete = (userData, isSignup = false) => {
    const allProfiles = JSON.parse(localStorage.getItem(`skinbloom_all_profiles`) || "{}");
    const existingProfile = allProfiles[userData.email];

    if (isSignup) {
      setPendingUser(userData);
      setRegisteredEmail(userData.email);
      setIsNewRegistration(true);
      setShowAuthModal(false);
      notify("Verification successful! Complete the quiz to finish signup.", "success");
    } else {
      setUser(userData);
      setShowAuthModal(false);

      if (existingProfile) {
        setSkinProfile(existingProfile);
        setIsNewRegistration(false);
        notify(`Welcome back, ${userData.name}!`, "success");
      } else {
        setIsNewRegistration(true);
      }
    }
  };

  const handleAuthSubmit = (e) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }

    if (!formData.email || !formData.password) {
      notify("Email & Password required", "error");
      return;
    }

    const registeredUsers = JSON.parse(localStorage.getItem("skinbloom_registered_users") || "[]");
    const targetEmail = formData.email.trim().toLowerCase();
    const userExists = registeredUsers.find(u => u.email.toLowerCase() === targetEmail);

    if (isNewUser) {
      if (userExists) {
        notify("Email already registered!", "error");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        notify("Passwords don't match!", "error");
        return;
      }
      setStep('OTP');
      notify("Security Code Sent", "info");
    } else {
      if (!userExists) {
        notify("Account not found!", "error");
        return;
      }
      if (userExists.password !== formData.password) {
        notify("Incorrect password!", "error");
        return;
      }

      if (userExists.twoFactorEnabled) {
        setStep('OTP');
        notify("2FA Required: Code sent to mail", "info");
      } else {
        handleAuthComplete(userExists, false);
      }
    }
  };

  const completeAuthFlow = () => {
    if (otpPurpose === "2FA_TOGGLE") {
      const updatedUser = { ...user, twoFactorEnabled: !user?.twoFactorEnabled };
      setUser(updatedUser);

      const registeredUsers = JSON.parse(localStorage.getItem("skinbloom_registered_users") || "[]");
      const updatedList = registeredUsers.map(u =>
        u.email.toLowerCase() === user.email.toLowerCase() ? updatedUser : u
      );
      localStorage.setItem("skinbloom_registered_users", JSON.stringify(updatedList));

      setShowAuthModal(false);
      setStep('AUTH');
      if (setOtpPurpose) setOtpPurpose("AUTH");
      notify(updatedUser.twoFactorEnabled ? "2FA Enabled!" : "2FA Disabled!", "success");
      return;
    }

    if (isNewUser) {
      const newUser = {
        ...formData,
        id: Date.now(),
        name: formData.name || formData.email.split('@')[0],
        joinDate: new Date().toISOString(),
        age: null,
        twoFactorEnabled: false
      };
      setPendingUser(newUser);
      handleAuthComplete(newUser, true);
    } else {
      const registeredUsers = JSON.parse(localStorage.getItem("skinbloom_registered_users") || "[]");
      const userExists = registeredUsers.find(u => u.email.toLowerCase() === formData.email.toLowerCase());
      handleAuthComplete(userExists, false);
    }
  };

  const handleVerifyOTP = (e) => {
    if (e) e.preventDefault();
    if (otpValue === '123456') {
      notify("Verified!", "success");
      completeAuthFlow();
      setOtpValue('');
    } else {
      notify("Invalid Code", "error");
    }
  };

  const handleLogout = (wipeAll = false) => {
    if (wipeAll) {
      localStorage.clear();
      setSkinProfile(null);
      setScannedProducts([]);
      setUser(null);
      setRegisteredEmail("");
      setIsNewRegistration(true);
    } else {
      setUser(null);
      setIsNewRegistration(false);
    }
    setActiveTab('DASHBOARD');
    setShowLogoutConfirm(false);
    notify(wipeAll ? "All data cleared." : "Logged out.", "info");
  };

  return {
    isNewUser, step, setStep,
    otpValue, setOtpValue,
    formData, setFormData,
    handleManualToggle, handleAuthSubmit,
    handleVerifyOTP, handleLogout
  };
};
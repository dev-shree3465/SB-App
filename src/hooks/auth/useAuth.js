import { useState, useCallback } from 'react';

export const useAuth = (onLogin, notify, initialEmail) => {
  // 1. Initialize isNewUser: If we have an initialEmail, start in Login mode (false)
  const [isNewUser, setIsNewUser] = useState(() => {
    return initialEmail ? false : false; // Defaults to Login if pre-filling
  });

  const [step, setStep] = useState('AUTH');
  const [otpValue, setOtpValue] = useState('');

  // 2. Initialize formData: Pre-fill the email immediately if it exists
  const [formData, setFormData] = useState(() => ({
    name: '',
    phone: '',
    email: initialEmail || '', // Pre-fill logic moved here
    password: '',
    confirmPassword: ''
  }));

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
        name: '',
        phone: '',
        email: prev.email,
        password: '',
        confirmPassword: ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        password: '',
        confirmPassword: ''
      }));
    }
    toggleAuthMode();
  };

  const handleAuthSubmit = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

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
      onLogin(userExists, false);
    }
  };

  const completeAuthFlow = () => {
    const newUser = {
      ...formData,
      id: Date.now(),
      name: formData.name || formData.email.split('@')[0],
      joinDate: new Date().toISOString(),
      age: null
    };
    const registeredUsers = JSON.parse(localStorage.getItem("skinbloom_registered_users") || "[]");
    localStorage.setItem("skinbloom_registered_users", JSON.stringify([...registeredUsers, newUser]));
    onLogin(newUser, true);
  };

  const handleVerifyOTP = (e) => {
    if (e) e.preventDefault();
    if (otpValue === '123456') {
      notify("Verified!", "success");
      completeAuthFlow();
    } else {
      notify("Invalid Code", "error");
    }
  };

  return {
    isNewUser,
    step,
    setStep,
    otpValue,
    setOtpValue,
    formData,
    setFormData,
    handleManualToggle,
    handleAuthSubmit,
    handleVerifyOTP
  };
};
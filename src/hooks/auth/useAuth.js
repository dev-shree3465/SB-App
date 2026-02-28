import { useState } from 'react';

export const useAuth = (onLogin, notify) => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [step, setStep] = useState('AUTH');
  const [otpValue, setOtpValue] = useState('');
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', password: '', confirmPassword: ''
  });

  const toggleAuthMode = () => {
    setIsNewUser(!isNewUser);
    setStep('AUTH');
    setFormData({ name: '', phone: '', email: '', password: '', confirmPassword: '' });
  };

  const handleAuthSubmit = (e) => {
    if (e) e.preventDefault();
    if (!formData.email || !formData.password) return notify("Email & Password required", "error");

    const registeredUsers = JSON.parse(localStorage.getItem("skinbloom_registered_users") || "[]");
    const userExists = registeredUsers.find(u => u.email === formData.email);

    if (isNewUser) {
      if (userExists) return notify("Email already registered!", "error");
      if (formData.password !== formData.confirmPassword) return notify("Passwords don't match!", "error");
      setStep('OTP');
      notify("Security Code Sent", "info");
    } else {
      if (!userExists) return notify("Account not found!", "error");
      if (userExists.password !== formData.password) return notify("Incorrect password!", "error");
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
    toggleAuthMode,
    handleAuthSubmit,
    handleVerifyOTP
  };
};
import { useState } from 'react';

export const useQuiz = (core, initialAge) => {
  const {
    setUser, setSkinProfile, setPendingUser, pendingUser, user,
    setIsNewRegistration, setShowSuccessPopup, setActiveTab, notify
  } = core;

  const [birthDate, setBirthDate] = useState('');
  const [showAgeStep, setShowAgeStep] = useState(initialAge === null || initialAge === 0);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [calculatedAge, setCalculatedAge] = useState(initialAge || null);
  const [showSummary, setShowSummary] = useState(false);

  const validateAndSetAge = (dobString) => {
    const today = new Date();
    const birthDateObj = new Date(dobString);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) age--;

    if (age < 0 || age > 100) {
      notify?.("Please enter a valid birth year.", "error");
      return null;
    }
    setCalculatedAge(age);
    return age;
  };

  const handleAnswer = (option) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = option;
    setAnswers(newAnswers);

    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(7);
      setTimeout(() => {
        setShowSummary(true);
      }, 700);
    }
  };

  const handleBack = () => { if (currentStep > 0) setCurrentStep(currentStep - 1); };

  const handleSummaryBack = () => {
    setShowSummary(false);
    setCurrentStep(6);
  };

  const confirmFinalResults = () => {
    const totalPoints = answers.reduce((sum, ans) => sum + (ans.points || 0), 0);
    const hasSensitive = answers.some(ans => ans.isSensitive);

    let finalType = "";
    if (hasSensitive) finalType = "Sensitive";
    else if (totalPoints >= 18) finalType = "Oily";
    else if (totalPoints >= 12) finalType = "Combination";
    else if (totalPoints >= 7) finalType = "Normal";
    else finalType = "Dry";


    const newProfile = {
      type: finalType,
      birthYear: new Date().getFullYear() - (calculatedAge || initialAge),
      date: new Date().toISOString()
    };

    setSkinProfile(newProfile);

    const targetEmail = user?.email || pendingUser?.email;

    if (targetEmail) {
      const allProfiles = JSON.parse(localStorage.getItem(`skinbloom_all_profiles`) || "{}");
      allProfiles[targetEmail] = newProfile;
      localStorage.setItem(`skinbloom_all_profiles`, JSON.stringify(allProfiles));

      const registeredUsers = JSON.parse(localStorage.getItem("skinbloom_registered_users") || "[]");

      if (pendingUser) {
        const finalUser = { ...pendingUser, age: calculatedAge };
        localStorage.setItem("skinbloom_registered_users", JSON.stringify([...registeredUsers, finalUser]));

        setUser(finalUser);
        setPendingUser(null);
        setShowSuccessPopup(true);

        setTimeout(() => {
          setShowSuccessPopup(false);
          setIsNewRegistration(false);
          setActiveTab('DASHBOARD');
        }, 3000);
      } else {
        const updatedUsers = registeredUsers.map(u => {
          if (u.email.toLowerCase() === targetEmail.toLowerCase()) {
            return { ...u, age: calculatedAge || initialAge };
          }
          return u;
        });
        localStorage.setItem("skinbloom_registered_users", JSON.stringify(updatedUsers));

        setUser(prev => ({ ...prev, age: calculatedAge || initialAge }));
        setShowSuccessPopup(true);

        setTimeout(() => {
          setShowSuccessPopup(false);
          setIsNewRegistration(false);
          setActiveTab('PROFILE');
        }, 3000);
      }
    }
  };

  return {
    birthDate, setBirthDate, showAgeStep, setShowAgeStep,
    currentStep, handleAnswer, handleBack, handleSummaryBack,
    validateAndSetAge, calculatedAge, showSummary, answers, confirmFinalResults,
    progress: (currentStep / 7) * 100
  };
};
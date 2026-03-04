export const useProfile = (core = {}) => {
  const {
    user = null,
    skinProfile = null,
    setSkinProfile = () => { },
    setIsNewRegistration = () => { },
    notify = () => { }
  } = core;

  const isLoggedIn = !!user;

  // FIXED: Prioritize user.age if it exists (edited in settings) 
  // then fallback to birthYear calculation.
  const getAge = () => {
    if (user?.age) return user.age;
    if (skinProfile?.birthYear) return new Date().getFullYear() - skinProfile.birthYear;
    return 0;
  };

  const handleResetProfile = () => {
    if (!user) return;

    // 1. Remove ONLY the skin analysis from the global profiles storage
    const allProfiles = JSON.parse(localStorage.getItem(`skinbloom_all_profiles`) || "{}");
    delete allProfiles[user.email];
    localStorage.setItem(`skinbloom_all_profiles`, JSON.stringify(allProfiles));

    // 2. Clear the local skinProfile state
    setSkinProfile(null);

    // 3. IMPORTANT: Set registration flag to true to trigger the Quiz
    setIsNewRegistration(true);

    notify("Profile Reset! Retake the quiz.", "info");
  };

  // Variables for UI display
  const displayName = isLoggedIn ? (user.name || "User") : "Guest User";
  const displayAge = isLoggedIn ? getAge() : "0";
  const userId = isLoggedIn && user.id ? `SKIN-${user.id.toString().slice(-4)}` : "Not Available";
  const displayEmail = isLoggedIn ? (user.email || "Email not linked") : "Email not linked";
  const displayPhone = isLoggedIn ? (user.phone || "Phone not linked") : "Phone not linked";

  let typeValue = "NONE";
  if (isLoggedIn && skinProfile) {
    typeValue = skinProfile.type || skinProfile.skinType || "NONE";
  }

  return {
    displayName,
    displayAge,
    userId,
    displayEmail,
    displayPhone,
    displaySkinType: typeValue.toUpperCase(),
    isLoggedIn,
    handleResetProfile,
    getAge
  };
};
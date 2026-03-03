export const useProfile = (core = {}) => {
  const { 
    // user, skinProfile, setSkinProfile, setIsNewRegistration, notify 
    user = null,
    skinProfile = null,
    setSkinProfile = () => { },
    setIsNewRegistration = () => { },
    notify = () => { }
  } = core;

  const isLoggedIn = !!user;

  // Formatting Logics
  const displayName = isLoggedIn ? user.name : "Guest User";
  const displayAge = isLoggedIn ? (core.getDynamicAge()) : "0";
  const userId = isLoggedIn && user.id ? `SKIN-${user.id.toString().slice(-4)}` : "Not Available";
  const displayEmail = isLoggedIn ? (user.email || "Email not linked") : "Email not linked";
  const displayPhone = isLoggedIn ? (user.phone || "Phone not linked") : "Phone not linked";

  let typeValue = "NONE";
  if (isLoggedIn && skinProfile) {
    typeValue = skinProfile.type || skinProfile.skinType || "NONE";
  }

  // RESET PROFILE LOGIC (Migrated from Core)
  const handleResetProfile = () => {
    if (!user) return;

    // 1. Remove from global storage
    const allProfiles = JSON.parse(localStorage.getItem(`skinbloom_all_profiles`) || "{}");
    delete allProfiles[user.email];
    localStorage.setItem(`skinbloom_all_profiles`, JSON.stringify(allProfiles));

    // 2. Clear current state
    setSkinProfile(null);

    // 3. TRIGGER RESET BUG FIX: Set isNewRegistration to true so Quiz shows up
    setIsNewRegistration(true);

    notify("Profile Reset! Please retake the quiz.", "info");
  };

  return {
    displayName,
    displayAge,
    userId,
    displayEmail,
    displayPhone,
    displaySkinType: typeValue.toUpperCase(),
    isLoggedIn,
    handleResetProfile // Export this for the UI
  };
};
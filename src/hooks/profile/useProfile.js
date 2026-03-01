export const useProfile = (user, skinType) => {
  const isLoggedIn = !!user;

  // 1. Name Logic
  const displayName = isLoggedIn ? user.name : "Guest User";

  // 2. Age Logic
  const displayAge = isLoggedIn ? user.age : "0";

  // 3. ID Logic
  const userId = isLoggedIn && user.id
    ? `SKIN-${user.id.toString().slice(-4)}`
    : "Not Available";

  // 4. Contact Logic
  const displayEmail = isLoggedIn ? (user.email || "Email not linked") : "Email not linked";
  const displayPhone = isLoggedIn ? (user.phone || "Phone not linked") : "Phone not linked";

  // 5. Skin Type Logic
  let typeValue = "NONE";
  if (isLoggedIn && skinType) {
    if (typeof skinType === 'object') {
      typeValue = skinType.type || skinType.skinType || "NONE";
    } else {
      typeValue = skinType;
    }
  }

  return {
    displayName,
    displayAge,
    userId,
    displayEmail,
    displayPhone,
    displaySkinType: typeValue.toUpperCase(),
    isLoggedIn
  };
};
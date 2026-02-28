import { useState } from 'react';

export const useProfile = (skinType) => {
  // Generate a persistent ID for the session
  const [userId] = useState(() => `SKIN-${Math.floor(Math.random() * 9000) + 1000}`);

  // Ensure we always get the string value of the skin type
  const displaySkinType = typeof skinType === 'object' ? skinType.skinType : skinType;

  return {
    userId,
    displaySkinType
  };
};
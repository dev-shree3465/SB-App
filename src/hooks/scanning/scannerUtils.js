import { SAFETY_DATABASE } from '../../data/safety_dictionary';

const ALL_POSSIBLE_INGREDIENTS = [
  "Aqua", "Glycerin", "Ceramides", "Hyaluronic Acid",
  "Parabens", "Fragrance", "Phthalates",
  "Alcohol Denat", "Salicylic Acid", "Retinol"
];

export const getRandomIngredients = () => {
  return [...ALL_POSSIBLE_INGREDIENTS]
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.floor(Math.random() * 4) + 3);
};

export const calculateDaysLeft = (expiryDate) => {
  if (!expiryDate) return "";
  const today = new Date();
  const exp = new Date(expiryDate);
  today.setHours(0, 0, 0, 0);
  const diffTime = exp - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays >= 0 ? ` (${diffDays} days left)` : ` (EXPIRED)`;
};

export const getSafetyProfile = (ingredients, skinType, dateStr) => {
  const safetyStatus = SAFETY_DATABASE.getStatus(ingredients, skinType);
  const daysLeftLabel = dateStr ? calculateDaysLeft(dateStr) : "";

  return {
    status: safetyStatus,
    expiryLabel: dateStr ? `${dateStr}${daysLeftLabel}` : "No Date Provided"
  };
};
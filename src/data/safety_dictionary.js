// src/data/safety_dictionary.js

export const SAFETY_DATABASE = {
  // Harmful or Irritating Ingredients
  harmful: [
    { name: "Parabens", risk: "RED", reason: "Endocrine disruptor" },
    { name: "Formaldehyde", risk: "RED", reason: "Carcinogenic" },
    { name: "Sodium Lauryl Sulfate", alias: ["SLS"], risk: "YELLOW", reason: "Strong skin irritant" },
    { name: "Fragrance", alias: ["Parfum"], risk: "YELLOW", reason: "Common allergen trigger" },
    { name: "Phthalates", risk: "RED", reason: "Hormonal interference" },
    { name: "Oxybenzone", risk: "YELLOW", reason: "High skin absorption/allergy" },
  ],

  // Specific triggers for Sensitive Skin (SkinQuiz connection)
  sensitiveTriggers: [
    "Alcohol Denat",
    "Essential Oils",
    "Citric Acid",
    "Salicylic Acid", // High concentration
    "Retinol",        // If used during day/sensitive
    "Witch Hazel"
  ],

  // Safety Status Logic
  getStatus: (ingredients, userSkinType) => {
    // Pure Logic: Checks scanned text against the database above
    // No UI changes here.
    let score = 0;
    const foundHarmful = [];

    ingredients.forEach(ing => {
      const match = SAFETY_DATABASE.harmful.find(h =>
        h.name.toLowerCase() === ing.toLowerCase() ||
        h.alias?.some(a => a.toLowerCase() === ing.toLowerCase())
      );

      if (match) {
        if (match.risk === "RED") score += 10;
        if (match.risk === "YELLOW") score += 5;
        foundHarmful.push(match.name);
      }

      // Special check for user's skin type from SkinQuiz
      if (userSkinType === "Sensitive" && SAFETY_DATABASE.sensitiveTriggers.includes(ing)) {
        score += 7;
      }
    });

    if (score >= 15) return "RED";
    if (score >= 5) return "YELLOW";
    return "GREEN";
  }
};
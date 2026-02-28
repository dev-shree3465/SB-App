import { useState } from 'react';

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "How does your skin feel midday (approx. 2:00 PM)?",
    options: [
      { label: "Oily / Shiny all over", points: 3, code: 'A' },
      { label: "Oily in T-zone, dry on cheeks", points: 2, code: 'B' },
      { label: "Rough, flaky or tight", points: 1, code: 'C' },
      { label: "Comfortable and balanced", points: 0, code: 'D' }
    ]
  },
  {
    id: 2,
    question: "After washing, how does it feel 15 minutes later?",
    options: [
      { label: "Greasy/Oily", points: 3, code: 'A' },
      { label: "Tight and dry", points: 1, code: 'B' },
      { label: "Oily only in the T-zone", points: 2, code: 'C' },
      { label: "Normal", points: 0, code: 'D' }
    ]
  },
  {
    id: 3,
    question: "How often do you experience breakouts or acne?",
    options: [
      { label: "Frequently", points: 3, code: 'A' },
      { label: "Occasionally in oily areas", points: 2, code: 'B' },
      { label: "Rarely", points: 0, code: 'C' },
      { label: "Often with redness/burning", points: 4, code: 'D', isSensitive: true }
    ]
  },
  {
    id: 4,
    question: "Look in the mirror—how would you describe your pores?",
    options: [
      { label: "Large and visible all over", points: 3, code: 'A' },
      { label: "Large only on nose/forehead", points: 2, code: 'B' },
      { label: "Small/Invisible", points: 1, code: 'C' },
      { label: "Average size", points: 0, code: 'D' }
    ]
  },
  {
    id: 5,
    question: "How does your skin react to new products or fragrance?",
    options: [
      { label: "Stings, turns red or itches", points: 4, code: 'A', isSensitive: true },
      { label: "No negative reaction", points: 0, code: 'B' },
      { label: "Sometimes gets dry", points: 1, code: 'C' }
    ]
  },
  {
    id: 6,
    question: "In cold weather, what happens to your skin?",
    options: [
      { label: "Becomes very dry/flaky", points: 1, code: 'A' },
      { label: "Stays oily but feels tight", points: 2, code: 'B' },
      { label: "No major change", points: 0, code: 'C' }
    ]
  },
  {
    id: 7,
    question: "Morning tissue test: what do you see on the tissue?",
    options: [
      { label: "Oil on the whole tissue", points: 3, code: 'A' },
      { label: "Oil only from nose/forehead", points: 2, code: 'B' },
      { label: "Nothing at all", points: 1, code: 'C' },
      { label: "Very minimal spots", points: 0, code: 'D' }
    ]
  }
];

export const useSkinQuiz = (onComplete, initialAge) => {
  const [birthDate, setBirthDate] = useState('');
  const [showAgeStep, setShowAgeStep] = useState(!initialAge);
  const [currentStep, setCurrentStep] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [hasSensitiveTrigger, setHasSensitiveTrigger] = useState(false);

  const calculateAgeData = (dob) => {
    const today = new Date();
    const birthDateObj = new Date(dob);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    return { age, birthYear: birthDateObj.getFullYear() };
  };

  const handleAnswer = (option) => {
    const newPoints = totalPoints + (option.points || 0);
    const isSensitive = hasSensitiveTrigger || option.isSensitive;

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setTotalPoints(newPoints);
      setHasSensitiveTrigger(isSensitive);
      setCurrentStep(currentStep + 1);
    } else {
      let finalType = "";
      if (isSensitive) finalType = "Sensitive";
      else if (newPoints >= 18) finalType = "Oily";
      else if (newPoints >= 12) finalType = "Combination";
      else if (newPoints >= 7) finalType = "Normal";
      else finalType = "Dry";

      const ageData = birthDate
        ? calculateAgeData(birthDate)
        : { age: initialAge, birthYear: new Date().getFullYear() - initialAge };

      onComplete({
        skinType: finalType,
        age: ageData.age,
        birthYear: ageData.birthYear
      });
    }
  };

  return {
    birthDate, setBirthDate,
    showAgeStep, setShowAgeStep,
    currentStep,
    handleAnswer,
    progress: (currentStep / QUIZ_QUESTIONS.length) * 100
  };
};
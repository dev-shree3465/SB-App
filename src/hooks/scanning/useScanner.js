import { useState } from 'react';
import { SAFETY_DATABASE } from '../../data/safety_dictionary';

export const useScanner = (onScanComplete, skinType, notify) => {
  const [scanStep, setScanStep] = useState('CHOICE');
  const [scanMethod, setScanMethod] = useState(null);
  const [capturedImages, setCapturedImages] = useState({ front: null, back: null, expiry: null });
  const [manualDate, setManualDate] = useState('');
  const [knowExpiry, setKnowExpiry] = useState(null);

  const calculateDaysLeft = (expiryDate) => {
    if (!expiryDate) return "";
    const today = new Date();
    const exp = new Date(expiryDate);
    today.setHours(0, 0, 0, 0);
    const diffTime = exp - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 ? ` (${diffDays} days left)` : ` (EXPIRED)`;
  };

  const processFinalResults = (dateStr) => {
    setScanStep('PROCESSING');

    // Mock Data - In the future, this will come from an AI/OCR Backend
    const detectedIngredients = ["Fragrance", "Ceramides", "Parabens", "Aqua"];

    const safetyStatus = SAFETY_DATABASE.getStatus(detectedIngredients, skinType);
    const daysLeftLabel = dateStr ? calculateDaysLeft(dateStr) : "";

    setTimeout(() => {
      onScanComplete({
        name: "Scanned Product",
        status: safetyStatus,
        ingredients: detectedIngredients,
        expiry: dateStr ? `${dateStr}${daysLeftLabel}` : "No Date Provided",
      });
      resetScanner();
    }, 2000);
  };

  const handleAction = (type) => {
    if (scanMethod === 'CAMERA') {
      if (type === 'front') {
        setCapturedImages(prev => ({ ...prev, front: 'dummy' }));
        notify("Front label captured", "success");
      } else if (type === 'back') {
        setCapturedImages(prev => ({ ...prev, back: 'dummy' }));
        if (knowExpiry === 'NO') {
          notify("Ingredients captured", "success");
          processFinalResults(manualDate);
        }
      } else if (type === 'expiry') {
        processFinalResults(manualDate);
      }
    }
  };
  
  const handleUpload = (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (type === 'front') {
      setCapturedImages(prev => ({ ...prev, front: file }));
      notify("Front label uploaded", "success");
    } else if (type === 'back') {
      setCapturedImages(prev => ({ ...prev, back: file }));
      notify("Ingredients captured", "success");
      if (knowExpiry === 'NO') processFinalResults(manualDate);
    } else if (type === 'expiry') {
      processFinalResults(manualDate);
    }
  };

  const resetScanner = () => {
    setScanStep('CHOICE');
    setScanMethod(null);
    setManualDate('');
    setKnowExpiry(null);
    setCapturedImages({ front: null, back: null, expiry: null });
  };

  return {
    scanStep, setScanStep,
    scanMethod, setScanMethod,
    capturedImages,
    manualDate, setManualDate,
    knowExpiry, setKnowExpiry,
    handleAction, handleUpload, resetScanner
  };
};
import { useState } from 'react';
import { getRandomIngredients, getSafetyProfile } from './scannerUtils';

export const useScanner = (onScanComplete, skinType, notify) => {
  const [scanStep, setScanStep] = useState('CHOICE');
  const [scanMethod, setScanMethod] = useState(null);
  const [manualDate, setManualDate] = useState('');
  const [knowExpiry, setKnowExpiry] = useState(null);
  const [capturedImages, setCapturedImages] = useState({
    front: null,
    back: null,
    expiry: null
  });

  const processFinalResults = (dateStr) => {
    setScanStep('PROCESSING');

    // Utility logic calling
    const detectedIngredients = getRandomIngredients();
    const { status, expiryLabel } = getSafetyProfile(detectedIngredients, skinType, dateStr);

    setTimeout(() => {
      onScanComplete({
        name: "Scanned Product",
        status: status,
        ingredients: detectedIngredients,
        expiry: expiryLabel,
        date: new Date().toISOString()
      });
      setScanStep('IDLE');
    }, 2000);
  };

  const handleAction = (type) => {
    if (scanMethod !== 'CAMERA') return;

    const newImages = { ...capturedImages, [type]: 'dummy' };
    setCapturedImages(newImages);

    if (type === 'front') {
      notify("Front label captured", "success");
    } else if (type === 'back' && knowExpiry === 'NO') {
      notify("Ingredients captured", "success");
      processFinalResults(manualDate);
    } else if (type === 'expiry') {
      processFinalResults(manualDate);
    }
  };

  const handleUpload = (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCapturedImages(prev => ({ ...prev, [type]: file }));

    if (type === 'front') {
      notify("Front label uploaded", "success");
    } else {
      notify(`${type === 'back' ? 'Ingredients' : 'Expiry'} captured`, "success");
      if (type === 'expiry' || (type === 'back' && knowExpiry === 'NO')) {
        processFinalResults(manualDate);
      }
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
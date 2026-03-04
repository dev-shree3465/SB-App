import { useState, useEffect } from 'react';
import { getRandomIngredients, getSafetyProfile } from './scannerUtils';

export const useScanner = (core, onScanComplete) => {
  const { skinProfile, notify, setIsPopupActive } = core;

  // --- INTERNAL SCANNER STATE ---
  const [scanStep, setScanStep] = useState('CHOICE');
  const [scanMethod, setScanMethod] = useState(null);
  const [manualDate, setManualDate] = useState('');
  const [knowExpiry, setKnowExpiry] = useState(null);
  const [scanResult, setScanResult] = useState(null); // Moved here
  const [capturedImages, setCapturedImages] = useState({
    front: null,
    back: null,
    expiry: null
  });

  // --- UI LOCKING LOGIC ---
  useEffect(() => {
    setIsPopupActive(!!scanResult);
    return () => setIsPopupActive(false);
  }, [scanResult, setIsPopupActive]);

  const processFinalResults = (dateStr) => {
    setScanStep('PROCESSING');
    const detectedIngredients = getRandomIngredients();
    const { status, expiryLabel } = getSafetyProfile(detectedIngredients, skinProfile?.type, dateStr);

    setTimeout(() => {
      setScanResult({
        name: `Product ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
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
    setCapturedImages(prev => ({ ...prev, [type]: 'dummy' }));

    if (type === 'front') {
      notify?.("Front label captured", "success");
    } else if (type === 'back') {
      notify?.("Ingredients captured", "success");
      if (knowExpiry === 'NO') processFinalResults(manualDate);
    } else if (type === 'expiry') {
      notify?.("Expiry date captured", "success");
      processFinalResults(manualDate);
    }
  };

  const handleUpload = (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCapturedImages(prev => ({ ...prev, [type]: file }));

    if (type === 'front') {
      notify?.("Front label uploaded", "success");
    } else if (type === 'back') {
      notify?.("Ingredients uploaded", "success");
      if (knowExpiry === 'NO') processFinalResults(manualDate);
    } else if (type === 'expiry') {
      notify?.("Expiry label uploaded", "success");
      processFinalResults(manualDate);
    }
  };

  const handleFinalSave = () => {
    onScanComplete(scanResult);
    setScanResult(null);
    resetScanner();
  };

  const handleDiscard = () => {
    setScanResult(null);
    resetScanner();
    setScanStep('CHOICE');
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
    scanResult, // Exported for the ResultCard
    handleAction, handleUpload, handleFinalSave, handleDiscard, resetScanner
  };
};
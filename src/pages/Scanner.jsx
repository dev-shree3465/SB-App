import { useState, useEffect } from 'react';
import { useScanner } from '../hooks/scanning/useScanner';
import { ScannerSteps } from '../components/scanning/ScannerSteps';
import { ExpiryDate } from '../components/scanning/ExpiryDate';
import { CameraInterface } from '../components/scanning/CameraInterface';
import { ResultCard } from '../components/scanning/ResultCard';

export const Scanner = ({ onScanComplete, skinType, notify, onResultPopup }) => {
  const [scanResult, setScanResult] = useState(null);

  const {
    scanStep, setScanStep,
    scanMethod, setScanMethod,
    capturedImages,
    manualDate, setManualDate,
    knowExpiry, setKnowExpiry,
    handleAction, handleUpload, resetScanner
  } = useScanner(
    (res) => setScanResult(res),
    skinType,
    notify
  );

  useEffect(() => {
    onResultPopup(!!scanResult);
  }, [scanResult, onResultPopup]);

  const handleFinalSave = () => {
    onScanComplete(scanResult);
    setScanResult(null);
    resetScanner();
    onResultPopup(false);
  };

  const handleDiscard = () => {
    setScanResult(null);
    resetScanner();
    setScanStep('CHOICE');
    onResultPopup(false);
  };

  return (
    <div className="max-w-2xl mx-auto min-h-[400px] relative px-2">
      {/* 1. Initial Choice & Method Selection */}
      {(scanStep === 'CHOICE' || scanStep === 'METHOD_SELECT') && (
        <ScannerSteps
          scanStep={scanStep}
          setScanStep={setScanStep}
          setScanMethod={setScanMethod}
          skinType={skinType}
        />
      )}

      {/* 2. Quick Log / Expiry Logic */}
      {scanStep === 'QUICK_LOG_DATE' && (
        <ExpiryDate
          knowExpiry={knowExpiry}
          setKnowExpiry={setKnowExpiry}
          manualDate={manualDate}
          setManualDate={setManualDate}
          setScanStep={setScanStep}
          resetScanner={resetScanner}
        />
      )}

      {/* 3. Scanning & Processing Interface */}
      {(scanStep === 'SCAN_START' || scanStep === 'PROCESSING') && (
        <CameraInterface
          scanStep={scanStep}
          scanMethod={scanMethod}
          capturedImages={capturedImages}
          handleAction={handleAction}
          handleUpload={handleUpload}
          resetScanner={resetScanner}
        />
      )}

      {/* 4. Result Popup with Lock logic */}
      {scanResult && (
        <ResultCard
          result={scanResult}
          onClose={handleDiscard}
          onSave={handleFinalSave}
        />
      )}
    </div>
  );
};
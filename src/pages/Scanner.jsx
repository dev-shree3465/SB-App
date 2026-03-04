import { useScanner } from '../hooks/scanning/useScanner';
import { ScannerSteps } from '../components/scanning/ScannerSteps';
import { ExpiryDate } from '../components/scanning/ExpiryDate';
import { CameraInterface } from '../components/scanning/CameraInterface';
import { ResultCard } from '../components/scanning/ResultCard';

export const Scanner = ({ core, onScanComplete }) => {
  const {
    scanStep, setScanStep,
    scanMethod, setScanMethod,
    capturedImages,
    manualDate, setManualDate,
    knowExpiry, setKnowExpiry,
    scanResult,
    handleAction, handleUpload, handleFinalSave, handleDiscard, resetScanner
  } = useScanner(core, onScanComplete);

  return (
    <div className="max-w-2xl mx-auto min-h-[400px] relative px-2">
      {/* 1. INITIAL STEPS */}
      {(scanStep === 'CHOICE' || scanStep === 'METHOD_SELECT') && (
        <ScannerSteps
          scanStep={scanStep}
          setScanStep={setScanStep}
          setScanMethod={setScanMethod}
          skinType={core.skinProfile?.type}
        />
      )}

      {/* 2. EXPIRY LOGGING */}
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

      {/* 3. CAPTURE INTERFACE */}
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

      {/* 4. RESULT POPUP */}
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
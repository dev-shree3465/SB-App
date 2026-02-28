import { useScanner } from '../../hooks/scanning/useScanner';
import { ScannerSteps } from './ScannerSteps';
import { ExpiryDate } from './ExpiryDate';
import { CameraInterface } from './CameraInterface';

export const Scanner = ({ onScanComplete, skinType, notify }) => {
  const {
    scanStep, setScanStep,
    scanMethod, setScanMethod,
    capturedImages,
    manualDate, setManualDate,
    knowExpiry, setKnowExpiry,
    handleAction, handleUpload, resetScanner
  } = useScanner(onScanComplete, skinType, notify);

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

    </div>
  );
};
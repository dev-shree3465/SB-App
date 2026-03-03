import { SafetyChart } from '../components/dashboard/SafetyChart';
import { ProductTable } from '../components/vault/ProductTable';
import { PlusCircle, ChevronRight } from 'lucide-react'; 

export const Dashboard = ({ core }) => {
  const { user, scannedProducts, setActiveTab, setShowAuthModal, setDeleteConfirm } = core;

  const handleProtectedAction = (e, callback) => {
    if (!user) {
      e.stopPropagation();
      setShowAuthModal(true);
    } else if (callback) {
      callback();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-500">

      <div className="lg:col-span-4" onClick={(e) => handleProtectedAction(e)}>
        <div className={!user ? "pointer-events-none opacity-60 grayscale blur-[1px]" : ""}>
          <SafetyChart
            products={scannedProducts}
            onNavigate={() => setActiveTab('VAULT')}
          />
        </div>
      </div>

      <div className="lg:col-span-8" onClick={(e) => handleProtectedAction(e)}>
        <div className={!user ? "pointer-events-none opacity-60 grayscale blur-[1px]" : ""}>

          <div className="flex items-center justify-between px-6 mb-4">
            <h3 className="text-lg font-black text-slate-800 uppercase tracking-tighter italic">
              Recent Scans
              {scannedProducts.length > 0 && (
                <span className='ml-2 text-[10px] text-slate-400 normal-case font-medium'>
                  Last 3 Scans
                </span>
              )}
            </h3>

            {scannedProducts.length > 0 && (
              <button
                onClick={(e) => handleProtectedAction(e, () => setActiveTab('VAULT'))}
                className="p-2 hover:bg-slate-50 rounded-full transition-colors group"
              >
                <ChevronRight size={20} className="text-slate-400 group-hover:text-pink-500 transition-colors" />
              </button>
            )}
          </div>

          {scannedProducts.length > 0 ? (
            <ProductTable
              products={scannedProducts.slice(0, 3)}
              onDelete={(idx) => setDeleteConfirm({ idx, name: scannedProducts[idx].name })}
              showTitle={false}
              onNavigate={() => setActiveTab('VAULT')}
            />
          ) : (
            <button
              onClick={(e) => handleProtectedAction(e, () => setActiveTab('SCAN'))}
              className="w-full py-12 bg-white border-2 border-dashed border-slate-100 rounded-[2.5rem] flex flex-col items-center justify-center gap-3 group hover:border-pink-200 transition-colors"
            >
              <div className="p-3 bg-slate-50 rounded-2xl text-slate-400 group-hover:bg-pink-50 group-hover:text-pink-400 transition-colors">
                <PlusCircle size={24} />
              </div>
              <div className="text-center">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">No scans yet</p>
                <p className="text-[9px] font-bold uppercase text-slate-400 italic">Tap to start scanning</p>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
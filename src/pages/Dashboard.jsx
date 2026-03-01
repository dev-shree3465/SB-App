import { SafetyChart } from '../components/dashboard/SafetyChart';
import { ProductTable } from '../components/vault/ProductTable';
import { PlusCircle } from 'lucide-react';

export const Dashboard = ({ core }) => {
  const { user, scannedProducts, setActiveTab, setShowAuthModal, setDeleteConfirm } = core;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-500">
      {/* Left side: Safety Chart */}
      <div className="lg:col-span-4" onClick={() => !user && setShowAuthModal(true)}>
        <div className={!user ? "pointer-events-none opacity-60 grayscale blur-[1px]" : ""}>
          <SafetyChart
            products={scannedProducts}
            onNavigate={() => user ? setActiveTab('VAULT') : setShowAuthModal(true)}
          />
        </div>
      </div>

      <div className="lg:col-span-8" onClick={() => !user && setShowAuthModal(true)}>
        <div className={!user ? "pointer-events-none opacity-60 grayscale blur-[1px]" : ""}>

          {scannedProducts.length > 0 ? (
            /* Case 1: If products exist, show table */
            <ProductTable
              products={scannedProducts.slice(0, 3)}
              onDelete={(idx) => setDeleteConfirm({ idx, name: scannedProducts[idx].name })}
              showTitle={true}
              onNavigate={() => user ? setActiveTab('VAULT') : setShowAuthModal(true)}
            />
          ) : (
            /* Case 2: If no products, show a clean Recent Scans header with a placeholder */
            <div className="space-y-4">
              <div className="flex items-center justify-between px-6">
                <h3 className="text-lg font-black text-slate-800 uppercase tracking-tighter italic">
                  Recent Scans
                </h3>
              </div>

              <button
                onClick={() => setActiveTab('SCAN')}
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
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
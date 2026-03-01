import { Filter, SortDesc, ShieldCheck } from 'lucide-react';
import { ProductTable } from '../components/vault/ProductTable';
import { CustomDropdown } from '../components/layout/CustomDropdown';

export const Vault = ({ core }) => {
  const {
    scannedProducts,
    statusFilter,
    setStatusFilter,
    sortOrder,
    setSortOrder,
    filteredProducts,
    setDeleteConfirm
  } = core;

  return (
    <div className="max-w-5xl mx-auto pt-0 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-row items-center justify-between mb-6">
        <div className="flex-shrink-0">
          <h2 className="text-lg sm:text-xl md:text-2xl font-black uppercase tracking-tight whitespace-nowrap">
            Product Vault
          </h2>
        </div>

        <div className="flex flex-row items-center justify-end gap-1 sm:gap-2 flex-nowrap flex-1">
          <CustomDropdown
            icon={Filter}
            value={statusFilter}
            onChange={setStatusFilter}
            label="Status"
            options={[
              { value: 'ALL', label: 'Status' },
              { value: 'GREEN', label: 'Safe' },
              { value: 'YELLOW', label: 'Warn' },
              { value: 'RED', label: 'Risk' },
            ]}
          />
          <CustomDropdown
            icon={SortDesc}
            value={sortOrder}
            onChange={setSortOrder}
            label="Sort"
            options={[
              { value: 'LATEST', label: 'Latest' },
              { value: 'EXPIRY', label: 'Expiry' },
            ]}
          />
        </div>
      </div>

      {/* Main Content Logic */}
      {scannedProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[4rem] border-4 border-dashed border-slate-50 animate-in fade-in zoom-in-95">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
            <ShieldCheck size={40} className="text-slate-400" />
          </div>
          <p className="text-slate-500 font-black uppercase text-xs tracking-[0.3em]">Your Vault is empty</p>
          <span className="text-[10px] text-center text-slate-400 font-bold uppercase mt-2 tracking-widest italic">
            Scan a product to start building your history
          </span>
        </div>
      ) : (
        <>
          {filteredProducts.length > 0 ? (
            <ProductTable
              products={filteredProducts}
              onDelete={(idx) => setDeleteConfirm({ idx, name: scannedProducts[idx].name })}
              showTitle={false}
            />
          ) : (
            <div className="text-center py-24 animate-in fade-in zoom-in-95">
              <p className="font-black uppercase tracking-[0.2em] text-slate-400 text-[10px]">
                No products match these filters
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};
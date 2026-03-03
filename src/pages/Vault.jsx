import { ShieldCheck } from 'lucide-react';
import { ProductTable } from '../components/vault/ProductTable';
import { VaultHeader } from '../components/vault/VaultHeader';
import { useVault } from '../hooks/vault/useVault';

export const Vault = ({ core }) => {
  const { scannedProducts, setDeleteConfirm } = core;

  const {
    searchQuery, setSearchQuery,
    statusFilter, setStatusFilter,
    sortOrder, setSortOrder,
    filteredProducts
  } = useVault(scannedProducts);

  return (
    <div className="max-w-5xl mx-auto pt-0 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <VaultHeader
        searchQuery={searchQuery} setSearchQuery={setSearchQuery}
        statusFilter={statusFilter} setStatusFilter={setStatusFilter}
        sortOrder={sortOrder} setSortOrder={setSortOrder}
      />

      {scannedProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[4rem] border-4 border-dashed border-slate-50 animate-in fade-in zoom-in-95">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
            <ShieldCheck size={40} className="text-slate-400" />
          </div>
          <p className="text-slate-500 font-black uppercase text-xs tracking-[0.3em] mt-4">Your Vault is empty</p>
        </div>
      ) : (
        <>
          {filteredProducts.length > 0 ? (
            <ProductTable
              products={filteredProducts}
              onDelete={(idx) => {
                const targetProduct = filteredProducts[idx];
                const actualIndex = scannedProducts.findIndex(p => p.id === targetProduct.id || p.name === targetProduct.name);
                setDeleteConfirm({ idx: actualIndex, name: targetProduct.name });
              }}
            />
          ) : (
            <div className="text-center py-24 animate-in fade-in zoom-in-95">
              <p className="font-black uppercase tracking-[0.2em] text-slate-400 text-[10px]">
                No products match your search or filters
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};
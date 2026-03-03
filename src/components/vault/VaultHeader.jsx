import { VaultSearch } from './VaultSearch';
import { VaultFilters } from './VaultFilters';

export const VaultHeader = ({
  searchQuery, setSearchQuery,
  statusFilter, setStatusFilter,
  sortOrder, setSortOrder
}) => {
  return (
    <div className="flex flex-col items-center w-full mb-8">
      <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-slate-900 mb-6">
        Product Vault
      </h2>
      <div className="flex flex-row items-center gap-2 w-full max-w-4xl">
        <div className="flex-1">
          <VaultSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
        <div className="flex-shrink-0 ml-2 min-[426px]:ml-6">
          <VaultFilters
            statusFilter={statusFilter} setStatusFilter={setStatusFilter}
            sortOrder={sortOrder} setSortOrder={setSortOrder}
          />
        </div>

      </div>
    </div>
  );
};
import { Search } from 'lucide-react';

export const VaultSearch = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative flex-1">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Search size={16} className="text-slate-400" />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="SEARCH PRODUCTS..."
        className="w-full bg-slate-100 border-none rounded-2xl py-2.5 pl-11 pr-4 text-[10px] font-black uppercase tracking-widest text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-pink-100 transition-all"
      />
    </div>
  );
};
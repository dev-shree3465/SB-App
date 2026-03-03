import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Filter, SortDesc } from 'lucide-react';

// Internal Dropdown Component (moved from layout)
const FilterDropdown = ({ icon: Icon, options, value, onChange, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleEvents = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsOpen(false);
    };
    if (isOpen) document.addEventListener("mousedown", handleEvents);
    return () => document.removeEventListener("mousedown", handleEvents);
  }, [isOpen]);

  const selectedOption = options.find(opt => opt.value === value);
  const getStatusColor = (val) => {
    if (val === 'GREEN') return 'text-green-500';
    if (val === 'YELLOW') return 'text-amber-500';
    if (val === 'RED') return 'text-red-500';
    return 'text-slate-500';
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-start gap-1 sm:gap-2 px-1.5 sm:px-4 py-2 rounded-xl border transition-all duration-300 ${isOpen ? 'bg-white border-pink-400 shadow-md' : 'bg-white/80 border-slate-100 shadow-sm'} max-w-[95px] sm:max-w-none`}
      >
        {Icon && <Icon size={14} className="text-slate-400" />}
        <span className="hidden min-[321px]:block text-[8px] sm:text-[10px] font-black uppercase tracking-tight sm:tracking-widest text-left truncate flex-1">
          {selectedOption ? selectedOption.label : label}
        </span>
        <ChevronDown size={10} className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 sm:w-48 z-[40] origin-top-right bg-white/95 backdrop-blur-md border border-slate-100 rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="py-2">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => { onChange(option.value); setIsOpen(false); }}
                className={`w-full text-left px-5 py-3 text-[10px] font-black uppercase tracking-widest transition-colors ${value === option.value ? getStatusColor(option.value) : `hover:bg-slate-50 ${getStatusColor(option.value)} hover:text-slate-900`}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const VaultFilters = ({ statusFilter, setStatusFilter, sortOrder, setSortOrder }) => {
  return (
    <div className="flex flex-row items-center justify-end gap-1 sm:gap-2 flex-nowrap flex-1">
      <FilterDropdown
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
      <FilterDropdown
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
  );
};
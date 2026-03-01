import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export const CustomDropdown = ({ icon: Icon, options, value, onChange, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  // Helper to color-code the status labels
  const getStatusColor = (val) => {
    if (val === 'GREEN') return 'text-green-500';
    if (val === 'YELLOW') return 'text-amber-500';
    if (val === 'RED') return 'text-red-500';
    return 'text-slate-500';
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-start gap-1 sm:gap-2 px-1.5 sm:px-4 py-2 rounded-xl border transition-all duration-300 ${isOpen ? 'bg-white border-brand shadow-md' : 'bg-white/80 border-slate-100 shadow-sm'} max-w-[110px] sm:max-w-none
        `}
      >
        {Icon && <Icon size={14} className="text-slate-400" />}
        <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-tight sm:tracking-widest text-left truncate flex-1">
          {selectedOption ? selectedOption.label : label}
        </span>
        <ChevronDown
          size={10}
          className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 z-[100] origin-top-left bg-white/95 backdrop-blur-md border border-slate-100 rounded-[1.5rem] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="py-2">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`
                  w-full text-left px-5 py-3 text-[10px] font-black uppercase tracking-widest transition-colors
                  ${value === option.value ? 'bg-brand/5 text-brand' : `hover:bg-slate-50 ${getStatusColor(option.value)} hover:text-slate-900`}
                `}
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
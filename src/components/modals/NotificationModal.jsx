import { X } from 'lucide-react';

const containerStyles = {
  success: 'border-green-100 text-green-800',
  error: 'border-red-100 text-red-800',
  info: 'border-blue-100 text-blue-800',
  warning: 'border-amber-100 text-amber-800'
};

const dotColors = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  info: 'bg-blue-500',
  warning: 'bg-amber-500'
};

export const NotificationModal = ({ notification, onClose, isAuthOpen }) => {
  if (!notification) return null;

  const mobilePosition = isAuthOpen ? 'bottom-6' : 'top-15';

  return (
    <div
      className={`
        fixed z-[1000] animate-in slide-in-from-right-10 transition-all duration-300
        /* Mobile (default) */
        ${mobilePosition} right-3 w-auto max-w-[280px]
        
        /* Tablet & Desktop (768px and up) */
        md:top-auto md:bottom-6 md:right-6 md:max-w-[320px]
      `}
    >
      <div
        className={`flex items-center gap-2 md:gap-3 p-2 md:p-4 rounded-[1.2rem] md:rounded-[1.5rem] shadow-xl border backdrop-blur-md bg-white/90 ${containerStyles[notification.type] || 'border-slate-100 text-slate-700'}`}
      >
        <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full animate-pulse shrink-0 ${dotColors[notification.type] || 'bg-slate-400'}`} />

        <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest flex-1 leading-tight">
          {notification.message}
        </p>

        <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600">
          <X size={12} className="md:w-[14px] md:h-[14px]" />
        </button>
      </div>
    </div>
  );
};
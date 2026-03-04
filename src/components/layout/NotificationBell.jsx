import { Bell, Calendar, ChevronRight } from 'lucide-react';
import { useNotification } from '../../hooks/notifications/useNotification';

export const NotificationBell = ({ user, scannedProducts, setActiveTab }) => {
  // The hook now calculates everything internally
  const {
    showNotifications,
    toggleNotifications,
    closeNotifications,
    dropdownRef,
    expiryNotifications
  } = useNotification(scannedProducts);

  const hasNotifications = user && expiryNotifications.length > 0;

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleNotifications}
        className={`p-2 rounded-xl transition-all ${showNotifications ? 'bg-brand/10 text-brand' : 'text-slate-400 hover:text-brand'
          }`}
      >
        <Bell size={20} />
        {hasNotifications && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse" />
        )}
      </button>

      {/* DROPDOWN UI - PADDING, MARGINS, COLORS EXACTLY AS REQUESTED */}
      {showNotifications && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl border border-slate-100 shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in duration-200">
          <div className="p-4 border-b border-slate-50 bg-slate-50/50">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Expiring Soon</h3>
          </div>

          <div className="max-h-64 overflow-y-auto">
            {expiryNotifications.length > 0 ? (
              expiryNotifications.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => { setActiveTab('VAULT'); closeNotifications(); }}
                  className="w-full p-4 flex items-center gap-3 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500">
                    <Calendar size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black text-slate-800 uppercase truncate">{item.name}</p>
                    <p className="text-[9px] font-bold text-amber-600 uppercase tracking-tight">Expires: {item.expiry}</p>
                  </div>
                  <ChevronRight size={12} className="text-slate-300" />
                </button>
              ))
            ) : (
              <div className="p-8 text-center">
                <p className="text-xs font-bold text-slate-400 uppercase">No upcoming expires</p>
              </div>
            )}
          </div>

          <button
            onClick={() => { setActiveTab('VAULT'); closeNotifications(); }}
            className="w-full p-3 bg-brand/5 text-brand text-[9px] font-black uppercase tracking-widest hover:bg-brand/10 transition-colors"
          >
            View Full Vault
          </button>
        </div>
      )}
    </div>
  );
};
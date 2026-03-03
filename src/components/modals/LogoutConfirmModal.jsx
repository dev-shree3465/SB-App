export const LogoutConfirmModal = ({ isOpen, onClose, onLogout }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-sm rounded-[3rem] px-8 py-6 text-center animate-in zoom-in-95 shadow-2xl">
        <h2 className="text-xl font-black uppercase text-slate-800 tracking-tight">Exit SkinBloom?</h2>

        <div className="flex flex-col gap-3 mt-6">
          <button
            onClick={() => onLogout(false)}
            className="w-full border-2 border-amber-100 bg-amber-50/50 text-amber-600 py-4 rounded-2xl font-black uppercase text-xs active:scale-95 transition-all hover:bg-amber-50"
          >
            Just Logout
          </button>

          <button
            onClick={() => onLogout(true)}
            className="w-full border-2 border-red-100 bg-red-50/50 text-red-600 py-4 rounded-2xl font-black uppercase text-xs active:scale-95 transition-all hover:bg-red-50"
          >
            Wipe All Data
          </button>

          <button
            onClick={onClose}
            className="text-slate-400 font-black uppercase text-[10px] mt-2 hover:text-slate-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
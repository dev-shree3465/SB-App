export const LogoutConfirmModal = ({ isOpen, onClose, onLogout }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-sm rounded-[3rem] px-8 py-6 text-center animate-in zoom-in-95">
        <h2 className="text-xl font-black uppercase text-slate-800">Exit SkinBloom?</h2>
        <div className="flex flex-col gap-3 mt-6">
          <button
            onClick={() => onLogout(false)}
            className="w-full border-2 border-amber-200 text-amber-500 py-4 rounded-2xl font-black uppercase text-xs active:scale-95 transition-all"
          >
            Just Logout
          </button>
          <button
            onClick={() => onLogout(true)}
            className="w-full border-2 border-red-200 text-red-500 py-4 rounded-2xl font-black uppercase text-xs active:scale-95 transition-all"
          >
            Wipe All Data
          </button>
          <button
            onClick={onClose}
            className="text-slate-400 font-black uppercase text-[10px] mt-1"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
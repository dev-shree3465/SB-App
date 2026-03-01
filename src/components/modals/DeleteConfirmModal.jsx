export const DeleteConfirmModal = ({ item, onClose, onDelete }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-sm rounded-[3rem] p-8 text-center animate-in zoom-in-95">
        <h2 className="text-xl font-black text-slate-800">REMOVE ITEM?</h2>
        <p className="text-slate-400 text-[10px] font-bold uppercase mt-2 tracking-widest">
          {item.name}
        </p>
        <div className="flex flex-col gap-2 mt-6">
          <button
            onClick={onDelete}
            className="w-full bg-red-600 text-white py-4 rounded-2xl font-black uppercase text-xs active:scale-95 transition-all"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="w-full py-4 rounded-2xl border text-slate-500 font-black uppercase text-xs"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
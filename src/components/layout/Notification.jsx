import { X } from 'lucide-react';

export const Notification = ({ notification, onClose }) => {
  if (!notification) return null;
  return (
    <div className="fixed bottom-6 right-6 z-[300] w-auto max-w-[320px] animate-in slide-in-from-right-10">
      <div className={`flex items-center gap-3 p-4 rounded-[1.5rem] shadow-xl border backdrop-blur-md bg-white/90 ${notification.type === 'success' ? 'border-green-100 text-green-800' : 'border-slate-100 text-slate-700'}`}>
        <div className={`w-2 h-2 rounded-full animate-pulse ${notification.type === 'success' ? 'bg-green-500' : 'bg-blue-500'}`} />
        <p className="text-[10px] font-black uppercase tracking-widest flex-1">{notification.message}</p>
        <button onClick={onClose} className="p-1 text-slate-400"><X size={14} /></button>
      </div>
    </div>
  );
};
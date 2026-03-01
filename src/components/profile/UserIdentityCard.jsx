import { User, Mail, Phone, LogOut } from 'lucide-react';

export const UserIdentityCard = ({ profileData, onLogout }) => {
  const { displayName, displayAge, userId, displayEmail, displayPhone, isLoggedIn } = profileData;

  return (
    <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] p-2 sm:p-4 md:p-8 shadow-sm border border-slate-100 overflow-hidden relative">
      <div className="flex flex-row items-center gap-4 md:gap-6 relative z-10">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-brand rounded-full flex items-center justify-center shadow-xl shadow-brand/20 border-4 border-white shrink-0">
          <User className="text-white" size={28} md:size={36} />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-xl md:text-3xl capitalize font-black text-slate-800 tracking-tighter truncate">
            {displayName}
          </h2>

          <div className="flex flex-wrap items-center gap-2 mt-1 md:mt-2">
            <span className="bg-brand text-white text-[8px] md:text-[10px] font-black px-2 md:px-3 py-1 rounded-full uppercase tracking-widest">
              Age: {displayAge}
            </span>
            <span className="bg-slate-100 text-slate-600 text-[8px] md:text-[10px] font-black px-2 md:px-3 py-1 rounded-full uppercase tracking-widest">
              ID: {userId}
            </span>
          </div>
        </div>
        
        {isLoggedIn && (
          <button
            onClick={onLogout}
            className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-100 transition-colors shrink-0"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mt-6 md:mt-8">
        <ContactItem icon={<Mail size={16} />} text={displayEmail} />
        <ContactItem icon={<Phone size={16} />} text={displayPhone} />
      </div>
    </div>
  );
};

const ContactItem = ({ icon, text }) => (
  <div className="p-3 md:p-4 bg-slate-50 rounded-xl md:rounded-2xl flex items-center gap-3 border border-slate-100 min-w-0">
    <div className="text-brand shrink-0">{icon}</div>
    <span className="text-[11px] md:text-sm font-bold text-slate-600 truncate">{text}</span>
  </div>
);
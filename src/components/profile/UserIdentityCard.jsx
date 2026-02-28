import { User, Mail, Phone } from 'lucide-react';

export const UserIdentityCard = ({ user, userId }) => (
  <div className="bg-white rounded-[3rem] p-8 shadow-sm border border-slate-100 overflow-hidden relative">
    <div className="absolute top-0 right-0 w-32 h-32 bg-brand rounded-full -mr-16 -mt-16 opacity-20" />

    <div className="flex items-center gap-6 relative z-10">
      <div className="w-20 h-20 bg-brand rounded-full flex items-center justify-center shadow-xl shadow-brand/20 border-4 border-white">
        <User className="text-white" size={36} />
      </div>
      <div>
        <h2 className="text-3xl font-black text-slate-800 tracking-tighter">{user.name}</h2>
        <div className="flex items-center gap-2 mt-2">
          <span className="bg-brand text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
            Age: {user.age}
          </span>
          <span className="bg-slate-100 text-slate-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
            ID: {userId}
          </span>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
      <ContactItem icon={<Mail size={18} />} text={user.email || 'Email not linked'} />
      <ContactItem icon={<Phone size={18} />} text={user.phone || 'Phone not linked'} />
    </div>
  </div>
);

const ContactItem = ({ icon, text }) => (
  <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-3 border border-slate-100">
    <div className="text-brand">{icon}</div>
    <span className="text-sm font-bold text-slate-600">{text}</span>
  </div>
);
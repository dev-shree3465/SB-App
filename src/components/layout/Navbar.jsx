import { ShieldCheck, LogIn } from 'lucide-react';

export const Navbar = ({ user, activeTab, setActiveTab, onLoginClick }) => {
  const navLinks = [
    { id: 'DASHBOARD', label: 'Dashboard' },
    { id: 'SCAN', label: 'Scan' },
    { id: 'VAULT', label: 'Vault' },
    { id: 'PROFILE', label: 'Profile' }
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
            <ShieldCheck className="text-white" size={20} />
          </div>
          <span className="font-black text-xl tracking-tighter text-slate-800 uppercase">SKINBLOOM</span>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveTab(link.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === link.id ? 'bg-brand/20 text-brand' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {user ? (
          /* Clicking this area now moves the user to the Profile Tab */
          <button
            onClick={() => setActiveTab('PROFILE')}
            className="flex items-center gap-2 px-0 md:px-1"
          >
            <div className="w-10 h-10 bg-brand/10 rounded-full flex items-center justify-center border border-brand/20">
              <span className="text-[17px] text-bold font-black text-brand uppercase">
                {user.name ? user.name.charAt(0) : 'G'}
              </span>
            </div>
          </button>
        ) : (
          <button
            onClick={onLoginClick}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand transition-all shadow-lg shadow-slate-200"
          >
            <LogIn size={14} />
            Login / Signup
          </button>
        )}
      </div>
    </header>
  );
};
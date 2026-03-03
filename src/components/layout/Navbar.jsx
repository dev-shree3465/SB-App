import { ShieldCheck, LogIn } from 'lucide-react';

export const Navbar = ({ user, activeTab, setActiveTab, onLoginClick }) => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-100">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
            <ShieldCheck className="text-white" size={20} />
          </div>
          <span className="font-black text-lg md:text-xl tracking-tighter text-slate-800 uppercase">
            SKINBLOOM
          </span>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1">
          {['DASHBOARD', 'SCAN', 'VAULT', 'PROFILE'].map((id) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === id ? 'bg-brand/20 text-brand' : 'text-slate-400 hover:text-slate-600'
                }`}
            >
              {id}
            </button>
          ))}
        </nav>

        {/* Auth Section */}
        <div className="flex items-center">
          {user ? (
            <button onClick={() => setActiveTab('PROFILE')} className="relative">
              <div className="w-9 h-9 md:w-10 md:h-10 bg-brand/10 rounded-full flex items-center justify-center border border-brand/20">
                <span className="text-base font-black text-brand uppercase">{user.name?.charAt(0)}</span>
              </div>
            </button>
          ) : (
            <button
              onClick={onLoginClick}
              className="flex items-center gap-2 px-3 py-2 md:px-4 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md active:scale-95 transition-all"
            >
              <LogIn size={14} />
              <span className="hidden md:inline text-[10px]">Login / Signup</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
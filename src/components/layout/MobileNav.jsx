import { LayoutDashboard, Camera, History, User } from 'lucide-react';

export const MobileNav = ({ user, activeTab, setActiveTab, onLoginClick }) => {
  const tabs = [
    { id: 'DASHBOARD', icon: LayoutDashboard, label: 'Home' },
    { id: 'SCAN', icon: Camera, label: 'Scan' },
    { id: 'VAULT', icon: History, label: 'Vault' },
    { id: 'PROFILE', icon: User, label: 'Profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 flex md:hidden items-center justify-around p-3 z-[60] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-8">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => user ? setActiveTab(tab.id) : onLoginClick()}
            className={`flex flex-col items-center p-2 transition-all ${isActive && user ? 'text-brand' : 'text-slate-400'
              }`}
          >
            <Icon size={24} strokeWidth={isActive && user ? 2.5 : 2} />
            <span className="text-[9px] font-black mt-1 uppercase tracking-tighter">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
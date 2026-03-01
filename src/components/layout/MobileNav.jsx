import { LayoutDashboard, Camera, History, User } from 'lucide-react';
export const MobileNav = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'DASHBOARD', icon: LayoutDashboard, label: 'Home' },
    { id: 'SCAN', icon: Camera, label: 'Scan' },
    { id: 'VAULT', icon: History, label: 'Vault' },
    { id: 'PROFILE', icon: User, label: 'Profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 flex md:hidden justify-around p-3 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center p-2 rounded-2xl transition-all duration-300 ${isActive ? 'bg-brand/20 text-brand px-6' : 'text-slate-400'}`}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className={`text-[10px] font-black mt-1 uppercase tracking-tighter ${isActive ? 'opacity-100' : 'opacity-0'}`}>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
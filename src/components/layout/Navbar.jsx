// import { ShieldCheck, LogOut, LayoutDashboard, Camera, History, User as UserIcon } from 'lucide-react';

// export const Navbar = ({ user, onLogout, activeTab, setActiveTab }) => {
//   const navLinks = [
//     { id: 'DASHBOARD', icon: LayoutDashboard, label: 'Dashboard' },
//     { id: 'SCAN', icon: Camera, label: 'Scan' },
//     { id: 'VAULT', icon: History, label: 'Vault' },
//     { id: 'PROFILE', icon: UserIcon, label: 'Profile' }
//   ];

//   return (
//     <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
//       <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

//         <div className="flex items-center gap-2 shrink-0">
//           <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
//             <ShieldCheck className="text-white" size={20} />
//           </div>
//           <span className="font-black text-xl tracking-tighter text-slate-800 uppercase">SKINBLOOM</span>
//         </div>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex items-center gap-1">
//           {navLinks.map((link) => (
//             <button
//               key={link.id}
//               onClick={() => setActiveTab(link.id)}
//               className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === link.id
//                 ? 'bg-brand/20 text-brand'
//                 : 'text-slate-400 hover:text-slate-600'
//                 }`}
//             >
//               {/* <link.icon size={16} /> */}
//               {link.label}
//             </button>
//           ))}
//         </nav>

//         {/* User Info - Only shows if user is logged in */}
//         {user && (
//           <div className="flex items-center gap-3">
//             <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
//               <UserIcon size={14} className="text-slate-400" />
//               <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
//                 {user.name}
//               </span>
//             </div>

//             <button
//               onClick={onLogout}
//               className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
//               title="Logout"
//             >
//               <LogOut size={20} />
//             </button>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

import { ShieldCheck, LogOut, LayoutDashboard, Camera, History, User as UserIcon, LogIn } from 'lucide-react';

export const Navbar = ({ user, onLogout, activeTab, setActiveTab, onLoginClick }) => {
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
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
              <UserIcon size={14} className="text-slate-400" />
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">{user.name}</span>
            </div>
            <button onClick={onLogout} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all" title="Logout">
              <LogOut size={20} />
            </button>
          </div>
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
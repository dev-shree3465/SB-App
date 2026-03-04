import { useState } from 'react';
import { X, User, Phone, Calendar, LogOut, ShieldCheck } from 'lucide-react';
import { SettingItem } from '../components/settings/SettingsItem';

export const Settings = ({ core, onClose, onLogout }) => {
  const { user, setUser, notify, setShowAuthModal, setOtpPurpose } = core;

  const [editMode, setEditMode] = useState(null);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    age: user?.age || ''
  });

  const handleSaveField = (field) => {
    const registeredUsers = JSON.parse(localStorage.getItem("skinbloom_registered_users") || "[]");
    const updatedUsers = registeredUsers.map(u => {
      if (u.email.toLowerCase() === user.email.toLowerCase()) {
        return { ...u, [field]: formData[field] };
      }
      return u;
    });

    localStorage.setItem("skinbloom_registered_users", JSON.stringify(updatedUsers));
    setUser({ ...user, [field]: formData[field] });
    setEditMode(null);
    notify(`${field.charAt(0).toUpperCase() + field.slice(1)} updated!`, "success");
  };

  const handleToggle2FA = () => {
    notify("Security verification required...", "info");
    if (setOtpPurpose) setOtpPurpose("2FA_TOGGLE");
    setShowAuthModal(true);
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 z-[150] bg-slate-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-t-[3rem] sm:rounded-[3rem] p-6 sm:p-8 shadow-2xl animate-in slide-in-from-bottom-10 duration-500 overflow-hidden">

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-black text-slate-800 uppercase tracking-tighter italic">Settings</h2>
          <button onClick={onClose} className="p-2 bg-slate-100 text-slate-400 rounded-full hover:bg-red-50 hover:text-red-500 transition-all">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-1">
          <SettingItem
            label="Full Name" icon={User} field="name"
            value={user?.name} formDataValue={formData.name}
            isEditing={editMode === 'name'} onEdit={setEditMode}
            onSave={handleSaveField} onChange={updateFormData}
          />
          <SettingItem
            label="Phone Number" icon={Phone} field="phone"
            value={user?.phone} formDataValue={formData.phone}
            isEditing={editMode === 'phone'} onEdit={setEditMode}
            onSave={handleSaveField} onChange={updateFormData}
          />
          <SettingItem
            label="Age" icon={Calendar} field="age" type="number"
            value={user?.age} formDataValue={formData.age}
            isEditing={editMode === 'age'} onEdit={setEditMode}
            onSave={handleSaveField} onChange={updateFormData} notify={notify}
          />

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl mb-8 border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-xl text-brand shadow-sm">
                <ShieldCheck size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Security</span>
                <span className="text-xs font-black text-slate-800 uppercase">Two-Factor (2FA)</span>
              </div>
            </div>
            <button
              onClick={handleToggle2FA}
              className={`w-12 h-6 rounded-full transition-all relative ${user?.twoFactorEnabled ? 'bg-green-500' : 'bg-slate-200'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${user?.twoFactorEnabled ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-3 p-4 bg-red-50 text-red-600 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-red-600 hover:text-white transition-all active:scale-95 shadow-sm shadow-red-100"
        >
          <LogOut size={16} />
          <span>Log Out Sessions</span>
        </button>
      </div>
    </div>
  );
};
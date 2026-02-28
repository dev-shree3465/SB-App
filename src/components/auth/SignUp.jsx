import { Mail, Phone, Lock } from 'lucide-react';

const SignUp = ({ formData, setFormData }) => {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">

      <div>
        <label className="text-[10px] font-black text-slate-700 uppercase ml-3 tracking-widest">Email Address</label>
        <div className="relative mt-1">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            required type="email" placeholder="Email"
            className="w-full bg-slate-100 rounded-xl pl-12 pr-4 py-3.5 text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-brand transition-all"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className="text-[10px] font-black text-slate-700 uppercase ml-3 tracking-widest">Phone</label>
        <div className="relative mt-1">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="tel" placeholder="Mobile No." maxLength={10}
            className="w-full bg-slate-100 rounded-xl pl-12 pr-4 py-3.5 text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-brand transition-all"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className="text-[10px] font-black text-slate-700 uppercase ml-3 tracking-widest">Create Password</label>
        <div className="relative mt-1">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            required type="password" placeholder="••••••••" minLength={8}
            className="w-full bg-slate-100 rounded-xl pl-12 pr-4 py-3.5 text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-brand transition-all"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className="text-[10px] font-black text-slate-700 uppercase ml-3 tracking-widest">Confirm Password</label>
        <div className="relative mt-1">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            required type="password" placeholder="••••••••" minLength={8}
            className="w-full bg-slate-100 rounded-xl pl-12 pr-4 py-3.5 text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-brand transition-all"
            value={formData.confirmPassword || ''}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
const LoginForm = ({ formData, setFormData }) => {
  return (
    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div>
        <label className="text-[9px] font-black text-slate-400 uppercase ml-3 tracking-widest">
          Email
        </label>
        <input
          required type="email" placeholder="name@email.com"
          className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-brand outline-none transition-all"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <div>
        <label className="text-[9px] font-black text-slate-400 uppercase ml-3 tracking-widest">
          Password
        </label>
        <input
          required type="password" placeholder="••••••••" maxLength={8}
          className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-brand outline-none transition-all"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
      </div>
    </div>
  );
};

export default LoginForm;
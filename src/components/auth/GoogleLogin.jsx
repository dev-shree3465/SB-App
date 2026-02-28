const GoogleLogin = () => {
  return (
    <button type="button" className="w-full border border-slate-200 py-3 rounded-xl flex items-center justify-center gap-3 mb-2 hover:bg-slate-50 transition-all active:scale-95">
      <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="G" className="w-4 h-4" />
      <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Google Login</span>
    </button>
  );
};

export default GoogleLogin;
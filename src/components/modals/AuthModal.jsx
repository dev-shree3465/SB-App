import AuthLogic from '../auth/AuthLogic';

export const AuthModal = ({ isOpen, onClose, onLogin, notify, initialEmail }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[600]">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <AuthLogic
        onLogin={onLogin}
        notify={notify}
        onClose={onClose}
        initialEmail={initialEmail}
      />
    </div>
  );
};
import Auth from '../../pages/Auth';

export const AuthModal = ({ isOpen, onClose, core, initialEmail }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center">
      <div
        className="hidden min-[530px]:block absolute inset-0 bg-slate-900/40 backdrop-blur-lg"
        onClick={onClose}
      />

      <div className="relative w-full h-full min-[530px]:h-auto flex items-center justify-center">
        <Auth
          core={core} 
          onClose={onClose}
          initialEmail={initialEmail}
        />
      </div>
    </div>
  );
};
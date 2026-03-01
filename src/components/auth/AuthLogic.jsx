import { useEffect, useRef } from 'react';
import { ChevronRight, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../../hooks/auth/useAuth';
import GoogleLogin from './GoogleLogin';
import LoginForm from './LoginForm';
import SignUp from './SignUp';
import AuthHeader from './AuthHeader';
import OTPView from './OTPView';

const AuthLogic = ({ onLogin, notify, onClose, initialEmail }) => {
  const {
    isNewUser,
    step,
    setStep,
    otpValue,
    setOtpValue,
    formData,
    setFormData,
    toggleAuthMode,
    handleAuthSubmit,
    handleVerifyOTP
  } = useAuth(onLogin, notify);

  // Ref to track if the initialEmail has already been applied
  const hasAppliedInitialEmail = useRef(false);

  useEffect(() => {
    // Only apply the pre-fill logic if initialEmail exists and hasn't been applied yet
    if (initialEmail && !hasAppliedInitialEmail.current) {
      // 1. Force into Login mode if currently in Signup mode
      if (isNewUser) {
        toggleAuthMode();
      }

      // 2. Pre-fill the email field
      setFormData(prev => ({ ...prev, email: initialEmail }));

      // 3. Mark as applied so it doesn't trigger again
      hasAppliedInitialEmail.current = true;
    }
  }, [initialEmail, isNewUser, toggleAuthMode, setFormData]);

  // const handleManualToggle = () => {
  //   // If user is currently in Login and moving to Signup, clear the email
  //   // if (!isNewUser) {
  //     setFormData({ name: '', phone: '', email: '', password: '', confirmPassword: '' });
  //   // }
  //   toggleAuthMode();
  // };

  // Inside AuthLogic.jsx

  const handleManualToggle = () => {
    if (!isNewUser) {
      setFormData(prev => ({
        name: '',
        phone: '',
        email: prev.email, // Preserve the email
        password: '',
        confirmPassword: ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        password: '',
        confirmPassword: ''
      }));
    }

    toggleAuthMode();
  };
  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 overflow-hidden">
      <div className={`bg-white w-full transition-all ease-in-out rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300 ${isNewUser && step === 'AUTH' ? 'max-w-[450px]' : 'max-w-[400px]'}`}>
        <div className="p-6 md:p-8 text-center max-h-[90vh] overflow-y-auto no-scrollbar">

          {step === 'AUTH' ? (
            <>
              <AuthHeader isNewUser={isNewUser} onClose={onClose} />
              <GoogleLogin />

              <div className="relative flex items-center justify-center my-4">
                <div className="border-t border-slate-100 w-full"></div>
                <span className="bg-white px-3 text-[9px] font-black text-slate-300 uppercase absolute tracking-widest">Or Email</span>
              </div>

              <form onSubmit={handleAuthSubmit} className="text-left">
                {isNewUser ? (
                  <SignUp formData={formData} setFormData={setFormData} />
                ) : (
                  <LoginForm formData={formData} setFormData={setFormData} />
                )}

                <button type="submit" className="w-full bg-slate-900 text-white rounded-[1.2rem] py-4 md:py-5 font-black text-xs flex items-center justify-center gap-2 mt-6 shadow-xl active:scale-95 transition-all uppercase tracking-widest">
                  {isNewUser ? "Start Journey" : "Sign In"}
                  <ChevronRight size={16} />
                </button>
              </form>

              <button
                onClick={handleManualToggle}
                className="mt-6 text-[10px] font-black text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest flex items-center justify-center gap-2 mx-auto"
              >
                {isNewUser ? <><LogIn size={14} /> Back to Login</> : <><UserPlus size={14} /> New? Create Account</>}
              </button>
            </>
          ) : (
            <OTPView
              email={formData.email}
              otpValue={otpValue}
              setOtpValue={setOtpValue}
              onVerify={handleVerifyOTP}
              onBack={() => setStep('AUTH')}
            />
          )}

        </div>
      </div>
    </div>
  );
};

export default AuthLogic;
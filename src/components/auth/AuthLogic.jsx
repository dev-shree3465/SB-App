import { ChevronRight, LogIn, UserPlus, X } from 'lucide-react';
import { useAuth } from '../../hooks/auth/useAuth';
import GoogleLogin from './GoogleLogin';
import LoginForm from './LoginForm';
import SignUp from './SignUp';
import AuthHeader from './AuthHeader';
import OTPView from './OTPView';

const AuthLogic = ({ onLogin, notify, onClose }) => {
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
                onClick={toggleAuthMode}
                className="mt-6 text-[10px] font-black text-slate-400 hover:text-brand transition-colors uppercase tracking-widest flex items-center justify-center gap-2 mx-auto"
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
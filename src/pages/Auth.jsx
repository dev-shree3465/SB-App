import { ChevronRight, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../hooks/auth/useAuth';
import GoogleLogin from '../components/auth/GoogleLogin';
import LoginForm from '../components/auth/LoginForm';
import SignUp from '../components/auth/SignUp';
import AuthHeader from '../components/auth/AuthHeader';
import OTPView from '../components/auth/OTPView';

const Auth = ({ onLogin, notify, onClose, initialEmail }) => {
  const {
    isNewUser, step, setStep, otpValue, setOtpValue,
    formData, setFormData, handleManualToggle,
    handleAuthSubmit, handleVerifyOTP
  } = useAuth(onLogin, notify, initialEmail);

  return (
    <div
      className={`bg-white w-full h-full ${isNewUser ? 'min-[530px]:max-w-[500px]' : 'w-full'} min-[530px]:h-auto transition-all ease-in-out min-[530px]:rounded-[2.5rem] min-[530px]:shadow-2xl overflow-hidden animate-in zoom-in duration-300 ${isNewUser && step === 'AUTH' ? 'min-[530px]:max-w-[450px]' : 'min-[530px]:max-w-[400px]'} flex flex-col justify-center`}
    >
      <div className="p-6 md:p-8 text-center max-h-screen min-[530px]:max-h-[90vh] overflow-y-auto no-scrollbar">

        {step === 'AUTH' ? (
          <>
            <AuthHeader isNewUser={isNewUser} onClose={onClose} />
            <GoogleLogin />

            <div className="relative flex items-center justify-center my-4">
              <div className="border-t border-slate-100 w-full"></div>
              <span className="bg-white px-3 text-[9px] font-black text-slate-300 uppercase absolute tracking-widest">Or Email</span>
            </div>

            <form id="auth-form" onSubmit={handleAuthSubmit} className="text-left">
              {isNewUser ? (
                <SignUp formData={formData} setFormData={setFormData} />
              ) : (
                <LoginForm formData={formData} setFormData={setFormData} />
              )}
            </form>

            <div className="flex flex-row min-[530px]:flex-col items-center gap-3 mt-6">

              <button
                onClick={handleManualToggle}
                className="flex-1 min-[530px]:w-full text-[11px] font-black border-2 border-slate-400 rounded-2xl text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest flex items-center justify-center gap-2 py-4"
              >
                {isNewUser ? <><LogIn size={14} /> Back to Login</> : <><UserPlus size={14} /> New? Create Account</>}
              </button>
              <button
                type="submit"
                form="auth-form"
                className="flex-1 min-[530px]:w-full bg-slate-900 text-white rounded-2xl py-4 md:py-5 font-black text-[11px] flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all uppercase tracking-widest"
              >
                {isNewUser ? "Start Journey" : "Sign In"}
                <ChevronRight size={14} />
              </button>
            </div>
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
  );
};
export default Auth;
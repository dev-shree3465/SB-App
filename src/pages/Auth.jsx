import { useAuth } from '../hooks/auth/useAuth';
import GoogleLogin from '../components/auth/GoogleLogin';
import LoginForm from '../components/auth/LoginForm';
import SignUp from '../components/auth/SignUp';
import AuthHeader from '../components/auth/AuthHeader';
import OTPView from '../components/auth/OTPView';
import AuthButtons from '../components/auth/AuthButtons';

const Auth = ({ core, onClose, initialEmail }) => {
  const {
    isNewUser, step, setStep, otpValue, setOtpValue,
    formData, setFormData, handleManualToggle,
    handleAuthSubmit, handleVerifyOTP
  } = useAuth(core, initialEmail);

  return (
    <div className="flex flex-col justify-center items-center w-full h-full min-h-screen bg-slate-50/50 min-[530px]:bg-transparent">
      <div
        className={`bg-white w-full h-full transition-all duration-500 ease-in-out 
          ${isNewUser ? 'min-[530px]:max-w-[500px]' : 'min-[530px]:max-w-[400px]'} 
          min-[530px]:h-auto min-[530px]:rounded-[2.5rem] min-[530px]:shadow-2xl 
          overflow-hidden flex flex-col justify-center relative`}
      >
        <div className="p-6 md:p-8 text-center max-h-screen min-[530px]:max-h-[90vh] overflow-y-auto no-scrollbar">

          {step === 'AUTH' ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <AuthHeader isNewUser={isNewUser} onClose={onClose} />
              <GoogleLogin />

              <div className="relative flex items-center justify-center my-4">
                <div className="border-t border-slate-100 w-full"></div>
                <span className="bg-white px-3 text-[9px] font-black text-slate-300 uppercase absolute tracking-widest">
                  Or Email
                </span>
              </div>

              <form id="auth-form" onSubmit={handleAuthSubmit} className="text-left">
                <div className="transition-opacity duration-300">
                  {isNewUser ? (
                    <SignUp formData={formData} setFormData={setFormData} />
                  ) : (
                    <LoginForm formData={formData} setFormData={setFormData} />
                  )}
                </div>
              </form>

              {/* CLEANED UP BUTTON COMPONENT */}
              <AuthButtons
                isNewUser={isNewUser}
                handleManualToggle={handleManualToggle}
              />

            </div>
          ) : (
            <div className="animate-in zoom-in-95 duration-300">
              <OTPView
                email={formData.email}
                otpValue={otpValue}
                setOtpValue={setOtpValue}
                onVerify={handleVerifyOTP}
                onBack={() => setStep('AUTH')}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
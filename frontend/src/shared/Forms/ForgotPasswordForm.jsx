import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthInput from "../components/input/AuthInput";
import { validateEmail } from "../utils/helper";
import { verifyEmail, verifyResetOtp, resetPassword } from "../../api/AuthApi";
import toast from "react-hot-toast";

export default function ForgotPasswordForm() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [timer, setTimer] = useState(300);
  const [canResend, setCanResend] = useState(false);

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let interval = null;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setError(null);
    setMessage(null);

    try {
      // Simulate API call to send OTP
      await verifyEmail({ email })
      // setMessage("An OTP has been sent to your email.");
      setTimer(300);
      setCanResend(false);
      setStep(2); // Move to OTP step
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message)
      } else {
        setError("Failed to send OTP. Please try again.");
      }
    }
  };

  const handleResendOtp = async () => {
    setError(null);
    setMessage(null);
    try {
      await verifyEmail({ email });
      setMessage("A new OTP has been sent to your email.");
      setTimer(300);
      setCanResend(false);
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to resend OTP. Please try again.");
      }
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      setError("Please enter the OTP");
      return;
    }
    setError(null);
    setMessage(null);

    try {
      // Simulate API call to verify OTP
      await verifyResetOtp({ email, otp })
      setMessage("OTP verified successfully.");
      setStep(3); // Move to reset password step
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    setError(null);
    setMessage(null);

    try {
      // Simulate API call to reset password
      await resetPassword({ email, otp, newPassword })
      toast.success("Password reset successfully! Redirecting to login...");

      // Give the user a moment to read the success message before redirecting
      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);
    } catch (err) {
      setError("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="mt-8">
      {/* Step 1: Email */}
      {step === 1 && (
        <form onSubmit={handleSendOtp}>
          <AuthInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
            type="email"
            required={true}
          />
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          {message && <p className="text-emerald-400 text-xs pb-2.5">{message}</p>}

          <button type="submit" className="mt-4 w-full rounded-xl bg-emerald-400 py-3 font-semibold text-black">
            Send OTP
          </button>
        </form>
      )}

      {/* Step 2: OTP */}
      {step === 2 && (
        <form onSubmit={handleVerifyOtp}>
          <AuthInput
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter your OTP"
            type="text"
            required={true}
          />
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          {message && <p className="text-emerald-400 text-xs pb-2.5">{message}</p>}

          <button type="submit" className="mt-4 w-full rounded-xl bg-emerald-400 py-3 font-semibold text-black">
            Verify OTP
          </button>

          {timer > 0 ? (
            <p className="text-gray-400 text-xs mt-3 text-center">
              OTP expires in <span className="text-emerald-400 font-semibold">{formatTime(timer)}</span>
            </p>
          ) : (
            <div className="text-center mt-3">
              <span className="text-gray-400 text-xs">Didn't receive code? </span>
              <button
                type="button"
                onClick={handleResendOtp}
                className="text-emerald-400 text-xs font-semibold hover:underline"
              >
                Resend OTP
              </button>
            </div>
          )}
        </form>
      )}

      {/* Step 3: New Password */}
      {step === 3 && (
        <form onSubmit={handleResetPassword}>
          <AuthInput
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter your new password"
            type="password"
            required={true}
            minLength={8}
          />
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          {message && <p className="text-emerald-400 text-xs pb-2.5">{message}</p>}

          <button type="submit" className="mt-4 w-full rounded-xl bg-emerald-400 py-3 font-semibold text-black">
            Reset Password
          </button>
        </form>
      )}

      {/* Back to Login Button */}
      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={() => navigate("/auth/login")}
          className="text-gray-400 hover:text-emerald-400 transition"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}

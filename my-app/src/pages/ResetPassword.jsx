import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff, Lock, CheckCircle } from "lucide-react";

export default function ResetPassword() {
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/auth/reset-password",
        { token, password }
      );

      setSuccess(true);
      setMessage(res.data.message || "Password reset successful");
    } catch {
      setError("Reset link is invalid or expired");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8">

        {/* HEADER */}
        <div className="mb-6 text-center">
          {success ? (
            <CheckCircle className="mx-auto text-green-600" size={42} />
          ) : (
            <div className="mx-auto mb-3 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <Lock className="text-green-600" size={22} />
            </div>
          )}

          <h2 className="text-2xl font-bold text-gray-900 mt-3">
            {success ? "Password reset complete" : "Reset your password"}
          </h2>

          <p className="text-gray-500 mt-1 text-sm">
            {success
              ? "Your password has been updated. You can safely close this tab."
              : "Enter a new password to secure your account"}
          </p>
        </div>

        {/* FORM */}
        {!success && (
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* PASSWORD */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                New password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-2 p-3 border rounded-md focus:ring-2 focus:ring-green-400 outline-none"
                  placeholder="••••••••"
                  required
                />
                <span
                  className="absolute right-3 top-5 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>
            </div>

            {/* CONFIRM */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Confirm password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="w-full mt-2 p-3 border rounded-md focus:ring-2 focus:ring-green-400 outline-none"
                  placeholder="••••••••"
                  required
                />
                <span
                  className="absolute right-3 top-5 cursor-pointer text-gray-500"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-2">
                {error}
              </p>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md transition disabled:opacity-60"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}

        {/* SUCCESS MESSAGE */}
        {success && (
          <div className="text-center mt-6">
            <p className="text-green-600 font-medium">
              {message}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              You Can Visit Website To Login Again.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // LOGIN
  const handleLogin = async (e) => {
  e.preventDefault();
  setMessage("");
  setLoading(true);

  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email: form.email,
      password: form.password,
    });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user)); // ✅ ADD THIS

    navigate("/dashboard");
  } catch (error) {
    setMessage("Invalid email or password");
  } finally {
    setLoading(false);
  }
};


  // FORGOT PASSWORD
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email: form.email }
      );
      setMessage(res.data.message || "Reset link sent to your email");
    } catch (error) {
      setMessage("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F8FBFD]">
      {/* NAVBAR */}
      <nav
  className="flex items-center justify-between px-10 py-5
             bg-white/70 backdrop-blur-xl
             border-b border-gray-200
             sticky top-0 z-50
             shadow-[0_8px_30px_rgba(0,0,0,0.04)]
             transition-all duration-300"
>
  {/* LOGO */}
  <div className="flex items-center gap-3 cursor-pointer group">
    <div className="relative">
      <div
        className="w-5 h-5 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full
                   group-hover:scale-125 transition-transform duration-300"
      />
      <div
        className="absolute inset-0 bg-teal-400/40 blur-lg rounded-full
                   opacity-0 group-hover:opacity-100 transition"
      />
    </div>

    <h1
      className="text-xl font-semibold text-gray-800 tracking-tight
                 group-hover:text-transparent
                 group-hover:bg-clip-text
                 group-hover:bg-gradient-to-r
                 group-hover:from-teal-500
                 group-hover:to-blue-500
                 transition-all duration-300"
    >
      ExpenseTracker
    </h1>
  </div>

  {/* NAV LINKS */}
  <div className="hidden md:flex items-center gap-12 text-gray-600 font-medium">
    {[
      { name: "Home", path: "/" },
      { name: "Features", path: "/features" },
    ].map((item) => (
      <Link
        key={item.name}
        to={item.path}
        className="relative group"
      >
        <span
          className="transition-colors duration-300
                     group-hover:text-gray-900"
        >
          {item.name}
        </span>

        {/* underline animation */}
        <span
          className="absolute left-0 -bottom-1 w-0 h-[2px]
                     bg-gradient-to-r from-teal-500 to-blue-500
                     group-hover:w-full transition-all duration-300"
        />
      </Link>
    ))}
  </div>
</nav>


      {/* MAIN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-96px)]">
        {/* LEFT */}
        <div className="hidden lg:flex flex-col justify-center px-20 bg-gradient-to-br from-blue-600 to-teal-500 text-white">
          <h2 className="text-4xl font-bold mb-6 leading-tight">
            {forgotMode ? "Reset your password 🔐" : "Welcome back 👋"}
          </h2>

          <p className="text-lg text-blue-100 mb-10 max-w-md">
            {forgotMode
              ? "Enter your email and we’ll send you a reset link."
              : "Log in to continue tracking and managing your expenses."}
          </p>

          {!forgotMode && (
            <ul className="space-y-5 text-base">
              <li className="flex items-center gap-3">
                <CheckCircle size={20} /> Clear expense overview
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle size={20} /> Smart spending insights
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle size={20} /> Secure and private data
              </li>
            </ul>
          )}
        </div>

        {/* RIGHT */}
<div className="flex items-center justify-center px-6">
  <div className="relative w-full max-w-md p-[1px]
                  rounded-2xl
                  bg-gradient-to-br from-blue-400 via-teal-400 to-indigo-400
                  transition hover:shadow-2xl">

    <div className="bg-white rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1">

      {/* HEADER */}
      <h3 className="text-2xl font-bold text-gray-900">
        {forgotMode ? "Forgot Password" : "Log in to your account"}
      </h3>

      <p className="text-gray-500 mt-1">
        {forgotMode
          ? "We’ll email you a reset link."
          : "Enter your credentials to continue."}
      </p>

      <form
        className="mt-6 space-y-5"
        onSubmit={forgotMode ? handleForgotPassword : handleLogin}
      >

        {/* EMAIL */}
        <div className="group">
          <label className="text-sm font-medium text-gray-600">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className="w-full mt-2 p-3 rounded-xl
                       border border-gray-200 bg-gray-50
                       focus:bg-white focus:ring-2 focus:ring-teal-400
                       outline-none transition-all duration-200
                       group-hover:border-teal-300"
            required
          />
        </div>

        {/* PASSWORD */}
        {!forgotMode && (
          <div className="group">
            <label className="text-sm font-medium text-gray-600">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full mt-2 p-3 rounded-xl
                           border border-gray-200 bg-gray-50 pr-10
                           focus:bg-white focus:ring-2 focus:ring-teal-400
                           outline-none transition-all duration-200
                           group-hover:border-teal-300"
                required
              />
              <div
                className="absolute right-3 top-[18px]
                           cursor-pointer text-gray-400
                           hover:text-teal-500 transition"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
          </div>
        )}

        {/* MESSAGE */}
        {message && (
          <p className="text-sm text-center text-gray-600 animate-fadeIn">
            {message}
          </p>
        )}

        {/* BUTTON */}
        <button
          disabled={loading}
          className="w-full py-3 rounded-xl font-semibold text-white
                     bg-[length:200%_200%]
                     bg-gradient-to-r from-blue-500 via-teal-500 to-indigo-500
                     transition-all duration-300
                     hover:shadow-xl hover:shadow-teal-400/30
                     disabled:opacity-60"
        >
          {loading
            ? "Please wait..."
            : forgotMode
            ? "Send Reset Link"
            : "Log In"}
        </button>

        {/* TOGGLES */}
        <div className="text-center text-sm text-gray-500 space-y-2">
          {forgotMode ? (
            <button
              type="button"
              onClick={() => setForgotMode(false)}
              className="text-teal-600 hover:underline"
            >
              Back to login
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setForgotMode(true)}
                className="text-teal-600 hover:underline block"
              >
                Forgot password?
              </button>

              <p>
                Don’t have an account?{" "}
                <Link
                  to="/signup"
                  className="text-teal-600 font-medium hover:underline"
                >
                  Create one
                </Link>
              </p>
            </>
          )}
        </div>

      </form>
    </div>
  </div>
</div>

      </div>
    </div>
  );
};

export default Login;

import React, { useState, useEffect, useRef } from "react";

import { Link } from "react-router-dom";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import axios from "axios";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/signup", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      alert("Signup successful!");
    } catch (error) {
      alert("Signup failed");
      console.log(error);
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

        {/* LEFT – WHY EXPENSE TRACKER */}
        {/* LEFT – CARTOON */}
<div className="hidden lg:flex justify-center items-center px-20 bg-gradient-to-br from-blue-600 to-teal-500">
  <CartoonEyes />
</div>


        {/* RIGHT – SIGNUP FORM */}
<div className="flex items-center justify-center px-6">
  <div
    className="relative w-full max-w-md rounded-2xl p-[1px]
               bg-gradient-to-br from-blue-400 via-teal-400 to-indigo-400
               hover:shadow-2xl transition duration-500"
  >
    <div
      className="bg-white rounded-2xl p-8
                 transition-all duration-300
                 hover:-translate-y-1"
    >
      {/* HEADER */}
      <Link to="/login">
  <h3 className="text-2xl font-bold text-gray-900 cursor-pointer hover:text-teal-600 transition">
    Create your account
  </h3>
</Link>

      <p className="text-gray-500 mt-1">
        Start managing your finances smarter.
      </p>

      <form className="mt-6 space-y-5" onSubmit={handleSignup}>

        {/* NAME */}
        <div className="group">
          <label className="text-sm font-medium text-gray-600">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full mt-2 p-3 rounded-xl border border-gray-200
                       bg-gray-50
                       focus:bg-white focus:ring-2 focus:ring-teal-400
                       transition-all duration-200 outline-none
                       group-hover:border-teal-300"
            required
          />
        </div>

        {/* EMAIL */}
        <div className="group">
          <label className="text-sm font-medium text-gray-600">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="john@example.com"
            className="w-full mt-2 p-3 rounded-xl border border-gray-200
                       bg-gray-50
                       focus:bg-white focus:ring-2 focus:ring-teal-400
                       transition-all duration-200 outline-none
                       group-hover:border-teal-300"
            required
          />
        </div>

        {/* PASSWORD */}
        <div className="group">
          <label className="text-sm font-medium text-gray-600">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full mt-2 p-3 rounded-xl border border-gray-200
                         bg-gray-50 pr-10
                         focus:bg-white focus:ring-2 focus:ring-teal-400
                         transition-all duration-200 outline-none
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

        {/* CONFIRM PASSWORD */}
        <div className="group">
          <label className="text-sm font-medium text-gray-600">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              name="confirm"
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full mt-2 p-3 rounded-xl border border-gray-200
                         bg-gray-50 pr-10
                         focus:bg-white focus:ring-2 focus:ring-teal-400
                         transition-all duration-200 outline-none
                         group-hover:border-teal-300"
              required
            />
            <div
              className="absolute right-3 top-[18px]
                         cursor-pointer text-gray-400
                         hover:text-teal-500 transition"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>
        </div>

        {/* BUTTON */}
        <button
          className="w-full mt-2 py-3 rounded-xl font-semibold text-white
                     bg-[length:200%_200%]
                     bg-gradient-to-r from-blue-500 via-teal-500 to-indigo-500
                     animate-gradientMove
                     hover:shadow-xl hover:shadow-teal-400/30
                     transition-all duration-300"
        >
          Create Account
        </button>

        {/* FOOTER */}
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-teal-500 font-medium hover:underline"
          >
            Log in
          </Link>
        </p>

      </form>
    </div>
  </div>
</div>

      </div>
    </div>
  );
};
const CartoonEyes = () => {
 const eyesRef = useRef([]);


  useEffect(() => {
  const moveEyes = (e) => {
    eyesRef.current.forEach((eye) => {
      if (!eye) return;

      const rect = eye.getBoundingClientRect();
      const eyeX = rect.left + rect.width / 2;
      const eyeY = rect.top + rect.height / 2;

      const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);
      const x = Math.cos(angle) * 6;
      const y = Math.sin(angle) * 6;

      eye.style.transform = `translate(${x}px, ${y}px)`;
    });
  };

  window.addEventListener("mousemove", moveEyes);
  return () => window.removeEventListener("mousemove", moveEyes);
}, []);


  return (
  <div className="relative w-full h-full flex items-center justify-center">

    {/* FAMILY CANVAS */}
    <div className="relative w-[520px] h-[520px]">

      {/* PARENT – CENTER */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2
                      w-56 h-56 bg-gradient-to-br from-indigo-500 to-purple-600
                      rounded-3xl flex items-center justify-center shadow-2xl">
        <div className="flex gap-10">
          {[0, 1].map((i) => (
            <div key={i} className="w-14 h-14 bg-white rounded-full flex items-center justify-center overflow-hidden">
              <div
                ref={(el) => (eyesRef.current[i] = el)}
                className="w-6 h-6 bg-gray-900 rounded-full transition-transform duration-75"
              />
            </div>
          ))}
        </div>
      </div>

      {/* SIBLING LEFT – CIRCLE */}
      <div className="absolute top-56 left-6
                      w-44 h-44 bg-gradient-to-br from-purple-300 to-purple-500
                      rounded-full flex items-center justify-center shadow-xl">
        <div className="flex gap-6">
          {[2, 3].map((i) => (
            <div key={i} className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
              <div
                ref={(el) => (eyesRef.current[i] = el)}
                className="w-4 h-4 bg-gray-900 rounded-full transition-transform duration-75"
              />
            </div>
          ))}
        </div>
      </div>

      {/* SIBLING RIGHT – OVAL */}
      <div className="absolute top-56 right-6
                      w-36 h-52 bg-gradient-to-br from-indigo-300 to-indigo-500
                      rounded-full flex items-center justify-center shadow-xl">
        <div className="flex gap-6">
          {[4, 5].map((i) => (
            <div key={i} className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
              <div
                ref={(el) => (eyesRef.current[i] = el)}
                className="w-4 h-4 bg-gray-900 rounded-full transition-transform duration-75"
              />
            </div>
          ))}
        </div>
      </div>

      {/* KID LEFT – TRIANGLE */}
      <div className="absolute bottom-6 left-28
                      w-32 h-32 bg-gradient-to-br from-purple-200 to-purple-400
                      clip-path-[polygon(50%_0%,_0%_100%,_100%_100%)]
                      flex items-center justify-center shadow-lg">
        <div className="flex gap-4 mt-6">
          {[6, 7].map((i) => (
            <div key={i} className="w-8 h-8 bg-white rounded-full flex items-center justify-center overflow-hidden">
              <div
                ref={(el) => (eyesRef.current[i] = el)}
                className="w-3 h-3 bg-gray-900 rounded-full transition-transform duration-75"
              />
            </div>
          ))}
        </div>
      </div>

      {/* KID RIGHT – SQUIRCLE */}
      <div className="absolute bottom-6 right-28
                      w-32 h-32 bg-gradient-to-br from-indigo-200 to-indigo-400
                      rounded-[40%] flex items-center justify-center shadow-lg">
        <div className="flex gap-4">
          {[8, 9].map((i) => (
            <div key={i} className="w-8 h-8 bg-white rounded-full flex items-center justify-center overflow-hidden">
              <div
                ref={(el) => (eyesRef.current[i] = el)}
                className="w-3 h-3 bg-gray-900 rounded-full transition-transform duration-75"
              />
            </div>
          ))}
        </div>
      </div>

    </div>
  </div>
);


};

export default Signup;

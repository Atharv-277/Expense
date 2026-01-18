import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Shield, Sparkles, TrendingUp } from "lucide-react";

const About = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#F9FAFB] to-[#EEF6F7] pb-20">

      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-12 py-6 bg-white/70 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-teal-600 rounded-full"></div>
          <h1 className="text-xl font-semibold text-gray-800">ExpenseTracker</h1>
        </div>

        <div className="flex items-center gap-10 text-gray-700 font-medium">
          <Link to="/" className="hover:text-gray-900">Home</Link>
          <Link to="/features" className="hover:text-gray-900">Features</Link>
          <Link to="/about" className="text-gray-900 font-semibold">About</Link>
           <Link
                to="/signup"
                className="relative px-6 py-2.5 rounded-lg text-white font-semibold
                           bg-gradient-to-r from-teal-500 to-blue-500
                           shadow-md overflow-hidden
                           hover:shadow-xl hover:-translate-y-0.5
                           transition-all duration-300"
              >
                <span className="relative z-10">Sign Up</span>
                <span className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition" />
              </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="max-w-5xl mx-auto text-center mt-20 px-6">
        <span className="text-teal-700 font-semibold px-4 py-1 bg-teal-100 rounded-full text-sm">
          About ExpenseTracker
        </span>

        <h1 className="text-5xl font-bold text-gray-900 mt-4 leading-tight">
          Designed to Make Your Financial Life Simple
        </h1>

        <p className="text-gray-600 mt-5 text-lg leading-relaxed">
          We created ExpenseTracker to help you stay in control of your money with clear insights,
          smart tracking tools, and effortless budgeting — all in one place.
        </p>
      </section>

      {/* MISSION SECTION */}
      <section className="max-w-5xl mx-auto mt-20 px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
          <p className="text-gray-600 mt-4 leading-relaxed">
            Our goal is simple — to make money management easy and stress-free.
            We aim to empower users with a tool that gives clarity, organization,
            and full control over their financial habits.
          </p>

          <ul className="mt-6 space-y-4 text-gray-700">
            <li className="flex items-center gap-3">
              <CheckCircle className="text-teal-600 w-6 h-6" />
              Track expenses effortlessly
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="text-teal-600 w-6 h-6" />
              Understand spending patterns
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="text-teal-600 w-6 h-6" />
              Build better money habits
            </li>
          </ul>
        </div>

        <div className="w-full h-72 bg-white rounded-3xl shadow-md border border-gray-200 flex items-center justify-center">
          <TrendingUp className="w-40 h-40 text-teal-500 opacity-80" />
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="max-w-6xl mx-auto mt-28 px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900">Why Choose Us?</h2>
        <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
          A modern, user-friendly, and secure platform that helps you take full 
          control of your finances. Everything you need — without the complexity.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
          <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-200 hover:shadow-lg transition-all">
            <Shield className="w-10 h-10 text-teal-600" />
            <h3 className="text-xl font-semibold mt-4">Secure & Reliable</h3>
            <p className="text-gray-600 mt-2 text-sm">
              Your data stays encrypted and protected with industry-standard security.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-200 hover:shadow-lg transition-all">
            <Sparkles className="w-10 h-10 text-teal-600" />
            <h3 className="text-xl font-semibold mt-4">Easy to Use</h3>
            <p className="text-gray-600 mt-2 text-sm">
              A clean and intuitive interface designed for smooth navigation.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-200 hover:shadow-lg transition-all">
            <TrendingUp className="w-10 h-10 text-teal-600" />
            <h3 className="text-xl font-semibold mt-4">Smart Insights</h3>
            <p className="text-gray-600 mt-2 text-sm">
              Clear charts and analytics to help you make informed decisions.
            </p>
          </div>
        </div>
      </section>

      {/* PRODUCT VISION */}
      <section className="max-w-5xl mx-auto mt-28 px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900">Our Vision for the Future</h2>
        <p className="text-gray-600 mt-4 max-w-3xl mx-auto leading-relaxed">
          ExpenseTracker is more than just an app — it's a long-term tool built to evolve.
          We aim to introduce AI-powered tracking, spending predictions, smart alerts,
          and advanced savings features to help users achieve full financial freedom.
        </p>
      </section>

    </div>
  );
};

export default About;

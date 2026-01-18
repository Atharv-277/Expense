import React from "react";
import { Link } from "react-router-dom";
import {
  Tag,
  PieChart,
  BarChart3,
  Target,
  Search,
  Calculator,
  Lock,
  Smartphone,
} from "lucide-react";

const features = [
  {
    icon: <Tag className="w-8 h-8 text-teal-600" />,
    title: "Add expenses with categories",
    desc: "Quickly log purchases and assign categories for effortless tracking.",
  },
  {
    icon: <PieChart className="w-8 h-8 text-teal-600" />,
    title: "View your total spending",
    desc: "Instant overview of where your money is going every month.",
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-teal-600" />,
    title: "See monthly charts and graphs",
    desc: "Visualize your habits with clean and intuitive graphs.",
  },
  {
    icon: <Target className="w-8 h-8 text-teal-600" />,
    title: "Track budgets easily",
    desc: "Set spending limits and stay on target with budget alerts.",
  },
  {
    icon: <Search className="w-8 h-8 text-teal-600" />,
    title: "Search and filter expenses",
    desc: "Find any transaction instantly with smart search tools.",
  },
  {
    icon: <Calculator className="w-8 h-8 text-teal-600" />,
    title: "Auto calculate totals",
    desc: "No manual math — totals and summaries update automatically.",
  },
  {
    icon: <Lock className="w-8 h-8 text-teal-600" />,
    title: "Secure login system",
    desc: "Your data stays protected with industry-standard encryption.",
  },
  {
    icon: <Smartphone className="w-8 h-8 text-teal-600" />,
    title: "Works on all devices",
    desc: "Fully responsive design for desktop, tablet, and mobile.",
  },
];

const Features = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#F9FAFB] to-[#EEF6F7] pb-20">

      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-12 py-5 
                bg-white/70 backdrop-blur-xl 
                border-b border-gray-200 
                sticky top-0 z-50
                shadow-[0_6px_25px_rgba(0,0,0,0.04)]">

  {/* LOGO */}
  <div className="flex items-center gap-3 cursor-pointer group">
    <div className="relative">
      <div className="w-4 h-4 bg-teal-600 rounded-full 
                      group-hover:scale-110 transition-transform duration-300" />
      <div className="absolute inset-0 bg-teal-400/40 blur-md rounded-full 
                      opacity-0 group-hover:opacity-100 transition" />
    </div>

    <h1 className="text-xl font-semibold text-gray-800 
                   group-hover:text-teal-600 transition-colors duration-300">
      ExpenseTracker
    </h1>
  </div>

  {/* LINKS */}
  <div className="flex items-center gap-10 text-gray-700 font-medium">

    {/* Home */}
    <Link
      to="/"
      className="relative group hover:text-gray-900 transition"
    >
      Home
      <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-teal-600
                       group-hover:w-full transition-all duration-300" />
    </Link>

    {/* Features (active) */}
    <Link
      to="/features"
      className="relative text-gray-900 font-semibold"
    >
      Features
      <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-teal-600" />
    </Link>

    {/* About */}
    <Link
      to="/about"
      className="relative group hover:text-gray-900 transition"
    >
      About
      <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-teal-600
                       group-hover:w-full transition-all duration-300" />
    </Link>

    {/* CTA */}
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


      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto mt-16">
        <span className="text-teal-700 font-semibold px-4 py-1 bg-teal-100 rounded-full text-sm">
          Powerful Tools
        </span>

        <h1 className="text-5xl font-bold text-gray-900 mt-4">
          Everything You Need to Manage Your Money
        </h1>

        <p className="text-gray-600 mt-4 leading-relaxed text-lg">
          A clean, modern, and intuitive platform designed to simplify your financial journey
          and give you full control over your spending habits.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16 px-8 sm:px-14">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-7 border border-gray-200 shadow-sm 
                       hover:shadow-lg hover:scale-[1.03] hover:border-teal-300
                       transition-all duration-300 cursor-pointer"
          >
            <div className="p-3 rounded-xl bg-teal-50 inline-block">
              {item.icon}
            </div>

            <h2 className="text-xl font-semibold mt-5 text-gray-900">
              {item.title}
            </h2>

            <p className="text-gray-600 text-sm mt-3 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Features;

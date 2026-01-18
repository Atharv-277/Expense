import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-4xl mx-auto flex items-center px-6 py-3">
        {/* left */}
        <div className="flex items-center gap-3">
          <div className="group flex items-center gap-2 cursor-pointer">
            <div className="w-4 h-4 bg-blue-600 rounded-full transform transition-transform duration-300 group-hover:scale-110" />
            <h1 className="text-lg font-semibold text-gray-800 transition-colors duration-200 group-hover:text-blue-600">
              ExpenseTracker
            </h1>
          </div>
        </div>

        {/* right - Home & Features */}
        <div className="flex items-center gap-4 ml-auto text-gray-600">
          <Link to="/" className="group relative px-2 py-1 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 transition">
            <span className="relative z-10">Home</span>
            <span className="absolute left-2 right-2 -bottom-0.5 h-0.5 bg-blue-600 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
          </Link>

          <Link to="/features" className="group relative px-2 py-1 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 transition">
            <span className="relative z-10">Features</span>
            <span className="absolute left-2 right-2 -bottom-0.5 h-0.5 bg-blue-600 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

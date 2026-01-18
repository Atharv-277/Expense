import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  List,
  LogOut,
  MessageSquare,
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const navItem = (to, label, Icon) => {
    const isActive = location.pathname === to;

    return (
      <Link
        to={to}
        className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-lg
        transition-all duration-300
        ${
          isActive
            ? "bg-gradient-to-r from-teal-50 to-blue-50 text-teal-600 font-medium"
            : "text-gray-700 hover:text-teal-600 hover:bg-gray-50"
        }`}
      >
        {/* Left accent bar */}
        <span
          className={`absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full
          transition-all duration-300
          ${isActive ? "bg-teal-500" : "bg-transparent group-hover:bg-teal-400"}`}
        />

        <Icon
          size={18}
          className="transition-transform duration-300 group-hover:scale-110"
        />

        <span className="tracking-wide">{label}</span>
      </Link>
    );
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-100 fixed top-0 left-0 h-full p-6 hidden md:flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-12">
        <div className="w-6 h-6 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full animate-pulse" />
        <h1 className="text-lg font-semibold text-gray-800 tracking-tight">
          ExpenseTracker
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItem("/dashboard", "Dashboard", LayoutDashboard)}
        {navItem("/add-expense", "Add Expense", PlusCircle)}
        {navItem("/all-expenses", "All Expenses", List)}
        {navItem("/review", "Write a Review", MessageSquare)}
        {navItem("/settings", "Settings", LayoutDashboard)}
      </nav>

      {/* Logout */}
      <div className="pt-6 border-t border-gray-100">
        <Link
          to="/"
          className="group flex items-center gap-3 px-3 py-2.5 rounded-lg
          text-gray-700 hover:text-red-500 hover:bg-red-50
          transition-all duration-300"
        >
          <LogOut
            size={18}
            className="transition-transform duration-300 group-hover:scale-110"
          />
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
}

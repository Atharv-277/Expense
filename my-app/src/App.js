import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AddExpenses from "./pages/AddExpenses";
import AllExpenses from "./pages/Allexpenses";
import Features from "./pages/Features";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import About from "./pages/About";
import Review from "./pages/Review";
import Settings from "./pages/Settings";



import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<About />} />
        <Route path="/settings" element={<Settings />} />


        {/* Auth recovery */}
        
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* App pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-expense" element={<AddExpenses />} />
        <Route path="/all-expenses" element={<AllExpenses />} />
        <Route path="/review" element={<Review />} />

      </Routes>
    </Router>
  );
}

export default App;

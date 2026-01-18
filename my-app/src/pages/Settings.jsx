import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { User, Lock, Settings as SettingsIcon, AlertTriangle } from "lucide-react";

const Settings = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [name, setName] = useState(storedUser?.name || "");
  const [email] = useState(storedUser?.email || "");
  const [currency, setCurrency] = useState(
    localStorage.getItem("currency") || "INR"
  );

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");

  const saveProfile = () => {
    const updated = { ...storedUser, name };
    localStorage.setItem("user", JSON.stringify(updated));
    setMessage("Profile updated successfully");
  };

  const savePassword = async () => {
  if (newPassword !== confirmPassword) {
    setMessage("Passwords do not match");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      "http://localhost:5000/api/auth/change-password",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.message || "Failed to update password");
      return;
    }

    setMessage("Password updated successfully");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  } catch (error) {
    setMessage("Server error while changing password");
  }
};


  const saveCurrency = () => {
    localStorage.setItem("currency", currency);
    setMessage("Preferences saved");
  };
  const handleDeleteAccount = async () => {
  const confirmDelete = window.confirm(
    "Are you sure? This will permanently delete your account."
  );

  if (!confirmDelete) return;

  try {
    const token = localStorage.getItem("token");

    await fetch("http://localhost:5000/api/auth/me", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    localStorage.clear();
    window.location.href = "/login";
  } catch (error) {
    alert("Failed to delete account");
  }
};


  return (
    <div className="min-h-screen bg-[#F8FBFD] flex">
      <Sidebar />

      <main className="md:ml-64 flex-1 p-8 max-w-5xl">
        {/* HEADER */}
        <h2 className="text-3xl font-bold text-gray-900 mb-1">
          Settings
        </h2>
        <p className="text-gray-500 mb-10">
          Customize your finance tracking experience
        </p>

        {message && (
          <div className="mb-8 px-4 py-3 rounded-xl bg-green-50 text-green-700 animate-fadeIn">
            {message}
          </div>
        )}

        {/* PROFILE */}
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 mb-8 p-6">
          <div className="flex items-center gap-2 mb-5">
            <User className="text-blue-500" size={20} />
            <h3 className="text-lg font-semibold">Profile Settings</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-500">Full Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 px-4 py-2.5 rounded-xl border bg-gray-50
                           focus:bg-white focus:ring-2 focus:ring-blue-400
                           outline-none transition"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Email Address</label>
              <input
                value={email}
                disabled
                className="w-full mt-1 px-4 py-2.5 rounded-xl border
                           bg-gray-100 text-gray-400 cursor-not-allowed"
              />
            </div>
          </div>

          <button
            onClick={saveProfile}
            className="mt-6 px-6 py-2.5 rounded-xl
                       bg-gradient-to-r from-blue-500 to-teal-500
                       text-white font-medium
                       hover:shadow-lg hover:scale-[1.02]
                       transition-all"
          >
            Save Profile
          </button>
        </div>

        {/* PASSWORD */}
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 mb-8 p-6">
          <div className="flex items-center gap-2 mb-5">
            <Lock className="text-indigo-500" size={20} />
            <h3 className="text-lg font-semibold">Change Password</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="password"
              placeholder="Current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="px-4 py-2.5 rounded-xl border bg-gray-50
                         focus:bg-white focus:ring-2 focus:ring-indigo-400
                         outline-none transition"
            />

            <div />

            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="px-4 py-2.5 rounded-xl border bg-gray-50
                         focus:bg-white focus:ring-2 focus:ring-indigo-400
                         outline-none transition"
            />

            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="px-4 py-2.5 rounded-xl border bg-gray-50
                         focus:bg-white focus:ring-2 focus:ring-indigo-400
                         outline-none transition"
            />
          </div>

          <button
            onClick={savePassword}
            className="mt-6 px-6 py-2.5 rounded-xl
                       bg-gray-900 text-white font-medium
                       hover:bg-gray-800 hover:shadow-lg
                       transition-all"
          >
            Update Password
          </button>
        </div>

        {/* DANGER ZONE */}
        <div className="rounded-2xl bg-red-50 border border-red-200 p-6">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="text-red-500" size={20} />
            <h3 className="text-lg font-semibold text-red-600">
              Danger Zone
            </h3>
          </div>

          <p className="text-sm text-red-500 mb-4">
            Permanently delete your account and all associated transaction data.
            This action cannot be undone.
          </p>

          <button
  onClick={handleDeleteAccount}
  className="px-6 py-2.5 rounded-xl
             border border-red-300
             text-red-600 font-medium
             hover:bg-red-600 hover:text-white
             hover:shadow-lg
             transition-all"
>
  Delete Account
</button>

        </div>
      </main>
    </div>
  );
};

export default Settings;

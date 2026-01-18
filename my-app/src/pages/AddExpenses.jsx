// src/pages/AddExpenses.jsx
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { addExpense } from "../api/expenses";

const AddExpenses = () => {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    note: "",
    paymentMethod: "UPI",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const data = {
        title: form.title,
        amount: Number(form.amount),
        category: form.category,
        date: form.date,
        note: form.note,
        paymentMethod: form.paymentMethod,
      };

      const result = await addExpense(data);

      if (result && (result._id || result.id)) {
        setMessage("Expense added successfully");
      } else {
        setMessage("Expense added");
      }

      setForm({
        title: "",
        amount: "",
        category: "",
        date: "",
        note: "",
        paymentMethod: "UPI",
      });
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to add expense. Check backend.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      <Sidebar />

      <div className="md:ml-64 flex-1 px-6 py-12">
        <div
  className="max-w-2xl mx-auto
             animate-[fadeInUp_0.6s_ease-out]"
>


          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Add Expense
            </h1>
            <p className="text-gray-600 mt-1">
              Track where your money goes and stay in control
            </p>
          </div>

          {/* CARD */}
          <div
  className="bg-white rounded-2xl border border-gray-100 p-8
             shadow-lg hover:shadow-2xl
             transition-all duration-300"
>


            {message && (
  <div className="mb-6 p-4 rounded-lg bg-green-50 text-green-700 font-medium
                  animate-[fadeIn_0.4s_ease-out]">
    {message}
  </div>
)}

{error && (
  <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-700 font-medium
                  animate-[shake_0.4s_ease-in-out]">
    {error}
  </div>
)}


            <form onSubmit={handleSubmit} className="space-y-6">

              {/* TITLE */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Expense Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Grocery shopping, Rent, Electricity bill"
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-400 focus:outline-none transition"
                  required
                />
              </div>

              {/* AMOUNT + DATE */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Amount (₹)
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                    placeholder="500"
                    step="0.01"
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-400 focus:outline-none transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-400 focus:outline-none transition"
                    required
                  />
                </div>
              </div>

              {/* CATEGORY + PAYMENT */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-xl bg-white focus:ring-2 focus:ring-teal-400 focus:outline-none transition"
                    required
                  >
                    <option value="">Select category</option>
                    <option>Food</option>
                    <option>Transport</option>
                    <option>Shopping</option>
                    <option>Bills</option>
                    <option>Entertainment</option>
                    <option>Health</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Payment Method
                  </label>
                  <select
                    name="paymentMethod"
                    value={form.paymentMethod}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-xl bg-white focus:ring-2 focus:ring-teal-400 focus:outline-none transition"
                  >
                    <option value="UPI">UPI</option>
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                    <option value="NetBanking">Net Banking</option>
                    <option value="Wallet">Wallet</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="note"
                  value={form.note}
                  onChange={handleChange}
                  placeholder="Optional note about this expense"
                  className="w-full px-4 py-3 border rounded-xl min-h-[120px] focus:ring-2 focus:ring-teal-400 focus:outline-none transition"
                />
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                className="w-full mt-4 bg-gradient-to-r from-teal-500 to-blue-500 
                           text-white py-3 rounded-xl font-semibold 
                           hover:opacity-95 transition transform hover:-translate-y-0.5 shadow-lg"
              >
                Add Expense
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExpenses;

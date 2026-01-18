// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { PlusCircle, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ExpenseHeatmap from "../components/ExpenseHeatmap";

import {
  getSummary,
  fetchExpenses,
  getBudget,
  setBudget,
  getHeatmap,
} from "../api/expenses";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip as ReTooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const COLORS = [
  "#34D399",
  "#60A5FA",
  "#FBBF24",
  "#F472B6",
  "#A78BFA",
  "#F87171",
];

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [recent, setRecent] = useState([]);
  const [budget, setBudgetData] = useState(null);
  const [budgetInput, setBudgetInput] = useState("");
  const [savingBudget, setSavingBudget] = useState(false);
  const [heatmapData, setHeatmapData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));


  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const s = await getSummary();
        setSummary(s);

        const b = await getBudget();
        setBudgetData(b);
        setBudgetInput(b?.monthlyBudget || "");

        const r = await fetchExpenses({ page: 1 });
        setRecent((r.items || []).slice(0, 4));

        const h = await getHeatmap(60);
        setHeatmapData(h);
      } catch (e) {
        setErr(e.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSaveBudget = async () => {
    if (budgetInput === "" || Number(budgetInput) < 0) return;
    setSavingBudget(true);
    try {
      const updated = await setBudget(Number(budgetInput));
      setBudgetData((prev) => ({
        ...prev,
        monthlyBudget: updated.monthlyBudget,
      }));
    } finally {
      setSavingBudget(false);
    }
  };

  const pieData = (summary?.categoryDistribution || []).map((c) => ({
    name: c.category,
    value: Number(c.amount || 0),
  }));

  const lineData = (summary?.monthlyTotals || []).map((m) => ({
    name: m.label,
    amount: Number(m.amount || 0),
  }));

  const fmt = (v) => `₹${Number(v || 0).toLocaleString()}`;

  return (
    <div className="min-h-screen bg-[#F8FBFD] flex">
      <Sidebar />

      <main className="md:ml-64 flex-1 p-8">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
  Welcome back{user?.name ? `, ${user.name}` : ""} 👋
</h2>

            <p className="text-gray-500 mt-1">
              Here’s a quick snapshot of your finances.
            </p>
          </div>
          
        </div>

        {err && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-700">
            {err}
          </div>
        )}

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <div className="relative p-6 rounded-2xl bg-white shadow hover:shadow-lg transition">
            <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-teal-400 to-blue-400 rounded-t-2xl" />
            <p className="text-gray-500">Overall Spent</p>

            <h3 className="text-3xl font-semibold mt-3">
             {loading ? "…" : fmt(summary?.overallSpent)}

            </h3>
          </div>

          <div className="relative p-6 rounded-2xl bg-white shadow hover:shadow-lg transition">
            <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-indigo-400 to-purple-400 rounded-t-2xl" />
            <p className="text-gray-500">Active Categories</p>
            <h3 className="text-3xl font-semibold mt-3">
              {summary?.categoryDistribution?.length || 0}
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              Last 6 months
            </p>
          </div>
        </div>

        {/* BUDGET */}
{budget && (
  <div className="mb-10">
    <div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-teal-400 via-blue-400 to-indigo-400">
      <div className="p-6 rounded-2xl bg-white shadow-lg">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-blue-600">
  Monthly Budget
</h3>

          <span className="text-sm text-gray-500">
            {budget.percentage}% used
          </span>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

          {/* INPUT */}
          <div className="space-y-3">
            <label className="text-sm text-gray-500">
              Budget Amount
            </label>

            <input
              type="number"
              value={budgetInput}
              onChange={(e) => setBudgetInput(e.target.value)}
              className="w-full rounded-xl border border-gray-200
                         px-4 py-2.5 bg-gray-50
                         focus:bg-white focus:ring-2 focus:ring-teal-400
                         outline-none transition"
            />

            <button
              onClick={handleSaveBudget}
              disabled={savingBudget}
              className="w-full py-2.5 rounded-xl font-medium text-white
                         bg-gradient-to-r from-teal-500 to-blue-500
                         transition-all duration-300
                         hover:shadow-lg hover:shadow-teal-400/30
                         disabled:opacity-50"
            >
              {savingBudget ? "Saving..." : "Save Budget"}
            </button>
          </div>

          {/* SPENT */}
          <div className="flex flex-col justify-center">
            <p className="text-sm text-gray-500">Spent</p>
            <h4 className="text-2xl font-semibold text-gray-900 mt-1">
              {fmt(budget.spent)}
            </h4>
          </div>

          {/* REMAINING */}
          <div className="flex flex-col justify-center">
            <p className="text-sm text-gray-500">Remaining</p>
            <h4
              className={`text-2xl font-semibold mt-1 transition ${
                budget.remaining <= 0
                  ? "text-red-600"
                  : budget.remaining < budget.total * 0.25
                  ? "text-yellow-500"
                  : "text-green-600"
              }`}
            >
              {fmt(budget.remaining)}
            </h4>
          </div>
        </div>

        {/* PROGRESS */}
        <div className="mt-8">
          <div className="h-3 rounded-full bg-gray-200 overflow-hidden">
            <div
              className={`h-full transition-all duration-700
                ${
                  budget.percentage > 100
                    ? "bg-gradient-to-r from-red-500 to-red-600"
                    : budget.percentage > 75
                    ? "bg-gradient-to-r from-yellow-400 to-orange-400"
                    : "bg-gradient-to-r from-green-400 to-teal-400"
                }
              `}
              style={{
                width: `${Math.min(budget.percentage, 100)}%`,
              }}
            />
          </div>

          <p className="mt-2 text-sm text-gray-500">
            {budget.percentage}% of your monthly budget used
          </p>
        </div>

      </div>
    </div>
  </div>
)}


        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2 p-6 rounded-2xl bg-white shadow">
            <h3 className="text-lg font-semibold mb-4">
              Spending Trend
            </h3>
            <div className="h-[220px]">
              <ResponsiveContainer>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ReTooltip />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#10B981"
                    strokeWidth={3}
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white shadow">
            <h3 className="text-lg font-semibold mb-4">
              Category Split
            </h3>
            <div className="h-[220px]">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    outerRadius={70}
                    label
                  >
                    {pieData.map((_, i) => (
                      <Cell
                        key={i}
                        fill={COLORS[i % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <ReTooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* HEATMAP */}
        <div className="mb-10 p-6 rounded-2xl bg-white shadow">
          <ExpenseHeatmap data={heatmapData} />
        </div>

        {/* RECENT */}
        <div className="p-6 rounded-2xl bg-white shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              Recent Expenses
            </h3>
            <Link
              to="/all-expenses"
              className="text-sm text-teal-600 hover:underline"
            >
              View all
            </Link>
          </div>

          <table className="w-full">
            <thead>
              <tr className="text-gray-500 text-sm">
                <th className="py-2 text-left">Category</th>
                <th className="text-left">Amount</th>
                <th className="text-left">Date</th>
                <th className="text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              {recent.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-gray-400">
                    No recent expenses
                  </td>
                </tr>
              ) : (
                recent.map((r) => (
                  <tr
                    key={r._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="py-3">{r.category}</td>
                    <td>{fmt(r.amount)}</td>
                    <td>
                      {new Date(r.date).toLocaleDateString()}
                    </td>
                    <td className="truncate max-w-[200px]">
                      {r.note || "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* FLOATING ADD */}
      <Link
        to="/add-expense"
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center text-white shadow-xl hover:scale-110 transition"
      >
        <PlusCircle size={26} />
      </Link>
    </div>
  );
};

export default Dashboard;

import React, { useEffect, useState } from "react";
import {
  Search,
  Filter,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Trash2,
  X,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import {
  fetchExpenses,
  deleteExpense,
  getExpenseById,
} from "../api/expenses";

const categoryColors = {
  Food: "bg-emerald-100 text-emerald-700",
  Transport: "bg-sky-100 text-sky-700",
  Shopping: "bg-purple-100 text-purple-700",
  Bills: "bg-yellow-100 text-yellow-700",
  Health: "bg-red-100 text-red-700",
  Fun: "bg-pink-100 text-pink-700",
  Travel: "bg-indigo-100 text-indigo-700",
};

const AllExpenses = () => {
  const [expensesData, setExpensesData] = useState({
    items: [],
    totalPages: 1,
    page: 1,
  });
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const [selectedExpense, setSelectedExpense] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsErr, setDetailsErr] = useState("");

  const load = async (p = 1, overrides = {}) => {
    const useQ = overrides.q ?? q;
    const useCategory = overrides.category ?? category;
    const useDate = overrides.date ?? date;

    setLoading(true);
    setErr(null);
    try {
      const data = await fetchExpenses({
        page: p,
        q: useQ,
        category: useCategory,
        date: useDate,
      });

      if (Array.isArray(data)) {
        setExpensesData({ items: data, totalPages: 1, page: p });
      } else {
        setExpensesData({
          items: data.items || [],
          totalPages: data.totalPages || 1,
          page: data.page || p,
        });
      }
    } catch (e) {
      setErr(e.message || "Failed to load expenses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(1);
  }, []);

  const applyFilters = () => {
    setPage(1);
    load(1, { q, category, date });
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm("Delete this expense?")) return;

    await deleteExpense(id);
    load(page, { q, category, date });
  };

  const openDetails = async (id) => {
    setSelectedExpense(null);
    setDetailsErr("");
    setDetailsLoading(true);
    try {
      const data = await getExpenseById(id);
      setSelectedExpense(data);
    } catch (e) {
      setDetailsErr("Failed to load details");
    } finally {
      setDetailsLoading(false);
    }
  };

  const closeDetails = () => {
    setSelectedExpense(null);
    setDetailsErr("");
  };

  return (
    <div className="min-h-screen bg-[#F8FBFD] flex">
      <Sidebar />

      <main className="md:ml-64 flex-1 p-8">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-800">All Expenses</h1>

          <div className="flex flex-wrap gap-3">
            {/* Search */}
            <div className="flex items-center bg-white px-4 py-2 rounded-xl shadow-sm border focus-within:ring-2 ring-teal-500/40">
              <Search size={18} />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && applyFilters()}
                placeholder="Search..."
                className="ml-2 text-sm outline-none bg-transparent"
              />
            </div>

            {/* Category */}
            <div className="flex items-center bg-white px-4 py-2 rounded-xl shadow-sm border">
              <Filter size={18} />
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  load(1, { category: e.target.value });
                }}
                className="ml-2 text-sm bg-transparent outline-none"
              >
                <option value="">All Categories</option>
                {Object.keys(categoryColors).map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div className="flex items-center bg-white px-4 py-2 rounded-xl shadow-sm border">
              <Calendar size={18} />
              <input
                type="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  load(1, { date: e.target.value });
                }}
                className="ml-2 text-sm bg-transparent outline-none"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-lg border overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center">Loading...</div>
          ) : err ? (
            <div className="p-8 text-center text-red-600">{err}</div>
          ) : (
            <table className="w-full min-w-[800px]">
              <thead className="bg-gray-50 text-sm text-gray-600">
                <tr>
                  <th className="px-6 py-4 text-left">Category</th>
                  <th className="px-6 py-4 text-left">Amount</th>
                  <th className="px-6 py-4 text-left">Date</th>
                  <th className="px-6 py-4 text-left">Payment</th>
                  <th className="px-6 py-4 text-left">Notes</th>
                  <th className="px-6 py-4 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {expensesData.items.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-gray-500">
                      No expenses found
                    </td>
                  </tr>
                ) : (
                  expensesData.items.map((it) => (
                    <tr
                      key={it._id}
                      onClick={() => openDetails(it._id)}
                      className="border-t hover:bg-gray-50 transition cursor-pointer"
                    >
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-xs rounded-full font-medium ${
                            categoryColors[it.category] || "bg-gray-100"
                          }`}
                        >
                          {it.category}
                        </span>
                      </td>

                      <td className="px-6 py-4 font-medium">
                        ₹{Number(it.amount).toLocaleString()}
                      </td>

                      <td className="px-6 py-4">
                        {new Date(it.date).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4">
                        {it.paymentMethod || "-"}
                      </td>

                      <td className="px-6 py-4 max-w-[200px] truncate">
                        {it.note || "-"}
                      </td>

                      <td className="px-6 py-4">
                        <button
                          onClick={(e) => handleDelete(it._id, e)}
                          className="flex items-center gap-1 text-red-600 hover:bg-red-50 px-3 py-1 rounded-lg"
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-6 mt-8">
          <button
            disabled={page === 1}
            onClick={() => load(page - 1)}
            className="p-2 rounded-lg bg-white shadow disabled:opacity-40"
          >
            <ChevronLeft />
          </button>

          <span className="text-sm text-gray-600">
            Page {page} of {expensesData.totalPages}
          </span>

          <button
            disabled={page === expensesData.totalPages}
            onClick={() => load(page + 1)}
            className="p-2 rounded-lg bg-white shadow disabled:opacity-40"
          >
            <ChevronRight />
          </button>
        </div>
      </main>

      {/* Details Modal */}
      {(selectedExpense || detailsLoading) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={closeDetails}
          />
          <div className="relative bg-white rounded-xl shadow-2xl p-6 w-[90%] max-w-lg animate-scaleIn">
            <button onClick={closeDetails} className="absolute top-4 right-4">
              <X />
            </button>

            {detailsLoading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <>
                <h3 className="text-xl font-semibold mb-4">
                  {selectedExpense.category}
                </h3>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Amount</p>
                    <p className="font-medium">
                      ₹{selectedExpense.amount}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Date</p>
                    <p className="font-medium">
                      {new Date(
                        selectedExpense.date
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-gray-500 text-sm">Notes</p>
                  <p className="mt-1">{selectedExpense.note || "-"}</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllExpenses;

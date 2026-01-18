const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Expense = require("../models/Expense");
const auth = require("../middleware/auth");

// helper to convert ID safely
function toObjectId(val) {
  if (!val) return null;
  if (val instanceof mongoose.Types.ObjectId) return val;
  try {
    return new mongoose.Types.ObjectId(val);
  } catch {
    return null;
  }
}

/* ------------------------------------------------------
   GET /api/expenses 
   (List expenses with filters + pagination)
   Supports: q, category, date, paymentMethod
------------------------------------------------------ */
router.get("/", auth, async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page || "1"));
    const limit = 20;

    const q = (req.query.q || "").trim();
    const category = (req.query.category || "").trim();
    const date = (req.query.date || "").trim();
    const paymentMethod = (req.query.paymentMethod || "").trim();

    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const filter = { userId: toObjectId(userId) };

    // TEXT search
    if (q) {
      const regex = { $regex: q, $options: "i" };
      filter.$or = [
        { title: regex },
        { note: regex },
        { category: regex },
        { paymentMethod: regex },
      ];
    }

    // CATEGORY filter (case insensitive, exact match)
    if (category) {
      filter.category = { $regex: `^${category}$`, $options: "i" };
    }

    // PAYMENT METHOD filter (case insensitive, exact match)
    if (paymentMethod) {
      filter.paymentMethod = { $regex: `^${paymentMethod}$`, $options: "i" };
    }

    // DATE filter (local day)
    if (date) {
      const d = new Date(date);
      if (!isNaN(d.getTime())) {
        const start = new Date(d.getFullYear(), d.getMonth(), d.getDate());
        const end = new Date(start);
        end.setDate(start.getDate() + 1);
        filter.date = { $gte: start, $lt: end };
      }
    }

    const skip = (page - 1) * limit;
    const items = await Expense.find(filter)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Expense.countDocuments(filter);
    const totalPages = Math.max(1, Math.ceil(total / limit));

    res.json({ items, totalPages, page });
  } catch (err) {
    console.error("Fetch expenses:", err);
    res.status(500).json({ message: "Failed to fetch expenses" });
  }
});

/* ------------------------------------------------------
   POST /api/expenses
------------------------------------------------------ */
router.post("/", auth, async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { title, amount, category, date, note, paymentMethod } = req.body;
    if (!title || !amount || !date) {
      return res.status(400).json({ message: "title, amount, date are required" });
    }

    const expense = new Expense({
      userId: toObjectId(userId),
      title,
      amount: Number(amount),
      category: category || "Other",
      date: new Date(date),
      note: note || "",
      paymentMethod: paymentMethod || "UPI",
    });

    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    console.error("Create error:", err);
    res.status(500).json({ message: "Failed to create expense" });
  }
});

/* ------------------------------------------------------
   GET /api/expenses/summary
   (For charts)  -- IMPORTANT: keep this BEFORE the param route
------------------------------------------------------ */
router.get("/summary", auth, async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

    // Total spent this month
    const monthAgg = await Expense.aggregate([
      { $match: { userId: toObjectId(userId), date: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalSpent = monthAgg[0]?.total || 0;
    // Overall spent (ALL TIME)
const overallAgg = await Expense.aggregate([
  { $match: { userId: toObjectId(userId) } },
  { $group: { _id: null, total: { $sum: "$amount" } } },
]);

const overallSpent = overallAgg[0]?.total || 0;


    // Category distribution
    const catAgg = await Expense.aggregate([
      { $match: { userId: toObjectId(userId), date: { $gte: sixMonthsAgo } } },
      { $group: { _id: "$category", amount: { $sum: "$amount" } } },
      { $sort: { amount: -1 } },
    ]);
    const categoryDistribution = catAgg.map((c) => ({
      category: c._id,
      amount: c.amount,
    }));

    // Monthly totals for last 6 months
    const monthsAgg = await Expense.aggregate([
      { $match: { userId: toObjectId(userId), date: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: { year: { $year: "$date" }, month: { $month: "$date" } },
          amount: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    const monthlyTotals = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const found = monthsAgg.find(
        (m) => m._id.year === d.getFullYear() && m._id.month === d.getMonth() + 1
      );

      monthlyTotals.push({
        label: d.toLocaleString("default", { month: "short" }),
        amount: found ? found.amount : 0,
      });
    }

    res.json({
  totalSpent,        // this month
  overallSpent,     // ✅ all time
  categoryDistribution,
  monthlyTotals,
});

  } catch (err) {
    console.error("Summary error:", err);
    res.status(500).json({ message: "Failed to fetch summary" });
  }
});

/* ------------------------------------------------------
   GET /api/expenses/:id  <-- fetch single expense
------------------------------------------------------ */
/* ------------------------------------------------------
   GET /api/expenses/heatmap
   Daily spending data for heatmap
------------------------------------------------------ */
router.get("/heatmap", auth, async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const days = Math.min(parseInt(req.query.days || "30"), 365);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const start = new Date();
    start.setDate(end.getDate() - (days - 1));
    start.setHours(0, 0, 0, 0);

    const data = await Expense.aggregate([
      {
        $match: {
          userId: toObjectId(userId),
          date: { $gte: start, $lte: end },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$date" },
          },
          total: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
    ]);

    const map = {};
    data.forEach((d) => {
      map[d._id] = { date: d._id, total: d.total, count: d.count };
    });

    const result = [];
    const cursor = new Date(start);

    while (cursor <= end) {
      const key = cursor.toLocaleDateString("en-CA");

      result.push(
        map[key] || { date: key, total: 0, count: 0 }
      );
      cursor.setDate(cursor.getDate() + 1);
    }

    res.json(result);
  } catch (err) {
    console.error("Heatmap error:", err);
    res.status(500).json({ message: "Failed to fetch heatmap data" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { id } = req.params;
    if (!toObjectId(id)) return res.status(400).json({ message: "Invalid id" });

    const expense = await Expense.findById(id).lean();
    if (!expense) return res.status(404).json({ message: "Expense not found" });

    if (expense.userId.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(expense);
  } catch (err) {
    console.error("Get expense error:", err);
    res.status(500).json({ message: "Failed to fetch expense" });
  }
});

/* ------------------------------------------------------
   PUT /api/expenses/:id
------------------------------------------------------ */
router.put("/:id", auth, async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: "Not found" });

    if (expense.userId.toString() !== userId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    Object.assign(expense, req.body);
    await expense.save();

    res.json(expense);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Failed to update" });
  }
});

/* ------------------------------------------------------
   DELETE /api/expenses/:id
------------------------------------------------------ */
router.delete("/:id", auth, async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: "Not found" });

    if (expense.userId.toString() !== userId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await Expense.deleteOne({ _id: req.params.id });

    res.json({ success: true });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Failed to delete" });
  }
});

module.exports = router;

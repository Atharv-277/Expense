const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Budget = require("../models/Budget");
const Expense = require("../models/Expense");
const auth = require("../middleware/auth");

// helper
function toObjectId(val) {
  try {
    return new mongoose.Types.ObjectId(val);
  } catch {
    return null;
  }
}

/* ------------------------------------------------------
   GET /api/budget
   Get budget + current month usage
------------------------------------------------------ */
router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const budget = await Budget.findOne({ userId }).lean();

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const agg = await Expense.aggregate([
      {
        $match: {
          userId: toObjectId(userId),
          date: { $gte: startOfMonth },
        },
      },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const spent = agg[0]?.total || 0;
    const monthlyBudget = budget?.monthlyBudget || 0;

    res.json({
      monthlyBudget,
      spent,
      remaining: Math.max(monthlyBudget - spent, 0),
      percentage:
        monthlyBudget > 0 ? Math.round((spent / monthlyBudget) * 100) : 0,
    });
  } catch (err) {
    console.error("Get budget error:", err);
    res.status(500).json({ message: "Failed to fetch budget" });
  }
});

/* ------------------------------------------------------
   POST /api/budget
   Set or update monthly budget
------------------------------------------------------ */
router.post("/", auth, async (req, res) => {
  try {
    const userId = req.user?.id;
    const { monthlyBudget } = req.body;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (monthlyBudget == null || monthlyBudget < 0) {
      return res.status(400).json({ message: "Invalid budget amount" });
    }

    const budget = await Budget.findOneAndUpdate(
      { userId },
      { monthlyBudget },
      { upsert: true, new: true }
    );

    res.json(budget);
  } catch (err) {
    console.error("Save budget error:", err);
    res.status(500).json({ message: "Failed to save budget" });
  }
});

module.exports = router;

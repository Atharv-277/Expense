// expense-tracker-backend/models/Expense.js
const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    title: { type: String, required: true, trim: true },
    amount: { type: Number, required: true },
    category: { type: String, default: "Other", trim: true },
    date: { type: Date, required: true },
    note: { type: String, default: "" },
    paymentMethod: { type: String, default: "UPI" },
    receiptUrl: { type: String, default: "" }, // optional if you want receipts later
  },
  { timestamps: true }
);

// helpful indexes
ExpenseSchema.index({ userId: 1, date: -1 });
ExpenseSchema.index({ category: 1 });

module.exports = mongoose.models?.Expense || mongoose.model("Expense", ExpenseSchema);

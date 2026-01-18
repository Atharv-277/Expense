require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const expenseRoutes = require("./routes/expenses");
const budgetRoutes = require("./routes/budget");

const app = express();
const PORT = process.env.PORT || 5000;

// =======================
// Middlewares
// =======================
app.use(
  cors({
    origin: "*", // allow all origins for now (we'll restrict later)
  })
);
app.use(express.json());

// =======================
// Routes
// =======================
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/budget", budgetRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Expense Tracker API Running");
});

// =======================
// Start server
// =======================
async function startServer() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing in environment variables");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer();

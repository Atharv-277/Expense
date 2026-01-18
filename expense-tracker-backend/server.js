require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Debug: Check if MONGO_URI is loading
console.log(
  "MONGO_URI present?",
  !!process.env.MONGO_URI,
  "preview:",
  process.env.MONGO_URI && process.env.MONGO_URI.slice(0, 40)
);

const authRoutes = require("./routes/auth");
const expenseRoutes = require("./routes/expenses");

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/budget", require("./routes/budget"));


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);

// Test root endpoint
app.get("/", (req, res) => res.send("Expense Tracker API Running"));

// Connect to MongoDB and start server
async function start() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing in .env");
    }

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log("Server running on port " + PORT);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();
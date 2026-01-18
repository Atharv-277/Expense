const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    // 💱 User preference (Settings)
    currency: {
      type: String,
      enum: ["INR", "USD", "EUR"],
      default: "INR",
    },

    balance: {
      type: Number,
      default: 0,
    },

    savingsGoal: {
      type: Number,
      default: 0,
    },

    // 🔐 Forgot Password fields
    resetToken: {
      type: String,
      default: null,
    },

    resetTokenExpiry: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Ensure unique email index
UserSchema.index({ email: 1 }, { unique: true });

module.exports =
  mongoose.models?.User || mongoose.model("User", UserSchema);

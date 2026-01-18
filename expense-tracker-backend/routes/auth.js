const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { body, validationResult } = require("express-validator");
const auth = require("../middleware/auth");


const User = require("../models/User");

// ==========================
// SIGNUP
// ==========================
router.post(
  "/signup",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be 6+ chars"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;

    try {
      const existing = await User.findOne({ email });
      if (existing)
        return res.status(400).json({ message: "Email already registered" });

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = new User({ name, email, password: hashedPassword });
      await user.save();

      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET || "your_jwt_secret",
        { expiresIn: "7d" }
      );

      res.status(201).json({
        user: { id: user._id, name: user.name, email: user.email },
        token,
      });
    } catch (err) {
      console.error("Signup error:", err);
      if (err.code === 11000) {
        return res.status(400).json({ message: "Email already registered" });
      }
      res.status(500).json({ message: "Server error" });
    }
  }
);

// ==========================
// LOGIN
// ==========================
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").exists().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user)
        return res.status(400).json({ message: "Invalid credentials" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ message: "Invalid credentials" });

      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET || "your_jwt_secret",
        { expiresIn: "7d" }
      );

      res.json({
        user: { id: user._id, name: user.name, email: user.email },
        token,
      });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// ==========================
// FORGOT PASSWORD
// ==========================
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    // Always return same response (security)
    if (!user) {
      return res.status(200).json({
        message: "If the email exists, a reset link will be sent",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 mins
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetLink = `http://localhost:3000/reset-password/${token}`;


    await transporter.sendMail({
  to: user.email,
  subject: "Reset your ExpenseTracker password",
  html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
</head>
<body style="margin:0; padding:0; background-color:#f5f7fb; font-family:Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 0;">

        <table width="480" cellpadding="0" cellspacing="0"
               style="background:#ffffff; border-radius:12px; padding:32px; box-shadow:0 10px 30px rgba(0,0,0,0.08);">

          <!-- LOGO / TITLE -->
          <tr>
            <td align="center" style="padding-bottom:16px;">
              <h2 style="margin:0; color:#111827;">ExpenseTracker</h2>
            </td>
          </tr>

          <!-- MESSAGE -->
          <tr>
            <td style="color:#374151; font-size:15px; line-height:1.6;">
              Hi <strong>${user.name}</strong>,
              <br /><br />
              We received a request to reset your password.
              Click the button below to choose a new one.
            </td>
          </tr>

          <!-- BUTTON -->
          <tr>
            <td align="center" style="padding:28px 0;">
              <a href="${resetLink}"
                 style="
                   background:#3b82f6;
                   color:#ffffff;
                   text-decoration:none;
                   padding:14px 26px;
                   border-radius:8px;
                   font-weight:bold;
                   display:inline-block;
                 ">
                Reset Password
              </a>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="font-size:13px; color:#6b7280; line-height:1.5;">
              This link will expire in <strong>15 minutes</strong>.
              <br />
              If you didn’t request this, you can safely ignore this email.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>
  `,
});


    res.status(200).json({
      message: "If the email exists, a reset link will be sent",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Server error" });
  }
});
// ==========================
// RESET PASSWORD
// ==========================
router.post("/reset-password", async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Token expired or invalid" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Clear token
    user.resetToken = null;
    user.resetTokenExpiry = null;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ==========================
// GET CURRENT USER (PROFILE + SETTINGS)
// ==========================
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "name email currency"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ==========================
// UPDATE PROFILE & SETTINGS
// ==========================
router.put("/me", auth, async (req, res) => {
  try {
    const { name, currency } = req.body;

    const updates = {};

    if (name) updates.name = name;
    if (currency) updates.currency = currency;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true }
    ).select("name email currency");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ message: "Server error" });
  }
});
// ==========================
// CHANGE PASSWORD
// ==========================
router.put("/change-password", auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ message: "Server error" });
  }
});
// ==========================
// DELETE ACCOUNT
// ==========================
router.delete("/me", auth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Delete account error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

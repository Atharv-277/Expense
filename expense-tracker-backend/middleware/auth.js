// expense-tracker-backend/middleware/auth.js
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.headers["authorization"] || req.headers["Authorization"];
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ message: "Invalid auth header format" });
  }

  const token = parts[1];
  try {
    const secret = process.env.JWT_SECRET || "your_jwt_secret";
    const decoded = jwt.verify(token, secret);

    const id =
      decoded.id ||
      decoded.userId ||
      (decoded.user && (decoded.user.id || decoded.user._id)) ||
      decoded._id ||
      decoded.sub;

    if (!id) {
      req.user = decoded;
      return next();
    }

    req.user = { id: String(id) };
    return next();
  } catch (err) {
    console.error("Auth middleware error:", err.message || err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

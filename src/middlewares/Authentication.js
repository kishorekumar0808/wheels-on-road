const jwt = require("jsonwebtoken");

const userAuthenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(403).json({ error: "Unauthorized, Token is required" });
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ error: "Invalid token format" });
  }

  const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Authentication error:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token has expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    }

    return res.status(403).json({ error: error.message });
  }
};
module.exports = userAuthenticate;

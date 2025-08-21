const jwt = require("jsonwebtoken");

const userAuthenticate = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ error: "Unauthorized, Token is require" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(403).json({ error: error.message });
  }
};
module.exports = userAuthenticate;

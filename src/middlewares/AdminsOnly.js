const UserModel = require("../schemas/UserModel");
const jwt = require("jsonwebtoken");

const adminsOnly = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(403).json({ error: "Unauthorized, Token is required" });
    }
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(403).json({ error: "Invalid token format" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.id);

    if (!user || !user.isAdmin) {
      return res.status(404).json({ message: "Access denied. Admins only." });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("AdminsOnly middleware error:", error);
    return res.status(403).json({ error: error.message });
  }
};
module.exports = adminsOnly;

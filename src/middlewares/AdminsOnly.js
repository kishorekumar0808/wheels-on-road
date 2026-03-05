const UserModel = require("../schemas/UserModel");
const jwt = require("jsonwebtoken");

const adminsOnly = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(403).json({ error: "Unauthorized, Token is required" });
    }
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

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

const signup = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(403).json({
        message: "User already exists with this email, please try another one",
        success: false,
      });
    }
    const newUser = new UserModel({ name, email, phone, password });
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", success: true });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ error: "User does not exist please signup" });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({ error: "Invalid password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.status(201).json({
      message: `logged successfully`,
      success: true,
      token,
      email: user.email,
      phone: user.phone,
      name: user.name,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  signup,
  login,
};

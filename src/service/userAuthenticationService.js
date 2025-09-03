const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../schemas/UserModel");

const handleSignUp = async (name, email, phone, password) => {
  try {
    if (!name || !email || !phone || !password) {
      throw new Error("All fields are required");
    }
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
  } catch (error) {
    console.error("Error during signup:", error);
    throw new Error(error.message);
  }
};

const handleLogin = async (email, password) => {
  try {
    if (!email || !password) {
      throw new Error("All fields are required");
    }

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
      expiresIn: "30d",
    });

    return { user, token };
  } catch (error) {
    console.error("Error during login:", error);
  }
};

module.exports = {
  handleSignUp,
  handleLogin,
};

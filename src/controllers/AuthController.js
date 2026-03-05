const {
  handleSignUp,
  handleLogin,
} = require("../service/userAuthenticationService");

const signup = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    await handleSignUp(name, email, phone, password);
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
    const { user, token } = await handleLogin(email, password);
    if (!user || !token) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

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

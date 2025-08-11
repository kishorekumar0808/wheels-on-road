const { contactUsService } = require("../service/contactUsService");

const contactUsDetails = async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    const result = await contactUsService({ name, email, phone, message });
    res.status(201).json({ result, message: "success" });
  } catch (error) {
    console.error("Error updating bike:", error);
    res.status(500).json({ error: error.message });
    return;
  }
};

module.exports = {
  contactUsDetails,
};

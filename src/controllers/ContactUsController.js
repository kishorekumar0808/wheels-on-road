const { contactUsService } = require("../service/contactUsService");

const contactUsDetails = async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    const result = await contactUsService({ name, email, phone, message });
    if (!result) {
      return res.status(400).json({ error: "Failed to save contact details" });
    }
    return res.status(201).json({ result, message: "success" });
  } catch (error) {
    console.error("Error saving contact details:", error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  contactUsDetails,
};

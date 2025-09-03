const { ContactUs } = require("../schemas/ContactUsModel");

const contactUsService = async ({ name, email, phone, message }) => {
  if (!name || !email || !phone || !message) {
    throw new Error("All fields are required");
  }

  try {
    const newContact = await ContactUs.create({
      name,
      email,
      phone,
      message,
    });
    return {
      message: "Contact details submitted successfully",
      success: true,
      data: newContact,
    };
  } catch (error) {
    console.error("Error submitting contact details:", error);
    throw new Error(error.message);
  }
};

module.exports = { contactUsService };

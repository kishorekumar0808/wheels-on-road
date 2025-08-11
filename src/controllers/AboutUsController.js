const AboutUs = require("../models/AboutUs");

const getAboutUs = async (req, res) => {
  try {
    const aboutUsData = await AboutUs.find();
    if (!aboutUsData || aboutUsData.length === 0) {
      return res.status(404).json({ message: "About Us data not found" });
    }
    res.status(200).json(aboutUsData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching About Us data", error });
  }
};

module.exports = {
  getAboutUs,
};

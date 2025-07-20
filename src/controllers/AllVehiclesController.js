const Bike = require("../models/VehicleModel");

const getVehicles = async (req, res) => {
  try {
    const bikes = await Bike.find();
    res.status(200).json({
      message: "Bikes fetched successfully",
      success: true,
      bikes,
    });
  } catch (error) {
    console.error("Error fetching bikes:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getVehicles,
};

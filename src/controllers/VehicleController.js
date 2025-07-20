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

const addBike = async (req, res) => {
  try {
    const { brand, name, type, rentalPrice, image } = req.body;
    const newBike = await Bike.create({
      brand,
      name,
      type,
      image,
      rentalPrice,
    });
    res.status(201).json({
      message: "Bike added successfully",
      success: true,
      bike: newBike,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBike = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "No fields provided for update" });
    }

    const updateFields = {};

    if (req.body.brand) updateFields.brand = req.body.brand;
    if (req.body.name) updateFields.name = req.body.name;
    if (req.body.type) updateFields.type = req.body.type;
    if (req.body.rentalPrice) updateFields.rentalPrice = req.body.rentalPrice;
    if ("availability" in req.body)
      updateFields.availability = req.body.availability;
    if (req.body.image) updateFields.image = req.body.image;

    const updatedBike = await Bike.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!updatedBike) {
      return res.status(404).json({ error: "Bike not found" });
    }

    res.status(200).json({
      message: "Bike updated successfully",
      success: true,
      bike: updatedBike,
    });
  } catch (error) {
    console.error("Update bike error:", error);
    res.status(500).json({ error: error.message });
  }
};

const deleteBike = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBike = await Bike.findByIdAndDelete(id);
    if (!deletedBike) {
      return res.status(404).json({ error: "Bike not found" });
    }
    res.status(200).json({
      message: "Bike deleted successfully",
      success: true,
      bike: deletedBike,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getVehicles,
  addBike,
  updateBike,
  deleteBike,
};

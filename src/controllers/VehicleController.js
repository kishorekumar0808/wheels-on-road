const {
  getAllBikes,
  createBike,
  updateBikeById,
  deleteBikeById,
} = require("../service/vehicleService");

const getVehicles = async (req, res) => {
  try {
    const bikes = await getAllBikes();
    if (!bikes || bikes.length === 0) {
      return res.status(404).json({ error: "No bikes found" });
    }
    res.status(200).json({
      message: "Bikes fetched successfully",
      success: true,
      bikes,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addBike = async (req, res) => {
  try {
    const newBike = await createBike(req.body);
    res.status(201).json({
      message: "Bike added successfully",
      success: true,
      bike: newBike,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateBike = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "No fields provided for update" });
    }

    const updatedBike = await updateBikeById(id, req.body);
    if (!updatedBike) {
      return res.status(404).json({ error: "Bike not found" });
    }

    res.status(200).json({
      message: "Bike updated successfully",
      success: true,
      bike: updatedBike,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBike = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBike = await deleteBikeById(id);
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

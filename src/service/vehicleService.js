const Bike = require("../models/VehicleModel");

const getAllBikes = async () => {
  try {
    return await Bike.find();
  } catch (error) {
    console.error("Error fetching bikes:", error);
    throw new Error(error.message);
  }
};

const createBike = async (bikeData) => {
  try {
    const { brand, name, type, rentalPrice, image } = bikeData;
    if (!brand || !name || !type || !rentalPrice) {
      throw new Error("All fields are required");
    }
    if (typeof rentalPrice !== "number" || rentalPrice <= 0) {
      throw new Error("Rental price must be a positive number");
    }
    return await Bike.create({ brand, name, type, image, rentalPrice });
  } catch (error) {
    console.error("Error creating bike:", error);
    throw new Error(error.message);
  }
};

const updateBikeById = async (bikeId, updateFields) => {
  try {
    const updatedBike = await Bike.findByIdAndUpdate(bikeId, updateFields, {
      new: true,
    });
    return updatedBike;
  } catch (error) {
    console.error("Update bike error:", error);
    throw new Error(error.message);
  }
};

const deleteBikeById = async (bikeId) => {
  try {
    return await Bike.findByIdAndDelete(bikeId);
  } catch (error) {
    console.error("Error deleting bike:", error);
    throw new Error(error.message);
  }
};

module.exports = {
  getAllBikes,
  createBike,
  updateBikeById,
  deleteBikeById,
};

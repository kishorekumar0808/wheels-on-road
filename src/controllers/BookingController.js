const BookingModel = require("../models/BookingModel");
const VehicleModel = require("../models/VehicleModel");

const createBooking = async (req, res) => {
  try {
    const { vehicleId, startTime, endTime } = req.body;
    const userId = req.user.id;

    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    if (startDate >= endDate) {
      return res
        .status(400)
        .json({ error: "Start time must be before end time" });
    }

    const vehicle = await VehicleModel.findById(vehicleId);
    if (!vehicle || !vehicle.availability) {
      return res.status(404).json({ error: "Vehicle not available" });
    }

    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const days = Math.ceil((endDate - startDate) / millisecondsPerDay);
    const totalPrice = days * vehicle.rentalPrice;

    const booking = await BookingModel.create({
      userId,
      vehicleId,
      startDate,
      endDate,
      totalPrice,
      status: "Confirmed", // ✅ match schema enum (capital C)
    });

    await VehicleModel.findByIdAndUpdate(vehicleId, {
      availability: false,
    });

    res.status(201).json({
      message: "Booking created successfully",
      success: true,
      booking,
    });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createBooking,
};

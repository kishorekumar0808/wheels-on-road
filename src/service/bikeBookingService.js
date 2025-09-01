const BookingModel = require("../models/BookingModel");
const VehicleModel = require("../models/VehicleModel");

// Create booking
const createBooking = async (userId, vehicleId, startDate, endDate) => {
  try {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start >= end) {
      throw new Error("Start time must be before end time");
    }

    const vehicle = await VehicleModel.findById(vehicleId);
    if (!vehicle || !vehicle.availability) {
      throw new Error("Vehicle not available");
    }

    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const days = Math.ceil((end - start) / millisecondsPerDay);
    const totalPrice = days * vehicle.rentalPrice;

    const booking = await BookingModel.create({
      userId,
      vehicleId,
      startDate: start,
      endDate: end,
      totalPrice,
      status: "Confirmed",
    });

    await VehicleModel.findByIdAndUpdate(vehicleId, {
      availability: false,
    });

    return booking;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw new Error("Failed to create booking");
  }
};

// Get booking history
const getBookingHistory = async (userId) => {
  try {
    const bookings = await BookingModel.find({ userId })
      .populate("vehicleId", "name model rentalPrice")
      .sort({ startDate: -1 });

    return bookings;
  } catch (error) {
    console.error("Error fetching booking history:", error);
    throw new Error("Failed to fetch booking history");
  }
};

module.exports = {
  createBooking,
  getBookingHistory,
};

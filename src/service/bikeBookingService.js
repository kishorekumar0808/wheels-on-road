const BookingModel = require("../models/BookingModel");
const VehicleModel = require("../models/VehicleModel");

// Create booking
const createBooking = async (userId, vehicleId, startDate, endDate) => {
  console.log("vehicleId:--->", vehicleId);
  try {
    const currentDate = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    console.log("Current Date:", currentDate.toISOString());
    console.log("Start Date:", start.toISOString());
    console.log("End Date:", end.toISOString());

    if (start <= currentDate) {
      throw new Error("Start date must be in the future");
    }

    if (end <= start) {
      throw new Error("End date must be after start date");
    }

    const vehicle = await VehicleModel.findOne({ _id: vehicleId });

    console.log("Vehicle found:", vehicle);
    if (!vehicle) {
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

    await VehicleModel.findByIdAndUpdate(vehicleId, { availability: false });

    return booking;
  } catch (error) {
    console.error("Error creating booking:", error.message);
    throw error;
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

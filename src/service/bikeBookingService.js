const BookingModel = require("../models/BookingModel");
const VehicleModel = require("../models/VehicleModel");
const { generateShortId } = require("../utils/commonMethods");

// Create booking
const createBooking = async (
  userId,
  userName,
  phoneNumber,
  requirements,
  vehicleId,
  startDate,
  endDate
) => {
  console.log("vehicleId:--->", vehicleId);
  try {
    const currentDate = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    let bookingId;
    let isUnique = false;
    let attempts = 0;
    const maxAttempts = 5; // Even 5 is plenty safe!

    if (start <= currentDate) {
      throw new Error("Start date must be in the future");
    }
    if (end <= start) {
      throw new Error("End date must be after start date");
    }

    while (!isUnique && attempts < maxAttempts) {
      bookingId = generateShortId();
      const existingBooking = await BookingModel.findOne({ bookingId });

      if (!existingBooking) {
        isUnique = true;
      } else {
        attempts++;
        console.warn(`Collision detected on attempt ${attempts}: ${bookingId}`);
      }
    }

    if (!isUnique) {
      // Fallback: Use timestamp + random as backup
      const timestamp = Date.now().toString(36).slice(-4);
      const random = Math.random().toString(36).substring(2, 4);
      bookingId = "BK" + timestamp + random;
      console.warn(`Using fallback ID: ${bookingId}`);
    }

    const vehicle = await VehicleModel.findOneAndUpdate(
      { _id: vehicleId, availability: true }, // 1️⃣ Query condition
      { availability: false }, // 2️⃣ Update
      { new: true } // 3️⃣ Options
    );

    if (!vehicle) {
      throw new Error("Vehicle not available or already booked");
    }

    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const days = Math.ceil((end - start) / millisecondsPerDay);
    const totalPrice = days * vehicle.rentalPrice;

    const booking = await BookingModel.create({
      bookingId,
      userId,
      userName,
      phoneNumber,
      vehicleId,
      startDate: start,
      endDate: end,
      totalPrice,
      numberOfDays: days,
      status: "Confirmed",
      requirements,
    });

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
      .populate("vehicleId", "name model image rentalPrice")
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

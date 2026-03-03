const {
  createBooking,
  getBookingHistory,
} = require("../service/bikeBookingService");
const Booking = require("../models/BookingModel.js");
const Vehicle = require("../models/VehicleModel.js");
const cron = require("node-cron");

const createBookingController = async (req, res) => {
  try {
    const { vehicleId, startTime, endTime } = req.body;
    const userId = req.user.id;

    const booking = await createBooking(userId, vehicleId, startTime, endTime);

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

const getBookingHistoryController = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookings = await getBookingHistory(userId);

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

function startBookingScheduler() {
  cron.schedule("* * * * *", async () => {
    try {
      const now = new Date();

      // Find confirmed bookings that have expired
      const expiredBookings = await Booking.find({
        endDate: { $lt: now },
        status: "Confirmed", // Only release confirmed bookings
      });

      for (const booking of expiredBookings) {
        // Update vehicle availability
        await Vehicle.findByIdAndUpdate(booking.vehicleId, {
          availability: true, // Changed from isBooked to availability
        });
        // Update booking status
        await Booking.findByIdAndUpdate(booking._id, {
          status: "Completed",
        });
      }

      if (expiredBookings.length > 0) {
        console.log(`✅ Released ${expiredBookings.length} vehicles`);
      }
    } catch (err) {
      console.error("❌ Error releasing vehicles:", err);
    }
  });
}

module.exports = {
  createBookingController,
  getBookingHistoryController,
  startBookingScheduler,
};

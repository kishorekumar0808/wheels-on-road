const cron = require("node-cron");
const {
  createBooking,
  getBookingHistory,
} = require("../service/bikeBookingService");
const BookingModel = require("../models/BookingModel.js");
const VehicleModel = require("../models/VehicleModel.js");

const createBookingController = async (req, res) => {
  try {
    const { vehicleId, startDate, endDate } = req.body;
    const userId = req.user.id;

    const booking = await createBooking(userId, vehicleId, startDate, endDate);

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

const startBookingScheduler = () => {
  cron.schedule("0 * * * *", async () => {
    try {
      const now = new Date();
      const expiredBookings = await BookingModel.find({
        endDate: { $lt: now },
      });

      for (const booking of expiredBookings) {
        await VehicleModel.findByIdAndUpdate(booking.vehicleId, {
          availability: true,
        });

        await BookingModel.findByIdAndUpdate(booking._id, {
          status: "Completed",
        });
      }

      console.log("✅ Expired bookings processed and vehicles released");
    } catch (err) {
      console.error("❌ Error releasing vehicles:", err);
    }
  });
};

module.exports = {
  createBookingController,
  getBookingHistoryController,
  startBookingScheduler,
};

const cron = require("node-cron");
const {
  createBooking,
  getBookingHistory,
} = require("../service/bikeBookingService");
const BookingModel = require("../schemas/BookingModel");
const VehicleModel = require("../schemas/VehicleModel");

const createBookingController = async (req, res) => {
  try {
    const {
      vehicleId,
      startDate,
      endDate,
      userName,
      phoneNumber,
      requirements,
    } = req.body;
    const userId = req.user.id;

    const booking = await createBooking(
      userId,
      userName,
      phoneNumber,
      requirements,
      vehicleId,
      startDate,
      endDate
    );

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
  //for hourly cron job
  cron.schedule("0 * * * * *", async () => {
    try {
      const now = new Date();
      const expiredBookings = await BookingModel.find({
        endDate: { $lt: now },
        status: "Confirmed",
      });

      for (const booking of expiredBookings) {
        //mark booking as completed
        booking.status = "Completed";
        await booking.save();

        //set vehicle availability to true
        await VehicleModel.findByIdAndUpdate(booking.vehicleId, {
          availability: true,
        });
        console.log(
          `🔄 Booking ${booking._id} marked as Completed and vehicle ${booking.vehicleId} available`
        );
      }
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

const router = require("express").Router();
const userAuthenticate = require("../middlewares/Authentication");
const {
  createBookingController,
  getBookingHistoryController,
} = require("../controllers/BookingController");

router.post("/create", userAuthenticate, createBookingController);
router.get("/history", userAuthenticate, getBookingHistoryController);

module.exports = router;

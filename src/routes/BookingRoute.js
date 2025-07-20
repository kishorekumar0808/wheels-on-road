const router = require("express").Router();
const authenticate = require("../middlewares/Authentication");
const { createBooking } = require("../controllers/BookingController");

router.post("/create", authenticate, createBooking);

module.exports = router;

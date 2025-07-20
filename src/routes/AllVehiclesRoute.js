const authenticate = require("../middlewares/Authentication");
const { getVehicles } = require("../controllers/VehicleController");
const router = require("express").Router();

router.get("/", authenticate, getVehicles);

module.exports = router;

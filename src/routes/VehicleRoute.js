const router = require("express").Router();
const {
  addBike,
  updateBike,
  deleteBike,
  getVehicles,
} = require("../controllers/VehicleController");
const adminsOnly = require("../middlewares/AdminsOnly");
const authenticate = require("../middlewares/Authentication");

router.get("/", getVehicles);
router.post("/add", adminsOnly, addBike);
router.patch("/update/:id", adminsOnly, updateBike);
router.delete("/delete/:id", adminsOnly, deleteBike);

module.exports = router;

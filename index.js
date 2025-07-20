const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDB = require("./db");

// Importing routers
const AuthRouter = require("./src/routes/AuthRouter");
const VehicleRouter = require("./src/routes/VehicleRoute");
const AllVehiclesRouter = require("./src/routes/AllVehiclesRoute");
const BookingRouter = require("./src/routes/BookingRoute");

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/auth", AuthRouter);
app.use("/admin/vehicles", VehicleRouter);
app.use("/allVehicles", AllVehiclesRouter);
app.use("/booking", BookingRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Bike Rentals API");
});

const server = app;
module.exports = (req, res) => server(req, res);

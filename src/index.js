const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDB = require("./db");

// Importing routers
const AuthRouter = require("./routes/AuthRouter");
const VehicleRouter = require("./routes/VehicleRoute");
const AllVehiclesRouter = require("./routes/AllVehiclesRoute");
const BookingRouter = require("./routes/BookingRoute");
const AboutUsRouter = require("./routes/AboutUsRoute");
const ContactUsRouter = require("./routes/ContactUsRoute");

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
app.use("/about-us", AboutUsRouter);
app.use("/contact-us", ContactUsRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Bike Rentals API");
});

const server = app;

module.exports = (req, res) => server(req, res);

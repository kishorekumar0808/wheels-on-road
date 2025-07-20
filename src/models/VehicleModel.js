const mongoose = require("mongoose");

const bikeSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
      enum: [
        "Hero",
        "Bajaj",
        "Yamaha",
        "Honda",
        "TVS",
        "Suzuki",
        "KTM",
        "Royal Enfield",
        "OLA",
      ],
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["Bike", "Scooty"],
      required: true,
    },
    rentalPrice: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      default:
        "https://t3.ftcdn.net/jpg/08/66/86/74/360_F_866867426_ocfdgUAxpmU2m2YLc7ElqiYUYcx4XrLd.jpg",
    },
    availability: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vehicle", bikeSchema);

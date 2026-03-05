const mongoose = require("mongoose");

const aboutUsSchema = new mongoose.Schema({
  title: String,
  description: String,
  iconUrl: String,
});

module.exports = mongoose.model("AboutUs", aboutUsSchema);

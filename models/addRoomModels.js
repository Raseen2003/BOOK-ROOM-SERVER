const mongoose = require("mongoose");

const roomsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rent: { type: String, required: true },
  count: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  image1: { type: String, required: true },
  image2: { type: String, required: true },
  image3: { type: String, required: true },
});

const rooms = mongoose.model("rooms", roomsSchema);
module.exports = rooms;

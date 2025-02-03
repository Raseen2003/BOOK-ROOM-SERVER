const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  room: { type: String, required: true },
  username: { type: String, required: true },
  fromDate: { type: String, required: true },
  toDate: { type: String, required: true },
  totalamount: { type: String, required: true },
  totaldays: { type: String, required: true },
  status: { type: String, required: true, default: "booked" },
});

const Booking = mongoose.model('bookings', bookingSchema);
module.exports = Booking;

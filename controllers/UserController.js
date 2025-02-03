const users = require('../models/userModel')
const jwt = require('jsonwebtoken')
const Booking = require('../models/bookings')

// register

exports.registerController = async (req, res) => {
    console.log("inside registerController");
    const { username, email, password } = req.body;
    console.log(username, email, password);
  
    try {
      const existingUser = await users.findOne({ email });
      if (existingUser) {
        return res.status(406).json({ message: "User already exists. Please login." });
      }
  
      const newUser = new users({
        username,
        email,
        password,
      });
      await newUser.save();
      res.status(200).json(newUser);
    } catch (err) {
      res.status(401).json(err);
    }
  };
  
// login
exports.loginController = async (req, res) => {
  console.log("inside loginController");
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const existingUser = await users.findOne({ email,password });
    if (existingUser) {
      // token generate
      const token = jwt.sign({userId:existingUser._id},process.env.JWTPASSWORD)
       res.status(200).json({ 
        user:existingUser,
        token
      });
    }else{
      res.status(404).json("Invalid Email/Password")
    }

  } catch (err) {
    res.status(401).json(err);
  }
};

exports.bookingsController = async (req, res) => {
  const { room, username, fromDate, toDate, totalAmount, totalDays } = req.body;

  try {
    const newBooking = new Booking({
      room,
      username, 
      fromDate,
      toDate,
      totalamount: totalAmount, // Match model field
      totaldays: totalDays,     // Match model field
      status: "booked",
    });
  
    await newBooking.save();
    res.status(200).json({ message: "Room booked successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Booking failed!" });
  }
}  




exports.getUserBookingsController = async (req, res) => {
  const { username } = req.params;

  try {
    const userBookings = await Booking.find({ username }); // Query based on username
    res.status(200).json(userBookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user bookings" });
  }
};

// cancel


/**
 * Controller to cancel a booking by booking ID
 */
exports.cancelBookingController = async (req, res) => {
  const { bookingId } = req.params; // Extract booking ID from the route params

  try {
    // Find and delete the booking from the database
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);

    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    res.status(200).json({ message: "Booking canceled successfully!" });
  } catch (error) {
    console.error("Error canceling booking:", error);
    res.status(500).json({ message: "An error occurred while canceling the booking." });
  }
};

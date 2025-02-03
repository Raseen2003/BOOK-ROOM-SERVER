const express = require('express');
const userController = require('../controllers/UserController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const multerMiddleware = require('../middlewares/multerMiddleware');
const adminController = require('../controllers/adminContoller');
const Booking = require('../models/bookings');


const router = new express.Router();

// Register route
router.post('/register', userController.registerController);

// Login route
router.post('/login', userController.loginController);

// Add room route (multiple file uploads)
router.post('/admin-addRoom',multerMiddleware,adminController.addRoomController)




router.get('/home',adminController.getHomeRoomsController)

// get users
router.get('/admin-getUsers', adminController.getAllUsersController);

router.post('/book-room',userController.bookingsController)

router.get('/get-bookings/:username', userController.getUserBookingsController);

router.delete('/cancel-booking/:bookingId', userController.cancelBookingController);

router.get('/admin-getAllBookings', adminController.getAllBookingsController);

module.exports = router;


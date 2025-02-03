const e = require('cors');
const rooms = require('../models/addRoomModels');
const users = require('../models/userModel');
// add rooms

exports.addRoomController = async (req, res) => {
    console.log("Inside addRoomController");
    try {
        console.log("Request Body:", req.body);
        console.log("Uploaded Files:", req.files);

        const { name, rent, count, description, type } = req.body;
        // Save specific image files 
        const images = [req.files.image1[0].filename, req.files.image2[0].filename, req.files.image3[0].filename]; 
        console.log("images", images);

        if (!name || !rent || !count || !description || !type || !images) {
            console.error("Validation Error: Missing fields");
            return res.status(400).json({ message: "All fields are required" });
        }

        const image1 = images[0]
        const image2 = images[1]
        const image3 = images[2]

        if (!image1 || !image2 || !image3) {
            console.error("Validation Error: Missing image files");
            return res.status(400).json({ message: "All image files are required" });
        }

        const existingRoom = await rooms.findOne({ name });
        if (existingRoom) {
            return res.status(406).json("Room already exists");
        }

        const newRoom = new rooms({
            name,
            rent,
            count,
            description,
            type,
            image1,
            image2,
            image3,
        });

        await newRoom.save();
        res.status(200).json(newRoom);

    } catch (error) {
        console.error("Error in addRoomController:", error);
        console.error("Error Details:", {
            message: error.message,
            stack: error.stack,
            code: error.code
        });
        res.status(500).json("Internal server error");
    }
};

// get home rooms

exports.getHomeRoomsController = async (req, res) => {
    console.log("inside getHomeRoomsController");
    try {
        const allRoom = await rooms.find();
        res.status(200).json(allRoom);
    }catch(err){
        res.status(401).json(err);

    }
    
}

// get all users 
// Fix the reference to 'users'
exports.getAllUsersController = async (req, res) => {
    try {
        const allUsers = await users.find(); // ✅ Use 'users' (plural)
        res.status(200).json(allUsers);
    } catch (error) {
        console.error("Error in getAllUsersController:", error);
        res.status(500).json({ message: "Failed to fetch users" });
    }
};
// get all bookings






exports.getAllBookingsController = async (req, res) => {
    try {
        const allBookings = await Booking.find().populate('userId', 'username email').populate('roomId', 'name rent type');
        res.status(200).json(allBookings);
    } catch (error) {
        console.error("Error in getAllBookingsController:", error);
        res.status(500).json({ message: "Failed to fetch bookings" });
    }
};

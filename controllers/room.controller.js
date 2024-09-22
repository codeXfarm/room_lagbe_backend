import { Room } from "../models/room.model.js";
import { User } from "../models/user.model.js";

export const addRoom = async (req, res) => {
  const {
    id,
    title,
    description,
    propertyType,
    propertyFor,
    status,
    availableFrom,
    price,
    advanceFee,
    currency,
    location,
    features,
    security,
    image,
    amenities,
    auth,
  } = req.body;

  let isVerified;
  const user = await User.findOne({ email: auth.email });
  if (user.role === "admin") {
    isVerified = true;
  } else {
    isVerified = false;
  }

  try {
    const room = new Room({
      id,
      title,
      description,
      propertyType,
      propertyFor,
      status,
      availableFrom,
      price,
      advanceFee,
      currency,
      location,
      features,
      security,
      image,
      amenities,
      auth,
      isVerified,
    });

    await room.save();

    res.status(201).json({
      success: true,
      message: "Room added successfully",
      room: {
        ...room._doc,
      },
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.json({ success: true, rooms });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });
    }

    res.json({ success: true, room });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!room) {
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });
    }

    res.json({ success: true, room });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);

    if (!room) {
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });
    }

    res.json({ success: true, message: "Room deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getFilteredRooms = async (req, res) => {
  const query = req.query;

  console.log(query);

  try {
    const filter = {};

    if (query.price) {
      filter.price = price;
    }
    if (propertyType) {
      filter.propertyType = propertyType;
    }

    if (query.propertyFor) {
      filter.proertyFor = propertyFor;
    }

    if (query.city) {
      filter["location.city"] = query.city;
    }

    if (query.area) {
      filter["location.area"] = query.area;
    }

    if (query.district) {
      filter["location.district"] = query.district;
    }

    if (query.division) {
      filter["location.division"] = query.division;
    }

    const rooms = await Room.find(filter);

    console.log("Rooms from backend", rooms);

    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
    console.log(error);
  }
};

export const getRoomsByUserRole = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found"});
    }

    let rooms;

    if (user.role === "admin") {
      rooms = await Room.find();
    } else if (user.role === "owner") {
      rooms = await Room.find({ "auth.id": user._id });
    } else {
      return res.status(403).json({ message: "Unauthorized access" });
    }
    return res.status(200).json(rooms);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching rooms", error });
  }
};

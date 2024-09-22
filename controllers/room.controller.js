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

  try {
    const filter = {};

    // Add filters dynamically based on query parameters
    if (query.propertyType) {
      filter.propertyType = query.propertyType;
    }

    if (query.propertyFor) {
      filter.propertyFor = query.propertyFor;
    }

    if (query.minPrice && query.maxPrice) {
      filter.price = { $gte: query.minPrice, $lte: query.maxPrice };
    } else if (query.minPrice) {
      filter.price = { $gte: query.minPrice };
    } else if (query.maxPrice) {
      filter.price = { $lte: query.maxPrice };
    }

    if (query.location) {
      filter["location.area"] = query.location;
    }

    if (query.district) {
      filter["location.district"] = query.district;
    }

    if (query.division) {
      filter["location.division"] = query.division;
    }

    // Example for filtering based on features
    if (query.hasBalcony) {
      filter["features.hasBalcony"] = query.hasBalcony === "true";
    }

    if (query.hasAirConditioning) {
      filter["features.hasAirConditioning"] =
        query.hasAirConditioning === "true";
    }

    // Search functionality: text search in title, description, and location fields
    if (query.search) {
      const searchRegex = new RegExp(query.search, "i"); // 'i' for case-insensitive
      filter.$or = [
        { title: searchRegex },
        { description: searchRegex },
        { "location.area": searchRegex },
        { "location.district": searchRegex },
        { "location.division": searchRegex },
      ];
    }

    // Query database with filters
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

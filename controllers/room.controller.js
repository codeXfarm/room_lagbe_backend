import { Room } from "../models/room.model.js";

export const addRoom = async (req, res) => {
  const {
    id,
    title,
    description,
    propertyType,
    proertyFor,
    status,
    availableFrom,
    price,
    advaneFee,
    currency,
    location,
    features,
    security,
    image,
    amenities,
  } = req.body;

  try {
    const room = new Room({
      id,
      title,
      description,
      propertyType,
      proertyFor,
      status,
      availableFrom,
      price,
      advaneFee,
      currency,
      location,
      features,
      security,
      image,
      amenities,
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
      filter.price = query.price;
    }
    if (query.propertyType) {
      filter.propertyType = query.propertyType;
    }
    if (query.propertyFor) {
      filter.proertyFor = query.propertyFor;
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

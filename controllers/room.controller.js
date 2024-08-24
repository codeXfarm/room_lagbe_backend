import { Room } from "../models/room.model.js";

export const addRoom = async (req, res) => {
  const {
    title,
    description,
    price,
    image,
    bedRoom,
    bathRoom,
    kitchen,
    livingRoom,
    attachedBathRoom,
    forRent,
    forSale,
  } = req.body;

  try {
    const room = new Room({
      title,
      description,
      price,
      image,
      bedRoom,
      bathRoom,
      kitchen,
      livingRoom,
      attachedBathRoom,
      forRent,
      forSale,
    });

    await room.save();
    res.status(201).json({
      success: true,
      message: "Room Added successfully",
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
    const rooms = await Room.find({ available: true });
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

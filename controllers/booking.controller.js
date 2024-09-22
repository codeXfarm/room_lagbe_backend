import { Booking } from "../models/booking.model.js";
import { Room } from "../models/room.model.js";
import { User } from "../models/user.model.js";

export const createBooking = async (req, res) => {
  const { userId, flatId, phone, address } = req.body;
  try {
    const user = await User.findById(userId);
    const flat = await Room.findById(flatId);

    if (!user || !flat) {
      return res.status(404).json({ message: "User or Flat not found" });
    }

    const booking = new Booking({
      user: userId,
      flat: flatId,
      phone,
      address,
    });

    await booking.save();

    return res.status(201).json({ message: "Booking created", booking });
  } catch (error) {
    console.error(error); // Log the error
    return res.status(500).json({ message: error.message });
  }
};

export const getUserBookings = async (req, res) => {
  const { userId } = req.params;
  try {
    const bookings = await Booking.find({ user: userId })
      .populate("flat")
      .populate({
        path: "user",
        select: "displayName email",
      });

    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllBooking = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (user.role !== "admin") {
    return res.status(403).json({ message: "Unauthorized" });
  }
  const bookings = await Booking.find().populate("flat").populate({
    path: "user",
    select: "displayName email",
  });
  return res.status(200).json(bookings);
};


export const deleteBooking = async (req, res) => {
  const { bookingId } = req.params;
  try {
    const booking = await Booking.findByIdAndDelete(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const bookingStatus = async (req, res) => {
  const { bookingId } = req.params;
  const { status } = req.body;

  try {
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    booking.status = status;
    await booking.save();
    return res.status(200).json({ message: "Booking confirmed", booking });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

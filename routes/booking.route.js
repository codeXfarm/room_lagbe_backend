import express from "express";
import {
  bookingStatus,
  createBooking,
  deleteBooking,
  getAllBooking,
  getUserBookings,
} from "../controllers/booking.controller.js";

const router = express.Router();

router.post("/book-room", createBooking);
router.get("/all-book/:userId", getAllBooking);
router.get("/booked/user/:userId", getUserBookings);
router.delete("/booked/delete/:bookingId", deleteBooking);
router.put("/booked/status/:bookingId", bookingStatus);

export default router;

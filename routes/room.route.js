import express from "express";
import {
  addRoom,
  deleteRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
} from "../controllers/room.controller.js";

const router = express.Router();

// GET /api/rooms

router.post("/add-room", addRoom); // localhost: 4000/api/rooms/add-room
router.get("/all-rooms", getAllRooms);
router.get("/room/:id", getRoomById);
router.post("/update/:id", updateRoom);
router.use("/delete/:id", deleteRoom);

export default router;

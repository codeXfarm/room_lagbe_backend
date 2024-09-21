import express from "express";
import {
  addRoom,
  deleteRoom,
  getAllRooms,
  getFilteredRooms,
  getRoomById,
  getRoomsByUserRole,
  updateRoom,
} from "../controllers/room.controller.js";
const router = express.Router();


router.post("/add-room", addRoom);
router.get("/all-rooms", getAllRooms);
router.get("/all-rooms-by-role/:userId", getRoomsByUserRole);
router.get("/filtered-rooms", getFilteredRooms);
router.get("/room/:id", getRoomById);
router.post("/update/:id", updateRoom);
router.delete("/delete/:id", deleteRoom);

export default router;

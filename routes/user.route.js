import express from "express";
import { deleteUserById, getAllUsers, getUserByEmail, updateUserDisplayNamePhotoURL, updateUserRole } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/users/:userEmail", getUserByEmail);
router.delete("/users/delete/:userId", deleteUserById);
router.put("/users/update/role/:userId", updateUserRole);
router.put("/users/update/profile/:userId", updateUserDisplayNamePhotoURL);

export default router;

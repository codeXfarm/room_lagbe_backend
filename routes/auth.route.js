import express from "express";
import {
  login,
  logout,
  signup,
  checkAuth,
  social,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);

router.post("/signup", signup);
router.post("/social", social);
router.post("/login", login);
router.post("/logout", logout);

export default router;

import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
} from "../controllers/blog.controller.js";

const router = express.Router();

// GET /api/rooms

router.post("/create-blog", createBlog);
router.get("/all-blogs", getAllBlogs);
router.get("/blog/:id", getBlogById);
router.post("/update/:id", updateBlog);
router.use("/delete/:id", deleteBlog);

export default router;

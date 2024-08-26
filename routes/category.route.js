import express from "express";
import { createCategory, deleteCategory, getAllCategory, getCategoryById, updateCategory } from "../controllers/category.controller..js";

const router = express.Router();
// Get /api/category
router.post("/add-category", createCategory);
router.get("/all-category", getAllCategory);
router.get("/category/:id", getCategoryById);
router.post("/update/:id", updateCategory);
router.use("/delete/:id", deleteCategory);

export default router;
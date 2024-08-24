import { Category } from "../models/catergory.model.js";

export const createCategory = async (req, res) => {
  const { categoryName, active } = req.body;

  try {
    const category = new Category({ categoryName, active });
    await category.save();
    res.status(201).json({
      success: true,
      message: "Category Added successfully",
      category: {
        ...blog._doc,
      },
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

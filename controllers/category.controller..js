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
        ...category._doc,
      },
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find({ available: true });
    res.json({ success: true, categories });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const catergory = await Category.findById(req.params.id);
    if (!catergory) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    res.json({ success: true, catergory });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const catergory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!catergory) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    res.json({ success: true, catergory });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    res.json({ success: true, message: "Room deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

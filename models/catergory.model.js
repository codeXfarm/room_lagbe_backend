import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  categoryName: String,
  active: Boolean,
});

export const Category = mongoose.model("Category", categorySchema);

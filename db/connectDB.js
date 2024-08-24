import mongoose from "mongoose";

export const connectDB = () => {
  try {
    const db = mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB connection established`);
  } catch (error) {
    console.log("Error connecting to MongoDB", error.message);
    process.exit(1);
  }
};

import mongoose from "mongoose";

mongoose.set('strictQuery', true);
export  const connectDB = (mongodb_uri) => {
  try {
    mongoose.connect(mongodb_uri)
    mongoose.connection.on('connected', () => {
    })
  } catch (error) {
  }
}

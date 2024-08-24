import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: String,
    image: String,
    bedRoom: String,
    bathRoom: String,
    kitchen: String,
    livingRoom: String,
    attachedBathRoom: Boolean,
    forRent: Boolean,
    forSale: Boolean,
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Room = mongoose.model("Room", roomSchema);

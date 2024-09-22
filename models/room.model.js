import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    id: String,
    title: String,
    description: String,
    propertyType: String,
    propertyFor: String,
    status: String,
    availableFrom: String,
    price: Number,
    advanceFee: Number,
    currency: String,
    location: {
      block: String,
      road: String,
      area: String,
      city: String,
      district: String,
      division: String,
      postalCode: Number,
      lat: Number,
      long: Number,
      number: Number,
    },
    features: {
      bedRoom: Number,
      bathRoom: Number,
      kitchen: Number,
      livingRoom: Number,
      attachedBathRoom: Number,
      squareFeet: String,
      parking: String,
      furnished: Boolean,
      hasBalcony: Boolean,
      hasPool: Boolean,
      hasGarden: Boolean,
      hasElevator: Boolean,
      hasAirConditioning: Boolean,
      hasFridge: Boolean,
      hasWifi: Boolean,
    },
    security: {
      securityGarage: Boolean,
      restriction: {
        pets: Boolean,
        smoking: Boolean,
        drink: Boolean,
        drugs: Boolean,
        girlsAllowed: Boolean,
        boysAllowed: Boolean,
      },
    },
    image: [String],
    amenities: [String],
    auth: {
      id: String,
      name: String,
      email: String,
    },
    isVerified: Boolean,
  },
  { timestamps: true }
);

export const Room = mongoose.model("Room", roomSchema);

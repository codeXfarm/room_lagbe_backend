import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    id: String,
    title: String,
    description: String,
    propertyType: String,
    proertyFor: String,
    status: String,
    availableFrom: String,
    price: Number,
    advaneFee: Number,
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
    },
    features: {
      bedRoom: Number,
      bathRoom: Number,
      kitchen: Number,
      livingRoom: Number,
      attachedBathRoom: Number,
      squareFeet: Number,
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
  },
  { timestamps: true }
);

export const Room = mongoose.model("Room", roomSchema);

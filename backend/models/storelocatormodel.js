import mongoose from "mongoose";

const storeLocatorSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    primaryKey: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    match: [/^[0-9\s\-\+]+$/, "Please enter a valid phone number"]
  },
  mapLink: {
    type: String,
    required: true,
    match: [/^https?:\/\//, "Please enter a valid URL"]
  },
  image: {
    type: String,
    required: true
  }
}, { timestamps: true });

export default mongoose.model("StoreLocator", storeLocatorSchema);

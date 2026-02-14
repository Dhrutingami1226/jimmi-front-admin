import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    primaryKey: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ""
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  }
}, { timestamps: true });

export default mongoose.model("Offer", offerSchema);

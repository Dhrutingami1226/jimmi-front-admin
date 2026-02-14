import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
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
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ["Burgers", "Sides", "Drinks", "Desserts", ""],
    default: ""
  },
  price: {
    type: Number,
    default: 0,
    min: 0
  },
  description: {
    type: String,
    default: ""
  }
}, { timestamps: true });

export default mongoose.model("Menu", menuSchema);

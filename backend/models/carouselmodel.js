import mongoose from "mongoose";

const carouselSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    primaryKey: true
  },
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: "",
    trim: true
  },
  description: {
    type: String,
    default: ""
  }
}, { timestamps: true });

export default mongoose.model("Carousel", carouselSchema);

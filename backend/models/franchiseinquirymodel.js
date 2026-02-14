import mongoose from "mongoose";

const franchiseInquirySchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    primaryKey: true
  },
  userId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  phoneno: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: String,
    required: true,
    trim: true
  },
  pincode: {
    type: String,
    required: true
  },
  hrspmonth: {
    type: Number,
    required: true
  },
  scoutshop: {
    type: String,
    enum: ["Yes", "No"],
    default: "No"
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending"
  }
}, { timestamps: true });

export default mongoose.model("FranchiseInquiry", franchiseInquirySchema);

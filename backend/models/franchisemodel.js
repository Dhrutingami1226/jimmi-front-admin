import mongoose from "mongoose";

const FranchiseSchema = new mongoose.Schema({

  userId: {
    type: Number,
    unique: true
  },

  name:{
    type:String,
    required:true,
      match: [/^[a-zA-Z0-9]+$/, ]
  },

  email: {
    type:String,
    required:true,
    unique:true,
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email"] 
  },
   
  phoneno: {
    type:String,
    required:true,
    unique:true,
    match: [/^[0-9]{10}$/, "Please enter a valid phone number"]
  },

   country:{
    type:String,
    required:true,
  },

  state: {
    type: String,
    required: true
  },

  pincode:{
    type:String,
    required:true,
    match: [/^[0-9]{6}$/, "Please enter a valid pincode"]
  },

  hrspmonth:{
     type:String,
    required:true,
    match: [/^[0-9]{3}$/, "Please enter a valid pincode"]
  },

  scoutshop:{
     type:String,
     required:true,
      enum: ["Yes", "No"],   
      default: "No",

  }
 

},
{timestamps:true}
);

export default mongoose.model("Store", FranchiseSchema)




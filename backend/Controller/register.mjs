import bcrypt from "bcrypt";
import User from "../models/registermodel.js";

export const register = async(req,res)=>{
    
    // check existence
    try{
        const{name,email,password}=req.body;
        if(!name||!email||!password) return res.status(400).json({message:"All fields are required"})
        
        const normalizedEmail = email.toLowerCase();
        const existingUser = await User.findOne({email: normalizedEmail});
        if(existingUser) return res.status(400).json({message:"User already exist"})

    // last userid
     const lastUser = await User.findOne().sort({userId:-1});
     const newUserId = lastUser ? lastUser.userId + 1 : 1;

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt)
    
    // new user
    const newUser = await User.create({ userId: newUserId, name, email: normalizedEmail, password:hashedPassword});

    res.status(201).json({message:"User registered successfully",user :{
        userId:newUser.userId,
        name:newUser.name,
        email:newUser.email
    }
    });
 } catch (error){
    console.error("Error in register",error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllAdmins = async (req, res) => {
  try {
    const users = await User.find().select('userId name email createdAt').sort({ userId: 1 });
    res.status(200).json({
      success: true,
      message: "Admins fetched successfully",
      data: users
    });
  } catch (error) {
    console.error("Error fetching admins:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOneAndDelete({ userId: parseInt(id) });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Admin not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Admin deleted successfully",
      data: user
    });
  } catch (error) {
    console.error("Error deleting admin:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const user = await User.findOneAndUpdate(
      { userId: parseInt(id) },
      { name, email },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Admin not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Admin updated successfully",
      data: user
    });
  } catch (error) {
    console.error("Error updating admin:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};
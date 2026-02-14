import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/registermodel.js";

export const Login = async(req,res)=>{
    try{
        
        const {email,password}= req.body;
         if(!email||!password) return res.status(404).json({message:"All fields required"})

        // check email in db
        const normalizedEmail = email.toLowerCase();
        const user = await User.findOne({email: normalizedEmail});
        if(!user) return res.status(404).json({message:"Invalid Credentials"})        
      
        // match pass
        const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }

    // token
    const token = jwt.sign({id:user._id, email:user.email},process.env.JWT_SECRET, {expiresIn:"1h"});
     
    // Store token in HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 1000 // 1 hour
        });

    res.json({ message: "Login successful", token });

        }catch (error){
        res.status(500).json({error:error.message});
    }
    
};

import User from "../models/registermodel.js";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";


export const sendResetCode = async (req,res)=>{

    //  for cheking for user in db
    try{
        const{email}=req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        const normalizedEmail = email.toLowerCase();
        const user = await User.findOne({email: normalizedEmail});
        if(!user) return res.status(400).json({message:"User not found"});

    // for generating 5 word code
    const code = Math.random().toString(36).substring(2,7).toUpperCase();

    // save code and expiry
    user.resetCode = code;
    user.resetCodeExpire= Date.now()+2*60*1000
    await user.save();
    
    // mail format
    const subject =  "Password Reset Code - Jimis Burger";
    const textBody = `Hello,\n\nYour password reset code is ${code}\n\nIf you did not request this, please ignore this email.\n\n— Jimis Burger Support`
    const htmlBody = `
      <p>Hello,</p>
      <p>Your password reset code is: <b>${code}</b></p>
      <p>If you did not request this, please ignore this email.</p>
      <hr>
      <small>Sent by Jimis Burger Support | Contact: support@myapp.com</small>
    `;

    // email and app pass
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
        },
    });

    // Send the mail
    await transporter.sendMail({
      from: `"Jimmis Burger Support" <${process.env.GMAIL_USER}>`,
      to: email,
      subject,
      text: textBody,
      html: htmlBody,
    });

    res.status(200).json({message: "Check Your email for code"})
} catch(error){
    console.log(error);
    res.status(500).json({message:"Server Error", error : error.message})
}

};


export const resetPassword = async (req, res) => {
  try {
    const { code, newpassword } = req.body;

    if (!code || !newpassword) {
      return res.status(400).json({ message: "Code and new password are required" });
    }

    // Find user code
    const user = await User.findOne({ resetCode: code });
    if (!user) {
      return res.status(400).json({ message: "Invalid reset code" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newpassword, salt);

    // new pass
    user.password = hashedPassword;

    // Keep code as it is until user requests again
    await user.save();

    res.json({ message: "Password updated successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
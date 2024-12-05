import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const login = async (req, res) => {
    try {
      const { email, password } = req.body; // Proper destructuring for an object payload
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(403).json({
          success: false,
          message: "User not found",
        });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(403).json({
          success: false,
          message: "Wrong Password",
        });
      }
  
      const token = jwt.sign(
        { _id: user._id, role: user.role },
        process.env.JWT_KEY,
        { expiresIn: "6d" }
      );
  
      return res.status(201).json({
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({
        success: false,
        message: "An error occurred during login",
      });
    }
  };

  export const verify =(req,res)=>{
    return res.status(200).json({
      success:true,
      user:req.user
    })
  }
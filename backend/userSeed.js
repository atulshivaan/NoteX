import { connectDB } from "./database/connectDB.js";
import User from "./models/user.model.js";
import bcrypt from "bcrypt"
const userRegister = async () => {
    connectDB();
    try {
      const password = "admin"; // Hardcoded for testing
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name: "admin",
        email: "admin@gmail.com",
        password: hashPassword,
        role: "admin",
      });
      await newUser.save();
      console.log("Admin user created successfully");
    } catch (error) {
      console.error(error.message);
    }
  };
userRegister();
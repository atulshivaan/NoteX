import express from "express"
import {login, verify}from "../controllers/authController.js";
import verifyUser from "../middleware/auth.midleware.js";


const authRouter = express.Router();


authRouter.post("/login" ,login )

authRouter.get("/verify",verifyUser ,verify)


export default authRouter;
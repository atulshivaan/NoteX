import express from 'express'
import verifyUser from '../middleware/auth.midleware.js';
import { addDepartment, deletDepartment, editDepartment,  getDepartments, updateDepartment } from '../controllers/department.controller.js';
const deparmentRouter = express.Router();


deparmentRouter.post("/add",verifyUser,addDepartment)
deparmentRouter.get("/",verifyUser,getDepartments)
deparmentRouter.get("/:id", verifyUser, editDepartment);
deparmentRouter.put("/:id", verifyUser, updateDepartment);
deparmentRouter.delete("/delete/:id", verifyUser, deletDepartment);



export default deparmentRouter;
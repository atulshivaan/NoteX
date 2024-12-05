import express from "express"
import verifyUser from "../middleware/auth.midleware.js";
import { addEmployee, editEmployee, getEmployee, getEmployees } from "../controllers/employee.Controller.js";
import { deletDepartment } from "../controllers/department.controller.js";

const employeeRouter = express.Router();

employeeRouter.get("/",verifyUser,getEmployees)
employeeRouter.post("/add",verifyUser,addEmployee)
employeeRouter.get("/:id",verifyUser,getEmployee)
employeeRouter.put("/edit/:id",verifyUser,editEmployee)
employeeRouter.delete("/delete/:id",verifyUser,deletDepartment)

export default employeeRouter
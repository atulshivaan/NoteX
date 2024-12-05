
import Employee from "../models/employee.model.js";



export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate("department"); // Ensure 'department' exists in Employee schema
    return res.status(200).json({
      success: true,
      employee: employees,
    });
  } catch (error) {
    console.error("Error fetching employees:", error); // Log the error
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

 

export const addEmployee = async (req, res) => {
    try {
      const { name, email, phone, gender, department, course, role } = req.body;
  
      // Log the incoming request
      console.log("Received Data:", req.body);
  
      // Validate required fields
      if (!name || !email || !phone || !gender || !department || !course || !role) {
        return res.status(400).json({ message: "All fields are required." });
      }
  
      // Check if an employee with the same email already exists
      const existingEmployee = await Employee.findOne({ email });
      if (existingEmployee) {
        return res.status(400).json({ message: "An employee with this email already exists." });
      }
  
      // Create a new employee document
      const newEmployee = new Employee({
        name,
        email,
        phone,
        gender,
        department,
        course,
        role,
      });
  
      // Save the new employee to the database
      await newEmployee.save();
  
      return res.status(201).json({
        message: "Employee added successfully.",
        employee: newEmployee,
      });
    } catch (error) {
      console.error("Error adding employee:", error.message);
      return res.status(500).json({
        message: "Internal server error.",
        error: error.message,
      });
    }
  };
  

  export const getEmployee = async(req,res)=>{
    const{id}=req.params;
    try {
      const employee = await Employee.findById({_id:id}).populate("department"); // Ensure 'department' exists in Employee schema
      return res.status(200).json({
        success: true,
        employee: employee,
      });
    } catch (error) {
      console.error("Error fetching employees:", error); // Log the error
      return res.status(500).json({
        success: false,
        message: error.message,
      });
  }
}
  

export const editEmployee = async (req, res) => {
  try {
    const { id } = req.params;  // Use req instead of eq
    const { name, email, phone, gender, department, course, role } = req.body;

    // Find employee by id
   
  const employee = await Employee.findById({ _id: id });
    if (!employee) {
      return res.status(400).json({
        success: false,
        message: "Employee not found",  // Provide a specific message for better clarity
      });
    }

    // Update employee details
    const updatedEmployee = await Employee.findByIdAndUpdate(
      { _id: id },
      { name, email, phone, gender, department, course, role },
      { new: true }  // This will return the updated document
    );

    if (!updatedEmployee) {
      return res.status(404).json({
        success: false,
        message: "Employee update failed",  // Specific failure message
      });
    }

    return res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      employee: updatedEmployee,
    });
    
  } catch (error) {
    console.error(error);  // Log the error for debugging
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const deleteEmployee =async(req,res)=>{
  try {
    const { id } = req.params;
 

    

    // Update the department
    const deleteEmp = await Employee.findByIdAndDelete(
      { _id: id }
    );

    

    // Success response
    return res.status(200).json({
      success: true,
      message: "Employee deleted successfully.",
      department: deleteEmp,
    });
  } catch (error) {
    // Error handling
    return res.status(500).json({
      success: false,
      error: "delete Employee  server error",
    });
  }
}
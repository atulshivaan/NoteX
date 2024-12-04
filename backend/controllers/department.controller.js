import Department from "../models/department.model.js";

export const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;

    // Validate input
    if (!dep_name || !description) {
      return res.status(400).json({
        success: false,
        message: "Both department name and description are required.",
      });
    }

    // Create new department
    const newDep = new Department({
      dep_name,
      description,
    });

    // Save to database
    await newDep.save();

    // Success response
    res.status(201).json({
      success: true,
      message: "Department added successfully",
      data: newDep,
    });
  } catch (error) {
    // Error response
    res.status(500).json({
      success: false,
      message: "An error occurred while adding the department",
      error: error.message,
    });
  }
};

export const getDepartments = async(req, res)=>{
try {
  const departments = await Department.find()
  return res.status(200).json({
    success:true,
    departments
  })
  
} catch (error) {
  return res.status(500).json({
    success:false,
    error:"get  department server error"
  })
}
}
export const editDepartment = async(req,res)=>{
  try {
    const {id}= req.params;
    const department=await Department.findById({_id:id})
    return res.status(200).json({
      success:true,
      department
    })
  } catch (error) {
    return res.status(500).json({
      success:false,
      error:"Get department server error"
    })
  }
 
}

export const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { dep_name, description } = req.body;

    // Validate required fields
    if (!dep_name || !description) {
      return res.status(400).json({
        success: false,
        error: "Both 'dep_name' and 'description' are required.",
      });
    }

    // Update the department
    const updateDep = await Department.findByIdAndUpdate(
      { _id: id },
      { dep_name, description },
      { new: true } // Return the updated document
    );

    // Check if the department was found
    if (!updateDep) {
      return res.status(404).json({
        success: false,
        error: "Department not found.",
      });
    }

    // Success response
    return res.status(200).json({
      success: true,
      message: "Department updated successfully.",
      department: updateDep,
    });
  } catch (error) {
    // Error handling
    return res.status(500).json({
      success: false,
      error: "Update department server error",
    });
  }
};


/*------------------------------------------------------------- */

export const deletDepartment = async(req,res)=>{
  try {
    const { id } = req.params;
 

    

    // Update the department
    const deleteDep = await Department.findByIdAndDelete(
      { _id: id }
    );

    

    // Success response
    return res.status(200).json({
      success: true,
      message: "Department deleted successfully.",
      department: deleteDep,
    });
  } catch (error) {
    // Error handling
    return res.status(500).json({
      success: false,
      error: "delete department server error",
    });
  }
}
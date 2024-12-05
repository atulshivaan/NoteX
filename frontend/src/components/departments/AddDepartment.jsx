import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddDepartment = () => {

  const [department , setDepartment] = useState({
    dep_name:"",
    description:" "
  })
  const navigate = useNavigate();

const handleChange =(e)=>{
const {name , value }= e.target;
setDepartment({...department ,[name]:value})
  }

const handleSubmit =async(e)=>{
    e.preventDefault();
    try {
      const response= await axios.post("http://localhost:4040/api/department/add",department,{
        headers:{
          "Authorization":`Bearer ${localStorage.getItem("token")}`
        }
      })
      if(response.data.success)
      {
        navigate("/admin-dashbord/department")
      }



    } catch (error) {
      if(error.response && !error.response.daa.error)
      {
        alert(error.response.daa.error)
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-red-600 mb-4 text-center">Add Department</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label 
              htmlFor="dep_name" 
              className="block text-sm font-medium text-gray-700"
            >
              Department Name
            </label>
            <input
              type="text"
              name="dep_name"
              onChange={handleChange}
              placeholder="Enter Department name"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div>
            <label 
              htmlFor="dep_description" 
              className="block text-sm font-medium text-gray-700"
            >
              Department Description
            </label>
            <textarea
            
              name="description"
              placeholder="Description"
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Add Department
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;



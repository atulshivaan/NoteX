import { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const AddEmployee = () => {
const [departments, setDepartments] = useState([]); // Initialize as an empty array

{/*------data object----- */}
const [formData,setFormData]= useState({});


const navigate = useNavigate();


  useEffect(() => {
    const getDepartments = async () => {
      const fetchedDepartments = await fetchDepartments();
      setDepartments(fetchedDepartments || []); // Fallback to an empty array if undefined
    };
    getDepartments();
  }, []);

  {/*------handleChngae----- */}
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


    
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        "http://localhost:4040/api/employee/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      if (response.data.success) {
        navigate("/admin-dashbord/employee");
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "An unexpected error occurred");
    }
  };

    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="max-w-4xl w-full bg-white p-8 rounded-md shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Add New Employee</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  placeholder="Enter Employee Name"
                  className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
                  required
                />
              </div>
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="Enter Employee Email"
                  className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
                  required
                />
              </div>
              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  onChange={handleChange}
                  placeholder="Enter Employee Phone Number"
                  className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
                  required
                />
              </div>
              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Gender
                </label>
                <select
                  name="gender"
                  onChange={handleChange}
                  className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
             {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Department
              </label>
              <select
                name="department"
                onChange={handleChange}
                className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
                required
              >
                <option value="">Select Department</option>
                {departments.map((dep) => (
                  <option key={dep._id} value={dep._id}>
                    {dep.dep_name}
                  </option>
                ))}
              </select>
            </div>
              {/* Course */}
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Course
                </label>
                <input
                  type="text"
                  name="course"
                  onChange={handleChange}
                  placeholder="Enter Employee Course"
                  className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
                  required
                />
              </div>
              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Role
                </label>
                <select
                  name="role"
                  onChange={handleChange}
                  className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="Manager">Manager</option>
                  <option value="Developer">Developer</option>
                  <option value="Designer">Designer</option>
                </select>
              </div>
              
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-red-500 hover:bg-red-100 text-black font-bold py-3 px-6 rounded-md transition duration-200"
            >
              Add Employee
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default AddEmployee;
  
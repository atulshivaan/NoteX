import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import { DepartmentButtons } from "../../utils/DepartmentHealper";




const EditDepartment = () => {

  const [department, setDepartment] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
/*--------------------------------------------------- */
  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get(`http://localhost:4040/api/department/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
          
          setDepartment(response.data.department);
        }
      } catch (error) {
        if (error.response && error.response.data.error) {
          alert(error.response.data.error);
        }
      } finally {
        setDepLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  /*-------------------------------------------------------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

   /*-------------------------------------------------------------- */
  const handleSubmit =async(e)=>{
    e.preventDefault();
    try {
      const response= await axios.put(`http://localhost:4040/api/department/${id}`,department,{
        headers:{
          "Authorization":`Bearer ${localStorage.getItem("token")}`
        }
      })
      if(response.data.success)
      {
        setDepartment(response.data.success)
        navigate("/admin-dashbord/department")
      }



    } catch (error) {
      if(error.response && !error.response.daa.error)
      {
        alert(error.response.daa.error)
      }
    }
  }


   /*-------------------------------------------------------------- */
 
  return (
    <>
      {depLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold text-red-600 mb-4 text-center">Edit Department</h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="dep_name" className="block text-sm font-medium text-gray-700">
                  Department Name
                </label>
                <input
                  type="text"
                  name="dep_name"
                  onChange={handleChange}
                  value={department.dep_name}
                  placeholder="Enter Department name"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Department Description
                </label>
                <textarea
                  name="description"
                  placeholder="Description"
                  onChange={handleChange}
                  value={department.description }
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Edit Department
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditDepartment;

import axios from "axios";
import { useNavigate } from "react-router-dom";
export const fetchDepartments = async () => {
    let departments = [];
    try {
      const response = await axios.get("http://localhost:4040/api/department", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        departments = response.data.departments; // Fixed typo
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
      if (error.response) {
        console.error("Response error:", error.response.data);
        alert(error.response.data.error || "Failed to fetch departments.");
      }
    }
    return departments;
  };

  export const columns = [
    {
      name: "S No.",
      selector: (row) => row.sno,
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Phone",
      selector: (row) =>row.phone,
    },
    {
      name:"Gender",
      selector:(row)=>row.gender
    },
    {
      name: "Department",
      selector: (row) => row.dep_name,
    },
    {
      name: "Course",
      selector: (row) => row.course,
    },
    {
      name: "Role",
      selector: (row) => row.role,
    },
    {
      name: "Actions",
      cell: (row) => <EmployeeButtons _id={row._id} />, // Render action buttons
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];




/*----------------------------------------------------------- */
  export const EmployeeButtons = ({ _id  , onEmployeeDelete}) => {
  const navigate = useNavigate();
  
  
/*------------------------------------------------------ */
const handleDelete = async (id) => {
  try {
    // Send the delete request to the backend
    const response = await axios.delete(`http://localhost:4040/api/employee/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    // If deletion is successful
    if (response.data.success) {
      alert("Employee deleted successfully!");
      
      onEmployeeDelete(id)
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      alert(error.response.data.error);
    } else {
      console.error("Error deleting department:", error);
    }
  }
};
 /*------------------------------------------------------------------------------ */

  /*------------------------------------------------------------------------------ */

/*------------------------------------------------------------------------------ */
  return (
    <div className="flex space-x-4">
    <button 
    className="px-3 py-1 text-white bg-yellow-500 rounded-md shadow hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-400 transition"
    onClick={()=>navigate(`/admin-dashbord/employee/${_id}`)}
    >
      
      View
    </button>
    <button
     className="px-6 py-2 text-white bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 transition"
     onClick={()=>navigate(`/admin-dashbord/employee/edit/${_id}`)}
     >
      Edit
    </button>
    <button 
    className="px-6 py-2 text-white bg-red-500 rounded-md shadow hover:bg-red-600 focus:ring-2 focus:ring-red-400 transition"
    onClick={()=>handleDelete(_id)}
    >
      Delete
    </button>
  </div>
  );
  }
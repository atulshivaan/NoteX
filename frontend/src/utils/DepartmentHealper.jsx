import { useNavigate } from "react-router-dom";
import axios from "axios"
import { useState ,} from "react";


export const columns = [
  {
    name: "S No.",
    selector: (row) => row.sno,
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

/*------------------------------------------------------------------------- */
export const DepartmentButtons = ({ _id ,  onDepartmentDelete}) => {
  const [departments, setDepartments] = useState({});
  const navigate = useNavigate();

  


 /*------------------------------------------------------------------------------ */
 const handleDelete = async (id) => {
  try {
    // Send the delete request to the backend
    const response = await axios.delete(`http://localhost:4040/api/department/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    // If deletion is successful
    if (response.data.success) {
      alert("Department deleted successfully!");
      
      onDepartmentDelete(id)
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
const handleEdit = () => {
   console.log(`Navigating to: /admin-dashbord/department/edit/${_id}`);
    navigate(`/admin-dashbord/department/edit/${_id}`);
  };
/*------------------------------------------------------------------------------ */
  return (
    <div className="flex space-x-2">
      <button
        className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
        onClick={handleEdit}
      >
        Edit
      </button>
      <button className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition"
      onClick={()=>handleDelete(_id)}>
        Delete
      </button>
    </div>
  );
};


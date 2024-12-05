import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/DepartmentHealper.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
/*--------------------------------------------------------------------- */
const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [filterDepartments , setfilterDepartments ] = useState([])


  /*--------------------------------------------------------------------- */
  const onDepartmentDelete=async(id)=>{
    const data = await departments.filter(dep=>dep._id !==id)
    setDepartments(data)
  }

/*--------------------------------------------------------------------- */
  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get("http://localhost:4040/api/department", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
          let sno = 1;
          const data = response.data.departments.map((dep) => ({
            _id: dep._id,
            sno: sno++,
            dep_name: dep.dep_name,
            action: <DepartmentButtons _id={dep._id}  onDepartmentDelete={ onDepartmentDelete} />,
          }));
          setDepartments(data);
          setfilterDepartments(data);
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
/*--------------------------------------------------------------------- */
const filterDep = (e=>{
const recored = departments.filter((dep)=>
dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))
setfilterDepartments(recored)
})




/*--------------------------------------------------------------------- */
  return (
    <>
      {depLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <span className="text-red-600 text-lg">Loading...</span>
        </div>
      ) : (
        <div className="p-8 bg-red-50 min-h-screen">
          <div className="text-center mb-6">
            <h3 className="text-3xl font-bold text-red-600">Manage Departments</h3>
          </div>
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search "
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              onChange={filterDep}
            />
            <Link
              to="/admin-dashbord/add-department"
              className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Add New Department
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <DataTable
              columns={columns}
              data={filterDepartments}
              pagination
              highlightOnHover
              className="table-auto"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DepartmentList;

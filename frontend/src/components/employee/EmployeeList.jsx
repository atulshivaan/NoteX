import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, EmployeeButtons } from "../../utils/EmployeeHelper.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filterEmployees, setFilterEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);

  /*---------------------------------------------- */
  const onEmployeeDelete = async (id) => {
    const data = employees.filter((emp) => emp._id !== id);
    setEmployees(data);
    setFilterEmployees(data);
  };

  /*---------------------------------------------- */
  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get("http://localhost:4040/api/employee", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
          let sno = 1;
          const data = response.data.employee.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department.dep_name || "",
            name: emp.name,
            email: emp.email,
            phone: emp.phone,
            gender: emp.gender,
            course: emp.course,
            role: emp.role,
            action: <EmployeeButtons _id={emp._id} onEmployeeDelete={onEmployeeDelete} />,
          }));
          setEmployees(data);
          setFilterEmployees(data);
        }
      } catch (error) {
        alert(error.response?.data?.error || "Failed to fetch employees.");
      } finally {
        setEmpLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  /*---------------------------------------------- */
  const filterEmp = (e) => {
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilterEmployees(records);
  };

  /*---------------------------------------------- */
  return (
    <>
      {empLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <span className="text-blue-600 text-lg">Loading...</span>
        </div>
      ) : (
        <div className="p-8 bg-gray-50 min-h-screen">
          <div className="text-center mb-6">
            <h3 className="text-3xl font-bold text-blue-600">Manage Employees</h3>
          </div>
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search employees..."
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              onChange={filterEmp}
            />
            <Link
              to="/admin-dashbord/add-employee"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add New Employee
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <DataTable
              columns={columns}
              data={filterEmployees}
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

export default EmployeeList;

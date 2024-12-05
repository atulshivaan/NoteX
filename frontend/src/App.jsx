import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login.jsx";
import AdminDashbord from "./pages/AdminDashbord.jsx";
import EmployeeDashbord from "./pages/EmployeeDashbord.jsx";
import Privateroutes from "./utils/Privateroutes.jsx";
import RolebasedRoutes from "./utils/RolebasedRoutes.jsx";
import Summary from "./components/Summary.jsx";

import DepartmentList from "./components/departments/DepartmentList.jsx";
import AddDepartment from "./components/departments/AddDepartment.jsx";
import EditDepartment from "./components/departments/EditDepartment.jsx";
import EmployeeList from "./components/employee/EmployeeList.jsx";
import AddEmployee from "./components/employee/AddEmployee.jsx";
import View from "./components/employee/View.jsx";
import Edit from "./components/employee/Edit.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root path to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Admin Dashboard - Private and Role-Based Access */}
        <Route
    path="/admin-dashbord"
    element={
      <Privateroutes>
        <RolebasedRoutes requiredRole={["admin"]}>
          <AdminDashbord />
        </RolebasedRoutes>
      </Privateroutes>
    }
  >
    {/* Nested Routes */}
    <Route index element={<Summary />} />
    
    <Route path="department" element={<DepartmentList />} />
    <Route path="add-department" element={<AddDepartment />} />
    <Route path="department/edit/:id" element={<EditDepartment />} />


    <Route path="employee" element={<EmployeeList />} />
    <Route path="add-employee" element={<AddEmployee />} />
    <Route path="employee/:id" element={<View />} />
    <Route path="employee/edit/:id" element={<Edit/>} />

    
  </Route>

        {/* Employee Dashboard - Private and Role-Based Access */}
        <Route
          path="/employee-dashbord"
          element={
            <Privateroutes>
              <RolebasedRoutes requiredRole={["employee"]}>
                <EmployeeDashbord />
              </RolebasedRoutes>
            </Privateroutes>
          }
        />

        {/* Fallback for Unknown Routes */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

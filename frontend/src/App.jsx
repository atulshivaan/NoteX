import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login.jsx";
import AdminDashbord from "./pages/AdminDashbord.jsx";
import EmployeeDashbord from "./pages/EmployeeDashbord.jsx";
import Privateroutes from "./utils/Privateroutes.jsx";
import RolebasedRoutes from "./utils/RolebasedRoutes.jsx";
import Summary from "./components/Summary.jsx";
import Department from "./components/departments/Department.jsx";
import Employee from "./components/employee/Employee.jsx";
import Leave from "./components/leave/Leave.jsx";
import Salary from "./components/salary/Salary.jsx";
import Settings from "./components/settings/Settings.jsx";

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
    <Route path="department" element={<Department />} />
    <Route path="employee" element={<Employee />} />
    <Route path="leave" element={<Leave />} />
    <Route path="salary" element={<Salary />} />
    <Route path="settings" element={<Settings />} />
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

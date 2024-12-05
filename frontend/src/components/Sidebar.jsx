import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaCalendar,
  FaCogs,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaUser,
} from "react-icons/fa";
/*------------------------------------------------------------------------- */
const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white fixed left-0 top-0 bottom-0 space-y-2 w-64">
      <div className="bg-red-500 h-12 flex items-center justify-center">
        <h1 className="text-2xl text-center font-sans">
          Note<span className="text-black font-bold">X</span>
        </h1>
      </div>

      <div className="px-4">
        {/*----------------------------------------------------- */}

        <NavLink
          to="/admin-dashbord"
          className={({ isActive }) =>
            `${
              isActive ? "bg-red-400" : ""
            } flex items-center space-x-4  py-2.5 px-4 rounded`
          }
          end
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        {/*----------------------------------------------------- */}
        <NavLink
          to="/admin-dashbord/employee"
          className={({ isActive }) =>
            `${
              isActive ? "bg-red-400" : ""
            } flex items-center space-x-4  py-2.5 px-4 rounded`
          }
        >
          <FaUser />
          <span>Employee</span>
        </NavLink>

        {/*----------------------------------------------------- */}
       
        <NavLink
          to="/admin-dashbord/department"
          className={({ isActive }) =>
            `${
              isActive ? "bg-red-400" : ""
            } flex items-center space-x-4  py-2.5 px-4 rounded`
          }
        >
          <FaBuilding />
          <span>Department</span>
        </NavLink>

        {/*----------------------------------------------------- */}
      </div>
    </div>
  );
};

export default Sidebar;

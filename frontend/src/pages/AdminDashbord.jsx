import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Sidebar from "../components/Sidebar";
import Summary from "../components/Summary";
import { H1 } from "../context/AuthContext";

const AdminDashbord = () => {
  const { user } = H1();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Navbar */}
        <div className="sticky top-0 z-10">
          <Navbar />
          <Outlet/>
        </div>

        
       
      </div>
    </div>
  );
};

export default AdminDashbord;


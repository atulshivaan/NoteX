import { Navigate } from "react-router-dom";
import { H1 } from "../context/AuthContext";

const Privateroutes = ({ children }) => {
  const { user, loading } = H1();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/login" />;
};

export default Privateroutes;


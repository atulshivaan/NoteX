import { Navigate } from "react-router-dom";
import { H1 } from "../context/AuthContext";

const RolebasedRoutes = ({ children, requiredRole }) => {
  const { user, loading } = H1();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!requiredRole.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default RolebasedRoutes;

import { Navigate } from 'react-router-dom';
import { useUser } from "../utils/UserContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return null;
  }

  if (!user || user.role !== requiredRole) {
    return <Navigate to="/prijava" replace />;
  }

  return children;
};

export default ProtectedRoute;

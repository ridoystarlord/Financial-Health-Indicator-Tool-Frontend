import { Navigate } from "react-router-dom";
import { getToken } from "../utils/common";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = getToken();
  if (!token) {
    return <Navigate to={"/login"} replace />;
  }
  return children;
};

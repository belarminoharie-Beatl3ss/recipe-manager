import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./auth.hooks";

export default function RequireAuth() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthProvider";

export default function ProtectedRoute({allowRole}) {
  const {auth}=useAuthContext();
  console.log(auth);
  if (!auth) {
    return <Navigate to="/auth/login"  />;
  }
  if ( auth.role !== allowRole) {
    return <Navigate to="/auth/login"  />;
  }

  return <Outlet />; 
};
  


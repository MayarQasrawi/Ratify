import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthProvider";
import ExtractRole from "../utils/ExtractRole";

export default function ProtectedRoute({allowRole}) {
  const {auth}=useAuthContext();
  if (!auth) {
    return <Navigate to="/login"  />;
  }
  const role=ExtractRole(auth);
  if ( role.toLowerCase() !== allowRole.toLowerCase()) {
    return <Navigate to="/unAuthorized"  />;
  }

  return <Outlet />; 
};
  


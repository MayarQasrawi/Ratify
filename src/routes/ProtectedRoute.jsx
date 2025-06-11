import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthProvider";
import Extract from "../utils/Extract";

export default function ProtectedRoute({ allowRole }) {
  const { auth } = useAuthContext();

  if (!auth || typeof auth !== "string") {
    return <Navigate to="/login" />;
  }

  const role = Extract(auth, "role");

  if (role.toLowerCase() !== allowRole.toLowerCase()) {
    return <Navigate to="/unAuthorized" />;
  }

  return <Outlet />;
}

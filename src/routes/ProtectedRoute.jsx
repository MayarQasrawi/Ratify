import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthProvider";
import Extract from "../utils/Extract";

export default function ProtectedRoute({allowRole}) {
  const {auth}=useAuthContext();
  console.log(!auth,'inside protected')
  let role='Admin'
  
  // if (!auth || typeof auth !== "string") {
  //   return <Navigate to="/login" />;
  // }
  // console.log('hi')
  // const role=Extract(auth,'role');

  if (role.toLowerCase() !== allowRole.toLowerCase()) {
    return <Navigate to="/unAuthorized"  />;
  }
  return <Outlet />;
};
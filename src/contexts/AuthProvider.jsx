import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext=createContext();
export const AuthProvider=({children})=>{
    const [auth,setAuth]=useState(()=>{
       return  localStorage.getItem('token') ? localStorage.getItem('token'):null
    });
const navigate=useNavigate()
 const logout=()=>{
    setAuth(null);
    localStorage.removeItem("token");
    navigate('/login')
 }
    return(
        <AuthContext.Provider value={{auth,logout}}>
            {children}
        </AuthContext.Provider>
    )

}
export function useAuthContext(){
   const auth= useContext(AuthContext);
   return auth;
}
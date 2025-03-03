import { createContext, useContext, useState } from "react";

const AuthContext=createContext();
export const AuthProvider=({children})=>{
    const [auth,setAuth]=useState({role:'admin'});
    return(
        <AuthContext.Provider value={{auth,setAuth}}>
            {children}
        </AuthContext.Provider>
    )

}
export function useAuthContext(){
   const auth= useContext(AuthContext);
   return auth;
}
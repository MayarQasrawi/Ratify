import { NavLink } from "react-router-dom"
import menue from './Menue'
import { useAuthContext } from "../../../contexts/AuthProvider"
import Extract from "../../../utils/Extract";

export default function Sidebar() {
  // const {auth}=useAuthContext();
  let role='Admin';
  // if(auth){
  //    role=Extract(auth,'role');
  // }
  return (
    <ul className="pl-2 py-5 flex flex-col gap-4">
      {menue.map((menueItem,ind)=>{
        if(menueItem.visible.includes(role)){
          return (
            <NavLink
              end
              key={ind}
              to={`/dashboard/${role}/${menueItem.link}`}
              className={({ isActive }) => {
                return isActive
                  ? 'relative text-blue-600 font-medium bg-blue-50'
                  : 'text-gray-600 hover:bg-gray-50';
              }}
            >
              <li className="relative py-3 px-4 transition-all duration-200">
                <div className="flex items-center gap-3">
                  <span className="text-xl flex-shrink-0">{menueItem.icon}</span>
                  <span className="text-sm hidden md:block transition-all duration-200">
                    {menueItem.title}
                  </span>
                </div>
                <div className={({ isActive }) => 
                  isActive ? "absolute top-0 bottom-0 left-0 w-1 bg-blue-600" : ""
                } />
              </li>
            </NavLink>
          );
        }
        return null; 
      })}
    </ul>
  );
}
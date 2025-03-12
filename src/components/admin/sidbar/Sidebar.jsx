import { NavLink } from "react-router-dom"
import menue from './Menue'
import { useAuthContext } from "../../../contexts/AuthProvider"
import ExtractRole from "../../../utils/ExtractRole";

export default function Sidebar() {
  const {auth}=useAuthContext();
  const role=ExtractRole(auth);
  console.log(role)
  return (
    <ul className="pl-2 py-5 flex flex-col gap-4">
      {menue.map((menueItem,ind)=>{
        if(menueItem.visible.includes(role)){
          return (
          <NavLink end key={ind} to={`/dashboard/${role}/${menueItem.link}`} className={(({isActive})=>{
           return isActive ? 'border-r-5 border-r-[#3B82F6] text-blue-600 font-semibold':'text-gray-400'
          })}>
            <li className="hover:bg-[#E7ECFF] transition py-2 sm:text-center md:text-left" >
             <div className="flex items-center gap-2.5 ">
              <span className="pl-1 text-[20px] block ">{menueItem.icon}</span><span className=" text-[16px] hidden sm:block" >{menueItem.title}</span>
             </div>
            </li>
            </NavLink>  
          )
        }
      })}
    </ul>
  )
}

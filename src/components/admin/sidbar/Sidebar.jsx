import { Navigate, NavLink } from "react-router-dom";
import menue from "./Menue";
import { useAuthContext } from "../../../contexts/AuthProvider";
import Extract from "../../../utils/Extract";

export default function Sidebar() {
  const { auth } = useAuthContext();
  let role='Admin'
  if(auth)
    role=Extract(auth ,'role')
  // if (!auth || typeof auth !== "string") {
  //   return <Navigate to="/login" />;
  // }
const path=role.charAt(0).toLowerCase() + role.slice(1);
  return (
    <ul className="flex flex-col mx-auto  sm:items-center lg:items-start ">
      {menue.map((menueItem, ind) => {
        if (menueItem.visible.includes(role)) {
          return (
            <NavLink
              end
              key={ind}
              to={`/dashboard/${path}/${menueItem.link}`}
              className={({ isActive }) => {
                return isActive
                  ? "relative w-full  text-[var(--main-color)]  rounded-xl bg-[var(--sidebar-icon-bg)]"
                  : "text-[var(--text-color)] hover:text-[var(--main-color)]";
              }}
            >
              {({ isActive }) => (
                <li className={`relative py-2 lg:py-3 px-4  transition-all ease-in-out font-medium mx-auto m-3 duration-200 ${isActive&&" border-l-3  border-[var(--secondary-color)] md:border-0"}`}>
                  <div className="flex gap-3  items-center">
                    {/* Icon with active styles */}
                    <div
                      className={`text-xl flex-shrink-0 }`}
                    >
                      {isActive? menueItem.active:menueItem.icon}
                    
                    </div>
                    <span className="text-sm hidden lg:block transition-all duration-200">
                      {menueItem.title}
                    </span>
                  </div>
                </li>
              )}
            </NavLink>
          );
        }
        return null;
      })}
    </ul>
  );
}
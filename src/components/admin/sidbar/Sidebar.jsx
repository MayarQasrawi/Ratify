import { NavLink } from "react-router-dom";
import menue from "./Menue";

export default function Sidebar() {
  let role = "Admin";

  return (
    <ul className="flex flex-col mx-auto">
      {menue.map((menueItem, ind) => {
        if (menueItem.visible.includes(role)) {
          return (
            <NavLink
              end
              key={ind}
              to={`/dashboard/${role}/${menueItem.link}`}
              className={({ isActive }) => {
                return isActive
                  ? "relative text-[var(--main-color)]  rounded-xl bg-[var(--sidebar-icon-bg)]"
                  : "text-[var(--text-color)] hover:text-[var(--main-color)]";
              }}
            >
              {/* Pass isActive as a prop to the li element */}
              {({ isActive }) => (
                <li className={`relative py-2 lg:py-3 px-4  transition-all ease-in-out font-medium mx-auto m-3 duration-200 ${isActive&&" border-l-3  border-[var(--secondary-color)] md:border-0"}`}>
                  <div className="flex gap-3  items-center">
                    {/* Icon with active styles */}
                    <div
                      className={`text-xl flex-shrink-0 }`}
                    >
                      {menueItem.icon}
                    </div>
                    <span className="text-sm hidden sm:block transition-all duration-200">
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
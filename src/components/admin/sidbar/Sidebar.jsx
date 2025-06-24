import { NavLink } from "react-router-dom"
import menue from "./Menue"
import { useAuthContext } from "../../../contexts/AuthProvider"
import Extract from "../../../utils/Extract"

export default function Sidebar({ ind, collapsed }) {
  const { auth } = useAuthContext()
  let role = "Examiner"
  if (auth) role = Extract(auth, "role")

  console.log(ind, "ind ind ")

  const path = role.charAt(0).toLowerCase() + role.slice(1)
  return (
    <ul className="flex flex-col mx-auto sm:items-center lg:items-start">
      {menue.map((menueItem, index) => {
        if (menueItem.visible.includes(role)) {
          if (menueItem.title === "Assigned Work" && !ind) {
            return null
          }
          return (
            <NavLink
              end
              key={index}
              to={`/dashboard/${path}/${menueItem.link}`}
              title={menueItem.title}
        
              className={({ isActive }) =>
                isActive
                  ? "relative w-full text-[var(--main-color)] rounded-xl bg-[var(--sidebar-icon-bg)]"
                  : "text-[var(--text-color)] hover:text-[var(--main-color)]"
              }
            >
              {({ isActive }) => (
                <li
                  className={`relative py-2 lg:py-2 px-4 transition-all ease-in-out font-medium mx-auto m-3 duration-200 ${
                    isActive && " border-l-3 border-[var(--secondary-color)] md:border-0"
                  }`}
                >
                  <div className="flex gap-3 items-center">
                    <div className="text-xl flex-shrink-0">
                      {(menueItem.title !== "Add Task" || ind) && (isActive ? menueItem.active : menueItem.icon)}
                    </div>

                    <span
                      className={`text-sm hidden lg:block transition-all duration-300 ease-in-out ${
                        collapsed
                          ? "opacity-0 transform translate-x-2 pointer-events-none"
                          : "opacity-100 transform translate-x-0"
                      }`}
                    >
                      {menueItem.title}
                    </span>
                  </div>
                </li>
              )}
            </NavLink>
          )
        }
        return null
      })}
    </ul>
  )
}

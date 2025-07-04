import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaHome,
  FaStickyNote,
  FaTasks,
  FaChevronLeft,
  FaChevronRight,
  FaPen,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function LeftNav() {
  const [isExpanded, setIsExpanded] = useState(false);
  const user = useSelector((state) => state.auth.user?.data?.user);
  const firstName = user?.name?.split(" ")[0] || "";
  const avatar = user?.avatarImage || "/avatars/default.svg";

  const navItems = [
    { to: "/dashboard", icon: <FaHome />, label: "Home" },
    { to: "/notes", icon: <FaStickyNote />, label: "Notes" },
    { to: "/tasks", icon: <FaTasks />, label: "Tasks" },
  ];

  return (
    <aside
      className={`h-[calc(100vh-5rem)] sm:h-[calc(100vh-6rem)] bg-light-background dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col justify-between ${
        isExpanded ? "w-48" : "w-20"
      }`}
    >
      <div>
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className={`w-full flex justify-center items-center border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-white ${
            isExpanded ? "py-3" : "aspect-square"
          }`}
          title={isExpanded ? "Close menu" : "Expand menu"}
        >
          {isExpanded ? <FaChevronLeft /> : <FaChevronRight />}
        </button>

        <nav className="flex flex-col items-start space-y-4 mt-6">
          {navItems.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              title={!isExpanded ? label : ""}
              className={({ isActive }) =>
                `relative flex items-center w-full transition-colors rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  isActive
                    ? "text-blue-500 font-semibold"
                    : "text-gray-600 dark:text-gray-300"
                } ${isExpanded ? "px-4 py-2" : "justify-center aspect-square"}`
              }
            >
              <span className="text-lg">{icon}</span>
              {isExpanded && <span className="ml-3 text-sm">{label}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      <div
        className="group cursor-pointer p-4 flex items-center gap-2 "
        title="Change profile picture"
      >
        <Link to={"/avatar"}>
          <div className="relative">
            <img
              src={avatar}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border"
            />
            {/* Pencil icon on hover */}
            <FaPen className="absolute inset-0 m-auto text-xs text-white bg-black/60 rounded-full p-1 w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </div>
        </Link>
        {isExpanded && (
          <span
            className="cursor-default text-sm text-gray-700 dark:text-gray-200 truncate max-w-[8rem]"
            title={firstName}
          >
            {firstName}
          </span>
        )}
      </div>
    </aside>
  );
}

export default LeftNav;

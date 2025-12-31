import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen fixed left-0 top-0">
      <div className="p-4 text-xl font-bold border-b border-gray-700">
        Admin Panel
      </div>

      <nav className="mt-4 flex flex-col">
        <NavLink
          to="/"
          className="px-4 py-2 hover:bg-gray-700"
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/records"
          className="px-4 py-2 hover:bg-gray-700"
        >
          Records
        </NavLink>

        {/* Admin only */}
        {user?.role === "admin" && (
          <NavLink
            to="/users"
            className="px-4 py-2 hover:bg-gray-700"
          >
            Users
          </NavLink>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;

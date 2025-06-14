import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import PropTypes from "prop-types";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <>
      {/* Toggle Button for Mobile */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-white bg-[#111] p-2 rounded-full shadow-lg"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-[#111] border-r border-[#242424] transform transition-transform duration-300 ease-in-out 
          ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
      >
        <ul className="py-4 mt-20">
          {[
            { to: "/admin/movies/dashboard", label: "Dashboard" },
            { to: "/admin/movies/create", label: "Create Movie" },
            { to: "/admin/movies/genre", label: "Create Genre" },
            { to: "/admin/movies-list", label: "Update Movie" },
            { to: "/admin/movies/comments", label: "Comments" },
          ].map(({ to, label }) => (
            <li
              key={to}
              className="text-lg hover:bg-gradient-to-b from-green-500 to-lime-400 rounded-full mx-6 my-2"
            >
              <Link to={to} className="block px-4 py-2 text-white">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

Sidebar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  setIsSidebarOpen: PropTypes.func.isRequired,
};

export default Sidebar;

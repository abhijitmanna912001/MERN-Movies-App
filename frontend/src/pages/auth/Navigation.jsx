import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { MdOutlineLocalMovies } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 bg-[#0f0f0f] border w-[90%] sm:w-[60%] max-w-[500px] px-6 py-3 rounded-md">
      <section className="flex justify-around items-center">
        <Link to="/" className="hover:scale-110 transition-transform">
          <AiOutlineHome size={26} className="text-white" />
        </Link>

        <Link to="/movies" className="hover:scale-110 transition-transform">
          <MdOutlineLocalMovies size={26} className="text-white" />
        </Link>

        {userInfo ? (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-white flex items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 transition-transform ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <ul className="absolute right-0 top-full mt-2 w-40 rounded bg-white text-gray-700 shadow-lg z-50">
                {userInfo.isAdmin && (
                  <li>
                    <Link
                      to="/admin/movies/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    // onClick={logoutHandler}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="hover:scale-110 transition-transform">
              <AiOutlineLogin size={26} className="text-white" />
            </Link>
            <Link
              to="/register"
              className="hover:scale-110 transition-transform"
            >
              <AiOutlineUserAdd size={26} className="text-white" />
            </Link>
          </>
        )}
      </section>
    </div>
  );
};

export default Navigation;

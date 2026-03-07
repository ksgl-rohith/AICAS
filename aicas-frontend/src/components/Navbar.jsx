import { logout } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiBell } from "react-icons/fi";

const Navbar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (

    <div className="flex items-center justify-between bg-white border-b shadow-sm px-6 py-3">

      {/* Left Section */}

      <div className="flex items-center gap-3">

        <div className="bg-black text-white px-3 py-2 rounded-lg font-bold">
        </div>

        <h2 className="text-gray-700 font-semibold text-lg hidden md:block">
                    Automated Intelligent Content Authoring and Scheduling System

        </h2>

      </div>

      {/* Right Section */}

      <div className="flex items-center gap-5">

        {/* Notifications */}
{/* 
        <button className="relative text-gray-600 hover:text-black transition">

          <FiBell size={20} />

          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
            2
          </span>

        </button> */}

        {/* User Profile */}

        {/* <div className="flex items-center gap-3">

          <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center font-semibold">
            U
          </div>

          <span className="text-gray-700 font-medium hidden md:block">
            User
          </span>

        </div> */}

        {/* Logout */}

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          <FiLogOut />
          Logout
        </button>

      </div>

    </div>

  );
};

export default Navbar;
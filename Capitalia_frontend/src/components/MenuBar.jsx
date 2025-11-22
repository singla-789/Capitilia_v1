import { useContext, useState, useRef } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { Menu, User, X } from "lucide-react";
import { assets } from "../assets/assets";

const Menubar = () => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null); // FIXED

  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 sm:px-7 sticky top-0 z-30">
      {/* Left side - menu button */}
      <div className="flex items-center gap-5">
        <button
          onClick={() => setOpenSideMenu(!openSideMenu)}
          className="block lg:hidden text-black hover:bg-gray-100 p-1 rounded transition-colors"
        >
          {openSideMenu ? <X size={28} /> : <Menu size={28} />}
        </button>

        <div className="felx items-center gap-2">
          <img src={assets.logo} alt="logo" className="h-10 w-10" />
          <span className="text-lg font-medium text-black truncated">
            Capitalia
          </span>
        </div>
      </div>

      {/* Right side */}
      <div className="relative">
        <button className="flex items-cneter justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-800 focus:ring-offset-2">
          <User className="text-purple"></User>
        </button>

        {/* drop down */}

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
            {/* User info */}
            <div className="px-4 py-3 border-b border-gray-100"></div>

            {/* Drop options */}
            <div className="py-2 px-4 text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors duration-200"></div>
          </div>
        )}
      </div>

      {/* Middle / Mobile side menu */}
      <div>mid</div>
    </div>
  );
};

export default Menubar;

import { useContext, useState, useRef, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { LogOut, Menu, Sidebar, User, X } from "lucide-react";
import { assets } from "../assets/assets";

const Menubar = ({activeMenu}) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);
  const { user, clearUser } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) =>{
      if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
        setShowDropdown(false);
      }
    };

    if(showDropdown){
      document.addEventListener("mousedown",handleClickOutside);
    }

    return() =>{
      document.removeEventListener("mousedown",handleClickOutside);
    }

  },[showDropdown]); 

  const handleLogout = () =>{
    localStorage.clear();
    clearUser();
    setShowDropdown(false);
    navigate("/login");
  }

  return (
    <div className="flex items-center justify-between gap-5 bg-white border-b border-gray-200 backdrop-blur-[3px] py-4 sm:px-7 sticky top-0 z-30 shadow-sm">
      {/* Left section */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setOpenSideMenu(!openSideMenu)}
          className="lg:hidden text-black hover:bg-gray-100 p-2 rounded-full transition-colors"
        >
          {openSideMenu ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src={assets.logo}
            alt="logo"
            className="h-10 w-10 rounded-full"
          />
          <span className="text-xl font-semibold text-gray-800 tracking-wide">
            Capitalia
          </span>
        </div>
      </div>

      {/* Right section */}
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full transition-all"
        >
          <User className="text-blue-600" size={20} />
        </button>

        {/* Dropdown */}
        {showDropdown && (
          <div
            ref={dropdownRef}
            className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 animate-fadeIn"
          >
            {/* User Info */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
              <div className="w-10 h-10 flex items-center justify-center bg-blue-50 rounded-full">
                <User className="text-blue-600" size={18} />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.fullName}
                </p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>

            {/* Logout */}
            <div
              className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 text-gray-500" />
              <span className="text-sm">Log Out</span>
            </div>
          </div>
        )}
      </div>

      {/* =Mobile side menu*/}
      {openSideMenu &&(
        <div className="fixed left-0 right-0 bg-white border-b border-gray-200 lg:hidden z-20 top-[73px]">
        <Sidebar activeMenu={activeMenu} />
      </div>
      )}
    </div>
  );
};

export default Menubar;

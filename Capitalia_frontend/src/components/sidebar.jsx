import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { User } from "lucide-react";
import { SIDE_BAR_DATA } from "../assets/assets";   // ✅ FIXED IMPORT
import { useNavigate } from "react-router-dom";

const SideBar = ({ activeMenu }) => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200 p-5 sticky top-[61px] z-20 shadow-sm">

      {/* User Section */}
      <div className="flex flex-col items-center justify-center gap-3 mt-4 mb-8">
        {user?.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt="profile"
            className="w-20 h-20 rounded-full object-cover shadow-md border"
          />
        ) : (
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-blue-50 border shadow-inner">
            <User className="w-10 h-10 text-blue-600" />
          </div>
        )}

        <h5 className="text-gray-900 font-semibold text-lg truncate max-w-[180px]">
          {user?.fullName || "User"}
        </h5>
      </div>

      {/* Menu Items */}
      {SIDE_BAR_DATA.map((item) => {
        const isActive = activeMenu === item.label;

        return (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className={`
              w-full flex items-center gap-4
              text-[15px] py-3 px-4 mb-2 rounded-lg
              transition-all duration-150
              cursor-pointer
              ${isActive ? "bg-blue-50 text-blue-800 font-medium" : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"}
            `}
          >
            <item.icon
              className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-gray-600"}`}
            />
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default SideBar;

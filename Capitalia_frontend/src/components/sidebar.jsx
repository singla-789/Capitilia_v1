import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { User } from "lucide-react";
import { SIDE_BAR_DATA } from "../assets/assets"; // FIX: correct import
import { useNavigate } from "react-router-dom";

const SideBar = () => {
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

      {/* Menu Options */}
      {SIDE_BAR_DATA.map((item) => (
        <button
          onClick={() => navigate(item.path)}
          key={item.id}
          className="
          cursor-pointer
            w-full flex items-center gap-4
            text-[15px] py-3 px-4
            rounded-lg mb-2
            hover:bg-blue-50 hover:text-blue-700
            text-gray-700 transition-all duration-150
          "
        >
          <item.icon className="w-5 h-5 text-gray-600" />
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default SideBar;

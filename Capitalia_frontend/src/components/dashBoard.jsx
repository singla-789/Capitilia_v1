import { useContext } from "react";
import Menubar from "./MenuBar";

import SideBar from "./sideBar";
import { AppContext } from "../context/AppContext";

const DashBoard = ({ children, activeMenu }) => {
  const { user } = useContext(AppContext);
  return (
    <div>
      <Menubar activeMenu={activeMenu} />
      {user && (
        <div className="flex">
          <div className="hidden lg:block">
            <SideBar activeMenu={activeMenu} />
          </div>
          <div className="grow mx-5">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashBoard;

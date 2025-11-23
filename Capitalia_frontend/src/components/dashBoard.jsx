
import Menubar from "./MenuBar";

import SideBar from "./sideBar";

const DashBoard = ({children}) => {
  return (
    <div>
      <Menubar />
      <div className="flex">
          <div className="hidden lg:block">
            <SideBar />
          </div>

          <div className="grow mx-5">{children}</div>
        </div>
    </div>
  );
};

export default DashBoard;

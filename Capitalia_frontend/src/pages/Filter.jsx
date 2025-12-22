import DashBoard from "../components/dashBoard";
import { useUser } from "../Hook/useUser";

const Filter = () => {
  useUser();
  return (
    <DashBoard activeMenu="Filters">
        <div className="my-5 mx-auto">
            <div className="flex item-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">Filter transactions</h2>
            </div>
            <div></div>
        </div>
    </DashBoard>
  )
};

export default Filter;

import DashBoard from "../components/dashBoard";
import { useUser } from "../Hook/useUser";

const Filter = () => {
    useUser();
    return (
        <DashBoard activeMenu="Filters">
                this is filters
            </DashBoard>
    )
}

export default Filter;
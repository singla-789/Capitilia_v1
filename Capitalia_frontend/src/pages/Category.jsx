import DashBoard from "../components/dashBoard";
import { useUser } from "../Hook/useUser";
const Category = () => {
    useUser();
    return(
        <DashBoard activeMenu="Category">
                this is category
            </DashBoard>
    )
}

export default Category;
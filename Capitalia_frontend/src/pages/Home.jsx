import DashBoard from "../components/dashBoard";
import { useUser } from "../Hook/useUser";

const Home = () => {
    useUser();
    return(
        <div>
            <DashBoard activeMenu="Dashboard">
                this is home page.
            </DashBoard>
        </div>
    )
}

export default Home; 
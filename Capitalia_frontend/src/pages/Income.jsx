import DashBoard from "../components/dashBoard";
import { useUser } from "../Hook/useUser";
const Income = () => {
    useUser();
    return (
        <DashBoard activeMenu="Income">
                this is incomes
            </DashBoard>
    )
}

export default Income;
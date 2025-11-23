import DashBoard from "../components/dashBoard";
import { useUser } from "../Hook/useUser";
const Expense = () => {
    useUser();
    return (
        <DashBoard activeMenu="Expense">
                this is expense
            </DashBoard>
    )
}

export default Expense;
import { Coins, Wallet, WalletCards } from "lucide-react";
import DashBoard from "../components/dashBoard";
import InfoCard from "../components/InfoCard";
import { useUser } from "../Hook/useUser";

import { addThousandsSeparator } from "../util/addThousandSeparator";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndPoints";
import toast from "react-hot-toast";
import RecentTransaction from "../components/RecentTransaction";
import FinanceOverview from "../components/FinanceOverview";
import Transactions from "../components/Transactions";

const Home = () => {
  useUser();

  const navigate = useNavigate();
  const [dashBoardData, setDashBoardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashBoardData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA);
      if (response.status == 200) {
        setDashBoardData(response.data);
      }
    } catch (error) {
      console.error(
        "Something went wrong while fetching the dashboard data",
        error
      );
      toast.error("cant fetch the data!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashBoardData();
    return () => {};
  }, []);

  return (
    <DashBoard activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Display the cards */}
          <InfoCard
            icon={<WalletCards />}
            label="Total balance"
            value={addThousandsSeparator(dashBoardData?.totalBalance || 0)}
            color="bg-purple-800"
          />
          <InfoCard
            icon={<Wallet />}
            label="Total Income"
            value={addThousandsSeparator(dashBoardData?.totalIncome || 0)}
            color="bg-green-800"
          />
          <InfoCard
            icon={<Coins />}
            label="Total Expense"
            value={addThousandsSeparator(dashBoardData?.totalExpense || 0)}
            color="bg-red-800"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Recent transactions */}
          <RecentTransaction trasactions={dashBoardData?.recentTransactions} />
          {/* Finance overview chart */}
          <FinanceOverview
            totalBalance={dashBoardData?.totalBalance || 0}
            totalExpense={dashBoardData?.totalExpense || 0}
            totalIncome={dashBoardData?.totalIncome || 0}
          />

          {/* Expense transactions */}

          <Transactions
            Transactions={dashBoardData?.recent5Expenses}
            onMore={() => navigate("/expense")}
            type="expense"
            title="These are recent expenses"
          />

          {/* Income transactions */}

          <Transactions
            Transactions={dashBoardData?.recent5Incomes}
            onMore={() => navigate("/income")}
            type="income"
            title="These are recent incomes"
          />

        </div>
      </div>
    </DashBoard>
  );
};

export default Home;

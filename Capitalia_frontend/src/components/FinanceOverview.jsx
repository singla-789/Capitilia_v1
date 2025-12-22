import { addThousandsSeparator } from "../util/addThousandSeparator";
import CustomPieChart from "../util/CustomePieChart";

const FinanceOverview = ({
  totalBalance,
  totalIncome,
  totalExpense,
}) => {
  const COLORS = ["#59168B", "#A0090E", "#016630"];

  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Expenses", amount: totalExpense },
    { name: "Total Income", amount: totalIncome },
  ];

  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Financial Overview</h5>
      </div>

      <CustomPieChart 
      data={balanceData}
      lable="Total Balance"
      totalAmount = {`₹${addThousandsSeparator(totalBalance)}`}
      color = {COLORS}
      showTextAnchor
      />
    </div>
  );
};

export default FinanceOverview;

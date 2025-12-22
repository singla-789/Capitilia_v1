import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import ExpenseLineChart from "../util/ExpenseLineChart";
import { prepareExpenseLineChartData } from "../util/prepareExpenseLineChartData";

const ExpenseOverview = ({ transactions, onAddExpense }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    setChartData(result);
  }, [transactions]);

  return (
    <div className="mt-4 rounded-xl bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h5 className="text-lg font-semibold text-gray-800">
            Expense Overview
          </h5>
          <p className="mt-0.5 text-xs text-gray-400">
            Track your spendings over time and analyze your expense trends.
          </p>
        </div>

        <button
          onClick={onAddExpense}
          className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2
                     text-white shadow-md transition hover:bg-red-600"
        >
          <Plus size={15} />
          Add Expense
        </button>
      </div>

      {/* Chart */}
      <div className="h-72">
        <ExpenseLineChart data={chartData} />
      </div>
    </div>
  );
};

export default ExpenseOverview;

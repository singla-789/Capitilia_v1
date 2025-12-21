import { useEffect, useState } from "react";
import IncomeLineChart from "../util/IncomeLineChart";
import { prepareIncomeLineChartData } from "../util/prepareIncomeLineChartData";
import { Plus } from "lucide-react";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Guard against undefined / empty data
    if (!Array.isArray(transactions) || transactions.length === 0) {
      setChartData([]);
      return;
    }

    const groupedData = prepareIncomeLineChartData(transactions);

    // Convert grouped data → chart-friendly format safely
    const formattedChartData = groupedData.map((item) => ({
      date: item.month,
      amount: item.totalAmount ?? 0,
      items: item.items,
    }));

    console.log(formattedChartData);

    setChartData(formattedChartData);
  }, [transactions]);

  return (
    <div className="mt-4 rounded-xl bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h5 className="text-lg font-semibold text-gray-800">
            Income Overview
          </h5>
          <p className="mt-0.5 text-xs text-gray-400">
            Track your earnings over time and analyze your income trends.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl shadow-md transition-all"
        onClick={onAddIncome}>
          <Plus size={15} className="text-lg" />
          Add Income
        </button>
      </div>

      {/* Chart */}
      <div className="h-72">
        <IncomeLineChart data={chartData} />
      </div>
    </div>
  );
};

export default IncomeOverview;

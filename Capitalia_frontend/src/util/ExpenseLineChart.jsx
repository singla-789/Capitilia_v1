import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
} from "recharts";
import { addThousandsSeparator } from "../util/addThousandSeparator";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || payload.length === 0) return null;

  const { amount = 0, items = [] } = payload[0].payload || {};

  return (
    <div className="w-64 rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
      
      {/* Date */}
      <p className="text-sm font-semibold text-gray-800">
        {label}
      </p>

      {/* Total */}
      <p className="mt-1 text-sm font-medium text-purple-600">
        Total: ₹{amount.toLocaleString("en-IN")}
      </p>

      {/* Divider */}
      <div className="my-2 h-px bg-gray-100" />

      {/* Breakdown */}
      <div className="max-h-40 space-y-1 overflow-y-auto pr-1">
        {Array.isArray(items) && items.length > 0 ? (
          items.map((item) => (
            <div
              key={item.id}
              className="flex items-start justify-between gap-2 text-xs"
            >
              <span className="truncate text-gray-600">
                {item.categoryName} : {item.name}
              </span>

              <span className="whitespace-nowrap font-medium text-gray-800">
                ₹{item.amount.toLocaleString("en-IN")}
              </span>
            </div>
          ))
        ) : (
          <p className="text-xs text-gray-400">
            No details available
          </p>
        )}
      </div>
    </div>
  );
};


const ExpenseLineChart = ({ data = [] }) => {
  if (!data.length) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-gray-400">
        No expense data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <defs>
          <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#EF4444" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#EF4444" stopOpacity={0.03} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />

        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#9CA3AF", fontSize: 12 }}
        />

        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#9CA3AF", fontSize: 12 }}
        />

        <Tooltip content={<CustomTooltip />} />

        <Area
          type="monotone"
          dataKey="amount"
          stroke="none"
          fill="url(#expenseGradient)"
        />

        <Line
          type="monotone"
          dataKey="amount"
          stroke="#EF4444"
          strokeWidth={3}
          dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ExpenseLineChart;

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

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  const { amount, items } = payload[0].payload;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-lg w-64">
      {/* Date */}
      <p className="text-sm font-semibold text-gray-800">{label}</p>

      {/* Total */}
      <p className="mt-1 text-sm font-medium text-purple-600">
        Total: ₹{amount.toLocaleString("en-IN")}
      </p>

      {/* Divider */}
      <div className="my-2 h-px bg-gray-100" />

      {/* Breakdown */}
      <div className="space-y-1 max-h-40 overflow-y-auto">
        {Array.isArray(items) && items.length > 0 ? (
          items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between text-xs text-gray-600"
            >
              <span className="truncate">{item.categoryName} : {item.name}</span>
              <span className="font-medium text-gray-800">
                ₹{item.amount.toLocaleString("en-IN")}
              </span>
            </div>
          ))
        ) : (
          <p className="text-xs text-gray-400">No details available</p>
        )}
      </div>
    </div>
  );
};

const IncomeLineChart = ({ data = [] }) => {
  if (!data.length) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-gray-400">
        No income data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <defs>
          <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity={0.03} />
          </linearGradient>
        </defs>

        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#f1f1f1"
        />

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
          fill="url(#incomeGradient)"
        />

        <Line
          type="monotone"
          dataKey="amount"
          stroke="#7C3AED"
          strokeWidth={3}
          dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default IncomeLineChart;

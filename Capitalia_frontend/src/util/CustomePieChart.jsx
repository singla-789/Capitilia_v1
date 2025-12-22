import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import { addThousandsSeparator } from "../util/addThousandSeparator";

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;

  const { name, amount } = payload[0].payload;

  return (
    <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-lg">
      <p className="text-sm font-semibold text-gray-800">{name}</p>
      <p className="mt-1 text-sm text-gray-600">
        ₹{addThousandsSeparator(amount)}
      </p>
    </div>
  );
};

const CustomPieChart = ({
  data,
  lable,
  totalAmount,
  color,
  showTextAnchor = true,
}) => {
  return (
    <div className="mt-4 h-72">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          {/* Tooltip */}
          <Tooltip content={<CustomTooltip />} />

          {/* Pie */}
          <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={95}
            paddingAngle={3}
            animationDuration={800}
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={color[index % color.length]}
              />
            ))}
          </Pie>

          {/* Center Text */}
          {showTextAnchor && (
            <>
              <text
                x="50%"
                y="48%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-gray-400 text-xs"
              >
                {lable}
              </text>
              <text
                x="50%"
                y="56%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-gray-800 text-lg font-semibold"
              >
                {totalAmount}
              </text>
            </>
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;

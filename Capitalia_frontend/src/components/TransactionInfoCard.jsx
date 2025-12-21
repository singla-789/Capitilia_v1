import {
  Trash2,
  TrendingDown,
  TrendingUp,
  UtensilsCrossed,
} from "lucide-react";
import { addThousandsSeparator } from "../util/addThousandSeparator";

const TransactionInfoCard = ({
  icon,
  title,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
}) => {
  const getAmountStyle = () =>
    type === "income"
      ? "bg-green-50 text-green-700 border border-green-200"
      : "bg-red-50 text-red-700 border border-red-200";

  return (
    <div
      className="group relative flex items-center gap-4 mt-2 px-4 py-3 
                    rounded-xl border border-gray-100 bg-white 
                    transition-all duration-200 
                    hover:bg-gray-50 hover:shadow-sm"
    >
      {/* Icon */}
      <div
        className="w-12 h-12 flex items-center justify-center 
                      text-xl bg-gray-100 rounded-full"
      >
        {icon ? (
          <img src={icon} alt="title" className="w-6 h-6" />
        ) : (
          <UtensilsCrossed className="text-blue-700 w-5 h-5" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-gray-800 truncate">
            {title}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">{date}</p>
        </div>

        {/* Delete */}
        <div className="flex items-center gap-2">
          {!hideDeleteBtn && (
            <button
              onClick={onDelete}
              className="text-gray-400 opacity-0 
                         transition-all duration-200 
                         hover:text-red-600 
                         group-hover:opacity-100"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>

        {/* Amount */}
        <div
          className={`flex items-center gap-2 px-3 py-1.5 
                      rounded-lg text-xs font-semibold 
                      ${getAmountStyle()}`}
        >
          <h6>
            {type === "income" ? "+" : "-"} ${addThousandsSeparator(amount)}
          </h6>

          {type === "income" ? (
            <TrendingUp size={14} />
          ) : (
            <TrendingDown size={14} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;

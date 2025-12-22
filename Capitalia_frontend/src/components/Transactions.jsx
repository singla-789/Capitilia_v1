import { ArrowRight } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";
const Transactions = ({ Transactions, onMore, type, title }) => {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">{title}</h5>

        <button
          onClick={onMore}
          className="
    inline-flex items-center gap-2
    rounded-lg border border-gray-300
    bg-white px-3 py-1.5
    text-sm font-medium text-gray-700
    transition-all duration-200
    hover:bg-gray-100 hover:border-gray-400
    focus:outline-none focus:ring-2 focus:ring-blue-300
    group
  "
        >
          <span>More</span>
          <ArrowRight
            size={15}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </button>
      </div>
      <div className="mt-6">
        {Transactions?.slice(0, 5)?.map((item) => (
          <TransactionInfoCard
            key={item.id}
            title={item.name}
            icon={item.icon}
            date={moment(item.date).format("Do MMM YYYY")}
            amount={item.amount}
            type={type}
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default Transactions;

import { ArrowRight } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";

const RecentTransaction = ({ trasactions, onMore }) => {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <div className="flex item-center justify-between">
        <h4 className="text-lg">Recent Transaction</h4>
        <button
          className="    inline-flex items-center gap-2
    rounded-lg border border-gray-300
    bg-white px-3 py-1.5
    text-sm font-medium text-gray-700
    transition-all duration-200
    hover:bg-gray-100 hover:border-gray-400
    focus:outline-none focus:ring-2 focus:ring-blue-300
    group"
          onClick={onMore}
        >
          More
          <ArrowRight className="text-base" size={15} />
        </button>
      </div>

      <div className="mt-6">
        {trasactions?.slice(0, 5)?.map((item) => (
          <TransactionInfoCard
            key={item.id}
            title={item.name}
            icon={item.icon}
            date={moment(item.date).format("Do MMM YYYY")}
            amount={item.amount}
            type={item.type}
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default RecentTransaction;

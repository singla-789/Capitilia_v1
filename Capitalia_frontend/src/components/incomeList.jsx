import { Download, Mail } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";
const IncomeList = ({ transactions, onDelete }) => {
  return (
    <div className="card p-4 rounded-xl shadow-sm bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h5 className="text-lg font-semibold text-gray-800">Income Sources</h5>
        <div className="flex items-center gap-2">
          <button
            className="card-btn flex items-center gap-1 px-3 py-1.5 
                   text-sm font-medium rounded-lg 
                   hover:bg-gray-100 transition 
                   focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <Mail size={15} />
            <span>Email</span>
          </button>
          <button
            className="card-btn flex items-center gap-1 px-3 py-1.5 
                   text-sm font-medium rounded-lg 
                   hover:bg-gray-100 transition 
                   focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <Download size={15} />
            <span>Download</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* display incomes */}
        {transactions?.map((income) => (
          <TransactionInfoCard
            key={income.id}
            title={income.name}
            icon={income.icon}
            date={moment(income.date).format("Do MMM YYYY")}
            amount={income.amount}
            type="income"
            onDelete={() => onDelete(income.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default IncomeList;

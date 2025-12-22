import { Download, Mail } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";
import { useState } from "react";

const ExpenseList = ({ transactions = [], onDelete, onDownload, onEmail }) => {
  const [emailLoading, setEmailLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);

  const handleEmail = async () => {
    if (!onEmail) return;
    setEmailLoading(true);
    try {
      await onEmail();
    } finally {
      setEmailLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!onDownload) return;
    setDownloadLoading(true);
    try {
      await onDownload();
    } finally {
      setDownloadLoading(false);
    }
  };

  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h5 className="text-lg font-semibold text-gray-800">Expense Sources</h5>

        <div className="flex items-center gap-2">
          {/* Email Button */}
          <button
            disabled={emailLoading}
            onClick={handleEmail}
            className={`
              flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg
              border border-gray-200 transition-all
              ${
                emailLoading
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "hover:bg-gray-100 text-gray-700"
              }
              focus:outline-none focus:ring-2 focus:ring-blue-300
            `}
          >
            {emailLoading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-transparent" />
                Sending…
              </>
            ) : (
              <>
                <Mail size={15} />
                Email
              </>
            )}
          </button>

          {/* Download Button */}
          <button
            disabled={downloadLoading}
            onClick={handleDownload}
            className={`
              flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg
              border border-gray-200 transition-all
              ${
                downloadLoading
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "hover:bg-gray-100 text-gray-700"
              }
              focus:outline-none focus:ring-2 focus:ring-blue-300
            `}
          >
            {downloadLoading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-transparent" />
                Downloading…
              </>
            ) : (
              <>
                <Download size={15} />
                Download
              </>
            )}
          </button>
        </div>
      </div>

      {/* Expense List */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        {transactions.length > 0 ? (
          transactions.map((expense) => (
            <TransactionInfoCard
              key={expense.id}
              title={expense.name}
              icon={expense.icon}
              date={moment(expense.date).format("Do MMM YYYY")}
              amount={expense.amount}
              type="expense"
              onDelete={() => onDelete(expense.id)}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-sm text-gray-400 py-6">
            No expense records found
          </p>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;

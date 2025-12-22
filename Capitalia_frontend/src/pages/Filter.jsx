import { Search } from "lucide-react";
import DashBoard from "../components/dashBoard";
import { useUser } from "../Hook/useUser";
import { useState } from "react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndPoints";
import TransactionInfoCard from "../components/TransactionInfoCard";
import moment from "moment";

const Filter = () => {
  useUser();

  const [type, setType] = useState("income");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [keyword, setKeyword] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosConfig.post(API_ENDPOINTS.APPLY_FILTER, {
        type,
        startDate,
        endDate,
        keyword,
        sortField,
        sortOrder,
      });
      setTransactions(response.data);
    } catch (error) {
      console.log("failed to fetch filtered transactions", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashBoard activeMenu="Filters">
      <div className="mx-auto my-6 max-w-7xl space-y-6">

        {/* Page Header */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Filter Transactions
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Apply filters to refine income or expense records
          </p>
        </div>

        {/* Filter Card */}
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <h5 className="mb-4 text-lg font-semibold text-gray-800">
            Select Filters
          </h5>

          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4"
          >
            {/* Type */}
            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full rounded-lg border px-3 py-2"
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-lg border px-3 py-2"
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-medium mb-1">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full rounded-lg border px-3 py-2"
              />
            </div>

            {/* Sort Field */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Sort Field
              </label>
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
                className="w-full rounded-lg border px-3 py-2"
              >
                <option value="date">Date</option>
                <option value="amount">Amount</option>
                <option value="category">Category</option>
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Sort Order
              </label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full rounded-lg border px-3 py-2"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            {/* Search */}
            <div className="md:col-span-2 flex items-end gap-2">
              <div className="w-full">
                <label className="block text-sm font-medium mb-1">
                  Keyword
                </label>
                <input
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  type="text"
                  placeholder="Search..."
                  className="w-full rounded-lg border px-3 py-2"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`h-[42px] px-4 rounded-lg flex items-center gap-2 text-white
                  ${loading
                    ? "bg-purple-300 cursor-not-allowed"
                    : "bg-purple-700 hover:bg-purple-800"}
                `}
              >
                <Search size={18} />
                Apply
              </button>
            </div>
          </form>
        </div>

        {/* Results Card */}
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <h5 className="mb-4 text-lg font-semibold text-gray-800">
            Transactions
          </h5>

          {loading && (
            <p className="text-sm text-gray-400">Loading transactions…</p>
          )}

          {!loading && transactions.length === 0 && (
            <p className="text-sm text-gray-400">
              No transactions found. Try adjusting filters.
            </p>
          )}

          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
            {transactions.map((transaction) => (
              <TransactionInfoCard
                key={transaction.id}
                title={transaction.name}
                icon={transaction.icon}
                date={moment(transaction.date).format("Do MMM YYYY")}
                amount={transaction.amount}
                type={type}
                hideDeleteBtn
              />
            ))}
          </div>
        </div>

      </div>
    </DashBoard>
  );
};

export default Filter;

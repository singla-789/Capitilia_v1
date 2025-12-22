import { useEffect, useState } from "react";
import DashBoard from "../components/dashBoard";
import { useUser } from "../Hook/useUser";
import { API_ENDPOINTS } from "../util/apiEndPoints";
import axiosConfig from "../util/axiosConfig";
import ExpenseOverview from "../components/ExpenseOverview";
import Modal from "../components/Modal";
import AddExpenseForm from "../components/AddExpenseForm";
import toast from "react-hot-toast";
import ExpenseList from "../components/ExpenseList";
import DeleteAlert from "../components/DeleteAlert";

const Expense = () => {
  useUser();

  const [expenseData, setExpenseData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSE);
      if (response.status === 200) {
        setExpenseData(response.data);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch expense list"
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchExpenseCategories = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.CATEGORY_BY_TYPE("expense")
      );
      if (response.status === 200) {
        setCategories(response.data);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load expense categories"
      );
    }
  };

  const hanndleAddExpense = async (expense) => {
    const { name, amount, date, icon, categoryId } = expense;

    if (!name.trim()) return toast.error("Please enter the name");
    if (!amount || isNaN(amount) || Number(amount) <= 0)
      return toast.error("Amount must be greater than 0");
    if (!date) return toast.error("Date is required");

    const today = new Date().toISOString().split("T")[0];
    if (date > today) return toast.error("Date cannot be in the future");
    if (!categoryId) return toast.error("Please select a category");

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
        name,
        amount: Number(amount),
        date,
        icon,
        categoryId,
      });

      if (response.status === 201) {
        toast.success("Expense added successfully");
        setOpenAddExpenseModal(false);
        fetchExpenseDetails();
        fetchExpenseCategories();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to save expense"
      );
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense deleted successfully");
      fetchExpenseDetails();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete expense"
      );
    }
  };

  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.download = "expense_details.xlsx";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Downloaded expense details successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to download expense"
      );
    }
  };

  const handleEmailExpenseDetails = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_EXPENSE);
      if (response.status === 200) {
        toast.success("Expense sent to registered email");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to send expense email"
      );
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
    fetchExpenseCategories();
  }, []);

  return (
    <DashBoard activeMenu="Expense">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Overview */}
        <ExpenseOverview
          transactions={expenseData}
          onAddExpense={() => setOpenAddExpenseModal(true)}
        />

        {/* Expense List */}
        <ExpenseList
          transactions={expenseData}
          onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
          onDownload={handleDownloadExpenseDetails}
          onEmail={handleEmailExpenseDetails}
        />

        {/* Add Expense Modal */}
        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm
            onAddExpense={hanndleAddExpense}
            categories={categories}
          />
        </Modal>

        {/* Delete Confirmation */}
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Confirm Deletion"
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense? This action cannot be undone."
            onDelete={() => deleteExpense(openDeleteAlert.data)}
            onCancel={() => setOpenDeleteAlert({ show: false, data: null })}
          />
        </Modal>

        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-40">
            <div className="rounded-lg bg-white px-6 py-3 shadow text-sm font-medium text-gray-700">
              Loading expenses…
            </div>
          </div>
        )}

      </div>
    </DashBoard>
  );
};

export default Expense;

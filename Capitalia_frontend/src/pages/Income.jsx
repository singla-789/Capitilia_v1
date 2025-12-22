import { useEffect, useState } from "react";
import DashBoard from "../components/dashBoard";
import { useUser } from "../Hook/useUser";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndPoints";
import IncomeList from "../components/incomeList";
import { Plus } from "lucide-react";
import Modal from "../components/Modal";
import toast from "react-hot-toast";
import AddIncomeForm from "../components/AddIncomeForm";
import DeleteAlert from "../components/DeleteAlert";
import IncomeOverview from "../components/IncomeOverview";
const Income = () => {
  useUser();
  const [incomeData, setIncomeData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [openDeleteAlert, setopenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  // fetch income details from api
  const fetchIncomeDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
      if (response.status == 200) {
        console.log("incomes:", response.data);
        setIncomeData(response.data);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Failed to fetch the income list"
      );
    } finally {
      setLoading(false);
    }
  };

  // fetch category for income

  const fetchIncomeCategories = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.CATEGORY_BY_TYPE("income")
      );
      if (response.status == 200) {
        console.log("income categories:", response.data);
        setCategories(response.data);
      }
    } catch (error) {
      console.log("Failed to load income categories :", error);
      toast.error(error.data?.message || "Failed to load income categories");
    }
  };

  // saving the income details
  const hanndleAddIncome = async (income) => {
    const { name, amount, date, icon, categoryId } = income;
    //validation
    if (!name.trim()) {
      toast.error("please Enter the name");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number grater tha 0.");
      return;
    }
    if (!date) {
      toast.error("Date is required");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    if (date > today) {
      toast.error("date cannot be in the future");
      return;
    }

    if (!categoryId) {
      toast.error("Please select a category");
      return;
    }

    // add income
    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_INCOMES, {
        name,
        amount: Number(amount),
        date,
        icon,
        categoryId,
      });

      if (response.status == 201) {
        setOpenAddIncomeModal(false);
        toast.success("Income added successfully");
        fetchIncomeDetails();
        fetchIncomeCategories();
      }
    } catch (error) {
      console.log("Error adding income", error);
      toast.error(error.response?.data?.message || "Failed to save the income");
    }
  };

  // Delete income
  const deleteIncome = async (id) => {
    try {
      const response = await axiosConfig.delete(
        API_ENDPOINTS.DELETE_INCOME(id)
      );
      setopenDeleteAlert({ show: false, data: null });
      toast.success("Income deleted Successfully");
      fetchIncomeDetails();
    } catch (error) {
      console.log("error deleteing the icome", error);
      toast.error(
        error.response?.data?.message || "Failed to delete the Income"
      );
    }
  };

  // download income details
  const handleDownloadIncomeDetail = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.INCOME_EXCEL_DOWNLOAD,
        { responseType: "blob" }
      );

      const fileName = "income_details.xlsx";

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);

      document.body.appendChild(link);
      link.click(); // ✅ REQUIRED

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url); // ✅ revoke AFTER click

      toast.success("Downloaded income details successfully");
    } catch (error) {
      console.error("Error in downloading the incomes", error);
      toast.error(error.response?.data?.message || "Failed to download income");
    }
  };

  // email incomes
  const handleEmailIncomeDetails = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_INCOME);
      if(response.status == 200){
        toast.success("Incomes send to Registered mail");
      }
    } catch (error) {
      console.error("failed to send email", error);
      toast.error(error.response?.data?.message || "Failed to download incomes"); 
    }
  };

  useEffect(() => {
    fetchIncomeDetails();
    fetchIncomeCategories();
  }, []);

  return (
    <DashBoard activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            {/* overview for income with line chart */}
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>

          <IncomeList
            transactions={incomeData}
            onDelete={(id) => setopenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadIncomeDetail}
            onEmail={handleEmailIncomeDetails}
          />

          {/* add income modal */}
          <Modal
            isOpen={openAddIncomeModal}
            onClose={() => setOpenAddIncomeModal(false)}
            title="Add Income"
          >
            <AddIncomeForm
              onAddIncome={(income) => hanndleAddIncome(income)}
              categories={categories}
            />
          </Modal>

          {/* Delete income model */}
          <Modal
            isOpen={openDeleteAlert.show}
            onClose={() => setopenDeleteAlert({ show: false, data: null })}
            title="Delete alert"
          >
            <DeleteAlert
              content="Are you sure you want to delete this item? This action cannot be undone."
              onDelete={() => deleteIncome(openDeleteAlert.data)}
              onCancel={() => setopenDeleteAlert({ show: false, data: null })}
            />
          </Modal>
        </div>
      </div>
    </DashBoard>
  );
};

export default Income;

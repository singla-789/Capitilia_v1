import { Plus } from "lucide-react";
import DashBoard from "../components/dashBoard";
import { useUser } from "../Hook/useUser";
import CategoryList from "../components/CategoryList";
import { useEffect, useState } from "react";
import axios from "axios";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndPoints";
import toast from "react-hot-toast";
import Modal from "../components/Modal";
import AddCategoryForm from "../components/AddCategoryForm";
const Category = () => {
  useUser();

  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
  const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategoryDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
      if (response.status == 200) {
        console.log("categories", response.data);
        setCategoryData(response.data);
      }
    } catch (error) {
      console.error("Something went wrong. Please try again", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryDetails();
  }, []);

  return (
    <DashBoard activeMenu="Category">
      <div className="my-5 mx-auto">
        {/* add button for category */}

        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold">All Categories</h2>
          <button
            onClick={() => setOpenAddCategoryModal(true)}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl shadow-md transition-all"
          >
            <Plus size={16} />
            Add Category
          </button>
        </div>

        {/* category list */}

        <CategoryList categories={categoryData}></CategoryList>
        {/* adding category modal */}

        <Modal
          isOpen={openAddCategoryModal}
          onClose={() => setOpenAddCategoryModal(false)}
          title="Add category"
        >
          <AddCategoryForm></AddCategoryForm>
        </Modal>

        {/* updating categroy modal */}
      </div>
    </DashBoard>
  );
};

export default Category;

import { Plus } from "lucide-react";
import DashBoard from "../components/dashBoard";
import { useUser } from "../Hook/useUser";
import CategoryList from "../components/CategoryList";
import { useEffect, useState } from "react";
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

  const handleAddCategory = async (category) => {
    const { name, type, icon } = category;
    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    // check if category already exists
    const isDuplicate = categoryData.some((category) => {
      return category.name.toLowerCase() === name.trim().toLowerCase();
    });

    if (isDuplicate) {
      toast.error("Category already exits!!");
      return;
    }

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORY, {
        name,
        type,
        icon,
      });
      if (response.status == 201) {
        toast.success("Category Added Successfully");
        setOpenAddCategoryModal(false);
        fetchCategoryDetails();
      }
    } catch (error) {
      console.log("Error adding category : ", error);
      toast.error(error.response?.data?.message || "failed to Add Category");
    }
  };

  const handleEditCategory = (categoryToEdit) => {
    setSelectedCategory(categoryToEdit);
    setOpenEditCategoryModal(true);
    console.log("editing the category", categoryToEdit);
  };

  const handleUpdateCategory = async (UpdatedCategory) => {
    const { id, name, type, icon } = UpdatedCategory;
    if (!name.trim()) {
      toast.error("Category name is required!!");
      return;
    }
    if (!id) {
      toast.error("category ID is missing for update");
      return;
    }

    try {
      await axiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id), {
        name,
        type,
        icon,
      });
      setOpenEditCategoryModal(false);
      setSelectedCategory(null);
      toast.success("Category updated successfully");
      fetchCategoryDetails();
    } catch (error) {
      console.log('Error updating Categroy:' , error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Failed to update Category");
    }
  };

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

        <CategoryList
          categories={categoryData}
          onEditCategory={handleEditCategory}
        ></CategoryList>
        {/* adding category modal */}

        <Modal
          isOpen={openAddCategoryModal}
          onClose={() => setOpenAddCategoryModal(false)}
          title="Add category"
        >
          <AddCategoryForm onAddCategory={handleAddCategory}></AddCategoryForm>
        </Modal>

        {/* updating categroy modal */}
        <Modal
          isOpen={openEditCategoryModal}
          onClose={() => {
            setOpenEditCategoryModal(false);
            setSelectedCategory(null);
          }}
          title="update Category"
        >
          <AddCategoryForm
            onAddCategory={handleUpdateCategory}
            isEditing={true}
            initialCategoryData={selectedCategory}
          ></AddCategoryForm>
        </Modal>
      </div>
    </DashBoard>
  );
};

export default Category;

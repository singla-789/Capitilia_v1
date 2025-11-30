import { useEffect, useState } from "react";
import Input from "../components/input";
import EmojiPickerPopup from "./EmojiPickerPopup";
import { LoaderCircle } from "lucide-react";

const AddCategoryForm = ({ onAddCategory, initialCategoryData, isEditing }) => {
  const [category, setCategory] = useState({
    name: "",
    type: "",
    icon: "",
  });

  const[loading,setLoading] = useState(false);

  const categoryTypeOptions = [
    { value: "income", label: "Income" },
    { value: "expense", label: "Expense" },
  ];

  useEffect(() => {
    if (isEditing && initialCategoryData) {
      setCategory(initialCategoryData);
    } else {
      setCategory({ name: "", type: "", icon: "" });
    }
  }, [isEditing, initialCategoryData]);

  const handleChange = (key, value) => {
    setCategory({ ...category, [key]: value });
  };

  const handleSubmit = async() => {
    setLoading(true);
    try {
      await onAddCategory(category);
    } finally{
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5 p-4">
      {/* emoji picker */}

      <EmojiPickerPopup
        icon={category.icon}
        onSelect={(emojiUrl) => handleChange("icon", emojiUrl)}
      />

      {/* Category Name */}
      <Input
        value={category.name}
        onChange={(e) => handleChange("name", e.target.value)}
        label="Category Name"
        placeholder="e.g., Freelance, Salary, Groceries"
        type="text"
      />

      {/* Category Type */}
      <Input
        label="Category Type"
        value={category.type}
        onChange={(e) => handleChange("type", e.target.value)}
        isSelect={true}
        options={categoryTypeOptions}
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl shadow-md transition-all"
        >
          {loading ? (
            <>
              <LoaderCircle className="w-4 h-4 animate-spin" />
              {isEditing ? "Updating. . ." : "Adding. . ."}
            </>
          ) : (
            <>{isEditing ? "Update Categroy" : "Add Category"}</>
          )}
        </button>
      </div>
    </div>
  );
};

export default AddCategoryForm;

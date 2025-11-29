import { useState } from "react";
import Input from "../components/input";
import EmojiPicker from "emoji-picker-react";
import EmojiPickerPopup from "./EmojiPickerPopup";

const AddCategoryForm = () => {
  const [category, setCategory] = useState({
    name: "",
    type: "",
    icon: "",
  });

  const categoryTypeOptions = [
    { value: "income", label: "Income" },
    { value: "expense", label: "Expense" },
  ];

  const handleChange = (key, value) => {
    setCategory({ ...category, [key]: value });
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
    </div>
  );
};

export default AddCategoryForm;

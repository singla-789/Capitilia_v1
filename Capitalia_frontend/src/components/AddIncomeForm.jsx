import { useState } from "react";
import EmojiPickerPopup from "./EmojiPickerPopup";
import Input from "./input";
import { Loader2, LoaderCircle } from "lucide-react";
const AddIncomeForm = ({ onAddIncome, categories }) => {
  const [income, setIncome] = useState({
    name: "",
    amount: "",
    date: "",
    icon: "",
    categoryId: "",
  });

  const [loading,setLoading] = useState(false);

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const handleChange = (key, value) => {
    setIncome({ ...income, [key]: value });
  };

  const handleAddIncome = async (income) => {
    setLoading(true);
    try{
        await onAddIncome(income)
    }finally{
        setLoading(false);
    }
  }

  return (
    <div>
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value={income.name}
        onChange={({ target }) => handleChange("name", target.value)}
        label="Income Source"
        placeholder="e.g. ,Salary,Freelance,Stockes"
        type="text"
      />

      <Input
        label="Category"
        value={income.categoryId}
        onChange={(e) => handleChange("categoryId", e.target.value)}
        isSelect={true}
        options={categoryOptions}
      />

      <Input
        label="Amount"
        value={income.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        type="number"
        placeholder={"e.g. 2000"}
      />

      <Input
        label="Date"
        value={income.date}
        onChange={({ target }) => handleChange("date", target.value)}
        type="date"
        placeholder=""
      />

      <div className="flex justify-end mt-6">
        <button
          onClick={() => handleAddIncome(income)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl shadow-md transition-all"
          disabled={loading}
        >{loading ? (
            <>
              <LoaderCircle className="w-4 h-4 animate-spin" />Adding. . .
            </>
          ) : (
            <>Add Income</>
          )}</button>
      </div>
    </div>
  );
};

export default AddIncomeForm;

import { useEffect, useState } from "react";
import EmojiPickerPopup from "./EmojiPickerPopup";
import Input from "./input";
import { Divide, Loader2, LoaderCircle } from "lucide-react";
const AddExpenseForm = ({ onAddExpense, categories }) => {
  const [expense, setExpense] = useState({
    name: "",
    amount: "",
    date: "",
    icon: "",
    categoryId: "",
  });

  const [loading, setLoading] = useState(false);

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const handleChange = (key, value) => {
    setExpense({ ...expense, [key]: value });
  };

  const handleAddExpense = async (expense) => {
    setLoading(true);
    try {
      await onAddExpense(expense);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categories.length > 0 && !expense.categoryId) {
      setExpense((prev) => ({ ...prev, categoryId: categories[0].id }));
    }
  }, [categories, expense.categoryId]);

  return (
    <div>
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value={expense.name}
        onChange={({ target }) => handleChange("name", target.value)}
        label="Expense Source"
        placeholder="e.g. ,Salary,Freelance,Stockes"
        type="text"
      />

      <Input
        label="Category"
        value={expense.categoryId}
        onChange={(e) => handleChange("categoryId", e.target.value)}
        isSelect={true}
        options={categoryOptions}
      />

      <Input
        label="Amount"
        value={expense.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        type="number"
        placeholder={"e.g. 2000"}
      />

      <Input
        label="Date"
        value={expense.date}
        onChange={({ target }) => handleChange("date", target.value)}
        type="date"
        placeholder=""
      />

      <div className="flex justify-end mt-6">
        <button
          onClick={() => handleAddExpense(expense)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl shadow-md transition-all"
          disabled={loading}
        >
          {loading ? (
            <>
              <LoaderCircle className="w-4 h-4 animate-spin" />
              Adding. . .
            </>
          ) : (
            <>Add Expense</>
          )}
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;

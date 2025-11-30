import { Layers2, Pencil } from "lucide-react";

const CategoryList = ({ categories, onEditCategory}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-xl font-semibold text-gray-800">
          Category Sources
        </h4>
      </div>

      {/* Category list */}
      {categories.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No categories added yet. Add some to get started!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {categories.map((category) => (
            <div
              key={category.id}
              className="
                group flex items-center gap-4 p-4 
                rounded-xl border border-gray-200 
                bg-white hover:bg-gray-50 shadow-sm
                transition-all duration-200
              "
            >
              {/* Icon */}
              <div
                className="
                  w-12 h-12 flex items-center justify-center 
                  bg-gray-100 rounded-full shadow-sm
                  group-hover:bg-gray-200 transition-colors
                "
              >
                {category.icon ? (
                  <img
                    src={category.icon}
                    alt={category.name}
                    className="h-6 w-6 object-contain"
                  />
                ) : (
                  <Layers2 className="text-blue-600" size={22} />
                )}
              </div>

              {/* Category Info */}
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800 leading-tight">
                  {category.name}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {category.type}
                </p>
              </div>

              {/* Actions */}
              <div
                className="
                  flex items-center gap-2 opacity-0 
                  group-hover:opacity-100 transition-opacity
                "
              >
                <button
                  onClick={() => onEditCategory(category)}
                  className="
                    text-gray-400 hover:text-blue-600 
                    p-2 rounded-lg hover:bg-gray-100 
                    transition-colors
                  "
                >
                  <Pencil size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryList;

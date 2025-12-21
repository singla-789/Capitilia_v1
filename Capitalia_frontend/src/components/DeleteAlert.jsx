import { AlertTriangle, Loader, LoaderCircle } from "lucide-react";
import { useState } from "react";

const DeleteAlert = ({ content, onDelete, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    try {
      await onDelete();
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-5">
      {/* Warning Icon + Message */}
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
          <AlertTriangle className="w-5 h-5" />
        </div>

        <p className="text-sm leading-relaxed text-gray-700">{content}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 
                     rounded-lg border border-gray-300 
                     hover:bg-gray-100 transition"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleDelete}
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-white 
                     rounded-lg bg-red-600 
                     hover:bg-red-700 
                     focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          {loading ? (
            <>
              <LoaderCircle className="h-4 w-4 animated-spin" />
              Deleting...
            </>
          ) : (
            <>Delete</>
          )}
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;

import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="relative p-4 w-full max-w-xl max-h-[90vh]">
        <div className="relative bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.15)] border border-gray-100 animate-slideUp">
          {/* Header */}
          <div className="flex items-center justify-between p-5 md:p-6 border-b border-gray-100 rounded-t-xl">
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>

            <button
              onClick={onClose}
              type="button"
              className="text-gray-500 bg-gray-50 hover:bg-gray-100 hover:text-gray-700 
                         rounded-full w-9 h-9 flex items-center justify-center 
                         transition-all duration-200 focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 md:p-6 text-gray-700">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

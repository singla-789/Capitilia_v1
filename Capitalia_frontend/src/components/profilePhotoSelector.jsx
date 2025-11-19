import { Trash, Upload, User } from "lucide-react";
import { useState, useRef } from "react";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    inputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center gap-4 mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {/* Upload UI */}
      {!image ? (
        <div
          onClick={onChooseFile}
          className="
            w-28 h-28 flex flex-col items-center justify-center 
            rounded-full border-2 border-dashed border-blue-400
            cursor-pointer
            bg-white/60 backdrop-blur-sm
            hover:bg-blue-50 hover:border-blue-500
            transition-all duration-300 shadow-sm
          "
        >
          <User className="text-blue-500" size={40} />
          <Upload className="text-blue-500 mt-2" size={20} />
          <p className="text-xs text-blue-600 mt-1">Upload Photo</p>
        </div>
      ) : (
        <div className="relative group">
          <img
            src={previewUrl}
            alt="profile"
            className="
              w-28 h-28 rounded-full object-cover 
              shadow-md border border-blue-300
            "
          />

          {/* Remove Button */}
          <button
            onClick={handleRemoveImage}
            className="
              absolute -bottom-2 left-1/2 -translate-x-1/2
              bg-blue-600 text-white p-1 rounded-full shadow-md
              hover:bg-blue-700 transition-all
              opacity-95
            "
          >
            <Trash size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;

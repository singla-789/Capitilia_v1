import { useState } from "react";

const Input = ({ label, value, onChange, placeholder, type }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isActive = value && value.length > 0;
  const isPassword = type === "password";

  return (
    <div className="relative mb-6">
      <input
        type={isPassword ? (showPassword ? "text" : "password") : type}
        value={value}
        onChange={(e) => onChange(e)}
        placeholder={isActive || isFocused ? placeholder : ""}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="
          w-full px-4 py-3 
          text-sm text-white
          bg-white/10
          border border-white/30 
          rounded-xl 
          outline-none 
          transition-all
          focus:border-blue-400 
          focus:ring-2 focus:ring-blue-300/40
          hover:border-white/50
          backdrop-blur-sm
          pr-12
        "
      />

      <label
        className={`
          absolute left-4 
          transition-all duration-200
          pointer-events-none 
          px-1 
          text-gray-200 
          ${
            isActive || isFocused
              ? "-top-2 text-xs bg-white/10"
              : "top-3 text-sm bg-transparent"
          }
        `}
      >
        {label}
      </label>

      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="
            absolute right-4 top-1/2 
            -translate-y-1/2 
            text-gray-300 
            hover:text-white
            cursor-pointer
          "
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      )}
    </div>
  );
};

export default Input;

import { useState } from "react";

const Input = ({ label, value, onChange, placeholder, type, isSelect, options }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isActive = value && value.length > 0;
  const isPassword = type === "password";

  return (
    <div className="relative mb-6">
      
      {/* SELECT INPUT */}
      {isSelect ? (
        <select
          value={value}
          onChange={(e) => onChange(e)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="
            w-full px-4 py-3
            text-sm text-gray-800
            bg-white
            border border-gray-300
            rounded-xl
            outline-none
            appearance-none
            transition-all
            focus:border-blue-500
            focus:ring-2 focus:ring-blue-300/40
            hover:border-gray-400
          "
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        /* NORMAL INPUT */
        <input
          type={isPassword ? (showPassword ? "text" : "password") : type}
          value={value}
          onChange={(e) => onChange(e)}
          placeholder={isActive || isFocused ? placeholder : ""}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="
            w-full px-4 py-3 
            text-sm text-gray-800
            bg-white
            border border-gray-300 
            rounded-xl 
            outline-none 
            transition-all
            focus:border-blue-500 
            focus:ring-2 focus:ring-blue-300/40
            hover:border-gray-400
            pr-12
          "
        />
      )}

      {/* FLOATING LABEL */}
      <label
        className={`
          absolute left-4 
          transition-all duration-200
          pointer-events-none 
          text-gray-500
          ${isActive || isFocused ? "-top-2 text-xs bg-white px-1" : "top-3 text-sm"}
        `}
      >
        {label}
      </label>

      {/* PASSWORD TOGGLE */}
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="
            absolute right-4 top-1/2 
            -translate-y-1/2 
            text-gray-500 
            hover:text-gray-700
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

import { useState } from "react";

const Input = ({ label, value, onChange, placeholder, type }) => {
  const isActive = value && value.length > 0;

  return (
    <div className="relative mb-6">
      {/* Input box */}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e)}
        placeholder={placeholder}
        className="
          w-full px-4 py-3 
          text-sm text-white
          bg-white/10
          border border-white/30 
          rounded-xl 
          outline-none 
          transition-all
          placeholder-transparent
          focus:border-blue-400 
          focus:ring-2 focus:ring-blue-300/40
          hover:border-white/50
          backdrop-blur-sm
        "
      />

      {/* Floating Label */}
      <label
        className={`
          absolute left-4 
          transition-all duration-200
          pointer-events-none 
          px-1 backdrop-blur-sm 
          text-gray-200 
          ${isActive ? "-top-2 text-xs bg-white/10" : "top-3 text-sm bg-transparent"}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;

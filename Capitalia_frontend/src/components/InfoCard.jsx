const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div
      className="
        flex items-center gap-5
        bg-white p-5 rounded-2xl
        border border-gray-200/60
        shadow-sm
        transition-all duration-200
        hover:shadow-md hover:-translate-y-0.5
      "
    >
      {/* Icon */}
      <div
        className={`
          flex h-14 w-14 items-center justify-center
          rounded-full text-white text-2xl
          ${color}
          shadow-lg
        `}
      >
        {icon}
      </div>

      {/* Content */}
      <div className="flex flex-col">
        <h6 className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          {label}
        </h6>

        <span className="mt-1 text-2xl font-semibold text-gray-800">
          ₹{value}
        </span>
      </div>
    </div>
  );
};

export default InfoCard;

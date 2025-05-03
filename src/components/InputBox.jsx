import React from "react";

const InputBox = ({ 
  label, 
  placeholder, 
  iconSrc, 
  onClickIcon, 
  secondIconSrc, 
  onClickSecondIcon, 
  type = "text" 
}) => {
  return (
    <div className="w-full mb-4">
      <label className="block text-gray-700 font-bold mb-2">{label}</label>
      <div className="relative w-full">
        <input
          type={type}
          placeholder={placeholder}
          className="w-full p-2 pr-16 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E2BDFD]"
        />
        {iconSrc && (
          <button
            type="button"
            className="absolute inset-y-0 right-8 flex items-center"
            onClick={onClickIcon}
          >
            <img
              src={iconSrc}
              alt="icon"
              className="w-5 h-5 cursor-pointer opacity-70 hover:opacity-100"
            />
          </button>
        )}
        {secondIconSrc && (
          <button
            type="button"
            className="absolute inset-y-0 right-2 flex items-center"
            onClick={onClickSecondIcon}
          >
            <img
              src={secondIconSrc}
              alt="second-icon"
              className="w-5 h-5 cursor-pointer opacity-70 hover:opacity-100"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default InputBox;

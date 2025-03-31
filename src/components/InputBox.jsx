import React from "react";

const InputBox = ({ label, placeholder }) => {
  return (
    <div className="w-full mb-4">
      <label className="block text-gray-700 font-bold mb-2">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E2BDFD]"
      />
    </div>
  );
};

export default InputBox;

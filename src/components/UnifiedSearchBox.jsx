import React from "react";

const UnifiedSearchBox = ({ classNames = "", onChange, value, endIcon }) => {
  return (
    <div className={`flex items-center bg-white shadow-md rounded-md h-[3rem] w-full ${classNames}`}>
      <img
        src="/svgs/magnifying-glass-black.svg"
        alt="Buscar"
        className="w-6 h-6 ml-4 mr-2"
      />

      <input
        type="text"
        placeholder="Buscar reporte..."
        value={value}
        onChange={onChange}
        className="flex-grow outline-none text-sm"
      />

      {endIcon && (
        <div className="flex items-center justify-center mr-2">
          {endIcon}
        </div>
      )}
    </div>
  );
};

export default UnifiedSearchBox;

import React from 'react'

const Buscador = ({ icon, placeholder, classNames }) => {
  return (
    <div
      className={`bg-white flex items-center border border-gray-300 rounded-md shadow-md p-2 w-[300px] h-[40px] ${classNames}`}
    >
      {/* on left side we got the icon*/}
      <img src={icon} alt="Search Icon" className="w-5 h-5 ml-2" />

      {/* input */}
      <input
        type="text"
        placeholder={placeholder || "Search..."}
        className="flex-grow border-none outline-none px-3 text-black bg-transparent"
      />
    </div>
  );
};

export default Buscador;
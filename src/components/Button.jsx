import React from "react";

const Button = ({ classNames, onClick, icon, label }) => {
  return (
    <button
      onClick={onClick}
      className={`font-semibold py-2 px-4 rounded-md relative 
        shadow-md flex items-center  justify-center ${classNames}`}
    >
      <img src={icon} alt="icon" width={25} className="absolute top-3 left-3" />
      {label}
    </button>
  );
};

export default Button;

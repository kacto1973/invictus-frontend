import React from "react";

const Button = ({ type, onClick }) => {
  // Define button styles based on the "type" prop
  const buttonStyles = {
    add: "bg-green-600 hover:bg-green-700 text-white",
    delete: "bg-red-600 hover:bg-red-700 text-white",
  };

  // Define button labels and icons
  const buttonConfig = {
    "add-equipment": { text: "Add Equipment", icon: "../svgs/plus-sign.svg", style: buttonStyles.add },
    "delete-equipment": { text: "Delete Equipment", icon: "../svgs/minus-sign.svg", style: buttonStyles.delete },
    "add-reactive": { text: "Add Reactive", icon: "../svgs/plus-sign.svg", style: buttonStyles.add },
    "delete-reactive": { text: "Delete Reactive", icon: "../svgs/minus-sign.svg", style: buttonStyles.delete },
    "reset-db": {text: "Restablecer", icon: "../svgs/restore-sign.svg", style: buttonStyles.delete }

  };

  // Get the appropriate config based on the type
  const { text, icon, style } = buttonConfig[type] || { //default
    text: "Defualt",
    icon: "", 
    style: "bg-gray-500 hover:bg-gray-600 text-white",
  };

  return (
    <button
      onClick={onClick}
      className={`${style} font-semibold py-2 px-4 rounded-md shadow-md transition-all flex items-center gap-2`}
    >
      <img src={icon} alt="icon" className="w-5 h-5" />
      {text}
    </button>
  );
};

export default Button;
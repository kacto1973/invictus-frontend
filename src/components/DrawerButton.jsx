import React from "react";

const DrawerButton = ({ classNames, buttonText }) => {
  return (
    <div
      className={`my-[.8rem] rounded-lg bg-[#3F3F3F] text-white hover:bg-[#6E6D6D] h-[2.5rem] w-[80%] flex items-center justify-center ${classNames}`}
    >
      {buttonText}
    </div>
  );
};

export default DrawerButton;

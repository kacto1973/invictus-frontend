import React from "react";

const Card = ({ icon, label, children, classNames = "" }) => {
  return (
    <div
      className={`bg-white relative z-50 rounded-md shadow-md p-4 flex flex-col items-start justify-start w-[25%] h-[165px] m-4 ${classNames}`}
    >
      <div className="absolute w-full rounded-t-md h-[3.5rem] top-0 left-0 bg-[#E2BDFD] flex items-center">
        <img src={icon} alt="icon" width={25} className="ml-4" />
        <h1 className="text-[#4B2E83] text-lg font-bold ml-2">{label}</h1>
      </div>

      <div className="mt-[4rem] w-full p-2">{children}</div>
    </div>
  );
};

export default Card;

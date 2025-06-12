import React from "react";

const CardReport = ({ icon, label, children, classNames = "" }) => {
  return (
    <div
      className={`bg-white relative z-30 rounded-md shadow-md p-4 flex flex-col items-start justify-start w-[45%] h-[270px] m-12 ${classNames}`}
    >
      <div className="absolute w-full rounded-t-md h-[3.5rem] top-0 left-0 bg-primary flex items-center">
        <img src={icon} alt="icon" width={25} className="ml-4" />
        <h1 className="text-white text-lg font-normal ml-2">{label}</h1>
      </div>

      <div className="mt-[4rem] w-full p-2">{children}</div>
    </div>
  );
};

export default CardReport;

import React from "react";

const Card = ({ icon, label, children, classNames, subClassNames }) => {
  return (
    <div
      className={`bg-white relative z-50 rounded-md shadow-md m-4 ${classNames}`}
    >
      <div className="absolute w-full rounded-t-md h-[3.5rem] top-0 left-0 bg-[#E2BDFD] flex items-center">
        <img src={icon} alt="icon" width={25} className="ml-4" />
        <h1 className="text-[#4B2E83] text-lg font-bold ml-2">{label}</h1>
      </div>

      <div
        className={`w-full h-[calc(100%-3.5rem)] mt-[3.5rem] ${subClassNames}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Card;

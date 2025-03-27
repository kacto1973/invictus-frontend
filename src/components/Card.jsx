import React from "react";

const Card = ({ icon, label, children }) => {
  return (
    <div className="bg-black rounded-md shadow-md p-4 flex items-center justify-center w-[200px] h-[200px] m-4">
      <div className="absolute w-full h-[5rem] top-0 left-0 bg-[#E2BDFD]"></div>
    </div>
  );
};

export default Card;

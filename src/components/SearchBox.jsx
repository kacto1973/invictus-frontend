import { ClassNames } from "@emotion/react";
import React from "react";

const SearchBox = ({ classNames, text }) => {
  return (
    <div className="relative">
      <img
        src="/svgs/magnifying-glass-black.svg"
        width={25}
        alt="icon"
        className="absolute left-3 top-3"
      />
      <input
        type="text"
        placeholder="Buscar..."
        className={`pl-[3rem] bg-white shadow-md rounded-md h-[1.5rem] w-[4rem] items-center flex flex-row ${classNames}`}
      ></input>
    </div>
  );
};

export default SearchBox;

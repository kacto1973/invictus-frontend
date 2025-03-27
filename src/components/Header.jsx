import React from "react";

const Header = ({ label }) => {
  return (
    <div className="w-full h-[5rem] bg-[#E2BDFD] mb-5 absolute top-0 left-0 flex items-center">
      <span className=" ml-[280px] font-bold text-xl">{label}</span>
      <div className="mr-[5rem] flex flex-row absolute right-0">
        <div className="bg-white flex flex-row p-[5px] rounded-md px-[10px] items-center  ">
          <img
            src="svgs/clock-black.svg"
            alt="clock icon"
            width={20}
            className="mr-[5px]"
            onClick={() => setDrawerOpened(!drawerOpened)}
          />
          <p>Tue, 3:40 pm</p>
        </div>
        <div className="bg-white p-2 ml-8 rounded-md">
          <img
            src="svgs/bell-black.svg"
            alt="bell icon"
            width={25}
            onClick={() => setDrawerOpened(!drawerOpened)}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;

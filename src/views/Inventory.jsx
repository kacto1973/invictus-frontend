import React from "react";
import TemporaryDrawer from "../components/TemporaryDrawer";
import Header from "../components/Header";
import SearchBox from "../components/SearchBox";
import ReactantTable from "../components/ReactantTable";

const Inventory = () => {
  return (
    <div className="bg-[#EDEDED] w-screen h-screen relative m-0 overflow-hidden">
      <TemporaryDrawer></TemporaryDrawer>
      <Header label="Reactivos"></Header>
      {/*div padre de todo lo demas */}
      <div
        className={`ml-[250px] mt-[5rem] w-[calc(100vw-250px)] h-[calc(100vh-5rem)] bg-[#EDEDED] overflow-hidden`}
      >
        <div className="w-[35%] h-full flex flex-col p-5">
          <SearchBox classNames="w-full h-[3rem] mb-5"></SearchBox>
          <ReactantTable></ReactantTable>
        </div>
        <div className="w-[65%] h-full"></div>
      </div>
    </div>
  );
};

export default Inventory;

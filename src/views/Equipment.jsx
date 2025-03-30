import React from "react";
import Header from "../components/Header";
import TemporaryDrawer from "../components/TemporaryDrawer";
import Card from "../components/Card";
import SearchEquipment from "../components/SearchEquipment";
import Button from "../components/Button";

const Equipment = () => {
  return (
    <div className="bg-[#EDEDED] w-screen h-screen relative m-0 overflow-hidden">
      <TemporaryDrawer></TemporaryDrawer>
      <Header label="Equipment"></Header>
      <div
        className={`ml-[250px] mt-[5rem] w-[calc(100vw-250px)]
           h-[calc(100vh-5rem)] bg-[#EDEDED] overflow-hidden`} >{/* this is pushing everything else below the header */}
           <div className="w-[100%] h-[30%] flex flex-row items-center p-5">
          {/* Search Equipment in its own div */}
          <div className="w-[40%] h-[3rem] flex flex-row pl-10">
          <SearchEquipment classNames="w-[400px] h-[3rem] mb-5 " />
          </div>
          {/* Button in its own div */}
          <div className="w-[20%] flex ml-30">
            <Button
            type="add-equipment"
            onClick={() => alert("Added Equipment!")}
            classNames="w-[20%] h-[3rem] mb-5"
          />
         </div>
         <div className="w-[20%] flex ml-10">
            <Button
            type="delete-equipment"
            onClick={() => alert("Deleted Equipment!")}
            classNames="w-[20%] h-[3rem] mb-5"
          />
          </div>
         </div>
      </div>
    </div>
  );
};

export default Equipment;
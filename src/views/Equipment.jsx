import React from "react";
import Header from "../components/Header";
import TemporaryDrawer from "../components/TemporaryDrawer";
import Card from "../components/Card";
import SearchBox from "../components/SearchBox.jsx";
import Button from "../components/Button";

const Equipment = () => {
  return (
    <div className="bg-[#EDEDED] w-screen h-screen relative m-0 overflow-hidden">
      <TemporaryDrawer></TemporaryDrawer>
      <Header label="Equipment"></Header>
      <div
        className={`ml-[250px] mt-[5rem] w-[calc(100vw-250px)]
           h-[calc(100vh-5rem)] bg-[#EDEDED] overflow-hidden`} >{/* this is pushing everything else below the header */}
          <div className="flex flex-row w-[100%] h-[12%] ml-5 mt-5 ">
           <SearchBox classNames="w-[400px] h-[3rem] mb-5" />
            <Button 
            icon = "/svgs/plus-sign.svg"
            label= "Add Equipment"
            onClick={() => alert("Added Equipment!")}
            classNames="hover:bg-[#6FB847] bg-[#79CB4C] w-[20%] h-[3rem] mb-5 ml-25"
          />
           <Button
            icon = "svgs/minus-sign.svg"
            label = "Delete Equipment"
            onClick={() => alert("Deleted Equipment!")}
            classNames="hover:bg-[#CA5E5E] bg-[#E96D6D]  w-[20%] h-[3rem] mb-5 ml-15"
          />
         </div>
      </div>
    </div>
  );
};

export default Equipment;
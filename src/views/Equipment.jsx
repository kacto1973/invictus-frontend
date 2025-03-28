import React from "react";
import Header from "../components/Header";
import TemporaryDrawer from "../components/TemporaryDrawer";
import Card from "../components/Card";

const Equipment = () => {
  return (
    <div>
      <TemporaryDrawer></TemporaryDrawer>
      <Header label="Equipment"></Header>
      <div className="bg-[#EDEDED] w-screen h-screen relative m-0 overflow-hidden">
        <div className="ml-[250px] mt-[5rem]">
          <h1 className="text-3xl font-bold text-[#4B2E83]">Equipment</h1>
          <div className="flex flex-row w-full justify-around mt-10">
            {/* Aquí puedes agregar más contenido relacionado con el equipo */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Equipment;

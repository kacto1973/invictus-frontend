import React, { useEffect } from "react";
import { useState } from "react";
import TemporaryDrawer from "../components/TemporaryDrawer";
import Header from "../components/Header";
import SearchBox from "../components/SearchBox";
import ReactantTable from "../components/ReactantTable";
import Button from "../components/Button";

const Inventory = () => {
  const [selectedReactant, setSelectedReactant] = useState(null);

  const handleReactantSelection = (reactant) => {
    setSelectedReactant(reactant);
  };

  return (
    <div className="bg-[#EDEDED] w-screen h-screen relative m-0 overflow-hidden">
      <TemporaryDrawer></TemporaryDrawer>
      <Header label="Reactivos"></Header>
      {/*div padre de todo lo demas */}
      <div
        className={`ml-[250px] mt-[5rem] w-[calc(100vw-250px)] h-[calc(100vh-5rem)] bg-[#EDEDED] overflow-hidden flex `}
      >
        <p className=" absolute top-[37%] text-gray-600 right-[20%] text-regular w-[15rem] text-center font-bold">
          Haga click sobre un reactivo para ver su información
        </p>
        <img
          src="/images/matraz.png"
          alt="matraz icon"
          className="absolute top-[45%] right-[20%]"
        />
        <div className="w-[35%] h-full flex flex-col p-5 pr-0">
          <SearchBox classNames="w-full h-[3rem] mb-5"></SearchBox>
          <ReactantTable
            onReactivoClick={handleReactantSelection}
          ></ReactantTable>
        </div>
        <div className="w-[65%] h-full flex flex-col pb-5 pr-5">
          <div className=" w-full h-[6.1rem] flex items-center">
            <div className="bg-white w-[30%] h-[3rem] rounded-md shadow-md ml-5 flex items-center ">
              <p className="ml-4">Seleccione Categoría</p>
            </div>
            <button className="bg-green-200 w-[5rem] h-[3rem] ml-4  shadow-md rounded-md">
              Añadir
            </button>
          </div>

          {/* pestaña que se despliega al seleccionar un reactivo */}
          <div
            className={`bg-white  h-full w-[94%] rounded-r-lg shadow-md ${
              selectedReactant === null ? "hidden" : "relative z-50"
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;

import React, { useEffect } from "react";
import { useState } from "react";
import TemporaryDrawer from "../components/TemporaryDrawer";
import Header from "../components/Header";
import SearchBox from "../components/SearchBox";
import ReactantTable from "../components/ReactantTable";
import Button from "../components/Button";
import TextField from "@mui/material/TextField";

const Inventory = () => {
  const [selectedReactant, setSelectedReactant] = useState(null);
  const [activeModal, setActiveModal] = useState(null);

  const MODAL_TYPE = {
    AGREGAR_REACTIVO: "agregarReactivo",
    AGREGAR_DEFECTUOSO: "agregarDefectuoso",
    CONSULTAR_DEFECTUOSOS: "consultarDefectuosos",
    CONSULTAR_ENTRADAS: "consultarEntradas",
    CONSULTAR_SALIDAS: "consultarSalidas",
    BORRAR_REACTIVO: "borrarReactivo",
  };

  const handleReactantSelection = (reactant) => {
    setSelectedReactant(reactant);
  };

  return (
    <div className="bg-[#EDEDED] w-screen h-screen relative m-0 overflow-hidden">
      <TemporaryDrawer></TemporaryDrawer>
      <Header label="Reactivos"></Header>
      {/*div padre de todo lo demas */}
      <div
        className={`relative ml-[250px] mt-[5rem] w-[calc(100vw-250px)] h-[calc(100vh-5rem)] bg-[#EDEDED] overflow-hidden flex `}
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
            onReactantClick={handleReactantSelection}
          ></ReactantTable>
        </div>
        <div className="w-[65%] h-full flex flex-col pb-5 pr-5">
          <div className=" w-full h-[6.1rem] flex items-center">
            <div className="bg-white w-[30%] h-[3rem] rounded-md shadow-md ml-5 flex items-center ">
              <p className="ml-4">Seleccione Categoría</p>
            </div>

            <Button
              classNames="hover:bg-[#6DBA43] bg-[#79CB4C] w-[10rem] h-[3rem] ml-4 shadow-md rounded-md text-bold text-white text-xl"
              icon="svgs/plus-sign.svg"
              label="Añadir"
              onClick={() => setActiveModal(MODAL_TYPE.AGREGAR_REACTIVO)}
            ></Button>
          </div>

          {/* pestaña que se despliega al seleccionar un reactivo */}
          <div
            className={`bg-white  h-full w-[94%] rounded-r-lg shadow-md ${
              selectedReactant === null ? "hidden" : "relative"
            }`}
          >
            <div
              className="w-[30%] bg-[#FFBB00] h-[4rem] absolute left-1/2 -translate-1/2 top-[4rem] 
            text-3xl font-bold rounded-md text-center items-center flex justify-center"
            >
              {selectedReactant?.nombre}
            </div>
            <img
              src="svgs/edit-black.svg"
              alt="icon"
              width={45}
              className="absolute top-[2.5rem] left-[5rem]"
            />
            <img
              src="svgs/save-black.svg"
              alt="icon"
              width={45}
              className="absolute top-[2.5rem] left-[12rem]"
            />
            <img
              src="svgs/trash-red.svg"
              alt="icon"
              width={45}
              className="absolute top-[2.5rem] right-[6rem] cursor-pointer"
              onClick={() => setActiveModal(MODAL_TYPE.BORRAR_REACTIVO)}
            />

            {/*div padre */}
            <div className="absolute w-full h-[47%] top-[15%] flex flex-col">
              {/*una mitad la de arriba */}
              <div className="w-full h-[50%] flex">
                <div className="relative h-full w-[33%] border-b-2 border-gray-300">
                  <p className="bg-[#C796EB]  py-2 text-center px-8 rounded-full w-[12rem] absolute left-1/2 -translate-x-1/2 top-5 text-white font-bold text-2xl">
                    Marca
                  </p>
                  <span className="absolute bottom-10 left-1/2 -translate-x-1/2 text-2xl font-bold text-center">
                    {selectedReactant?.marca}
                  </span>
                </div>
                <div className="relative h-full w-[33%] border-b-2 border-gray-300">
                  <p className="bg-[#C796EB]  py-2 text-center px-8 rounded-full w-[14rem] absolute left-1/2 -translate-x-1/2 top-5 text-white font-bold text-2xl">
                    Presentación
                  </p>
                  <span className="absolute bottom-10 left-1/2 -translate-x-1/2 text-2xl font-bold text-center">
                    {selectedReactant?.unidadMedida}
                  </span>
                </div>
                <div className="relative h-full w-[33%] border-b-2 border-gray-300">
                  <img
                    src="svgs/plus-sign.svg"
                    alt="plus icon"
                    width={40}
                    className="p-2 bg-[#79CB4C] rounded-md bottom-8 right-18 absolute"
                  />
                  <img
                    src="svgs/minus-sign.svg"
                    alt="minus icon"
                    width={40}
                    className="p-2 bg-[#79CB4C] rounded-md bottom-8 left-18 absolute"
                  />

                  <p className="bg-[#C796EB]  py-2 text-center px-8 rounded-full w-[12rem] absolute left-1/2 -translate-x-1/2 top-5 text-white font-bold text-2xl">
                    Cantidad
                  </p>
                  <span className="absolute bottom-10 left-1/2 -translate-x-1/2 text-2xl font-bold text-center">
                    {selectedReactant?.cantidad}
                  </span>
                </div>
              </div>

              {/*una mitad la de arriba */}
              <div className="w-full h-[50%]  flex relative">
                <div className="relative h-full w-[33%] border-b-2 border-gray-300">
                  <p className="bg-[#C796EB]  py-2 text-center px-8 rounded-full w-[12rem] absolute left-1/2 -translate-x-1/2 top-5 text-white font-bold text-2xl">
                    Código/ID
                  </p>
                  <span className="absolute bottom-10 left-1/2 -translate-x-1/2 text-2xl font-bold text-center">
                    {selectedReactant?.id}
                  </span>
                </div>
                <div className="relative h-full w-[33%] border-b-2 border-gray-300">
                  <p className="bg-[#C796EB]  py-2 text-center px-8 rounded-full w-[12rem] absolute left-1/2 -translate-x-1/2 top-5 text-white font-bold text-2xl">
                    Categoría
                  </p>
                  <span className="absolute bottom-10 left-1/2 -translate-x-1/2 text-2xl font-bold text-center">
                    {selectedReactant?.estadoFisico}
                  </span>
                </div>
                <div className="relative h-full w-[33%] border-b-2 border-gray-300">
                  <p className="bg-[#C796EB] py-2 text-center px-8 rounded-full w-[16rem] absolute left-1/2 -translate-x-1/2 top-5 text-white font-bold text-2xl">
                    Ult. Movimiento
                  </p>
                  <span className="absolute bottom-10 left-1/2 -translate-x-1/2 text-2xl font-bold text-center">
                    {/*selectedReactant?.lastSeen */}
                    Ayer
                  </span>
                </div>
              </div>
            </div>

            {/*div de opciones defecto, salidas, entradas, etc. */}
            <div className=" w-[25%] h-[15rem] flex flex-col absolute bottom-5 items-center justify-around ">
              <Button
                classNames="hover:bg-[#312FC2] bg-[#5553D0] w-[80%] ml-4
                 shadow-md rounded-md text-bold text-white text-xl"
                icon="svgs/plus-sign.svg"
                label="Defecto"
                onClick={() => console.log("Añadir")}
              ></Button>
              <Button
                classNames="hover:bg-[#312FC2] w-[80%] bg-[#5553D0]  ml-4
                 shadow-md rounded-md text-bold text-white text-xl"
                icon="svgs/book-white.svg"
                label="Defecto"
                onClick={() => console.log("Añadir")}
              ></Button>
              <Button
                classNames="hover:bg-[#EAB905] w-[80%] bg-[#FFC800]  ml-4
                 shadow-md rounded-md text-bold text-white text-xl"
                icon="svgs/arrow-right-black.svg"
                label="Salidas"
                onClick={() => console.log("Añadir")}
              ></Button>
              <Button
                classNames="hover:bg-[#EAB905] w-[80%] bg-[#FFC800]  ml-4
                 shadow-md rounded-md text-bold text-white text-xl"
                icon="svgs/arrow-left-good.svg"
                label="Entradas"
                onClick={() => console.log("Añadir")}
              ></Button>
            </div>
            <div
              className="w-[65%] h-[15rem] bg-[#DBE1DA] 
              rounded-4xl flex flex-col absolute bottom-5 left-[18rem] 
             justify-around  "
            >
              <img
                src="svgs/EPP.svg"
                width={230}
                className="p-3  top-2  left-0 absolute"
              />
              <p className="text-2xl absolute w-[70%] font-[20px] right-0 top-10  z-50">
                Recuerda hacer uso del equipo de protección:
                <ul>
                  <li>-Bata de laboratorio </li>
                  <li>-Guantes de nitrilo/látex</li>
                  <li>-Gafas de protección</li>
                </ul>
              </p>
            </div>
          </div>
        </div>

        {/* pantalla opaca del fondo */}
        {activeModal !== null && (
          <div className="absolute top-0 left-0 w-full h-full bg-black z-40 opacity-40"></div>
        )}
        {/*modales*/}
        {activeModal === MODAL_TYPE.BORRAR_REACTIVO && (
          <div className=" flex justify-center w-[30%] h-[35%] bg-white shadow-md rounded-md absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-50">
            <p className="text-2xl font-bold text-left w-[80%] mt-[4rem]">
              ¿Desea usted eliminar el reactivo: {selectedReactant?.nombre}?
            </p>
            <Button
              onClick={() => {
                console.log("Eliminando Reactivo..");
                setActiveModal(null);
              }}
              classNames="absolute cursor-pointer hover:bg-[#CD1C1C] mx-auto bg-[#D41D1D] w-[12rem] h-[3rem] mt-5 shadow-md rounded-md text-bold text-white text-xl"
              icon="svgs/minus-sign.svg"
              label="Eliminar"
            ></Button>
          </div>
        )}

        {activeModal === MODAL_TYPE.AGREGAR_REACTIVO && (
          <div className="w-[30%] h-[80%] bg-white shadow-md rounded-md absolute left-1/2 -translate-x-1/2 top-10 z-50 flex justify-center">
            <div className="h-[4rem] bg-[#C49DE0] w-full absolute top-0 left-0 flex items-center ">
              <p className="text-xl font-bold flex-start ml-5">
                Agregar Reactivo
              </p>
              <div
                onClick={() => {
                  setActiveModal(null);
                }}
                className="font-black text-2xl absolute top-4 right-4 cursor-pointer"
              >
                X
              </div>
            </div>
            <div className="flex flex-col w-[70%] h-[100%-4rem] mt-[5.5rem]">
              <TextField
                id="outlined-basic"
                label="Nombre"
                variant="outlined"
                margin="normal"
              />
              <TextField
                id="outlined-basic"
                label="Cantidad"
                variant="outlined"
                margin="normal"
              />
              <TextField
                id="outlined-basic"
                label="Marca"
                variant="outlined"
                margin="normal"
                select
              />
              <TextField
                id="outlined-basic"
                label="Gabinete"
                variant="outlined"
                margin="normal"
                select
              />
              <TextField
                id="outlined-basic"
                label="Presentación"
                variant="outlined"
                margin="normal"
                select
              />
              <TextField
                id="outlined-basic"
                label="Código / Catálogo"
                variant="outlined"
                margin="normal"
              />

              <Button
                onClick={() => {
                  console.log("Agregando Reactivo nuevo..");
                  setActiveModal(null);
                }}
                classNames="cursor-pointer hover:bg-[#6DBA43] mx-auto bg-[#79CB4C] w-[10rem] h-[3rem] mt-5 shadow-md rounded-md text-bold text-white text-xl"
                icon="svgs/plus-sign.svg"
                label="Añadir"
              ></Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;
